# 冗長化されたWebアプリケーションを作ってみよう

## 課題１

### プライベートサブネットにEC2を作成し、nginxを導入する

### EC2の起動

![スクリーンショット 2021-08-20 18 31 45](https://user-images.githubusercontent.com/32977282/130213046-0da481bf-7b40-4155-854f-0462523dfec7.png)


### nginxのインストール

```bash
# nginxのインストール
$ sudo amazon-linux-extras install nginx1
Installed:
  nginx.x86_64 1:1.16.1-1.amzn2.0.1                                                                                                          

Dependency Installed:
  gd.x86_64 0:2.0.35-26.amzn2.0.2                                          gperftools-libs.x86_64 0:2.6.1-1.amzn2                           
  libXpm.x86_64 0:3.5.12-1.amzn2.0.2                                       nginx-all-modules.noarch 1:1.16.1-1.amzn2.0.1                    
  nginx-filesystem.noarch 1:1.16.1-1.amzn2.0.1                             nginx-mod-http-geoip.x86_64 1:1.16.1-1.amzn2.0.1                 
  nginx-mod-http-image-filter.x86_64 1:1.16.1-1.amzn2.0.1                  nginx-mod-http-perl.x86_64 1:1.16.1-1.amzn2.0.1                  
  nginx-mod-http-xslt-filter.x86_64 1:1.16.1-1.amzn2.0.1                   nginx-mod-mail.x86_64 1:1.16.1-1.amzn2.0.1                       
  nginx-mod-stream.x86_64 1:1.16.1-1.amzn2.0.1                            

Complete!

 38  nginx1=latest            enabled      [ =stable ]

$ nginx -v
nginx version: nginx/1.16.1

# nginxの起動
$ sudo systemctl start nginx
```

### index.htmlの編集

```bash
# h1をWelcome to nginx A/Welcome to nginx Bに変更
sudo vi /usr/share/nginx/html/index.html
```

### ロードバランサ、ターゲットグループの作成
- ロードバランサ
![スクリーンショット 2021-08-20 18 35 01](https://user-images.githubusercontent.com/32977282/130213398-fb59ae8f-13f3-4b87-956c-f303152cd491.png)

- ターゲットグループ
![スクリーンショット 2021-08-20 18 35 25](https://user-images.githubusercontent.com/32977282/130213403-8923cbc1-1fbb-4614-9d4a-6a8b647140df.png)


### アクセス確認

ロードバランサのAレコードにアクセス

http://praha-test-664496310.ap-northeast-1.elb.amazonaws.com/

**アクセスごとに異なるAZのサーバからレスポンスがあることを確認**

![スクリーンショット 2021-08-20 18 42 44](https://user-images.githubusercontent.com/32977282/130214577-79e45968-8ab2-414a-9171-efa19306176d.png)
![スクリーンショット 2021-08-20 18 42 54](https://user-images.githubusercontent.com/32977282/130214585-b8c5918b-6f70-4282-80b2-414e69cd19fd.png)

**片方のサーバを停止した場合、一つのサーバのみからレスポンスがあることを確認**

停止直後は502 Bad Gatewayとなる

![スクリーンショット 2021-08-20 18 42 44](https://user-images.githubusercontent.com/32977282/130214577-79e45968-8ab2-414a-9171-efa19306176d.png)
