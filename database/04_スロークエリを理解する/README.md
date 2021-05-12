# 課題18: スロークエリを理解する

## 課題１（実装）

### スロークエリログを有効にする

- 現在の設定を確認する
```sql
mysql> SHOW GLOBAL VARIABLES LIKE '%slow_query%';
+---------------------+--------------------------------------+
| Variable_name       | Value                                |
+---------------------+--------------------------------------+
| slow_query_log      | OFF                                  |
| slow_query_log_file | /var/log/mysql/mysql-slow.log        |
+---------------------+--------------------------------------+
2 rows in set (0.01 sec)
```

- スロークエリログを有効にする
```sql
mysql> SET GLOBAL slow_query_log = 1;
Query OK, 0 rows affected (0.00 sec)

mysql> SHOW GLOBAL VARIABLES LIKE '%slow_query%';
+---------------------+--------------------------------------+
| Variable_name       | Value                                |
+---------------------+--------------------------------------+
| slow_query_log      | ON                                   |
| slow_query_log_file | /var/log/mysql/mysql-slow.log        |
+---------------------+--------------------------------------+
```
### 実行に0.1秒以上かかったクエリをスロークエリログに記録する
```sql
mysql> SHOW GLOBAL VARIABLES LIKE '%long_query_time%';
+-----------------+-----------+
| Variable_name   | Value     |
+-----------------+-----------+
| long_query_time | 10.000000 |
+-----------------+-----------+

mysql> SET GLOBAL long_query_time = 0.1;
Query OK, 0 rows affected (0.00 sec)

mysql> SHOW GLOBAL VARIABLES LIKE '%long_query_time%';
+-----------------+----------+
| Variable_name   | Value    |
+-----------------+----------+
| long_query_time | 0.100000 |
+-----------------+----------+

```

### 実行時間0.1秒以下のクエリを3つ実行


```sql
mysql> SELECT * FROM employees WHERE emp_no = 100000;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 100000 | 1956-01-11 | Hiroyasu   | Emden     | M      | 1991-07-02 |
+--------+------------+------------+-----------+--------+------------+

mysql> SELECT * FROM titles WHERE emp_no = 100000;
+--------+--------------+------------+------------+
| emp_no | title        | from_date  | to_date    |
+--------+--------------+------------+------------+
| 100000 | Senior Staff | 1991-07-02 | 9999-01-01 |
+--------+--------------+------------+------------+

mysql> SELECT * FROM departments WHERE dept_no = 'd009';
+---------+------------------+
| dept_no | dept_name        |
+---------+------------------+
| d009    | Customer Service |
+---------+------------------+
```

### 実行時間が0.1秒より長いクエリを3つ実行

```sql

mysql> SELECT count(*) FROM titles WHERE title = 'Engineer';
+----------+
| count(*) |
+----------+
|   115003 |
+----------+
1 row in set (0.30 sec)

mysql> SELECT * FROM salaries WHERE salary = 100000;
+--------+--------+------------+------------+
| emp_no | salary | from_date  | to_date    |
+--------+--------+------------+------------+
|  14321 | 100000 | 2002-06-01 | 9999-01-01 |
|  21546 | 100000 | 2002-02-12 | 9999-01-01 |
| 222235 | 100000 | 2000-01-20 | 2001-01-19 |
| 259902 | 100000 | 1999-05-24 | 2000-05-23 |
| 261168 | 100000 | 1998-06-06 | 1999-06-06 |
| 261550 | 100000 | 2001-04-02 | 2002-04-01 |
| 400917 | 100000 | 1997-04-12 | 1998-04-12 |
| 431717 | 100000 | 1998-08-21 | 1999-08-21 |
| 439061 | 100000 | 1996-01-13 | 1997-01-12 |
| 483067 | 100000 | 1996-12-30 | 1997-12-30 |
| 489082 | 100000 | 2000-02-25 | 2001-02-24 |
| 491679 | 100000 | 1997-11-21 | 1998-11-21 |
| 491713 | 100000 | 1999-03-18 | 2000-03-17 |
+--------+--------+------------+------------+
13 rows in set (0.73 sec)

mysql> SELECT * FROM current_dept_emp WHERE emp_no = 100000;
+--------+---------+------------+------------+
| emp_no | dept_no | from_date  | to_date    |
+--------+---------+------------+------------+
| 100000 | d008    | 1991-07-02 | 9999-01-01 |
+--------+---------+------------+------------+
1 row in set (1.29 sec)
```

### スロークエリログの確認

