const socket=io('ws://localhost:3000')
const activity=document.querySelector('.activity')
const msginput=document.querySelector('input')

function sendMessage(e){
    e.preventDefault();
    
    if(msginput.value){
        socket.emit('message',msginput.value);
        msginput.value=''
    }
    msginput.focus()
}
document.querySelector('form')
    .addEventListener('submit',sendMessage)

socket.on('message',(data)=>{
    activity.textContent=''
    const li=document.createElement('li')
    li.textContent=data;
    document.querySelector('ul').appendChild(li)
})
msginput.addEventListener("keypress",()=>{
    socket.emit('activity',socket.emit(socket.id.substring(0,5)))
})
socket.on('activity',(name)=>{
    activity.textContent=`${name} is typing..`
})