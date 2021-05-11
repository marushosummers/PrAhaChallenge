# 課題15: SQL10本ノック

## 課題１（実装）

- WebSQLを利用した[W3Schools_trySQL](https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all)を利用して以下のクエリを作成
- [WebSQLは現在は仕様策定が停止している](https://www.w3.org/TR/webdatabase/#status-of-this-document)
- SQLの練習には[SQLZoo](https://sqlzoo.net/wiki/SQL_Tutorial/ja)のTutorialをやると良い

以下のデータを取得するクエリを作成してください
期待する出力結果は、こちらのレポジトリを参照してください

### 常連顧客の特定
- 1996年に3回以上注文した（Ordersが3つ以上紐づいている）CustomerのIDと、注文回数
```sql
SELECT CustomerID, COUNT(OrderID) AS OrderCount 
FROM Orders
WHERE OrderDate LIKE "1996%" 
GROUP BY CustomerID 
HAVING OrderCount >= 3 
ORDER BY OrderCount DESC;
```


### 過去最も多くのOrderDetailが紐づいたOrderを取得
```sql
SELECT OrderID, COUNT(OrderDetailID) AS OrderDetailCount 
FROM OrderDetails 
GROUP BY OrderID 
ORDER BY OrderDetailCount DESC;
```


### 過去最も多くのOrderが紐づいたShipperを特定
```sql
SELECT ShipperID, COUNT(OrderID) AS ShippingCount 
FROM Orders 
GROUP BY ShipperID 
ORDER BY ShippingCount DESC;
```


### 売上が高い順番にCountryを並べる
```SQL
SELECT ROUND(SUM(Products.Price * OrderDetails.Quantity), 0) AS Sales, Customers.Country AS Country
FROM OrderDetails
  JOIN Products ON OrderDetails.ProductID = Products.ProductID
  JOIN Orders ON OrderDetails.OrderID = Orders.OrderID
  JOIN Customers ON Orders.CustomerID = Customers.CustomerID
GROUP BY Country
ORDER BY Sales DESC;
```


### 国ごとの売上を年毎に集計
```sql
SELECT ROUND(SUM(Products.Price * OrderDetails.Quantity), 0) AS Sales, STRFTIME('%Y', Orders.OrderDate) AS OrderYear, Customers.Country AS Country
FROM OrderDetails
  JOIN Products ON OrderDetails.ProductID = Products.ProductID
  JOIN Orders ON OrderDetails.OrderID = Orders.OrderID
  JOIN Customers ON Orders.CustomerID = Customers.CustomerID
GROUP BY Country, OrderYear;
```



### Employeesに「Junior」カラム（boolean）を追加し、誕生日が1960年より後のEmployeeの場合はtrueにする
```sql
ALTER TABLE Employees 
  ADD Junior Boolean DEFAULT False
;

UPDATE Employees
SET Junior = True
WHERE STRFTIME('%Y', BirthDate) >= '1960';
```


### Shippersに「long_relation」カラム（boolean）を追加し、70回以上Orderに関わったShipperの場合はtrueにする
```sql
ALTER TABLE Shippers 
  ADD long_relation Boolean DEFAULT False
;

UPDATE Shippers
SET long_relation = True
WHERE ShipperID = (
  SELECT ShipperID
  FROM Orders 
  GROUP BY ShipperID 
  HAVING COUNT(OrderID) >= 70
);
```


### それぞれのEmployeeが最後に担当したOrderと、その日付を取得
```sql
SELECT Employees.EmployeeID,  Orders.OrderID, Orders.OrderDate AS LatestOrderDate
FROM Orders
  JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
GROUP BY Employees.EmployeeID
HAVING MAX(Orders.OrderDate)
```


### NULLの取扱
- Customerテーブルで１レコードのCustomerNameをNULLにする

```sql
UPDATE Customers SET CustomerName = NULL WHERE CustomerID = 1;
```

- CustomerNameが存在するユーザーを取得する

```sql
SELECT * FROM Customers WHERE CustomerName IS NOT NULL;
```

- CustomerNameが存在しないユーザーを取得する
```sql
SELECT * FROM Customers WHERE CustomerName IS NULL;
```

- なぜ`WHERE CustomerName = NULL`で正しい結果が得られないか？

  NULLは値が無いことを表しており、`=, <, >`などの比較演算子を用いることができない。

  NULLかどうかは`IS NULL`, `IS NOT NULL`で判別する。

  参考: [SQL NULL Values](https://www.w3schools.com/sql/sql_null_values.asp)


### JOINの取扱
- EmployeeId=1の従業員のレコードを、Employeesから削除
```sql
DELETE FROM Employees WHERE EmployeeID = 1;
```

- （削除された）EmloyeeId=1が担当したOrdersを表示しないクエリ
```sql
SELECT *
FROM Orders 
  JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
;
```

- （削除された）EmloyeeId=1が担当したOrdersを表示するクエリ
```sql
SELECT *
FROM Orders 
  LEFT JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
WHERE Employees.EmployeeID IS NULL
;
```

## 課題２（質問）

- 「WHERE」と「HAVING」の違い
- SQLの用語
  - `DDL`
  - `DML`
  - `DCL`
  - `TCL`

## 課題３（クイズ）

1. 
<details>
  <summary>回答例</summary>

1. 


</details>
