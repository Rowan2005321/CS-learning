import { useEffect } from "react";

const DYNAMIC_UI_SELECTOR = [
  ".hero-copy > *",
  ".three-atlas",
  ".proof-row .feature",
  ".section-heading",
  ".progress-panel",
  ".roadmap-node",
  ".planner-panel",
  ".course-table-wrap",
  ".course-card",
  ".study-log-intro > *",
  ".study-log-review-grid article",
  ".study-log-heatmap",
  ".study-log-form",
  ".study-log-list",
  ".discipline-tile",
  ".project-card",
  ".source-stats article",
  ".source-current-lens",
  ".source-standard-card",
  ".source-card",
  ".source-transparency-panel",
  ".dashboard-hero-copy > *",
  ".dashboard-route-card",
  ".dashboard-metric-card",
  ".dashboard-panel",
  ".glass-card"
].join(", ");

export function useDynamicUi(pageId) {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return undefined;

    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observedElements = new WeakSet();
    let observer;

    root.classList.add("dynamic-ui");

    function registerElements() {
      const elements = Array.from(document.querySelectorAll(DYNAMIC_UI_SELECTOR));

      elements.forEach((element, index) => {
        if (observedElements.has(element)) return;

        observedElements.add(element);
        element.classList.add("motion-item");
        element.style.setProperty("--motion-index", String(index % 8));

        if (reduceMotion.matches || !observer) {
          element.classList.add("motion-visible");
          return;
        }

        observer.observe(element);
      });
    }

    if (!reduceMotion.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.12
        }
      );
    }

    registerElements();

    const mutationObserver = new MutationObserver(registerElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, [pageId]);
}
