// ===== Internationalization (i18n) =====
const translations = {
    en: {
        nav_chat: "New Chat",
        nav_social: "Social Apps",
        nav_analytics: "Analytics",
        dark_mode: "Dark Mode",
        settings: "Settings",
        logout: "Logout",
        welcome: "Welcome, User! 👋",
        subheader: "Your AI-powered social media assistant",
        search: "Search conversations...",
        connected_apps: "Connected to Your Social Profiles",
        chats: "Chats",
        emails: "Emails",
        messages: "Messages",
        dms: "DMs",
        ai_greeting: "Hello! 👋 I'm your AI assistant for managing all your social media. I can help you draft messages, analyze engagement, and more.",
        what_help: "What can I help you with today?",
        just_now: "Just now",
        type_question: "Type your question...",
        manage_whatsapp: "Manage your WhatsApp conversations",
        manage_email: "Draft and manage your emails smartly",
        manage_linkedin: "Compose posts and messages",
        manage_instagram: "Smart DM and caption suggestions",
        manage_twitter: "Compose tweets and threads",
        manage_sms: "Compose and manage SMS",
        open: "Open",
        engagement_analysis: "Engagement Analysis",
        social_stats: "Social Statistics",
        total_messages: "Total Messages",
        contacts: "Contacts",
        engagement: "Engagement",
        growth: "Growth",
        preferences: "Preferences",
        enable_notif: "Enable Notifications",
        email_updates: "Email Updates",
        profile: "Profile",
        edit_profile: "Edit Profile",
        chat_history: "Chat History",
        history_1: "How to write professional emails",
        history_2: "LinkedIn profile optimization",
        history_3: "Instagram caption ideas",
    },
    hi: {
        nav_chat: "नई चैट",
        nav_social: "सोशल ऐप्स",
        nav_analytics: "विश्लेषण",
        dark_mode: "डार्क मोड",
        settings: "सेटिंग्स",
        logout: "लॉगआउट",
        welcome: "स्वागत है, उपयोगकर्ता! 👋",
        subheader: "आपका AI-संचालित सोशल मीडिया सहायक",
        search: "खोज...",
        connected_apps: "आपकी सोशल प्रोफाइल से जुड़ा हुआ",
        chats: "चैट्स",
        emails: "ईमेल",
        messages: "संदेश",
        dms: "सीधे संदेश",
        ai_greeting: "नमस्ते! 👋 मैं आपके सभी सोशल मीडिया को प्रबंधित करने के लिए आपका AI सहायक हूं।",
        what_help: "मैं आज आपकी क्या मदद कर सकता हूँ?",
        just_now: "अभी",
        type_question: "अपना सवाल टाइप करें...",
        manage_whatsapp: "अपनी WhatsApp बातचीत का प्रबंधन करें",
        manage_email: "ईमेल ड्राफ्ट और प्रबंधित करें",
        manage_linkedin: "पोस्ट और संदेश बनाएं",
        manage_instagram: "स्मार्ट DM और कैप्शन सुझाव",
        manage_twitter: "ट्वीट्स और थ्रेड्स बनाएं",
        manage_sms: "SMS बनाएं और प्रबंधित करें",
        open: "खोलें",
        engagement_analysis: "एंगेजमेंट विश्लेषण",
        social_stats: "सोशल आंकड़े",
        total_messages: "कुल संदेश",
        contacts: "संपर्क",
        engagement: "एंगेजमेंट",
        growth: "वृद्धि",
        preferences: "प्राथमिकताएं",
        enable_notif: "सूचनाएं सक्षम करें",
        email_updates: "ईमेल अपडेट",
        profile: "प्रोफाइल",
        edit_profile: "प्रोफाइल संपादित करें",
        chat_history: "चैट इतिहास",
        history_1: "व्यावसायिक ईमेल कैसे लिखें",
        history_2: "LinkedIn प्रोफाइल अनुकूलन",
        history_3: "Instagram कैप्शन विचार",
    },
    mr: {
        nav_chat: "नवीन चॅट",
        nav_social: "सोशल ऍप्स",
        nav_analytics: "विश्लेषण",
        dark_mode: "गाढ़ मोड",
        settings: "सेटिंग्ज",
        logout: "लॉगआउट",
        welcome: "स्वागतम, वापर! 👋",
        subheader: "तुमचा AI-संचालित सोशल मीडिया सहाय्यक",
        search: "शोध...",
        connected_apps: "तुमच्या सोशल प्रोफाइलला जोडलेले",
        chats: "चॅट्स",
        emails: "ईमेल",
        messages: "संदेश",
        dms: "थेट संदेश",
        ai_greeting: "नमस्कार! 👋 मी तुमच्या सर्व सोशल मीडिया व्यवस्थापित करण्यासाठी तुमचा AI सहाय्यक आहे।",
        what_help: "आज मी तुम्हाला कसे मदत करू शकतो?",
        just_now: "आत्ता",
        type_question: "तुमचा प्रश्न टाइप करा...",
        manage_whatsapp: "तुमच्या WhatsApp संभाषणाचे व्यवस्थापन करा",
        manage_email: "ईमेल मसुदा आणि व्यवस्थापित करा",
        manage_linkedin: "पोस्ट आणि संदेश रचा",
        manage_instagram: "स्मार्ट DM आणि कॅप्शन सुझाव",
        manage_twitter: "ट्विट्स आणि थ्रेड्स रचा",
        manage_sms: "SMS रचा आणि व्यवस्थापित करा",
        open: "उघडा",
        engagement_analysis: "एंगेजमेंट विश्लेषण",
        social_stats: "सोशल आकडेवारी",
        total_messages: "एकूण संदेश",
        contacts: "संपर्क",
        engagement: "एंगेजमेंट",
        growth: "वाढ",
        preferences: "प्राधान्ये",
        enable_notif: "सूचना सक्षम करा",
        email_updates: "ईमेल अपडेट",
        profile: "प्रोफाइल",
        edit_profile: "प्रोफाइल संपादित करा",
        chat_history: "चॅट इतिहास",
        history_1: "व्यावसायिक ईमेल कसे लिहायचे",
        history_2: "LinkedIn प्रोफाइल ऑप्टिमाइজेशन",
        history_3: "Instagram कॅप्शन विचार",
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

// ===== Language Management =====
function initLanguage() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
        });
    });
    updateLanguage();
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    updateLanguage();
}

