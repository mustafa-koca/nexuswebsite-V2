// Dynamic Content Loader for NEXUS İSG Website
// This script loads content from CMS data to display on the main website

// Prevent flash/flicker: hide company name elements on initial paint
(function hideCompanyNamesOnStart(){
    try {
        const els = document.querySelectorAll('[data-company-name],[data-company-name-footer]');
        if (!els || els.length === 0) return;
        els.forEach(el => {
            // keep transforms but hide opacity until JS sets final text & layout
            el.style.opacity = '0';
            el.style.transition = 'opacity 120ms linear';
            // hint to browser to optimize
            el.style.willChange = 'opacity, transform';
        });

        // Safety fallback: if JS doesn't reveal them within 800ms, show anyway
        window.__unhideCompanyNamesFallback = setTimeout(() => {
            els.forEach(el => el.style.opacity = '1');
            window.__unhideCompanyNamesFallback = null;
        }, 800);
    } catch (e) {
        // ignore errors during initial hide
        console.warn('hideCompanyNamesOnStart error', e);
    }
})();

// Centralized reveal function - call this after JS updates company name elements
function unhideCompanyNames() {
    try {
        const els = document.querySelectorAll('[data-company-name],[data-company-name-footer]');
        if (!els || els.length === 0) return;

        // Clear fallback if set
        if (window.__unhideCompanyNamesFallback) {
            clearTimeout(window.__unhideCompanyNamesFallback);
            window.__unhideCompanyNamesFallback = null;
        }

        // Force a tiny timeout to ensure DOM writes have flushed, then reveal
        setTimeout(() => {
            els.forEach(el => {
                el.style.opacity = '1';
            });
        }, 20);
    } catch (e) {
        console.warn('unhideCompanyNames error', e);
    }
}

// Load services from CMS data
function loadServicesFromCMS() {
    const servicesContainer = document.getElementById('services-container');
    if (!servicesContainer) return;

    // Get services from localStorage or use default data
    let services = [];
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        services = cmsData.services || [];
    } catch (e) {
        console.error('Error loading services data:', e);
    }

    // If no services in CMS, use default services
    if (services.length === 0) {
        services = [
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
        ];
    }

    // Generate HTML for services
    const servicesHTML = services.map(service => `
        <div class="bg-white rounded-lg shadow-lg p-6 card-hover">
            <div class="w-16 h-16 bg-${service.color}-100 rounded-lg flex items-center justify-center mb-4">
                <i class="${service.icon} text-${service.color}-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">${service.title}</h3>
            <p class="text-gray-600 mb-4">${service.description}</p>
            <ul class="space-y-2">
                ${service.features.map(feature => `
                    <li class="flex items-center text-sm text-gray-700">
                        <i class="fas fa-check text-${service.color}-600 mr-2"></i>
                        ${feature}
                    </li>
                `).join('')}
            </ul>
            <div class="mt-6">
                <button onclick="openContactModal('${service.title}')" 
                        class="w-full bg-${service.color}-600 text-white py-2 px-4 rounded-lg hover:bg-${service.color}-700 transition duration-300">
                    Detaylı Bilgi Al
                </button>
            </div>
        </div>
    `).join('');

    servicesContainer.innerHTML = servicesHTML;
}

// Load products from CMS data
function loadProductsFromCMS() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    // Get products from localStorage or use default data
    let products = [];
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        products = cmsData.products || [];
    } catch (e) {
        console.error('Error loading products data:', e);
    }

    // If no products in CMS, show empty state with add button
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-span-full text-center py-16 bg-white rounded-lg shadow-lg">
                <div class="max-w-md mx-auto">
                    <i class="fas fa-box-open text-gray-300 text-6xl mb-6"></i>
                    <h3 class="text-2xl font-bold text-gray-700 mb-3">Henüz Ürün Eklenmemiş</h3>
                    <p class="text-gray-500 mb-6">İSG yazılım ürünlerinizi CMS üzerinden kolayca ekleyebilirsiniz.</p>
                    <a href="admin.html" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        <i class="fas fa-plus mr-2"></i>
                        İlk Ürünü Ekle
                    </a>
                </div>
            </div>
        `;
        return;
    }

    // Generate HTML for products with enhanced features
    const productsHTML = products.map((product, index) => {
        // Parse features if it's a string
        let features = [];
        if (typeof product.features === 'string') {
            features = product.features.split('\n').filter(f => f.trim());
        } else if (Array.isArray(product.features)) {
            features = product.features;
        }

        // Determine product color based on index or use provided color
        const colors = ['blue', 'green', 'purple', 'indigo', 'pink', 'yellow'];
        const productColor = product.color || colors[index % colors.length];
        
        // Determine icon based on product name or use provided icon
        let productIcon = product.icon || 'fas fa-cog';
        if (product.name.toLowerCase().includes('pro')) productIcon = 'fas fa-crown';
        if (product.name.toLowerCase().includes('kobi') || product.name.toLowerCase().includes('kobİ')) productIcon = 'fas fa-building';
        if (product.name.toLowerCase().includes('mobile') || product.name.toLowerCase().includes('mobil')) productIcon = 'fas fa-mobile-alt';

        return `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                <!-- Product Header -->
                <div class="bg-gradient-to-r from-${productColor}-500 to-${productColor}-600 p-6 text-white">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                                <i class="${productIcon} text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold">${product.name}</h3>
                                ${product.price ? `<p class="text-${productColor}-100 font-semibold">${product.price}</p>` : ''}
                            </div>
                        </div>
                        ${product.popular ? '<span class="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">Popüler</span>' : ''}
                    </div>
                </div>

                <!-- Product Content -->
                <div class="p-6">
                    <p class="text-gray-600 mb-4 leading-relaxed">${product.description}</p>
                    
                    ${product.target ? `
                        <div class="bg-gray-50 rounded-lg p-3 mb-6">
                            <p class="text-sm text-gray-700">
                                <i class="fas fa-users text-${productColor}-600 mr-2"></i>
                                <strong>Hedef Kitle:</strong> ${product.target}
                            </p>
                        </div>
                    ` : ''}

                    ${features.length > 0 ? `
                        <div class="mb-6">
                            <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                                <i class="fas fa-star text-${productColor}-600 mr-2"></i>
                                Öne Çıkan Özellikler
                            </h4>
                            <ul class="space-y-2">
                                ${features.slice(0, 6).map(feature => `
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-${productColor}-600 mr-3 mt-1 flex-shrink-0"></i>
                                        <span class="text-gray-700 text-sm">${feature.trim()}</span>
                                    </li>
                                `).join('')}
                                ${features.length > 6 ? `
                                    <li class="text-sm text-gray-500 italic">
                                        +${features.length - 6} diğer özellik...
                                    </li>
                                ` : ''}
                            </ul>
                        </div>
                    ` : ''}

                    <!-- Action Buttons -->
                    <div class="space-y-3">
                        <button onclick="openContactModal('${product.name}')" 
                                class="w-full bg-${productColor}-600 text-white py-3 px-6 rounded-lg hover:bg-${productColor}-700 transition duration-300 flex items-center justify-center">
                            <i class="fas fa-play mr-2"></i>
                            Ücretsiz Demo Al
                        </button>
                        <div class="grid grid-cols-2 gap-3">
                            <button onclick="showProductDetails(${product.id || index})" 
                                    class="border-2 border-${productColor}-600 text-${productColor}-600 py-2 px-4 rounded-lg hover:bg-${productColor}-50 transition duration-300 text-sm">
                                <i class="fas fa-info-circle mr-1"></i>
                                Detaylar
                            </button>
                            <button onclick="openContactModal('${product.name} - Video Görüşme')" 
                                    class="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300 text-sm">
                                <i class="fas fa-video mr-1"></i>
                                Video Call
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Product Footer -->
                ${product.category || product.tags ? `
                    <div class="px-6 py-3 bg-gray-50 border-t">
                        <div class="flex flex-wrap gap-2">
                            ${product.category ? `
                                <span class="bg-${productColor}-100 text-${productColor}-800 text-xs px-2 py-1 rounded-full">
                                    ${product.category}
                                </span>
                            ` : ''}
                            ${product.tags ? product.tags.split(',').map(tag => `
                                <span class="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                                    ${tag.trim()}
                                </span>
                            `).join('') : ''}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');

    productsContainer.innerHTML = productsHTML;
}

// Load blog posts from CMS data
function loadBlogFromCMS() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;

    // Get blog posts from localStorage or use default data
    let blogPosts = [];
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        blogPosts = cmsData.blogPosts || [];
    } catch (e) {
        console.error('Error loading blog data:', e);
    }

    // If no blog posts in CMS, show enhanced empty state
    if (blogPosts.length === 0) {
        blogContainer.innerHTML = `
            <div class="col-span-full text-center py-8">
                <p class="text-gray-500">Henüz blog yazısı eklenmemiş.</p>
            </div>
        `;
        return;
    }

    // Sort blog posts by date (newest first)
    const sortedBlogPosts = blogPosts.sort((a, b) => {
        const dateA = new Date(a.date || '2024-01-01');
        const dateB = new Date(b.date || '2024-01-01');
        return dateB - dateA;
    });

    // Use the render function for consistency
    renderBlogPosts(sortedBlogPosts.slice(0, 6));
    return;
    
    // Generate HTML for blog posts (show first 6) - LEGACY CODE
    const blogHTML = sortedBlogPosts.slice(0, 6).map((post, index) => {
        // Default image based on category or use provided image
        let defaultImage = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop';
        if (post.category) {
            const categoryImages = {
                'İSG': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
                'Teknoloji': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
                'Eğitim': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop',
                'Yasal': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop',
                'Güvenlik': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
            };
            defaultImage = categoryImages[post.category] || defaultImage;
        }

        // Calculate read time based on content length
        const wordCount = (post.content || post.excerpt || '').split(' ').length;
        const readTime = post.readTime || `${Math.max(2, Math.ceil(wordCount / 200))} dk`;

        // Category colors
        const categoryColors = {
            'İSG': 'blue',
            'Teknoloji': 'green',
            'Eğitim': 'purple',
            'Yasal': 'red',
            'Güvenlik': 'orange',
            'Haber': 'indigo'
        };
        const categoryColor = categoryColors[post.category] || 'blue';

        return `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover group">
                <!-- Blog Image -->
                <div class="relative overflow-hidden">
                    <img src="${post.image || defaultImage}" 
                         alt="${post.title}" 
                         class="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                         onerror="this.src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop'">
                    
                    <!-- Category Badge -->
                    <div class="absolute top-4 left-4">
                        <span class="bg-${categoryColor}-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                            ${post.category || 'İSG'}
                        </span>
                    </div>
                    
                    <!-- Reading Time -->
                    <div class="absolute top-4 right-4">
                        <span class="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                            <i class="fas fa-clock mr-1"></i>${readTime}
                        </span>
                    </div>
                </div>

                <!-- Blog Content -->
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-3 line-clamp-2 group-hover:text-${categoryColor}-600 transition duration-300">
                        ${post.title}
                    </h3>
                    
                    <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        ${post.excerpt || post.content?.substring(0, 120) + '...' || 'Bu blog yazısının özeti henüz eklenmemiş.'}
                    </p>

                    <!-- Tags -->
                    ${post.tags ? `
                        <div class="flex flex-wrap gap-1 mb-4">
                            ${post.tags.split(',').slice(0, 3).map(tag => `
                                <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                    #${tag.trim()}
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}

                    <!-- Author & Date -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-${categoryColor}-100 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-user text-${categoryColor}-600 text-sm"></i>
                            </div>
                            <div class="text-sm">
                                <div class="font-medium text-gray-900">${post.author || 'NEXUS İSG'}</div>
                                <div class="text-gray-500">${formatDate(post.date)}</div>
                            </div>
                        </div>
                        
                        <!-- Like & Share -->
                        <div class="flex items-center space-x-3">
                            <button class="text-gray-400 hover:text-red-500 transition duration-200" onclick="toggleLike(${post.id || index})">
                                <i class="fas fa-heart text-sm"></i>
                            </button>
                            <button class="text-gray-400 hover:text-blue-500 transition duration-200" onclick="shareBlogPost('${post.title}')">
                                <i class="fas fa-share-alt text-sm"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Read More Button -->
                    <button onclick="openBlogPost(${post.id || index})" 
                            class="w-full bg-gradient-to-r from-${categoryColor}-500 to-${categoryColor}-600 text-white py-3 px-4 rounded-lg hover:from-${categoryColor}-600 hover:to-${categoryColor}-700 transition duration-300 flex items-center justify-center group">
                        <span class="mr-2">Devamını Oku</span>
                        <i class="fas fa-arrow-right group-hover:translate-x-1 transition duration-300"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Add "See All Blog Posts" button if there are more than 6 posts
    const seeAllButton = blogPosts.length > 6 ? `
        <div class="col-span-full text-center mt-8">
            <button onclick="showAllBlogPosts()" 
                    class="inline-flex items-center px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300">
                <i class="fas fa-th-list mr-2"></i>
                Tüm Blog Yazılarını Gör (${blogPosts.length} yazı)
            </button>
        </div>
    ` : '';

    blogContainer.innerHTML = blogHTML + seeAllButton;
}

