var express = require('express');
var router = express.Router();

const journeyModel = require('../models/journey');
const userModel = require('../models/user');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]

/* Sign In / Up */
router.get('/login', (req, res) => {
  res.render('index', { message: false });
})

/* GET home page. */
router.get('/', function(req, res, next) {
  /* if (!req.session.user){
    return res.redirect('/login');
  } */
  res.render('homepage', { title: 'Express' });
});

/* Search matching journeys */
router.post('/search', async (req, res) => {
  /* if (!req.session.user){
    return res.redirect('/login');
  } */
  const results = await journeyModel.find({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: requ.body.date
  });

  res.render('results', { results });
});


/* Ajouter un trip dans le "panier de la session" */
router.get('/add-trip', async (req, res) => {

  req.session.user.trips.push(req.query.trip_id);
  res.redirect('/checkout');
});


/* Get the checkout */
router.get('/checkout', async (req, res) => {
  /* if (!req.session.user){
    return res.redirect('/login');
  } */
  const trips = [];
  req.session.user.trips.forEach( async (trip_id) => {
    trips.push( await journeyModel.findById(trip_id) );
  })
  
  res.render('checkout', { trips });
});

router.get('/confirm-checkout', async (req, res) => {
  /* if (!req.session.user){
    return res.redirect('/login');
  } */

  // les trips sont stockés dans le user de la BDD
  const user = await userModel.findById(req.query.trip_id);
  const trips = user.trips? [...user.trips] : [];
  req.session.user.trips.forEach( (trip_id) => {
    trips.push( trip_id );
  })
  
  await userModel.updateOne({ user, trips });
  req.session.user.trips = [];

  res.redirect('/')
})

/* Get Last trips */
router.get('/last-trip', async (req, res) => {
  const user = await userModel
    .findById('req.session.user.id')
    .populate('trips');

  res.render('trips', { trips: user.trips });
})










/* // Remplissage de la base de donnée, une fois suffit
router.get('/save***************', async function(req, res, next) {
  // How many journeys we want
  var count = 300
  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){
    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    if(departureCity != arrivalCity){
      var newUser = new journeyModel ({
        departure: departureCity , 
        arrival: arrivalCity, 
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
      await newUser.save();
    }
  }
  res.render('index', { title: 'Express' });
});

// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {
  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){
    journeyModel.find( 
      { departure: city[i] } , //filtre
      function (err, journey) {
          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )
  }
  res.render('index', { title: 'Express' });
}); */

module.exports = router;
