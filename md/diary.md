# 24/12/07
stopPropagationのサンプル作る。
stopPropagationのサンプル作ってどんな動きする確認した。
そんなに使うことあるのか？ って思っているから次に進むことにした。

#### stopImmediatePropagation

Immediate | Propagation
-- | --
すぐに | 伝播

"すぐに" "伝播" "止める"。  
わー、英語知ってる人に親切な名前してるな。英語読める人が羨ましい。  

泊まることを確認できた
```javascript
<button type="button">ボタン</button>
<script>
  const btn = document.querySelector('button');
  btn.addEventListener('click', () => console.log('btn'));
  btn.addEventListener('click', (event) => {
    console.log('btn last');
    event.stopImmediatePropagation();
  });
  btn.addEventListener('click', () => console.log('動く？') );
</script>
```

targetとcurrentTargetは常に一致するとは限らないようだ。

target ・・・ イベント発火場所  
https://developer.mozilla.org/ja/docs/Web/API/Event/target  

currentTarget ・・・ アクションが登録された場所  
https://developer.mozilla.org/ja/docs/Web/API/Event/currentTarget  

都度調べれば良さそう。

すごい！！ wheelイベントで拡大縮小できるんだ！  
https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event


残るは...非同期処理

ーーメモーー  
読まずに飛ばしてたけどDOMの章も面白いかも。  
closestメソッド便利じゃん！  

# 24/12/06
mouseleaveイベントを動かしてbubblesプロパティ確認した。  
ちゃんとfalseしてた。
```javascript
<div class="Parent"></div>
<style>.Parent { box-sizing: border-box; width: 0; padding: 50px; background-color: aqua; }</style>
<script>
  const parent = document.querySelector('.Parent');
  counter = 0;
  parent.addEventListener('mouseleave', function(event){ this.textContent = ++counter; console.log(event.bubbles); });
</script>
```

あれ？待てよ？昨日までの自分は子要素のclickイベントが親のmouseleaveイベントに伝播すると勘違いしてた。  

だから、「親に伝播しない or 子から伝播しない」どっちなんだろ？と気になってた。  
だけどキャプチャリングフェーズとバブリングフェーズの説明に "同じタイプ"のイベント が伝播すると書いてあった。  
だったら親要素・子要素関係ないじゃん！

メモ：  
コンストラクタ = オブジェクトを生成する雛形 = クラスだ！  
MDNの先頭の方に書いてある 「コンストラクター」 は、  
Rubyリファレンスの先頭のほうに書いてある 「クラス・モジュールの継承リスト」 と近いと気づいた。

Ruby | JavaScript
-- | --
user.class # => User | user.constructor.name // => User

独習JavaScript好きだ！わかりやすい  

#### stopPropagation
* キャプチャリングフェーズでstopPropagationを呼び出すと子要素への伝播を止める。
* ターゲットフェーズ、バブリングフェーズでstopPropagationを呼び出すと親要素への伝播を止める。

TODO stopPropagationのサンプル自作と動作確認

# 24/12/05
キャプチャリングフェーズで実行するイベントを全て見つける  
↓  
ターゲットフェーズで見つけたイベント対象のイベントを発火する。
イベント対象ってのがよく分かってなくてdomの末端ってこと？
でも24/12/05でchildの範囲外のparentクリックしたらchildが反応しなかったから、
末端のdomというわけではない。  
↓  
バブリングフェーズではアクションフェーズでイベントを実行した要素の親要素のイベントを順に発火する。  

一部のイベントはバブリングしない。バブリングするかどうかはイベントオブジェクトのbubblesプロパティで判別することができるようだ。実際に確認してみるぞ！

子要素のイベントオブジェクト、親要素のイベントオブジェクトのbubblesどちらを確認すればいいんだろ？  
イコール、親に伝播しない or 子から伝播しない　どっちなんだろ？

「独習JavaScript」にはmouseleaveはバブリングしないと書いてる。  
クリックイベントとmouseleaveイベントを使って動作確認するぞ！  

