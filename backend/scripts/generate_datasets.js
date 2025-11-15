import fs from "fs";
import path from "path";

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randBigIntString(digits) {
  let s = "";
  for (let i = 0; i < digits; i++)
    s += Math.floor(Math.random() * 10).toString();
  // ensure first digit not zero
  if (s[0] === "0")
    s = (Math.floor(Math.random() * 9) + 1).toString() + s.slice(1);
  return s;
}

const outDir = path.join(process.cwd(), "datasets");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
// Closest pair datasets
const cpSizes = [120, 150, 200, 300, 400, 600, 800, 1000, 1500, 2000];
const cpDir = path.join(outDir, "closest_pair");
if (!fs.existsSync(cpDir)) fs.mkdirSync(cpDir);

cpSizes.forEach((n, idx) => {
  const lines = [];
  lines.push(String(n));
  for (let i = 0; i < n; i++) {
    // random points in range [-1e6, 1e6] with 6 decimals
    const x = randFloat(-1e6, 1e6).toFixed(6);
    const y = randFloat(-1e6, 1e6).toFixed(6);
    lines.push(`${x} ${y}`);
  }
  fs.writeFileSync(
    path.join(cpDir, `cp_input${idx + 1}.txt`),
    lines.join("\n")
  );
});

// Integer multiplication datasets
const imDigits = [120, 150, 200, 300, 400, 600, 800, 1000, 1500, 2000];
const imDir = path.join(outDir, "integer_mul");
if (!fs.existsSync(imDir)) fs.mkdirSync(imDir);

imDigits.forEach((digits, idx) => {
  // produce two numbers with given digits
  const a = randBigIntString(digits);
  const b = randBigIntString(
    Math.max(120, Math.floor(digits * (0.6 + Math.random() * 0.8)))
  );
  // file format: two lines: a then b
  fs.writeFileSync(path.join(imDir, `im_input${idx + 1}.txt`), `${a}\n${b}\n`);
});

console.log("Datasets generated under ./datasets");
