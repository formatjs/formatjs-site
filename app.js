var express     = require('express'),
    config      = require('./config'),
    hbs         = require('./lib/hbs'),

    compress     = require('compression'),
    errorhandler = require('errorhandler');

var app = module.exports = express();

app.set('name', 'JS Intl Docs');
app.set('env', config.env);
app.set('port', config.port);
app.enable('strict routing');
app.enable('case sensitive routing');


app.engine(hbs.extname, hbs.engine);
app.set('view engine', hbs.extname);
app.set('views', config.dirs.views);

app.use(express.static(__dirname + '/public'));
app.use(compress());

//When we get a favicon, we can uncomment this line
//app.use(express.favicon(path.join(config.dirs.pub, 'favicon.ico')));


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////
app.get('/', function (req, res, next) {
    res.render('home');
});
