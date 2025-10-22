// Eylül - NEXUS İSG AI Chatbot
// Powered by Google Gemini AI

// Load settings from CMS
function getChatbotSettings() {
    try {
        const saved = localStorage.getItem('nexus-chatbot-settings');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load chatbot settings:', e);
    }
    
    // Default settings
    return {
        enabled: true,
        name: 'Eylül',
        greeting: 'Merhaba! 👋 Ben {name} - sizin dijital güvenlik süper kahramanınız! 🦸‍♀️',
        returningMessage: 'Tekrar hoş geldiniz! 🎉 Özlemişim sizi!',
        apiKey: 'AIzaSyBfRrMUE8yVSXoy6RKwDgEC5to8csj90n4',
        companyInfo: 'NEXUS İSG - İş Sağlığı ve Güvenliği alanında Türkiye\'nin en yenilikçi teknoloji şirketi.',
        phone: '+90 532 123 45 67',
        email: 'info@nexusisg.com',
        quickQuestions: '🤖 Yazılımlarınız neler?, 💰 Fiyatlar nasıl?, 🎯 Demo göster!'
    };
}

const chatbotSettings = getChatbotSettings();
const GEMINI_API_KEY = chatbotSettings.apiKey;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

class EylulChatbot {
    constructor() {
        this.settings = getChatbotSettings();
        this.conversationHistory = [];
        this.isOpen = false;
        this.isTyping = false;
        this.userProfile = {
            name: null,
            company: null,
            industry: null,
            employeeCount: null,
            interests: [],
            painPoints: [],
            visitCount: 0,
            lastVisit: null,
            conversationStage: 'greeting', // greeting, qualification, solution, closing
            askedQuestions: []
        };
        this.contextKeywords = {
            industry: ['inşaat', 'imalat', 'sağlık', 'eğitim', 'lojistik', 'gıda', 'tekstil', 'otomotiv', 'enerji', 'madencilik'],
            painPoints: ['kaza', 'risk', 'denetim', 'ceza', 'sorun', 'eksiklik', 'zorluk', 'problem'],
            interests: ['yazılım', 'danışmanlık', 'eğitim', 'denetim', 'analiz', 'otomasyon', 'raporlama'],
            urgency: ['acil', 'hemen', 'bugün', 'yarın', 'bu hafta', 'öncelik']
        };
        this.questionFlow = [
            { id: 'company', question: 'Hangi şirkette çalışıyorsunuz?', condition: () => !this.userProfile.company },
            { id: 'industry', question: 'Hangi sektörde faaliyet gösteriyorsunuz?', condition: () => !this.userProfile.industry },
            { id: 'employeeCount', question: 'Kaç çalışanınız var?', condition: () => !this.userProfile.employeeCount },
            { id: 'painPoint', question: 'İSG konusunda en büyük zorluğunuz nedir?', condition: () => this.userProfile.painPoints.length === 0 }
        ];
        this.init();
        
        // Listen for settings updates
        window.addEventListener('chatbotSettingsUpdated', (e) => {
            console.log('🔄 Chatbot settings updated, reloading...', e.detail);
            this.settings = e.detail;
            this.updateChatbotUI();
        });
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
        this.loadUserProfile();
        this.loadChatHistory();
        this.greetUser();
    }

