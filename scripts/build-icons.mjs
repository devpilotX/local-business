// Regenerates the raster icons from public/icon.svg.
// Usage: npm run icons:build (needs the Playwright Chromium browser).
// Output is stored as base64 in assets/ and decoded by prepare-assets.mjs,
// matching how the other binary assets are kept in the repository.
import { chromium } from "@playwright/test";
import { Buffer } from "node:buffer";
import { readFileSync, writeFileSync } from "node:fs";
import { stdout } from "node:process";

const svg = readFileSync("public/icon.svg", "utf8");
const browser = await chromium.launch();
const page = await browser.newPage();

async function png(size, background = "transparent") {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<body style="margin:0;background:${background}">${svg.replace(
      "<svg ",
      `<svg width="${size}" height="${size}" style="display:block" `,
    )}</body>`,
  );
  return page.screenshot({
    type: "png",
    omitBackground: background === "transparent",
  });
}

// Apple touch icons are opaque; iOS applies its own corner mask.
const apple = await png(180, "#0d1512");
const large = await png(512);
const frames = [
  [16, await png(16)],
  [32, await png(32)],
  [48, await png(48)],
];
await browser.close();

// ICO container with PNG-encoded frames.
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach(([size, data], index) => {
  const at = 6 + index * 16;
  header.writeUInt8(size, at);
  header.writeUInt8(size, at + 1);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(data.length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += data.length;
});
const ico = Buffer.concat([header, ...frames.map(([, data]) => data)]);

writeFileSync("assets/apple-icon.base64", apple.toString("base64"));
writeFileSync("assets/icon.base64", large.toString("base64"));
writeFileSync("assets/favicon.base64", ico.toString("base64"));
stdout.write("Icons written to assets/ and decoded.\n");
