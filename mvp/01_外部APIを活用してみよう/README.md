# 課題60: 外部APIを活用してみよう

## 課題１（実装）

### TwitterのAPIを利用して以下の機能を満たすスクリプト

- TypeScriptで開発
- 特定の言葉をツイートしたユーザーを100名抽出する（言葉をスクリプトの引数として指定できるようにしておく）
  - [スクリプト](https://github.com/marushosummers/PrAhaChallenge/blob/twitter_api/mvp/01_%E5%A4%96%E9%83%A8API%E3%82%92%E6%B4%BB%E7%94%A8%E3%81%97%E3%81%A6%E3%81%BF%E3%82%88%E3%81%86/app/fetchUsers.ts)
  - `yarn users --word <QueryWord>`

- 特定のユーザーをフォローしているユーザーを100名抽出する（ユーザーidをスクリプトの引数として指定できるようにしておく）
  - [スクリプト](https://github.com/marushosummers/PrAhaChallenge/blob/twitter_api/mvp/01_%E5%A4%96%E9%83%A8API%E3%82%92%E6%B4%BB%E7%94%A8%E3%81%97%E3%81%A6%E3%81%BF%E3%82%88%E3%81%86/app/fetchFollowers.ts)
  - `yarn followers --id <TwitterUserId>`

### 参考

- Twitter API トークンは`.env`ファイルに設定する
  - `APP_USER_TOKEN=XXXXXXXXX`

- 使用ライブラリ
  - `commander`: コマンドライン引数の受け取り
  - `dotenv`: 環境変数の設定
  - `ts-node`: TypeScriptのコンパイルと実行
  - `twitter-api-v2`: Twitter API のWrapper

