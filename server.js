'use strict';

const mongoose = require('mongoose');
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');

// setup mongoose
const User = mongoose.model('User', 
    new mongoose.Schema({
        name: String,
        email: String
    })
);

// connect to mongodb
mongoose.connect(
    `mongodb://localhost/local`, 
    {
        auth: { authdb: 'admin' }
    }
);
mongoose.connection.on('error', function(error) {
    console.log(error);
    process.exit(-1);
})

// use global promise to replace mPromise
mongoose.Promise = global.Promise;


// create app
const app = new Koa();
app.port = process.env.PORT || 3000;
app.use(logger());


// create router for the app
const router = new Router();
router.get('/', async (ctx) => {
    ctx.body = await User.find();
})

app.listen(app.port, () => console.log(`Listening port ${app.port}`));

