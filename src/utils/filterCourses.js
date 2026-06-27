function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compact(values) {
  return values.flat().filter((value) => value != null && String(value).trim() !== "");
}

function excerpt(value, needle) {
  const text = String(value ?? "").trim();
  if (text.length <= 72) return text;

  const index = normalize(text).indexOf(needle);
  if (index < 0) return `${text.slice(0, 69)}...`;

  const start = Math.max(0, index - 24);
  const end = Math.min(text.length, index + needle.length + 40);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < text.length ? "..." : "";

  return `${prefix}${text.slice(start, end)}${suffix}`;
}

function bestMatch(course, needle) {
  const groups = [
    {
      field: "code",
      exactScore: 1000,
      includesScore: 760,
      values: [course.code]
    },
    {
      field: "title",
      exactScore: 980,
      includesScore: 740,
      values: [course.title?.en, course.title?.zh]
    },
    {
      field: "source",
      exactScore: 880,
      includesScore: 820,
      values: [course.provider]
    },
    {
      field: "university",
      exactScore: 860,
      includesScore: 800,
      values: [course.university]
    },
    {
      field: "description",
      exactScore: 560,
      includesScore: 520,
      values: [course.description?.en, course.description?.zh]
    },
    {
      field: "tags",
      exactScore: 540,
      includesScore: 500,
      values: course.tags ?? []
    },
    {
      field: "metadata",
      exactScore: 380,
      includesScore: 340,
      values: [
        course.access,
        course.sourceType,
        course.priority,
        course.audience?.en,
        course.audience?.zh,
        course.outcomes?.en,
        course.outcomes?.zh,
        course.prerequisites?.en,
        course.prerequisites?.zh,
        course.commonPitfallsZh,
        course.bridgeMaterialsZh,
        course.outputTaskZh,
        course.durationNote,
        course.discipline,
        course.level,
        course.language,
        ...(course.tracks ?? [])
      ]
    }
  ];

  let best = null;

  for (const group of groups) {
    for (const value of compact(group.values)) {
      const normalized = normalize(value);
      let score = 0;

      if (normalized === needle) {
        score = group.exactScore;
      } else if (normalized.includes(needle)) {
        score = group.includesScore;
      }

      if (score && (!best || score > best.score)) {
        best = {
          field: group.field,
          value: excerpt(value, needle),
          score
        };
      }
    }
  }

  return best;
}

export function filterCourses(courses, filters) {
  const { query, discipline, level, track } = filters;
  const needle = normalize(query);

  const matchedCourses = courses.reduce((matches, course, index) => {
    const matchesDiscipline = discipline === "all" || course.discipline === discipline;
    const matchesLevel = level === "all" || course.level === level;
    const matchesTrack = track === "all" || course.tracks.includes(track);

    if (!matchesDiscipline || !matchesLevel || !matchesTrack) {
      return matches;
    }

    if (!needle) {
      matches.push({ course, index, score: 0 });
      return matches;
    }

    const searchMatch = bestMatch(course, needle);
    if (searchMatch) {
      matches.push({
        course: {
          ...course,
          searchMatch
        },
        index,
        score: searchMatch.score
      });
    }

    return matches;
  }, []);

  return matchedCourses
    .sort((first, second) => second.score - first.score || first.index - second.index)
    .map((match) => match.course);
}
