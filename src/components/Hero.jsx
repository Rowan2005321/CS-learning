import { ArrowRight, BarChart3, Compass, ExternalLink, Map, Sparkles } from "lucide-react";
import { lazy, Suspense } from "react";

const ThreeAtlasScene = lazy(() =>
  import("./ThreeAtlasScene").then((module) => ({ default: module.ThreeAtlasScene }))
);

function HeroMap() {
  const pins = [
    [150, 154, "DB", "teal"],
    [285, 100, "</>", "dark"],
    [324, 248, "SW", "teal"],
    [494, 133, "M", "amber"],
    [410, 218, "OS", "violet"],
    [615, 263, "SEC", "blue"],
    [735, 151, "AI", "green"]
  ];

  return (
    <div className="hero-visual" aria-hidden="true">
      <svg viewBox="0 0 980 430" className="atlas-map" focusable="false">
        <defs>
          <linearGradient id="water" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#e8f5f6" />
            <stop offset="100%" stopColor="#bddfe4" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow
              dx="0"
              dy="18"
              stdDeviation="18"
              floodColor="#0f172a"
              floodOpacity=".18"
            />
          </filter>
        </defs>
        <g transform="rotate(-2 500 214)" filter="url(#softShadow)">
          <polygon className="paper" points="42,28 940,2 970,350 64,396" />
          <polygon className="water" points="62,50 916,24 948,332 88,374" />
          <path
            className="grid"
            d="M140 42 154 370M232 39 244 365M324 36 336 360M416 33 426 356M508 31 517 352M600 28 607 348M692 26 698 344M784 24 788 340M876 21 879 336M66 98 923 71M70 146 928 119M74 194 933 167M78 242 938 216M83 290 943 265M87 338 948 315"
          />
          <path
            className="land"
            d="M116 132c34-44 86-52 132-30 30 14 49 7 85 3 49-6 72 20 92 52-30 17-72 12-105 5-45-10-80 2-116 24-48 29-99 11-88-54z"
          />
          <path
            className="land"
            d="M254 232c58-23 122-12 159 28 28 30 69 40 104 26 27-11 47 4 61 26-40 31-117 34-174 8-41-19-71-48-121-37-34 7-60-16-29-51z"
          />
          <path
            className="land"
            d="M474 88c72-37 160-36 228 1 57 31 111 21 166 7 44-11 66 15 54 45-62 20-145 10-205 23-87 18-161-6-243-76z"
          />
          <path
            className="land"
            d="M628 186c32-25 91-22 124 3 31 24 71 28 112 23 33-4 55 15 43 44-55 19-127 8-175-16-32-16-71-12-100 9-30 21-56-26-4-63z"
          />
        </g>
        <path
          className="route"
          d="M146 170 C210 105 292 118 354 166 S453 241 542 171 S693 95 748 162 S814 248 874 230"
        />
        {[205, 348, 560, 674, 804].map((x, i) => (
          <circle className="route-dot" cx={x} cy={[146, 166, 154, 208, 212][i]} r="9" key={x} />
        ))}
        {pins.map(([x, y, label, tone]) => (
          <g className="pin" transform={`translate(${x} ${y})`} key={label}>
            <circle className="pin-rim" r="37" />
            <circle className={`pin-core ${tone}`} r="30" />
            <text textAnchor="middle" dominantBaseline="central">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="feature">
      <Icon size={22} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <span>{desc}</span>
      </div>
    </div>
  );
}

function routeButtonClass(activeTrack, track, variant) {
  return `button ${variant} ${activeTrack === track ? "is-selected" : ""}`.trim();
}

export function Hero({ activeTrack, lang, t, onSelectTrack }) {
  return (
    <section className="hero-section" id="roadmap">
      <div className="hero-copy">
        <h1>{t.heroTitle}</h1>
        <p className="hero-value">{t.heroValue}</p>
        <p>{t.heroSubtitle}</p>

        <div className="hero-actions" aria-label="Route starters">
          <button
            className={routeButtonClass(activeTrack, "foundations", "primary")}
            type="button"
            aria-pressed={activeTrack === "foundations"}
            onClick={() => onSelectTrack("foundations")}
          >
            {t.startZero}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button
            className={routeButtonClass(activeTrack, "ai-data", "secondary")}
            type="button"
            aria-pressed={activeTrack === "ai-data"}
            onClick={() => onSelectTrack("ai-data")}
          >
            <Sparkles size={16} aria-hidden="true" />
            {t.aiRoute}
          </button>
          <button
            className={routeButtonClass(activeTrack, "software-engineering", "secondary")}
            type="button"
            aria-pressed={activeTrack === "software-engineering"}
            onClick={() => onSelectTrack("software-engineering")}
          >
            <BarChart3 size={16} aria-hidden="true" />
            {t.softwareRoute}
          </button>
        </div>

        <div className="proof-row">
          <Feature icon={Compass} title={t.startZero} desc={t.heroValue} />
          <Feature icon={Map} title={t.path} desc={t.heroSubtitle} />
          <Feature icon={ExternalLink} title={t.officialLink} desc={t.footer} />
        </div>
      </div>
      <Suspense fallback={<HeroMap />}>
        <ThreeAtlasScene
          lang={lang}
          activeTrack={activeTrack}
          onSelectTrack={onSelectTrack}
        />
      </Suspense>
    </section>
  );
}
