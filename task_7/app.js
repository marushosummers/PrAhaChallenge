const express = require("express");
const cacheControl = require('express-cache-controller');

const app_cached = express();
app_cached.use(express.static('cached-image',{maxAge: '5000'}));

app_cached.listen(8080, function(){
    console.log("Listening PORT: 8080");
});

const app_no_cached = express();
app_no_cached.use(express.static('no-cached-image'));
app_no_cached.listen(8081, function(){
    console.log("Listening PORT: 8081");
});

function setCustomCacheControl (res, path) {
    res.setHeader('Cache-Control', 'no-cache');
    }
