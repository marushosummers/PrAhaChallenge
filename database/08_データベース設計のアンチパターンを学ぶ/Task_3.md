# 課題24 データベース設計のアンチパターンを学ぶ3

## 課題１

### 問題となるテーブル定義
```
(漫画)

TABLE Manga {

id: varchar

name: varchar

}



(小説)

TABLE Novel {

id: varchar

name: varchar

}



(コメント)

TABLE Comment {

id: varchar

text: varchar

belongs_to_id: varchar (ここにはManga.Id、あるいはNovel.Idが入る)

}
```


### どんな問題が発生するか

- Manga.IdとNovel.Idが重複した場合に参照先が分からなくなってしまう
- 重複しないようにオフセット/Prefixをつける方法もあるが、書籍のジャンルが増えるごとに衝突しないように割り振らなければいけない
- idによってリレーション先のテーブルが変わるため、JOINが複雑になる

## 課題２

上記の問題点を解決するようスキーマ設計を行う

### plantUML

Plant UML(Web版)を使ってUML図を作成する
https://plantuml.com/ja/server

### MangaとNovelをBookテーブルに集約する
![svg](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKhDAyaigLHmoi_FBbQevb9Gq5B8J05IkhfWTbvYRYgOaGHK45zIMP3ALSi5q-ISdviBPABfGoW72e3O9QaL9I1TN11BQchqzFAhuPgv75BpKe0k0G00)

```plantuml
@startuml
entity Books {
  * id
  --
  * name
  * book_type
}

entity Comments {
  * id
  --
  * book_id
  * text
}


Books ||..o{ Comments
@enduml
```

### MangaとNovelをBookテーブルに集約できない場合
![svg](http://www.plantuml.com/plantuml/uml/SoWkIImgAStDuKhDAyaigLJmJSnBJrIevb9Gq5B8J05IkhfWTbvYRYfNBHUAilZa_DnSe40n5lMvO0L04H07gWx4HHZXbr-MceFN9eGoV3RbWHJWjSaPj-Qar9pylFJY-99yc0abgHKb8BrSa92egT7Jowz6yoyNs55GEJGNSi5imzIAAOsfso4rBmKK7G00)

```plantuml
@startuml
entity Manga {
  * id
  --
  * name
}

entity Manga_comments {
  * id
  --
  * manga_id
  * comment_id
}

entity Novel {
  * id
  --
  * name
}

entity Novel_comments {
  * id
  --
  * novel_id
  * comment_id
}

entity Comments {
  * id
  --
  * belongs_to_id
  * text
}


Manga ||..o{ Manga_comments
Novel ||..o{ Novel_comments
Comments ||..o{ Manga_comments
Comments ||..o{ Novel_comments
@enduml
```
