# 課題31 設計原則(SOLID)

## SOLID原則

オブジェクト指向でのソフトウェア開発において、柔軟で、可読性が高く、保守性の高い設計を行うための重要な指針です。

オブジェクト指向という仕組みをどのように使うと良いかを、5つの原則としてまとめています。

- Single Responsibility Principle：単一責任の原則
- Open/closed principle：解放閉鎖の原則
- Liskov substitution principle：リスコフの置換原則
- Interface segregation principle：インターフェース分離の原則
- Dependency inversion principle：依存性逆転の原則

(SOLID原則は、Robert C. Martinにより提唱された多数のソフトウェア設計の原則の一部を集めたもの)


### 参考
- [Wikipedia](https://ja.wikipedia.org/wiki/SOLID)
- [SOLID原則について簡単に書く](https://qiita.com/yui_mop/items/93fef037a787318e7067)
- [開発者が知っておくべきSOLIDの原則](https://postd.cc/solid-principles-every-developer-should-know/)
- [The S.O.L.I.D Principles in Pictures](https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898)
- [自分なりにSOLIDの原則を理解する](https://qiita.com/k-penguin-sato/items/86b8262bfbe189fc72c3)
## 単一責任の原則と、単純にファイルを細かなファイルに分解することの違い

### 単一責任の原則とは
```
1つのクラスは1つだけの責任を持たなければならない
```

単一責任の原則は、変更を加えた際に他の無関係な動作に影響を与えないように、動作を分離することを目的としています。
そのため、ファイルを分割する(例えば可読性を上げるために)ことは上記の目的を満たさないことがあります。

単一責任にするために、クラスにメソッドを追加することもあるので、ファイルの分割と単一責任の構成にすることは根本的に異なります。

#### 単一責任とは？

１つのクラスに複数のアクターが存在する場合、単一責任に違反している。

アクターとは、その処理の利用者であり、責任者のこと。

例えば以下のような`Employee`というクラスがあるとする。

```java
public class Employee {
  public Money calculatePay();
  public void save();
  public String reportHours();
}
```

これは`Employee`という１つの概念としてはまとまっているが、実態としては別の部門のロジックで変更が加わる。

- `calculatePay()`: 経理部門で修正される
- `save()`: データベース管理部門で修正される
- `reportHours()`: 総務部門で修正される

このため、各メソッドはそれぞれ別クラスで扱うことが望ましい。

```java
public class PayCalculator {
    public Money calculatePay();
}

public class HourReporer {
    public void save();
}

public class EmployeeSaver {
    public String reportHours();
}
```

[The Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)

## Open-Closed-Principleの実例

```
Classは拡張に対して開かれていなければならないが、変更に対しては閉じていなければならない
```

クラスの変更によって、他でそのクラスを使っている箇所でのバグを産まないことを目的としています。

例えば、価格の値下げを行う`Discount`クラスがある場合。

```javascript
class Discount {
    giveDiscount() {
        return this.price * 0.2
    }
}
```

得意先に対しては倍の値引き率を適用したい場合に、以下のように変更を加えると、この原則に違反します。

```javascript
class Discount {
    giveDiscount() {
        if(this.customer == 'fav') {
            return this.price * 0.2;
        }
        if(this.customer == 'vip') {
            return this.price * 0.4;
        }
    }
}
```

これを回避するために、継承したクラスを作ります。

(メイヤーの開放/閉鎖原則)
```javascript
class VIPDiscount: Discount {
    getDiscount() {
        return super.getDiscount() * 2;
    }
}
```

ほかにも、インターフェースや抽象クラスを利用して、拡張性を作ることで回避する方法もある(ポリモーフィックな開放/閉鎖原則)。

## リスコフの置換原則に違反した場合の不都合
```
プログラムの中にある任意のオブジェクトは、プログラムの正しさを変化させることなく、そのサブクラスのオブジェクトと置換できなければならない
```

この原則は、親クラスやその子クラスがエラーなしで同じ方法で使用できるように、一貫性を保つことを目的としています。

不都合の例として、オープンクローズの原則によって子クラスを生成した際に、

親クラスから子クラスへの置換が必要だが、このとき動作が一貫しないとバグが発生してしまう。

## インターフェースのメリット

```
汎用的な目的のインターフェイスが1つだけあるよりも、特定のクライアント向けのインターフェイスが多数あった方がよりよい
```
この原則は、動作のセットをより小さく分割して、クラスが必要なもののみを実行することを目的としています。

メリットは、必要なインターフェースのみを使うことで関心の分離を行うことができ、それによって予期しないバグを減らすことができます。

## どんな時に依存性の逆転を用いる必要が生じるのか
```
・上位モジュールは、下位モジュールに依存してはならない。どちらも抽象化に依存すべきだ。
・抽象化は詳細に依存してはならない。詳細が抽象化に依存すべきだ。
```

上位モジュール（またはクラス）：ツールを使って動作を実行するクラス
下位モジュール（またはクラス）：動作を実行するために必要なツール
抽象化：2つのクラスをつなぐインターフェイス
詳細：ツールの動作方法

依存性の逆転を行う必要があるのは、下位モジュールが複数の上位モジュールに使用される際など、
下位モジュールへ変更によって他のモジュールへの影響が想定される場合である。

上位モジュールにインターフェースや抽象クラスを作成し、そこに下位モジュールをInjectionする形にすることで関心の分離を行うことができる。

# 結合度と凝縮度

こちらのスライドが参考になります
[良いコードとは何か](https://note.com/cyberz_cto/n/n26f535d6c575)

## 凝縮度

下に行くほど凝縮度が高く、良いとされる

- 偶発的凝集
- 論理的凝集
- 時間的凝集
- 手続き的凝集（手順的凝集）
- 通信的凝集
- 逐次的凝集
- 機能的凝集

## 結合度

下に行くほど結合度が低く、良いとされる

- 内部結合
- 共通結合
- 外部結合
- 制御結合
- スタンプ結合
- データ結合
- メッセージ結合
