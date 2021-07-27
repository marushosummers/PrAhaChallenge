# 課題39: 適切にコンポーネントを分割して1ページ作ってみよう

## 課題１

### アトミックデザインとは

パーツ・コンポーネント単位で構成するUIデザイン手法。

ページの完成形をイメージし、全体のバランスを見ながらデザインする手法に対し、

小さな素材を大量に作り、組み立てながら必要な場所に配置していく手法。

細かく分割されていることにより、素材デザインの変更が容易でチーム開発がしやすいメリットがある。

#### page

Webページの最終形。

`template`に各コンテンツを入れ込むことで作成される。

#### template

organism, molecule, atomを組み合わせて構成される。

ヘッダーやフッター、ホームページのテキスト配置、画像配置、検索機能などを含むワイヤーフレーム。

#### organism

molecule, atomを組み合わせて構成される。
ヘッダーやフッターなど、ページに組み込むための集合体。

#### molecule

複数のatomの組み合わせで構成される。

検索窓やカードなど、使い回しができる小さなコンポーネント。

#### atom

最小単位のコンポーネント。

ラベルやボタンなどパーツ。

- 参考: [Atomic Designを分かったつもりになる](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B)


### 関数コンポーネントとクラスコンポーネントの違い

コンポーネントの定義方法には2種類がある。
Reactの視点からはこの2つは等価だが、以下の観点から関数コンポーネントの利用が良い。

- thisを使う必要がなくなる
- メソッドをbindする必要がなくなる
- constructor, renderが不要になる
- ライフサイクルメソッドに分割する必要がないため同一ロジックが混入しにくい
- コンポーネント間でステートフルロジックを共有することが容易

参考:
- [コンポーネントと props](https://ja.reactjs.org/docs/components-and-props.html)
- [Reactでクラスコンポーネントより関数コンポーネントを使うべき理由5選](https://tyotto-good.com/blog/reaseons-to-use-function-component)
- [【React】クラスコンポーネント /関数コンポーネントの違いと使い分け](https://qiita.com/shane/items/b936550820de9a88ad60)


#### 例: class component（クラスコンポーネント）

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

`React.Component`を継承することで、状態管理やライフサイクルメソッドなどを持つことができる。
#### 例: function component（関数コンポーネント）

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
```

Hooksを使うことで、`useEffect`などの関数で状態管理やライフサイクルメソッドを持つことができる。


## 課題2

以下のサイトをatomic designで実装する

https://tailwindcomponents.com/component/blog-page/landing

- Tailwind CSSのinstall
```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

- [HTML to JSX](https://magic.reactjs.net/htmltojsx.htm)
