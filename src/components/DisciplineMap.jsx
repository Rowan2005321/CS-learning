import { disciplineIcons } from "./icons";

export function DisciplineMap({ t, activeDiscipline, onSelectDiscipline }) {
  return (
    <section className="discipline-section" id="tracks">
      <div className="section-heading">
        <h2>{t.map}</h2>
      </div>
      <div className="discipline-grid">
        {Object.entries(t.disciplines).map(([id, text]) => {
          const Icon = disciplineIcons[id] || disciplineIcons.programming;
          const isActive = activeDiscipline === id;

          return (
            <button
              className={`discipline-tile ${isActive ? "is-active" : ""}`}
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelectDiscipline(id)}
            >
              <Icon size={24} aria-hidden="true" />
              <strong>{text}</strong>
            </button>
          );
        })}
      </div>
    </section>
  );
}
