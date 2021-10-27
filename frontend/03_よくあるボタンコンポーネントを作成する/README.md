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


## 課題3

1. children要素を受け取る形でボタンのpropsを定義すること
2. ボタンのテキスト文言だけを受け取るようにpropsを定義すること

どちらを採用するべきか?

2にした場合、スタイルの数だけコンポーネントが作成されてしまうため、似たようなコードが多く生成されてしまう。

Atomic Designのように使い回すことを前提にしている場合は、1のようにスタイルはpropsで受け取った方が望ましい。

