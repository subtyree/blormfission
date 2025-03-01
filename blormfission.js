const log10i = (x) => {
  let r = 0;
  while (x >= 10) {
    x = x / 10 | 0;
    r++;
  }
  return r;
}

const blormfiseDividend = (x, y) => {
  // x = ABC, y = DEF
  // a = ABCDEF
  let a = x * Math.pow(10, log10i(y) + 1) + y;
  let l = log10i(a);

  // f = FEDCBA
  let A = a;
  let f = 0;
  let d = 0;
  // DO NOT REPLACE 'A !== 0' WITH 'A'!
  // NaN is falsy too and the engine may think that NaN might arise here, and
  // explicitly check for it each time, resulting in runtime penalties.
  while (A !== 0) {
    d = A % 10;
    f = f * 10 + d;
    A = A / 10 | 0;
  }

  // b = AFEDCB
  let b = f % 10 * Math.pow(10, l) + (f / 10 | 0);

  let r = 0;
  for (let i = 0; i <= l; i++) {
    r += Math.pow(10, i) * ((a % 10 - b % 10 + 10) % 10);
    a = a / 10 | 0;
    b = b / 10 | 0;
  }
  return r;
}

const gcd = function (a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

document.addEventListener("DOMContentLoaded", function () {
  const xE = document.getElementById('blormfission-x');
  const yE = document.getElementById('blormfission-y');
  const rE = document.getElementById('blormfission-r');
  const popupButtonE = document.getElementById('blormfission-popup-button');
  const popupE = document.getElementById('blormfission-popup');
  
  const update = () => {
    const x = xE.value | 0;
    const y = yE.value | 0;
    let dividend = blormfiseDividend(x, y);
    let divisor = (x + y);
    // Greatest common factor, used to simplify the fraction
    let gcf = gcd(dividend, divisor);
    if (gcf === 0 || isNaN(gcf)) {
      rE.textContent = "";
    } else {
      rE.textContent = blormfiseDividend(x, y) / gcf + '/' + (x + y) / gcf;
    }
  };

  xE.addEventListener('input', update);
  yE.addEventListener('input', update);

  let popupShown = true;
  popupButtonE.addEventListener('click', () => {
    popupShown = !popupShown;
    if (popupShown) {
      popupE.style.display = 'none';
    } else {
      popupE.style.display = null;
    }
  });
})