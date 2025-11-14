/**
 * ============================================
 * ONE STOP CENTRE - MODAL JAVASCRIPT
 * Fungsi: Pengurusan Modal Kata Laluan
 * ============================================
 */

// ========================================
// KONFIGURASI - GANTIKAN URL DAN PAUTAN
// ========================================

// URL Google Apps Script anda
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbznhf3kCyoQHRFwk6QYtSSJ8VoCeb83bnu5U4OshYNTrp5N3_mYd1aCtpWCnCdnpCFcEg/exec';

// Pautan sulit (akan dibuka selepas password betul)
const SECRET_URL = 'https://sps-pahang-rg6n.glide.page';

// ========================================
// PENGURUSAN MODAL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Rujukan kepada elemen-elemen modal
    const modal = document.getElementById('secure-link-modal');
    const form = document.getElementById('secure-link-form');
    const input = document.getElementById('secure-link-input');
    const submitBtn = document.getElementById('secure-link-submit');
    const errorMsg = document.getElementById('secure-link-error');
    const triggerBtn = document.getElementById('secure-button-8');
    const closeBtn = modal.querySelector('.modal-close');
    
    // ========================================
    // 1. BUKA MODAL
    // ========================================
    
    if (triggerBtn) {
        triggerBtn.addEventListener('click', function() {
            openModal();
        });
    }
    
    function openModal() {
        // Reset modal
        input.value = '';
        errorMsg.textContent = '';
        errorMsg.classList.remove('show');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Masuk';
        
        // Tunjukkan modal
        modal.classList.add('active');
        modal.style.display = 'flex';
        
        // Focus pada input
        setTimeout(() => {
            input.focus();
        }, 100);
    }
    
    // ========================================
    // 2. TUTUP MODAL
    // ========================================
    
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    // Tutup bila klik butang 'X'
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Tutup bila klik luar modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Tutup bila tekan ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // ========================================
    // 3. SUBMIT FORM (SEMAK PASSWORD)
    // ========================================
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = input.value.trim();
            
            // Validasi input kosong
            if (!password) {
                showError('Sila masukkan kata laluan.');
                return;
            }
            
            // Tunjukkan loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyemak...';
            errorMsg.classList.remove('show');
            
            // Hantar ke Google Apps Script untuk semak password
            checkPassword(password);
        });
    }
    
    // ========================================
    // 4. SEMAK PASSWORD (PANGGIL GOOGLE APPS SCRIPT)
    // ========================================
    
    function checkPassword(password) {
        fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({ password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // PASSWORD BETUL! ✅
                successLogin();
            } else {
                // PASSWORD SALAH! ❌
                showError(data.message || 'Kata laluan salah. Sila cuba lagi.');
                resetSubmitButton();
            }
        })
        .catch(error => {
            // RALAT SAMBUNGAN
            console.error('Ralat:', error);
            showError('Tidak dapat menyambung ke pelayan. Sila cuba lagi.');
            resetSubmitButton();
        });
    }
    
    // ========================================
    // 5. FUNGSI HELPER
    // ========================================
    
    // Papar mesej ralat
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.add('show');
        
        // Shake animation untuk input
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }
    
    // Reset butang submit
    function resetSubmitButton() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Masuk';
        input.focus();
        input.select();
    }
    
    // Login berjaya - buka pautan sulit
    function successLogin() {
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Berjaya!';
        submitBtn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            closeModal();
            // Buka pautan sulit dalam tab baru
            window.open(SECRET_URL, '_blank');
            
            // Reset form selepas 1 saat
            setTimeout(() => {
                resetSubmitButton();
                submitBtn.style.backgroundColor = '';
            }, 1000);
        }, 800);
    }
    
    console.log('✅ Modal.js loaded successfully!');
});

// ========================================
// 6. CSS ANIMATION UNTUK SHAKE (Tambahan)
// ========================================

// Tambah style untuk shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.5s;
    }
`;
document.head.appendChild(style);