bubblesプロパティとstopPropagationメソッド試した。
```html
<div class="parent">
  <p class="text">親タグですよー</p>
  <div>
    <div>
      <button class="child">ボタン</button>
      <div class="counter">0</div>
    </div>
  </div>
</div>
<script>
  const parentEvent = function (event) {
    console.log('親イベント' + event.bubbles);
  };
  const childEvent = function (event) {
    event.stopPropagation();
    console.log('子イベント' + event.bubbles);
  };
  const parentElm = document.querySelector('.parent');
  const childElm = document.querySelector('.child');
  parentElm.addEventListener('click', parentEvent);
  childElm.addEventListener('click', childEvent);
</script>
```

TODO  
mouseleaveイベントの動作確認とbubblesプロパティ、「親に伝播しない or 子から伝播しない」どちらなのか確認する。  

# 24/12/04
イベントには３つのフェーズがある。  
キャプチャリング・ターゲット・パブリング

キャプチャリングがよく分からない。
利用者がボタンを押すと、ボタンの親タグが一番親から順番にみていきクリックイベントが親タグにも合ったらそれも動作させる。というので合ってるか？コード書いてみた。  
合ってた。親タグのクリックイベントも動作した。  
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" type="text/css" href="">
  </head>
  <body>
    <div class="parent">
      <p class="text">親タグですよー</p>
      <div>
        <div>
          <button class="child">ボタン</button>
          <div class="counter">0</div>
        </div>
      </div>
    </div>
    <script>
      document.querySelector('body').style.backgroundColor = 'black';
      document.querySelector('body').style.color = 'white';
      const countIterator = {
        count: 0,
        next: function(){
          return { done: false, value: ++this.count };
        }
      };
      const changeColorRandom = function (event) {
        const textElm = this.querySelector('.text');
        const randomColor = ['aqua', 'fuchsia', 'lime', 'yellow'][Math.floor(Math.random() * 3)];
        textElm.style.color = randomColor;
      };
      const countClick = function (event) {
        const counterElm = document.querySelector(`.${this.className} + .counter`);
        counterElm.textContent = countIterator.next().value;
      };
      const parentElm = document.querySelector('.parent');
      const childElm = document.querySelector('.child');
      parentElm.addEventListener('click', changeColorRandom);
      childElm.addEventListener('click', countClick);
    </>
  </body>
</html>
```

子をイベントさせた時に本当に、「 親のクリックイベント -> 子のクリックイベント 」の順番で伝播しているのか試したくなった。  
注意点としてキャプチャリングフェーズでは実行されないようだ。  
EventListenerのオプションに { capture: true } をつけるとキャプチャリングフェーズで実行されるらしい。  
実際に試してみたら親タグ -> 子タグに伝播しているっぽいことを確認できた。  
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" type="text/css" href="">
  </head>
  <body>
    <div class="parent">
      <p class="text">親タグですよー</p>
      <div>
        <div>
          <button class="child">ボタン</button>
          <div class="counter">0</div>
        </div>
      </div>
    </div>
    <script>
      document.querySelector('body').style.backgroundColor = 'black';
      document.querySelector('body').style.color = 'white';
      const countIterator = {
        count: 0,
        next: function(){ return { done: false, value: ++this.count }; }
      };
      const changeColorRandom = function (event) { console.log('親から始まる？'); };
      const countClick = function (event) { console.log('子から始まる？'); };
      const parentElm = document.querySelector('.parent');
      const childElm = document.querySelector('.child');
      parentElm.addEventListener('click', changeColorRandom, { capture: true });
      childElm.addEventListener('click', countClick, { capture: true });
    </script>
  </body>
</html>
```

# 24/12/03
addEventListenerでイベントを登録したことはあるが、  
removeEventListenerは使ったことがなかった。  
addEventListenerで登録したイベントをremoveEventListenerで削除するには、同じ参照先のアクションを渡す必要がある。  
これまでaddEventlistenerに無名関数を使ってきたから面白かった。  
無名関数より関数式使うのが無難なんだと思うようになった。  

#### イベントの伝播
要素でイベントが発生すると、その要素だけではなく他の要素にも影響がある（伝播する）そうだ。
どういうこと？  


# 24/12/02
非同期処理より先にイベントやる

JavaScriptを使うことでWebサイトのユーザーから通知（イベント）を受け取ることができる。  
イベントが発生した時に動作する関数（アクション）を、イベントハンドラかイベントリスナに登録する。  

