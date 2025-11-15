// Trim leading zeros from a number string
function trimLeading(s) {
  return s.replace(/^0+/, "") || "0";
}

// Add two number strings
function addStrings(a, b) {
  let carry = 0;
  let res = "";
  const n = Math.max(a.length, b.length);
  a = a.padStart(n, "0");
  b = b.padStart(n, "0");

  for (let i = n - 1; i >= 0; i--) {
    const sum = +a[i] + +b[i] + carry;
    res = (sum % 10) + res;
    carry = Math.floor(sum / 10);
  }
  if (carry) res = carry + res;
  return trimLeading(res);
}

// Subtract two number strings (assumes a >= b)
function subtractStrings(a, b) {
  let res = "";
  let carry = 0;
  const n = Math.max(a.length, b.length);
  a = a.padStart(n, "0");
  b = b.padStart(n, "0");

  for (let i = n - 1; i >= 0; i--) {
    let diff = +a[i] - carry - +b[i];
    if (diff < 0) {
      diff += 10;
      carry = 1;
    } else {
      carry = 0;
    }
    res = diff + res;
  }
  return trimLeading(res);
}

// Multiply small numbers using grade-school algorithm
function multiplySingle(a, b) {
  const res = Array(a.length + b.length).fill(0);

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      const mul = +a[i] * +b[j];
      const p = i + j + 1;
      res[p] += mul;
    }
  }

  // Handle carry
  for (let i = res.length - 1; i > 0; i--) {
    const carry = Math.floor(res[i] / 10);
    res[i - 1] += carry;
    res[i] %= 10;
  }

  return trimLeading(res.join(""));
}
// Karatsuba Multiplication
function karatsuba(a, b) {
  a = trimLeading(a);
  b = trimLeading(b);

  // Base case
  if (a.length < 20 || b.length < 20) return multiplySingle(a, b);

  const n = Math.max(a.length, b.length);
  const m = Math.floor(n / 2);

  // Split numbers
  const aHigh = a.slice(0, a.length - m);
  const aLow = a.slice(a.length - m);
  const bHigh = b.slice(0, b.length - m);
  const bLow = b.slice(b.length - m);

  // Recursive multiplications
  const z0 = karatsuba(aLow, bLow);
  const z2 = karatsuba(aHigh, bHigh);
  const z1 = karatsuba(addStrings(aLow, aHigh), addStrings(bLow, bHigh));

  // z1 - z2 - z0
  const middle = subtractStrings(subtractStrings(z1, z2), z0);

  // Combine results
  const z2Shift = z2 + "0".repeat(2 * m);
  const middleShift = middle + "0".repeat(m);
  const result = addStrings(addStrings(z2Shift, middleShift), z0);

  return trimLeading(result);
}
module.exports = karatsuba;