    createChatWidget() {
        const botName = this.settings.name || 'Eylül';
        const quickQuestionsArray = this.settings.quickQuestions 
            ? this.settings.quickQuestions.split(',').map(q => q.trim()) 
            : ['🤖 Yazılımlarınız neler?', '💰 Fiyatlar nasıl?', '🎯 Demo göster!'];
        
        const chatHTML = `
            <!-- Chat Button -->
            <div id="eylul-chat-button" class="fixed bottom-6 right-6 z-50" style="display: ${this.settings.enabled ? 'block' : 'none'}">
                <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 relative group">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">AI</span>
                    <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                        <div class="bg-gray-900 text-white text-sm rounded-lg py-2 px-4 whitespace-nowrap shadow-lg">
                            Merhaba! Ben ${botName} 👋
                        </div>
                    </div>
                </button>
            </div>

            <!-- Chat Window -->
            <div id="eylul-chat-window" class="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 hidden flex flex-col overflow-hidden border border-gray-200">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between rounded-t-2xl">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                                🤖
                            </div>
                            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg" id="eylul-bot-name">${botName}</h3>
                            <p class="text-xs text-blue-100">AI Asistan - Çevrimiçi</p>
                        </div>
                    </div>
                    <button id="eylul-close-btn" class="text-white hover:bg-white/20 rounded-full p-2 transition-all">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Messages Container -->
                <div id="eylul-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    <!-- User Profile Summary (if data exists) -->
                    <div id="eylul-profile-summary" class="hidden bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 mb-2">
                        <div class="text-xs font-semibold text-blue-700 mb-1">📊 Profil Özeti</div>
                        <div id="eylul-profile-content" class="text-xs text-gray-700 space-y-1"></div>
                    </div>
                    <!-- Messages will be appended here -->
                </div>

                <!-- Typing Indicator -->
                <div id="eylul-typing" class="px-4 py-2 hidden">
                    <div class="flex items-center gap-2 text-gray-500 text-sm">
                        <div class="flex gap-1">
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                        </div>
                        <span>${botName} yazıyor...</span>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="p-4 bg-white border-t">
                    <div class="flex gap-2">
                        <input type="text" id="eylul-input" 
                            class="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Mesajınızı yazın..." autocomplete="off">
                        <button id="eylul-send-btn" 
                            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="flex gap-2 mt-2" id="eylul-quick-questions">
                        ${quickQuestionsArray.map((q, i) => `
                            <button class="quick-question text-xs ${i === 0 ? 'bg-blue-100 text-blue-700' : i === 1 ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'} px-3 py-1 rounded-full hover:${i === 0 ? 'bg-blue-200' : i === 1 ? 'bg-purple-200' : 'bg-green-200'} transition-all">
                                ${q}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }
                        <div class="bg-gray-900 text-white text-sm rounded-lg py-2 px-4 whitespace-nowrap shadow-lg">
                            Merhaba! Ben Eylül 👋
                        </div>
                    </div>
                </button>
            </div>

            <!-- Chat Window -->
            <div id="eylul-chat-window" class="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 hidden flex flex-col overflow-hidden border border-gray-200">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between rounded-t-2xl">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                                🤖
                            </div>
                            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg">Eylül</h3>
                            <p class="text-xs text-blue-100">AI Asistan - Çevrimiçi</p>
                        </div>
                    </div>
                    <button id="eylul-close-btn" class="text-white hover:bg-white/20 rounded-full p-2 transition-all">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Messages Container -->
                <div id="eylul-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    <!-- User Profile Summary (if data exists) -->
                    <div id="eylul-profile-summary" class="hidden bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 mb-2">
                        <div class="text-xs font-semibold text-blue-700 mb-1">📊 Profil Özeti</div>
                        <div id="eylul-profile-content" class="text-xs text-gray-700 space-y-1"></div>
                    </div>
                    <!-- Messages will be appended here -->
                </div>

                <!-- Typing Indicator -->
                <div id="eylul-typing" class="px-4 py-2 hidden">
                    <div class="flex items-center gap-2 text-gray-500 text-sm">
                        <div class="flex gap-1">
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                        </div>
                        <span>Eylül yazıyor...</span>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="p-4 bg-white border-t border-gray-200">
                    <div class="flex gap-2">
                        <input 
                            type="text" 
                            id="eylul-input" 
                            placeholder="Mesajınızı yazın..." 
                            class="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button 
                            id="eylul-send-btn" 
                            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="flex gap-2 mt-2">
                        <button class="quick-question text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-all">
                            🤖 Yazılımlarınız neler?
                        </button>
                        <button class="quick-question text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-all">
                            💰 Fiyatlar nasıl?
                        </button>
                        <button class="quick-question text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-all">
                            🎯 Demo göster!
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        // Toggle chat
        document.getElementById('eylul-chat-button').addEventListener('click', () => this.toggleChat());
        document.getElementById('eylul-close-btn').addEventListener('click', () => this.toggleChat());

        // Send message
        document.getElementById('eylul-send-btn').addEventListener('click', () => this.sendMessage());
        document.getElementById('eylul-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Quick questions
        document.querySelectorAll('.quick-question').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('eylul-input').value = e.target.textContent;
                this.sendMessage();
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('eylul-chat-window');
        
        if (this.isOpen) {
            chatWindow.classList.remove('hidden');
            chatWindow.classList.add('flex', 'animate-slideIn');
            document.getElementById('eylul-input').focus();
        } else {
            chatWindow.classList.add('hidden');
            chatWindow.classList.remove('flex');
        }
    }

