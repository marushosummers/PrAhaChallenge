# 課題29 DBモデリング2

## 課題１

[寿司注文表](https://github.com/praha-inc/praha-challenge-templates/blob/master/db/design/sushi.png)

### 注文表のデータを保存するためのDBスキーマを設計する

Plant UML(Web版)を使ってUML図を作成する

https://plantuml.com/ja/server


- 注文ごとにorderテーブルが追加される
- 注文内容はorderDetailに追加される
- 合計の皿数や金額はorderDetailを抽出することで得られる
- 合計金額・皿数はorderテーブルで持っても良いかも
- 寿司とセット商品はmenuテーブルで保持する
- 一部持ち帰りができない商品があるので`is_eatin_only`フラグで管理する


![svg](http://www.plantuml.com/plantuml/svg/XP4zRiCm38LtdK9p0Tt1GzkbI_UY46YBG8bQb2jHWs7qxWcLEB2D15diHrBlU_hfYa2M6aVpna8osuXSxMAiVQ5Wlpu_li_IEQqP8kf_oZGqGSKNbAj246AVU9pDlrbXGosI8kOdm9_4wBd67lF6d79uv5ovNWVlEcXxc822okR4u46Ek5SKeF4kL5rxebx58Q50Jrn_ISk_2esi6RU3EfUMIvJHhpQMRRHHgAxQTplae8zm0W00)

```plantuml
@startuml
Entity menu {
  *id [PK]
  --
  *name
  *price
  *is_set
  *is_eatin_only
}

Entity customer {
  *id [PK]
  --
  *name
  *phone_number
}

Entity order {
  *id [PK]
  --
  *customer_id [FK]
  *is_paid
  *ordered_at
}

Entity orderDetail {
  *id [PK]
  --
  *order_id [FK]
  *menu_id [FK]
  *is_sabinuki
  *quantity
}

customer --o{ order
order --{ orderDetail
menu --o{ orderDetail
@enduml
```

## 課題２

以下の仕様変更がある場合のテーブル設計


### シャリの大小も選べるようになりました

- 値段が変わらない場合

シャリの大きさを`orderDetail`に`shari_size`として持つ

![svg](http://www.plantuml.com/plantuml/svg/XP31Ji0W38RlF0Ld4zvX1_NYnRinf1jDrWXbGZdCnNVNeZFRel6o_MtvlxymL84YBKLpnqAoseJSx6QilQ5WdnuVdZ-bSrep9DJ_KcZgWgglADyAGOXzvhYQTxF3fbOb9op_0EVCwBcb4Sl1d4luoxbplGxkTT1tM822okx4u46kk5iKeFWhL5rdeZx59Q72IDnUICiwGo5VwGsrUctGSpJnvzhEvUqhsEXN6zjn4QCHUkhS7P13I_43)

- 値段が変わる場合

シャリの大きさを`orderDetail`に`shari_size`として持ち、販売価格も`selling_price`として持つ

![svg](http://www.plantuml.com/plantuml/svg/XL2zJiGm3Dxp59bFkdUu0LXOs16AV8r5BHAdnCvGAjwTEb1KAX1Byldd-v4leb2rvUHkMKbddv6RNvpt9uh-yU7-QONdizKC6UsVAWqTa0H1_K88IXmAfzczkqriQA8bO_r7S2oCWLk-OjsHIur_CJVTO8Cx6_GC4r0qs9aO0-XHxWOLAFqksXVsYdQAWuF0bRYza9KoGgKWz8Rk99WIyNFulirhWsvh0RQqgqzPFdCuUwsnx7CvSxIjdzqBScmvVG00)

### 人気の寿司ネタを特定したいので、セット商品の売り上げとは別に、寿司ネタが毎月何個売れているのか知る必要が生じた

- セット内容をmenuテーブルを自己参照するmenuDetailテーブルで表現する

![svg](http://www.plantuml.com/plantuml/svg/XP3DJiKW48NtF0Lh4zxXBjID6_V6aBcNIJeHXWh3ecbyTnriJMritRI70-URdqiLAD9ID0yi99DDoCtEnjex2lRb-UdrIpgdPuQ4-XyBtRgWwYlAeX24s6UEa_amA-pMgkI4vH_Wa1azjtJ5iWdd4ewIAzVhnQDUz1v6eA2o9p5ua3tk7WKe_WdLr6-Yhc9NeSALkBsH7jyRTFAcHaKvgp12GHQ_SFiW0yMm6WhwsPXpUVxksUXNZNaxWz6GlZfoAyg9Tq4EBSLF)

## 課題３

その他にどのような仕様変更が考えられるか？

- 応対したスタッフが誰なのかを管理することになりました

<details>
  <summary>回答例</summary>

- staffテーブルを作成し、orderテーブルを参照する
- 
![svg](http://www.plantuml.com/plantuml/svg/XP0zRiCm38LtdK9pWDmXGzkbI_UY49Y8GOXAb2jHGs3qxZLL2n2Ckbbi_f0VtzEf26IfCPXd5fAxZSZLpiRQ0tdx_lRwiOJ7e-OC4VK_PRgqW8ehA6k48CGkSRYRRzDXbreaHSmFWBV4wBZ6C-PXkGXSh_kRmsJAVkz6L-2qyR8q3WtRqrNy1EGrR23q3cHBVq812d_VQ0CZKTzmSw70cRX-agPV5Hfvz8hotuK9ChAubTjytIZuNb1GDxfifFbNisbMnu9-TM8UJHcbwDHULSNjrqx8liRm0m00)

</details>
