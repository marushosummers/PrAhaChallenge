# 課題29 DBモデリング2

## 課題１

### Slackライクなチャットサービスのメッセージを保存するための論理モデルを設計する

#### 仕様
- メッセージ: 
  - 誰が、どのチャネルに、いつ、どんな内容を投稿したのか分かること
- スレッドメッセージ: 
  - 誰が、どのメッセージに、いつ、どんな内容をスレッドとして投稿したのか分かること
- チャネル: 
  - そのチャネルに所属しているユーザにしか、メッセージ・スレッドメッセージが見えないこと
- ユーザ: 
  - ワークスペースに参加・脱退できること
  - チャネルに参加・脱退できること
- 横断機能: 
  - メッセージとスレッドメッセージを横断的に検索できること
  - 参加していないチャネルのメッセージ・スレッドメッセージは検索できないこと


### DBスキーマを設計する

Plant UML(Web版)を使ってUML図を作成する

https://plantuml.com/ja/server




![svg](http://www.plantuml.com/plantuml/svg/ZL1BQi0W4Drx2jU5t26RhhhflXGPuj1ArOWpzaFetHj58sb2o4gVypxF6OaXSd9MF7es_2CJOPIBaFB1QFdo_FIwNeSXOmyEyuaEZCsN04HVSzI5J0ecDfyeVaMpaWw9u0tFxNAGCaKylOFtQ2iA4D6pgkBwoFZDXHeH6BM2WbBG3VNOwdRzYRNt1mMOilzHgzeMxjRk3flnHVu9-rRYeRN8ivKsBstN_MNt5r71ST85_yg83TwODijzJkiqejV9sJy0)

```plantuml
@startuml
Entity user {
  *id [PK]
  --
  *name
  *email
  *password
  *is_active
}

Entity  message {
  *id [PK]
  --
  *user_id
  *channel_id
  *parent_message_id
  *text
  *created_at
  *updated_at
}

Entity channel {
  *id [PK]
  --
  *name
  *workspace_id
}

Entity channel_user {
  *id [PK]
  --
  *user_id
  *channel_id
}

Entity workspace {
  *id [PK]
  --
  *name
}

Entity workspace_user {
  *id [PK]
  --
  *user_id
  *workspace_id
}


user --o{ message
user --o{ channel_user
channel --o{ channel_user
user --o{ workspace_user
workspace --o{ workspace_user
workspace --o{ channel
channel --o{ message
@enduml
```


## (代案) channel_userにmessageを紐づける

![svg](http://www.plantuml.com/plantuml/svg/ZP7DReGm38JlVegSA_4EN7hgfVUgYYnYjL6JW6AdFq9zzoLiW8rWqPxmuF4tWsXPC4ho3fw3MFbJYIcg4PHwiaQzlRwyJsFJP1tGKtwIH-loC23pJn_DR6QDdTXlWdzOKCeJCtxGCQxxn138wHoehRa28mNHvQoy5FgLsHy9XOp6MQN1B6eBBCZp-bFZBnwmo_pzhRx__JT5YxachE2J_0FtGucxrf1tawqVg-PGnC5cEwYZOPNdsme96xfGbvyDBGMJlBi0)

```plantuml
@startuml
Entity user {
  *id [PK]
  --
  *name
  *email
  *password
  *is_active
}

Entity  message {
  *id [PK]
  --
  *channel_user_id
  *parent_message_id
  *text
  *created_at
  *updated_at
}

Entity channel {
  *id [PK]
  --
  *name
  *workspace_id
}

Entity channel_user {
  *id [PK]
  --
  *user_id
  *channel_id
}

Entity workspace {
  *id [PK]
  --
  *name
}

Entity workspace_user {
  *id [PK]
  --
  *user_id
  *workspace_id
}

user --o{ channel_user
channel --o{ channel_user
user --o{ workspace_user
workspace --o{ workspace_user
workspace --o{ channel
channel_user --o{ message
@enduml
```

### メリット
- 構造上channel_userが存在しない限り、messageが作成されないことを保証できる
- channelとuserの交差テーブルの重複を避けられる

### デメリット
- 扱うidが増えるため、複雑になりやすい
- userがchannelから抜けた際にchannel_user_idを削除するとDB不整合が発生する
