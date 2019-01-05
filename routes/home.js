const express = require('express');
const homeRouter = express.Router();

//Basic endPoint for the api
homeRouter.get('/', (req, res) => {
    res.render('index',{
        title: 'Home', 
        message: 'Welcome to the world of Node',
        description: 'This is really awesome'
    });
});

module.exports = homeRouter;