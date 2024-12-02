"use strict";

let count = 0;
const btn = document.querySelector('button');
const number = document.querySelector('.number');

btn.onclick = function (event) {
  count++;
  number.textContent = count;
}

btn.onclick = null;