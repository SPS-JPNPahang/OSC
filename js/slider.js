/* ═══════════════════════════════════════════════════════
   SLIDER LOGIC - ONE STOP CENTRE SPS JPN PAHANG
   ═══════════════════════════════════════════════════════ */

class Slider {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.autoPlayTimer = null;
        this.init();
    }

    init() {
        this.createSliderHTML();
        this.setupEventListeners();
        if (sliderSettings.autoPlay) {
            this.startAutoPlay();
        }
    }

    createSliderHTML() {
        const container = document.getElementById('slider-container');
        if (!container) return;

        let html = '<div class="slider-wrapper">';
        
        // Create slides
        slidesData.forEach((slide, index) => {
            const activeClass = index === 0 ? 'active' : '';
            html += `
                <div class="slide ${activeClass}" data-slide="${index}">
                    <img src="${slide.image}" alt="${slide.title || 'Slide ' + (index + 1)}" loading="${index === 0 ? 'eager' : 'lazy'}">
                    ${this.createCaption(slide)}
                </div>
            `;
        });

        html += '</div>';

        // Add navigation arrows
        if (sliderSettings.showArrows) {
            html += `
                <button class="slider-nav prev" aria-label="Previous slide">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                </button>
                <button class="slider-nav next" aria-label="Next slide">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                </button>
            `;
        }

        // Add dots indicator
        if (sliderSettings.showDots) {
            html += '<div class="slider-dots">';
            slidesData.forEach((_, index) => {
                const activeClass = index === 0 ? 'active' : '';
                html += `<span class="dot ${activeClass}" data-slide="${index}"></span>`;
            });
            html += '</div>';
        }

        container.innerHTML = html;
        this.slides = container.querySelectorAll('.slide');
    }

    createCaption(slide) {
        if (!sliderSettings.showCaptions || (!slide.title && !slide.description)) {
            return '';
        }

        return `
            <div class="slide-caption">
                ${slide.title ? `<h3>${slide.title}</h3>` : ''}
                ${slide.description ? `<p>${slide.description}</p>` : ''}
            </div>
        `;
    }

    setupEventListeners() {
        const container = document.getElementById('slider-container');
        if (!container) return;

        // Previous button
        const prevBtn = container.querySelector('.slider-nav.prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }

        // Next button
        const nextBtn = container.querySelector('.slider-nav.next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Dots
        const dots = container.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.dataset.slide);
                this.goToSlide(slideIndex);
            });
        });

        // Pause on hover
        if (sliderSettings.pauseOnHover) {
            container.addEventListener('mouseenter', () => this.stopAutoPlay());
            container.addEventListener('mouseleave', () => {
                if (sliderSettings.autoPlay) {
                    this.startAutoPlay();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    goToSlide(index) {
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        if (dots.length > 0) {
            dots[this.currentSlide].classList.remove('active');
        }

        // Set new current slide
        this.currentSlide = index;

        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');
        
        // Update dots
        if (dots.length > 0) {
            dots[this.currentSlide].classList.add('active');
        }

        // Reset autoplay
        if (sliderSettings.autoPlay) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, sliderSettings.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (slidesData && slidesData.length > 0) {
        new Slider();
    }
});