イベントハンドラとイベントリスナって何？  

イベントハンドラとはイベントが発生した時に実行される関数のこと。  
コールバック関数の引数にはEventオブジェクトが渡る。  

# 24/11/27
`非同期での実行`の予約がある関数のことをタスクという。

これらはタスクじゃない
```javascript
console.log('ヤッホー');

function(){
  console.log('ヤッホー');
}

hoge = {
  name: '名前',
  hello: function(){}
}
```

非同期で呼び出す予約をした関数（タスク）はタスクキューと言われる、  
場所（複数あるのか？一つだけなのか？数は関係ないのか？）に入れられる。  
キューは先入先だし。  

イベントループはタスクキュー内のタスクを順番に実行していく仕組み。  
イベントループは定期的にコールスタックを見てコールスタックが空いていたらタスクキューからタスクを取り出してコールスタックで実行する。  

タスクキューに登録されるタスク（非同期で呼び出す予約をした関数）には複数種類がある。  
種類のことをタスクソースという。

やっぱり非同期処理の内容むずい。軽く繰り返し読み作戦にする。  
binding.pryで値を確認したり、consoleで値を確認できず、イメージで進めていく感じがなかなかきつい。  

用語説明が多く頭に入りづらい（教材を悪くいうつもりは全くない）。  
ちょっとずつモチベ下がりつつある。。。  
電卓も6割くらいできて満足気味だからこの辺で他のことに挑戦してみようかな？（書籍学習と並行で）

# 24/11/26
コールスタックは後に入れたものから先に出る。  
タスクキューは先に入れたものから先に出る。  

イベントループらへん難しい。何言ってるのか分からない。。。。  
非同期処理の管理と実行を行う仕組みのことをイベントループというらしい。
「非同期処理の管理」の「管理」って何だろう？  

実行が予約されている関数のことをタスクという。  
キューはタスクのまとまりで、キューから関数を取り出すときは入れた時期が古い順に取り出される。
実行環境（コールスタック）が空になったら、キューから関数を取り出してコールスタックで実行する。


# 24/11/26
#### 非同期処理

プログラムの始まりと終わりは糸みたいにつながっているからスレッドと呼ばれてる。  
a, b, cと関数があった時に、aを動かす。b,cは動かさない。aが終わる。bが動く。cは動かない。bが終わる。cが動く。cが終わる。と、一つずつ順番に動かすことを「同期処理」というようだ。  
非同期処理はメインスレッドから`一時的に切り離された処理`らしい。一時的にってことはどこかで切り離されて、どこかで合流するのか？  
イメージは非同期処理のコードを見かけたら、予約する。次のコードが呼ばれる。予約されたコードが呼ばれる。

次回イベントループ。  
だけどRubyのdiff-lcsを触ってみたいと思ってる。

# 24/11/24

#### イテレータ
イテレータはオブジェクトに反復処理の挙動を定義するためのオブジェクト。
どういうことだ？？？？？

イテレータオブジェクトの特徴
* nextメソッドを持つ。
* nextメソッドはdoneプロパティ、valueプロパティを持つオブジェクトを返す。
* doneプロパティは繰り返し終了か途中かの印
* valueは次の繰り返しに渡す値？（実際のサンプル触って確認するぞ）

JavaScriptのオブジェクトリテラルにメソッドを書いていることに違和感を感じた。なぜならメソッドはクラスにしか書けないとなぜか勘違いしていたからだ。
P70ちゃんと読もう。

イテレータとジェネレータというJavaScriptの用語が出てきてどっちかRubyでやったことあるなと勘違いしていた。
Rubyでやっていたのはクロージャだった。。。。JavaScriptの教材にもクロージャ登場するのかな？？
既に登場済みだった。。。。24/11/10


イテレータを持つオブジェクトを反復可能なオブジェクトというみたいだ。
イテレータは特定のプロパティに設定する必要があるようだ。

特定のプロパティってのが`[ Symbol.iterator ]`だ。プロパティにブラケットがついているものは初めて見た。
これはなんだろう？？？

for of文は反復可能オブジェクトに対して使用することができる。
反復可能オブジェクトとは何かポイントを整理してみた。

