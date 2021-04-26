# 課題12

## 課題１（質問）

### ビジュアルリグレッションテストの実装
- `storyshot-puppeteer`を使用する
- Squareの中身（o,x）を赤色に変えてみる
- 3x3ではなく、4x3のboardを作成してみる

#### 実装

`task_11/my-app`にて引き続き実装
- `storyshot-puppeteer`をinstallする
```
yarn add　puppeteer
yarn add @storybook/addon-storyshots-puppeteer
```

- `src/storyshots.test.js`でimageを取得するように変更
- ImageSnapShotのファイルは`src/__image_snapshots__`に格納


### 課題２（質問）

ビジュアルリグレッションテストとスナップショットテストを比較した時、それぞれにどのようなメリット・デメリットがあるか？

### メリット
- ビジュアルリグレッションテストは実際の見た目の比較テストを行えるため、CSSのスタイルの変更をカバーすることができる。

### デメリット
- 微小なスタイル変更でもFailとなり、メンテナンスコストが高い。Snapshotデータも画像ファイルとなるため、git管理に向いていない。


## 課題３（クイズ）

1. `puppeteer`はブラウザ操作ライブラリですが、他の同様なブラウザ操作を行うライブラリを上げて比較してください
2. `puppeteer`を導入することで可能になるテストの例を上げてください
3. OSやブラウザが異なる環境でもテストを行えるでしょうか


<details>
  <summary>回答例</summary>

1. `selenium`: puppeteerより多機能であり、他の言語でも利用可能。一方、puppeteerの方がNodeでの操作に特化しており、今回の様なビジュアルテストの実装に向いている。
2. クリック時の動作など、ブラウザ操作による挙動テスト
3. 解像度やOS依存のフォントにより差分が出てしまうことがある。基本的にCIで実行環境を揃えるのが良い

参考: 
- [puppeteerで始めるブラウザ操作の自動化](https://www.cresco.co.jp/blog/entry/15215/)
- [制作現場におけるビジュアルリグレッションテストの導入](https://engineering.linecorp.com/ja/blog/visual-regression-otoshidama/#:~:text=%E3%83%93%E3%82%B8%E3%83%A5%E3%82%A2%E3%83%AB%E3%83%AC%E3%82%B0%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%86%E3%82%B9%E3%83%88%E3%81%AF%E3%81%BB%E3%81%BC%E5%AE%8C%E7%92%A7%E3%81%AA%E3%83%86%E3%82%B9%E3%83%88%E3%81%8C,%E4%BD%9C%E6%A5%AD%E3%81%8C%E7%99%BA%E7%94%9F%E3%81%97%E3%81%BE%E3%81%99%E3%80%82)
</details>
