var express = require("express");
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var server = app.listen(8080, function(){
    console.log("Listening PORT: " + server.address().port);
});

app.get("/", function(req, res, next){
    res.json({"text": "hello world"});
});

app.post('/', function(req, res) {
    if (req.is('application/json')) {
        res.status(201).send(req.body);
    } else {
    const error = new Error('Invalid Content-Type');
    res.status(400).send({ error: error.message });
    }
})