// Eylul - NEXUS ISG AI Chatbot
// Powered by Google Gemini AI

// Get chatbot settings from CMS
function getChatbotSettings() {
    try {
        const saved = localStorage.getItem('nexus-chatbot-settings');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load chatbot settings:', e);
    }
    
    return {
        enabled: true,
        name: 'Eylul',
        greeting: 'Merhaba! Ben {name}, size nasil yardimci olabilirim?',
        returningMessage: 'Tekrar hos geldiniz!',
        apiKey: 'AIzaSyBfRrMUE8yVSXoy6RKwDgEC5to8csj90n4',
        companyInfo: 'NEXUS ISG - Is Sagligi ve Guvenligi alaninda lider teknoloji sirketi.',
        phone: '+90 532 123 45 67',
        email: 'info@nexusisg.com',
        quickQuestions: 'Yazilimlariniz neler?, Fiyatlar nasil?, Demo goster!'
    };
}

const chatbotSettings = getChatbotSettings();

// Get avatar HTML based on settings
function getAvatarHTML() {
    const avatarType = chatbotSettings.avatarType || 'emoji';
    
    if (avatarType === 'emoji') {
        const emoji = chatbotSettings.emoji || '🤖';
        return `<div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">${emoji}</div>`;
    } else if (avatarType === 'logo') {
        const logo = chatbotSettings.logo || '';
        if (logo) {
            return `<div class="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1"><img src="${logo}" class="w-10 h-10 object-contain" alt="Logo"></div>`;
        } else {
            return `<div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">🤖</div>`;
        }
    } else if (avatarType === 'custom') {
        const customAvatar = chatbotSettings.customAvatar || '';
        if (customAvatar) {
            return `<div class="w-12 h-12 bg-white rounded-full overflow-hidden"><img src="${customAvatar}" class="w-full h-full object-cover" alt="Avatar"></div>`;
        } else {
            return `<div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">🤖</div>`;
        }
    }
    
    return `<div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">🤖</div>`;
}

// Get small avatar for messages
function getSmallAvatarHTML() {
    const avatarType = chatbotSettings.avatarType || 'emoji';
    
    if (avatarType === 'emoji') {
        const emoji = chatbotSettings.emoji || '🤖';
        return `<span class="text-lg">${emoji}</span>`;
    } else if (avatarType === 'logo') {
        const logo = chatbotSettings.logo || '';
        if (logo) {
            return `<img src="${logo}" class="w-5 h-5 object-contain" alt="Logo">`;
        } else {
            return `<span class="text-lg">🤖</span>`;
        }
    } else if (avatarType === 'custom') {
        const customAvatar = chatbotSettings.customAvatar || '';
        if (customAvatar) {
            return `<img src="${customAvatar}" class="w-5 h-5 object-cover rounded-full" alt="Avatar">`;
        } else {
            return `<span class="text-lg">🤖</span>`;
        }
    }
    
    return `<span class="text-lg">🤖</span>`;
}

