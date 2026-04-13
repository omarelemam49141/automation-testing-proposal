import { createHash } from "node:crypto";

const pwd = process.argv[2];
if (!pwd) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"');
  process.exit(1);
}
process.stdout.write(createHash("sha256").update(pwd, "utf8").digest("hex") + "\n");
