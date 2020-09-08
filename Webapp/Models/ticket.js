/*TCIKET MODULE TO GATHER TICKET FUNCTIONS - TICKET MODEL to handle TICKET related db requests and data interactions*/
const connection = require('./db').connection;

/*TICKET FUNCTIONS*/
function createTicket(ticketObject) {
  return new Promise((resolve, reject) => {
    getNextTicketNumber(ticketObject.boardID)
    .then((ticketNumber) => {
      try{
        console.log(ticketObject);
        const sql = `INSERT INTO Tickets(ticketNumber, title, ticketStatus, assignee, description, ticketBoardId) VALUES('${ticketNumber}', '${ticketObject.title}','${ticketObject.ticketStatus}','${ticketObject.ticketAssignee}', '${ticketObject.ticketDescr}','${ticketObject.boardID}')`;
        connection.query(sql, (err, result, fields) => {
          if (err) throw err;
          resolve(result)
        })
      }catch(error){
        console.log(error);
        reject(error);
        }
    }).catch((error) => {
      console.log(error);
    });
  });
}


function getTicketById(ticketId){
  return new Promise((resolve, reject) => {
    try{
      const sql = `SELECT * FROM Tickets WHERE ticketId = ${ticketId}`;
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


function updateTicketStatus(ticketId, newStatus) {
  return new Promise((resolve, reject) =>{
    try{
      const sql = `UPDATE Tickets SET ticketStatus= '${newStatus}' WHERE ticketId=${ticketId}`;
      connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        resolve(result);
      });
      } catch(error){
          console.log(error);
          reject(error);
      }
  });
}


function updateTicket(ticketObj) {
  return new Promise((resolve, reject) =>{
    try{
      const sql = `UPDATE Tickets SET title='${ticketObj.ticketTitle}', ticketStatus='${ticketObj.ticketStatus}', assignee='${ticketObj.ticketAssignee}', description='${ticketObj.ticketDescr}' WHERE ticketId=${ticketObj.ticketId}`;
      connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        resolve(result);
      });
      }catch(error){
          console.log(error);
          reject(error);
      }
  });
}


function deleteTicket(ticketId){
  return new Promise((resolve, reject) => {
    try{
      const sql = `DELETE from Tickets WHERE ticketId = ${ticketId}`;
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
  createTicket,
  getTicketById,
  updateTicketStatus,
  updateTicket,
  deleteTicket
}


//Private methods
function getNextTicketNumber(boardId) {
  return new Promise((resolve, reject) => {
    try{
      const sql = `SELECT MAX(ticketNumber) AS currentMax from Tickets WHERE ticketBoardId ='${boardId}'`;
      connection.query(sql, (err, result, fields) => {
        if(err) throw err;
        resolve(result[0].currentMax + 1) //increase by 1 compared to current biggest ticketNumber on selected board.
      })
    }catch(err){
      console.log(err);
      reject(err);
    }
  });
}
