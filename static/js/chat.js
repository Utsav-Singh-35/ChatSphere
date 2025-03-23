document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.querySelector('.chat-messages');
    const contactItems = document.querySelectorAll('.contact-item');
    const chatMain = document.querySelector('.chat-main');
    const chatList = document.querySelector('.chat-list');
    const chatContainer = document.querySelector('.chat-container');
    const contactName = document.querySelector('.contact-name');
    
    // Check if we're on mobile
    const isMobile = () => window.innerWidth <= 768;

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
    
    // Mobile chat interaction
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const username = item.querySelector('h4').textContent;
            contactName.textContent = username;
            
            // Add message for demo
            chatMessages.innerHTML = '';
            
            if (isMobile()) {
                // Show chat interface on mobile
                chatList.style.display = 'none';
                chatMain.style.display = 'flex';
                
                // Add back button for mobile
                if (!document.querySelector('.back-to-contacts')) {
                    const backButton = document.createElement('button');
                    backButton.className = 'back-to-contacts';
                    backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
                    document.querySelector('.chat-header').prepend(backButton);
                    
                    backButton.addEventListener('click', () => {
                        chatList.style.display = 'block';
                        chatMain.style.display = 'none';
                    });
                }
            }
            
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            // Reset layout on desktop
            chatList.style.display = 'block';
            chatMain.style.display = 'flex';
            
            // Remove mobile back button if exists
            const backButton = document.querySelector('.back-to-contacts');
            if (backButton) {
                backButton.remove();
            }
        } else if (document.querySelector('.contact-name').textContent !== 'Select a contact') {
            // On mobile, keep showing chat if a contact is selected
            chatList.style.display = 'none';
            chatMain.style.display = 'flex';
        }
    });
    
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