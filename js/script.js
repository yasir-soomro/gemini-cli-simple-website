document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    
    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        // Apply saved theme on load
        if (localStorage.getItem('dark-mode') === 'enabled') {
            body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Save theme preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                localStorage.setItem('dark-mode', 'disabled');
            }
        });
    }

    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
            body.classList.toggle('nav-open');
        });

        // Close menu when a link is clicked
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
                body.classList.remove('nav-open');
            }
        });
    }

    // --- Testimonial Carousel ---
    const testimonialSlide = document.querySelector('.testimonial-slide');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-nav .prev');
    const nextBtn = document.querySelector('.testimonial-nav .next');

    if (testimonialSlide && testimonials.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalSlides = testimonials.length;

        function showSlide(index) {
            if (index >= totalSlides) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalSlides - 1;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * 100;
            testimonialSlide.style.transform = `translateX(${offset}%)`;
        }

        nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
        prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
        
        setInterval(() => showSlide(currentIndex + 1), 5000);
    }

    // --- Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navA = document.querySelectorAll('.nav-links a');

    if (sections.length > 0 && navA.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });

            navA.forEach(a => {
                a.classList.remove('active');
                if (current && a.getAttribute('href').includes(current)) {
                    a.classList.add('active');
                }
            });
             if (!current && navA[0]) {
                navA[0].classList.add('active');
            }
        });
    }

    // --- Property Modal ---
    const propertyGrid = document.querySelector('.property-grid');
    const modal = document.getElementById('property-modal');
    const closeModal = document.querySelector('.close-button');
    const mainModalImage = document.getElementById('main-modal-image');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    
    if (propertyGrid && modal && closeModal) {
        propertyGrid.addEventListener('click', e => {
            if (e.target.classList.contains('details-button')) {
                e.preventDefault();
                const card = e.target.closest('.property-card');
                
                // Populate Modal
                document.getElementById('modal-title').textContent = card.dataset.title;
                document.getElementById('modal-price').textContent = card.dataset.price;
                document.getElementById('modal-description').textContent = card.dataset.description;
                
                const meta = `
                    <span><i class="fas fa-bed"></i> ${card.dataset.beds} Beds</span>
                    <span><i class="fas fa-bath"></i> ${card.dataset.baths} Baths</span>
                    <span><i class="fas fa-ruler-combined"></i> ${card.dataset.sqft} sqft</span>`;
                document.getElementById('modal-meta').innerHTML = meta;

                // Populate Gallery
                const images = card.dataset.images.split(',');
                mainModalImage.src = images[0];
                thumbnailContainer.innerHTML = '';
                images.forEach((img, index) => {
                    const thumb = document.createElement('img');
                    thumb.src = img;
                    thumb.alt = `Thumbnail ${index + 1}`;
                    if (index === 0) thumb.classList.add('active');
                    thumbnailContainer.appendChild(thumb);
                });

                modal.style.display = 'block';
                body.classList.add('nav-open'); // To prevent background scroll
            }
        });

        // Close Modal
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            body.classList.remove('nav-open');
        });

        window.addEventListener('click', e => {
            if (e.target == modal) {
                modal.style.display = 'none';
                body.classList.remove('nav-open');
            }
        });

        // Thumbnail Click
        thumbnailContainer.addEventListener('click', e => {
            if (e.target.tagName === 'IMG') {
                mainModalImage.src = e.target.src;
                // Update active thumbnail
                thumbnailContainer.querySelectorAll('img').forEach(img => img.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    // --- Scroll-triggered Animations ---
    const animatedElements = document.querySelectorAll('.anim-slide-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});