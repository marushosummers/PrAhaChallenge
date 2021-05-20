# 課題19: データベースにおけるNULLの扱い

## 課題１ NULLのふるまいを確認する

- NULL = 0 :FALSE

`SELECT COUNT(*) FROM employees WHERE NULL = 0;`
=> 0件

- NULL = NULL :FALSE

`SELECT COUNT(*) FROM employees WHERE NULL = NULL;`
=> 0件

- NULL <> NULL :FALSE

`SELECT COUNT(*) FROM employees WHERE NULL <> NULL;`
=> 0件

- NULL AND TRUE :FALSE

`SELECT COUNT(*) FROM employees WHERE NULL AND TRUE;`
=> 0件


- NULL AND FALSE :FALSE

`SELECT COUNT(*) FROM employees WHERE NULL AND FALSE;`
=> 0件

- NULL OR TRUE :TRUE

`SELECT COUNT(*) FROM employees WHERE NULL OR TRUE;`
=> 0件

## 課題２

- 以下のテーブル設計を見直して、IssueテーブルがNULLを含まないようにする

```
TABLE Assignee {
  id: varchar NOT NULL
}

TABLE Issue {
  id: varchar NOT NULL
  text: varchar NOT NULL
  assigned_to_id: varchar -- NULLになり得る
}
```

- リレーションテーブルを作成する
```
TABLE Issue_assinees {
  id: varchar NOT NULL
  issue_id: varchar NOT NULL
  assignee_id: varchar NOT NULL
}

Issueテーブルのassigned_to_idは削除
```

上記で解決できるが、userテーブルが存在する場合は、以下の理由からassigneeテーブルをリレーションテーブルとして使うのが良さそう
- テーブル名と役割が明確になる
- userとagineeでのデータ重複を避けられる

```
TABLE Issue {
  id: varchar NOT NULL
  text: varchar NOT NULL
}

TABLE Assignee {
  id: varchar NOT NULL
  issue_id: varchar NOT NULL
  user_id: varchar NOT NULL
}

TABLE User {
  id: varchar NOT NULL
  name: varchar NOT NULL
}
```

## 課題３(クイズ)

1. `NULL`かどうかを条件に加えたい場合は、どのように書けば良いか
2. `TRUE`, `FALSE`, `NULL`のような3つの真理値を扱うことを何と呼びますか
3. パフォーマンスチューニングにおいて、`NULL`を含む場合に気をつけるべきことは何か

<details>
  <summary>回答例</summary>

1. `IS`, `IS NOT`を使う

2. 3値論理

3. インデックスはNULLを含む検索には使用されない: [参考 IS NULLの最適化](https://dev.mysql.com/doc/refman/5.6/ja/is-null-optimization.html)
</details>
