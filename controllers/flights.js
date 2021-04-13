const Flight = require("../models/flight");
const Ticket = require("../models/ticket")



function index(req, res) {
  Flight.find({}, function (err, flights) {
    console.log(flights);
    res.render("flights/index", { title: "Flights", flights });
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
   Ticket.find({ _id: { $nin: flight.ticket } }, function (err, tickets) {
      console.log(tickets);
      res.render("flights/show", {
        title: "Flight Detail",
        flight,
        tickets,
      });
    });
  });
}
  
  


function newFlight(req, res) {
  res.render("flights/new", { title: "Add Flight" });
  
}

function create(req, res) {
  const flight = new Flight(req.body);
  console.log(req.body);
  flight.save(function (err) {
    // one way to handle errors
    if (err) return res.json({error: err });
    console.log(flight);
    res.redirect("/flights");
  });
}



module.exports = {
  new: newFlight,
  create,
  index,
  show,
};