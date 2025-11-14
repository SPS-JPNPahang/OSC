/**
 * ============================================
 * ENGAGEBOX - WELCOME POPUP
 * Auto-muncul setiap kali buka website
 * Auto-close selepas 10 saat
 * ============================================
 */

// Konfigurasi EngageBox
const engageBoxConfig = {
    image: 'images/engagebox/Welcome.jpg',
    message: 'Selamat datang ke One Stop Centre SPS, JPN Pahang. Portal ini menyediakan akses pantas dan memudahkan urusan anda.',
    autoCloseDelay: 10000, // 10 saat (dalam milliseconds)
    showDelay: 1000 // Delay 1 saat sebelum popup muncul
};

// Tunggu sehingga page fully loaded
window.addEventListener('load', function() {
    
    // Delay sikit sebelum popup muncul (supaya smooth)
    setTimeout(function() {
        initEngageBox();
    }, engageBoxConfig.showDelay);
    
});

// Fungsi untuk initialize EngageBox
function initEngageBox() {
    
    // Buat HTML untuk EngageBox
    const engageBoxHTML = `
        <div id="engagebox-overlay" class="engagebox-overlay">
            <div class="engagebox-container">
                
                <!-- Close Button -->
                <button class="engagebox-close" id="engagebox-close" aria-label="Tutup">
                    <i class="fas fa-times"></i>
                </button>
                
                <!-- Image -->
                <div class="engagebox-image">
                    <img src="${engageBoxConfig.image}" alt="Welcome" loading="eager">
                </div>
                
                <!-- Content -->
                <div class="engagebox-content">
                    <p class="engagebox-message">${engageBoxConfig.message}</p>
                </div>
                
                <!-- Timer Bar -->
                <div class="engagebox-timer">
                    <div class="engagebox-timer-bar" id="engagebox-timer-bar"></div>
                </div>
                
            </div>
        </div>
    `;
    
    // Insert EngageBox ke dalam body
    document.body.insertAdjacentHTML('beforeend', engageBoxHTML);
    
    // Rujukan kepada elemen
    const overlay = document.getElementById('engagebox-overlay');
    const closeBtn = document.getElementById('engagebox-close');
    const timerBar = document.getElementById('engagebox-timer-bar');
    
    // Tunjukkan EngageBox
    setTimeout(function() {
        overlay.classList.add('active');
    }, 100);
    
    // Auto-close selepas delay yang ditetapkan
    const autoCloseTimer = setTimeout(function() {
        closeEngageBox();
    }, engageBoxConfig.autoCloseDelay);
    
    // Event: Tutup bila klik butang X
    closeBtn.addEventListener('click', function() {
        clearTimeout(autoCloseTimer); // Cancel auto-close
        closeEngageBox();
    });
    
    // Event: Tutup bila klik overlay (luar popup)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            clearTimeout(autoCloseTimer);
            closeEngageBox();
        }
    });
    
    // Event: Tutup bila tekan ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            clearTimeout(autoCloseTimer);
            closeEngageBox();
        }
    });
    
    // Fungsi untuk tutup EngageBox
    function closeEngageBox() {
        overlay.classList.remove('active');
        
        // Buang element selepas animation siap
        setTimeout(function() {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
    
    console.log('✅ EngageBox loaded successfully!');
}