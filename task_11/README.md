# 課題11

## 課題１（質問）

### スナップショットテストとは？
特定の時点でのコードベースのを「スナップショット」として保存し、変更時のスナップショットとの差分を検出するテスト

### スナップショットテストで防止できる不具合
- 表示するコンポーネントの想定外の不具合
- 表示する要素の想定外の不具合
- その他、DOM構造が変化する不具合

### スナップショットテストで防止できない不具合
- DOM構造の変化しない不具合
- CSSの想定外の変更
- 新規のコンポーネントの不具合

## 課題２（実装）

- [作成物](my-app)

#### snapshot testに必要なパッケージインストール
```
yarn add -D @storybook/addon-storyshots react-test-renderer
```


## 課題３（クイズ）

1.


<details>
  <summary>回答例</summary>


</details>



### （Optional）
- SnapShotの単体テストをつくってみよう
- css-in-jsライブラリを利用してコンポーネントを作り直してみよう

  - https://reactjs.org/docs/testing-recipes.html
  - https://github.com/styled-components/jest-styled-components
  - https://zenn.dev/itomise/articles/e6386441cac697




