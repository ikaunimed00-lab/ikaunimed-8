# IKA UNIMED - Enterprise Header & Navigation System

Sistem navigasi enterprise-grade untuk Portal Ikatan Alumni Universitas Negeri Medan (IKA UNIMED) yang profesional, scalable, dan mudah dimaintain.

## 🎯 Fitur Utama

### 1. **Restrukturisasi Menu (Reduksi ±30%)**
Menu utama dikurangi dari banyak kategori terpisah menjadi hanya **6 kategori utama**:
- Home
- Tentang IKA
- Komunitas Alumni
- Karir & Pengembangan
- Layanan Alumni
- Berita

**Tujuan:**
- Menurunkan cognitive load
- Mengikuti user journey alumni
- Scalable untuk pengembangan masa depan

### 2. **Mega Menu Desktop (Enterprise Style)**
- Background putih dengan rounded corners (rounded-2xl)
- Shadow besar (shadow-2xl) untuk kesan depth
- Lebar optimal: 600-900px (max-w-4xl)
- Header dengan gradient warna kategori
- Grid 2 kolom untuk konten
- Setiap section memiliki title + icon
- Setiap item memiliki icon + title + description
- Hover effects yang halus dan profesional

### 3. **Mobile Accordion Navigation**
- Semua submenu default tertutup
- Hanya satu section terbuka dalam satu waktu (true accordion behavior)
- Smooth transition dengan height/opacity animation
- ChevronDown icon yang rotate saat open/close
- Overlay untuk menutup menu
- Prevent body scroll saat menu terbuka

### 4. **Sistem Warna Konsisten (Tanpa Orange)**

#### Primary / Teal
- **Main:** `#0F766E`
- **Gradient:** `from-[#0F766E]/20 to-[#0F766E]/5`
- **Hover:** `bg-[#0F766E]/10`
- **Digunakan untuk:** Tentang IKA, Home

#### Green
- **Main:** `#37D67A`
- **Gradient:** `from-[#37D67A]/25 to-[#37D67A]/10`
- **Hover:** `bg-[#37D67A]/10`
- **Digunakan untuk:** Komunitas Alumni

#### Yellow
- **Main:** `#E9CF35`
- **Gradient:** `from-[#E9CF35]/25 to-[#E9CF35]/10`
- **Hover:** `bg-[#E9CF35]/15`
- **Icon:** `text-gray-800` (karena background terang)
- **Digunakan untuk:** Karir & Pengembangan

#### Dark Green
- **Main:** `#085A18`
- **Gradient:** `from-[#085A18]/20 to-[#085A18]/5`
- **Hover:** `bg-[#085A18]/10`
- **Digunakan untuk:** Layanan Alumni

#### Slate (Neutral)
- **Main:** `#64748B`
- **Gradient:** `from-slate-200 to-slate-50`
- **Hover:** `bg-slate-100`
- **Digunakan untuk:** Berita

### 5. **Enterprise Features**
- ✅ Active route highlighting
- ✅ Smooth hover animations (150-200ms)
- ✅ Icon scaling pada hover
- ✅ Auto-close mega menu saat route change
- ✅ Menu config terpisah di file sendiri (menuConfig.ts)
- ✅ Desktop & mobile menggunakan source config yang sama
- ✅ Sticky header dengan shrink effect on scroll
- ✅ Semantic icons dari Lucide React
- ✅ Consistent spacing dan typography

## 📁 Struktur File

```
/
├── menuConfig.ts          # Konfigurasi menu (single source of truth)
├── Header.tsx             # Komponen header utama
├── MegaMenu.tsx          # Komponen mega menu untuk desktop
├── MobileMenu.tsx        # Komponen accordion menu untuk mobile
└── demo.html             # Demo standalone (HTML + React CDN)
```

## 🗂️ Struktur Menu

```
Home
│
Tentang IKA
├── Profil Organisasi
│   ├── Tentang IKA UNIMED
│   └── Visi & Misi
│
├── Struktur
│   ├── Struktur Organisasi
│   └── Organisasi (PP / DPW / DPC)
│
Komunitas Alumni
├── Berita & Kegiatan
│   ├── Kabar Alumni
│   └── Agenda
│
├── Kontribusi
│   ├── Ruang Pengabdian
│   └── E-Voting
│
Karir & Pengembangan
├── Peluang Karir
│   ├── Lowongan Kerja
│   └── Kemitraan
│
├── Pengembangan Diri
│   ├── Beasiswa
│   └── Micro Learning
│
Layanan Alumni
├── Layanan Digital
│   ├── Legalisir Ijazah
│   └── Kartu Alumni
│
├── Dukungan
│   └── Donasi
│
Berita
├── Berita & Update
│   ├── Berita Terkini
│   └── FAQ
│
├── Media
│   ├── Galeri Foto
│   └── Galeri Video
```

