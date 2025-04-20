const socket = io(); // Connect to the Socket.io server

const chat = document.getElementById('chat');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

// Send message when form is submitted
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = messageInput.value.trim(); // Get message from input

  if (msg) {
    socket.emit('chat message', msg); // Emit message to server
    messageInput.value = ''; // Clear the input field
  }
});

// Listen for incoming messages
socket.on('chat message', (data) => {
  console.log("Received:", data);  // Add console log to check if the message is received correctly

  const messageElement = document.createElement('div');
  messageElement.textContent = data.text; // Get the text of the message

  // Check if the message is from the current user
  if (data.senderId === socket.id) {
    messageElement.classList.add('my-message'); // Style for own messages
  } else {
    messageElement.classList.add('other-message'); // Style for other users' messages
  }

  chat.appendChild(messageElement); // Add the message to the chat
  chat.scrollTop = chat.scrollHeight; // Scroll to the bottom
});
