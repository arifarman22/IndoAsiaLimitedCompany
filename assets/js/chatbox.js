// Chatbox functionality
let currentPlatform = null;

function openChatbox(platform) {
    const chatbox = document.getElementById('chatbox');
    const chatHeader = document.getElementById('chatHeader');
    const chatMessages = document.getElementById('chatMessages');
    
    // Toggle: if same platform clicked and chatbox is open, close it
    if (chatbox.style.display === 'flex' && currentPlatform === platform) {
        closeChatbox();
        return;
    }
    
    currentPlatform = platform;
    chatbox.style.display = 'flex';
    
    if (platform === 'whatsapp') {
        chatHeader.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp Chat<button id="closeChat" onclick="closeChatbox()">&times;</button>';
        chatHeader.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <p>Hello! 👋 Welcome to IndoAsia Trading.</p>
                <p>Click here to chat: <a href="https://wa.me/8801711257739" target="_blank" style="color: #25d366; font-weight: bold;">Open WhatsApp</a></p>
            </div>
        `;
    } else if (platform === 'facebook') {
        chatHeader.innerHTML = '<i class="fab fa-facebook-messenger"></i> Messenger Chat<button id="closeChat" onclick="closeChatbox()">&times;</button>';
        chatHeader.style.background = 'linear-gradient(135deg, #0084ff, #0066cc)';
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <p>Hi there! 👋 Thanks for reaching out to IndoAsia Trading.</p>
                <p>Click here to chat: <a href="https://m.me/IndoAsiaTrading" target="_blank" style="color: #0084ff; font-weight: bold;">Open Messenger</a></p>
            </div>
        `;
    }
}

function closeChatbox() {
    document.getElementById('chatbox').style.display = 'none';
    currentPlatform = null;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML += `
            <div class="message user-message">
                <p>${message}</p>
            </div>
        `;
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            const link = currentPlatform === 'whatsapp' 
                ? '<a href="https://wa.me/8801711257739" target="_blank" style="color: #25d366; font-weight: bold;">WhatsApp</a>'
                : '<a href="https://m.me/IndoAsiaTrading" target="_blank" style="color: #0084ff; font-weight: bold;">Messenger</a>';
            chatMessages.innerHTML += `
                <div class="message bot-message">
                    <p>Thank you! Click to continue on ${link}</p>
                </div>
            `;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
