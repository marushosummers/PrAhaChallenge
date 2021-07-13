# 課題11

## 課題１（質問）

### スナップショットテストとは？
特定の時点でのコードベースのを「スナップショット」として保存し、変更時のスナップショットとの差分を検出するテスト

### スナップショットテストで防止できる不具合
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

1. どのような場合にSnapshotテストを導入すると良いでしょうか
2. また、どのような場合はSnapshotテストを導入に不向きでしょうか
3. 自動生成される`__snapshots__`データはGit管理すべきでしょうか


<details>
  <summary>回答例</summary>

1. テストが無くリファクタしたい場合; 単体テストでカバーできない思わぬ変更を検知したい場合;
2. ランダム/膨大なSnapshotが出力されるなど、snapshotの差分の妥当性を判断するのが困難な場合
3. Yes。前回のスナップショットデータをGit管理することでCI環境での自動テストが可能になる。

参考:

[スナップショットテストのワークフロー](https://tarosky.co.jp/tarog/4662)
[スナップショットテストの向き不向きについて考えてみる](https://www.mizdra.net/entry/2021/02/04/003728#:~:text=%E3%82%B9%E3%83%8A%E3%83%83%E3%83%97%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%E3%83%86%E3%82%B9%E3%83%88%E3%81%A8%E3%81%AF%E3%80%81%E3%81%82%E3%82%8B%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0%E3%81%AE%E5%87%BA%E5%8A%9B%E3%82%92,%E3%81%82%E3%81%A3%E3%81%9F%E3%82%89%20fail%20%E3%81%95%E3%81%9B%E3%81%BE%E3%81%99%E3%80%82)
</details>



### （Optional）
- SnapShotの単体テストをつくってみよう
- css-in-jsライブラリを利用してコンポーネントを作り直してみよう

  - https://reactjs.org/docs/testing-recipes.html
  - https://github.com/styled-components/jest-styled-components
  - https://zenn.dev/itomise/articles/e6386441cac697




