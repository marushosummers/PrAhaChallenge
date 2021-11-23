# 課題42: State hooks を理解して ToDo アプリを実装しよう

## 課題１

### Hooksのメリット

- コンポーネント間でのロジック共有が容易になる
- クラスコンポーネントを使わないためコード量が削減できる
- props、stateの管理を減らせる

### 外部Hooksの例

- [useClickAway](https://github.com/streamich/react-use/blob/master/docs/useClickAway.md)
- モーダルの外をクリックしたらモーダルを閉じる、などが実装できそう

参考: [react-use の実装から学ぶ custom hooks](https://zenn.dev/kobayang/articles/9145de86b20ba6)
## 課題2

以下のTodoアプリのリファクタリング

https://codepen.io/philmayfield/full/MwRgyN

### 回答
[`app/nextjs-blog/components/todo`](https://github.com/marushosummers/PrAhaChallenge/tree/statehooks/frontend/app/nextjs-blog/components/todo)に実装

## 課題3

### 「Container」と「Presentational」とは

#### Presentational Component

- 見た目に関する責任を負う。
- 子要素として、Presentational Component、Container Component のどちらも持ちうる。
- DOM マークアップやスタイルを持つ。
- this.props.children を受け取る。
- 自分のコンポーネント以外のことについて依存しない。（例：Flux アクションや Store など）
- データを自身で勝手に読み込んだり、改変しない。
- データやコールバックは、親から Props として受け取る。
- State を持つことは少ない（持ったとしても、自身の UI に関する状態だけ）。
- Functional Component として書かれる。Component State や Lifecycle Hook、パフォーマンス調整の必要がなければ。
- 主な使用例：Page, Sidebar, Story, Userinfo, List

#### Container Component
- アプリケーションの動作に関する責任を負う。
- 子要素として、Presentational Component、Container Component のどちらも持ちうる。
- DOM マークアップやスタイルを持たない。
- データ及びデータを扱うためのファンクションを Presentational Component に提供する。
- Flux Action を発火する。また、発火するためのファンクションを子要素に提供する。
- State を持つ。データソースとして機能する。
- react-redux.connect()などの HOC を使って生成される。
- 主な使用例：UserPage, FollowersSidebar, StoryContainer, FollowedUserList

### メリット

- アプリケーション部分と UI 部分を分離できる
- 再利用性が高い
- Container に重複したレイアウトを記載しなくなる。（Sidebar や Page といったレイアウトを Presentational Component として抽出することを強制される。Container から、レイアウトコンポーネントに対して children を渡してやるスタイル。）

> 引用: [Presentational ComponentとContainer Component](https://www.yuuniworks.com/blog/2018-05-18-presentational-component%E3%81%A8container-component/) 

### リファクタリング

以下のように、Container Component と Presentational Component を分離している。

- `app/nextjs-blog/components`配下は`Presentational Component`のみ
- `app/nextjs-blog/pages/index.js`は`Container Component`

## 課題4

useStateに関するクイズ


1. `useState`はクラスコンポーネントの `setState` メソッドとは異なり自動的な更新オブジェクトのマージを行いません。どうすればよいか。

2. stateの初期値が重い処理によって算出される場合、レンダリングが遅くなる可能性があります。どう回避すればよいか。

3. TypeScriptでStateの型を指定するときはどのように書けばよいか。


<details>
  <summary>回答例</summary>

1. 更新形式をスプレッド構文と併用することで再現可能
```js
const [state, setState] = useState({});
setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues};
});
```

2. 初期Stateとして、関数を渡すことで遅延初期化できる。
```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

3. 
```js
const [data, setData] = useState<Number>(10);
```