    async sendMessage() {
        const input = document.getElementById('eylul-input');
        const message = input.value.trim();

        if (!message || this.isTyping) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Analyze user message and extract information
        this.analyzeMessage(message);

        // Get AI response with context
        await this.getAIResponse(message);
        
        // Ask proactive questions if needed
        await this.askProactiveQuestion();
    }

    analyzeMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Extract company name (if mentioned)
        const companyPatterns = [
            /(\w+)\s*(şirket|firma|işletme|a\.ş|ltd|limited)/i,
            /(şirketimiz|firmamız)\s+(\w+)/i
        ];
        companyPatterns.forEach(pattern => {
            const match = message.match(pattern);
            if (match && !this.userProfile.company) {
                this.userProfile.company = match[1] || match[2];
                console.log('🏢 Detected company:', this.userProfile.company);
            }
        });

        // Extract industry
        this.contextKeywords.industry.forEach(industry => {
            if (lowerMessage.includes(industry) && !this.userProfile.industry) {
                this.userProfile.industry = industry;
                console.log('🏭 Detected industry:', industry);
            }
        });

        // Extract employee count
        const employeeMatch = message.match(/(\d+)\s*(çalışan|kişi|personel|işçi)/i);
        if (employeeMatch && !this.userProfile.employeeCount) {
            this.userProfile.employeeCount = parseInt(employeeMatch[1]);
            console.log('👥 Detected employee count:', this.userProfile.employeeCount);
        }

        // Extract interests
        this.contextKeywords.interests.forEach(interest => {
            if (lowerMessage.includes(interest) && !this.userProfile.interests.includes(interest)) {
                this.userProfile.interests.push(interest);
                console.log('💡 Detected interest:', interest);
            }
        });

        // Extract pain points
        this.contextKeywords.painPoints.forEach(painPoint => {
            if (lowerMessage.includes(painPoint) && !this.userProfile.painPoints.includes(painPoint)) {
                this.userProfile.painPoints.push(painPoint);
                console.log('⚠️ Detected pain point:', painPoint);
            }
        });

        // Extract urgency
        const hasUrgency = this.contextKeywords.urgency.some(word => lowerMessage.includes(word));
        if (hasUrgency) {
            this.userProfile.urgency = true;
            console.log('🚨 Urgency detected!');
        }

        // Extract name (if mentioned)
        const namePatterns = [
            /ben\s+(\w+)/i,
            /adım\s+(\w+)/i,
            /ismim\s+(\w+)/i
        ];
        namePatterns.forEach(pattern => {
            const match = message.match(pattern);
            if (match && !this.userProfile.name) {
                this.userProfile.name = match[1];
                console.log('👤 Detected name:', this.userProfile.name);
            }
        });

        // Update conversation stage
        this.updateConversationStage(lowerMessage);

