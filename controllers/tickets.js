const Ticket = require("../models/ticket");
const Flight = require("../models/flight");

module.exports = {
    new: newTicket,
    create,
    addToFlight,
  };

  function newTicket(req, res) {
    Ticket.find({}, function (err, tickets) {
      res.render("tickets/new", {
        title: "Ticket",
        tickets,
        
      });
    });
  }
  


  function create(req, res) {
    const ticket = new Ticket(req.body);
    ticket.save(function (err) {
      if (err) return res.redirect("/tickets/new");
      res.redirect("/tickets/new"); 
    });

}
  function addToFlight(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
      flight.ticket.push(req.body.performerId);
      flight.save(function (err) {
        res.redirect(`/flights/${flight._id}`);
      });
    });
  }





