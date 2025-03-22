document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.querySelector('.chat-messages');

    // Function to add a new message
    function addMessage(message, isSent) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isSent ? 'sent' : 'received');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        
        // Scroll to the bottom of messages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message when clicking the send button
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true);
            messageInput.value = '';
            
            // Simulate received message (for demo purposes)
            setTimeout(() => {
                addMessage('This is a demo reply!', false);
            }, 1000);
        }
    });

    // Send message when pressing Enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    // Add this to your existing JavaScript
    const searchInput = document.getElementById('search-contacts');
    const contactItems = document.querySelectorAll('.contact-item');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        contactItems.forEach(item => {
            const contactName = item.querySelector('h4').textContent.toLowerCase();
            if (contactName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}); 