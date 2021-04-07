const Flight = require('../models/flight')

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {flights})
    })
}

function show(req, res) {
    console.log('hitting')
    Flight.findById(req.params.id)
      .populate("cast")
      .exec(function (err, movie) {
        Performer.find({ _id: { $nin: movie.cast } }, function (err, performers) {
          console.log(performers);
          res.render("movies/show", {
            title: "Movie Detail",
            movie,
            performers,
          });
        });
      });
  }

function newFlight(req, res) {
    res.render('flights/new')
}

function create(req, res) {
    req.body.departs = req.body.departs.replace(/\s*,\s*/g, ",");
    if(req.body.departs) req.body.departs = req.body.departs.split(",");
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if(err) return res.render('flights/new');
        console.log(flight)

        res.redirect('/flights'); 
    })

}


module.exports = {
    index,
    new: newFlight,
    create
}