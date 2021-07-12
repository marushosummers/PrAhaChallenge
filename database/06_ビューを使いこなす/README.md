# 課題20: ビューを使いこなす

## 課題１（質問）

### ビュー(View)とは？
他のテーブルからSELECTした結果を新しいテーブルとして扱えるしくみ。

ビューは実際のデータを保存されておらず、SELECTクエリのみが保存されるため、データを二重にもつことが無い。

### 用途・メリット
サービスやアプリで高頻度で使用するクエリをビューにしておくと、コードが綺麗になり可読性が上がる。

また、ビューごとに参照権限を設定できるため、アプリ側に渡したくない秘匿情報を隠したり、ミスによる異なる情報へのアクセスを防ぐことができる。

### Materialized Viewとは？

通常のビューとは異なり、クエリ結果のデータを保持しているビュー。

実行時間が短縮できるため、集計テーブルなどの計算時間のかかる情報にアクセスする際に有効。

データのリフレッシュ方法を設定でき、定期実行や元テーブルへの変更があったときに行われる。

* [Postgresql: マテリアライズドビュー](https://www.postgresql.jp/document/9.3/html/rules-materializedviews.html)
* [参考: 3分でわかるマテリアライズド・ビュー](https://qiita.com/wanko5296/items/61c3e6ec4561b26beb5c)

## 課題２（実装）

- 現在の肩書きが`Technique Leade`の従業員Noを検索するクエリ
```sql
SELECT emp_no FROM titles WHERE title = 'Technique Leader' and to_date LIKE '9999%';

> 12055 rows in set, 1 warning (0.28 sec)
```



### ビューの作成

```sql
CREATE VIEW view_technique_leaders AS SELECT emp_no FROM titles WHERE title = 'Technique Leader' and to_date LIKE '9999%';
```

- ビューから同様のデータを取得するクエリ
```sql
SELECT emp_no FROM view_technique_leaders;

> 12055 rows in set, 1 warning (0.14 sec)
```


- 同様のデータをテーブルで定義

```sql
CREATE TABLE `technique_leaders` (
  `emp_no` int(11) NOT NULL,
  PRIMARY KEY (`emp_no`)
);

Insert INTO  technique_leaders (emp_no) SELECT emp_no FROM titles WHERE title = 'Technique Leader' and to_date LIKE '9999%';
```


### クエリパフォーマンスの変化

- Viewを使ったクエリは、パフォーマンスに大きな変化無し
- テーブルにデータを入れた場合は137ms -> 3.5ms と速くなった

```
+-------------------------------------------------------------------------------------+-----------+
| sql_text                                                                            | time      |
+-------------------------------------------------------------------------------------+-----------+
| SELECT emp_no FROM titles WHERE title = 'Technique Leader' and to_date LIKE '9999%' | 137.42 ms |
| SELECT emp_no FROM view_technique_leaders                                           | 138.74 ms |
| SELECT emp_no FROM technique_leaders                                                | 3.49 ms   |
+-------------------------------------------------------------------------------------+-----------+
```

- クエリパフォーマンスの計測クエリ
```sql
SELECT sql_text, sys.format_time(timer_wait) AS time FROM performance_schema.events_statements_history WHERE sql_text IS NOT NULL;
```

