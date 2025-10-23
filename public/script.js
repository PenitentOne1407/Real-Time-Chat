const socket = io(); // Connect to server

const messages = document.getElementById('messages');
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.onclick = () => {
  const msg = input.value;
  if (msg.trim()) {
    socket.emit('chat message', msg); // Send to server
    input.value = '';
  }
};

socket.on('chat message', (msg) => {
  const item = document.createElement('div');
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});