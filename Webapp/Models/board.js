/*BOARD MODULE TO GATHER BOARD FUNCTIONS - BOARD MODEL to handle BOARD related db requests and data interactions*/
const ejs = require('ejs');
const connection = require('./db').connection;
const cryptoRandomString = require('crypto-random-string');




function createBoard(boardName, ticketPrefix) {
  return new Promise( (resolve, reject) => {
    try {
      const boardID = cryptoRandomString({length: 10}); //create random string for boardID
      const sql = `INSERT INTO Boards( boardID, boardName, boardTicketPrefix) VALUES('${boardID}', '${boardName}', '${ticketPrefix}');`
      connection.query(sql, function (err, result) {
          if (err) throw err;
          resolve(boardID); // Return boardID to render board;
      });
    }catch(err){
      console.log(err);
      reject(err);
    }
  })
}


//Function to render board view based on boardObj parameters.
function renderBoard(boardObj, res) {
    const boardName = boardObj.boardName;
    const boardId = boardObj.boardID;
    const boardTicketPrefix = boardObj.boardTicketPrefix;
    getBoardTickets(boardObj.boardID).then((boardTickets) => {
      res.render('boardView', {
          boardId,
          boardName,
          boardTickets,
          boardTicketPrefix
          });
    });
  }


//Function to fetch board object from DB using boardId.
function getBoardObj(boardId) {
  return new Promise((resolve, reject) =>{
    try{
      const sql = `SELECT * FROM Boards WHERE boardID='${boardId}'`;
      connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        const boardObj = result[0];
        resolve(boardObj);
      });
      } catch(error){
          console.log(error);
          reject(error);
      }
  })
}


function getBoardTickets(boardID) {
  return new Promise((resolve, reject) => {
    try{
      const sql = `SELECT * FROM Tickets WHERE ticketBoardId = '${boardID}'`;
      connection.query(sql, (err, result, fields)=> {
          if (err) throw err;
          resolve(result);
      })
    }catch(error){
      console.log(error);
      reject(error);
    }
  });
}


function deleteBoard(boardId){
  return new Promise((resolve, reject) => {
    try{
      const sql = `DELETE from Boards WHERE boardID='${boardId}'`;
      connection.query(sql, (err, result, fields) => {
        if(err) throw err;
        resolve(result)
      })
    }catch(err){
      console.log(err);
      reject(err);
    }
  });
}


module.exports = {
  createBoard,
  renderBoard,
  getBoardObj,
  getBoardTickets,
  deleteBoard
}
