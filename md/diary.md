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

Ruby | JavaScript
-- | --
falseとnilは偽。それ以外は真。 | 途中
途中 | 途中 

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