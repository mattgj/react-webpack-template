require("babel-core/register");

var path        = require('path'),
    express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    routes      = require('./routes'),
    port        = process.env.PORT || 8080;


app.set('view engine', 'ejs');
app.use(routes);
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(port, function() {
    console.log("App listening on port " + port);
});
