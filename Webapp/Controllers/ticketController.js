const Ticket = require('../Models/ticket');
const Board = require('../Models/board');


const createTicket = (req, res) => {
  const newTicketData = {
      boardID: req.body.boardId,
      title: req.body.ticketTitle,
      ticketStatus: req.body.ticketStatus,
      ticketAssignee: req.body.ticketAssignee,
      ticketDescr: req.body.ticketDescr,
  }

      Ticket.createTicket(newTicketData)
      .then(() => res.redirect(`/board/${newTicketData.boardID}`))
      .catch((error) => console.log(error));
}


const updateTicketStatus = (req, res) => {
  Ticket.updateTicketStatus(req.body.ticketId, req.body.newColumnId)
  .then(() =>res.status(200).send())
  .catch((error) => console.log(error));
}


const updateTicket = (req, res) => {
  Ticket.updateTicket(req.body).then(() => res.redirect(`/board/${req.body.boardId}`))
}


const getTicket = (req, res) => {
  Ticket.getTicketById(req.params.ticketId)
  .then((ticket) => res.send(ticket))
  .catch((error) => console.log(error));
}


const deleteTicket = (req, res) => {
  Ticket.deleteTicket(req.body.ticketId)
  .then(() => res.status(200))
  .catch((error) => console.log(error));
}


module.exports = {
  createTicket,
  updateTicketStatus,
  updateTicket,
  getTicket,
  deleteTicket
}
