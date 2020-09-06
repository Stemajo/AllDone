const Ticket = require('../Models/ticket');
const Board = require('../Models/board');


const createTicket = (req, res) => {
  const newTicketObj = {
      boardID: req.body.boardId,
      title: req.body.ticketTitle,
      ticketStatus: req.body.ticketStatus,
      ticketAssignee: req.body.ticketAssignee,
      ticketDescr: req.body.ticketDescr
  }

  Board.getBoardObj(req.body.boardId)
      .then((boardObj) => {
          newTicketObj.ticketNumber = boardObj.boardTicketPrefix + "-xxx";
      })
      .then(() => Ticket.createTicket(newTicketObj))
      .then(() => res.redirect(`/board/${newTicketObj.boardID}`))
      .catch((error) => console.log(error));
}


const updateTicketStatus = (req, res) => {
  const statusMap = {
     "col-1":"TODO",
     "col-2":"In progress",
     "col-3":"Testing",
     "col-4":"Done"
  }

  Ticket.updateTicketStatus(req.body.ticketId, statusMap[req.body.newColumnId])
  .then(() =>res.status(200).send())
  .catch((error) => console.log(error));
}


const updateTicket = (req, res) => {
  Ticket.updateTicket(req.body).then(() => res.redirect(`/board/${req.body.boardId}`))
}


const getTicket = (req, res) => {
  Ticket.getTicketById(req.body.ticketId)
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
