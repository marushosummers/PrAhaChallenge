# 課題46 マルチAZに跨るVPCを構築する

## 課題１

### プライベートサブネットとパブリックサブネットの違い

- インターネットに接続されているのがパブリックサブネット
- インターネットに接続されていないのがプライベートサブネット

具体的には、パブリックサブネットはRoute tablesの設定に0.0.0.0/0 (デフォルトゲートウェイへの通信) がインターネットゲートウェイに接続されている状態。

プライベートサブネットは直接インターネットゲートウェイに接続されておらず、ローカルネットワークからのみアクセスできる。

### VPCにプライベートサブネットとパブリックサブネットをマルチAZで構築

- VPC: `praha-test (vpc-0ae6ff1ed7f600d48)`

- パブリックサブネット
  - `public-1a (subnet-0130d7de45adbfdb7)` (AZ: ap-northeast-1a)
  - `public-1c (subnet-0fc3f4486da19cb7e)` (AZ: ap-northeast-1c)


- プライベートサブネット
  - `private-1a (subnet-06cfdefd144efb78a)` (AZ: ap-northeast-1a)
  - `private-1c (subnet-020d9885648f41239)` (AZ: ap-northeast-1c)

![サブネット](https://user-images.githubusercontent.com/32977282/129843415-1e1ea1a3-721c-43d6-8eb5-c53eed8216c2.png)

### パブリックサブネットにSSH可能なEC2インスタンスを立てる

`public-1a (subnet-0130d7de45adbfdb7)`にEC2インスタンスを作成する

![ec2](https://user-images.githubusercontent.com/32977282/129845115-478f2fc6-6223-44e1-be94-d33d20fc0793.png)

- セキュリティグループはPort: 22のみフルオープンの設定
![セキュリティグループ](https://user-images.githubusercontent.com/32977282/129845041-639c127e-08e0-4ff0-aa65-96352a2ee770.png)

- 自分のMacからssh接続確認
```sh
$ ssh -i ~/.ssh/praha-test.pem ec2-user@35.73.242.65

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
[ec2-user@ip-10-0-1-198 ~]$ # 接続成功
```

### プライベートサブネットにパブリックサブネットのEC2インスタンスからのみアクセス可能なEC2インスタンスを立てる

`private-1a (subnet-06cfdefd144efb78a)`にEC2インスタンスを作成する

![](https://user-images.githubusercontent.com/32977282/129846177-2501fc2e-f6aa-4022-b41a-c2c960f6af6b.png)

- セキュリティグループはpraha-publicからのPort: 22のみを許可
![セキュリティグループ](https://user-images.githubusercontent.com/32977282/129846409-839e7210-c0f6-4c17-84f0-4531aa94921f.png)

- パブリックサブネットのEC2からのssh接続確認
```sh
## パブリックサブネットのEC2にssh接続
$ ssh -i ~/.ssh/praha-test.pem ec2-user@35.73.242.65
Last login: Wed Aug 18 06:01:58 2021 from dw49-106-192-28.m-zone.jp

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
[ec2-user@ip-10-0-1-198 ~]$ # 接続成功

## プライベートサブネットのEC2にssh接続

[ec2-user@ip-10-0-1-198 ~]$ ssh -i ~/.ssh/praha-test.pem ec2-user@10.0.3.99
Last login: Wed Aug 18 06:03:32 2021 from 10.0.1.198

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
[ec2-user@ip-10-0-3-99 ~]$ # 接続成功
```

- 自分のMacからssh接続確認

プライベートサブネットのため、パブリックIPアドレスが存在しないので、そもそもインターネット経由で直接ssh接続できない。
プライベートIPアドレスを指定した場合。
```sh
$ ssh -i ~/.ssh/praha-test.pem ec2-user@10.0.3.99
# 対象のIPアドレスが見つけられないため、応答がない
```