* `[Symbol.iterator]`というプロパティに関数を持つ
* 持っている関数の戻り値はイテレータオブジェクト
* イテレータオブジェクトはnextプロパティに関数を持つ
* イテレータオブジェクトが持つ関数の戻り値は、doneプロパティとvalueプロパティを持つオブジェクトリテラル
* doneプロパティはブーリアン型の値が入る。trueの場合繰り返し終了。falseの場合、繰り返し継続。
* valueプロパティはfor...of文中で宣言した変数・定数の値になる。

```javascript
const iterableObj = {
  [Symbol.iterator]: function() {
    return {
      next: function() {
        return { done: ???, value: ??? }
      }
    }
  }
}
```

350ページまで読んだ。

オブジェクトリテラルを反復可能オブジェクトにしようとしてみた。
実際に動作させることができたが、正しい書き方かどうかは不明だ。
```javascript
const hoge = {};

hoge.__proto__[Symbol.iterator] = function () {
  let number = 0;
  return {
    next() {
      if (number > 10) {
        return { done: true }
      } else {
        return { done: false, value: number++ }
      }
    }
  }
}

for (const value of hoge) {
  console.log(value);
}
```

イコール

```javascript
const hoge = {};

hoge[Symbol.iterator] = function () {
  let number = 0;
  return {
    next() {
      if (number > 10) {
        return { done: true }
      } else {
        return { done: false, value: number++ }
      }
    }
  }
}

for (const value of hoge) {
  console.log(value);
}
```

イコール

```javascript
const hoge = {
  [Symbol.iterator]: function(){
    let number = 0;
    return {
      next() {
        if (number > 10) {
          return { done: true }
        } else {
          return { done: false, value: number++ }
        }
      }
    }
  }
};

for (const value of hoge) {
  console.log(value);
}
```

コンストラクタ関数がよくわかんないから振り返った

```text
クラスはオブジェクトリテラルを作成する雛形
コンストラクタは初期化する時に実行される処理
new演算子はクラスやコンストラクタ関数からインスタンスを作成するための演算子
コンストラクタ関数内のthisはインスタンスを参照する

関数オブジェクトのprototypeプロパティは関数を宣言した時に自動的に設定される。
this.hoge = function(){}でインスタンスメソッドになる。prototypeオブジェクト内のメソッドがインスタンスメソッドというわけではない。
prototypeを完全に理解しなくても進むことはできる。
prototypeは継承で使うようだ。
```

JavaScriptのこの深掘りが実務につながったらいいな。。。。。。。つながらないだろうけど。。。。くらいに思っておこう。

イテレータのまとめはこんな感じでいいや。
```javascript
const hoge = {
  [Symbol.iterator]: function () {
    return {
      number: 0,
      next: function () {
        if (this.number >= 3)
        { return { done: true } }
        else
        { return { done: false, value: this.number++ } };
      }
    }
  }
}

for (const value of hoge) {
  console.log(value);
}
```

配列風オブジェクトも以下のような感じでうまくいくんじゃないか？

```javascript
const hoge = 配列風オブジェクト
hoge[Symbol.iterator] = function(){
  return {
    next: function(){
      { done: true, value: ??? };
    }
  }
}

for(const value of hoge){
  console.log(value);
}
```

次はジェネレータだ。
ジェネレータ見たけどイテレータの方が好きだからコード読んで登場したら理解するくらいでいいや。

#### スプレッド演算子
スプレッド演算子は配列の結合とオブジェクトの結合に使えるようだ。
そんなことができるなんて！！！！
便利！

```javascript
const a = [1, 3, 4, 5];
console.log(['a', 'b', ...a]);

const b = { a: 'a', b: 'b' };
console.log({ c: 'c', ...b });
```

12章の反復処理まで終了。
次回は非同期処理に突入。

# 24/11/23
電卓作成中に起きたことを残す。
インスタンスから静的プロパティを取得してnullであれば代入、nullでなければ実行したかった。

実際のコードは使わないが起きたことを再現した。
以下のように書き、result_functionを取得したところnullではなくundefinedが帰ってきた。

