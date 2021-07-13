## PrAha Challenge - node/express cookie

## Run

1. Start Server
```
node app.js
```

2. Start Third-Paty site in ngrok
```
ngrok http 8081
```

3. Modify image url to ngrok forwarding url

```html
./first-party/index.html
...

<img src="https://<ngrok-host>/cookie.jpg">
```

4. accsess to http://localhost:8080/

5. Check Developer-console > Application > Cookie
    
    - Domain: localhost `first-party=cookie`
    - Domain: ngrok-host `third-party=cookie`