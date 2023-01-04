require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const Mongodbstore = require('connect-mongo');
const passport = require('passport');
const cookieParser = require('cookie-parser');
//const passportinit = require('../pizza/app/config/passport');

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/pizza', {
	useNewUrlParser: true, useUnifiedtopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected');
});

let mongostore = new Mongodbstore({
    mongoUrl: 'mongodb://127.0.0.1/pizza',
    collection: 'sessions'
})

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongostore,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*5}
}));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})


//passportinit(passport);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
require('./routes/web')(app);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));

app.listen(PORT);

