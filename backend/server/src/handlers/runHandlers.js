// server/src/runHandlers.js
const fs = require("fs");
const path = require("path");
const closestPair = require("../algorithms/closestPair.js");
const karatsuba = require("../algorithms/karatsuba.js");

async function runHandler(type, filename) {
  const datasetsDir = path.join(__dirname, "../../../datasets");
  const filePath = path.join(
    datasetsDir,
    type === 'closest_pair' ? 'closest_pair' : 'integer_mul',
    filename
  );
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }

  const start = Date.now();

  if (type === 'closest_pair') {
    const text = fs.readFileSync(filePath, 'utf8').trim().split(/\r?\n/);
    const n = Number(text[0]);
    const pts = [];

    for (let i = 1; i <= n; i++) {
      const [xs, ys] = text[i].trim().split(/\s+/);
      pts.push({ x: parseFloat(xs), y: parseFloat(ys) });
    }

    const result = closestPair(pts);
    const timeMs = Date.now() - start;
    return { result, timeMs };
  }

  // Integer multiplication
  const [a, b] = fs.readFileSync(filePath, 'utf8').trim().split(/\r?\n/);
  const product = karatsuba(a.trim(), b.trim());
  const timeMs = Date.now() - start;

  return {
    result: {
      aLength: a.length,
      bLength: b.length,
      productDigits: product.length,
      product:
        product.length > 200
          ? product.slice(0, 200) + '... (truncated)'
          : product,
    },
    timeMs,
  };
}

module.exports = runHandler;
