const Draggable = require('@shopify/draggable');

var selectedTicketId;
var currentBoardId = window.location.href.substring(window.location.href.lastIndexOf('/')+1);

//Make all ticket items on board-col Sortable objects.
const draggableTicket = new Draggable.Sortable(document.querySelectorAll('.board-col'), {
  draggable: '.ticket',
  swapAnimation: {
    duration: 300,
    easingFunction: 'ease-in-out',
    horizontal: false,
    },
    plugins: [Draggable.Plugins.SwapAnimation],
    delay: 150
});

//Drag and drop event handling
draggableTicket.on('drag:start', () => console.log(draggableTicket.getOptions));
draggableTicket.on('drag:move', () => console.log('drag:move'));
draggableTicket.on('drag:stop', (event) => {
      setTimeout(() => {
        console.log('drag:stop')
        console.log(event);
        var ticketDroppedId = event.data.originalSource.id;
        var newTicketColumnId = document.getElementById(ticketDroppedId).parentElement.id
        updateTicketStatus(ticketDroppedId, newTicketColumnId);
      },0)
    })


function updateTicketStatus (ticketId, newColumnId) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST","/updateTicketStatus", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      ticketId,
      newColumnId
  }));
}


function getTicket(ticketId) {
  return new Promise((resolve, reject) => {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET',`/getTicket/${ticketId}`, true);
      xhr.responseType = 'json';
      xhr.onload = () => {
          let status = xhr.status;
          if(status==200) {
            resolve(xhr.response[0]);
          }else {
            reject(status);
          }
        }
      xhr.send();
    }catch(err){
      console.log(err);
      reject(err);
    }
  })
}


function sendDeleteTicketReq(ticketId, ticketBoardId) {
  return new Promise((resolve, reject) => {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("POST","/deleteTicket");
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
          let status = xhr.status;
          if(status==200) {
            resolve(status);
          }else {
            console.log("Failed with response code: ", status);
            reject(err);
          }
        }
      xhr.send(JSON.stringify({
          ticketId,
          ticketBoardId
      }));
    }catch(err){
      console.log(err);
      reject(err);
    }
  });
};


function deleteBoard (boardId) {
  return new Promise((resolve, reject) => {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("POST","/deleteBoard", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'json';
      xhr.onload = () => {
          let status = xhr.status;
          if(status==200) {
            resolve(status);
          }else {
            console.log("Failed with response code: ", status);
            reject(status);
          }
        }

      xhr.send(JSON.stringify({
          boardId
      }));
    }catch(err){
      console.log("Failed with response code: ", status);
      reject(status);
    }
  });
};


//Function to fill modal window for ticket edit
function fillEditTicketForm(ticketObj){
    console.log("TICKET FOR EDIT: ", ticketObj);
    document.querySelector('.board-id-edit').value = ticketObj.ticketBoardId;
    document.querySelector('.ticket-id-edit').value = ticketObj.ticketId;
    document.querySelector('.title-edit').value = ticketObj.title;
    document.querySelector('.status-edit').value = ticketObj.ticketStatus;
    document.querySelector('.assignee-edit').value = ticketObj.assignee;
    document.querySelector('.descr-edit').value = ticketObj.description;
}


/* when modal is opened to create new ticket*/
document.querySelector(".create-ticket-btn").addEventListener('click', () => {
    window.scrollTo(0, 0);
    document.querySelector(".create-ticket-modal-container").style.display = 'block';
    document.querySelector("body").style.overflow = 'hidden';
});


/* when modal is closed from x*/
document.querySelectorAll(".create-ticket-close-modal").forEach((obj) => { obj.addEventListener('click', () => {
    document.querySelector(".create-ticket-modal-container").style.display = 'none';
    //TEMPORARILY TO HANDLE X CLICK FOR BOTH MODALS, DELETE LATER
    document.querySelector(".edit-ticket-modal-container").style.display = 'none';
    document.querySelector("body").style.overflow = 'visible';
});
});


//Add event listeners to all buttons to detect when ticket edit is initiated.
document.querySelectorAll('.ticket-edit-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      var editTicket = event.path[5].id;
      selectedTicketId = editTicket;
      if(editTicket){
        getTicket(editTicket).then((ticket) => {
          console.log(ticket);
          window.scrollTo(0, 0);
          document.querySelector(".edit-ticket-modal-container").style.display = 'block';
          document.querySelector("body").style.overflow = 'hidden';
          fillEditTicketForm(ticket);
          });
        }
      });
});


//Detect when delete ticket button is pressed and reload page after deletion.
document.querySelector('.delete-ticket').addEventListener('click', (event) => {
  console.log("Delete ticket clicked: ", event, selectedTicketId);
   getTicket(selectedTicketId).then((ticketObj) => {
     sendDeleteTicketReq(ticketObj.ticketId, ticketObj.ticketBoardId);
     location.reload();
   });
  });


//Detect when delete board button pressed, if successful redirect to Home.
document.querySelector('.delete-board-icon').addEventListener('click', (event)=>{
      if(currentBoardId){
        deleteBoard(currentBoardId).then((status)=> {
          console.log(status);
          if(status==200){
            window.location.href = '/';
          }
        });
      }
})
