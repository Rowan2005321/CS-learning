import { Compass, Languages, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header({ lang, onLanguageChange, t }) {
  const [isOpen, setIsOpen] = useState(false);

  function switchLanguage() {
    onLanguageChange(lang === "zh" ? "en" : "zh");
  }

  return (
    <header className="site-header">
      <a className="brand" href="#roadmap" onClick={() => setIsOpen(false)}>
        <Compass size={25} aria-hidden="true" />
        <span>Open CS Atlas</span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      <nav className={isOpen ? "is-open" : ""} aria-label="Primary navigation">
        {t.nav.map((item, index) => (
          <a
            key={item}
            href={["#roadmap", "#courses", "#tracks", "#projects", "#sources"][index]}
            onClick={() => setIsOpen(false)}
          >
            {item}
          </a>
        ))}
      </nav>

      <button className="lang-switch" type="button" onClick={switchLanguage}>
        <Languages size={16} aria-hidden="true" />
        {t.lang} / {t.switchLang}
      </button>
    </header>
  );
}
