# 課題41: よくあるボタンコンポーネントを作成する

## 課題１

ボタンコンポーネントの作成

以下のpropsを受け取る
- children: ボタンに表示されるテキスト
- color: 'red', 'blue', 'green' のいずれか
- size: 'small', 'medium', 'large' のいずれか
- disabled: true/falseのいずれか
- onClick: クリックされた際に実行される関数
- 受け取ったpropsの値に応じてボタンの見た目が変わること
- children: ボタンの表示されるテキストを変更できる
- color: 受け取った値に応じてボタンの背景色が変わる
- size: 受け取った値に応じてボタンのwidthとheightが変わる
- disabled: ボタンの背景色が灰色になり、クリック不可になる

### 実装

`frontend/app/nextjs-blog/components/atoms/button.js`を参照

## 課題２

Storybookの作成
- 「応募する」の文言が表示された青色のmediumなボタン
- 「削除する」の文言が表示された赤色のsmallなボタン
- 上記「削除する」ボタンの押下不可になったバージョン（disalbed = true）

![スクリーンショット 2021-10-27 14 35 43](https://user-images.githubusercontent.com/32977282/139007029-88d55499-56ff-4662-9aad-baeba6f8ea1b.png)

![スクリーンショット 2021-10-27 14 35 51](https://user-images.githubusercontent.com/32977282/139007055-c116775d-e769-4956-8844-94bd136c3f84.png)

![スクリーンショット 2021-10-27 14 36 00](https://user-images.githubusercontent.com/32977282/139007059-060786c0-537e-482d-9b5c-5325aa59dd6f.png)


## 課題3

1. children要素を受け取る形でボタンのpropsを定義すること
2. ボタンのテキスト文言だけを受け取るようにpropsを定義すること

どちらを採用するべきか?

2にした場合、スタイルの数だけコンポーネントが作成されてしまうため、似たようなコードが多く生成されてしまう。

Atomic Designのように使い回すことを前提にしている場合は、1のようにスタイルはpropsで受け取った方が望ましい。