## 🚀 Cara Penggunaan

### Option 1: Langsung dengan React (Recommended)

```tsx
import { Header } from './Header';

function App() {
  return (
    <div>
      <Header 
        currentPath="/"
        logoUrl="/images/logo-ika.png"
        siteName="IKA UNIMED"
      />
      {/* Your content */}
    </div>
  );
}
```

### Option 2: Demo Standalone (HTML)

Buka file `demo.html` di browser. File ini sudah include semua dependencies via CDN.

## 🎨 Customization

### Menambah Menu Baru

Edit file `menuConfig.ts`:

```typescript
export const menuConfig: MainMenuItem[] = [
  // ... existing menus
  {
    id: 'menu-baru',
    label: 'Menu Baru',
    description: 'Deskripsi menu baru',
    icon: IconName, // dari lucide-react
    color: {
      main: '#HEX_COLOR',
      gradient: 'from-[#HEX]/20 to-[#HEX]/5',
      hover: 'hover:bg-[#HEX]/10',
    },
    sections: [
      {
        id: 'section-1',
        title: 'Section Title',
        icon: SectionIcon,
        items: [
          {
            title: 'Item Title',
            description: 'Item description',
            href: '/path',
            icon: ItemIcon,
          },
        ],
      },
    ],
  },
];
```

### Mengubah Warna

Warna dikontrol melalui `color` object di setiap menu item. Anda dapat:

1. Mengubah warna utama (`main`)
2. Menyesuaikan gradient (`gradient`)
3. Mengatur hover state (`hover`)
4. Menambah class khusus untuk icon (`iconClass`)

### Mengubah Layout Mega Menu

Edit file `MegaMenu.tsx`:

- Ubah `grid-cols-2` menjadi `grid-cols-3` untuk 3 kolom
- Ubah `max-w-4xl` untuk mengatur lebar maksimum
- Sesuaikan padding dan spacing

## 🎯 Design Philosophy

### Enterprise-Grade
- Minimal, professional, tidak playful
- Konsisten dengan website universitas besar
- Tidak menggunakan terlalu banyak warna sekaligus
- Focus pada readability dan usability

### Scalable
- Single source of truth (menuConfig.ts)
- Mudah menambah/mengurangi menu
- Tidak hardcode values
- Reusable components

### Accessible
- Semantic HTML
- Keyboard navigation support
- ARIA labels
- Screen reader friendly

## 📱 Responsive Behavior

### Desktop (lg: 1024px+)
- Mega menu dengan hover interaction
- Grid 2 kolom untuk submenu
- Full navigation visible

### Tablet & Mobile (< 1024px)
- Accordion menu dari sisi kanan
- One section open at a time
- Touch-optimized
- Overlay untuk close

## 🔧 Dependencies

### React Components
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "lucide-react": "latest"
}
```

### Tailwind CSS
Requires Tailwind CSS v3.0+

## 💡 Best Practices

1. **Menu Config** - Selalu edit menuConfig.ts, jangan hardcode di component
2. **Warna** - Gunakan color object, jangan inline styles kecuali untuk dynamic values
3. **Icons** - Gunakan semantic icons yang relate dengan konten
4. **Descriptions** - Keep descriptions short (max 50 characters)
5. **Nesting** - Maksimal 2 level (Section → Items), jangan lebih dalam

## 🎨 Color Palette Reference

```css
/* Primary Teal */
--color-primary: #0F766E;

/* Green */
--color-oxygen-green: #37D67A;

/* Dark Green */
--color-first-dark-green: #085A18;
--color-second-dark-green: #0F7525;

/* Yellow */
--color-ika-yellow: #E9CF35;

/* Neutral */
--color-slate: #64748B;
```

## ✨ Key Highlights

- ✅ **Zero Orange** - Sesuai permintaan, tidak ada warna orange sama sekali
- ✅ **30% Reduction** - Menu dari 8+ kategori menjadi 6 kategori
- ✅ **True Accordion** - Mobile menu hanya buka 1 section per waktu
- ✅ **Enterprise Feel** - Professional, tidak playful
- ✅ **Maintainable** - Clean code structure, easy to extend

## 📄 License

This component system is created specifically for IKA UNIMED.

---

**Developed with ❤️ for IKA UNIMED**
