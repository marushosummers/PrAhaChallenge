#### fork from https://github.com/praha-inc/praha-challenge-templates/tree/master/jestSample

# 課題10

## 課題１（実装）

- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)を行う
- [作成物](my-app)


## 課題２（実装）

- 盤面を△で埋め尽くした状態のstoryを作る
- [作成物](my-app)

#### 参考)StoryBookとCRAでのバージョン競合の解消

```
npx sb init --type react_scripts -f
yarn add -D --exact babel-loader@8.1.0
```


## 課題３（質問）

- Storybook開発のメリット
  - コンポーネントからのボトムアップ開発が行いやすい
  - デザイナーとのコミュニケーション齟齬が減る
  - バックエンドに依存せずテストや実装の確認を行える
  - (メンテナンスされていれば)UI/コンポーネントのカタログとして利用できる

- デメリット
  - storyファイルの実装コスト
  - storyファイルの保守コスト
  - storybookに関する知識のキャッチアップコスト

## 課題４（クイズ）

1. Storybookには便利なaddonが多数あります。1つaddonを上げて機能を説明してください
2. StorybookはReact用のUI Component管理ツールであるか？
3. StorybookでTypeScriptを利用するための設定はどのファイルに記述すれば良いでしょうか


<details>
  <summary>回答例</summary>

1. [addon-viewport](https://github.com/storybookjs/storybook/tree/release/3.4/addons/viewport): PCやスマホなどの各種デバイスごとのUIを確認できる
2. [いいえ。各種フレームワークをsupportしている。](https://github.com/storybookjs/storybook#supported-frameworks)
3. [main.js](https://storybook.js.org/docs/react/configure/typescript)
</details>
