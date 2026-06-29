const supabaseUrl = process.env.VITE_SUPABASE_URL ?? "";
const supabaseKey =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? "";
const liveUrl = "https://rowan2005321.github.io/CS-learning/";

const redirectUrls = [
  "https://rowan2005321.github.io/CS-learning/**",
  "http://localhost:5173/**",
  "http://127.0.0.1:5173/**"
];

console.log("Open CS Atlas auth smoke check");
console.log(`VITE_SUPABASE_URL: ${supabaseUrl ? "present" : "missing"}`);
console.log(`VITE_SUPABASE_PUBLISHABLE_KEY/ANON_KEY: ${supabaseKey ? "present" : "missing"}`);
console.log(`Live URL: ${liveUrl}`);
console.log("Recommended Supabase redirect URLs:");

for (const url of redirectUrls) {
  console.log(`- ${url}`);
}

console.log("Check Supabase Dashboard -> Authentication -> Logs for SMTP delivery failures.");
console.log("This script does not send real verification codes by default.");

if (process.env.AUTH_SMOKE_SEND === "true") {
  if (!process.env.AUTH_SMOKE_EMAIL) {
    console.log("AUTH_SMOKE_SEND=true was set, but AUTH_SMOKE_EMAIL is missing.");
  } else {
    console.log("Real OTP sending is intentionally not implemented in this smoke script.");
    console.log("Use Supabase Auth Logs after triggering the normal app flow.");
  }
}
