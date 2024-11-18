"use strict";
console.clear();

// コンストラクタ関数
function User(name) {
  this.name = name;
};

// コンストラクタ関数を宣言するとprototypeプロパティが追加されていることの確認。
console.log(User.prototype); // => {}

// prototypeプロパティのintroductionプロパティに関数オブジェクトを設定する。
User.prototype.introduction = function () {
  console.log(`はじめまして！SomOfGitさん、私の名前は${this.name}です。`);
};

// インスタンス化
const instance = new User('太郎');

// インスタンスの__proto__プロパティとコンストラクタのprototypeプロパティの値は同じ場所を参照している。
console.log(instance.__proto__ === User.prototype);


// -----------------

// クラスもprototypeプロパティを持っている
class Hoge {
  constructor(name) {
    this.name = name;
  }

  introduction() {
    console.log(`My name is ${this.name}`);
  }
}

console.log(Hoge.prototype.introduction); // # => function(){`My name is ${this.name}`}