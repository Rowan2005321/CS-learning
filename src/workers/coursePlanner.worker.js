import { computeCoursePlanner } from "../app/coursePlanner";

self.addEventListener("message", (event) => {
  const { id, type, payload } = event.data ?? {};

  if (type !== "compute-course-planner") return;

  try {
    self.postMessage({
      id,
      type: "course-planner-result",
      payload: computeCoursePlanner(payload)
    });
  } catch (error) {
    self.postMessage({
      id,
      type: "course-planner-error",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});
