// CMS Data Storage
let cmsData = {
    hero: {
        title: "İş Sağlığı ve Güvenliği'nde Dijital Dönüşüm",
        subtitle: "Modern işletmeler için kapsamlı İSG çözümleri. Yapay zeka destekli yazılımlarımız ve uzman ekibimizle güvenli çalışma ortamları oluşturuyoruz.",
        stats: {
            customers: 150,
            satisfaction: 96,
            support: "24/7",
            experience: 15
        }
    },
    services: [
        {
            id: 1,
            title: "Risk Değerlendirmesi",
            description: "Kapsamlı risk analizi ile potansiyel tehlikeleri önceden tespit ediyoruz.",
            icon: "fas fa-shield-alt",
            color: "blue",
            features: [
                "Fiziksel risk analizi",
                "Kimyasal tehlike değerlendirmesi", 
                "Detaylı raporlama"
            ]
        },
        {
            id: 2,
            title: "İSG Eğitimleri",
            description: "Çalışanlarınız için interaktif ve etkili güvenlik eğitimleri.",
            icon: "fas fa-graduation-cap",
            color: "green",
            features: [
                "Temel İSG eğitimi",
                "Online eğitim platformu",
                "Sertifikasyon süreçleri"
            ]
        },
        {
            id: 3,
            title: "İSG Yazılım Çözümleri",
            description: "Dijital İSG yönetimi için akıllı yazılım platformları.",
            icon: "fas fa-laptop-code",
            color: "purple",
            features: [
                "Luna İSG Pro",
                "Luna İSG KOBİ",
                "API entegrasyonları"
            ]
        }
    ],
    products: [
        {
            id: 1,
            name: "Luna İSG Pro",
            description: "Büyük işletmeler için kapsamlı İSG yönetim platformu",
            price: "2.500 TL/ay",
            target: "100+ çalışan, çoklu lokasyon",
            icon: "fas fa-crown",
            color: "blue",
            features: [
                "Kapsamlı risk değerlendirmesi modülü",
                "Çoklu lokasyon yönetimi",
                "Advanced analytics & dashboard",
                "API entegrasyonu & mobil app",
                "24/7 teknik destek"
            ]
        },
        {
            id: 2,
            name: "Luna İSG KOBİ",
            description: "KOBİ'ler için ekonomik ve kullanışlı İSG çözümü",
            price: "500 TL/ay",
            target: "10-100 çalışan, KOBİ işletmeler",
            icon: "fas fa-star",
            color: "green",
            features: [
                "Temel risk değerlendirmesi",
                "Eğitim takip modülü",
                "Kaza raporlama sistemi",
                "Kullanıcı dostu arayüz",
                "Online destek sistemi"
            ]
        }
    ],
    blog: [
        {
            id: 1,
            title: "İş Sağlığı ve Güvenliğinde Dijital Dönüşüm",
            excerpt: "İSG alanında dijital teknolojilerin nasıl devrim yarattığını ve gelecekte neler beklediğimizi keşfedin.",
            category: "Teknoloji",
            categoryColor: "blue",
            author: "Dr. Mehmet Yılmaz",
            readTime: "8 dakika okuma",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"
        },
        {
            id: 2,
            title: "Risk Değerlendirmesi: Adım Adım Rehber",
            excerpt: "Etkili risk değerlendirmesi nasıl yapılır? Pratik adımlar ve öneriler bu rehberde.",
            category: "Rehber",
            categoryColor: "green",
            author: "Müh. Ayşe Kaya",
            readTime: "12 dakika okuma",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop"
        },
        {
            id: 3,
            title: "İSG Eğitimlerinde Yeni Trendler",
            excerpt: "Modern eğitim yöntemleri ve teknolojileri İSG eğitimlerini nasıl dönüştürüyor?",
            category: "Eğitim",
            categoryColor: "purple",
            author: "Fatma Demir",
            readTime: "10 dakika okuma",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"
        }
    ],
    team: [
        {
            id: 1,
            name: "Dr. Mehmet Yılmaz",
            position: "Genel Müdür & İSG Uzmanı",
            experience: "15 yıl İSG deneyimi, 100+ proje",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Müh. Ayşe Kaya",
            position: "İSG Uzmanı & Proje Müdürü",
            experience: "10 yıl büyük sanayi projeleri",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Murat Özkan",
            position: "Yazılım Geliştirme Müdürü",
            experience: "8 yıl yazılım geliştirme",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
        }
    ],
    settings: {
        companyName: "NEXUS İSG",
        companyEmail: "info@nexusisg.com",
        companyPhone: "+90 212 XXX XX XX",
        companyAddress: "İstanbul, Türkiye"
    }
};

// Load data from localStorage if available
function loadCMSData() {
    const savedData = localStorage.getItem('nexus-isg-cms-data');
    if (savedData) {
        cmsData = JSON.parse(savedData);
    }
}

// Save data to localStorage
function saveCMSData() {
    localStorage.setItem('nexus-isg-cms-data', JSON.stringify(cmsData));
    updateLastUpdateTime();
    
    // Trigger content refresh after data save
    setTimeout(() => {
        triggerContentRefresh();
    }, 100);
}

function saveData() {
    saveCMSData();
}

// Trigger content refresh on main site
function triggerContentRefresh() {
    // Dispatch custom event for content refresh
    if (typeof window.CustomEvent !== 'undefined') {
        const event = new CustomEvent('cmsDataUpdated', { 
            detail: { timestamp: new Date().getTime() } 
        });
        window.dispatchEvent(event);
    }
}

// Initialize CMS
function initCMS() {
    loadCMSData();
    showSection('dashboard');
    loadAllData();
}

// Load all data for sections
function loadAllData() {
    loadServices();
    loadProducts();
    loadBlog();
    loadTeam();
    loadReferences();
    updateStats();
}

// Show section
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionName + '-section');
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        selectedSection.classList.add('active');
    }
    
    // Update sidebar navigation
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Find and activate current sidebar item
    const currentItem = document.querySelector(`[onclick*="showSection('${sectionName}')"]`);
    if (currentItem) {
        currentItem.classList.add('active');
    }
    
    // Load data for specific sections
    switch(sectionName) {
        case 'services':
            loadServices();
            break;
        case 'products':
            loadProducts();
            break;
        case 'blog':
            loadBlog();
            break;
        case 'team':
            loadTeam();
            break;
        case 'references':
            loadReferences();
            break;
        case 'dashboard':
            updateStats();
            break;
    }
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Remove active class from all sidebar items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.remove('hidden');
    
    // Add active class to selected sidebar item
    event.target.classList.add('active');
    
    // Load section specific data
    loadSectionData(sectionName);
}

