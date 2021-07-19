# 課題21 トランザクションについて理解する

## 課題１（質問）

### デッドロックとは
二つのトランザクションがデータの確保(ロック)をめぐって互いに相手を待つ状態となり，そこから先へ処理が進まなくなること

- デッドロックの説明でわかりやすい例
```
Interviewer: explain deadlock and we'll hire you.

Me: hire me and I'll explain it to you.
```
[参考: Explain deadlock](http://www.albertopasca.it/whiletrue/explain-deadlock/)

### ISOLATION LEVEL

ISOLATION LEVELとはトランザクション同士の独立性のことであり、どれだけトランザクション間の処理の影響を許容するかを設定できる

ISOLATION LEVELは以下の4つがあり、下に行くほど厳しい制約となる

| ISOLATION LEVEL  | ダーティリード | ファジーリード | ファントムリード |
|:-----------------|:-------------:|:-------------:|:--------------:|
| READ UNCOMMITTED |       ○       |       ○       |       ○        |
| READ COMMITTED   |       ×       |       ○       |       ○        |
| REPEATABLE READ  |       ×       |       ×       |       △**      |
| SERIALIZABLE     |       ×       |       ×       |       ×        |
○：許容する　×：許容しない

** Mysql(InnoDB)はREPEATABLE READでファントムリードが起きないようになってるらしい

[参考: Qiitaトランザクション分離レベルについてのまとめ](https://qiita.com/song_ss/items/38e514b05e9dabae3bdb)

[参考: MySQLでトランザクションの4つの分離レベルを試す](https://kikai.hatenablog.jp/entry/20140212/1392171784)

上記のダーティリード・ファジーリード・ファントムリードは不整合の読み込みパターン

- ダーティリード
  - トランザクジョンAがコミットしていないデータを、トランザクションBが読み取ってしまう

- ファジーリード(Non-repeatable read)
  - トランザクションAが複数回データを読み込む間に、トランザクションBがデータの更新をコミットしてしまう

- ファントムリード
  - トランザクションAが複数回データを読み込む間に、トランザクションBがデータの追加・削除をコミットしてしまう

    [参考: 3番目にゆるい分離レベル（リピータブルリード）](https://xtech.nikkei.com/it/article/COLUMN/20080226/294802/)

### 行レベルのロック、テーブルレベルのロックの違い

- 行レベルのロック
  - レコード単位のロック機能のこと。1レコードだけロックされるわけではなく、対象となる複数レコードがロックされる。

- テーブルレベルのロック
  - テーブル単位のロック機能のこと。
  - `SELECT`クエリなどでは[インテンションロック](https://dev.mysql.com/doc/refman/5.6/ja/innodb-lock-modes.html)がなされる
  - そのため、明示的にロックをしない限り、他のトランザクションがブロックされることはほとんどない

    [参考: MySQL のロックについて補足](https://qiita.com/hmatsu47/items/f5eb64428494686d4ad3)

### 悲観ロックと楽観ロック

**ロック(排他制御)には２種類の概念がある**

>データベースには「共有・占有ロック」と「楽観的・悲観的ロック」という２種類の異なる次元の概念があります。
>前者はデータベースの行や表に対するアクセス制御をする「機能」的なもので、後者はどうやってロックをするかという「方針」的なものになります。

[参考: データベースの「ロック」という概念は2種類ある](https://qiita.com/daiching/items/835fa37de22b397eece0)

- 楽観的ロック
  - 同時更新が少ないことを前提とする。
  - ロックは行わずに更新対象のデータが取得時と同じ状態であることを確認してから更新する。
  - 更新時とデータが異なる場合はエラーとすることで整合性を保つ。

- 悲観的ロック
  - 同時更新が頻繁に発生することを前提とする
  - 更新対象のデータを取得する際にロックをかけることで整合性を保つ。

[参考: 排他制御（楽観ロック・悲観ロック）の基礎](https://qiita.com/NagaokaKenichi/items/73040df85b7bd4e9ecfc)

### 参考: 共有ロックと占有ロック

- 共有ロック(READロック)
  - 全てのトランザクションがREADでき、WRITEはできなくなる。
  - `SELECT`クエリのときに掛けられる。


- 占有ロック(WRITEロック・排他ロック)
  - ロックをかけたトランザクションのみREAD・WRITEできる。他トランザクションはどちらもできない。
  - `SELECT FOR UPDATE`や`UPDATE`クエリのときに掛けられる。

デッドロックは共有ロック同士では発生せず、占有ロックがある場合に発生する。

## 課題２（実装）

mysql-emplpoyeesを使用して、以下のトランザクションクエリを作成する

- Dirty Read
- Non-repeatable read
- Phantom read

接続しているセッションを明確にするために、プロンプトの表示を変更する

```sql
# 片方をmysql A > にする
mysql> PROMPT mysql A > 
PROMPT set to 'mysql A > '
mysql A >

# 片方をmysql B > にする
mysql> PROMPT mysql B > 
PROMPT set to 'mysql B > '
mysql B > 
```

現在のISOLATION LEVELを確認するクエリ
```sql
mysql> SELECT @@GLOBAL.tx_isolation, @@tx_isolation;
+-----------------------+-----------------+
| @@GLOBAL.tx_isolation | @@tx_isolation  |
+-----------------------+-----------------+
| REPEATABLE-READ       | REPEATABLE-READ |
+-----------------------+-----------------+
1 row in set, 2 warnings (0.00 sec)
```

### Dirty Read

- READ-UNCOMMITED での挙動確認
```sql
# AをREAD UNCOMMITTEDに設定
mysql A > SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
Query OK, 0 rows affected (0.00 sec)

# トランザクションを開始
mysql A > BEGIN;
Query OK, 0 rows affected (0.00 sec)

# emp_no=100000の従業員を表示
mysql A > SELECT * FROM employees WHERE emp_no = 100000;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 100000 | 1956-01-11 | Hiroyasu   | Emden     | M      | 1991-07-02 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)

# BをREAD UNCOMMITTEDに設定
mysql B > SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
Query OK, 0 rows affected (0.00 sec)

# トランザクションを開始
mysql B > BEGIN;
Query OK, 0 rows affected (0.00 sec)

## emp_no=100000の名前を変更
mysql B > UPDATE employees SET last_name = 'PrAha' WHERE emp_no = 100000;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

## ここでコミットをせずにAでSELECTしてみる

## コミットしていないデータがSELECTされているため、ダーティリードが発生している
mysql A > SELECT * FROM employees WHERE emp_no = 100000;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 100000 | 1956-01-11 | Hiroyasu   | PrAha     | M      | 1991-07-02 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)

```

### Non-repeatable read

- READ-COMMITED での挙動確認
```sql
# AをREAD CIMMITTEDに設定
mysql A > SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
Query OK, 0 rows affected (0.00 sec)

# トランザクションを開始
mysql A > BEGIN;
Query OK, 0 rows affected (0.00 sec)

# emp_no=100000の従業員を表示
mysql A > SELECT * FROM employees WHERE emp_no = 100000;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 100000 | 1956-01-11 | Hiroyasu   | Emden     | M      | 1991-07-02 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)

# BをREAD COMMITTEDに設定
mysql B > SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
Query OK, 0 rows affected (0.00 sec)

# トランザクションを開始
mysql B > BEGIN;
Query OK, 0 rows affected (0.00 sec)

## emp_no=100000の名前を変更
mysql B > UPDATE employees SET last_name = 'PrAha' WHERE emp_no = 100000;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

## ここでコミットをせずにAでSELECTしてみる

## コミットしていないデータは反映されていない（ダーティリードは発生していない）
mysql A > SELECT * FROM employees WHERE emp_no = 100000;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 100000 | 1956-01-11 | Hiroyasu   | Emden     | M      | 1991-07-02 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)

## Bでコミットする
mysql B > COMMIT;
Query OK, 0 rows affected (0.00 sec)

## コミットしたデータが取得され、ファジーリード(Non-repeatable read)が発生している
mysql A > SELECT * FROM employees WHERE emp_no = 100000;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 100000 | 1956-01-11 | Hiroyasu   | PrAha     | M      | 1991-07-02 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)
```

## Phantom read

- READ-COMMITED での挙動確認
```sql
## Non-repeatable readの続き

# トランザクションを開始
mysql A > BEGIN;
Query OK, 0 rows affected (0.00 sec)

# Aで従業員数を確認する
mysql A > SELECT COUNT(*) FROM employees;
+----------+
| COUNT(*) |
+----------+
|   300024 |
+----------+
1 row in set (0.11 sec)

# Bで従業員データを1件削除する
mysql B > DELETE FROM employees WHERE emp_no = 100001;
Query OK, 1 row affected (0.01 sec)

# コミットする
mysql B > COMMIT;
Query OK, 0 rows affected (0.00 sec)

# Aでデータを確認すると1件データが減っている(ファントムリードが発生している)
mysql A > SELECT COUNT(*) FROM employees;
+----------+
| COUNT(*) |
+----------+
|   300023 |
+----------+
1 row in set (0.04 sec)

```

- REPEATABLE-READ での挙動確認
```sql
# AをREPEATABLE READに設定
mysql A > SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
Query OK, 0 rows affected (0.00 sec)

# トランザクションを開始
mysql A > BEGIN;
Query OK, 0 rows affected (0.00 sec)

# emp_no=100000の従業員を表示
mysql A > SELECT * FROM employees WHERE emp_no = 100000;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 100000 | 1956-01-11 | Hiroyasu   | Emden     | M      | 1991-07-02 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)

# BをREPEATABLE READに設定
mysql B > SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
Query OK, 0 rows affected (0.00 sec)

# トランザクションを開始
mysql B > BEGIN;
Query OK, 0 rows affected (0.00 sec)

## emp_no=100000の名前を変更
mysql B > UPDATE employees SET last_name = 'PrAha' WHERE emp_no = 100000;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

## Bでコミットする
mysql B > COMMIT;
Query OK, 0 rows affected (0.00 sec)

## データが変更されていないのを確認（ファジーリード(Non-repeatable read)は発生していない）
mysql A > SELECT * FROM employees WHERE emp_no = 100000;
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 100000 | 1956-01-11 | Hiroyasu   | Emden     | M      | 1991-07-02 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)

# Aで従業員数を確認する
mysql A > SELECT COUNT(*) FROM employees;
+----------+
| COUNT(*) |
+----------+
|   300023 |
+----------+
1 row in set (0.11 sec)

# Bで従業員データを1件削除する
mysql B > DELETE FROM employees WHERE emp_no = 100001;
Query OK, 1 row affected (0.01 sec)

# コミットする
mysql B > COMMIT;
Query OK, 0 rows affected (0.00 sec)

# Aで従業員数は変更されておらず、ファントムリードは発生していない(** MysqlはRepetable Readではファントムリードは発生しないのでOK)
mysql A > SELECT COUNT(*) FROM employees;
+----------+
| COUNT(*) |
+----------+
|   300023 |
+----------+
1 row in set (0.11 sec)
```

## 課題３（クイズ）

1. トランザクションに求められるACID属性の4つを列挙してください
2. あるテーブルのSELECTクエリを実行している間は、ロックがあるため同じテーブルにSELECTクエリは実行できないでしょうか？
3. 行ロックのメリットを挙げてください

<details>
  <summary>回答例</summary>

1. Atomicity（原子性）、Consistency（一貫性）、Isolation（独立性）、Durability（永続性）

2. 共有ロックのため、実行できる

3. 
   - 異なるセッションが異なる行にアクセスする場合、ロックの競合は少なくなる。
   - ロールバックする変更が少なくできる。
   - 1つの行を長時間ロックできる。
   - [参考 内部ロック方法](https://dev.mysql.com/doc/refman/5.6/ja/internal-locking.html)
</details>
