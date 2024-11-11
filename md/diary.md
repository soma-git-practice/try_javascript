# 24/11/12

アロー関数はthisを持たない。アロー関数が実行された時には親スコープのthisが使われる。

thisを指定することもできるようだ。今日は電卓進める。

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