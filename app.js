const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname + '/views/partials'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req,res) => {
  punkAPI.getBeers()
  .then((beersFromApi) => {
    res.render('beers.hbs',{
      beersFromApi: beersFromApi
    })
  }).catch((err) => {
    console.log(err);
  });

})

app.get('/random-beer', (req,res) => {
  punkAPI.getRandom()
  .then((randomBeer) => {
    res.render('random-beers.hbs',{
      randomBeer
    })
  })
  .catch((error) => {
    console.log(error);
  })
})

app.get('/beers/:beer', (req,res) => {
  const {beer} = req.params
  punkAPI.getBeer(beer)
  .then((beerPicked) => {
    res.render('beer-picked.hbs', {
      beerPicked: beerPicked
    })
  })
  .catch((error) => {
    console.log(error);
  })
})


// app.get('*', () => {console.log('Lo siento, tu pagina no existe');})
app.listen(3000, () => console.log('🏃‍ on port 3000'));
