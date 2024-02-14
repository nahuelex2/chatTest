const socket = io()

socket.on('allMessages', (data) => {
    render(data)
    let chat = document.getElementById('caja')
    chat.scrollTop = chat.scrollHeight
})

const render = (data) => {
    const html = data.map(elem => {

        return (`
        <div>
        <strong>${elem.author}: </strong> <em>${elem.text}</em>        
        </div>
        `)
    }).join(' ')

    document.getElementById('caja').innerHTML = html
}
const addMessage = () => {
    const msg = {
        author: document.getElementById('name').value,
        text: document.getElementById('text').value
    }

    socket.emit('newMessage', msg)
    return false
}