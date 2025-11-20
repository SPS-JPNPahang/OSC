/* ═══════════════════════════════════════════════════════
   SLIDES DATA - ONE STOP CENTRE SPS JPN PAHANG
   
   CARA GUNA:
   - Tambah slide baru: Copy block slide dan edit path & caption
   - Buang slide: Delete block yang tak nak
   - Tukar susunan: Cut & paste block slide
   
   FORMAT:
   {
       image: 'path/to/image.jpg',
       title: 'Tajuk Slide',          // Optional
       description: 'Penerangan'      // Optional
   }
   ═══════════════════════════════════════════════════════ */

const slidesData = [
    {
        image: 'images/slider/slide1.jpg',
        title: 'Dari Impian',
        description: '4C'
    },
    {
        image: 'images/slider/slide2.jpg',
        title: 'Kita Bersama',
        description: '4C'
    },
    {
        image: 'images/slider/slide3.jpg',
        title: 'Mencuba Bereksperimen',
        description: '4C'
    },
    {
        image: 'images/slider/slide4.jpg',
        title: 'Untuk Sesuatu',
        description: '4C'
    },
    {
        image: 'images/slider/slide5.jpg',
        title: 'Menjadi Permulaan',
        description: '4C'
    },
    {
        image: 'images/slider/slide6.jpg',
        title: 'Sehingga Legasi',
        description: '4C'
    },
    {
        image: 'images/slider/slide7.jpg',
        title: 'Tercipta',
        description: 'SPS-JPN Pahang'
    }

];

/* ═══════════════════════════════════════════════════════
   SLIDER SETTINGS
   Tukar settings ni kalau nak adjust slider behavior
   ═══════════════════════════════════════════════════════ */

const sliderSettings = {
    // Auto-play settings
    autoPlay: true,              // true = auto slide, false = manual je
    autoPlayInterval: 3000,      // 5000 = 5 saat per slide (dalam milliseconds)
    
    // Animation settings
    transitionSpeed: 500,        // 800ms = kelajuan tukar slide
    
    // Navigation settings
    showArrows: true,            // true = tunjuk arrow kiri/kanan
    showDots: true,              // true = tunjuk dots indicator
    
    // Caption settings
    showCaptions: true,          // true = tunjuk caption (kalau ada)
    
    // Pause on hover
    pauseOnHover: true           // true = pause bila hover atas slider
};

/* ═══════════════════════════════════════════════════════
   NOTA PENTING:
   
   1. NAMA FAIL GAMBAR
      - Gunakan format: slide1.jpg, slide2.jpg, slide3.jpg
      - Atau nama sendiri: pengumuman1.jpg, berita1.jpg
      - Support: .jpg, .jpeg, .png, .gif
   
   2. SAIZ GAMBAR (Recommended)
      - Desktop: 1200 x 450 pixels (landscape)
      - Mobile: Auto adjust (responsive)
      - Max file size: 500KB per gambar (untuk loading pantas)
   
   3. LOCATION GAMBAR
      - Semua gambar MESTI dalam folder: images/slider/
      - Contoh: one-stop-centre/images/slider/slide1.jpg
   
   4. BERAPA SLIDE OPTIMUM?
      - Minimum: 3 slides
      - Recommended: 4-6 slides
      - Maximum: 10 slides (lebih dari ni, loading slow)
   
   5. CAPTION TIPS
      - Title: Maksimum 50 characters
      - Description: Maksimum 100 characters
      - Jangan terlalu panjang, nanti mobile tak muat
   
   ═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   CONTOH LENGKAP - SLIDES UNTUK JABATAN PENDIDIKAN
   Uncomment section ni untuk guna contoh siap
   ═══════════════════════════════════════════════════════ */

/*
const slidesData = [
    {
        image: 'images/slider/welcome.jpg',
        title: 'Portal One Stop Centre',
        description: 'Sektor Pengurusan Sekolah, JPN Pahang'
    },
    {
        image: 'images/slider/pengumuman.jpg',
        title: 'Pengumuman Terkini',
        description: 'Maklumat dan pemberitahuan penting'
    },
    {
        image: 'images/slider/aktiviti.jpg',
        title: 'Aktiviti & Program',
        description: 'Program dan aktiviti sektor pengurusan sekolah'
    },
    {
        image: 'images/slider/perkhidmatan.jpg',
        title: 'Perkhidmatan Kami',
        description: 'Kemudahan akses pantas untuk urusan anda'
    },
    {
        image: 'images/slider/hubungi.jpg',
        title: 'Hubungi Kami',
        description: 'Sentiasa bersedia membantu anda'
    }
];
*/