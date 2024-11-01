const express = require('express');
const { getMovies, getMovieById } = require('./controllers/index');
const app = express();

app.use(express.json());

// 1
app.get('/movies', (req, res) => {
  let movies = getMovies();
  res.json(movies);
});

// 2
app.get('/movies/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let movie = getMovieById(id);
  res.json(movie);
});

module.exports = {
  app,
};
