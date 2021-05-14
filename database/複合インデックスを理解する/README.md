# 課題17: 複合インデックスを理解する

## 課題１（質問）

### 複合インデックスとは？

複数のカラムに対してインデックスの作ること。複数の抽出条件があるクエリを実行した時に、パフォーマンスの向上が期待できるよ。


### 姓名あるいは姓だけの検索に対して`CREATE INDEX employees_name ON employees (first_name, last_name)`がよく無いのはなぜか

複合インデックスは1カラム目は通常のindexと同様ですが、2カラム目のみを抽出条件に指定された場合、インデックスは効きません。
複合インデックスでは1、カラム目で指定された条件に合致したデータに対し2カラム目のインデックスが効くようになるためです。
今回の例では、`CREATE INDEX employees_name ON employees (last_name, first_name)` とするのが適切です。

参考: [複合インデックス](https://use-the-index-luke.com/ja/sql/where-clause/the-equals-operator/concatenated-keys)

## 課題２（実装）


## 課題3（クイズ）

1. 

<details>
  <summary>回答例</summary>


</details>