- 0.1秒以上のクエリのみがログとして出力されている
```bash
root@e6f52d5be07c:/# cat /var/log/mysql/mysql-slow.log
# Time: 2021-05-17T01:03:49.470649Z
# User@Host: root[root] @ localhost []  Id:     5
# Query_time: 0.151008  Lock_time: 0.000114 Rows_sent: 1  Rows_examined: 443308
use employees;
SET timestamp=1621213429;
SELECT count(*) FROM titles WHERE title = 'Engineer';

# Time: 2021-05-17T01:04:03.165494Z
# User@Host: root[root] @ localhost []  Id:     5
# Query_time: 0.756825  Lock_time: 0.000137 Rows_sent: 13  Rows_examined: 2844047
SET timestamp=1621213450;
SELECT * FROM salaries WHERE salary = 100000;

# Time: 2021-05-17T01:04:10.010036Z
# User@Host: root[root] @ localhost []  Id:     5
# Query_time: 1.175776  Lock_time: 0.000310 Rows_sent: 1  Rows_examined: 331605
SET timestamp=1621213443;
SELECT * FROM current_dept_emp WHERE emp_no = 100000;
```

## 課題２（実装）

### mysqldumpslowコマンドを使う
[Documents](https://dev.mysql.com/doc/refman/5.6/ja/mysqldumpslow.html)

- 最も頻度高くスロークエリに現れるクエリ
```bash
root@e6f52d5be07c:/# mysqldumpslow -s c /var/log/mysql/mysql-slow.log

Reading mysql slow query log from /var/log/mysql/mysql-slow.log
Count: 1  Time=0.76s (0s)  Lock=0.00s (0s)  Rows=13.0 (13), root[root]@localhost
  SELECT * FROM salaries WHERE salary = N;
  mysqld, Version: N.N.N-log (MySQL Community Server (GPL)). started with:


Count: 1  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.0 (0), 0users@0hosts
  mysqld, Version: N.N.N-log (MySQL Community Server (GPL)). started with:
  # Time: N-N-17T01:N:N.470649Z
  # User@Host: root[root] @ localhost []  Id:     N
  # Query_time: N.N  Lock_time: N.N Rows_sent: N  Rows_examined: N
  use employees;
  SET timestamp=N;
  SELECT count(*) FROM titles WHERE title = 'S'

Count: 1  Time=1.18s (1s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@localhost
  SELECT * FROM current_dept_emp WHERE emp_no = N
```


- 実行時間が最も長いクエリ
```bash
root@e6f52d5be07c:/# mysqldumpslow -s t /var/log/mysql/mysql-slow.log

Reading mysql slow query log from /var/log/mysql/mysql-slow.log
Count: 1  Time=1.18s (1s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@localhost
  SELECT * FROM current_dept_emp WHERE emp_no = N

Count: 1  Time=0.76s (0s)  Lock=0.00s (0s)  Rows=13.0 (13), root[root]@localhost
  SELECT * FROM salaries WHERE salary = N;
  mysqld, Version: N.N.N-log (MySQL Community Server (GPL)). started with:


Count: 1  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.0 (0), 0users@0hosts
  mysqld, Version: N.N.N-log (MySQL Community Server (GPL)). started with:
  # Time: N-N-17T01:N:N.470649Z
  # User@Host: root[root] @ localhost []  Id:     N
  # Query_time: N.N  Lock_time: N.N Rows_sent: N  Rows_examined: N
  use employees;
  SET timestamp=N;
  SELECT count(*) FROM titles WHERE title = 'S'
  ```

- ロック時間が最も長いクエリ
```bash
root@e6f52d5be07c:/# mysqldumpslow -s l /var/log/mysql/mysql-slow.log

Reading mysql slow query log from /var/log/mysql/mysql-slow.log
Count: 1  Time=1.18s (1s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@localhost
  SELECT * FROM current_dept_emp WHERE emp_no = N

Count: 1  Time=0.76s (0s)  Lock=0.00s (0s)  Rows=13.0 (13), root[root]@localhost
  SELECT * FROM salaries WHERE salary = N;
  mysqld, Version: N.N.N-log (MySQL Community Server (GPL)). started with:


Count: 1  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.0 (0), 0users@0hosts
  mysqld, Version: N.N.N-log (MySQL Community Server (GPL)). started with:
  # Time: N-N-17T01:N:N.470649Z
  # User@Host: root[root] @ localhost []  Id:     N
  # Query_time: N.N  Lock_time: N.N Rows_sent: N  Rows_examined: N
  use employees;
  SET timestamp=N;
  SELECT count(*) FROM titles WHERE title = 'S'
  ```


### 課題３（実装）

#### 最も頻度高く発生するスロークエリの高速化

頻度が同じだったため、以下のクエリで行う
```sql
SELECT * FROM salaries WHERE salary = N;
```

- INDEXの追加
```sql
CREATE INDEX salary_index ON salaries(salary);
```

- [質問候補] ワイルドカードを使った場合インデックスが使われていない？
```sql
mysql> CREATE INDEX salary_index ON salaries(salary);
Query OK, 0 rows affected (7.90 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM salaries WHERE salary = 100000;
+--------+--------+------------+------------+
| emp_no | salary | from_date  | to_date    |
+--------+--------+------------+------------+
|  14321 | 100000 | 2002-06-01 | 9999-01-01 |
|  21546 | 100000 | 2002-02-12 | 9999-01-01 |
| 222235 | 100000 | 2000-01-20 | 2001-01-19 |
| 259902 | 100000 | 1999-05-24 | 2000-05-23 |
| 261168 | 100000 | 1998-06-06 | 1999-06-06 |
| 261550 | 100000 | 2001-04-02 | 2002-04-01 |
| 400917 | 100000 | 1997-04-12 | 1998-04-12 |
| 431717 | 100000 | 1998-08-21 | 1999-08-21 |
| 439061 | 100000 | 1996-01-13 | 1997-01-12 |
| 483067 | 100000 | 1996-12-30 | 1997-12-30 |
| 489082 | 100000 | 2000-02-25 | 2001-02-24 |
| 491679 | 100000 | 1997-11-21 | 1998-11-21 |
| 491713 | 100000 | 1999-03-18 | 2000-03-17 |
+--------+--------+------------+------------+
13 rows in set (0.81 sec)

mysql> EXPLAIN SELECT * FROM salaries WHERE salary = 100000;
+----+-------------+----------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table    | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+----------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | salaries | NULL       | ALL  | salary_index  | NULL | NULL    | NULL |    1 |   100.00 | Using where |
+----+-------------+----------+------------+------+---------------+------+---------+------+------+----------+-------------+
1 row in set, 1 warning (0.00 sec)

mysql> SELECT emp_no FROM salaries WHERE salary = 100000;
+--------+
| emp_no |
+--------+
|  14321 |
|  21546 |
| 222235 |
| 259902 |
| 261168 |
| 261550 |
| 400917 |
| 431717 |
| 439061 |
| 483067 |
| 489082 |
| 491679 |
| 491713 |
+--------+
13 rows in set (0.00 sec)

mysql> EXPLAIN SELECT emp_no FROM salaries WHERE salary = 100000;
+----+-------------+----------+------------+------+---------------+--------------+---------+-------+------+----------+-------------+
| id | select_type | table    | partitions | type | possible_keys | key          | key_len | ref   | rows | filtered | Extra       |
+----+-------------+----------+------------+------+---------------+--------------+---------+-------+------+----------+-------------+
|  1 | SIMPLE      | salaries | NULL       | ref  | salary_index  | salary_index | 4       | const |   13 |   100.00 | Using index |
+----+-------------+----------+------------+------+---------------+--------------+---------+-------+------+----------+-------------+
1 row in set, 1 warning (0.00 sec)
```

- 結果
```sql
mysql> SELECT emp_no FROM salaries WHERE salary = 100000;
+--------+
| emp_no |
+--------+
|  14321 |
|  21546 |
| 222235 |
| 259902 |
| 261168 |
| 261550 |
| 400917 |
| 431717 |
| 439061 |
| 483067 |
| 489082 |
| 491679 |
| 491713 |
+--------+
13 rows in set (0.00 sec)
```

- 実行時間が最も長いスロークエリを高速化
```sql
SELECT * FROM current_dept_emp WHERE emp_no = N
```

emp_noはプライマリーキーのため既にインデックスが作成されている。
データ量が多いためインデックスがある状態でも0.1秒は超えてしまうよう。


## 課題４（質問）

### LIMITを設定しても遅いクエリがあるのはなぜか
LIMIT句は抽出件数を指定するだけなので、検索時にフルテーブルスキャンなどが原因のスロークエリは対処できない。

### WHERE句とON句の違い
```
SELECT * FROM employees e JOIN salaries s ON e.emp_no = s.emp_no WHERE gender = "M" AND birth_date > "1960-01-01"
SELECT * FROM employees e JOIN salaries s ON e.emp_no = s.emp_no AND gender = "M" AND birth_date > "1960-01-01"
```

ON句は結合前に抽出するため、結合するデータ量を絞ることができる。
また、抽出条件を1つにまとめられるため、条件が分散して書かれない良さもある。


### 課題５(クイズ)

1. `mysqldumpslow`を用いて、最もクエリ時間が長いクエリ1件のみを表示させてください
2. `mysqldumpslow`を用いると、数字や文字列がNやSになりますが、この抽象化をせずに表示させてください
3. `mysqldumpslow`を用いて、`salary`が含まれるスロークエリを抽出してください

<details>
  <summary>回答例</summary>

1. 
```
mysqldumpslow -s t -t 1 /var/log/mysql/mysql-slow.log
```

2. 
```
mysqldumpslow -a /var/log/mysql/mysql-slow.log
```

1. 
```
mysqldumpslow -g salary /var/log/mysql/mysql-slow.log
```
</details>
