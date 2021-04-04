## PrAha Challenge - node/express api

## Run

```
node app.js
```


## Example

#### GET

```
curl localhost:8080 -H "Content-Type: application/json"

Return: {text: hello world}
```

#### POST

```
curl localhost:8080 -d '{"name": "hoge"}' -H "Content-Type: application/json"

Return: {name: hoge}

```

```
curl localhost:8080 -d '{"name": "hoge"}'

Return:  HTTP Status 400 ERROR
```
