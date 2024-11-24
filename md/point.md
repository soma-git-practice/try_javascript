# Falsyな値

Ruby | JavaScript
-- | --
https://docs.ruby-lang.org/ja/latest/class/FalseClass.html | https://developer.mozilla.org/ja/docs/Glossary/Falsy

# 関数コンテキストでのthis

* メソッドとして実行した場合は、そのメソッドを持つオブジェクトがthisの値になる。
* 関数として実行した場合は、グローバルオブジェクト（window）がthisの値になる。

# アロー関数のthis
アロー関数はthisを持たない。アロー関数内でthisを使うと、親スコープの（関数コンテキスト or グローバルスコープ)のthisが使われる。

# superメソッド

RubyもJavaScriptもスーパークラスのオーバーライドするメソッドを呼び出すメソッドだが違いがあった。

Ruby | JavaScript
-- | --
initializeメソッドはsuperメソッドが任意。 | constructorメソッドはsuperメソッドがthisが呼び出される前に必須。（ReferenceErrorになる）
\- | [MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/constructor#%E8%A7%A3%E8%AA%AC)

# プライベートプロパティ
JavaScriptは、プロパティとメソッドの頭文字にシャープがあるとプライベートになる。
プライベートなプロパティはconstructor含めメソッド内で宣言することはできない。
Rubyはプライベートなメソッドはあるがプライベートなプロパティという考え方はないんではないだろうか？

#### ruby
```ruby
class Hoge
  private

  def say
    puts 'ヤッホー'
  end
end
```

#### JavaScript
```javascript
class Hoge {
  #hoge(){
    console.log('ヤッホー');
  }
}
```

# ゲッター
Rubyはゲッターを明示的に記述しないとインスタンス変数の値を取得することはできないが、
JavaScriptは明示的に記述しなくてもプロパティを取得することはできる。
インスタンス変数とプロパティは似てるけど別物なんだな。

JavaScript
```JavaScript
class User { constructor() { this.name = '太郎' } }
const obj = new User;
console.log(obj.name);

// => 太郎
```

Ruby
```ruby
class Hoge
  def initialize
    @val = '太郎'
  end
end

j = Hoge.new;
p j.val
# => undefined method `val'
```

# オブジェクト指向（よくわからん）
* Rubyはクラスベースのオブジェクト指向。
* JavaScriptはプロトタイプベースのオブジェクト指向。

# 分割代入
JavaScriptの分割代入はRubyより多機能。
RubyよりもJavaScriptの方が分割代入を使う機会が多いからこんなことになってるのでは？
なんでこんな差が生まれたんだろう？
* 分割代入にデフォルト値を設定することができる。
* 配列だけでなく、オブジェクトリテラルに対して分割代入をすることができる。
* 関数の仮引数で分割代入を使うことができる。

分割代入チェックしとく。積極的に使っていくぞ。

# プライベートプロパティへのアクセス
開発者コンソールではクラス外からプライベートプロパティにアクセスすることができるため注意必要

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_properties#%E8%A7%A3%E8%AA%AC

# スプレッド演算子で結合
配列リテラル、オブジェクトリテラルはスプレッド演算子「...」を使うことで結合することができる。

```javascript
const a = [1, 3, 4, 5];
console.log(['a', 'b', ...a]);

const b = { a: 'a', b: 'b' };
console.log({ c: 'c', ...b });
```