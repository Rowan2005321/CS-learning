import { useEffect, useMemo, useRef, useState } from "react";
import { computeCoursePlanner } from "../app/coursePlanner";

function buildRequestKey(filters, weeklyHours, completedIds) {
  return JSON.stringify({
    filters,
    weeklyHours,
    completedIds: [...completedIds].sort()
  });
}

export function useCoursePlannerWorker({ courses, filters, completedIds, weeklyHours }) {
  const requestIdRef = useRef(0);
  const workerRef = useRef(null);
  const [workerResult, setWorkerResult] = useState(null);
  const requestKey = useMemo(
    () => buildRequestKey(filters, weeklyHours, completedIds),
    [completedIds, filters, weeklyHours]
  );
  const fallbackResult = useMemo(
    () => computeCoursePlanner({ courses, filters, completedIds, weeklyHours }),
    [completedIds, courses, filters, weeklyHours]
  );

  useEffect(() => {
    if (typeof Worker === "undefined") return undefined;

    if (!workerRef.current) {
      workerRef.current = new Worker(new URL("../workers/coursePlanner.worker.js", import.meta.url), {
        type: "module"
      });
    }

    const worker = workerRef.current;
    const requestId = `${Date.now()}-${requestIdRef.current++}`;

    worker.onmessage = (event) => {
      const { id, type, payload } = event.data ?? {};
      if (id !== requestId) return;

      if (type === "course-planner-result") {
        setWorkerResult({
          requestKey,
          result: payload
        });
      }
    };

    worker.postMessage({
      id: requestId,
      type: "compute-course-planner",
      payload: {
        courses,
        filters,
        completedIds,
        weeklyHours
      }
    });

    return () => {
      worker.onmessage = null;
    };
  }, [completedIds, courses, filters, requestKey, weeklyHours]);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  if (workerResult?.requestKey === requestKey) {
    return {
      ...workerResult.result,
      computedInWorker: true
    };
  }

  return {
    ...fallbackResult,
    computedInWorker: false
  };
}