function updateLanguage() {
    const t = translations[currentLanguage];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (t[key]) el.placeholder = t[key];
    });
}

// ===== Initialize Dashboard =====
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    setupEventListeners();
    loadUserProfile();
    initLanguage();
});

function initDashboard() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'signup.html';
        return;
    }

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Initialize chat
    initChat();
}

// ===== Navigation & Sections =====
function setupEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            
            // Allow navigation to external HTML files (like analytics.html)
            if (href && href.endsWith('.html')) {
                return; // Let the default navigation happen
            }
            
            // For internal section switching
            e.preventDefault();
            const section = item.dataset.section;
            switchSection(section);
            
            // Update active state
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Send message
    const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('messageInput');
    
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-expand textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 150) + 'px';
    });

    // Sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);

    // Theme toggle
    document.getElementById('dashboardThemeToggle').addEventListener('click', toggleTheme);

    // Settings & Profile
    document.getElementById('settingsBtn').addEventListener('click', () => openModal('settingsModal'));
    document.getElementById('profileBtn').addEventListener('click', () => openModal('profileModal'));
    document.getElementById('notificationBtn').addEventListener('click', () => {
        showNotification('You have new messages!', 'info');
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);
}

function switchSection(section) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(s => {
        s.classList.remove('active');
    });

    // Show selected section
    let sectionId;
    switch(section) {
        case 'chat':
            sectionId = 'chatSection';
            break;
        case 'social':
            sectionId = 'socialSection';
            break;
        case 'analytics':
            sectionId = 'analyticsSection';
            break;
        default:
            sectionId = 'chatSection';
    }

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.animation = 'fadeIn 0.5s ease forwards';
    }
}

// ===== Chat Functions =====
function initChat() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = `
        <div class="message ai-message">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-bubble">
                <p data-i18n="ai_greeting">Hello! 👋 I'm your AI assistant for managing all your social media.</p>
                <p style="margin-top: 12px;" data-i18n="what_help">What can I help you with today?</p>
                <div class="message-time" data-i18n="just_now">Just now</div>
            </div>
        </div>
    `;
    updateLanguage();
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message) return;

    const messagesContainer = document.getElementById('messagesContainer');

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.innerHTML = `
        <div class="message-bubble">
            <p>${escapeHtml(message)}</p>
            <div class="message-time">Just now</div>
        </div>
        <div class="message-avatar">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="You">
        </div>
    `;
    messagesContainer.appendChild(userMessageDiv);
    userMessageDiv.style.animation = 'slideIn 0.3s ease forwards';

    // Clear input
    input.value = '';
    input.style.height = 'auto';

    // Simulate AI response
    setTimeout(() => {
        addAIMessage(generateAIResponse(message));
    }, 800);

    scrollToBottom(messagesContainer);
}

function addAIMessage(message) {
    const messagesContainer = document.getElementById('messagesContainer');
    const aiMessageDiv = document.createElement('div');
    aiMessageDiv.className = 'message ai-message';
    aiMessageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-bubble">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(aiMessageDiv);

    setTimeout(() => {
        aiMessageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-bubble">
                <p>${message}</p>
                <div class="message-time">Just now</div>
            </div>
        `;
        aiMessageDiv.style.animation = 'slideIn 0.3s ease forwards';
    }, 1500);

    scrollToBottom(messagesContainer);
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    const responses = {
        'email': 'I can help you draft professional emails. What kind of email would you like to write?',
        'linkedin': 'Great! I can help you with LinkedIn posts and messages. What\'s on your mind?',
        'whatsapp': 'I\'ll help you craft WhatsApp messages. What do you want to communicate?',
        'instagram': 'Let\'s create amazing Instagram content! What\'s your idea?',
        'twitter': 'I can help you compose engaging tweets and threads!',
        'sms': 'I\'ll help you with concise and effective SMS messages.',
        'default': 'I\'m here to help you with all your social media communications. Be more specific and I\'ll assist you better!'
    };

    for (const key in responses) {
        if (lowerMessage.includes(key)) return responses[key];
    }
    return responses.default;
}

function scrollToBottom(element) {
    setTimeout(() => {
        element.scrollTop = element.scrollHeight;
    }, 100);
}

// ===== Theme Functions =====
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#dashboardThemeToggle i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===== Sidebar Functions =====
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
}

// ===== Modal Functions =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.style.animation = 'fadeIn 0.3s ease forwards';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// ===== User Profile =====
function loadUserProfile() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userName) {
        document.getElementById('welcomeText').textContent = `Welcome, ${userName}! 👋`;
        document.getElementById('profileName').textContent = userName;
    }
    
    if (userEmail) {
        document.getElementById('profileEmail').textContent = userEmail;
        
        // Generate consistent avatar
        const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`;
        document.getElementById('profileImg').src = avatarUrl;
        document.querySelector('.profile-btn img').src = avatarUrl;
    }
    
    updateLanguage();
}

// ===== Logout =====
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userEmail');
        window.location.href = 'signup.html';
    }
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Utility Functions =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
