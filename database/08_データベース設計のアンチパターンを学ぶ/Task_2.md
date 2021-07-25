# 課題23 データベース設計のアンチパターンを学ぶ2

## 課題１

### 問題となるテーブル定義
```
TABLE Post {

id: varchar

content: varchar

tag1: varchar

tag2: varchar

tag3: varchar

}



TABLE Tag {

id: varchar

content: varchar

}
```


### どんな問題が発生するか

- 付与できるタグの数が増えるたびにカラムを増やす必要がある
- NULL許容ため検索がしずらい
- tag1が削除される場合に、NULLとなったカラムを埋める必要がある

## 課題２

上記の問題点を解決するようスキーマ設計を行う

### plantUML

Plant UML(Web版)を使ってUML図を作成する
https://plantuml.com/ja/server


![svg](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKhDAyaigLG8o2ykALQevb9Gq5B8J05IkhfWTd9-NWbG2LSj5xBA-9B4T6og2q1oG04G6wW4n4He34bC9s03s150yVngX2rSG6qOOWwfUIb0nmC0)

```plantuml
@startuml
entity Posts {
  * id
  --
  * content
}

entity Post_tags {
  * id
  --
  * post_id
  * tag_id
}

entity Tags {
  * id
  --
  * content
}

Posts --o{ Post_tags
Tags --o{ Post_tags
@enduml
```

** 前回の回答とリレーションは同じ。各テーブルのカラム名を`content`に変更。
