require('dotenv').config()

const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 3000

app.use(express.static('static'))

app.set('view engine', 'ejs');
// Tell the views engine/ejs where the template files are stored (Settingname, value)
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
  });
})

app.get('/movies', (req, res) => {
  fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.MOVIEDB_TOKEN}`)
    .then(async response => {
      const movieData = await response.json()
      res.render('overview', {
        title: 'Movies',
        movieData
      });
    })
})

app.get('/movies/:id', (req, res) => {
  Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.MOVIEDB_TOKEN}`).then(response => response.json()),
    fetch(`https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=${process.env.MOVIEDB_TOKEN}`).then(response => response.json())
  ])
    .then(([details, videos]) => {
      res.render('detail', {
        title: details.original_title,
        movieData: {
          ...details,
          videos: videos.results
        },
      });
    })
})

app.get('/search', (req, res) => {
  fetch(`https://api.themoviedb.org/3/search/movie?query=${req.query.query}&api_key=${process.env.MOVIEDB_TOKEN}`)
    .then(async response => {
      const movieData = await response.json()
      res.render('results', {
        query: req.query.query, // We use this for the page title, see views/partials/head.ejs
        movieData
      });
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