// Load section specific data
function loadSectionData(sectionName) {
    switch(sectionName) {
        case 'dashboard':
            updateDashboardStats();
            break;
        case 'hero':
            loadHeroData();
            break;
        case 'services':
            loadServicesData();
            break;
        case 'products':
            loadProductsData();
            break;
        case 'blog':
            loadBlogData();
            break;
        case 'team':
            loadTeamData();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Load all data
function loadAllData() {
    loadHeroData();
    loadServicesData();
    loadProductsData();
    loadBlogData();
    loadTeamData();
    loadSettingsData();
}

// Hero Section Functions
function loadHeroData() {
    document.getElementById('heroTitle').value = cmsData.hero.title;
    document.getElementById('heroSubtitle').value = cmsData.hero.subtitle;
    document.getElementById('customerCount').value = cmsData.hero.stats.customers;
    document.getElementById('satisfactionRate').value = cmsData.hero.stats.satisfaction;
    document.getElementById('supportType').value = cmsData.hero.stats.support;
    document.getElementById('experienceYears').value = cmsData.hero.stats.experience;
}

function saveHeroSection() {
    cmsData.hero.title = document.getElementById('heroTitle').value;
    cmsData.hero.subtitle = document.getElementById('heroSubtitle').value;
    cmsData.hero.stats.customers = parseInt(document.getElementById('customerCount').value);
    cmsData.hero.stats.satisfaction = parseInt(document.getElementById('satisfactionRate').value);
    cmsData.hero.stats.support = document.getElementById('supportType').value;
    cmsData.hero.stats.experience = parseInt(document.getElementById('experienceYears').value);
    
    saveCMSData();
    showNotification('Hero bölümü başarıyla kaydedildi!', 'success');
}

function resetHeroSection() {
    loadHeroData();
    showNotification('Hero bölümü sıfırlandı!', 'info');
}

// Services Functions
function loadServicesData() {
    const container = document.getElementById('servicesList');
    container.innerHTML = '';
    
    cmsData.services.forEach(service => {
        const serviceElement = createServiceElement(service);
        container.appendChild(serviceElement);
    });
}

function createServiceElement(service) {
    const div = document.createElement('div');
    div.className = 'border border-gray-200 rounded-lg p-4';
    div.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
                <i class="${service.icon} text-${service.color}-600 text-xl mr-3"></i>
                <h4 class="font-semibold">${service.title}</h4>
            </div>
            <div class="flex space-x-2">
                <button onclick="editService(${service.id})" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-edit"></i> Düzenle
                </button>
                <button onclick="deleteService(${service.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i> Sil
                </button>
            </div>
        </div>
        <p class="text-gray-600 text-sm mb-2">${service.description}</p>
        <div class="text-xs text-gray-500">
            ${service.features.map(feature => `• ${feature}`).join(' ')}
        </div>
    `;
    return div;
}

// Products Functions
function loadProductsData() {
    const container = document.getElementById('productsList');
    container.innerHTML = '';
    
    cmsData.products.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });
}

function createProductElement(product) {
    const div = document.createElement('div');
    div.className = 'border border-gray-200 rounded-lg p-4';
    div.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
                <i class="${product.icon} text-${product.color}-600 text-xl mr-3"></i>
                <div>
                    <h4 class="font-semibold">${product.name}</h4>
                    <span class="text-${product.color}-600 font-medium">${product.price}</span>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-edit"></i> Düzenle
                </button>
                <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i> Sil
                </button>
            </div>
        </div>
        <p class="text-gray-600 text-sm mb-2">${product.description}</p>
        <p class="text-xs text-gray-500 mb-2">Hedef: ${product.target}</p>
        <div class="text-xs text-gray-500">
            ${product.features.map(feature => `• ${feature}`).join(' ')}
        </div>
    `;
    return div;
}

// Blog Functions
function loadBlogData() {
    const container = document.getElementById('blogList');
    container.innerHTML = '';
    
    cmsData.blog.forEach(post => {
        const blogElement = createBlogElement(post);
        container.appendChild(blogElement);
    });
}

function createBlogElement(post) {
    const div = document.createElement('div');
    div.className = 'border border-gray-200 rounded-lg p-4 flex';
    div.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="w-20 h-20 object-cover rounded-lg mr-4">
        <div class="flex-1">
            <div class="flex items-center justify-between mb-2">
                <div>
                    <span class="text-xs text-${post.categoryColor}-600 font-medium">${post.category}</span>
                    <h4 class="font-semibold text-sm">${post.title}</h4>
                    <p class="text-xs text-gray-500">${post.author} • ${post.readTime}</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="editBlogPost(${post.id})" class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteBlogPost(${post.id})" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p class="text-xs text-gray-600">${post.excerpt}</p>
        </div>
    `;
    return div;
}

// Team Functions
function loadTeamData() {
    const container = document.getElementById('teamList');
    container.innerHTML = '';
    
    cmsData.team.forEach(member => {
        const teamElement = createTeamElement(member);
        container.appendChild(teamElement);
    });
}

function createTeamElement(member) {
    const div = document.createElement('div');
    div.className = 'border border-gray-200 rounded-lg p-4 flex items-center';
    div.innerHTML = `
        <img src="${member.image}" alt="${member.name}" class="w-16 h-16 object-cover rounded-full mr-4">
        <div class="flex-1">
            <h4 class="font-semibold">${member.name}</h4>
            <p class="text-sm text-blue-600">${member.position}</p>
            <p class="text-xs text-gray-500">${member.experience}</p>
        </div>
        <div class="flex space-x-2">
            <button onclick="editTeamMember(${member.id})" class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-edit"></i> Düzenle
            </button>
            <button onclick="deleteTeamMember(${member.id})" class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i> Sil
            </button>
        </div>
    `;
    return div;
}

// Settings Functions
function loadSettingsData() {
    document.getElementById('companyName').value = cmsData.settings.companyName;
    document.getElementById('companyEmail').value = cmsData.settings.companyEmail;
    document.getElementById('companyPhone').value = cmsData.settings.companyPhone;
    document.getElementById('companyAddress').value = cmsData.settings.companyAddress;
}

function saveSettings() {
    const companyName = document.getElementById('companyName').value;
    const companyEmail = document.getElementById('companyEmail').value;
    const companyPhone = document.getElementById('companyPhone').value;
    const companyAddress = document.getElementById('companyAddress').value;
    const logoUrl = document.getElementById('logoUrl').value;
    
    // Site ayarlarını güncelle
    if (!data.settings) {
        data.settings = {};
    }
    
    data.settings.companyName = companyName;
    data.settings.companyEmail = companyEmail;
    data.settings.companyPhone = companyPhone;
    data.settings.companyAddress = companyAddress;
    data.settings.logoUrl = logoUrl;
    
    // Ana sayfada şirket adını güncelle
    updateCompanyNameOnSite(companyName);
    
    // Logo'yu güncelle
    if (logoUrl) {
        updateLogoOnSite(logoUrl);
    }
    
    saveData();
    updateMainSite();
    addActivity('edit', 'Site ayarları güncellendi');
    showNotification('Site ayarları başarıyla kaydedildi!', 'success');
}

function updateCompanyNameOnSite(companyName) {
    // Ana sayfadaki şirket adı elementlerini güncelle
    const companyNameElements = document.querySelectorAll('[data-company-name]');
    companyNameElements.forEach(element => {
        element.textContent = companyName;
    });
}

function updateLogoOnSite(logoUrl) {
    // Ana sayfadaki logo elementlerini güncelle
    const logoElements = document.querySelectorAll('[data-logo]');
    logoElements.forEach(element => {
        element.src = logoUrl;
    });
}

function loadSettings() {
    if (data.settings) {
        const companyNameEl = document.getElementById('companyName');
        const companyEmailEl = document.getElementById('companyEmail');
        const companyPhoneEl = document.getElementById('companyPhone');
        const companyAddressEl = document.getElementById('companyAddress');
        const logoUrlEl = document.getElementById('logoUrl');
        const logoPreviewEl = document.getElementById('logoPreview');
        
        if (companyNameEl) companyNameEl.value = data.settings.companyName || 'NEXUS İSG';
        if (companyEmailEl) companyEmailEl.value = data.settings.companyEmail || 'info@nexusisg.com';
        if (companyPhoneEl) companyPhoneEl.value = data.settings.companyPhone || '+90 532 123 45 67';
        if (companyAddressEl) companyAddressEl.value = data.settings.companyAddress || 'İstanbul, Türkiye';
        if (logoUrlEl) {
            logoUrlEl.value = data.settings.logoUrl || 'media/nexus-logo.svg';
            // Logo URL değişikliklerini dinle
            logoUrlEl.addEventListener('input', function() {
                updateLogoPreview(this.value);
            });
        }
        if (logoPreviewEl) logoPreviewEl.src = data.settings.logoUrl || 'media/nexus-logo.svg';
    }
}

function updateLogoPreview(logoUrl) {
    const logoPreviewEl = document.getElementById('logoPreview');
    if (logoPreviewEl && logoUrl) {
        logoPreviewEl.src = logoUrl;
        logoPreviewEl.onerror = function() {
            this.src = 'media/nexus-logo.svg'; // Hata durumunda varsayılan logo
        };
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 
        'bg-blue-600'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function updateLastUpdateTime() {
    const now = new Date();
    const formatted = now.toLocaleDateString('tr-TR') + ', ' + now.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'});
    document.getElementById('lastUpdate').textContent = formatted;
}

// Preview Functions
function previewSite() {
    // Update main site with CMS data
    updateMainSite();
    // Open main site in new tab
    window.open('index.html', '_blank');
}

// Manual sync function
function syncToMainSite() {
    // Save current data
    saveData();
    
    // Trigger refresh on main site if it's open
    try {
        if (window.opener && !window.opener.closed) {
            window.opener.refreshDynamicContent && window.opener.refreshDynamicContent();
        }
    } catch (e) {
        console.log('Could not sync to main site:', e);
    }
    
    showNotification('Veriler ana siteye senkronize edildi!', 'success');
}

// Logout function
function logout() {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        sessionStorage.removeItem('nexus-cms-logged-in');
        localStorage.removeItem('nexus-cms-remember');
        showNotification('Başarıyla çıkış yapıldı!', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

function updateMainSite() {
    // This function would update the main index.html file with current CMS data
    // For demo purposes, we'll save to localStorage and the index.html will read from there
    saveCMSData();
    showNotification('Site verileri güncellendi. Ana site açılıyor...', 'success');
}

// Logout function
function logout() {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        window.location.href = 'index.html';
    }
}

// Service CRUD Operations
function addService() {
    showServiceModal();
}

function editService(id) {
    const service = data.services.find(s => s.id === id);
    if (service) {
        showServiceModal(service);
    }
}

function deleteService(id) {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
        const serviceName = data.services.find(s => s.id === id)?.name || 'İsimsiz';
        data.services = data.services.filter(s => s.id !== id);
        saveData();
        updateMainSite();
        loadServices();
        addActivity('delete', `"${serviceName}" hizmeti silindi`);
        showNotification('Hizmet başarıyla silindi!', 'success');
    }
}

function showServiceModal(service = null) {
    const isEdit = service !== null;
    const modalHtml = `
        <div id="serviceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">${isEdit ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}</h3>
                    <button onclick="closeServiceModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="serviceForm" onsubmit="saveService(event)">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Hizmet Adı *</label>
                        <input type="text" id="serviceName" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? service.name : ''}" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama *</label>
                        <textarea id="serviceDescription" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                  required>${isEdit ? service.description : ''}</textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Font Awesome İkon *</label>
                        <input type="text" id="serviceIcon" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? service.icon : 'fas fa-cog'}" placeholder="fas fa-cog" required>
                        <small class="text-gray-500">Örnek: fas fa-shield-alt, fas fa-users, fas fa-laptop</small>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" onclick="closeServiceModal()" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                            İptal
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            ${isEdit ? 'Güncelle' : 'Ekle'}
                        </button>
                    </div>
                    <input type="hidden" id="serviceId" value="${isEdit ? service.id : ''}">
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.remove();
    }
}

function saveService(event) {
    event.preventDefault();
    
    const id = document.getElementById('serviceId').value;
    const name = document.getElementById('serviceName').value.trim();
    const description = document.getElementById('serviceDescription').value.trim();
    const icon = document.getElementById('serviceIcon').value.trim();
    
    // Validation
    if (!name || !description || !icon) {
        showNotification('Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
    if (id) {
        // Edit existing service
        const serviceIndex = data.services.findIndex(s => s.id == id);
        if (serviceIndex !== -1) {
            data.services[serviceIndex] = {
                ...data.services[serviceIndex],
                name,
                description,
                icon
            };
            addActivity('edit', `"${name}" hizmeti güncellendi`);
            showNotification('Hizmet başarıyla güncellendi!', 'success');
        }
    } else {
        // Add new service
        const newService = {
            id: Date.now(),
            name,
            description,
            icon
        };
        data.services.push(newService);
        addActivity('create', `"${name}" hizmeti eklendi`);
        showNotification('Yeni hizmet başarıyla eklendi!', 'success');
    }
    
    saveData();
    updateMainSite();
    loadServices();
    closeServiceModal();
}

// Product CRUD Operations - Moved to bottom

function deleteProduct(id) {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
        data.products = data.products.filter(p => p.id !== id);
        saveData();
        updateMainSite();
        loadProducts();
        showNotification('Ürün başarıyla silindi!', 'success');
    }
}

function showProductModal(product = null) {
    const isEdit = product !== null;
    const modalHtml = `
        <div id="productModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">${isEdit ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</h3>
                    <button onclick="closeProductModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="productForm" onsubmit="saveProduct(event)">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Ürün Adı *</label>
                        <input type="text" id="productName" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? product.name : ''}" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama *</label>
                        <textarea id="productDescription" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                  required>${isEdit ? product.description : ''}</textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Fiyat *</label>
                        <div class="relative">
                            <input type="number" id="productPrice" step="0.01" min="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                   value="${isEdit ? product.price : ''}" required>
                            <span class="absolute right-3 top-2 text-gray-500">₺</span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Ürün Görseli URL</label>
                        <input type="url" id="productImage" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? product.image : ''}" placeholder="https://example.com/image.jpg">
                        <small class="text-gray-500">Boş bırakılırsa varsayılan görsel kullanılır</small>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                        <select id="productCategory" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="İSG Yazılımı" ${isEdit && product.category === 'İSG Yazılımı' ? 'selected' : ''}>İSG Yazılımı</option>
                            <option value="Eğitim Materyali" ${isEdit && product.category === 'Eğitim Materyali' ? 'selected' : ''}>Eğitim Materyali</option>
                            <option value="Danışmanlık" ${isEdit && product.category === 'Danışmanlık' ? 'selected' : ''}>Danışmanlık</option>
                            <option value="Diğer" ${isEdit && product.category === 'Diğer' ? 'selected' : ''}>Diğer</option>
                        </select>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" onclick="closeProductModal()" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                            İptal
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            ${isEdit ? 'Güncelle' : 'Ekle'}
                        </button>
                    </div>
                    <input type="hidden" id="productId" value="${isEdit ? product.id : ''}">
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.remove();
    }
}

function saveProduct(event) {
    event.preventDefault();
    
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value.trim();
    const category = document.getElementById('productCategory').value;
    
    // Validation
    if (!name || !description || !price || price <= 0) {
        showNotification('Lütfen tüm zorunlu alanları doğru şekilde doldurun!', 'error');
        return;
    }
    
    const productData = {
        name,
        description,
        price,
        category,
        image: image || 'media/nexus-logo.svg'
    };
    
    if (id) {
        // Edit existing product
        const productIndex = data.products.findIndex(p => p.id == id);
        if (productIndex !== -1) {
            data.products[productIndex] = {
                ...data.products[productIndex],
                ...productData
            };
            showNotification('Ürün başarıyla güncellendi!', 'success');
        }
    } else {
        // Add new product
        const newProduct = {
            id: Date.now(),
            ...productData
        };
        data.products.push(newProduct);
        addActivity('create', `"${name}" ürünü eklendi`);
        showNotification('Yeni ürün başarıyla eklendi!', 'success');
    }
    
    saveData();
    updateMainSite();
    loadProducts();
    closeProductModal();
}

// Blog CRUD Operations - Moved to bottom

function editBlogPost(id) {
    const post = data.blog.find(p => p.id === id);
    if (post) {
        showBlogModal(post);
    }
}

function deleteBlogPost(id) {
    if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
        data.blog = data.blog.filter(p => p.id !== id);
        saveData();
        updateMainSite();
        loadBlog();
        showNotification('Blog yazısı başarıyla silindi!', 'success');
    }
}

function showBlogModal(post = null) {
    const isEdit = post !== null;
    const modalHtml = `
        <div id="blogModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">${isEdit ? 'Blog Yazısı Düzenle' : 'Yeni Blog Yazısı Ekle'}</h3>
                    <button onclick="closeBlogModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="blogForm" onsubmit="saveBlogPost(event)">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Başlık *</label>
                        <input type="text" id="blogTitle" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? post.title : ''}" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Özet *</label>
                        <textarea id="blogExcerpt" rows="2" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                  placeholder="Blog yazısının kısa özeti..." required>${isEdit ? post.excerpt : ''}</textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">İçerik *</label>
                        <textarea id="blogContent" rows="8" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                  placeholder="Blog yazısının detaylı içeriği..." required>${isEdit ? post.content : ''}</textarea>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Yazar *</label>
                            <input type="text" id="blogAuthor" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                   value="${isEdit ? post.author : 'NEXUS İSG Uzmanı'}" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                            <select id="blogCategory" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="İSG" ${isEdit && post.category === 'İSG' ? 'selected' : ''}>İSG</option>
                                <option value="Mevzuat" ${isEdit && post.category === 'Mevzuat' ? 'selected' : ''}>Mevzuat</option>
                                <option value="Eğitim" ${isEdit && post.category === 'Eğitim' ? 'selected' : ''}>Eğitim</option>
                                <option value="Teknoloji" ${isEdit && post.category === 'Teknoloji' ? 'selected' : ''}>Teknoloji</option>
                                <option value="Genel" ${isEdit && post.category === 'Genel' ? 'selected' : ''}>Genel</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Kapak Görseli URL</label>
                        <input type="url" id="blogImage" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? post.image : ''}" placeholder="https://example.com/image.jpg">
                        <small class="text-gray-500">Boş bırakılırsa varsayılan görsel kullanılır</small>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Etiketler</label>
                        <input type="text" id="blogTags" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? post.tags?.join(', ') || '' : ''}" placeholder="işçi sağlığı, güvenlik, mevzuat">
                        <small class="text-gray-500">Virgülle ayırarak yazın</small>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" onclick="closeBlogModal()" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                            İptal
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            ${isEdit ? 'Güncelle' : 'Yayınla'}
                        </button>
                    </div>
                    <input type="hidden" id="blogId" value="${isEdit ? post.id : ''}">
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.remove();
    }
}

