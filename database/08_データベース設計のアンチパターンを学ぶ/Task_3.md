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
![svg](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKhDAyaigLHmoi_FBbQevb9Gq5B8J05IkhfWTbvYRYgOaGHK45zIMP3ALSi5q-ISdviBPABfGoW72e3O9QaL9I1TN61BW2hog-5QkHnIyrA0xW00)

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


Books --o{ Comments
@enduml
```

### MangaとNovelをBookテーブルに集約できない場合
![svg](http://www.plantuml.com/plantuml/svg/XOzH2i8m38RVSuey3tQ7WSzwXL5T68Cc1Pk9ChoxMR28LUTJc_pVdp_fieQppXo1H2UzuJx86701n0QdmPwszRy49hZ36zQV4hCryXUU7V1EWqzkBLyZ3kb2yN-IOrj9ui1Mqkwt-KWnoPXxJMM2qbLNB_Y9ngMbkXPy9LUgxQ0acVZXAff9jQqZ6MQE3m00)

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


Manga --o{ Manga_comments
Novel --o{ Novel_comments
Comments --{ Manga_comments
Comments--{ Novel_comments
@enduml
```
