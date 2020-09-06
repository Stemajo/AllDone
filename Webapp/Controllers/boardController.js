const Board = require('../Models/board');


const getBoard = (req, res) => {
      Board.getBoardObj(req.params.boardID).then((boardObj) => {
        Board.renderBoard(boardObj, res);
      }).catch((error) => {
        console.log(error);
      });
  }

const createBoard = (req, res) => {
        Board.createBoard(req.body.boardName, req.body.ticketPrefix).then( (boardID) => {
        res.redirect(`/board/${boardID}`);
        }).catch((error) => {
          console.log(error);
        });
  }


const deleteBoard = (req, res) => {
    Board.deleteBoard(req.body.boardId).then((result) =>{
      console.log(result);
      res.redirect(`/`)
    }).catch((error) => {
      console.log(error);
    });
  }


module.exports = {
  getBoard,
  createBoard,
  deleteBoard
}