function saveBlogPost(event) {
    event.preventDefault();
    
    const id = document.getElementById('blogId').value;
    const title = document.getElementById('blogTitle').value.trim();
    const excerpt = document.getElementById('blogExcerpt').value.trim();
    const content = document.getElementById('blogContent').value.trim();
    const author = document.getElementById('blogAuthor').value.trim();
    const category = document.getElementById('blogCategory').value;
    const image = document.getElementById('blogImage').value.trim();
    const tagsInput = document.getElementById('blogTags').value.trim();
    
    // Validation
    if (!title || !excerpt || !content || !author) {
        showNotification('Lütfen tüm zorunlu alanları doldurun!', 'error');
        return;
    }
    
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    const postData = {
        title,
        excerpt,
        content,
        author,
        category,
        image: image || 'media/nexus-logo.svg',
        tags,
        date: isEdit && data.blog.find(p => p.id == id)?.date || new Date().toLocaleDateString('tr-TR')
    };
    
    if (id) {
        // Edit existing post
        const postIndex = data.blog.findIndex(p => p.id == id);
        if (postIndex !== -1) {
            data.blog[postIndex] = {
                ...data.blog[postIndex],
                ...postData
            };
            showNotification('Blog yazısı başarıyla güncellendi!', 'success');
        }
    } else {
        // Add new post
        const newPost = {
            id: Date.now(),
            ...postData
        };
        data.blog.push(newPost);
        addActivity('create', `"${title}" blog yazısı yayınlandı`);
        showNotification('Yeni blog yazısı başarıyla yayınlandı!', 'success');
    }
    
    saveData();
    updateMainSite();
    loadBlog();
    closeBlogModal();
}

// Team CRUD Operations - Moved to bottom

function editTeamMember(id) {
    const member = data.team.find(t => t.id === id);
    if (member) {
        showTeamModal(member);
    }
}

function deleteTeamMember(id) {
    if (confirm('Bu ekip üyesini silmek istediğinizden emin misiniz?')) {
        data.team = data.team.filter(t => t.id !== id);
        saveData();
        updateMainSite();
        loadTeam();
        showNotification('Ekip üyesi başarıyla silindi!', 'success');
    }
}

function showTeamModal(member = null) {
    const isEdit = member !== null;
    const modalHtml = `
        <div id="teamModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">${isEdit ? 'Ekip Üyesi Düzenle' : 'Yeni Ekip Üyesi Ekle'}</h3>
                    <button onclick="closeTeamModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="teamForm" onsubmit="saveTeamMember(event)">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Ad Soyad *</label>
                        <input type="text" id="memberName" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? member.name : ''}" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Pozisyon *</label>
                        <input type="text" id="memberPosition" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? member.position : ''}" placeholder="İSG Uzmanı" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Biyografi</label>
                        <textarea id="memberBio" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                  placeholder="Kişi hakkında kısa bilgi...">${isEdit ? member.bio || '' : ''}</textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Profil Fotoğrafı URL</label>
                        <input type="url" id="memberPhoto" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? member.photo : ''}" placeholder="https://example.com/photo.jpg">
                        <small class="text-gray-500">Boş bırakılırsa varsayılan avatar kullanılır</small>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                        <input type="email" id="memberEmail" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? member.email || '' : ''}" placeholder="ornek@nexusisg.com">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                        <input type="tel" id="memberPhone" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? member.phone || '' : ''}" placeholder="0532 123 45 67">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Sosyal Medya</label>
                        <div class="grid grid-cols-2 gap-2">
                            <input type="url" id="memberLinkedIn" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                   value="${isEdit ? member.linkedin || '' : ''}" placeholder="LinkedIn profili">
                            <input type="url" id="memberTwitter" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                   value="${isEdit ? member.twitter || '' : ''}" placeholder="Twitter profili">
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Uzmanlık Alanları</label>
                        <input type="text" id="memberSpecialties" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               value="${isEdit ? member.specialties?.join(', ') || '' : ''}" placeholder="İSG Mevzuatı, Risk Analizi, Eğitim">
                        <small class="text-gray-500">Virgülle ayırarak yazın</small>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" onclick="closeTeamModal()" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                            İptal
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            ${isEdit ? 'Güncelle' : 'Ekle'}
                        </button>
                    </div>
                    <input type="hidden" id="memberId" value="${isEdit ? member.id : ''}">
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeTeamModal() {
    const modal = document.getElementById('teamModal');
    if (modal) {
        modal.remove();
    }
}

function saveTeamMember(event) {
    event.preventDefault();
    
    const id = document.getElementById('memberId').value;
    const name = document.getElementById('memberName').value.trim();
    const position = document.getElementById('memberPosition').value.trim();
    const bio = document.getElementById('memberBio').value.trim();
    const photo = document.getElementById('memberPhoto').value.trim();
    const email = document.getElementById('memberEmail').value.trim();
    const phone = document.getElementById('memberPhone').value.trim();
    const linkedin = document.getElementById('memberLinkedIn').value.trim();
    const twitter = document.getElementById('memberTwitter').value.trim();
    const specialtiesInput = document.getElementById('memberSpecialties').value.trim();
    
    // Validation
    if (!name || !position) {
        showNotification('Lütfen ad soyad ve pozisyon alanlarını doldurun!', 'error');
        return;
    }
    
    const specialties = specialtiesInput ? specialtiesInput.split(',').map(s => s.trim()).filter(s => s) : [];
    
    const memberData = {
        name,
        position,
        bio: bio || 'Bu kişi hakkında henüz bilgi eklenmemiş.',
        photo: photo || 'media/nexus-logo.svg',
        email,
        phone,
        linkedin,
        twitter,
        specialties
    };
    
    if (id) {
        // Edit existing member
        const memberIndex = data.team.findIndex(t => t.id == id);
        if (memberIndex !== -1) {
            data.team[memberIndex] = {
                ...data.team[memberIndex],
                ...memberData
            };
            showNotification('Ekip üyesi başarıyla güncellendi!', 'success');
        }
    } else {
        // Add new member
        const newMember = {
            id: Date.now(),
            ...memberData
        };
        data.team.push(newMember);
        addActivity('create', `"${name}" ekip üyesi eklendi`);
        showNotification('Yeni ekip üyesi başarıyla eklendi!', 'success');
    }
    
    saveData();
    updateMainSite();
    loadTeam();
    closeTeamModal();
}

// Security check
function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem('nexus-cms-logged-in');
    const rememberMe = localStorage.getItem('nexus-cms-remember');
    
    if (isLoggedIn !== 'true' && rememberMe !== 'true') {
        alert('Bu sayfaya erişmek için giriş yapmanız gerekiyor!');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Search and Filter Functions
function filterServices() {
    const searchTerm = document.getElementById('servicesSearch').value.toLowerCase();
    const services = data.services.filter(service => 
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm)
    );
    displayFilteredServices(services);
}

function sortServices() {
    const sortBy = document.getElementById('servicesSort').value;
    let sortedServices = [...data.services];
    
    switch(sortBy) {
        case 'name-asc':
            sortedServices.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedServices.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'date-desc':
            sortedServices.sort((a, b) => b.id - a.id);
            break;
        case 'date-asc':
            sortedServices.sort((a, b) => a.id - b.id);
            break;
    }
    
    displayFilteredServices(sortedServices);
}

function clearServicesFilters() {
    document.getElementById('servicesSearch').value = '';
    document.getElementById('servicesSort').value = 'name-asc';
    loadServices();
}

function displayFilteredServices(services) {
    const servicesContainer = document.getElementById('servicesList');
    if (!servicesContainer) return;
    
    if (services.length === 0) {
        servicesContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Hiç hizmet bulunamadı.</p>';
        return;
    }
    
    servicesContainer.innerHTML = services.map(service => `
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center">
                <i class="${service.icon} text-blue-600 text-xl mr-4"></i>
                <div>
                    <h4 class="font-medium text-gray-900">${service.name}</h4>
                    <p class="text-sm text-gray-600">${service.description}</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="editService(${service.id})" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteService(${service.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const searchTerm = document.getElementById('productsSearch').value.toLowerCase();
    const category = document.getElementById('productsCategory').value;
    
    let products = data.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                             product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        return matchesSearch && matchesCategory;
    });
    
    displayFilteredProducts(products);
}

function sortProducts() {
    const sortBy = document.getElementById('productsSort').value;
    let sortedProducts = [...data.products];
    
    switch(sortBy) {
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
    }
    
    displayFilteredProducts(sortedProducts);
}

function clearProductsFilters() {
    document.getElementById('productsSearch').value = '';
    document.getElementById('productsCategory').value = '';
    document.getElementById('productsSort').value = 'name-asc';
    loadProducts();
}