```html
<div class="hoge">Hoge</div>
<script>
class Hoge {
  static result_function = null

  constructor(){
    this.hoge();
  }

  hoge(){
    document.querySelector('.hoge').addEventListener('click', function(){
      console.log(this.constructor.result_function);
    })
  }
}

new Hoge;
// 期待
// => null

// 実際
// => undefined
</script>
```

これはaddEventListenerの関数コンテキスト内でのthisは要素を見ているからだった。
https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener

アロー関数は関数コンテキストを作らず、親スコープのthisを探しにいくためアロー関数を使うことで解決した。

```html
<div class="hoge">Hoge</div>
<script>
class Hoge {
  static result_function = null

  constructor(){
    this.hoge();
  }

  hoge(){
    document.querySelector('.hoge').addEventListener('click', () => {
      console.log(this.constructor.result_function);
    })
  }
}

new Hoge;
// 期待
// => null

// 実際
// => null
</script>
```

thisの値が間違っている時にはコンテキスト毎のthisを確認することで解決に近づけるということがわかった。
今回のコードでのデバッグでは、`.hoge`をクリックした時に発火するコールバック関数内にブレークポイントを置いてデバッグした。
javascript難しい~~~~~

javascriptでRubyのキーワード引数ってどんな感じでやるんだっけ？
この前やっていた分割代入かな？分割代入ちょっと使ってみるぞ。
JavaScriptの人のコード読んだことないしこう書くのが正解とか特に書いてないから、正しいコード書くのではなくていろいろ試してみることにした。

電卓を作成する中でプライベートプロパティを使ってみてた。
コンソール開いてプライベートプロパティを取得しようとしたところ取得できてしまった。やり方間違えた？と思っていた。
実際は開発者コンソールではクラス外からプライベートプロパティにアクセスすることができるからだった。
開発者コンソールではなくコードで動作確認したところクラス外からアクセスすることはできなかった。
勉強になった。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_properties#%E8%A7%A3%E8%AA%AC

電卓やりすぎたため今日は独習JavaScriptに移り、
その後Rubyのコードリーディングをやることにするぞ。

# 24/11/22 夜
JavaScriptは分割代入でデフォルト値を設定する書き方が用意されている。
```javascript
const [a, b = 'hoge'] = [1]
console.log(b)
// => hoge
```
Rubyには分割代入にデフォルト値を設定する書き方が用意されていない。
ということはRubyよりもJavaScriptの方が分割代入を使用する頻度が高いのではないだろうか？
Rubyで分割代入にデフォルト値を設定するとこんな感じなかな？
```Ruby
a, b = 1
puts a || 'A' # => 1
puts b || 'B' # => B
```

明日はイテレータから。電卓のリファクタ進める。

電卓の中で登場した疑問。
* constrocutrとprototypeはどう違うんだっけ？
* インスタンスから静的プロパティを取得・変更するには？
* クラス内で直で代入するこれは正しい書き方？何してんの？
```javascript
class Hoge {
  result = null;
}
```

# 24/11/22
プリミティブ型（オブジェクトで無い型）はただの値で、プロパティやメソッドは持たない。プリミティブ型に対してメソッドやプロパティが呼ばれた場合、プリミティブ型を含むオブジェクトのメソッドやプロパティが暗黙的に呼ばれる。

配列風のオブジェクトから配列に変換する場合、Arrayクラスの静的メソッドfromを使うと良い。

#### 分割代入

▼ 書き方
```javascript
let [] = 配列;
```

▼ デフォルト値を設定できる
```javascript
let [a, b = 1] = ['a'];
console.log(a, b);
// => a, 1
```

▼ 残余引数
```javascript
let [a, ...rest] = [1, 2, 3, 4];
console.log(a, rest);
// => 1, [2, 3, 4]
```

朝はここまで。
夜はオブジェクトの分割代入から開始。

# 24/11/18
プロトタイプは関数オブジェクトに保持される、インスタンスに関連のあるプロパティ。

prototypeプロパティに設定した関数はインスタンスから実行できる。

prototypeプロパティは関数を定義したときに自動的に設定される。

コンストラクタからインスタンスを作成するとき、
prototypeプロパティ内のオブジェクトへの参照が、
インスタンスの__proto__プロパティにコピーされる。

