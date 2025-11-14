/**
 * ============================================
 * INTERACTIVE CARDS
 * Click to expand/collapse cards
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all card elements
    const cards = document.querySelectorAll('.button-card-new');
    
    // Add click event to each card
    cards.forEach(card => {
        
        // Skip disabled cards
        if (card.classList.contains('disabled')) {
            return;
        }
        
        card.addEventListener('click', function(e) {
            
            // Jangan expand kalau klik pada button/link dalam card
            if (e.target.closest('.btn-card') || e.target.closest('button')) {
                return;
            }
            
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Optional: Close other cards (uncomment kalau nak)
            // cards.forEach(otherCard => {
            //     if (otherCard !== this) {
            //         otherCard.classList.remove('expanded');
            //     }
            // });
        });
    });
    
    console.log('✅ Cards.js loaded successfully!');
});