function displayFilteredProducts(products) {
    const productsContainer = document.getElementById('productsList');
    if (!productsContainer) return;
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Hiç ürün bulunamadı.</p>';
        return;
    }
    
    productsContainer.innerHTML = products.map(product => `
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center">
                <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg mr-4">
                <div>
                    <h4 class="font-medium text-gray-900">${product.name}</h4>
                    <p class="text-sm text-gray-600">${product.description}</p>
                    <p class="text-lg font-bold text-blue-600">${product.price.toLocaleString('tr-TR')} ₺</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Bulk Operations
function selectAllItems(type) {
    const checkboxes = document.querySelectorAll(`input[name="${type}-select"]`);
    const selectAllCheckbox = document.getElementById(`select-all-${type}`);
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    
    updateBulkActionButtons(type);
}

function updateBulkActionButtons(type) {
    const checkboxes = document.querySelectorAll(`input[name="${type}-select"]:checked`);
    const bulkActions = document.getElementById(`bulk-actions-${type}`);
    
    if (checkboxes.length > 0) {
        bulkActions.classList.remove('hidden');
    } else {
        bulkActions.classList.add('hidden');
    }
}

function bulkDelete(type) {
    const checkboxes = document.querySelectorAll(`input[name="${type}-select"]:checked`);
    const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.value));
    
    if (selectedIds.length === 0) return;
    
    if (confirm(`Seçili ${selectedIds.length} öğeyi silmek istediğinizden emin misiniz?`)) {
        selectedIds.forEach(id => {
            switch(type) {
                case 'services':
                    data.services = data.services.filter(s => s.id !== id);
                    break;
                case 'products':
                    data.products = data.products.filter(p => p.id !== id);
                    break;
                case 'blog':
                    data.blog = data.blog.filter(b => b.id !== id);
                    break;
                case 'team':
                    data.team = data.team.filter(t => t.id !== id);
                    break;
            }
        });
        
        saveData();
        updateMainSite();
        
        // Reload the appropriate section
        switch(type) {
            case 'services': loadServices(); break;
            case 'products': loadProducts(); break;
            case 'blog': loadBlog(); break;
            case 'team': loadTeam(); break;
        }
        
        showNotification(`${selectedIds.length} öğe başarıyla silindi!`, 'success');
        updateDashboardStats(); // Dashboard istatistiklerini güncelle
    }
}

// Dashboard istatistik güncelleme fonksiyonu
function updateDashboardStats() {
    const servicesCount = data.services.length;
    const productsCount = data.products.length;
    const blogCount = data.blog.length;
    const teamCount = data.team.length;
    const totalCount = servicesCount + productsCount + blogCount + teamCount;
    
    // Dashboard'daki sayıları güncelle
    const servicesCountEl = document.querySelector('[data-stat="services"] .stat-number');
    const productsCountEl = document.querySelector('[data-stat="products"] .stat-number');
    const blogCountEl = document.querySelector('[data-stat="blog"] .stat-number');
    const teamCountEl = document.querySelector('[data-stat="team"] .stat-number');
    const totalContentEl = document.getElementById('totalContent');
    
    if (servicesCountEl) servicesCountEl.textContent = servicesCount;
    if (productsCountEl) productsCountEl.textContent = productsCount;
    if (blogCountEl) blogCountEl.textContent = blogCount;
    if (teamCountEl) teamCountEl.textContent = teamCount;
    if (totalContentEl) totalContentEl.textContent = totalCount;
    
    // Son güncelleme zamanını göster
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (lastUpdateEl) {
        const now = new Date();
        lastUpdateEl.textContent = now.toLocaleTimeString('tr-TR');
    }
    
    // Veri boyutunu güncelle
    calculateDataSize();
}

// Aktivite geçmişi yönetimi
let activities = [];

function addActivity(type, message) {
    const activity = {
        id: Date.now(),
        type: type,
        message: message,
        timestamp: new Date(),
        icon: getActivityIcon(type)
    };
    
    activities.unshift(activity);
    
    // Son 10 aktiviteyi tut
    if (activities.length > 10) {
        activities = activities.slice(0, 10);
    }
    
    updateActivitiesDisplay();
}

function getActivityIcon(type) {
    const icons = {
        'create': 'fas fa-plus-circle text-green-600',
        'edit': 'fas fa-edit text-blue-600',
        'delete': 'fas fa-trash text-red-600',
        'export': 'fas fa-download text-purple-600',
        'import': 'fas fa-upload text-orange-600',
        'system': 'fas fa-cog text-gray-600'
    };
    return icons[type] || 'fas fa-info-circle text-blue-600';
}

function updateActivitiesDisplay() {
    const container = document.getElementById('recentActivities');
    if (!container) return;
    
    if (activities.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Henüz aktivite yok</p>';
        return;
    }
    
    container.innerHTML = activities.map(activity => `
        <div class="flex items-center p-3 bg-gray-50 rounded-lg border-l-4 border-blue-400 hover:bg-gray-100 transition-colors">
            <div class="bg-white p-2 rounded-full mr-3 shadow-sm">
                <i class="${activity.icon}"></i>
            </div>
            <div class="flex-1">
                <p class="text-sm font-medium">${activity.message}</p>
                <p class="text-xs text-gray-500">${formatTimeAgo(activity.timestamp)}</p>
            </div>
        </div>
    `).join('');
}

function formatTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Az önce';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    return date.toLocaleDateString('tr-TR');
}

function clearActivities() {
    activities = [];
    updateActivitiesDisplay();
    addActivity('system', 'Aktivite geçmişi temizlendi');
}

// Gelişmiş validasyon fonksiyonları
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(\+90|0)?5\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Veri yedekleme ve geri yükleme
function exportData() {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexus-isg-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    addActivity('export', 'Veriler JSON formatında dışa aktarıldı');
    showNotification('Veriler başarıyla dışa aktarıldı!', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const importedData = JSON.parse(event.target.result);
                
                if (confirm('Mevcut veriler silinecek ve yeni verilerle değiştirilecek. Devam etmek istediğinizden emin misiniz?')) {
                    data = importedData;
                    saveData();
                    updateMainSite();
                    initCMS(); // CMS'i yeniden başlat
                    addActivity('import', 'Veriler JSON dosyasından içe aktarıldı');
                    showNotification('Veriler başarıyla içe aktarıldı!', 'success');
                }
            } catch (error) {
                showNotification('Dosya formatı hatalı!', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// Tüm verileri temizle
function clearAllData() {
    if (confirm('TÜM VERİLER SİLİNECEK! Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?')) {
        if (confirm('Bu işlem gerçekten geri alınamaz. Son kez onaylıyor musunuz?')) {
            localStorage.removeItem('nexus-isg-cms-data');
            data = {
                hero: { title: "NEXUS İSG", subtitle: "İş Sağlığı ve Güvenliği Çözümleri", buttonText: "Hizmetlerimiz" },
                services: [],
                products: [],
                blog: [],
                team: [],
                settings: { companyName: "NEXUS İSG", email: "info@nexusisg.com", phone: "+90 532 123 45 67" }
            };
            saveData();
            updateMainSite();
            initCMS();
            activities = []; // Aktiviteleri de temizle
            addActivity('system', 'Tüm veriler temizlendi');
            showNotification('Tüm veriler temizlendi!', 'success');
        }
    }
}

// Örnek veri oluştur
function generateSampleData() {
    if (confirm('Mevcut veriler silinecek ve örnek veriler oluşturulacak. Devam etmek istediğinizden emin misiniz?')) {
        data = {
            hero: {
                title: "NEXUS İSG",
                subtitle: "Modern İş Sağlığı ve Güvenliği Çözümleri",
                buttonText: "Hizmetlerimizi Keşfedin"
            },
            services: [
                { id: 1, name: "İSG Danışmanlığı", description: "Kapsamlı İSG danışmanlık hizmetleri", icon: "fas fa-shield-alt" },
                { id: 2, name: "Risk Analizi", description: "Detaylı risk değerlendirme ve analiz", icon: "fas fa-search" },
                { id: 3, name: "İSG Eğitimi", description: "Uzman eğitmenlerle İSG eğitimleri", icon: "fas fa-graduation-cap" }
            ],
            products: [
                { id: 1, name: "Luna İSG Pro", description: "Profesyonel İSG yönetim yazılımı", price: 2500, category: "İSG Yazılımı", image: "https://via.placeholder.com/300x200/3B82F6/white?text=Luna+Pro" },
                { id: 2, name: "Luna İSG Basic", description: "Temel İSG takip sistemi", price: 1200, category: "İSG Yazılımı", image: "https://via.placeholder.com/300x200/10B981/white?text=Luna+Basic" }
            ],
            blog: [
                { id: 1, title: "İSG'nin Önemi", excerpt: "Çalışan sağlığı ve güvenliği neden önemli?", content: "İş sağlığı ve güvenliği, modern çalışma yaşamının temel taşlarından biridir...", author: "NEXUS İSG Uzmanı", date: "2025-01-01", category: "İSG", image: "https://via.placeholder.com/400x250/3B82F6/white?text=Blog" }
            ],
            team: [
                { id: 1, name: "Dr. Ahmet Yılmaz", position: "İSG Uzmanı", bio: "15 yıllık deneyim", photo: "https://via.placeholder.com/200x200/3B82F6/white?text=AY" },
                { id: 2, name: "Eng. Fatma Demir", position: "Güvenlik Uzmanı", bio: "10 yıllık deneyim", photo: "https://via.placeholder.com/200x200/10B981/white?text=FD" }
            ],
            settings: {
                companyName: "NEXUS İSG",
                email: "info@nexusisg.com",
                phone: "+90 532 123 45 67",
                address: "İstanbul, Türkiye"
            }
        };
        
        saveData();
        updateMainSite();
        initCMS();
        showNotification('Örnek veriler oluşturuldu!', 'success');
    }
}

// Veri boyutu hesaplama
function calculateDataSize() {
    const dataStr = JSON.stringify(data);
    const sizeInBytes = new Blob([dataStr]).size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    
    const dataSizeEl = document.getElementById('dataSize');
    const dataSizeDisplayEl = document.getElementById('dataSizeDisplay');
    
    if (dataSizeEl) {
        dataSizeEl.textContent = `${sizeInKB} KB (${sizeInBytes} bytes)`;
    }
    
    if (dataSizeDisplayEl) {
        dataSizeDisplayEl.textContent = `${sizeInKB} KB`;
    }
}

// Hero Section Functions
function saveHeroSection() {
    const heroTitle = document.getElementById('heroTitle').value;
    const heroSubtitle = document.getElementById('heroSubtitle').value;
    const customerCount = document.getElementById('customerCount').value;
    const sectorCount = document.getElementById('sectorCount').value;
    const supportType = document.getElementById('supportType').value;
    const experienceYears = document.getElementById('experienceYears').value;
    
    if (!data.hero) {
        data.hero = {};
    }
    
    data.hero = {
        title: heroTitle,
        subtitle: heroSubtitle,
        stats: {
            customers: parseInt(customerCount),
            sectors: parseInt(sectorCount),
            support: supportType,
            experience: parseInt(experienceYears)
        }
    };
    
    saveData();
    updateHeroOnSite();
    addActivity('hero', 'Hero bölümü güncellendi');
    showNotification('Hero bölümü kaydedildi!', 'success');
}

function resetHeroSection() {
    document.getElementById('heroTitle').value = "İş Sağlığı ve Güvenliği'nde Dijital Dönüşüm";
    document.getElementById('heroSubtitle').value = "Modern işletmeler için kapsamlı İSG çözümleri. Yapay zeka destekli yazılımlarımız ve uzman ekibimizle güvenli çalışma ortamları oluşturuyoruz.";
    document.getElementById('customerCount').value = "150";
    document.getElementById('sectorCount').value = "5";
    document.getElementById('supportType').value = "24/7";
    document.getElementById('experienceYears').value = "15";
}

function loadHeroSection() {
    if (data.hero) {
        const heroTitleEl = document.getElementById('heroTitle');
        const heroSubtitleEl = document.getElementById('heroSubtitle');
        const customerCountEl = document.getElementById('customerCount');
        const sectorCountEl = document.getElementById('sectorCount');
        const supportTypeEl = document.getElementById('supportType');
        const experienceYearsEl = document.getElementById('experienceYears');
        
        if (heroTitleEl) heroTitleEl.value = data.hero.title || "İş Sağlığı ve Güvenliği'nde Dijital Dönüşüm";
        if (heroSubtitleEl) heroSubtitleEl.value = data.hero.subtitle || "Modern işletmeler için kapsamlı İSG çözümleri. Yapay zeka destekli yazılımlarımız ve uzman ekibimizle güvenli çalışma ortamları oluşturuyoruz.";
        if (customerCountEl) customerCountEl.value = data.hero.stats?.customers || "150";
        if (sectorCountEl) sectorCountEl.value = data.hero.stats?.sectors || "5";
        if (supportTypeEl) supportTypeEl.value = data.hero.stats?.support || "24/7";
        if (experienceYearsEl) experienceYearsEl.value = data.hero.stats?.experience || "15";
    }
}

function updateHeroOnSite() {
    if (data.hero) {
        // Ana sayfadaki hero başlığı güncelle
        const heroTitleEl = document.querySelector('h1');
        if (heroTitleEl) {
            heroTitleEl.innerHTML = data.hero.title.replace(/\n/g, '<br class="hidden md:block">');
        }
        
        // Alt başlık güncelle
        const heroSubtitleEl = document.querySelector('section h1 + p');
        if (heroSubtitleEl) {
            heroSubtitleEl.textContent = data.hero.subtitle;
        }
        
        // İstatistikleri güncelle
        if (data.hero.stats) {
            const statsElements = document.querySelectorAll('.bg-white.bg-opacity-10 .text-2xl');
            if (statsElements.length >= 4) {
                statsElements[0].textContent = `${data.hero.stats.customers}+`;
                statsElements[1].textContent = `${data.hero.stats.sectors}+`;
                statsElements[2].textContent = data.hero.stats.support;
                statsElements[3].textContent = `${data.hero.stats.experience}+`;
            }
        }
    }
}

// CMS başlangıcında veri boyutunu hesapla
function initCMS() {
    loadData();
    loadHero();
    loadHeroSection();
    loadServices();
    loadProducts();
    loadBlog();
    loadTeam();
    loadSettings();
    loadAboutSection();
    loadContactSection();
    updateDashboardStats();
    calculateDataSize();
    
    // İlk aktiviteyi ekle
    if (activities.length === 0) {
        addActivity('system', 'NEXUS İSG CMS sistemi başlatıldı');
    }
}

// About Section Functions
function saveAboutSection() {
    const aboutDescription = document.getElementById('aboutDescription').value;
    
    if (!data.pageContent) {
        data.pageContent = {};
    }
    
    data.pageContent.about = {
        description: aboutDescription
    };
    
    saveData();
    updateAboutOnSite();
    addActivity('about', 'Hakkımızda bölümü güncellendi');
    showNotification('Hakkımızda bölümü kaydedildi!', 'success');
}

function resetAboutSection() {
    document.getElementById('aboutDescription').value = 'NEXUS İSG olarak, modern teknoloji ile iş sağlığı ve güvenliği alanında devrim yaratıyoruz. Uzman ekibimiz ve gelişmiş yazılım çözümlerimizle işletmelerin güvenli çalışma ortamları oluşturmasına katkıda bulunuyoruz.';
}

function loadAboutSection() {
    if (data.pageContent && data.pageContent.about) {
        const aboutDescriptionEl = document.getElementById('aboutDescription');
        if (aboutDescriptionEl) {
            aboutDescriptionEl.value = data.pageContent.about.description || 'NEXUS İSG olarak, modern teknoloji ile iş sağlığı ve güvenliği alanında devrim yaratıyoruz. Uzman ekibimiz ve gelişmiş yazılım çözümlerimizle işletmelerin güvenli çalışma ortamları oluşturmasına katkıda bulunuyoruz.';
        }
    }
}

function updateAboutOnSite() {
    if (data.pageContent && data.pageContent.about) {
        const aboutEl = document.getElementById('about-description');
        if (aboutEl) {
            aboutEl.textContent = data.pageContent.about.description;
        }
    }
}

// Contact Section Functions
function saveContactSection() {
    const contactDescription = document.getElementById('contactDescription').value;
    
    if (!data.pageContent) {
        data.pageContent = {};
    }
    
    data.pageContent.contact = {
        description: contactDescription
    };
    
    saveData();
    updateContactOnSite();
    addActivity('contact', 'İletişim bölümü güncellendi');
    showNotification('İletişim bölümü kaydedildi!', 'success');
}

function resetContactSection() {
    document.getElementById('contactDescription').value = 'Projeleriniz hakkında konuşmak ve size nasıl yardımcı olabileceğimizi öğrenmek için bizimle iletişime geçin.';
}

function loadContactSection() {
    if (data.pageContent && data.pageContent.contact) {
        const contactDescriptionEl = document.getElementById('contactDescription');
        if (contactDescriptionEl) {
            contactDescriptionEl.value = data.pageContent.contact.description || 'Projeleriniz hakkında konuşmak ve size nasıl yardımcı olabileceğimizi öğrenmek için bizimle iletişime geçin.';
        }
    }
}

function updateContactOnSite() {
    if (data.pageContent && data.pageContent.contact) {
        const contactEl = document.getElementById('contact-description');
        if (contactEl) {
            contactEl.textContent = data.pageContent.contact.description;
        }
    }
}

// CMS başlangıcında veri boyutunu hesapla
function initCMS() {
    loadData();
    loadHero();
    loadServices();
    loadProducts();
    loadBlog();
    loadTeam();
    loadSettings();
    loadAboutSection();
    loadContactSection();
    loadReferences();
    updateDashboardStats();
    calculateDataSize();
    updateStats();
    
    // İlk aktiviteyi ekle
    if (activities.length === 0) {
        addActivity('system', 'NEXUS İSG CMS sistemi başlatıldı');
    }
}

// Section Navigation Functions
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active', 'fade-in');
    }
    
    // Update sidebar active state
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Find and activate the clicked sidebar item
    const activeItem = document.querySelector(`button[onclick="showSection('${sectionName}')"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Placeholder functions for CRUD operations
function addService() {
    openServiceModal();
}

// Service modal functions
function openServiceModal(service = null) {
    const modal = document.getElementById('serviceModal');
    const form = document.getElementById('serviceForm');
    const title = document.getElementById('serviceModalTitle');
    
    if (service) {
        // Edit mode
        title.textContent = 'Hizmeti Düzenle';
        document.getElementById('serviceId').value = service.id;
        document.getElementById('serviceTitle').value = service.title;
        document.getElementById('serviceDescription').value = service.description;
        document.getElementById('serviceIcon').value = service.icon;
        document.getElementById('serviceColor').value = service.color;
        
        // Load features
        const featuresContainer = document.getElementById('serviceFeatures');
        featuresContainer.innerHTML = '';
        service.features.forEach(feature => {
            addFeatureInput(feature);
        });
    } else {
        // Add mode
        title.textContent = 'Yeni Hizmet Ekle';
        form.reset();
        document.getElementById('serviceId').value = '';
        
        // Reset features to default 3 empty inputs
        const featuresContainer = document.getElementById('serviceFeatures');
        featuresContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            addFeatureInput();
        }
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.getElementById('serviceForm').reset();
}

function addFeatureInput(value = '') {
    const featuresContainer = document.getElementById('serviceFeatures');
    const featureDiv = document.createElement('div');
    featureDiv.className = 'flex gap-2 mb-2';
    featureDiv.innerHTML = `
        <input type="text" class="feature-input flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
               placeholder="Yeni özellik" value="${value}">
        <button type="button" onclick="removeFeature(this)" class="text-red-600 hover:text-red-800 px-2">
            <i class="fas fa-times"></i>
        </button>
    `;
    featuresContainer.appendChild(featureDiv);
}

function removeFeature(button) {
    const featuresContainer = document.getElementById('serviceFeatures');
    if (featuresContainer.children.length > 1) {
        button.parentElement.remove();
    }
}

function addProduct() {
    openProductModal();
}

// Product modal functions
function openProductModal(product = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('productModalTitle');
    
    if (product) {
        // Edit mode
        title.textContent = 'Ürünü Düzenle';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price || '';
        document.getElementById('productTarget').value = product.target || '';
        document.getElementById('productIcon').value = product.icon;
        document.getElementById('productColor').value = product.color;
        
        // Load features
        const featuresContainer = document.getElementById('productFeatures');
        featuresContainer.innerHTML = '';
        if (product.features) {
            product.features.forEach(feature => {
                addProductFeature(feature);
            });
        }
    } else {
        // Add mode
        title.textContent = 'Yeni Ürün Ekle';
        form.reset();
        document.getElementById('productId').value = '';
        
        // Reset features to default 3 empty inputs
        const featuresContainer = document.getElementById('productFeatures');
        featuresContainer.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            addProductFeature();
        }
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.getElementById('productForm').reset();
}

function addProductFeature(value = '') {
    const featuresContainer = document.getElementById('productFeatures');
    const featureDiv = document.createElement('div');
    featureDiv.className = 'flex gap-2 items-center';
    featureDiv.innerHTML = `
        <div class="flex-1 relative">
            <input type="text" class="product-feature-input w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm" 
                   placeholder="Ürün özelliği girin..." value="${value}">
            <i class="fas fa-check-circle absolute right-2 top-3 text-green-500 text-xs"></i>
        </div>
        <button type="button" onclick="removeProductFeature(this)" class="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors">
            <i class="fas fa-trash-alt text-xs"></i>
        </button>
    `;
    featuresContainer.appendChild(featureDiv);
    
    // Focus on the new input
    const newInput = featureDiv.querySelector('input');
    newInput.focus();
}

function removeProductFeature(button) {
    const featuresContainer = document.getElementById('productFeatures');
    if (featuresContainer.children.length > 0) {
        button.parentElement.remove();
    }
}

// Product image upload handler
function handleProductImageUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.getElementById('productImage').value = imageUrl;
            showNotification('Görsel yüklendi! Ürünü kaydetmeyi unutmayın.', 'success');
        };
        
        reader.readAsDataURL(file);
    }
}

