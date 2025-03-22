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
    if (sendButton) {
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
    }

    // Send message when pressing Enter
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendButton.click();
            }
        });
    }

    // Add this to your existing JavaScript
    const searchInput = document.getElementById('search-contacts');
    if (searchInput) {
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
    }
    
    // Mobile menu toggle functionality
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        // Create toggle button for mobile menu
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        userProfile.appendChild(mobileMenuToggle);
        
        const profileActions = document.querySelector('.profile-actions');
        
        mobileMenuToggle.addEventListener('click', () => {
            profileActions.classList.toggle('show-mobile');
            // Change icon based on menu state
            const icon = mobileMenuToggle.querySelector('i');
            if (profileActions.classList.contains('show-mobile')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!userProfile.contains(e.target) && profileActions.classList.contains('show-mobile')) {
                profileActions.classList.remove('show-mobile');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
        
        // Close menu on window resize (if switching to desktop view)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && profileActions.classList.contains('show-mobile')) {
                profileActions.classList.remove('show-mobile');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
}); 