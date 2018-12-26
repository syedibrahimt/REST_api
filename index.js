//importing the requires modules
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const log = require('./middlewares/logger');
const config = require("config");
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

console.log(`Name : ${config.get('name')}`);
console.log(`Host : ${config.get('mail-server.host')}`);
console.log(`Name : ${config.get('mail-server.password')}`);

//Custom middleware
app.use(log);

const genres = [
    { id: 1, name: 'ar.rahman' },
    { id: 2, name: 'anirudh' },
    { id: 3, name: 'santhoshNarayanan' },
    { id: 4, name: 'harris' },
    { id: 5, name: 'u1' },
];

//Basic endPoint for the api
app.get('/api', (req, res) => {
    res.send('Hello!! Its working!!');
});

//EndPoint to get all the genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

//EndPoint to get a specific genre
app.get('/api/genre/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested genre is not found')
    res.send(genre);
});

//EndPoint to create a new genre
app.post('/api/genres', (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});


//EndPoint to update a genre
app.put('/api/genre/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested genre is not found')
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
});


//EndPoint to delete a genre
app.delete('/api/genre/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested genre is not found')
    genres.pop(genre);
    res.send(genres);
});


validate = (genre) => {
    const schema = {
        name: Joi.string().min(2).max(15).required()
    }
    return Joi.validate(genre, schema);
}

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Server started and listening on ${port}`));