function addBlogPost() {
    openBlogModal();
}

// Blog modal functions
function openBlogModal(post = null) {
    const modal = document.getElementById('blogModal');
    const form = document.getElementById('blogForm');
    const title = document.getElementById('blogModalTitle');
    
    if (post) {
        // Edit mode
        title.textContent = 'Blog Yazısını Düzenle';
        document.getElementById('blogId').value = post.id;
        document.getElementById('blogTitle').value = post.title;
        document.getElementById('blogCategory').value = post.category || 'İSG';
        document.getElementById('blogAuthor').value = post.author || 'NEXUS İSG Uzmanı';
        document.getElementById('blogReadTime').value = post.readTime || '5 dk';
        document.getElementById('blogImage').value = post.image || '';
        document.getElementById('blogExcerpt').value = post.excerpt;
        document.getElementById('blogContent').value = post.content;
    } else {
        // Add mode
        title.textContent = 'Yeni Blog Yazısı';
        form.reset();
        document.getElementById('blogId').value = '';
        document.getElementById('blogAuthor').value = 'NEXUS İSG Uzmanı';
        document.getElementById('blogReadTime').value = '5 dk';
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.getElementById('blogForm').reset();
}

function addTeamMember() {
    openTeamModal();
}

// Team modal functions
function openTeamModal(member = null) {
    const modal = document.getElementById('teamModal');
    const form = document.getElementById('teamForm');
    const title = document.getElementById('teamModalTitle');
    
    if (member) {
        // Edit mode
        title.textContent = 'Ekip Üyesini Düzenle';
        document.getElementById('teamId').value = member.id;
        document.getElementById('teamName').value = member.name;
        document.getElementById('teamPosition').value = member.position;
        document.getElementById('teamEmail').value = member.email || '';
        document.getElementById('teamPhone').value = member.phone || '';
        document.getElementById('teamImage').value = member.image || '';
        document.getElementById('teamLinkedIn').value = member.linkedin || '';
        document.getElementById('teamBio').value = member.bio || '';
        
        // Load specialties
        const specialtiesContainer = document.getElementById('teamSpecialties');
        specialtiesContainer.innerHTML = '';
        if (member.specialties) {
            member.specialties.forEach(specialty => {
                addTeamSpecialty(specialty);
            });
        }
    } else {
        // Add mode
        title.textContent = 'Yeni Ekip Üyesi';
        form.reset();
        document.getElementById('teamId').value = '';
        
        // Reset specialties to default 2 empty inputs
        const specialtiesContainer = document.getElementById('teamSpecialties');
        specialtiesContainer.innerHTML = '';
        for (let i = 0; i < 2; i++) {
            addTeamSpecialty();
        }
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeTeamModal() {
    const modal = document.getElementById('teamModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.getElementById('teamForm').reset();
}

function addTeamSpecialty(value = '') {
    const specialtiesContainer = document.getElementById('teamSpecialties');
    const specialtyDiv = document.createElement('div');
    specialtyDiv.className = 'flex gap-2 mb-2';
    specialtyDiv.innerHTML = `
        <input type="text" class="team-specialty-input flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
               placeholder="Uzmanlık alanı" value="${value}">
        <button type="button" onclick="removeTeamSpecialty(this)" class="text-red-600 hover:text-red-800 px-2">
            <i class="fas fa-times"></i>
        </button>
    `;
    specialtiesContainer.appendChild(specialtyDiv);
}

function removeTeamSpecialty(button) {
    const specialtiesContainer = document.getElementById('teamSpecialties');
    if (specialtiesContainer.children.length > 1) {
        button.parentElement.remove();
    }
}

function addReference() {
    console.log('addReference called');
    openReferenceModal();
}

// Make sure function is globally accessible
window.addReference = addReference;

// Reference modal functions
function openReferenceModal(reference = null) {
    const modal = document.getElementById('referenceModal');
    const form = document.getElementById('referenceForm');
    
    if (!modal) {
        console.error('Reference modal not found!');
        showNotification('Modal bulunamadı!', 'error');
        return;
    }
    
    if (!form) {
        console.error('Reference form not found!');
        showNotification('Form bulunamadı!', 'error');
        return;
    }
    
    // Clear form and reset state
    form.reset();
    
    // Clear services container
    const servicesContainer = document.getElementById('referenceServices');
    
    if (servicesContainer) {
        servicesContainer.innerHTML = '';
    }
    
    // Add one empty service field by default
    addReferenceService();
    
    // Update modal title based on mode
    const modalTitle = document.querySelector('#referenceModal h2');
    if (modalTitle) {
        modalTitle.textContent = reference ? 'Referansı Düzenle' : 'Yeni Referans Ekle';
    }
    
    // Show modal
    modal.classList.remove('hidden');
}

function closeReferenceModal() {
    const modal = document.getElementById('referenceModal');
    modal.classList.add('hidden');
}

function addReferenceService(value = '') {
    const servicesContainer = document.getElementById('referenceServices');
    
    if (!servicesContainer) {
        console.error('Reference services container not found!');
        return;
    }
    
    const serviceDiv = document.createElement('div');
    serviceDiv.className = 'service-item flex gap-2 items-center';
    serviceDiv.innerHTML = `
        <div class="flex-1 relative">
            <input type="text" class="reference-service-input w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm" 
                   placeholder="Hizmet/ürün adı..." value="${value}">
            <i class="fas fa-check-circle absolute right-2 top-3 text-pink-500 text-xs"></i>
        </div>
        <button type="button" onclick="removeReferenceService(this)" class="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors">
            <i class="fas fa-trash-alt text-xs"></i>
        </button>
    `;
    servicesContainer.appendChild(serviceDiv);
    
    // Focus on the new input
    const newInput = serviceDiv.querySelector('input');
    if (newInput) {
        newInput.focus();
    }
}

function removeReferenceService(button) {
    const servicesContainer = document.getElementById('referenceServices');
    if (servicesContainer.children.length > 0) {
        button.parentElement.remove();
    }
}

function clearReferenceServices() {
    const servicesContainer = document.getElementById('referenceServices');
    servicesContainer.innerHTML = '';
}

// Reference logo upload handler
function handleReferenceLogoUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const logoUrl = e.target.result;
            document.getElementById('referenceLogo').value = logoUrl;
            showNotification('Logo yüklendi! Referansı kaydetmeyi unutmayın.', 'success');
        };
        
        reader.readAsDataURL(file);
    }
}

// Demo referansları ekleme fonksiyonu
function loadDemoReferences() {
    const demoReferences = [
        {
            id: 'ref-001',
            companyName: 'Türk Telekom',
            sector: 'Telekomünikasyon', 
            logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop',
            description: 'Çalışan güvenliği sistemleri ve İSG eğitimleri',
            year: '2023'
        },
        {
            id: 'ref-002',
            companyName: 'Arçelik',
            sector: 'Beyaz Eşya',
            logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop',
            description: 'Fabrika güvenlik sistemleri ve risk değerlendirmesi',
            year: '2023'
        },
        {
            id: 'ref-003', 
            companyName: 'THY Teknik',
            sector: 'Havacılık',
            logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop',
            description: 'Havacılık sektörü İSG danışmanlığı',
            year: '2022'
        }
    ];
    
    const existingReferences = JSON.parse(localStorage.getItem('nexusISGReferences') || '[]');
    if (existingReferences.length === 0) {
        localStorage.setItem('nexusISGReferences', JSON.stringify(demoReferences));
        loadReferences();
        updateStats();
        showNotification('Demo referanslar yüklendi!', 'success');
    } else {
        showNotification('Referanslar zaten mevcut!', 'info');
    }
}

// Update dashboard statistics
function updateStats() {
    // Update service count
    const totalServices = document.getElementById('totalServices');
    if (totalServices) {
        totalServices.textContent = cmsData.services.length;
    }
    
    // Update product count  
    const totalProducts = document.getElementById('totalProducts');
    if (totalProducts) {
        totalProducts.textContent = cmsData.products ? cmsData.products.length : 0;
    }
    
    // Update blog posts count
    const totalBlogPosts = document.getElementById('totalBlogPosts');
    if (totalBlogPosts) {
        totalBlogPosts.textContent = cmsData.blogPosts ? cmsData.blogPosts.length : 0;
    }
    
    // Update team members count
    const totalTeamMembers = document.getElementById('totalTeamMembers');
    if (totalTeamMembers) {
        totalTeamMembers.textContent = cmsData.team ? cmsData.team.length : 0;
    }
    
    // Update references count
    const totalReferences = document.getElementById('totalReferences');
    if (totalReferences) {
        totalReferences.textContent = cmsData.references ? cmsData.references.length : 0;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('nexusISGAuth');
    localStorage.removeItem('nexusISGRememberMe');
    window.location.href = 'login.html';
}

// Load references from localStorage
function loadReferences() {
    const referencesList = document.getElementById('referencesList');
    if (!referencesList) return;
    
    const references = cmsData.references || [];
    
    if (references.length === 0) {
        referencesList.innerHTML = '<p class="text-gray-500 text-center py-8">Henüz referans eklenmemiş.</p>';
        return;
    }
    
    const referencesHTML = references.map(ref => `
        <div class="bg-gray-50 rounded-lg p-4 border">
            <div class="flex items-center justify-between">
                <div class="flex items-start space-x-4">
                    ${ref.logo ? `
                        <img src="${ref.logo}" 
                             alt="${ref.companyName}" 
                             class="w-16 h-16 object-cover rounded-lg bg-white border">
                    ` : `
                        <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-building text-blue-600 text-xl"></i>
                        </div>
                    `}
                    <div class="flex-1">
                        <div class="flex items-start justify-between">
                            <div>
                                <h4 class="font-semibold text-gray-800">${ref.companyName}</h4>
                                <p class="text-sm text-gray-600 mb-1">
                                    <i class="fas fa-industry mr-1"></i>${ref.sector}
                                </p>
                                ${ref.employeeCount ? `
                                    <p class="text-sm text-gray-600 mb-1">
                                        <i class="fas fa-users mr-1"></i>${ref.employeeCount} Çalışan
                                    </p>
                                ` : ''}
                                <p class="text-sm text-gray-600 mb-2 line-clamp-2">
                                    ${ref.projectDescription}
                                </p>
                                <div class="flex items-center gap-2 mb-2">
                                    ${ref.startDate ? `
                                        <span class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                            ${new Date(ref.startDate).getFullYear()}
                                        </span>
                                    ` : ''}
                                    <span class="inline-block text-xs px-2 py-1 rounded ${
                                        ref.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        ref.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }">
                                        ${ref.status === 'completed' ? 'Tamamlandı' :
                                          ref.status === 'ongoing' ? 'Devam Ediyor' :
                                          'Planlanan'}
                                    </span>
                                </div>
                                ${ref.services && ref.services.length > 0 ? `
                                    <div class="flex flex-wrap gap-1">
                                        ${ref.services.slice(0, 3).map(service => `
                                            <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                ${service}
                                            </span>
                                        `).join('')}
                                        ${ref.services.length > 3 ? `
                                            <span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                +${ref.services.length - 3}
                                            </span>
                                        ` : ''}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col space-y-2">
                    <button onclick="editReference('${ref.id}')" 
                            class="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50"
                            title="Düzenle">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="confirmDeleteReference('${ref.id}')" 
                            class="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50"
                            title="Sil">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    referencesList.innerHTML = referencesHTML;
}

function editReference(id) {
    const reference = cmsData.references?.find(r => r.id == id);
    if (!reference) {
        showNotification('Referans bulunamadı!', 'error');
        return;
    }
    
    // Open modal and fill with reference data
    openReferenceModal();
    
    // Wait for modal to be ready
    setTimeout(() => {
        const form = document.getElementById('referenceForm');
        if (!form) return;
        
        // Fill form fields
        form.querySelector('[name="referenceId"]').value = reference.id;
        form.querySelector('[name="companyName"]').value = reference.companyName || '';
        form.querySelector('[name="sector"]').value = reference.sector || '';
        form.querySelector('[name="employeeCount"]').value = reference.employeeCount || '';
        form.querySelector('[name="contactPerson"]').value = reference.contactPerson || '';
        form.querySelector('[name="contactEmail"]').value = reference.contactEmail || '';
        form.querySelector('[name="contactPhone"]').value = reference.contactPhone || '';
        form.querySelector('[name="projectDescription"]').value = reference.projectDescription || '';
        form.querySelector('[name="startDate"]').value = reference.startDate || '';
        form.querySelector('[name="endDate"]').value = reference.endDate || '';
        form.querySelector('[name="status"]').value = reference.status || 'planned';
        form.querySelector('[name="logoUrl"]').value = reference.logo && !reference.logo.startsWith('data:') ? reference.logo : '';
        
        // Fill services
        const servicesContainer = document.getElementById('referenceServices');
        servicesContainer.innerHTML = '';
        if (reference.services && reference.services.length > 0) {
            reference.services.forEach(service => {
                addReferenceService(service);
            });
        } else {
            addReferenceService();
        }
        
        // Logo will be shown from the URL field
        
        // Update modal title
        const modalTitle = document.querySelector('#referenceModal h2');
        if (modalTitle) {
            modalTitle.textContent = 'Referansı Düzenle';
        }
        
    }, 100);
}

function confirmDeleteReference(id) {
    if (confirm('Bu referansı silmek istediğinize emin misiniz?')) {
        deleteReference(id);
    }
}

function deleteReference(id) {
    if (!cmsData.references) {
        showNotification('Referans bulunamadı!', 'error');
        return;
    }
    
    const referenceIndex = cmsData.references.findIndex(r => r.id == id);
    if (referenceIndex === -1) {
        showNotification('Referans bulunamadı!', 'error');
        return;
    }
    
    cmsData.references.splice(referenceIndex, 1);
    saveData();
    loadReferences();
    updateStats();
    showNotification('Referans başarıyla silindi!', 'success');
    
    // Trigger content update event for main website
    window.dispatchEvent(new CustomEvent('cmsDataUpdated'));
}

// Load services for admin panel
function loadServices() {
    const servicesList = document.getElementById('servicesList');
    if (!servicesList) return;
    
    if (!cmsData.services || cmsData.services.length === 0) {
        servicesList.innerHTML = '<p class="text-gray-500 text-center py-8">Henüz hizmet eklenmemiş.</p>';
        return;
    }
    
    const servicesHTML = cmsData.services.map(service => `
        <div class="bg-gray-50 rounded-lg p-4 border">
            <div class="flex items-center justify-between">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-${service.color}-100 flex items-center justify-center">
                        <i class="${service.icon} text-${service.color}-600"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-800">${service.title}</h4>
                        <p class="text-sm text-gray-600 mb-2">${service.description}</p>
                        <div class="flex flex-wrap gap-1">
                            ${service.features.map(feature => `
                                <span class="inline-block bg-${service.color}-100 text-${service.color}-800 text-xs px-2 py-1 rounded-full">
                                    ${feature}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="editService(${service.id})" 
                            class="text-blue-600 hover:text-blue-800 p-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteService(${service.id})" 
                            class="text-red-600 hover:text-red-800 p-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    servicesList.innerHTML = servicesHTML;
}

// Edit service function
function editService(id) {
    const service = cmsData.services.find(s => s.id === id);
    if (!service) return;
    
    openServiceModal(service);
}

// Delete service function
function deleteService(id) {
    if (confirm('Bu hizmeti silmek istediğinize emin misiniz?')) {
        cmsData.services = cmsData.services.filter(service => service.id !== id);
        saveData();
        loadServices();
        updateStats();
        showNotification('Hizmet başarıyla silindi!', 'success');
    }
}

// Load products for admin panel
function loadProducts() {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;
    
    if (!cmsData.products || cmsData.products.length === 0) {
        productsList.innerHTML = '<p class="text-gray-500 text-center py-8">Henüz ürün eklenmemiş.</p>';
        return;
    }
    
    const productsHTML = cmsData.products.map(product => `
        <div class="bg-gray-50 rounded-lg p-4 border">
            <div class="flex items-center justify-between">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-${product.color}-100 flex items-center justify-center">
                        <i class="${product.icon} text-${product.color}-600"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-800">${product.name}</h4>
                        <p class="text-sm text-gray-600 mb-1">${product.description}</p>
                        <p class="text-sm text-${product.color}-600 font-medium">${product.price || 'Fiyat belirtilmemiş'}</p>
                        <p class="text-xs text-gray-500 mb-2">${product.target || ''}</p>
                        <div class="flex flex-wrap gap-1">
                            ${(product.features || []).map(feature => `
                                <span class="inline-block bg-${product.color}-100 text-${product.color}-800 text-xs px-2 py-1 rounded-full">
                                    ${feature}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="editProduct(${product.id})" 
                            class="text-blue-600 hover:text-blue-800 p-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteProduct(${product.id})" 
                            class="text-red-600 hover:text-red-800 p-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    productsList.innerHTML = productsHTML;
}

function editProduct(id) {
    const product = cmsData.products.find(p => p.id === id);
    if (!product) return;
    
    openProductModal(product);
}

function deleteProduct(id) {
    if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
        cmsData.products = cmsData.products.filter(product => product.id !== id);
        saveData();
        loadProducts();
        updateStats();
        showNotification('Ürün başarıyla silindi!', 'success');
    }
}

// Load blog posts for admin panel
function loadBlog() {
    const blogList = document.getElementById('blogList');
    if (!blogList) return;
    
    if (!cmsData.blogPosts || cmsData.blogPosts.length === 0) {
        blogList.innerHTML = '<p class="text-gray-500 text-center py-8">Henüz blog yazısı eklenmemiş.</p>';
        return;
    }
    
    const blogHTML = cmsData.blogPosts.map(post => `
        <div class="bg-gray-50 rounded-lg p-4 border">
            <div class="flex items-center justify-between">
                <div class="flex items-start space-x-4">
                    <img src="${post.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=80&h=60&fit=crop'}" 
                         alt="${post.title}" class="w-16 h-12 object-cover rounded">
                    <div>
                        <h4 class="font-semibold text-gray-800">${post.title}</h4>
                        <p class="text-sm text-gray-600 mb-1">${post.excerpt}</p>
                        <div class="flex items-center gap-4 text-xs text-gray-500">
                            <span><i class="fas fa-tag mr-1"></i>${post.category || 'İSG'}</span>
                            <span><i class="fas fa-user mr-1"></i>${post.author || 'NEXUS İSG'}</span>
                            <span><i class="fas fa-clock mr-1"></i>${post.readTime || '5 dk'}</span>
                            <span><i class="fas fa-calendar mr-1"></i>${post.date || new Date().toLocaleDateString('tr-TR')}</span>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="editBlogPost(${post.id})" 
                            class="text-blue-600 hover:text-blue-800 p-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteBlogPost(${post.id})" 
                            class="text-red-600 hover:text-red-800 p-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    blogList.innerHTML = blogHTML;
}

function editBlogPost(id) {
    const post = cmsData.blogPosts.find(p => p.id === id);
    if (!post) return;
    
    openBlogModal(post);
}

function deleteBlogPost(id) {
    if (confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
        cmsData.blogPosts = cmsData.blogPosts.filter(post => post.id !== id);
        saveData();
        loadBlog();
        updateStats();
        showNotification('Blog yazısı başarıyla silindi!', 'success');
    }
}

// Load team members for admin panel
function loadTeam() {
    const teamList = document.getElementById('teamList');
    if (!teamList) return;
    
    if (!cmsData.team || cmsData.team.length === 0) {
        teamList.innerHTML = '<p class="text-gray-500 text-center py-8">Henüz ekip üyesi eklenmemiş.</p>';
        return;
    }
    
    const teamHTML = cmsData.team.map(member => `
        <div class="bg-gray-50 rounded-lg p-4 border">
            <div class="flex items-center justify-between">
                <div class="flex items-start space-x-4">
                    <img src="${member.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'}" 
                         alt="${member.name}" class="w-12 h-12 object-cover rounded-full">
                    <div>
                        <h4 class="font-semibold text-gray-800">${member.name}</h4>
                        <p class="text-sm text-blue-600 font-medium mb-1">${member.position}</p>
                        <p class="text-sm text-gray-600 mb-2">${member.bio || 'Biyografi eklenmemiş'}</p>
                        <div class="flex items-center gap-4 text-xs text-gray-500 mb-2">
                            ${member.email ? `<span><i class="fas fa-envelope mr-1"></i>${member.email}</span>` : ''}
                            ${member.phone ? `<span><i class="fas fa-phone mr-1"></i>${member.phone}</span>` : ''}
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${(member.specialties || []).map(specialty => `
                                <span class="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                    ${specialty}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="editTeamMember(${member.id})" 
                            class="text-blue-600 hover:text-blue-800 p-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteTeamMember(${member.id})" 
                            class="text-red-600 hover:text-red-800 p-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    teamList.innerHTML = teamHTML;
}

function editTeamMember(id) {
    const member = cmsData.team.find(m => m.id === id);
    if (!member) return;
    
    openTeamModal(member);
}

function deleteTeamMember(id) {
    if (confirm('Bu ekip üyesini silmek istediğinize emin misiniz?')) {
        cmsData.team = cmsData.team.filter(member => member.id !== id);
        saveData();
        loadTeam();
        updateStats();
        showNotification('Ekip üyesi başarıyla silindi!', 'success');
    }
}

// Load demo services function
function loadDemoServices() {
    if (confirm('Demo hizmetler eklensin mi? Bu işlem mevcut hizmetleri etkilemez.')) {
        const demoServices = [
            {
                id: Date.now() + 1,
                title: "İSG Danışmanlığı",
                description: "Profesyonel İSG uzmanlarımız tarafından kapsamlı danışmanlık hizmeti.",
                icon: "fas fa-user-tie",
                color: "indigo",
                features: [
                    "Yasal mevzuat danışmanlığı",
                    "İSG yönetim sistemi kurulumu",
                    "Periyodik değerlendirmeler"
                ]
            },
            {
                id: Date.now() + 2,
                title: "Acil Durum Planları",
                description: "İşletmeniz için özel acil durum müdahale planları hazırlıyoruz.",
                icon: "fas fa-exclamation-triangle",
                color: "red",
                features: [
                    "Yangın acil durum planı",
                    "Deprem acil durum planı",
                    "Personel eğitimi ve tatbikatlar"
                ]
            },
            {
                id: Date.now() + 3,
                title: "İSG Ölçümleri",
                description: "Çalışma ortamı ölçümleri ve analiz raporları.",
                icon: "fas fa-chart-bar",
                color: "orange",
                features: [
                    "Gürültü ölçümü",
                    "Aydınlatma ölçümü",
                    "Hava kalitesi analizi"
                ]
            }
        ];
        
        // Add demo services to existing services
        demoServices.forEach(service => {
            cmsData.services.push(service);
        });
        
        saveData();
        loadServices();
        updateStats();
        showNotification(`${demoServices.length} demo hizmet eklendi!`, 'success');
    }
}

// Handle service form submission
document.addEventListener('DOMContentLoaded', function() {
    if (checkAuthentication()) {
        initCMS();
    }
    
    // Service form handler
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const serviceId = formData.get('serviceId');
            const title = formData.get('title');
            const description = formData.get('description');
            const icon = formData.get('icon');
            const color = formData.get('color');
            
            // Get features
            const featureInputs = document.querySelectorAll('.feature-input');
            const features = Array.from(featureInputs)
                .map(input => input.value.trim())
                .filter(value => value !== '');
            
            if (features.length === 0) {
                showNotification('En az bir özellik eklemelisiniz!', 'error');
                return;
            }
            
            if (serviceId) {
                // Update existing service
                const service = cmsData.services.find(s => s.id == serviceId);
                if (service) {
                    service.title = title;
                    service.description = description;
                    service.icon = icon;
                    service.color = color;
                    service.features = features;
                    
                    saveData();
                    loadServices();
                    updateStats();
                    showNotification('Hizmet başarıyla güncellendi!', 'success');
                }
            } else {
                // Add new service
                const newService = {
                    id: Date.now(),
                    title: title,
                    description: description,
                    icon: icon,
                    color: color,
                    features: features
                };
                
                cmsData.services.push(newService);
                saveData();
                loadServices();
                updateStats();
                showNotification('Hizmet başarıyla eklendi!', 'success');
            }
            
            closeServiceModal();
        });
    }
    
    // Close modal when clicking outside
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal) {
        serviceModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeServiceModal();
            }
        });
    }
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeServiceModal();
        }
    });
});

// Demo data functions
function loadDemoProducts() {
    const demoProducts = [
        {
            id: Date.now(),
            name: 'İş Güvenliği Eğitimi',
            description: 'Çalışanlarınız için kapsamlı iş güvenliği eğitim programı',
            price: '2.500 TL/Kişi',
            target: 'Tüm sektörler için uygun',
            color: 'blue',
            icon: 'fas fa-graduation-cap',
            features: ['Sertifikalı Eğitim', 'Uzaktan Eğitim Seçeneği', 'Pratik Uygulamalar', '24/7 Destek']
        },
        {
            id: Date.now() + 1,
            name: 'Risk Analizi Hizmeti',
            description: 'İşyerinizdeki risklerin detaylı analizi ve çözüm önerileri',
            price: '5.000 TL',
            target: 'Orta ve büyük ölçekli işletmeler',
            color: 'red',
            icon: 'fas fa-exclamation-triangle',
            features: ['Detaylı Rapor', 'Çözüm Önerileri', 'Takip Hizmeti', 'Yasal Uyumluluk']
        },
        {
            id: Date.now() + 2,
            name: 'İSG Danışmanlığı',
            description: 'Sürekli İSG danışmanlık hizmeti ve yasal uyumluluk desteği',
            price: '3.000 TL/Ay',
            target: 'Sürekli destek isteyen firmalar',
            color: 'green',
            icon: 'fas fa-handshake',
            features: ['Aylık Ziyaret', 'Telefon Desteği', 'Doküman Hazırlama', 'Yasal Takip']
        }
    ];
    
    cmsData.products = [...(cmsData.products || []), ...demoProducts];
    saveData();
    loadProducts();
    updateStats();
    showNotification('Demo ürünler başarıyla eklendi!', 'success');
}

function loadDemoBlogPosts() {
    const demoPosts = [
        {
            id: Date.now(),
            title: 'İş Güvenliğinde Yeni Düzenlemeler 2024',
            excerpt: 'Bu yıl yürürlüğe giren yeni iş güvenliği düzenlemeleri ve işverenlere getirdikleri yükümlülükler...',
            content: '<h3>Yeni Düzenlemeler</h3><p>2024 yılında iş güvenliği alanında önemli değişiklikler yaşandı. Bu yazımızda en önemli değişiklikleri sizler için derledik.</p>',
            category: 'Yasal Düzenlemeler',
            author: 'Ahmet Yılmaz',
            readTime: '8 dk',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
            date: new Date().toLocaleDateString('tr-TR')
        },
        {
            id: Date.now() + 1,
            title: 'Çalışan Sağlığını Koruma Yöntemleri',
            excerpt: 'İşyerinde çalışan sağlığını korumak için alınabilecek önlemler ve uygulamalı çözümler...',
            content: '<h3>Sağlık Önlemleri</h3><p>Çalışan sağlığı her işverenin önceliği olmalıdır. Bu yazımızda pratik çözümler sunuyoruz.</p>',
            category: 'Sağlık',
            author: 'Dr. Ayşe Kaya',
            readTime: '6 dk',
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
            date: new Date().toLocaleDateString('tr-TR')
        },
        {
            id: Date.now() + 2,
            title: 'İnşaat Sektöründe İSG Uygulamaları',
            excerpt: 'İnşaat sektörünün kendine özgü riskleri ve alınması gereken özel güvenlik önlemleri...',
            content: '<h3>İnşaat Güvenliği</h3><p>İnşaat sektörü yüksek riskli sektörlerden biridir. Doğru önlemlerle riskleri minimize etmek mümkündür.</p>',
            category: 'Sektörel',
            author: 'Murat Öz',
            readTime: '10 dk',
            image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400&h=250&fit=crop',
            date: new Date().toLocaleDateString('tr-TR')
        }
    ];
    
    cmsData.blogPosts = [...(cmsData.blogPosts || []), ...demoPosts];
    saveData();
    loadBlog();
    updateStats();
    showNotification('Demo blog yazıları başarıyla eklendi!', 'success');
}

function loadDemoTeamMembers() {
    const demoTeam = [
        {
            id: Date.now(),
            name: 'Ahmet Yılmaz',
            position: 'İSG Uzmanı',
            email: 'ahmet@nexusisg.com',
            phone: '+90 555 123 4567',
            bio: '10 yıllık deneyimle İSG alanında uzman. İnşaat ve imalat sektörlerinde çok sayıda proje yürütmüştür.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            linkedin: 'https://linkedin.com/in/ahmetyilmaz',
            specialties: ['Risk Analizi', 'İnşaat İSG', 'Eğitim', 'Danışmanlık']
        },
        {
            id: Date.now() + 1,
            name: 'Dr. Ayşe Kaya',
            position: 'İş Hekimi',
            email: 'ayse@nexusisg.com',
            phone: '+90 555 234 5678',
            bio: 'İş Hekimliği alanında 8 yıllık deneyim. Çalışan sağlığı ve meslek hastalıkları konusunda uzman.',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
            linkedin: 'https://linkedin.com/in/aysekaya',
            specialties: ['İş Hekimliği', 'Meslek Hastalıkları', 'Sağlık Taramaları', 'Rehabilitasyon']
        },
        {
            id: Date.now() + 2,
            name: 'Murat Öz',
            position: 'İSG Teknisyeni',
            email: 'murat@nexusisg.com',
            phone: '+90 555 345 6789',
            bio: 'Saha deneyimi yüksek İSG teknisyeni. Özellikle imalat sektöründe uzman, pratik çözümler üretir.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            linkedin: 'https://linkedin.com/in/muratoz',
            specialties: ['Saha Denetimleri', 'İmalat İSG', 'Ekipman Kontrolü', 'Acil Durum Planları']
        }
    ];
    
    cmsData.team = [...(cmsData.team || []), ...demoTeam];
    saveData();
    loadTeam();
    updateStats();
    showNotification('Demo ekip üyeleri başarıyla eklendi!', 'success');
}

// File upload handlers
function handleProductImageUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const preview = document.getElementById('productImagePreview');
            const upload = document.getElementById('productImageUpload');
            const display = document.getElementById('productImageDisplay');
            const name = document.getElementById('productImageName');
            
            display.src = e.target.result;
            name.textContent = file.name;
            
            preview.classList.remove('hidden');
            upload.classList.add('hidden');
        };
        
        reader.readAsDataURL(file);
    }
}

function handleBlogImageUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const preview = document.getElementById('blogImagePreview');
            const upload = document.getElementById('blogImageUpload');
            const display = document.getElementById('blogImageDisplay');
            const name = document.getElementById('blogImageName');
            
            display.src = e.target.result;
            name.textContent = file.name;
            
            preview.classList.remove('hidden');
            upload.classList.add('hidden');
        };
        
        reader.readAsDataURL(file);
    }
}

function handleTeamImageUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const preview = document.getElementById('teamImagePreview');
            const upload = document.getElementById('teamImageUpload');
            const display = document.getElementById('teamImageDisplay');
            const name = document.getElementById('teamImageName');
            
            display.src = e.target.result;
            name.textContent = file.name;
            
            preview.classList.remove('hidden');
            upload.classList.add('hidden');
        };
        
        reader.readAsDataURL(file);
    }
}

// Initialize drag and drop for file uploads
function initializeDragAndDrop() {
    const dropZones = [
        { selector: '#productModal .border-dashed', inputId: 'productImage', handler: handleProductImageUpload },
        { selector: '#blogModal .border-dashed', inputId: 'blogImage', handler: handleBlogImageUpload },
        { selector: '#teamModal .border-dashed', inputId: 'teamImage', handler: handleTeamImageUpload }
    ];
    
    dropZones.forEach(zone => {
        const dropArea = document.querySelector(zone.selector);
        if (dropArea) {
            // Prevent default drag behaviors
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false);
            });
            
            // Highlight drop area when item is dragged over it
            ['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, () => {
                    dropArea.classList.add('border-blue-400', 'bg-blue-50');
                }, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, () => {
                    dropArea.classList.remove('border-blue-400', 'bg-blue-50');
                }, false);
            });
            
            // Handle dropped files
            dropArea.addEventListener('drop', (e) => {
                const dt = e.dataTransfer;
                const files = dt.files;
                
                if (files.length > 0 && files[0].type.startsWith('image/')) {
                    const input = document.getElementById(zone.inputId);
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(files[0]);
                    input.files = dataTransfer.files;
                    zone.handler(input);
                }
            }, false);
        }
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Enhanced modal opening functions with drag and drop
function openProductModalWithDragDrop(product = null) {
    openProductModal(product);
    setTimeout(initializeDragAndDrop, 100);
}

function openBlogModalWithDragDrop(post = null) {
    openBlogModal(post);
    setTimeout(initializeDragAndDrop, 100);
}

function openTeamModalWithDragDrop(member = null) {
    openTeamModal(member);
    setTimeout(initializeDragAndDrop, 100);
}

// Form submit handlers
document.addEventListener('DOMContentLoaded', function() {
    // Product form submit
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProductSubmit();
        });
    }
    
    // Blog form submit
    const blogForm = document.getElementById('blogForm');
    if (blogForm) {
        blogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBlogSubmit();
        });
    }
    
    // Team form submit
    const teamForm = document.getElementById('teamForm');
    if (teamForm) {
        teamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleTeamSubmit();
        });
    }
    
    // Reference form submit
    const referenceForm = document.getElementById('referenceForm');
    if (referenceForm) {
        referenceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleReferenceSubmit();
        });
    }
});

function handleReferenceSubmit() {
    const form = document.getElementById('referenceForm');
    const formData = new FormData(form);
    
    const reference = {
        id: formData.get('referenceId') || Date.now(),
        companyName: formData.get('companyName'),
        sector: formData.get('sector'),
        employeeCount: formData.get('employeeCount'),
        contactPerson: formData.get('contactPerson'),
        contactEmail: formData.get('contactEmail'),
        contactPhone: formData.get('contactPhone'),
        projectDescription: formData.get('projectDescription'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        status: formData.get('status'),
        services: []
    };
    
    // Get services
    const serviceElements = document.querySelectorAll('#referenceServices .service-item input');
    serviceElements.forEach(input => {
        if (input.value.trim()) {
            reference.services.push(input.value.trim());
        }
    });
    
    // Get logo if uploaded
    const logoInput = document.getElementById('referenceLogo');
    if (logoInput.files && logoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            reference.logo = e.target.result;
            saveReference(reference);
        };
        reader.readAsDataURL(logoInput.files[0]);
    } else {
        // Check if logo URL is provided
        const logoUrl = formData.get('logoUrl');
        if (logoUrl && logoUrl.trim()) {
            reference.logo = logoUrl.trim();
        }
        saveReference(reference);
    }
}

function saveReference(reference) {
    if (!cmsData.references) cmsData.references = [];
    
    const existingIndex = cmsData.references.findIndex(r => r.id == reference.id);
    if (existingIndex > -1) {
        cmsData.references[existingIndex] = reference;
        showNotification('Referans başarıyla güncellendi!', 'success');
    } else {
        cmsData.references.push(reference);
        showNotification('Referans başarıyla eklendi!', 'success');
    }
    
    saveData();
    loadReferences();
    updateStats();
    closeReferenceModal();
    
    // Trigger content update event for main website
    window.dispatchEvent(new CustomEvent('cmsDataUpdated'));
}

// Handle form submissions
function handleProductSubmit() {
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    
    const product = {
        id: formData.get('productId') || Date.now(),
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        target: formData.get('target'),
        category: formData.get('category'),
        tags: formData.get('tags'),
        color: formData.get('color'),
        icon: formData.get('icon'),
        image: formData.get('image') || '',
        features: []
    };
    
    // Get features from all input fields
    const featureInputs = document.querySelectorAll('#productFeatures .product-feature-input');
    featureInputs.forEach(input => {
        if (input.value.trim()) {
            product.features.push(input.value.trim());
        }
    });
    
    // Validation
    if (!product.name || !product.description) {
        showNotification('Lütfen zorunlu alanları doldurun!', 'error');
        return;
    }
    
    if (product.features.length === 0) {
        showNotification('En az bir ürün özelliği eklemelisiniz!', 'warning');
        return;
    }
    
    saveProduct(product);
}

function saveProduct(product) {
    if (!cmsData.products) cmsData.products = [];
    
    const existingIndex = cmsData.products.findIndex(p => p.id == product.id);
    if (existingIndex > -1) {
        cmsData.products[existingIndex] = product;
        showNotification('Ürün başarıyla güncellendi!', 'success');
    } else {
        cmsData.products.push(product);
        showNotification('Ürün başarıyla eklendi!', 'success');
    }
    
    saveData();
    loadProducts();
    updateStats();
    closeProductModal();
}

function handleBlogSubmit() {
    const form = document.getElementById('blogForm');
    const formData = new FormData(form);
    
    const post = {
        id: formData.get('blogId') || Date.now(),
        title: formData.get('title'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        category: formData.get('category'),
        author: formData.get('author') || 'NEXUS İSG',
        readTime: formData.get('readTime') || '5 dk',
        date: new Date().toLocaleDateString('tr-TR')
    };
    
    // Get image if uploaded
    const imageInput = document.getElementById('blogImage');
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            post.image = e.target.result;
            saveBlogPost(post);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveBlogPost(post);
    }
}

function saveBlogPost(post) {
    if (!cmsData.blogPosts) cmsData.blogPosts = [];
    
    const existingIndex = cmsData.blogPosts.findIndex(p => p.id == post.id);
    if (existingIndex > -1) {
        cmsData.blogPosts[existingIndex] = post;
        showNotification('Blog yazısı başarıyla güncellendi!', 'success');
    } else {
        cmsData.blogPosts.push(post);
        showNotification('Blog yazısı başarıyla eklendi!', 'success');
    }
    
    saveData();
    loadBlog();
    updateStats();
    closeBlogModal();
}

function handleTeamSubmit() {
    const form = document.getElementById('teamForm');
    const formData = new FormData(form);
    
    const member = {
        id: formData.get('teamId') || Date.now(),
        name: formData.get('name'),
        position: formData.get('position'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        bio: formData.get('bio'),
        linkedin: formData.get('linkedin'),
        specialties: []
    };
    
    // Get specialties
    const specialtyElements = document.querySelectorAll('#teamSpecialties .specialty-item input');
    specialtyElements.forEach(input => {
        if (input.value.trim()) {
            member.specialties.push(input.value.trim());
        }
    });
    
    // Get image if uploaded
    const imageInput = document.getElementById('teamImage');
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            member.image = e.target.result;
            saveTeamMember(member);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveTeamMember(member);
    }
}

function saveTeamMember(member) {
    if (!cmsData.team) cmsData.team = [];
    
    const existingIndex = cmsData.team.findIndex(m => m.id == member.id);
    if (existingIndex > -1) {
        cmsData.team[existingIndex] = member;
        showNotification('Ekip üyesi başarıyla güncellendi!', 'success');
    } else {
        cmsData.team.push(member);
        showNotification('Ekip üyesi başarıyla eklendi!', 'success');
    }
    
    saveData();
    loadTeam();
    updateStats();
    closeTeamModal();
}