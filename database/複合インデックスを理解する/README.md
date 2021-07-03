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

### 起動方法
```bash
> docker run -d \
  --platform linux/x86_64 \
  --name mysql-employees \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=college \
  -v $PWD/data:/var/lib/mysql \
  genschsa/mysql-employees

// すでにコンテナが存在している場合
> docker container start mysql-employees

> docker exec -it mysql-employees /bin/bash

> mysql -pcollege
```

### Where句を複数条件利用するクエリ

1. employeesから`Tsukuda Sachin`の従業員Noを検索する
```sql
SELECT emp_no FROM employees WHERE first_name = 'Sachin' and last_name = 'Tsukuda';
```

2. titlesから現在`Technique Leader`の従業員Noを検索する
```sql
SELECT emp_no FROM titles WHERE title = 'Technique Leader' and to_date LIKE '9999%';
```

3. salariesから現在`salary = 50000`の従業員Noを検索する
```sql
SELECT emp_no FROM salaries WHERE salary = 50000 and to_date LIKE '9999%';
```

### performance_schemaで実行速度を測定

- 実行速度の確認クエリ
```SQL
SELECT sql_text, sys.format_time(timer_wait) AS time FROM performance_schema.events_statements_history WHERE sql_text IS NOT NULL;
```

```
+------------------------------------------------------------------------------------+-----------+
| sql_text                                                                           | time      |
+------------------------------------------------------------------------------------+-----------+
| SELECT emp_no FROM employees WHERE first_name = 'Sachin' and last_name = 'Tsukuda'  | 71.20 ms  |
| SELECT emp_no FROM titles WHERE title = 'Technique Leader' and to_date LIKE '9999%'| 106.18 ms |
| SELECT emp_no FROM salaries WHERE salary = 50000 and to_date LIKE '9999%'          | 627.69 ms |
+------------------------------------------------------------------------------------+-----------+
```

## インデックスを追加

```sql
CREATE INDEX name_index ON employees(first_name, last_name);
CREATE INDEX title_index ON titles(title, to_date);
CREATE INDEX salary_index ON salaries(salary, to_date);
```

## 実行速度を測定

1. employeesから`Tsukuda Sachin`の従業員Noを検索する: 71.20ms -> 287.68us
2. titlesから現在の肩書きが`Technique Leader`の従業員Noを検索する: 106.18ms -> 6.04ms
3. salariesから現在の給与が`salary = 50000`の従業員Noを検索する: 627.69ms -> 287.73us


```
+-------------------------------------------------------------------------------------+-----------+
| sql_text                                                                            | time      |
+-------------------------------------------------------------------------------------+-----------+
| SELECT emp_no FROM employees WHERE first_name = 'Sachin' and last_name = 'Tsukuda'   | 287.68 us |
| SELECT emp_no FROM titles WHERE title = 'Technique Leader' and to_date LIKE '9999%' | 6.04 ms   |
| SELECT emp_no FROM salaries WHERE salary = 50000 and to_date LIKE '9999%'           | 287.73 us |
+-------------------------------------------------------------------------------------+-----------+
```

## インデックスが使われているか確認

```sql
mysql> EXPLAIN SELECT emp_no FROM employees WHERE first_name = 'Sachin' and last_name = 'Tsukuda';
+----+-------------+-----------+------------+------+---------------+------------+---------+-------------+------+----------+-------------+
| id | select_type | table     | partitions | type | possible_keys | key        | key_len | ref         | rows | filtered | Extra       |
+----+-------------+-----------+------------+------+---------------+------------+---------+-------------+------+----------+-------------+
|  1 | SIMPLE      | employees | NULL       | ref  | name_index    | name_index | 34      | const,const |    2 |   100.00 | Using index |
+----+-------------+-----------+------------+------+---------------+------------+---------+-------------+------+----------+-------------+

mysql> EXPLAIN SELECT emp_no FROM titles WHERE title = 'Technique Leader' and to_date LIKE '9999%';
+----+-------------+--------+------------+------+---------------+-------------+---------+-------+------+----------+--------------------------+
| id | select_type | table  | partitions | type | possible_keys | key         | key_len | ref   | rows | filtered | Extra                    |
+----+-------------+--------+------------+------+---------------+-------------+---------+-------+------+----------+--------------------------+
|  1 | SIMPLE      | titles | NULL       | ref  | title_index   | title_index | 52      | const |    1 |   100.00 | Using where; Using index |
+----+-------------+--------+------------+------+---------------+-------------+---------+-------+------+----------+--------------------------+

mysql> EXPLAIN SELECT emp_no FROM salaries WHERE salary = 50000 and to_date LIKE '9999%';
+----+-------------+----------+------------+------+---------------+--------------+---------+-------+------+----------+--------------------------+
| id | select_type | table    | partitions | type | possible_keys | key          | key_len | ref   | rows | filtered | Extra                    |
+----+-------------+----------+------------+------+---------------+--------------+---------+-------+------+----------+--------------------------+
|  1 | SIMPLE      | salaries | NULL       | ref  | salary_index  | salary_index | 4       | const |   69 |   100.00 | Using where; Using index |
+----+-------------+----------+------------+------+---------------+--------------+---------+-------+------+----------+--------------------------+
```
## 課題3（クイズ）

1. employeesから`Schnabel Chenxi`の従業員Noを検索する
2. titlesから現在の肩書きが`Staff`の従業員Noを検索する
3. salariesから現在の給与が`salary = 100000`の従業員Noを検索する

<details>
  <summary>回答例</summary>

1. 
```sql
SELECT emp_no FROM employees WHERE first_name = 'Chenxi' and last_name = 'Schnabel';
```

2. 
```sql
SELECT emp_no FROM titles WHERE title = 'Staff' and to_date LIKE '9999%';
```

3. 
```sql
SELECT emp_no FROM salaries WHERE salary = 100000 and to_date LIKE '9999%';
```
</details>
