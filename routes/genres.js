const express = require('express');
const genreRouter = express.Router();
const genres = [
    { id: 1, name: 'ar.rahman' },
    { id: 2, name: 'anirudh' },
    { id: 3, name: 'santhoshNarayanan' },
    { id: 4, name: 'harris' },
    { id: 5, name: 'u1' },
];


//EndPoint to get all the genres
genreRouter.get('/', (req, res) => {
    res.send(genres);
});

//EndPoint to get a specific genre
genreRouter.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested genre is not found')
    res.send(genre);
});

//EndPoint to create a new genre
genreRouter.post('/', (req, res) => {
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
genreRouter.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested genre is not found')
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
});


//EndPoint to delete a genre
genreRouter.delete('/:id', (req, res) => {
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

module.exports = genreRouter;