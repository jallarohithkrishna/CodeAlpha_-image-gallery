document.addEventListener('DOMContentLoaded', () => {

    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentImages = [];
    let currentIndex = 0;


    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');

                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.classList.add('hide');
                }
            });


            updateCurrentImages();
        });
    });


    

    function updateCurrentImages() {
        currentImages = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
    }
    updateCurrentImages();


    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('h3').innerText;
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.innerText = caption;
            

            currentIndex = currentImages.indexOf(item);
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });


    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeLightbox);
    

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });


    function showImage(index, direction) {
        if (index < 0) {
            currentIndex = currentImages.length - 1;
        } else if (index >= currentImages.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        const item = currentImages[currentIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('h3').innerText;
        

        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = direction === 'next' ? 'translateX(-30px) scale(0.95)' : 'translateX(30px) scale(0.95)';
        
        setTimeout(() => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.innerText = caption;
            

            lightboxImg.style.transform = direction === 'next' ? 'translateX(30px) scale(0.95)' : 'translateX(-30px) scale(0.95)';
            

            void lightboxImg.offsetWidth;
            

            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'translateX(0) scale(1)';
        }, 300);
    }

    prevBtn.addEventListener('click', () => showImage(currentIndex - 1, 'prev'));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1, 'next'));


    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1, 'prev');
        if (e.key === 'ArrowRight') showImage(currentIndex + 1, 'next');
    });
});


const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);