// Load team members from CMS data
function loadTeamFromCMS() {
    const teamContainer = document.getElementById('team-container');
    if (!teamContainer) return;

    // Get team members from localStorage or use default data
    let teamMembers = [];
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        teamMembers = cmsData.team || [];
    } catch (e) {
        console.error('Error loading team data:', e);
    }

    // If no team members in CMS, show empty state
    if (teamMembers.length === 0) {
        teamContainer.innerHTML = `
            <div class="flex-shrink-0 w-full text-center py-12">
                <i class="fas fa-users text-gray-300 text-6xl mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">Ekip bilgileri güncelleniyor</h3>
                <p class="text-gray-500">Yakında uzman ekibimizi tanıtacağız.</p>
            </div>
        `;
        return;
    }

    // Generate HTML for team members with responsive width for slider
    const teamHTML = teamMembers.map(member => `
        <div class="flex-shrink-0 w-80 sm:w-72 md:w-80 bg-white rounded-lg shadow-lg p-6 text-center card-hover">
            <img src="${member.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'}" 
                 alt="${member.name}" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover">
            <h3 class="text-xl font-bold mb-2">${member.name}</h3>
            <p class="text-blue-600 font-medium mb-3">${member.position}</p>
            <p class="text-gray-600 text-sm mb-4">${member.bio || 'İSG alanında uzman'}</p>
            
            ${member.specialties ? `
                <div class="flex flex-wrap justify-center gap-1 mb-4">
                    ${member.specialties.map(specialty => `
                        <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">${specialty}</span>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="flex justify-center space-x-3">
                ${member.email ? `
                    <a href="mailto:${member.email}" class="text-gray-400 hover:text-blue-600">
                        <i class="fas fa-envelope"></i>
                    </a>
                ` : ''}
                ${member.phone ? `
                    <a href="tel:${member.phone}" class="text-gray-400 hover:text-blue-600">
                        <i class="fas fa-phone"></i>
                    </a>
                ` : ''}
                ${member.linkedin ? `
                    <a href="${member.linkedin}" target="_blank" class="text-gray-400 hover:text-blue-600">
                        <i class="fab fa-linkedin"></i>
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');

    teamContainer.innerHTML = teamHTML;
    
    // Initialize team slider after loading
    initializeTeamSlider();
}

// Show loading state for containers
function showLoadingState(containerId, type = 'grid') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let skeletonHTML = '';
    if (type === 'products') {
        skeletonHTML = `
            <div class="grid lg:grid-cols-2 gap-8">
                ${Array(2).fill(0).map(() => `
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden skeleton-card">
                        <div class="bg-gray-200 h-32"></div>
                        <div class="p-6">
                            <div class="bg-gray-200 h-6 rounded mb-4"></div>
                            <div class="bg-gray-200 h-4 rounded mb-2"></div>
                            <div class="bg-gray-200 h-4 rounded w-3/4"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (type === 'blog') {
        skeletonHTML = `
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${Array(3).fill(0).map(() => `
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden skeleton-card">
                        <div class="bg-gray-200 h-48"></div>
                        <div class="p-6">
                            <div class="bg-gray-200 h-6 rounded mb-3"></div>
                            <div class="bg-gray-200 h-4 rounded mb-2"></div>
                            <div class="bg-gray-200 h-4 rounded w-2/3"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        skeletonHTML = `
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${Array(3).fill(0).map(() => `
                    <div class="bg-white rounded-lg shadow-lg p-6 skeleton-card">
                        <div class="bg-gray-200 h-16 w-16 rounded-lg mb-4"></div>
                        <div class="bg-gray-200 h-6 rounded mb-3"></div>
                        <div class="bg-gray-200 h-4 rounded mb-2"></div>
                        <div class="bg-gray-200 h-4 rounded w-3/4"></div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    container.innerHTML = skeletonHTML;
}

// Enhanced error handling
function showErrorState(containerId, errorMessage, actionButton = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="col-span-full text-center py-16">
            <div class="bg-white rounded-lg shadow-lg p-12 max-w-md mx-auto">
                <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-exclamation-triangle text-red-600 text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-700 mb-3">Bir Hata Oluştu</h3>
                <p class="text-gray-500 mb-6">${errorMessage}</p>
                ${actionButton ? `
                    <button onclick="${actionButton.action}" 
                            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        <i class="fas fa-refresh mr-2"></i>
                        ${actionButton.text}
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}

// Initialize dynamic content loading
document.addEventListener('DOMContentLoaded', function() {
    // Show loading states initially
    showLoadingState('services-container');
    showLoadingState('products-container', 'products');
    showLoadingState('blog-container', 'blog');
    showLoadingState('team-container');
    showLoadingState('references-container', 'references');
    
    // Load all dynamic content with error handling
    setTimeout(() => {
        try {
            loadHeroFromCMS(); // Load hero section
            loadServicesFromCMS();
            loadProductsFromCMS();
            loadBlogFromCMS();
            loadTeamFromCMS();
            loadReferencesFromCMS();
            loadSocialMediaFromCMS();
            loadContactInfoFromCMS();
            loadStatsFromCMS();
            loadSiteSettingsFromCMS();
        } catch (error) {
            console.error('Error loading dynamic content:', error);
        }
    }, 500); // Small delay to show loading states
    
    // Listen for CMS data updates (both custom events and storage changes)
    window.addEventListener('cmsDataUpdated', function(e) {
        console.log('CMS data updated event received, refreshing content...');
        loadSiteSettingsFromCMS();
        loadHeroFromCMS(); // Refresh hero section
        
        // Refresh specific sections if needed
        if (e.detail?.section === 'hero') {
            loadHeroFromCMS();
            loadStatsFromCMS();
        }
    });
    
    // Listen for storage changes (when data is updated in another tab)
    window.addEventListener('storage', function(e) {
        if (e.key === 'nexus-isg-cms-data') {
            console.log('CMS data changed in storage, refreshing site settings...');
            setTimeout(() => {
                loadSiteSettingsFromCMS();
            }, 100); // Kısa bir gecikme ile
        }
    });
    
    // Listen for custom storage events
    window.addEventListener('storageUpdate', function(e) {
        if (e.detail && e.detail.key === 'nexus-isg-cms-data') {
            console.log('Storage update event received, refreshing site settings...');
            loadSiteSettingsFromCMS();
        }
    });
    
    // Test event listener
    console.log('CMS event listeners registered successfully');
    
    // Refresh content every 30 seconds to sync with CMS changes
    setInterval(function() {
        try {
            loadServicesFromCMS();
            loadProductsFromCMS();
            loadBlogFromCMS();
            loadTeamFromCMS();
            loadReferencesFromCMS();
            loadSocialMediaFromCMS();
            loadContactInfoFromCMS();
            loadStatsFromCMS();
            loadSiteSettingsFromCMS();
        } catch (e) {
            console.warn('Periodic refresh error:', e);
        }
    }, 30000);

// Helper functions for products and blog

// Format date in Turkish format
function formatDate(dateString) {
    if (!dateString) return new Date().toLocaleDateString('tr-TR');
    try {
        return new Date(dateString).toLocaleDateString('tr-TR');
    } catch (e) {
        return new Date().toLocaleDateString('tr-TR');
    }
}

// Show product details in modal
window.showProductDetails = function(productId) {
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        const products = cmsData.products || [];
        const product = products.find(p => p.id === productId) || products[productId];
        
        if (!product) {
            showNotification('Ürün bulunamadı!', 'error');
            return;
        }

        // Create and show product details modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                    <h3 class="text-2xl font-bold">${product.name}</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div class="p-6">
                    <div class="mb-6">
                        <p class="text-gray-600 leading-relaxed">${product.description}</p>
                        ${product.price ? `<p class="text-2xl font-bold text-blue-600 mt-4">${product.price}</p>` : ''}
                    </div>
                    
                    ${product.features ? `
                        <div class="mb-6">
                            <h4 class="text-lg font-semibold mb-3">Tüm Özellikler</h4>
                            <ul class="space-y-2">
                                ${(typeof product.features === 'string' ? product.features.split('\n') : product.features).map(feature => `
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-600 mr-3 mt-1"></i>
                                        <span>${feature.trim()}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div class="flex gap-3">
                        <button onclick="openContactModal('${product.name}')" 
                                class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                            Demo Talep Et
                        </button>
                        <button onclick="this.closest('.fixed').remove()" 
                                class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300">
                            Kapat
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === this) this.remove();
        });
    } catch (e) {
        console.error('Error showing product details:', e);
        showNotification('Ürün detayları yüklenirken hata oluştu!', 'error');
    }
};

// Open blog post in modal
window.openBlogPost = function(postId) {
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        const blogPosts = cmsData.blogPosts || [];
        const post = blogPosts.find(p => p.id === postId) || blogPosts[postId];
        
        if (!post) {
            showNotification('Blog yazısı bulunamadı!', 'error');
            return;
        }

        // Create and show blog post modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] overflow-y-auto">
                <div class="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                    <div class="flex items-center">
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                            ${post.category || 'İSG'}
                        </span>
                        <span class="text-gray-500 text-xs">${formatDate(post.date)}</span>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-lg"></i>
                    </button>
                </div>
                
                ${post.image ? `
                    <img src="${post.image}" alt="${post.title}" class="w-full h-40 md:h-48 object-cover">
                ` : ''}
                
                <div class="p-4 md:p-6">
                    <h1 class="text-xl md:text-2xl font-bold mb-3">${post.title}</h1>
                    
                    <div class="flex items-center mb-4">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <i class="fas fa-user text-blue-600 text-sm"></i>
                        </div>
                        <div>
                            <div class="font-medium text-sm">${post.author || 'NEXUS İSG'}</div>
                            <div class="text-xs text-gray-500">${formatDate(post.date)}</div>
                        </div>
                    </div>
                    
                    <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                        ${post.content ? post.content.replace(/\n/g, '<br>') : post.excerpt || 'İçerik henüz eklenmemiş.'}
                    </div>
                    
                    ${post.tags ? `
                        <div class="mt-4 pt-4 border-t">
                            <div class="flex flex-wrap gap-1">
                                ${post.tags.split(',').map(tag => `
                                    <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                        #${tag.trim()}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div class="flex space-x-4">
                            <button onclick="toggleLike(${postId})" class="text-gray-500 hover:text-red-500 transition duration-200 text-sm">
                                <i class="far fa-heart mr-1"></i> Beğen
                            </button>
                            <button onclick="shareBlogPost('${post.title}')" class="text-gray-500 hover:text-blue-500 transition duration-200 text-sm">
                                <i class="fas fa-share-alt mr-1"></i> Paylaş
                            </button>
                        </div>
                        <button onclick="this.closest('.fixed').remove()" 
                                class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition duration-300">
                            <i class="fas fa-times mr-1"></i>Kapat
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === this) this.remove();
        });
    } catch (e) {
        console.error('Error opening blog post:', e);
        showNotification('Blog yazısı açılırken hata oluştu!', 'error');
    }
};

// Toggle like for blog post
window.toggleLike = function(postId) {
    // Simulated like functionality
    const button = event.target.closest('button');
    const icon = button.querySelector('i');
    
    if (icon.classList.contains('fas')) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.classList.remove('text-red-500');
        button.classList.add('text-gray-400');
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.classList.remove('text-gray-400');
        button.classList.add('text-red-500');
    }
};

// Share blog post
window.shareBlogPost = function(title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'NEXUS İSG blog yazısını okuyun',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link panoya kopyalandı!', 'success');
        }).catch(() => {
            showNotification('Paylaşım linki: ' + url, 'info');
        });
    }
};

// Blog filter functionality
window.filterBlogPosts = function(category) {
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        let blogPosts = cmsData.blogPosts || [];
        
        // Filter posts by category
        if (category !== 'all') {
            blogPosts = blogPosts.filter(post => post.category === category);
        }
        
        // Update active filter button
        document.querySelectorAll('.blog-filter-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        });
        
        event.target.classList.add('active', 'bg-blue-600', 'text-white');
        event.target.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        
        // Re-render blog posts with filtered data
        renderBlogPosts(blogPosts);
    } catch (e) {
        console.error('Error filtering blog posts:', e);
    }
};

// Blog search functionality
window.searchBlogPosts = function(searchTerm) {
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        let blogPosts = cmsData.blogPosts || [];
        
        const clearBtn = document.getElementById('clear-search-btn');
        if (searchTerm.trim()) {
            clearBtn.classList.remove('hidden');
            const term = searchTerm.toLowerCase();
            blogPosts = blogPosts.filter(post => 
                post.title.toLowerCase().includes(term) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(term)) ||
                (post.content && post.content.toLowerCase().includes(term)) ||
                (post.tags && post.tags.toLowerCase().includes(term))
            );
        } else {
            clearBtn.classList.add('hidden');
        }
        
        // Re-render blog posts with search results
        renderBlogPosts(blogPosts, searchTerm.trim() ? `"${searchTerm}" için ${blogPosts.length} sonuç` : null);
    } catch (e) {
        console.error('Error searching blog posts:', e);
    }
};

// Render blog posts (extracted from loadBlogFromCMS for reusability)
function renderBlogPosts(blogPosts, searchInfo = null) {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;
    
    // Show search results info
    if (searchInfo) {
        const searchResultsInfo = document.getElementById('search-results-info') || 
            (() => {
                const div = document.createElement('div');
                div.id = 'search-results-info';
                div.className = 'mb-6 text-center text-gray-600';
                blogContainer.parentNode.insertBefore(div, blogContainer);
                return div;
            })();
        searchResultsInfo.innerHTML = `<p class="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-lg inline-block">${searchInfo}</p>`;
    } else {
        const existingInfo = document.getElementById('search-results-info');
        if (existingInfo) existingInfo.remove();
    }
    
    if (blogPosts.length === 0) {
        blogContainer.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="bg-white rounded-lg shadow-lg p-12 max-w-lg mx-auto">
                    <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-search text-blue-600 text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-700 mb-3">Sonuç Bulunamadı</h3>
                    <p class="text-gray-500 mb-6">Aradığınız kriterlere uygun blog yazısı bulunmuyor.</p>
                    <button onclick="clearBlogFilters()" 
                            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        <i class="fas fa-refresh mr-2"></i>
                        Filtreleri Temizle
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    // Generate HTML for filtered blog posts
    const sortedBlogPosts = blogPosts.sort((a, b) => {
        const dateA = new Date(a.date || '2024-01-01');
        const dateB = new Date(b.date || '2024-01-01');
        return dateB - dateA;
    });

    const blogHTML = sortedBlogPosts.slice(0, 9).map((post, index) => {
        // Default image based on category or use provided image
        let defaultImage = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop';
        if (post.category) {
            const categoryImages = {
                'İSG': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
                'Teknoloji': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
                'Eğitim': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop',
                'Yasal': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop',
                'Güvenlik': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
            };
            defaultImage = categoryImages[post.category] || defaultImage;
        }

        const wordCount = (post.content || post.excerpt || '').split(' ').length;
        const readTime = post.readTime || `${Math.max(2, Math.ceil(wordCount / 200))} dk`;

        const categoryColors = {
            'İSG': 'blue',
            'Teknoloji': 'green',
            'Eğitim': 'purple',
            'Yasal': 'red',
            'Güvenlik': 'orange',
            'Haber': 'indigo'
        };
        const categoryColor = categoryColors[post.category] || 'blue';

        return `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover group blog-card" data-category="${post.category || 'İSG'}">
                <div class="relative overflow-hidden">
                    <img src="${post.image || defaultImage}" 
                         alt="${post.title}" 
                         class="w-full h-40 md:h-44 object-cover group-hover:scale-110 transition duration-500"
                         onerror="this.src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop'">
                    
                    <div class="blog-image-overlay"></div>
                    
                    <div class="absolute top-3 left-3">
                        <span class="bg-${categoryColor}-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            ${post.category || 'İSG'}
                        </span>
                    </div>
                    
                    <div class="absolute top-3 right-3">
                        <span class="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                            <i class="fas fa-clock mr-1"></i>${readTime}
                        </span>
                    </div>
                </div>

                <div class="p-4 md:p-5">
                    <h3 class="text-lg md:text-xl font-bold mb-2 line-clamp-2 group-hover:text-${categoryColor}-600 transition duration-300">
                        ${post.title}
                    </h3>
                    
                    <p class="text-gray-600 mb-3 line-clamp-2 text-sm leading-relaxed">
                        ${post.excerpt || post.content?.substring(0, 100) + '...' || 'Bu blog yazısının özeti henüz eklenmemiş.'}
                    </p>

                    ${post.tags ? `
                        <div class="flex flex-wrap gap-1 mb-3">
                            ${post.tags.split(',').slice(0, 2).map(tag => `
                                <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                    #${tag.trim()}
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}

                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center">
                            <div class="w-7 h-7 bg-${categoryColor}-100 rounded-full flex items-center justify-center mr-2">
                                <i class="fas fa-user text-${categoryColor}-600 text-xs"></i>
                            </div>
                            <div class="text-xs">
                                <div class="font-medium text-gray-900">${post.author || 'NEXUS İSG'}</div>
                                <div class="text-gray-500">${formatDate(post.date)}</div>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <button class="text-gray-400 hover:text-red-500 transition duration-200" onclick="toggleLike(${post.id || index})">
                                <i class="far fa-heart text-sm"></i>
                            </button>
                            <button class="text-gray-400 hover:text-blue-500 transition duration-200" onclick="shareBlogPost('${post.title}')">
                                <i class="fas fa-share-alt text-sm"></i>
                            </button>
                        </div>
                    </div>

                    <button onclick="openBlogPost(${post.id || index})" 
                            class="w-full bg-gradient-to-r from-${categoryColor}-500 to-${categoryColor}-600 text-white py-2 px-4 rounded-lg hover:from-${categoryColor}-600 hover:to-${categoryColor}-700 transition duration-300 flex items-center justify-center group text-sm">
                        <span class="mr-2">Devamını Oku</span>
                        <i class="fas fa-arrow-right group-hover:translate-x-1 transition duration-300"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    blogContainer.innerHTML = blogHTML;
}

// Clear blog search
window.clearBlogSearch = function() {
    document.getElementById('blog-search').value = '';
    document.getElementById('clear-search-btn').classList.add('hidden');
    loadBlogFromCMS();
};

// Clear blog filters
window.clearBlogFilters = function() {
    document.getElementById('blog-search').value = '';
    document.getElementById('clear-search-btn').classList.add('hidden');
    
    // Reset filter buttons
    document.querySelectorAll('.blog-filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-blue-600', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    document.querySelector('.blog-filter-btn').classList.add('active', 'bg-blue-600', 'text-white');
    document.querySelector('.blog-filter-btn').classList.remove('bg-gray-100', 'text-gray-700');
    
    // Hide filter info
    document.getElementById('active-filter-info').classList.add('hidden');
    
    loadBlogFromCMS();
};

// Show all blog posts
window.showAllBlogPosts = function() {
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        const blogPosts = cmsData.blogPosts || [];
        
        // Create and show all blog posts modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
                <div class="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                    <h3 class="text-lg md:text-xl font-bold">Tüm Blog Yazıları (${blogPosts.length})</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-lg"></i>
                    </button>
                </div>
                <div class="p-4 md:p-6">
                    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${blogPosts.map((post, index) => `
                            <div class="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition duration-200 cursor-pointer" 
                                 onclick="this.closest('.fixed').remove(); openBlogPost(${post.id || index});">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                        ${post.category || 'İSG'}
                                    </span>
                                    <span class="text-gray-500 text-xs">${formatDate(post.date)}</span>
                                </div>
                                <h4 class="font-semibold text-sm mb-2 line-clamp-2">${post.title}</h4>
                                <p class="text-gray-600 text-xs line-clamp-2">
                                    ${post.excerpt || post.content?.substring(0, 80) + '...' || 'Özet mevcut değil'}
                                </p>
                                <div class="mt-2 flex items-center text-xs text-gray-500">
                                    <i class="fas fa-user mr-1"></i>
                                    <span>${post.author || 'NEXUS İSG'}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === this) this.remove();
        });
    } catch (e) {
        console.error('Error showing all blog posts:', e);
        showNotification('Blog yazıları yüklenirken hata oluştu!', 'error');
    }
};

// Load references from CMS data
function loadReferencesFromCMS() {
    const referencesContainer = document.getElementById('references-container');
    if (!referencesContainer) return;

    let references = [];
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        references = cmsData.references || [];
        console.log('Loading references from CMS:', references);
    } catch (e) {
        console.error('Error loading references data:', e);
    }

    if (references.length === 0) {
        referencesContainer.innerHTML = `
            <div class="col-span-full text-center py-8">
                <div class="mb-4">
                    <p class="text-gray-500">Henüz referans eklenmemiş.</p>
                </div>
                <button onclick="clearTestReferences()" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                    <i class="fas fa-trash mr-2"></i>Test Verilerini Temizle
                </button>
            </div>
        `;
        return;
    }

    // Create 4-card carousel structure  
    const slides = [];
    for (let i = 0; i < references.length; i += 4) {
        slides.push(references.slice(i, i + 4));
    }
    
    referencesContainer.innerHTML = `
        <div class="relative w-full">
            <!-- Carousel wrapper -->
            <div class="overflow-hidden relative">
                <div id="referenceCarousel" class="flex transition-transform duration-500 ease-in-out">
                    ${slides.map((slideRefs, slideIndex) => `
                        <div class="min-w-full flex-shrink-0 px-2">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                ${slideRefs.map(reference => `
                                    <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
                                        <!-- Logo ve Başlık -->
                                        <div class="flex items-center mb-3">
                                            ${reference.logo ? `
                                                <img src="${reference.logo}" alt="${reference.companyName}" 
                                                     class="w-10 h-10 object-contain mr-3 rounded border">
                                            ` : `
                                                <div class="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                                                    <i class="fas fa-building text-blue-600 text-sm"></i>
                                                </div>
                                            `}
                                            <div class="flex-1 min-w-0">
                                                <h3 class="font-semibold text-sm text-gray-800 truncate">${reference.companyName}</h3>
                                                <p class="text-xs text-gray-600 truncate">${reference.sector}</p>
                                            </div>
                                        </div>
                                        
                                        <!-- Status Badge -->
                                        <div class="mb-3">
                                            <span class="inline-block text-xs px-2 py-1 rounded-full ${
                                                reference.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                reference.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }">
                                                ${reference.status === 'completed' ? 'Tamamlandı' :
                                                  reference.status === 'ongoing' ? 'Devam Ediyor' :
                                                  'Planlanan'}
                                            </span>
                                        </div>
                                        
                                        <!-- Proje Açıklaması -->
                                        <p class="text-gray-700 text-xs mb-3 line-clamp-2 leading-4">
                                            ${reference.projectDescription}
                                        </p>
                                        
                                        <!-- Bilgiler -->
                                        <div class="flex justify-between text-xs text-gray-600 mb-3">
                                            <div class="flex items-center">
                                                <i class="fas fa-users text-blue-600 mr-1"></i>
                                                <span>${reference.employeeCount}</span>
                                            </div>
                                            <div class="flex items-center">
                                                <i class="fas fa-calendar text-blue-600 mr-1"></i>
                                                <span>${reference.startDate ? new Date(reference.startDate).getFullYear() : 'N/A'}</span>
                                            </div>
                                        </div>
                                        
                                        <!-- Hizmetler -->
                                        ${reference.services && reference.services.length > 0 ? `
                                            <div class="mb-3">
                                                <div class="flex flex-wrap gap-1">
                                                    ${reference.services.slice(0, 2).map(service => `
                                                        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                            ${service}
                                                        </span>
                                                    `).join('')}
                                                    ${reference.services.length > 2 ? `
                                                        <span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                            +${reference.services.length - 2}
                                                        </span>
                                                    ` : ''}
                                                </div>
                                            </div>
                                        ` : ''}
                                        
                                        <!-- Detay Butonu -->
                                        <button onclick="showReferenceDetails('${reference.id}')" 
                                                class="w-full bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors text-xs font-medium">
                                            <i class="fas fa-info-circle mr-1"></i>Detaylar
                                        </button>
                                    </div>
                                `).join('')}
                                
                                <!-- Boş kartlar (4'lü grup tamamlaması için) -->
                                ${slideRefs.length < 4 ? Array(4 - slideRefs.length).fill().map(() => `
                                    <div class="hidden lg:block"></div>
                                `).join('') : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Carousel controls -->
            ${slides.length > 1 ? `
                <button id="prevRef" class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all z-10">
                    <i class="fas fa-chevron-left text-gray-600"></i>
                </button>
                <button id="nextRef" class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all z-10">
                    <i class="fas fa-chevron-right text-gray-600"></i>
                </button>
                
                <!-- Carousel indicators -->
                <div class="flex justify-center mt-4 space-x-2">
                    ${slides.map((_, index) => `
                        <button class="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-500 transition-all carousel-indicator" data-slide="${index}"></button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    // Initialize carousel functionality
    if (slides.length > 1) {
        initReferenceCarousel(slides.length);
    }
}

// Initialize reference carousel
function initReferenceCarousel(totalSlides) {
    let currentSlide = 0;
    const carousel = document.getElementById('referenceCarousel');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (!carousel) return;
    
    // Update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('bg-blue-500');
                indicator.classList.remove('bg-gray-300');
            } else {
                indicator.classList.add('bg-gray-300');
                indicator.classList.remove('bg-blue-500');
            }
        });
    }
    
    // Previous slide
    const prevBtn = document.getElementById('prevRef');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
            updateCarousel();
        });
    }
    
    // Next slide
    const nextBtn = document.getElementById('nextRef');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
            updateCarousel();
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-play (optional)
    setInterval(() => {
        currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel();
    }, 8000); // Change slide every 8 seconds
    
    // Initialize
    updateCarousel();
}

// Show reference details in modal
function showReferenceDetails(referenceId) {
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        const reference = cmsData.references?.find(r => r.id == referenceId);
        
        if (!reference) {
            showNotification('Referans bulunamadı!', 'error');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div class="flex items-center">
                        ${reference.logo ? `
                            <img src="${reference.logo}" alt="${reference.companyName}" 
                                 class="w-8 h-8 object-contain mr-3 rounded">
                        ` : ''}
                        <h2 class="text-xl font-bold text-gray-800">${reference.companyName}</h2>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="p-6">
                    <div class="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 class="font-semibold text-gray-800 mb-2">Şirket Bilgileri</h3>
                            <div class="space-y-2 text-sm">
                                <p><span class="font-medium">Sektör:</span> ${reference.sector}</p>
                                <p><span class="font-medium">Çalışan Sayısı:</span> ${reference.employeeCount}</p>
                                <p><span class="font-medium">İletişim:</span> ${reference.contactPerson}</p>
                                ${reference.contactEmail ? `<p><span class="font-medium">E-posta:</span> ${reference.contactEmail}</p>` : ''}
                                ${reference.contactPhone ? `<p><span class="font-medium">Telefon:</span> ${reference.contactPhone}</p>` : ''}
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="font-semibold text-gray-800 mb-2">Proje Detayları</h3>
                            <div class="space-y-2 text-sm">
                                <p><span class="font-medium">Başlangıç:</span> ${reference.startDate ? new Date(reference.startDate).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}</p>
                                ${reference.endDate ? `<p><span class="font-medium">Bitiş:</span> ${new Date(reference.endDate).toLocaleDateString('tr-TR')}</p>` : ''}
                                <p><span class="font-medium">Durum:</span> 
                                    <span class="px-2 py-1 rounded-full text-xs ${
                                        reference.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        reference.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }">
                                        ${reference.status === 'completed' ? 'Tamamlandı' :
                                          reference.status === 'ongoing' ? 'Devam Ediyor' :
                                          'Planlanan'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="font-semibold text-gray-800 mb-2">Proje Açıklaması</h3>
                        <p class="text-gray-700 text-sm leading-relaxed">${reference.projectDescription}</p>
                    </div>
                    
                    ${reference.services && reference.services.length > 0 ? `
                        <div>
                            <h3 class="font-semibold text-gray-800 mb-2">Verilen Hizmetler</h3>
                            <div class="flex flex-wrap gap-2">
                                ${reference.services.map(service => `
                                    <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                        ${service}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === this) this.remove();
        });
    } catch (e) {
        console.error('Error showing reference details:', e);
        showNotification('Referans detayları yüklenirken hata oluştu!', 'error');
    }
}

// Clear test references function
window.clearTestReferences = function() {
    if (confirm('Test referans verilerini temizlemek istediğinize emin misiniz?')) {
        // Clear all localStorage keys that might contain test references
        const keysToCheck = ['nexusISGReferences', 'references', 'test-references'];
        
        keysToCheck.forEach(key => {
            if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
                console.log(`Removed ${key} from localStorage`);
            }
        });
        
        // Also clear references from main CMS data
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        if (cmsData.references) {
            cmsData.references = [];
            localStorage.setItem('nexus-isg-cms-data', JSON.stringify(cmsData));
            console.log('Cleared references from CMS data');
        }
        
        // Refresh the page
        showNotification('Test verileri temizlendi! Sayfa yenileniyor...', 'success');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
};

// Show notification function for main website
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white text-sm font-medium ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export functions for manual refresh
window.refreshDynamicContent = function() {
    console.log('Manually refreshing dynamic content...');
    loadServicesFromCMS();
    loadProductsFromCMS();
    loadBlogFromCMS();
    loadTeamFromCMS();
    loadReferencesFromCMS();
    loadSocialMediaFromCMS();
    loadContactInfoFromCMS();
    loadStatsFromCMS();
    loadSiteSettingsFromCMS();
};

// Load social media links from CMS data
function loadSocialMediaFromCMS() {
    const socialContainer = document.getElementById('social-media-links');
    if (!socialContainer) return;

    // Get social media data from localStorage
    let socialLinks = [];
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        socialLinks = cmsData.social || [];
    } catch (e) {
        console.error('Error loading social media data:', e);
    }

    // Filter only active social media links
    const activeSocialLinks = socialLinks.filter(social => social.active);

    // If no active social links, show default ones or hide
    if (activeSocialLinks.length === 0) {
        // Show default social media links or hide container
        socialContainer.innerHTML = `
            <a href="#" class="text-gray-300 hover:text-white transition duration-300">
                <i class="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition duration-300">
                <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition duration-300">
                <i class="fab fa-instagram text-xl"></i>
            </a>
        `;
        return;
    }

    // Platform icon mapping
    const platformIcons = {
        facebook: 'fab fa-facebook',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        linkedin: 'fab fa-linkedin',
        youtube: 'fab fa-youtube',
        tiktok: 'fab fa-tiktok',
        whatsapp: 'fab fa-whatsapp',
        telegram: 'fab fa-telegram'
    };

    // Generate HTML for active social media links
    const socialHTML = activeSocialLinks.map(social => {
        const icon = platformIcons[social.platform] || 'fas fa-share-alt';
        return `
            <a href="${social.url}" target="_blank" rel="noopener noreferrer" 
               class="text-gray-300 hover:text-white transition duration-300"
               title="${social.platform}: ${social.username}">
                <i class="${icon} text-xl"></i>
            </a>
        `;
    }).join('');

    socialContainer.innerHTML = socialHTML;
}

// Load contact information from CMS data
function loadContactInfoFromCMS() {
    // Get contact data from localStorage
    let contactData = {};
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        contactData = cmsData.contact || {};
    } catch (e) {
        console.error('Error loading contact data:', e);
    }

    // Update contact section description
    const contactDescription = document.getElementById('contact-description');
    if (contactDescription && contactData.description) {
        contactDescription.textContent = contactData.description;
    }

    // Update address elements
    const addressElements = document.querySelectorAll('[data-company-address]');
    addressElements.forEach(element => {
        if (contactData.address) {
            // For paragraph elements, preserve line breaks
            if (element.tagName.toLowerCase() === 'p') {
                element.innerHTML = contactData.address.replace(/\n/g, '<br>');
            } else {
                // For list items, use short version (first line only)
                const firstLine = contactData.address.split('\n')[0];
                element.textContent = firstLine;
            }
        }
    });

    // Update main phone elements
    const phoneElements = document.querySelectorAll('[data-company-phone]');
    phoneElements.forEach(element => {
        if (contactData.mainPhone) {
            element.textContent = contactData.mainPhone;
        }
    });

    // Update WhatsApp phone elements
    const whatsappElements = document.querySelectorAll('[data-company-whatsapp]');
    whatsappElements.forEach(element => {
        if (contactData.whatsappPhone) {
            element.textContent = `${contactData.whatsappPhone} (WhatsApp)`;
        }
    });

    // Update main email elements
    const emailElements = document.querySelectorAll('[data-company-email]');
    emailElements.forEach(element => {
        if (contactData.mainEmail) {
            element.textContent = contactData.mainEmail;
        }
    });

    // Update support email elements in contact section
    const supportEmailElements = document.querySelectorAll('[data-company-support-email]');
    supportEmailElements.forEach(element => {
        if (contactData.supportEmail) {
            element.textContent = contactData.supportEmail;
        }
    });

    // Update support email elements in footer (with "Destek:" prefix)
    const supportEmailFooterElements = document.querySelectorAll('[data-company-support-email-footer]');
    supportEmailFooterElements.forEach(element => {
        if (contactData.supportEmail) {
            element.textContent = `Destek: ${contactData.supportEmail}`;
        }
    });

    // Update working hours if there's a specific element for it
    const workingHoursElements = document.querySelectorAll('[data-working-hours]');
    workingHoursElements.forEach(element => {
        if (contactData.workingHours) {
            element.textContent = contactData.workingHours;
        }
    });

    // Update company name elements
    const companyNameElements = document.querySelectorAll('[data-company-name]');
    companyNameElements.forEach(element => {
        if (contactData.companyName) {
            element.textContent = contactData.companyName;
        }
    });
    
    // Reveal company names after contact info updates
    unhideCompanyNames();
}

// Load statistics from CMS data
// Load Hero Section from CMS
function loadHeroFromCMS() {
    let cmsData = {};
    try {
        cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
    } catch (e) {
        console.error('Error loading hero data:', e);
        return;
    }

    // Update hero title
    const heroTitle = document.querySelector('[data-hero-title]');
    if (heroTitle && cmsData.hero?.title) {
        heroTitle.innerHTML = cmsData.hero.title.replace(/\n/g, '<br>');
    }

    // Update hero subtitle
    const heroSubtitle = document.querySelector('[data-hero-subtitle]');
    if (heroSubtitle && cmsData.hero?.subtitle) {
        heroSubtitle.textContent = cmsData.hero.subtitle;
    }

    // Also update stats if hero data contains them
    if (cmsData.hero?.stats) {
        loadStatsFromCMS();
    }
}

// Load Stats from CMS
function loadStatsFromCMS() {
    // Get stats data from localStorage
    let statsData = {};
    try {
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        statsData = cmsData.stats || {};
    } catch (e) {
        console.error('Error loading stats data:', e);
    }

    // Update customers stats
    const customersValueElement = document.querySelector('[data-stats-customers]');
    const customersTitleElement = document.querySelector('[data-stats-customers-title]');
    if (customersValueElement && statsData.customers?.value) {
        // Reset animation and trigger counter animation
        customersValueElement.textContent = '0';
        setTimeout(() => animateCounter(customersValueElement, statsData.customers.value), 100);
    }
    if (customersTitleElement && statsData.customers?.title) {
        customersTitleElement.textContent = statsData.customers.title;
    }

    // Update satisfaction stats
    const satisfactionValueElement = document.querySelector('[data-stats-satisfaction]');
    const satisfactionTitleElement = document.querySelector('[data-stats-satisfaction-title]');
    if (satisfactionValueElement && statsData.satisfaction?.value) {
        // Reset animation and trigger counter animation
        satisfactionValueElement.textContent = '0%';
        setTimeout(() => animateCounter(satisfactionValueElement, statsData.satisfaction.value), 200);
    }
    if (satisfactionTitleElement && statsData.satisfaction?.title) {
        satisfactionTitleElement.textContent = statsData.satisfaction.title;
    }

    // Update support stats
    const supportValueElement = document.querySelector('[data-stats-support]');
    const supportTitleElement = document.querySelector('[data-stats-support-title]');
    if (supportValueElement && statsData.support?.value) {
        // For special values like 24/7, directly set without animation
        if (statsData.support.value === '24/7') {
            supportValueElement.textContent = statsData.support.value;
        } else {
            supportValueElement.textContent = '0';
            setTimeout(() => animateCounter(supportValueElement, statsData.support.value), 300);
        }
    }
    if (supportTitleElement && statsData.support?.title) {
        supportTitleElement.textContent = statsData.support.title;
    }

    // Update experience stats
    const experienceValueElement = document.querySelector('[data-stats-experience]');
    const experienceTitleElement = document.querySelector('[data-stats-experience-title]');
    if (experienceValueElement && statsData.experience?.value) {
        // Reset animation and trigger counter animation
        experienceValueElement.textContent = '0+';
        setTimeout(() => animateCounter(experienceValueElement, statsData.experience.value), 400);
    }
    if (experienceTitleElement && statsData.experience?.title) {
        experienceTitleElement.textContent = statsData.experience.title;
    }
}

// Counter animation function (copied from index.html to work with CMS)
function animateCounter(element, finalValue) {
    const isPercentage = finalValue.includes('%');
    const hasPlus = finalValue.includes('+');
    const numValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    
    let currentValue = 0;
    const increment = Math.ceil(numValue / 50);
    const duration = 2000;
    const stepTime = duration / (numValue / increment);
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numValue) {
            currentValue = numValue;
            clearInterval(timer);
        }
        
        let displayValue = currentValue;
        if (isPercentage) displayValue += '%';
        if (hasPlus) displayValue += '+';
        if (finalValue === '24/7') displayValue = '24/7';
        
        element.textContent = displayValue;
    }, stepTime);
}

// Team Slider Functionality
let currentTeamSlide = 0;
let isTeamSliding = false;

function initializeTeamSlider() {
    const teamContainer = document.getElementById('team-container');
    const prevBtn = document.getElementById('teamPrevBtn');
    const nextBtn = document.getElementById('teamNextBtn');
    
    console.log('Team Slider Debug:', {
        teamContainer: !!teamContainer,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        prevBtnVisible: prevBtn ? getComputedStyle(prevBtn).display : 'not found',
        nextBtnVisible: nextBtn ? getComputedStyle(nextBtn).display : 'not found'
    });
    
    if (!teamContainer || !prevBtn || !nextBtn) {
        console.error('Team slider elements not found!');
        return;
    }
    
    const teamMembers = teamContainer.children;
    const totalMembers = teamMembers.length;
    
    if (totalMembers === 0) return;
    
    // Calculate visible cards based on screen size
    function getVisibleCards() {
        const containerWidth = teamContainer.parentElement.clientWidth;
        const cardWidth = 320; // 280px + 40px margin
        const visibleCards = Math.floor(containerWidth / cardWidth);
        return Math.max(1, visibleCards); // En az 1 kart görünsün
    }
    
    // Update slider position
    function updateSliderPosition() {
        if (isTeamSliding) return;
        
        isTeamSliding = true;
        const cardWidth = 320; // 280px card + 40px gap
        const translateX = -currentTeamSlide * cardWidth;
        teamContainer.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(0, totalMembers - visibleCards);
        
        // Previous button state
        if (currentTeamSlide === 0) {
            prevBtn.style.backgroundColor = '#94a3b8';
            prevBtn.style.borderColor = '#94a3b8';
            prevBtn.style.opacity = '0.5';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.backgroundColor = '#ffffff';
            prevBtn.style.borderColor = '#e5e7eb';
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
        
        // Next button state
        if (currentTeamSlide >= maxSlide) {
            nextBtn.style.backgroundColor = '#94a3b8';
            nextBtn.style.borderColor = '#94a3b8';
            nextBtn.style.opacity = '0.5';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.backgroundColor = '#ffffff';
            nextBtn.style.borderColor = '#e5e7eb';
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
        
        setTimeout(() => {
            isTeamSliding = false;
        }, 500);
    }
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (currentTeamSlide > 0 && !isTeamSliding) {
            currentTeamSlide--;
            updateSliderPosition();
        }
    });
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(0, totalMembers - visibleCards);
        if (currentTeamSlide < maxSlide && !isTeamSliding) {
            currentTeamSlide++;
            updateSliderPosition();
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    teamContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    teamContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        e.preventDefault();
    });
    
    teamContainer.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50; // Minimum swipe distance
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - next slide
                const visibleCards = getVisibleCards();
                const maxSlide = Math.max(0, totalMembers - visibleCards);
                if (currentTeamSlide < maxSlide) {
                    currentTeamSlide++;
                    updateSliderPosition();
                }
            } else {
                // Swipe right - previous slide
                if (currentTeamSlide > 0) {
                    currentTeamSlide--;
                    updateSliderPosition();
                }
            }
        }
    });
    
    // Initialize position
    currentTeamSlide = 0;
    updateSliderPosition();
    
    // Force show navigation buttons on desktop
    if (window.innerWidth >= 768) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const visibleCards = getVisibleCards();
        const maxSlide = Math.max(0, totalMembers - visibleCards);
        if (currentTeamSlide > maxSlide) {
            currentTeamSlide = maxSlide;
        }
        updateSliderPosition();
        
        // Show/hide buttons based on screen size
        if (window.innerWidth >= 768) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    });
    
    // Auto-slide functionality (optional)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const visibleCards = getVisibleCards();
            const maxSlide = Math.max(0, totalMembers - visibleCards);
            
            if (currentTeamSlide >= maxSlide) {
                currentTeamSlide = 0;
            } else {
                currentTeamSlide++;
            }
            updateSliderPosition();
        }, 4000); // 4 saniyede bir otomatik geçiş
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause auto-slide on hover
    teamContainer.addEventListener('mouseenter', stopAutoSlide);
    teamContainer.addEventListener('mouseleave', startAutoSlide);
    prevBtn.addEventListener('mouseenter', stopAutoSlide);
    nextBtn.addEventListener('mouseenter', stopAutoSlide);
    prevBtn.addEventListener('mouseleave', startAutoSlide);
    nextBtn.addEventListener('mouseleave', startAutoSlide);
}

// Site Settings Integration
function loadSiteSettingsFromCMS() {
    try {
        console.log('Loading site settings from CMS...');
        const cmsData = JSON.parse(localStorage.getItem('nexus-isg-cms-data') || '{}');
        const settings = cmsData.siteSettings || {};
        
        console.log('Site settings data:', settings);
        console.log('Available settings keys:', Object.keys(settings));
        
        // Default values ile birleştir
        const defaultSettings = {
            companyName: 'NEXUS İSG',
            companyEmail: 'info@nexusisg.com',
            companyPhone: '+90 212 123 45 67',
            companyAddress: 'İstanbul, Türkiye',
            logoUrl: 'media/nexus-logo.svg'
        };
        
        const finalSettings = { ...defaultSettings, ...settings };
        console.log('Final settings to apply:', finalSettings);
        
        // Update logos
        updateSiteLogos(finalSettings);
        
        // Update company info
        updateCompanyInfo(finalSettings);
        
        console.log('Site settings applied successfully');
        
    } catch (error) {
        console.error('Site ayarları yüklenirken hata:', error);
    }
}

function updateSiteLogos(settings) {
    const logoUrl = settings.logoUrl || 'media/nexus-logo.svg';
    // Header logo boyutu - responsive (mobil: 60px, desktop: 90px)
    const isMobile = window.innerWidth < 768;
    const logoWidth = isMobile ? 60 : 90;
    const logoHeight = isMobile ? 60 : 90;
    
    console.log('Updating logos with:', { logoUrl, logoWidth, logoHeight });
    
    // Tüm logo elementlerini güncelle
    const logoElements = document.querySelectorAll('[data-logo]');
    console.log('Found logo elements:', logoElements.length);
    
    logoElements.forEach(logo => {
        logo.src = logoUrl;
        logo.style.width = logoWidth + 'px';
        logo.style.height = logoHeight + 'px';
        // Parlak efekt ekle
        logo.style.filter = 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)) brightness(1.1)';
    });
    
    // Fallback için manuel selector'lar
    const headerLogos = document.querySelectorAll('header img, nav img');
    headerLogos.forEach(logo => {
        if (logo.alt && logo.alt.includes('İSG')) {
            logo.src = logoUrl;
            logo.style.width = logoWidth + 'px';
            logo.style.height = logoHeight + 'px';
            logo.style.filter = 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)) brightness(1.1)';
        }
    });
    
    // Footer logoları - biraz daha büyük
    const footerLogoWidth = settings.logoWidth ? parseInt(settings.logoWidth) * 1.5 : 120;
    const footerLogoHeight = settings.logoHeight ? parseInt(settings.logoHeight) * 1.5 : 120;
    
    const footerLogos = document.querySelectorAll('[data-logo-footer]');
    footerLogos.forEach(logo => {
        logo.src = logoUrl;
        logo.style.width = footerLogoWidth + 'px';
        logo.style.height = footerLogoHeight + 'px';
    });
    
    // Fallback footer logos
    const footerLogosAlt = document.querySelectorAll('footer img');
    footerLogosAlt.forEach(logo => {
        if (logo.alt && logo.alt.includes('İSG') && !logo.hasAttribute('data-logo-footer')) {
            logo.src = logoUrl;
            logo.style.width = footerLogoWidth + 'px';
            logo.style.height = footerLogoHeight + 'px';
        }
    });
    
    // Favicon güncelleme
    updateFavicon(logoUrl);
}

function updateCompanyInfo(settings) {
    console.log('🔄 updateCompanyInfo called with:', settings);
    
    // Check display type (text or logo)
    const displayType = settings.companyDisplayType || 'text';
    
    if (displayType === 'logo' && settings.companyLogo) {
        // Display as logo/image
        const companyNameElements = document.querySelectorAll('[data-company-name], [data-company-name-footer]');
        console.log('🖼️ Updating to logo display, found elements:', companyNameElements.length);
        
        companyNameElements.forEach((element, index) => {
            // Replace text with image
            const img = document.createElement('img');
            img.src = settings.companyLogo;
            img.alt = settings.companyName || 'Company Logo';
            img.className = 'inline-block flex-shrink-0';
            
            // Adjust size based on location
            if (element.hasAttribute('data-company-name-footer')) {
                img.style.maxHeight = '40px';
                img.style.maxWidth = '40px';
                img.style.width = '40px';
                img.style.height = '40px';
            } else {
                img.style.maxHeight = '60px';
                img.style.maxWidth = '60px';
                img.style.width = '60px';
                img.style.height = '60px';
            }
            
            img.style.objectFit = 'contain';
            
            // Replace element content
            element.innerHTML = '';
            element.appendChild(img);
            
            console.log(`🖼️ Replaced element ${index + 1} with logo`);
        });
    } else {
        // Display as text
        const companyName = settings.companyName || 'NEXUS İSG';
        const companyNameElements = document.querySelectorAll('[data-company-name]');
        console.log('🎯 Found company name elements:', companyNameElements.length);
        
        if (companyNameElements.length === 0) {
            console.error('❌ NO COMPANY NAME ELEMENTS FOUND!');
        }
        
        companyNameElements.forEach((element, index) => {
            console.log(`📝 Updating element ${index + 1}: ${element.tagName} - Old: "${element.textContent}" -> New: "${companyName}"`);
            element.textContent = companyName;
        });
        
        // Footer şirket adı
        const footerNameElements = document.querySelectorAll('[data-company-name-footer]');
        footerNameElements.forEach(element => {
            element.textContent = companyName;
        });
    }

    // Reveal after updates to avoid initial flicker
    unhideCompanyNames();
    
    // Title tag güncelleme
    if (settings.companyName) {
        const currentTitle = document.title;
        const newTitle = currentTitle.replace(/NEXUS İSG/g, settings.companyName);
        document.title = newTitle;
        
        // Meta tag güncellemeleri
        const metaAuthor = document.querySelector('meta[name="author"]');
        if (metaAuthor) {
            metaAuthor.content = settings.companyName;
        }
    }
    
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.content = ogTitle.content.replace(/NEXUS İSG/g, settings.companyName);
        }
        
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.content = twitterTitle.content.replace(/NEXUS İSG/g, settings.companyName);
        }
        
        // JSON-LD structured data güncelleme
        const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
        if (jsonLdScript) {
            try {
                const jsonData = JSON.parse(jsonLdScript.textContent);
                if (jsonData.name) {
                    jsonData.name = settings.companyName;
                }
                if (jsonData.alternateName) {
                    jsonData.alternateName = settings.companyName + ' İş Sağlığı ve Güvenliği';
                }
                jsonLdScript.textContent = JSON.stringify(jsonData, null, 2);
            } catch (e) {
                console.warn('JSON-LD güncellenirken hata:', e);
            }
        }
    }
    
    // E-posta güncellemeleri
    if (settings.companyEmail) {
        const emailElements = document.querySelectorAll('[data-company-email]');
        console.log('Found email elements:', emailElements.length);
        emailElements.forEach(element => {
            element.textContent = settings.companyEmail;
            if (element.tagName === 'A') {
                element.href = `mailto:${settings.companyEmail}`;
            }
        });
    }
    
    // Telefon güncellemeleri
    if (settings.companyPhone) {
        const phoneElements = document.querySelectorAll('[data-company-phone]');
        console.log('Found phone elements:', phoneElements.length);
        phoneElements.forEach(element => {
            element.textContent = settings.companyPhone;
            if (element.tagName === 'A') {
                element.href = `tel:${settings.companyPhone}`;
            }
        });
    }
    
    // Adres güncellemeleri
    if (settings.companyAddress) {
        const addressElements = document.querySelectorAll('[data-company-address]');
        console.log('Found address elements:', addressElements.length);
        addressElements.forEach(element => {
            element.textContent = settings.companyAddress;
        });
    }
}

function updateFavicon(logoUrl) {
    // Favicon'u güncelle
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
    }
    favicon.href = logoUrl;
    
    // Apple touch icon
    let appleFavicon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleFavicon) {
        appleFavicon = document.createElement('link');
        appleFavicon.rel = 'apple-touch-icon';
        document.head.appendChild(appleFavicon);
    }
    appleFavicon.href = logoUrl;
}

// Test function for manual site settings update
window.testSiteSettings = function() {
    console.log('Testing site settings...');
    loadSiteSettingsFromCMS();
};

// Force refresh site settings when called from console
window.forceUpdateSiteSettings = function() {
    console.log('Force updating site settings...');
    const testSettings = {
        companyName: 'TEST COMPANY',
        companyEmail: 'test@test.com',
        companyPhone: '+90 123 456 78 90',
        companyAddress: 'Test Şehir, Test Ülke',
        logoUrl: 'media/nexus-logo.svg'
    };
    updateCompanyInfo(testSettings);
    updateSiteLogos(testSettings);
    // Ensure company names are visible after force update
    unhideCompanyNames();
};

// Emergency manual update function - call this from console if nothing works
window.manualUpdateSiteSettings = function(newName) {
    console.log('🚨 MANUAL UPDATE TRIGGERED');
    const settings = {
        companyName: newName || 'TEST COMPANY MANUEL',
        companyEmail: 'test@test.com',
        companyPhone: '+90 999 999 99 99',
        companyAddress: 'Test Adres, Test Şehir'
    };
    
    console.log('🔧 Manually updating all elements...');
    
    // Direct DOM update with line break
    const nameElements = document.querySelectorAll('[data-company-name]');
    console.log(`Found ${nameElements.length} name elements`);
    nameElements.forEach(el => {
        // İlk boşluktan sonra satır sonu ekle
        const firstSpaceIndex = settings.companyName.indexOf(' ');
        if (firstSpaceIndex > 0 && (el.tagName === 'DIV' || el.tagName === 'SPAN')) {
            const firstWord = settings.companyName.substring(0, firstSpaceIndex);
            const rest = settings.companyName.substring(firstSpaceIndex + 1);
            el.innerHTML = firstWord + '<br>' + rest;
        } else {
            el.textContent = settings.companyName;
        }
    });
    
    // Footer şirket adı - tek satır
    const footerNameElements = document.querySelectorAll('[data-company-name-footer]');
    footerNameElements.forEach(el => {
        el.textContent = settings.companyName;
    });
    
    const emailElements = document.querySelectorAll('[data-company-email]');
    console.log(`Found ${emailElements.length} email elements`);
    emailElements.forEach(el => {
        el.textContent = settings.companyEmail;
    });
    
    const phoneElements = document.querySelectorAll('[data-company-phone]');
    console.log(`Found ${phoneElements.length} phone elements`);
    phoneElements.forEach(el => {
        el.textContent = settings.companyPhone;
    });
    
    const addressElements = document.querySelectorAll('[data-company-address]');
    console.log(`Found ${addressElements.length} address elements`);
    addressElements.forEach(el => {
        el.textContent = settings.companyAddress;
    });
    
    // Also update title
    document.title = `${settings.companyName} - İş Sağlığı ve Güvenliği Çözümleri`;
    
    console.log('✅ Manual update completed!');
    // Reveal after manual update
    unhideCompanyNames();
    return settings;
};