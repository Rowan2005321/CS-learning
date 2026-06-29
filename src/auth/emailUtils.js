export function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

export function isValidEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
}

export function maskEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  const [localPart, domain] = normalizedEmail.split("@");

  if (!localPart || !domain) return "";
  if (localPart.length === 1) return `*@${domain}`;

  return `${localPart[0]}***@${domain}`;
}

export function getEmailProvider(email) {
  const normalizedEmail = normalizeEmail(email);
  const domain = normalizedEmail.split("@")[1] ?? "";

  if (domain === "qq.com" || domain === "foxmail.com") return "qq";
  if (domain === "gmail.com" || domain === "googlemail.com") return "gmail";
  if (["outlook.com", "hotmail.com", "live.com"].includes(domain)) return "outlook";
  if (domain.endsWith(".edu") || domain.includes(".edu.")) return "edu";

  return "other";
}