# 24//11/16
JavaScriptのクラスはES6で追加された。
それまではプロトタイプという仕組みを利用していた。
JavaScriptはプロトタイプベース言語と言われている。

元々、JavaScriptのオブジェクトはコンストラクタ関数とnew演算子で作成していた。
コンストラクタ関数はコンストラクタと同じ働きをする。

関数オブジェクトはプロトタイプ（protoptype）をプロパティとして保持している。
プロトタイプはインスタンス化に関連がある。

prototypeオブジェクトにはメソッドを格納する。
prototypeプロパティの値（オブジェクト）に登録された関数はインスタンスから実行可能になる。

prototypeプロパティはコンストラクタ関数が宣言された後に設定される。

▼ そう思った理由。
```javascript
function Person(arg){
  this.name = arg;
  prototype.hello = function(){  
    console.log('hello')
  }
}
// => prototype is not defined.

function Person(arg){
  this.name = arg;
  console.log(this.prototype);
}
// => undefined

function Person(arg) {
  this.name = arg;
}

console.log(Person.prototype);
// => {}
```

prototypeはインスタンス化の時に__proto__にコピーされる -> は？

new演算子によってコンストラクタからインスタンスを作成するとき、
コンストラクタ関数のprototypeプロパティに格納されているオブジェクトへの参照が、
インスタンスのプロパティ（__proto__）にコピーされる。

ここまで。
電卓する。

# 24/11/13

#### プライベートなプロパティ・メソッド
JavaScriptではプロパティ名、メソッド名の頭文字に`#`をつけるとプライベートなプロパティ・メソッドを宣言することができる。
プライベートプロパティはクラスのメソッドの中で定義することはできない（contructorメソッドも）。
クラスのメソッドの中で定義するとエラーになる。

プライベートプロパティをconstructorメソッドで扱えた。これがどう役に立つのかは知らないが。。。。
```JavaScript
class User
{
  #value = 0;
  constructor(val){
    this.#value = val;
  }

  hello(){
    console.log(this.#value);
  }
}

const obj = new User('ヤッホー');
obj.hello();
```

まぁ、プライベートなメソッド、プロパティは中級者向けって感じするからなぁなぁでいっか！

次はプロトタイプだがカロリーが高そうだ。。。。モチベキープのために今日は控える。電卓やるか。

# 24/11/13
javascriptでのクラスの継承の書き方はRubyと似てないな。

```JavaScript
class クラス名 extends 親クラス名 {
  ...
}
```

JavsScriptもRubyと同じく一つのクラスしか継承できない。
JavaScriptとRubyのsuperメソッドはどちらも、
オーバーライドしているメソッドをよびだすメソッドだが、違うところがあった。

