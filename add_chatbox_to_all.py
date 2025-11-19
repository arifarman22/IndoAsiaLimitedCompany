import os
import re

# HTML files to update
html_files = [
    '404.html', 'about.html', 'additionalServices.html', 'blog-cost-management.html',
    'blog-market-opportunities.html', 'blog-quality-control.html', 'blog-regulations.html',
    'blog-supply-chain.html', 'blog-technology.html', 'blog.html', 'contact.html',
    'coreServices.html', 'faqs.html', 'features.html', 'plans.html', 'services.html', 'team.html'
]

chatbox_css = '<link rel="stylesheet" href="assets/css/chatbox.css">'
chatbox_js = '<script src="assets/js/chatbox.js"></script>'

chatbox_html = '''
    <!-- Floating Social Contact Icons -->
    <div class="floating-social-icons">
        <a href="#" onclick="openChatbox('facebook'); return false;" class="social-icon facebook-icon" aria-label="Chat on Facebook">
            <i class="fab fa-facebook-messenger"></i>
        </a>
        <a href="#" onclick="openChatbox('whatsapp'); return false;" class="social-icon whatsapp-icon" aria-label="Chat on WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <!-- Chatbox -->
    <div id="chatbox">
        <div id="chatHeader">
            <span>Chat</span>
            <button id="closeChat" onclick="closeChatbox()">&times;</button>
        </div>
        <div id="chatMessages"></div>
        <div id="chatInputArea">
            <input type="text" id="chatInput" placeholder="Type a message...">
            <button id="sendBtn" onclick="sendMessage()">Send</button>
        </div>
    </div>

    <style>
        .floating-social-icons {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            z-index: 1000;
        }

        .social-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 28px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }

        .facebook-icon {
            background: linear-gradient(135deg, #1a365d, #2563eb);
        }

        .whatsapp-icon {
            background: linear-gradient(135deg, #dc2626, #ea580c);
        }

        .social-icon:hover {
            transform: scale(1.1) translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
            animation: none;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        @media (max-width: 768px) {
            .floating-social-icons {
                bottom: 20px;
                right: 20px;
            }

            .social-icon {
                width: 50px;
                height: 50px;
                font-size: 24px;
            }
        }
    </style>
'''

for filename in html_files:
    filepath = filename
    
    if not os.path.exists(filepath):
        print(f"Skipping {filename} - file not found")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add CSS link if not present
    if 'chatbox.css' not in content:
        content = content.replace('</head>', f'    {chatbox_css}\n</head>')
    
    # Add JS script if not present
    if 'chatbox.js' not in content:
        content = content.replace('</body>', f'    {chatbox_js}\n</body>')
    
    # Add chatbox HTML if not present
    if 'id="chatbox"' not in content:
        content = content.replace('</body>', f'{chatbox_html}\n</body>')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {filename}")

print("\nChatbox added to all pages successfully!")
