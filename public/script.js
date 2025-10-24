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
// Credits Modal Logic
document.getElementById('creditsBtn').onclick = function () {
  document.getElementById('creditsModal').style.display = 'flex';
};
document.getElementById('closeModal').onclick = function () {
  document.getElementById('creditsModal').style.display = 'none';
};
window.onclick = function (event) {
  const modal = document.getElementById('creditsModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
