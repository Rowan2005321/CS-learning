export function filterCourses(courses, filters) {
  const { query, discipline, level, track } = filters;
  const needle = query.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesQuery =
      !needle ||
      [
        course.provider,
        course.university,
        course.code,
        course.access,
        course.sourceType,
        course.priority,
        course.title.en,
        course.title.zh,
        course.description.en,
        course.description.zh,
        course.audience.en,
        course.audience.zh,
        course.outcomes.en,
        course.outcomes.zh,
        course.prerequisites.en,
        course.prerequisites.zh,
        course.commonPitfallsZh,
        course.bridgeMaterialsZh,
        course.outputTaskZh,
        course.durationNote,
        course.discipline,
        course.level,
        course.language,
        ...course.tracks,
        ...course.tags
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);

    const matchesDiscipline = discipline === "all" || course.discipline === discipline;
    const matchesLevel = level === "all" || course.level === level;
    const matchesTrack = track === "all" || course.tracks.includes(track);

    return matchesQuery && matchesDiscipline && matchesLevel && matchesTrack;
  });
}