Ruby | JavaScript
-- | --
呼び出すか呼び出さないかは自由。 | 子クラスでコンストラクターを拡張したい場合だけ、コンストラクターの先頭に必ずsuperを書かなければいけないルールがある。
\- | [MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/constructor#%E8%A7%A3%E8%AA%AC)

#### スーパークラスに同じ名前のメソッドが存在する場合
...時間が来たから30分電卓して続き夜やる

# 24/11/12 夜

#### クラス
オブジェクトの作成時に実行される処理のことをコンストラクタというそうだ。

静的メソッド、静的プロパティとは何？
静的メソッドと静的プロパティは初期化を行わずにクラスから直接呼び出すことができる。
Rubyのクラスメソッド、定数的なもんかな？

# 24/11/12

アロー関数はthisを持たない。アロー関数が実行された時には親スコープのthisが使われる。

thisを指定することもできるようだ。今日は電卓進める。
NodeListをループしたい時にメソッドがforEachしか思いつかなかった。しかもforEachってなんだっけ？ってなった。for...inとfor...ofも分からん。5章制御構文思い出すぞ！ 配列はfor...ofを使うと良いとコラムで書いてあるからfor...ofを使ってみることに。

https://github.com/soma-git-practice/dentaku/commit/66e160eb8973f0b681dcaf8ea2bdb7b00f25d4ae

# 24/11/11 夜
グローバルコンテキストが作成される -> 関数コンテキストが作成される。
実行前にファイルから変数とかそういうの読み取ってんのかな？

グローバルコンテキストにはwindowオブジェクトとthisが含まれている。
グローバルコンテキストのthisはwindowオブジェクトと等しい。
グローバルコンテキストではthis使わないのかな？

#### 関数コンテキスト
関数コンテキストには、
コンテキスト内で宣言した変数や関数, this, arguments, 親スコープ, superが含まれている。
superだけ特殊らしい。

関数コンテキストは関数が実行されるされる時に作られる。
独習JavaScriptに従ってブラウザでコンテキストを体験したら楽しかった。

#### そういえば
あれ？アロー関数ではthisがウンタラカンタラって書いてあったような...?なんだっけ？

#### 関数コンテキストでのthisの動作について確認して行った。
関数コンテキストのthisの値は関数の実行方法で変わるらしい。は？

ほぅほぅ...メソッドとして実行した場合、関数として実行した場合で変わる..のか？
rubyも関数でのselfはmainでクラス内、インスタンス内でのselfはmainじゃないもんな。
違和感はなくそうなんだと思えた気がする。

* メソッドとして実行した場合は、そのメソッドを持つオブジェクトがthisの値になる。
* 関数として実行した場合は、グローバルオブジェクト（window）がthisの値になる。「strictモードではundefinedになるそうだ。」

関数として実行した場合はグローバルオブジェクトがthisになるそうだが、
レキシカルスコープとかいうんだっけ？関係あんのかな？
クロージャで試してみるか！
レキシカルスコープは関係なかった。
windowオブジェクトが戻ってきた。

```javascript
// strictモードではない。

function outerFn() {
  function innerFn() {
    console.log(this);
  }
  return innerFn
}

const hoge = outerFn();
hoge();
// #=> window...
```

#### アロー関数とthis
...時間切れだ。また明日

# 24/11/11

## thisキーワード
thisを理解するには「実行コンテキスト」を知る必要がある。
??? Rubyの本で実行コンテキストって登場したっけ？ -> 登場してなかった。
本での勉強あまりしてこなかったからな....

実行コンテキストはコードが実行される時にJavaScriptエンジンに用意されるコードの実行環境だそうだ。

JavaScriptのコードが実行される前に必ず実行コンテキストが生成される。 
そのコンテキストには実行コンテキストごとに設定（情報）が保持されるそうだ。

* 参照可能な変数と関数（スコープと親スコープ）
* thisの参照先は？ <- これ何？
* 

# 24/11/10
気分転換をしたいと思い本での勉強と並行して電卓を作ることに決めた。

https://github.com/soma-git-practice/dentaku

ーー本ーー
#### 無名関数とアロー関数の違い
thisに違いがあるそうだ。
thisが何か知らない。

### スコープ
外部ファイルの呼び込みはスクリプトスコープになるっぽい？ -> e67c4b4

#### そういえば
即席関数って聞いたことあるけどなんだっけ？
出てきた。

関数宣言はトップレベルで宣言するとグローバルスコープに含まれる。
スコープを絞るために即席関数を使っていた。
ES６でモジュールスコープが登場して必要なくなった。

即席関数よりもES6のモジュールスコープを理解した方が得しそう。

#### クロージャ
Rubyではこんな感じのやつクロージャって言ってたよな。
クロージャって変数を記憶しておくことができる関数のことだと思っている。
```ruby
def hoge
  count = 0
  ->(){
    count += 1;
  }
end

pom = hoge
puts pom.call() #=> 1
puts pom.call() #=> 2
```

自分は実行すると引数を元に関数を作成して、
その関数を返す関数をクロージャだと思っている。

# 24/11/09

このリポジトリを始めてから、
markdown書くようになった。
githubと形式が違うことがストレスに感じgithub風のレイアウトにする拡張機能を見つけた。

https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles


markdownを書くウィンドウと作業するウィンドウを分けたいと思った。
vscodeの設定でたまに見かけるワークスペースってやつがそれじゃない？？と思って調べたら合ってた。
これ気に入った。

https://zenn.dev/chillnn_tech/articles/vscode-window-native-tabs

ーーここからが本題ーー

JavaScriptのnull合体演算子を試した。

RubyとJavaScriptでは真になるオペランド、
偽になるオペランドに違いがあった。

#### falsyな値
Ruby | JavaScript
-- | --
`false`, `nil` | `null`, `undefined`, `false`, `NaN`, `0`, `-0`, `0n`, `""`, `document.all`
https://docs.ruby-lang.org/ja/latest/class/FalseClass.html | https://developer.mozilla.org/ja/docs/Glossary/Falsy


#### null合体演算子
null合体演算子は、左のオペランドがnullかundefinedの場合右のオペランドを返す。
左のオペランドがnullまたはundefinedの場合左のオペランドを返す。
JavaScriptではRubyのメモ化をnull合体演算子でやるみたいだね。

```javascript
const value = null ?? 'ヤッホー';
console.log(value);
// #=> ヤッホー

const value2 = 'ヤッホ-' ?? null;
console.log(value2);
// #=> ヤッホー
```

#### オプショナルチェイニング
レシーバがnullまたはundefinedの場合、
メソッドは呼ばずに、undefinedを戻す。
Rubyのぼっち演算子と考えればよさそ。

```javascript
const frend = { tarou: { age: 12 }};
console.log(frend.tarou.age);
// => 12

console.log(frend.kaoru?.age);
// => undefined

console.log(frend.kaoru.age);
// Uncaught TypeError: Cannot read properties of undefined (reading 'age')
```

#### 列挙可能性
列挙可能性という言葉が出てきた。
オブジェクトはプロパティディスクリプタというプロパティで列挙可能性の設定を保持している。
プロパティディスクリプタは普段隠されているが、以下を呼ぶと確認ができるようだ。

```javascript
Reflect.getOwnPropertyDescriptor(オブジェクト, 'プロパティ')
```

#### ラベル
javascriptはブロックに名前をつけることができるようだ。
ループの内側から抜けるループを選択できるみたい！

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/label

#### 戻り値の特徴
returnを関数内にない場合、undefinedが帰る。

#### 関数って何？
関数は実行可能なオブジェクトリテラル。


# 24/11/08
「null合体演算子」と「オプショナルチェイニング」という言葉が登場した。
聞き馴染みがない。
まだ覚えていないから頑張るぞ！
タイピング練習でウォーミングアップすると朝集中して勉強しやすくなるかも？と思った。

# 24/11/07 夜
javascriptを学んでいるとあれ？rubyってどうやって書くんだっけ？ってなり恐怖だ。

vscodeでdebugする方法を知った。

https://ics.media/entry/11356/

ショートカットキーに追加した。

javascriptのファイルの先頭で `console.clear();` 指定おくと追いやすい。

| タイトル | キー |
| --- | --- |
| デバッグの開始 | ⌘t |
| デバッグの再起動 | ⌘r |

Rubyの癖でついつい変数・定数宣言を書き忘れてしまい、エラーになりがちだ。
Uncaught ReferenceError ReferenceError: ~~ is not defined.

-----

ここでincrementのthisがundefinedになることを理解できない。
thisを理解しないとわからない気がする。
一旦飛ばしてまた戻ってこよう。

クラスフィールドが入門者向けかと言われるとそうではないのではないだろうか？
まずはできるところから進めていくぞ！

https://jsprimer.net/basic/class/#this-in-class-fields

----

クラスメソッドのことをJavaScriptでは静的メソッドというみたいだ。

javascript_primerより、
独習javascriptの方が初心者寄りな気がするからまずそっち先にやってから出直すことにした。

独習javascript触りつつ、自分でアレンジしたコードを書い勉強するとより身につくかもだから試してみる。

# 24/11/07
クラスの使い方を調べ中。
rubyだとattr_reader シンボル, attr_writer シンボルでゲッターとセッターかけるが、
jsの場合setとgetを使う必要があるようだ。
クラスの外から読み取りたくない変数名はアンダースコアから始めるのが面白いなと思った。
rubyでも使えるのかな？

https://jsprimer.net/basic/class/

コミットなし

# 24/11/06
javascriptの関数式には名前をつけることができる。
関数の中からは呼び出すことはできるが、
外から呼び出せないようだ

実際に試そうとしたら躓いた。

6c1965e

# 24/11/05
この記事を見て今日のコミットを表示するエイリアスを追加した。

https://blog.toshimaru.net/git/

    git today