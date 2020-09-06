/*BOARD MODULE TO GATHER BOARD FUNCTIONS - BOARD MODEL to handle BOARD related db requests and data interactions*/
const mysql = require('mysql');
const ejs = require('ejs');

const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'CvRRmHdib0',
  password: 'Vjgjs1DrYK',
  database: 'CvRRmHdib0',
});

connection.connect();


function createBoard(boardName, ticketPrefix) {
  return new Promise( (resolve, reject) => {
    try {
      const sql = `INSERT INTO Boards(boardName, boardTicketPrefix) VALUES('${boardName}', '${ticketPrefix}');`
      connection.query(sql, function (err, result) {
        if (err) throw err;
        resolve(result.insertId); // Return boardID from DB;
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
    getBoardTickets(boardObj.boardID).then((boardTickets) => {
      res.render('boardView', {
          boardId,
          boardName,
          boardTickets
          });
    });
  }


//Function to fetch board object from DB using boardId.
function getBoardObj(boardId) {
  return new Promise((resolve, reject) =>{
    try{
      const sql = `SELECT * FROM Boards WHERE boardID=${boardId}`;
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
      const sql = `SELECT * FROM Tickets WHERE ticketBoardId = ${boardID}`;
      connection.query(sql, (err, result, fields)=> {
          if (err) throw err;
          resolve(result)
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
      const sql = `DELETE from Boards WHERE boardID=${boardId}`;
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
