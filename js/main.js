/**
 * ============================================
 * ONE STOP CENTRE - MAIN JAVASCRIPT
 * Fungsi: Pengurusan Tab & Menu Mobile
 * ============================================
 */

// Tunggu sehingga DOM fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. PENGURUSAN TAB
    // ========================================
    
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Fungsi untuk tukar tab
    function switchTab(targetTab) {
        // Buang class 'active' dari semua tab links
        tabLinks.forEach(link => link.classList.remove('active'));
        
        // Buang class 'active' dari semua tab contents
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Tambah class 'active' pada tab yang diklik
        const activeLink = document.querySelector(`[data-tab="${targetTab}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Tambah class 'active' pada content yang berkaitan
        const activeContent = document.getElementById(targetTab);
        if (activeContent) {
            activeContent.classList.add('active');
        }
        
        // Scroll ke atas bila tukar tab
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Event listener untuk setiap tab link
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
            
            // Tutup menu mobile jika dibuka
            closeMobileMenu();
        });
    });
    
    // ========================================
    // 2. PENGURUSAN MENU MOBILE
    // ========================================
    
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebar = document.getElementById('sidebar');
    const menuOverlay = document.getElementById('menu-overlay');
    
    // Fungsi untuk buka menu mobile
    function openMobileMenu() {
        sidebar.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable scroll
    }
    
    // Fungsi untuk tutup menu mobile
    function closeMobileMenu() {
        sidebar.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Enable scroll
    }
    
    // Event: Buka menu bila klik butang hamburger
    if (menuToggle) {
        menuToggle.addEventListener('click', openMobileMenu);
    }
    
    // Event: Tutup menu bila klik butang 'X'
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeMobileMenu);
    }
    
    // Event: Tutup menu bila klik overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Event: Tutup menu bila tekan ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    console.log('✅ Main.js loaded successfully!');
});