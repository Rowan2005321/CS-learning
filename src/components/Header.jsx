import { Compass, Languages, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header({ activePage, brandHref, lang, navLinks, onLanguageChange, t }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href={brandHref} onClick={() => setIsOpen(false)}>
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
            className={navLinks[index]?.pageId === activePage ? "is-active" : ""}
            aria-current={navLinks[index]?.pageId === activePage ? "page" : undefined}
            href={navLinks[index]?.href ?? "#"}
            onClick={() => setIsOpen(false)}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="lang-switch" role="group" aria-label={t.languageToggle}>
        <Languages size={16} aria-hidden="true" />
        <button
          className={lang === "zh" ? "lang-option is-active" : "lang-option"}
          type="button"
          aria-pressed={lang === "zh"}
          aria-label={t.switchToChinese}
          onClick={() => onLanguageChange("zh")}
        >
          中文
        </button>
        <button
          className={lang === "en" ? "lang-option is-active" : "lang-option"}
          type="button"
          aria-pressed={lang === "en"}
          aria-label={t.switchToEnglish}
          onClick={() => onLanguageChange("en")}
        >
          EN
        </button>
      </div>
    </header>
  );
}
