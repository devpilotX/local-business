import { Buffer } from "node:buffer";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
const assets = {
  cafe: "public/images/local-cafe.jpg",
  clinic: "public/images/clinic.jpg",
  learning: "public/images/learning.jpg",
  "apple-icon": "src/app/apple-icon.png",
  icon: "public/icon.png",
};
for (const [name, destination] of Object.entries(assets)) {
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(
    destination,
    Buffer.from(readFileSync(`assets/${name}.base64`, "utf8").trim(), "base64"),
  );
}
