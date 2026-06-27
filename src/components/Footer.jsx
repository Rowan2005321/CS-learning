import { ExternalLink } from "lucide-react";

export function Footer({ t }) {
  return (
    <footer className="site-footer">
      <span>Open CS Atlas</span>
      <a href="https://github.com/Rowan2005321/CS-learning" target="_blank" rel="noreferrer">
        {t.openGithub}
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </footer>
  );
}