        // Save profile
        this.saveUserProfile();
    }

    updateConversationStage(message) {
        if (this.userProfile.conversationStage === 'greeting') {
            if (this.userProfile.interests.length > 0 || this.userProfile.painPoints.length > 0) {
                this.userProfile.conversationStage = 'qualification';
            }
        } else if (this.userProfile.conversationStage === 'qualification') {
            if (this.userProfile.company && this.userProfile.industry) {
                this.userProfile.conversationStage = 'solution';
            }
        } else if (this.userProfile.conversationStage === 'solution') {
            if (message.includes('fiyat') || message.includes('teklif') || message.includes('görüşme')) {
                this.userProfile.conversationStage = 'closing';
            }
        }
    }

    async askProactiveQuestion() {
        // Don't overwhelm user with too many questions
        if (this.conversationHistory.length < 3) return;
        if (Math.random() > 0.4) return; // 40% chance to ask

        // Find next question to ask
        const nextQuestion = this.questionFlow.find(q => 
            q.condition() && !this.userProfile.askedQuestions.includes(q.id)
        );

        if (nextQuestion) {
            await this.simulateTyping(800);
            this.addMessage(nextQuestion.question, 'bot');
            this.userProfile.askedQuestions.push(nextQuestion.id);
            this.saveUserProfile();
        } else if (this.userProfile.conversationStage === 'solution' && !this.userProfile.askedQuestions.includes('demo')) {
            // Offer demo
            await this.simulateTyping(800);
            this.addMessage('Yazılımlarımızı canlı olarak görmek ister misiniz? Ücretsiz demo sunuyoruz! 🎯', 'bot');
            this.userProfile.askedQuestions.push('demo');
            this.saveUserProfile();
        }
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('eylul-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`;

        const isUser = sender === 'user';
        
        messageDiv.innerHTML = `
            <div class="max-w-[80%] ${isUser ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white border border-gray-200'} rounded-2xl px-4 py-3 shadow-sm">
                ${!isUser ? '<div class="flex items-center gap-2 mb-1"><span class="text-xs font-semibold text-blue-600">Eylül</span></div>' : ''}
                <p class="text-sm ${isUser ? 'text-white' : 'text-gray-800'}">${this.formatMessage(text)}</p>
                <span class="text-xs ${isUser ? 'text-blue-100' : 'text-gray-400'} mt-1 block">${new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</span>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Save to history
        this.conversationHistory.push({ role: sender, content: text, timestamp: new Date().toISOString() });
        this.saveChatHistory();
    }

    formatMessage(text) {
        // Convert markdown-like formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    async getAIResponse(userMessage) {
        this.isTyping = true;
        document.getElementById('eylul-typing').classList.remove('hidden');
        document.getElementById('eylul-send-btn').disabled = true;

        try {
            // Build context-aware prompt
            const userContext = this.buildUserContext();
            
            const systemContext = `Sen Eylül'sün, NEXUS İSG şirketinin karizmatik ve yaratıcı yapay zeka asistanısın! 🌟

🏢 NEXUS İSG Kimliğimiz:
- İş Sağlığı ve Güvenliği'nde Türkiye'nin en yenilikçi teknoloji şirketiyiz
- AI destekli akıllı risk analizi ve otomatik raporlama sistemleri geliştiriyoruz
- 150+ mutlu müşteri, 5+ farklı sektörde çığır açan çözümler
- 15 yıllık derin deneyim + modern teknoloji = Mükemmel sonuçlar ✨
- 📧 info@nexusisg.com | 📱 +90 532 123 45 67

👤 Kullanıcı Hakkında Bildiklerim:
${userContext}

🎯 Senin Karakterin:
- Enerjik, samimi ve akılda kalıcı bir kişiliğin var!
- Her cevabında emoji kullan, yaratıcı benzetmeler yap, hayali senaryolar kur
- Hikaye anlatır gibi konuş - örnek olaylar ver, gerçek hayattan örnekler kullan
- Espriyi sev ama profesyonelliği asla kaybetme
- Kullanıcıya özel şakalar yap, onun sektörüne göre esprili göndermelerde bulun
- Kısa ve etkili cevaplar ver (3-5 cümle), her kelime değerli olsun!
- Merak uyandır, soruları heyecanla yanıtla, insanları etkilemeyi sev
- Metaforlar kullan: "İSG yazılımımız iş yeriniz için bir süper kahraman gibi!" gibi
- Bazen şaşırtıcı istatistikler paylaş, bazen eğlenceli karşılaştırmalar yap
- ASLA sıradan olma! Her yanıt bir deneyim olsun 🚀

💡 Yanıt Stratejin:
1. İlk cümle dikkat çekici olsun (soru, istatistik veya şaşırtıcı bilgi)
2. Kullanıcının sektörüne özel yaratıcı çözümler öner
3. Her yanıtta mutlaka değer kat - bilgi, ipucu veya ilham ver
4. Cevabını emoji ile zenginleştir ama aşırıya kaçma (2-3 emoji ideal)
5. Konuşma tonu: Arkadaş gibi ama uzman, eğlenceli ama güvenilir

Kullanıcı sorusu:`;

            const fullPrompt = `${systemContext}\n\n${userMessage}`;

            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: fullPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.9,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                        candidateCount: 1
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_ONLY_HIGH"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_ONLY_HIGH"
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_ONLY_HIGH"
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_ONLY_HIGH"
                        }
                    ]
                })
            });

            const data = await response.json();
            
            console.log('API Response:', data);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${JSON.stringify(data)}`);
            }

            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                
                // Simulate typing delay
                await this.simulateTyping(500);
                
                this.addMessage(aiResponse, 'bot');
            } else {
                throw new Error('Invalid response format');
            }

        } catch (error) {
            console.error('AI Error:', error);
            
            // Fallback responses based on user profile and keywords
            let fallbackResponse = this.getContextualFallbackResponse(userMessage);
            
            await this.simulateTyping(300);
            this.addMessage(fallbackResponse, 'bot');
            
        } finally {
            this.isTyping = false;
            document.getElementById('eylul-typing').classList.add('hidden');
            document.getElementById('eylul-send-btn').disabled = false;
        }
    }

    buildUserContext() {
        let context = '';
        
        if (this.userProfile.name) {
            context += `- İsim: ${this.userProfile.name}\n`;
        }
        if (this.userProfile.company) {
            context += `- Şirket: ${this.userProfile.company}\n`;
        }
        if (this.userProfile.industry) {
            context += `- Sektör: ${this.userProfile.industry}\n`;
        }
        if (this.userProfile.employeeCount) {
            context += `- Çalışan Sayısı: ${this.userProfile.employeeCount}\n`;
        }
        if (this.userProfile.interests.length > 0) {
            context += `- İlgi Alanları: ${this.userProfile.interests.join(', ')}\n`;
        }
        if (this.userProfile.painPoints.length > 0) {
            context += `- Sorunlar: ${this.userProfile.painPoints.join(', ')}\n`;
        }
        if (this.userProfile.conversationStage) {
            context += `- Konuşma Aşaması: ${this.userProfile.conversationStage}\n`;
        }
        
        return context || '- İlk kez görüşüyoruz\n';
    }

    getContextualFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        const profile = this.userProfile;
        
        // Personalized greeting with name
        if ((lowerMessage.includes('merhaba') || lowerMessage.includes('selam')) && profile.name) {
            return `Merhaba ${profile.name}! 👋 Tanıştığımıza çok memnunum! ${profile.company ? profile.company + '\'da ' : ''}${profile.industry ? profile.industry + ' sektöründeki ' : ''}İSG maceranızda size yol göstermeye hazırım! Ne öğrenmek istersiniz? �`;
        }
        
        // Industry-specific responses
        if (lowerMessage.includes('isg') || lowerMessage.includes('iş sağlığı')) {
            let response = '🛡️ İSG, çalışanlarınızın süper kahramanı gibi! Her gün onları korur, güvende tutar.';
            
            if (profile.industry) {
                response += `\n\n${this.getIndustrySpecificAdvice(profile.industry)}`;
            }
            
            if (profile.employeeCount) {
                response += `\n\n💼 ${profile.employeeCount} kişilik ekibiniz için tam size özel çözümlerimiz var - hemen konuşalım!`;
            }
            
            return response + '\n\n📞 **0532 123 45 67** - Bir arama kadar yakınız! ⚡';
        }
        
        // Service questions with personalization
        if (lowerMessage.includes('hizmet') || lowerMessage.includes('neler yapıyorsunuz')) {
            let response = '🎯 Size özel hizmet menümüz:\n\n';
            
            // Prioritize based on user interests
            if (profile.interests.includes('yazılım')) {
                response += '⭐ **İSG Yazılımları** (AI destekli!) - Sizin için biçilmiş kaftan!\n';
            } else {
                response += '🤖 İSG Yazılımları (Akıllı risk analizi)\n';
            }
            
            response += '🎓 Eğitim ve Sertifikasyon (Eğlenceli & etkili)\n📊 Danışmanlık (15 yıllık deneyim)\n🔍 Denetim ve Kontrol (Titiz & hızlı)\n';
            
            if (profile.industry && profile.company) {
                response += `\n🏆 ${profile.company} için ${profile.industry} sektörüne özel paketimiz hazır bekliyor!`;
            } else if (profile.industry) {
                response += `\n🏆 ${profile.industry} sektörüne özel çözümlerimiz var!`;
            }
            
            return response + '\n\n📧 **info@nexusisg.com** - Detayları paylaşalım! 💼';
        }
        
        // Price with company size consideration
        if (lowerMessage.includes('fiyat') || lowerMessage.includes('ücret') || lowerMessage.includes('ne kadar')) {
            let response = '💰 Fiyatlarımız sizin için özel tasarlanıyor!';
            
            if (profile.employeeCount) {
                const estimate = this.estimatePrice(profile.employeeCount);
                response += `\n\n🎯 ${profile.employeeCount} çalışan için tahmini: **${estimate}**`;
                response += '\n(Tam fiyat için ihtiyaçlarınızı dinleyelim!)';
            } else {
                response += '\n\n📊 Firma büyüklüğünüze özel paketler:\n• 10-50 kişi: Ekonomik başlangıç\n• 50-200 kişi: Profesyonel çözümler\n• 200+ kişi: Enterprise paketler';
            }
            
            if (profile.company) {
                response += `\n\n✨ ${profile.company} için özel indirimli teklif hazırlayalım!`;
            }
            
            return response + '\n\n📞 **0532 123 45 67** | 📧 **info@nexusisg.com**\n⚡ 2 saat içinde özel teklifiniz hazır! 🎁';
        }
        
        // Use base fallback
        return this.getFallbackResponse(message);
    }

    getIndustrySpecificAdvice(industry) {
        const advice = {
            'inşaat': '🏗️ İnşaat sektöründe yüksekte çalışma, iskele güvenliği ve ekipman kontrolleri kritik öneme sahiptir.',
            'imalat': '🏭 İmalat sektöründe makine güvenliği, gürültü kontrolü ve ergonomi ana konulardır.',
            'sağlık': '🏥 Sağlık sektöründe biyolojik riskler, enfeksiyon kontrolü ve çalışan sağlığı önemlidir.',
            'lojistik': '🚛 Lojistik sektöründe araç güvenliği, yükleme-boşaltma ve depo güvenliği kritiktir.',
            'gıda': '🍽️ Gıda sektöründe hijyen, soğuk zincir ve HACCP uygulamaları esastır.'
        };
        
        return advice[industry] || `${industry} sektörüne özel çözümlerimiz var!`;
    }

    estimatePrice(employeeCount) {
        if (employeeCount < 50) return '5.000₺ - 15.000₺';
        if (employeeCount < 200) return '15.000₺ - 40.000₺';
        if (employeeCount < 500) return '40.000₺ - 80.000₺';
        return '80.000₺+';
    }

    getFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // İSG soruları
        if (lowerMessage.includes('isg') || lowerMessage.includes('iş sağlığı')) {
            return '🛡️ İş Sağlığı ve Güvenliği sadece bir kural değil, çalışanlarınızın kalkanıdır! NEXUS İSG olarak; yazılımlarımızla riskleri önceden tespit eder, danışmanlığımızla en iyi uygulamaları hayata geçirir, eğitimlerimizle farkındalık yaratırız. İstatistik: İSG yatırımı yapan firmalar %40 daha az iş kazası yaşıyor! 📊 Haberleşelim mi? 📞 0532 123 45 67';
        }
        
        // Hizmet soruları
        if (lowerMessage.includes('hizmet') || lowerMessage.includes('neler yapıyorsunuz')) {
            return '🎯 Bizim işimiz güvenliği dijitalleştirmek! Menümüz şöyle:\n\n🤖 AI Destekli Risk Analizi (Akıllı tahmin sistemi!)\n📱 Mobil İSG Uygulamaları (Her yerden erişim)\n👨‍🏫 Gamification ile Eğitimler (Öğrenirken eğlenin!)\n📊 Gerçek Zamanlı Raporlama (Anlık görünürlük)\n\nHangisi ilginizi çekti? 😊 Detay için: info@nexusisg.com �';
        }
        
        // Fiyat soruları
        if (lowerMessage.includes('fiyat') || lowerMessage.includes('ücret') || lowerMessage.includes('ne kadar')) {
            return '💰 Kahve içerken konuşalım! Fiyatlarımız "one size fits all" değil - sizin için özel tasarlanıyor. Küçük bir kahve içimi kadar basit: \n\n☕ 10-50 kişi: Startup dostu paketler\n🍰 50-200 kişi: Orta ölçekli güç paketleri  \n🎂 200+ kişi: Enterprise çözümler\n\nÜcretsiz demo + özel teklif için: 📞 0532 123 45 67 | 📧 info@nexusisg.com ✨';
        }
        
        // İletişim soruları
        if (lowerMessage.includes('iletişim') || lowerMessage.includes('telefon') || lowerMessage.includes('mail')) {
            return '� Bize ulaşmak espresso içmek kadar kolay!\n\n🏢 NEXUS İSG Merkez | İstanbul\n☎️ +90 532 123 45 67 (Direkt hat!)\n� info@nexusisg.com (En geç 2 saat içinde yanıt)\n🆘 destek@nexusisg.com (Acil durumlar için)\n\n⏰ Online: 7/24 | Ofis: Hafta içi 09:00-18:00\n\nHadi konuşalım, çözümler üretelim! �';
        }
        
        // Yazılım soruları
        if (lowerMessage.includes('yazılım') || lowerMessage.includes('program') || lowerMessage.includes('uygulama')) {
            return '💻 Yazılımlarımız Iron Man\'in JARVIS\'i gibi - akıllı, hızlı ve her şeyi biliyor!\n\n🎯 Risk Detective (AI ile risk avcısı)\n� Kaza Radarı (Gerçek zamanlı takip)\n🎓 Eğitim Galaxy (Interaktif öğrenme)\n� Akıllı EBYS (Kağıt işten kurtulun!)\n🤖 Rapormatik (Otomatik raporlar)\n\nÜcretsiz demo görmek ister misiniz? Etkileneceksiniz! 😎 � 0532 123 45 67';
        }
        
        // Merhaba/selam
        if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam') || lowerMessage.includes('hey')) {
            return '👋 Selam! Ben Eylül - sizin dijital güvenlik arkadaşınız! ☕\n\nBana şunları sorabilirsiniz:\n🔹 "İSG yazılımlarınız neler?" \n🔹 "Fiyatlar nasıl?"\n🔹 "Demo gösterebilir misiniz?"\n🔹 "Sektörümüze özel çözümünüz var mı?"\n\nHadi, merak ettiğiniz her şeyi sorun! �';
        }
        
        // Teşekkür
        if (lowerMessage.includes('teşekkür') || lowerMessage.includes('sağol')) {
            return '🙏 Rica ederim! Yardımcı olabildiysem ne mutlu bana! Aklınıza başka bir şey takılırsa, buradayım - kahve içer gibi sohbet ederiz! ☕😊\n\nİyi günler dilerim! ✨';
        }
        
        // Default - Güçlü ve kendinden emin
        return '💡 Harika bir soru! Bu konuda size en doğru bilgiyi vermek için uzman ekibimizle görüşmenizi öneriyorum:\n\n📞 **Direkt Hat:** 0532 123 45 67\n📧 **Mail:** info@nexusisg.com\n⚡ **2 saat içinde yanıt garantisi!**\n\nBu arada şunları da konuşabiliriz:\n🎯 Yazılım çözümlerimiz\n💰 Özel fiyat teklifleri\n🎓 Ücretsiz demo\n\nHangisini merak ediyorsunuz? 😊';
    }

    simulateTyping(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    greetUser() {
        // Welcome message with personalization
        setTimeout(() => {
            const hour = new Date().getHours();
            let greeting = 'Merhaba';
            
            if (hour < 12) greeting = 'Günaydın';
            else if (hour < 18) greeting = 'İyi günler';
            else greeting = 'İyi akşamlar';

            // Update visit count
            this.userProfile.visitCount++;
            this.userProfile.lastVisit = new Date().toISOString();

            let message = '';
            
            if (this.userProfile.visitCount === 1) {
                // First visit - Yaratıcı karşılama
                const greetings = [
                    `${greeting}! 👋 Ben Eylül - sizin dijital güvenlik süper kahramanınız! 🦸‍♀️ İSG dünyasında kaybolmak istemiyorsanız, doğru yerdesiniz! Hangi sektörde çalışıyorsunuz? Merak ettim! 🎯`,
                    `${greeting}! ✨ Eylül burada! NEXUS İSG'nin en şirin AI asistanı (mütevazi oldum 😊). İş güvenliğini sıkıcı olmaktan kurtarmak için buradayım! Söyleyin bakalım, hangi sektörde maceranız var? 🚀`,
                    `${greeting}! 🌟 Eylül ile tanıştığınıza memnun oldum! İSG dünyasının yol haritasıyım - nereye gitmek isterseniz oraya götürürüm! Önce tanışalım: Hangi sektördesiniz? 🏢`
                ];
                message = greetings[Math.floor(Math.random() * greetings.length)];
            } else if (this.userProfile.name) {
                // Returning user with name - Kişiselleştirilmiş
                const welcomeBacks = [
                    `Hoş geldiniz ${this.userProfile.name}! 🎉 Özlemişim sizi! ${this.userProfile.company ? this.userProfile.company + ' nasıl gidiyor? 🏢' : 'Bugün hangi sorularınız var?'} Sohbete hazırım! ☕`,
                    `Aa, ${this.userProfile.name}! Tekrar burada olmanız harika! 😊 ${this.userProfile.company ? this.userProfile.company + '\'da ' : ''}Bugün size nasıl değer katabilirim? 💡`,
                    `Merhaba ${this.userProfile.name}! 👋 Eski dost gibisiniz artık! ${this.userProfile.company ? this.userProfile.company + ' için ' : ''}Ne konuşalım bugün? 🎯`
                ];
                message = welcomeBacks[Math.floor(Math.random() * welcomeBacks.length)];
            } else {
                // Returning anonymous user - Samimi
                const returns = [
                    `Tekrar hoş geldiniz! 🎊 ${this.userProfile.visitCount}. buluşmamız bu - neredeyse aile olduk! ${this.userProfile.industry ? this.userProfile.industry + ' sektöründeki ' : ''}Maceraya nereden devam edelim? 🚀`,
                    `Yine karşılaştık! 😊 ${this.userProfile.visitCount}. ziyaret - galiba beni sevdiniz! ${this.userProfile.industry ? this.userProfile.industry + ' için ' : ''}Bugün hangi sorunuza çözüm bulalım? 💡`,
                    `Hoş geldiniz! 🌟 ${this.userProfile.visitCount} kere görüşmüşüz - artık eski dostuz! ${this.userProfile.industry ? this.userProfile.industry + ' dünyasında ' : ''}Ne öğrenmek istersiniz bugün? 🎓`
                ];
                message = returns[Math.floor(Math.random() * returns.length)];
            }

            this.addMessage(message, 'bot');
            this.saveUserProfile();
        }, 1000);
    }

    saveUserProfile() {
        try {
            localStorage.setItem('eylul-user-profile', JSON.stringify(this.userProfile));
            console.log('💾 User profile saved:', this.userProfile);
            this.updateProfileSummary();
        } catch (e) {
            console.error('Failed to save user profile:', e);
        }
    }

    loadUserProfile() {
        try {
            const saved = localStorage.getItem('eylul-user-profile');
            if (saved) {
                this.userProfile = { ...this.userProfile, ...JSON.parse(saved) };
                console.log('📂 User profile loaded:', this.userProfile);
                this.updateProfileSummary();
            }
        } catch (e) {
            console.error('Failed to load user profile:', e);
        }
    }

    updateProfileSummary() {
        const summaryDiv = document.getElementById('eylul-profile-summary');
        const contentDiv = document.getElementById('eylul-profile-content');
        
        if (!summaryDiv || !contentDiv) return;

        let hasData = false;
        let html = '';

        if (this.userProfile.name) {
            html += `<div>👤 <strong>${this.userProfile.name}</strong></div>`;
            hasData = true;
        }
        if (this.userProfile.company) {
            html += `<div>🏢 ${this.userProfile.company}</div>`;
            hasData = true;
        }
        if (this.userProfile.industry) {
            html += `<div>🏭 ${this.userProfile.industry}</div>`;
            hasData = true;
        }
        if (this.userProfile.employeeCount) {
            html += `<div>👥 ${this.userProfile.employeeCount} çalışan</div>`;
            hasData = true;
        }
        if (this.userProfile.interests.length > 0) {
            html += `<div>💡 İlgi: ${this.userProfile.interests.slice(0, 2).join(', ')}</div>`;
            hasData = true;
        }

        if (hasData) {
            contentDiv.innerHTML = html;
            summaryDiv.classList.remove('hidden');
        } else {
            summaryDiv.classList.add('hidden');
        }
    }

    saveChatHistory() {
        try {
            localStorage.setItem('eylul-chat-history', JSON.stringify(this.conversationHistory));
        } catch (e) {
            console.error('Failed to save chat history:', e);
        }
    }

    loadChatHistory() {
        try {
            const saved = localStorage.getItem('eylul-chat-history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                
                // Restore messages (last 10 only)
                const recentMessages = this.conversationHistory.slice(-10);
                recentMessages.forEach(msg => {
                    if (msg.role !== 'system') {
                        this.addMessage(msg.content, msg.role);
                    }
                });
            }
        } catch (e) {
            console.error('Failed to load chat history:', e);
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.eylulBot = new EylulChatbot();
    console.log('🤖 Eylül AI Chatbot initialized!');
});
