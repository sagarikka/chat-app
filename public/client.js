
const socket = io()
let messageInput = document.querySelector('#messageInput')
let messageArea = document.querySelector('.container')

//prevent refresh of form
var form = document.getElementById("sendMessage");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

let userName ;

do{
    userName = prompt('please enter your name: ')
} while(!userName)

messageInput.addEventListener('keyup' , (e) =>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg= {
        user :userName,
        message :message
    }

    //Append message
    appendMesssage(msg,'right')
    messageInput.value =' '
    scrollToBottom()   

    //send to server
    socket.emit('message',msg)

}

function appendMesssage(msg,type){
    let mainDiv =document.createElement('div')
    let className = type
    mainDiv.classList.add(className ,'message')
    let markup =`
         <h3>${msg.user}</h3>
         <p>${msg.message}</p>
    `
    mainDiv.innerHTML =markup

    messageArea.appendChild(mainDiv)
}

//Recieve messages

socket.on('message',(msg) =>{
    appendMesssage(msg ,'left')
    scrollToBottom()
})

//for automatic scroll
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}