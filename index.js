//importing the requires modules
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const log = require('./middlewares/logger');
const config = require("config");
const debug = require("debug")("app:startup");
const app = express();
const genreRouter= require('./routes/genres')
const homeRouter = require('./routes/home')

app.set('view engine', 'pug');

app.set('views', './views');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/genres',genreRouter);
app.use('/api',homeRouter);
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan Enabled!!...');
}

console.log(`Name : ${config.get('name')}`);
console.log(`Host : ${config.get('mail-server.host')}`);

//Custom middleware
app.use(log);

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Server started and listening on ${port}`));
