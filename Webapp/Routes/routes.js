const express = require('express');
const boardController = require('../Controllers/boardController');
const ticketController = require('../Controllers/ticketController');

const router = express.Router();


router.get('/', (req, res) => res.render('index'));

router.get('/board/:boardID', boardController.getBoard);

router.post('/createBoard', boardController.createBoard);

router.post('/deleteBoard', boardController.deleteBoard);

router.post('/createTicket', ticketController.createTicket);

router.post('/updateTicketStatus', ticketController.updateTicketStatus);

router.post('/updateTicket', ticketController.updateTicket);

router.get('/getTicket/:ticketId', ticketController.getTicket);

router.post('/deleteTicket', ticketController.deleteTicket);


module.exports = router;
