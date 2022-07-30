# 課題45 IAMのユーザ、グループ、ロール、ポリシーの違いを説明してみよう

## 課題１

### IAMユーザ

AWSを操作する際に利用するユーザ。

基本的にAWSの操作を行う人間1人につきIAMユーザーを1つ作成する。

AWSアカウントを作成した際に作られるアカウントユーザはroot権限のため、IAMユーザを作成した上で適切な権限を与えて運用する。

### グループ

IAMユーザの権限を管理するためのグループ。

複数のIAMユーザに同じ権限(開発者、サーバ管理者など)を与える際に、グループに権限を設定しIAMユーザをそのグループに入れる。

IAMユーザは複数のグループに入れることができる。

### ポリシー

権限のまとまり。

AWSのどのサービスにどんな権限があるかを定義する。定義したポリシーをユーザ・グループ・ロールに付与(アタッチ)することで操作を許可/制限する。

### ロール

AWSのリソース(EC2インスタンスなど)の権限を管理するためのしくみ。

たとえばEC2サーバからS3のデータの操作を許可したいときは、S3の操作を許可するポリシーをロールにアタッチし、そのロールをEC2に付与する。

## 参考： ポリシーシミュレータ

https://policysim.aws.amazon.com/home/index.jsp


## 課題２

### IAMユーザの作成

- AdministratorAccessのポリシーを持つIAMユーザを作成

AdministratorAccessを持つIAMユーザを作成

![スクリーンショット 2021-08-11 12 48 19](https://user-images.githubusercontent.com/32977282/128967885-d20359ae-35d0-4d08-8869-06dc56f71697.png)

- 質問：なぜ毎回ルートユーザとしてアクセスするのではなく、管理者権限のIAMユーザでログインした方が良いのか？

ルートユーザは全てのリソースに無制限にアクセスできてしまう非常に強力な権限を持っている。

あとから権限を制限することや、流出時にアカウントを制限/削除することもできないので、取り扱いが難しいユーザ情報である。

そのため、ルートユーザは管理者権限IAMユーザを作成,管理するためにのみ利用し、AWSでの操作はIAMユーザで行う方が安全である。

- PowerUserAccessポリシーを付与したIAMユーザを作成

PowerUserAccessユーザを作成

![スクリーンショット 2021-08-11 13 01 46](https://user-images.githubusercontent.com/32977282/128967984-29ab61bd-5ba3-4bb9-8c5c-27fa8be3a323.png)

PowerUserAccessのユーザでログインすると、権限がなくIAMダッシュボードとIAMリソースが表示されない

![スクリーンショット 2021-08-11 12 58 09](https://user-images.githubusercontent.com/32977282/128967953-aaebc2d3-b2f0-4f34-bc20-b259df09f931.png)

IAMユーザも表示されない

![スクリーンショット 2021-08-11 12 57 57](https://user-images.githubusercontent.com/32977282/128967927-783d3f14-3d0a-43f1-8651-77eb99568b4b.png)




### グループの作成

- Administrator権限を付与したグループを作成する
![スクリーンショット 2021-08-11 13 15 14](https://user-images.githubusercontent.com/32977282/128968995-51ef4ce2-1df4-4bdb-a28f-404f7a7ab6cb.png)


- 質問：直接ユーザに付与する方法と、グループに付与してユーザを所属させる方法どちらが適切でしょうか？

グループに付与した方が、一括での管理が容易であり、グループを見ることで誰にどの権限があるか確認しやすいため適切と感じた。


### サービスのIAM

- EC2の作成

![スクリーンショット 2021-08-11 13 43 41](https://user-images.githubusercontent.com/32977282/128971948-d41aa9b4-9cbd-4a4f-80ef-d04ffc67c792.png)


- S3バケットの作成

![スクリーンショット 2021-08-11 13 58 53](https://user-images.githubusercontent.com/32977282/128972164-7abea873-f373-4964-9bad-324b6778a754.png)


- S3バケットへのアクセスを試す(権限がないため失敗)
```

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
4 package(s) needed for security, out of 16 available
Run "sudo yum update" to apply all updates.
[ec2-user@ip-172-31-38-91 ~]$ aws s3 ls s3://praha-test-1111
Unable to locate credentials. You can configure credentials by running "aws configure".
```

- 以下の仕様を満たすポリシーを作成し、ロールをにアタッチしてEC2に適用する
  - オブジェクトの一覧表示以外（例えば書き込み操作）は許可しない
  - 特定のS3バケットに対してのみ適用されるポリシーにする

![スクリーンショット 2021-08-11 13 55 14](https://user-images.githubusercontent.com/32977282/128972138-6e5ae9c3-faad-4af6-8c86-d3e2d2edf9fb.png)

- ポリシーをロールにアタッチ

![スクリーンショット 2021-08-11 13 56 48](https://user-images.githubusercontent.com/32977282/128972256-caaf5e89-d7f5-4580-b3af-ff405e6be7d8.png)

- ロールをEC2にアタッチ

![スクリーンショット 2021-08-11 13 57 52](https://user-images.githubusercontent.com/32977282/128972194-0150e67a-fd8e-418e-b0b5-5068898402c5.png)


- S3バケットへのアクセスを試す
```
# バケットの内容を表示(成功)
[ec2-user@ip-172-31-38-91 ~]$ aws s3 ls s3://praha-test-1111
2021-08-11 04:52:34     161783 sample.png

# ファイル削除(権限がないため失敗)
[ec2-user@ip-172-31-38-91 ~]$ aws s3 rm s3://praha-test-1111/sample.png
delete failed: s3://praha-test-1111/sample.png An error occurred (AccessDenied) when calling the DeleteObject operation: Access Denied

# 別のバケットの内容を表示(権限がないため失敗)
[ec2-user@ip-172-31-38-91 ~]$ aws s3 ls s3://praha-test-2222
An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied

# ファイル削除(権限がないため失敗)
[ec2-user@ip-172-31-38-91 ~]$ aws s3 rm s3://praha-test-2222/sample.png
delete failed: s3://praha-test-2222/sample.png An error occurred (AccessDenied) when calling the DeleteObject operation: Access Denied
```

質問：EC2インスタンスにロールを付与するべきか直接ポリシーを付与するべきか?

メンター質問候補：　そもそも直接ポリシーを付与することができない？


## 課題３（クイズ）

1. ARNとは何でしょうか
2. `PowerUserAccess`ポリシーの`NotAction`は何をしているのでしょうか
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "NotAction": [
                "iam:*",
                "organizations:*",
                "account:*"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:CreateServiceLinkedRole",
                "iam:DeleteServiceLinkedRole",
                "iam:ListRoles",
                "organizations:DescribeOrganization",
                "account:ListRegions"
            ],
            "Resource": "*"
        }
    ]
}
```

1. ポリシーによくある`"Version": "2012-10-17"`とは何でしょうか

<details>
  <summary>回答例</summary>

1. Amazon リソースネーム (ARN) は、AWSリソース(EC2のインスタンス、S3のバケット・オブジェクト、RDSのインスタンスなど)を一意に識別する識別子。

2. `NotAction`は指定したアクション以外を許可します。PowerUserAccessでは基本的なIAM操作と、IAM以外全てのリソースの操作を許可しています。

3. ポリシーを設定するJSONの言語構文のバージョン。[2008-10-17と2012-10-17があるが、2012-10-17が推奨されている。](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_elements_version.html)
</details>
