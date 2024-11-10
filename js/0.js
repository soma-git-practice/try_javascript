"use strict";
console.clear();

function counter(initial_num) {
  return {
    total: initial_num,
    up: function () {
      this.total++;
    }
  };
}

const raijousha_counter = counter(2);
raijousha_counter.up()
console.log(raijousha_counter.total);
raijousha_counter.up()
console.log(raijousha_counter.total);
