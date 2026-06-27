import { Globe2 } from "lucide-react";

export function SourcesSection({ sources, lang, t }) {
  return (
    <section className="sources-section" id="sources">
      <div>
        <h2>{t.sources}</h2>
        <p>
          {lang === "zh"
            ? "优先选择高质量、开放、可长期访问的课程来源。"
            : "High-quality, open, durable course sources are prioritized."}
        </p>
      </div>
      <div className="source-links">
        {sources.map((source) => (
          <span key={source}>{source}</span>
        ))}
      </div>
      <div className="transparency-panel">
        <Globe2 size={24} aria-hidden="true" />
        <div>
          <h3>{t.transparency}</h3>
          <p>{t.footer}</p>
        </div>
      </div>
    </section>
  );
}
