# 課題58: サービスのモニタリングを考える

## 課題1（質問）

- 一定期間で一定数以上、フロントエンドのWEBアプリケーションがクラッシュしていたら、開発者にSlackで知らせる
- フロントエンドで何らかのエラーが発生したら、直前までユーザが実施した作業手順、ブラウザの実行環境等の情報を付与して開発者に通知する
- バックエンドのアプリケーションが（メモリ不足などの理由で）クラッシュしたら、自動的にアプリケーションを再起動しつつ、開発者にSlackで知らせる
- APIからのレスポンスタイムが5秒以上かかっているエンドポイントを可視化する。もし5秒以上かかっているレスポンスが全体の1割を超えたら開発者にSlackで知らせる
- データベースのスロークエリを可視化して、レスポンスに5秒以上かかるクエリがある場合は開発者にSlackで知らせる

上記のような要望を実現するツールを調査する

---
### [Cloud Watch](https://aws.amazon.com/jp/cloudwatch/)

AWSのマネージド総合監視サービス
- CloudWatch Logsでサーバ/DBのログを収集し、特定のイベントに応じて通知する
- Amazon ChatbotとAmazon SNSと併用してSlackなどに通知が可能
- サーバやコンテナのCPU,メモリリソースの監視が可能
- ロードバランサによるサーバ死活監視、自動での再起動が可能
- アプリケーションリソースがAWSに構築されているなら、殆どの基本的なモニタリングは可能。
- API監視には[CloudWatch Synthetics](https://www.sunnycloud.jp/column/20210909-01/)を使う必要がある
- フロントエンドの監視のマネージドサービスが無い

---
### [Cloud Logging](https://cloud.google.com/logging) / [Cloud Monitoring](https://cloud.google.com/monitoring/)

GCPのマネージドのロギング/監視サービス
- GCPや他環境でホストされたサーバ/DBのログを収集し、特定のイベントに応じて通知する
- Slackなどに通知が可能
- サーバやコンテナのCPU,メモリリソースの監視が可能
- GCP以外のリソースも監視できる(もともとStackdriver Monitoringというサービスだったため)
- フロントエンドの監視のマネージドサービスが無い
---

### [DataDog](https://www.datadoghq.com/ja/)

マネージド総合監視サービス
- 各種クラウドと連携してログ収集・監視・通知・分析が可能
- Slackなどに通知が可能
- サーバやコンテナのCPU,メモリリソースの監視が可能
- コードに集計用のロガーを仕込むことで、ログ以外のメトリクスを作成できる
- フロントエンドのエラー監視・トラッキングも可能
- 監視対象数や追加機能で料金が決まる
---

### [Sentry](https://sentry.io/welcome/)

マネージドのエラー検知・監視サービス
- アプリケーションにSentryのコードを仕込むことで、各種エラー検知やログを収集が可能
- Slackなどに通知が可能
- フロントエンドのエラー監視・トラッキングも可能
- プランによって料金が決定
---

### [fluentd](https://www.fluentd.org/)

OSSのログ収集サービス
- 各種サーバのログを収集し、ストレージに送信することができる
- タグによってログを分類することができる
---

### [Runscope](https://www.runscope.com/)

マネージドのAPI監視サービス
- APIエンドポイントの死活監視・レスポンスタイムの監視が可能
- プランによって料金が決定
---

### [PagerDuty](https://www.pagerduty.com/)

マネージドのインシデント管理サービス
- インシデントの管理と、各種通知(SMSや電話にも対応)が可能
- 他の監視サービスと連携できる
- プランによって料金が決定
---

### [Mackerel](https://ja.mackerel.io/)

マネージドの総合監視サービス
- 各種クラウドと連携してログ収集・監視・通知・分析が可能
- Slackなどに通知が可能
- 監視対象数や追加機能で料金が決まる
---

### その他、OSSサーバ・ネットワーク監視

OSSのサーバ・ネットワーク監視サービス例
- [Zabbix](https://www.zabbix.com/jp)
- [Nagios](https://www.nagios.org/)

参考: [OSSのおすすめ監視サーバ・監視ツール比較20選（2021年版）](https://www.designet.co.jp/ossinfo/selection/monitoring-server.html)

---

### 上記以外で、監視しておいた方が良いメトリクス例

- webサーバ・DBサーバの監視
  - nginxやApacheのログメトリクス・プロセス監視

- ネットワーク・トラフィックの監視
  - アクセスログ・スループットのメトリクス

- セキュリティの監視
   - WAFの導入と検知ログのメトリクス