// Only initialize if enabled
if (chatbotSettings.enabled) {
    console.log('🤖 AI Chatbot is enabled, initializing...');
    
    document.addEventListener('DOMContentLoaded', () => {
        const botName = chatbotSettings.name || 'Eylul';
        const quickQuestionsArray = chatbotSettings.quickQuestions 
            ? chatbotSettings.quickQuestions.split(',').map(q => q.trim()).slice(0, 3)
            : ['Yazilimlariniz neler?', 'Fiyatlar nasil?', 'Demo goster!'];
        
        // Create chatbot HTML
        const chatbotHTML = `
            <div id="eylul-chat-button" class="fixed bottom-6 right-6 z-50">
                <button onclick="toggleChatbot()" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 relative group">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">AI</span>
                    <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                        <div class="bg-gray-900 text-white text-sm rounded-lg py-2 px-4 whitespace-nowrap shadow-lg">
                            Merhaba! Ben ${botName}
                        </div>
                    </div>
                </button>
            </div>
            
            <div id="eylul-chat-window" class="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 hidden flex-col overflow-hidden border border-gray-200" style="height: 600px; max-height: 80vh;">
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between rounded-t-2xl">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            ${getAvatarHTML()}
                            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg">${botName}</h3>
                            <p class="text-xs text-blue-100">AI Asistan - Cevrimici</p>
                        </div>
                    </div>
                    <button onclick="toggleChatbot()" class="text-white hover:bg-white/20 rounded-full p-2 transition-all">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div id="eylul-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    <div class="flex justify-start animate-fadeIn">
                        <div class="max-w-[80%] bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                            <div class="flex items-center gap-2 mb-1">
                                ${getSmallAvatarHTML()}
                                <span class="text-xs font-semibold text-blue-600">${botName}</span>
                            </div>
                            <p class="text-sm text-gray-800">${chatbotSettings.greeting.replace('{name}', botName)}</p>
                        </div>
                    </div>
                </div>
                
                <div class="p-4 bg-white border-t">
                    <div class="flex gap-2">
                        <input type="text" id="eylul-input" 
                            class="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Mesajinizi yazin..." autocomplete="off">
                        <button onclick="sendMessage()" id="eylul-send-btn" 
                            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="flex gap-2 mt-2">
                        ${quickQuestionsArray.map((q, i) => {
                            const colors = [
                                'bg-blue-100 text-blue-700 hover:bg-blue-200',
                                'bg-purple-100 text-purple-700 hover:bg-purple-200',
                                'bg-green-100 text-green-700 hover:bg-green-200'
                            ];
                            return `<button onclick="askQuickQuestion('${q}')" class="text-xs ${colors[i] || colors[0]} px-3 py-1 rounded-full transition-all">${q}</button>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        
        // Add Enter key support
        document.getElementById('eylul-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        console.log('✅ AI Chatbot initialized successfully!');
    });
} else {
    console.log('❌ AI Chatbot is disabled in settings');
}

// Toggle chatbot window
function toggleChatbot() {
    const chatWindow = document.getElementById('eylul-chat-window');
    if (chatWindow) {
        if (chatWindow.style.display === 'flex') {
            chatWindow.style.display = 'none';
        } else {
            chatWindow.style.display = 'flex';
        }
    }
}

// Ask quick question
function askQuickQuestion(question) {
    document.getElementById('eylul-input').value = question;
    sendMessage();
}

// Send message
function sendMessage() {
    const input = document.getElementById('eylul-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Get bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

// Add message to chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('eylul-messages');
    if (!messagesContainer) return;
    
    const isUser = sender === 'user';
    const botName = chatbotSettings.name || 'Eylul';
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`;
    
    messageDiv.innerHTML = `
        <div class="max-w-[80%] ${isUser ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white border border-gray-200'} rounded-2xl px-4 py-3 shadow-sm">
            ${!isUser ? `<div class="flex items-center gap-2 mb-1">${getSmallAvatarHTML()}<span class="text-xs font-semibold text-blue-600">${botName}</span></div>` : ''}
            <p class="text-sm ${isUser ? 'text-white' : 'text-gray-800'}">${text}</p>
            <span class="text-xs ${isUser ? 'text-blue-100' : 'text-gray-400'} mt-1 block">${new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Get bot response (simple fallback)
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam')) {
        return 'Merhaba! Ben ' + chatbotSettings.name + ', size nasil yardimci olabilirim? ISG hizmetlerimiz, yazilimlarimiz veya fiyatlandirma hakkinda soru sorabilirsiniz.';
    }
    
    if (lowerMessage.includes('yazilim') || lowerMessage.includes('program')) {
        return 'ISG yazilimlarimiz: Risk Degerlendirme, Kaza Takip Sistemi, Egitim Yonetimi, EBYS, AI Destekli Raporlama. Detayli bilgi icin: ' + chatbotSettings.phone;
    }
    
    if (lowerMessage.includes('fiyat') || lowerMessage.includes('ucret')) {
        return 'Fiyatlarimiz ihtiyaciniza gore ozellestirilir. Ozel teklif icin: ' + chatbotSettings.phone + ' | ' + chatbotSettings.email;
    }
    
    if (lowerMessage.includes('demo')) {
        return 'Ucretsiz demo icin hemen iletisime gecin! Tel: ' + chatbotSettings.phone + ' | Email: ' + chatbotSettings.email;
    }
    
    if (lowerMessage.includes('isg')) {
        return 'Is Sagligi ve Guvenligi (ISG), calisanlarin saglik ve guvenligini korumak icin yapilan calismalarin tumudir. NEXUS ISG olarak yazilim, danismanlik ve egitim hizmetleri sunuyoruz.';
    }
    
    if (lowerMessage.includes('tesekkur') || lowerMessage.includes('sagol')) {
        return 'Rica ederim! Baska sorunuz varsa her zaman buradayim.';
    }
    
    return 'Anliyorum! Bu konuda daha detayli bilgi icin: ' + chatbotSettings.phone + ' | ' + chatbotSettings.email + '. Baska nasil yardimci olabilirim?';
}

