"use strict";

// 12が帰ってくることを期待していた。
const max = 10
const num = function add(val) {  
  val += 3;
  if (val < max) { return add(val) };
  return val
}

console.log(num(1));