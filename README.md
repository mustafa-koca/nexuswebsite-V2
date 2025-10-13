# NEXUS İSG Website

Modern İş Sağlığı ve Güvenliği (İSG) firması için geliştirilmiş kapsamlı web sitesi ve CMS sistemi.

## 🚀 Özellikler

### 🎨 Frontend
- **Modern Responsive Tasarım**: Tailwind CSS ile mobile-first yaklaşım
- **Dinamik İçerik Yönetimi**: CMS entegrasyonu ile anlık içerik güncellemeleri
- **Carousel Sistemler**: Referanslar, ürünler ve blog için kayar gösterim
- **Interaktif Modals**: Blog detayları ve referans bilgileri için popup'lar
- **Filtreleme ve Arama**: Blog yazıları için gelişmiş filtreleme sistemi

### 🛠️ CMS (İçerik Yönetim Sistemi)
- **Komplet Admin Paneli**: Tüm içerikleri yönetmek için gelişmiş arayüz
- **Hizmet Yönetimi**: İSG hizmetlerini ekleme, düzenleme, silme
- **Ürün Katalog Yönetimi**: Yazılım ürünlerini showcase etme
- **Blog Sistemi**: Makale yazma, düzenleme ve yayınlama
- **Ekip Yönetimi**: Takım üyelerini tanıtma ve yönetme
- **Referans Sistemi**: Müşteri referanslarını görsel olarak sunma
- **File Upload**: Drag & drop ile resim yükleme sistemi

### 📱 Responsive Design
- **Desktop**: Full featured görünüm
- **Tablet**: Optimize edilmiş 2 kolon layout
- **Mobile**: Single column, touch-friendly arayüz

## 🏗️ Teknik Yapı

### Frontend Technologies
- **HTML5**: Semantik markup
- **CSS3**: Modern styling, Flexbox, Grid
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: Modern ES6+ özellikleri
- **FontAwesome**: Icon library

### Backend/Storage
- **LocalStorage**: Client-side veri persistence
- **JSON**: Structured data management
- **File API**: Image upload ve preview

### Modüler Yapı
```
nexusisgwebsite/
├── index.html              # Ana website
├── admin.html              # CMS admin paneli
├── login.html              # Admin giriş sayfası
├── cms-script.js           # CMS fonksiyonları
├── dynamic-content.js      # İçerik yükleme sistemi
├── tailwind.config.js      # Tailwind konfigürasyonu
└── assets/                 # Görseller ve kaynaklar
```

## 🎯 Ana Özellikler

### 1. Hero Section
- İstatistikler widget'ı
- CTA button'ları
- Responsive background

### 2. Hizmetler Bölümü
- Icon-based service cards
- Modal detay görünümü
- Feature listeleri

### 3. Ürünler Showcase
- Grid layout ürün kartları
- Fiyatlama bilgileri
- Özellik karşılaştırması

### 4. Blog Sistemi
- Kategori bazlı filtreleme
- Arama fonksiyonalitesi
- Tam ekran okuma modu
- Sosyal paylaşım

### 5. Referanslar Carousel
- 4'lü kompakt görünüm
- Otomatik slide geçişi
- Manuel navigasyon
- Şirket logoları

### 6. Ekip Tanıtımı
- Professional profile cards
- LinkedIn entegrasyonu
- Uzmanlık alanları

## 🔧 Kurulum

1. **Repository'yi klonlayın**
```bash
git clone [repository-url]
cd nexusisgwebsite
```

2. **Dosyaları bir web server'da çalıştırın**
```bash
# Python ile basit server
python -m http.server 8000

# Node.js ile
npx http-server

# PHP ile
php -S localhost:8000
```

3. **Tarayıcıda açın**
- Ana site: http://localhost:8000
- Admin panel: http://localhost:8000/admin.html

## 📝 Kullanım

### Admin Paneli
1. `admin.html`'i açın
2. Sol menüden ilgili bölümü seçin
3. İçerikleri ekleyin/düzenleyin
4. Değişiklikler otomatik olarak ana siteye yansır

### Content Management
- **Hizmetler**: Icon, başlık, açıklama, özellikler
- **Ürünler**: Görseller, fiyat, özellikler, demo linkler
- **Blog**: Kategori, içerik, yazar, tarih
- **Ekip**: Profil fotoğrafı, CV, iletişim bilgileri
- **Referanslar**: Logo, şirket bilgileri, proje detayları

## 🎨 Design System

### Color Palette
- **Primary Blue**: #2563eb
- **Success Green**: #059669
- **Warning Yellow**: #d97706
- **Error Red**: #dc2626
- **Gray Scale**: #f9fafb → #111827

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: System fonts, optimized readability
- **Code**: Mono space fonts

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Modals**: Responsive, escape-key support
- **Forms**: Validation, error states

## 🚀 Performance

### Optimizations
- **Lazy loading**: Images ve content
- **Minified assets**: CSS ve JS compression
- **Efficient DOM manipulation**: Minimal reflows
- **LocalStorage caching**: Fast content retrieval

### Browser Support
- **Modern browsers**: Chrome 60+, Firefox 60+, Safari 12+
- **Responsive breakpoints**: 320px → 1920px+
- **Touch devices**: iOS, Android support

## 🛡️ Security

### Client-side Security
- **Input validation**: XSS prevention
- **Content sanitization**: HTML filtering
- **CSRF protection**: Form tokens
- **Secure defaults**: Content-Security-Policy ready

## 📊 Analytics Ready

### Tracking Integration
- **Google Analytics**: Ready for GA4
- **Custom events**: User interaction tracking
- **Performance monitoring**: Core Web Vitals
- **Conversion tracking**: CTA click tracking

## 🔄 Version Control

### Git Workflow
- **Main branch**: Production ready code
- **Feature branches**: New development
- **Semantic versioning**: v1.0.0 format
- **Conventional commits**: Clear commit messages

## 📱 PWA Ready

### Progressive Web App Features
- **Service Worker**: Offline support ready
- **Web App Manifest**: Installable app
- **Responsive images**: Multiple resolutions
- **Fast loading**: Optimized bundle size

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Website**: [nexusisg.com]
- **Email**: info@nexusisg.com
- **GitHub**: [@mkoca]

---

**NEXUS İSG** - İş Sağlığı ve Güvenliği'nde Dijital Dönüşüm 🚀