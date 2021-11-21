# 課題43: Effect hookを理解する

## 課題1

### なぜcleanup処理が必要なのか？

アンマウントされたDOMに対してステートを更新すると、メモリリークの警告が表示される。

これは非同期にデータを取得した場合に、アンマウント後にステート更新が行われるときなどに発生しうる。

これを避けるために、Componentのアンマウント時に実行するcleanup関数を用意する必要がある。

`useEffect`では`return`でcleanup関数を返すことができる。

### useEffectの第2引数の挙動

- 何も指定しなかった場合
  - 毎回レンダリング時に、第一引数の関数が実行される
- 空の配列（[]）を指定した場合
  - 初回のレンダリング時のみ、第一引数が実行される
- 配列に変数を指定した場合
  - 変数が変更されたら実行される


### 課題2

回答: [codesand box](https://codesandbox.io/s/x9ntj?file=/src/App.js)

#### ポイント
- `useRef`を使用して、値変更時のレンダリングを回避する
- `flag`が`true`の場合のみ`renderCount`をインクリメントする

```js
  const renderCount = useRef(0);

  useEffect(() => {
    flag && renderCount.current++;
  });

```



### 課題3

回答: [codesand box](https://codesandbox.io/s/x9ntj?file=/src/fetch-component.js)

#### ポイント
- `useEffect`の第二引数に`[]`を指定することで、初回のみ実行される

```js
import { useEffect, useState } from "react";

export const FetchComponent = () => {
  const [data, setData] = useState({
    subscribers: 0,
    stars: 0
  });

  useEffect(() => {
    const fetchGithubStars = async () => {
      console.log("fetch github star");
      const response = await fetch(
        "https://api.github.com/repos/facebook/react"
      );
      const resData = await response.json();
      const stars = resData.stargazers_count;

      setData({ ...data, stars: stars });
    };
    fetchGithubStars();
  }, []);

  return (
    <div>
      <p>ここにReactのGitHubレポジトリに付いたスターの数を表示してみよう</p>
      <p>{data.stars} stars</p>
    </div>
  );
};
```


### 課題4

useEffectに関するクイズを作成してください
