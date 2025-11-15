// Distance between two points
function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

// Main closest pair function
function closestPair(pointsIn) {
  const points = pointsIn.slice();
  points.sort((a, b) => a.x - b.x || a.y - b.y);

  function brute(ps, l, r) {
    let best = Infinity;
    let bp = null;
    for (let i = l; i < r; i++)
      for (let j = i + 1; j < r; j++) {
        const d = dist(ps[i], ps[j]);
        if (d < best) {
          best = d;
          bp = [ps[i], ps[j]];
        }
      }
    return { best, pair: bp };
  }

  function rec(px, l, r) {
    const n = r - l;
    if (n <= 3) return brute(px, l, r);

    const mid = Math.floor((l + r) / 2);
    const midX = px[mid].x;

    const left = rec(px, l, mid);
    const right = rec(px, mid, r);

    let best = left.best;
    let pair = left.pair ?? right.pair;
    if (right.best < best) {
      best = right.best;
      pair = right.pair;
    }

    // build strip
    const strip = [];
    for (let i = l; i < r; i++) {
      if (Math.abs(px[i].x - midX) < best) strip.push(px[i]);
    }

    // sort strip by y
    strip.sort((a, b) => a.y - b.y);

    for (let i = 0; i < strip.length; i++) {
      for (
        let j = i + 1;
        j < strip.length && strip[j].y - strip[i].y < best;
        j++
      ) {
        const d = dist(strip[i], strip[j]);
        if (d < best) {
          best = d;
          pair = [strip[i], strip[j]];
        }
      }
    }

    return { best, pair };
  }

  const res = rec(points, 0, points.length);
  return { distance: res.best, pair: res.pair };
}
module.exports = closestPair;
