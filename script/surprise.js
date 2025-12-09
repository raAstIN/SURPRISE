gsap.registerPlugin(ScrollTrigger);

// --- بخش ۰: انیمیشن تایپ کردن عنوان و متن intro ---
const introTitle = document.getElementById('intro-title');
const introText1 = document.getElementById('intro-text1');
const introText2 = document.getElementById('intro-text2');

if (introTitle && introText1 && introText2) {
    // ذخیره متن‌های اصلی
    const titleText = introTitle.textContent;
    const text1Content = introText1.textContent;
    const text2Content = introText2.textContent;
    
    // خالی کردن عناصر
    introTitle.textContent = '';
    introText1.textContent = '';
    introText2.textContent = '';
    
    // تقسیم به کلمات و ساخت span‌های برای انیمیشن
    const titleWords = titleText.split(' ');
    const text1Words = text1Content.split(' ');
    const text2Words = text2Content.split(' ');
    
    // ساخت span‌های عنوان
    const titleSpans = titleWords.map(word => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word + ' ';
        span.style.opacity = '0';
        introTitle.appendChild(span);
        return span;
    });
    
    // ساخت span‌های متن اول
    const text1Spans = text1Words.map(word => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word + ' ';
        span.style.opacity = '0';
        introText1.appendChild(span);
        return span;
    });
    
    // ساخت span‌های متن دوم
    const text2Spans = text2Words.map(word => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word + ' ';
        span.style.opacity = '0';
        introText2.appendChild(span);
        return span;
    });
    
    // انیمیشن کلمات با GSAP - فقط وقتی intro section visible شه
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
        ScrollTrigger.create({
            trigger: introSection,
            start: 'top 80%',
            onEnter: () => {
                const introTL = gsap.timeline();
                
                // انیمیشن عنوان
                introTL.to(titleSpans, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power1.out',
                    stagger: 0.3
                }, 0);
                
                // انیمیشن متن اول
                introTL.to(text1Spans, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power1.out',
                    stagger: 0.3
                }, 0.5);
                
                // انیمیشن متن دوم
                introTL.to(text2Spans, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power1.out',
                    stagger: 0.3
                }, 1);
            }
        });
    }
}

// --- بخش ۱: انیمیشن اسلایدهای خلاقانه ---
const creativeWrapper = document.querySelector('.creative-slides-wrapper');
if (creativeWrapper) {
    const secondCreative = document.querySelector('#date-slide .creative-content');

    const creativeTl = gsap.timeline({
        scrollTrigger: {
            trigger: creativeWrapper,
            start: "top 80%",
            end: "top top",
            scrub: 1.5,
            markers: false,
        }
    });

    creativeTl.fromTo(secondCreative, { autoAlpha: 0, scale: 0.9, y: 50 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" });
}

// --- بخش 2.5: انیمیشن کلمه به کلمه برای عنوان و متن خاطرات ---
function animateMemoryWords() {
    const textContents = document.querySelectorAll('.text-content');
    
    textContents.forEach(textContent => {
        const countdownTimer = textContent.querySelector('.countdown-timer');
        const h2 = textContent.querySelector('h2');
        const dateElement = textContent.querySelector('.memory-date');
        const p = textContent.querySelector('p:not(.memory-date)');
        
        // انیمیشن عنوان
        if (h2) {
            const h2Text = h2.textContent;
            h2.textContent = '';
            const h2Words = h2Text.split(' ');
            const h2Spans = h2Words.map(word => {
                const span = document.createElement('span');
                span.className = 'word';
                span.textContent = word + ' ';
                return span;
            });
            h2.append(...h2Spans);
        }
        
        // انیمیشن متن پاراگراف
        if (p) {
            const pText = p.textContent;
            p.textContent = '';
            const pWords = pText.split(' ');
            const pSpans = pWords.map(word => {
                const span = document.createElement('span');
                span.className = 'word';
                span.textContent = word + ' ';
                return span;
            });
            p.append(...pSpans);
        }
        
        // ScrollTrigger برای شروع انیمیشن
        const section = textContent.closest('.scroll-section');
        if (section) {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 75%',
                onEnter: () => {
                    let wordIndex = 0;
                    
                    // انیمیشن countdown timer
                    if (countdownTimer) {
                        gsap.to(countdownTimer, {
                            opacity: 1,
                            duration: 0.5,
                            delay: 0,
                            ease: 'power1.out'
                        });
                        wordIndex += 1;
                    }
                    
                    // انیمیشن کلمات عنوان
                    const h2Words = h2 ? h2.querySelectorAll('.word') : [];
                    h2Words.forEach((word) => {
                        gsap.to(word, {
                            opacity: 1,
                            duration: 0.3,
                            delay: wordIndex * 0.2,
                            ease: 'power1.out'
                        });
                        wordIndex++;
                    });
                    
                    // انیمیشن تاریخ
                    if (dateElement) {
                        gsap.to(dateElement, {
                            opacity: 1,
                            duration: 0.4,
                            delay: wordIndex * 0.2 + 0.2,
                            ease: 'power1.out'
                        });
                        wordIndex += 1;
                    }
                    
                    // انیمیشن کلمات پاراگراف
                    const pWords = p ? p.querySelectorAll('.word') : [];
                    pWords.forEach((word) => {
                        gsap.to(word, {
                            opacity: 1,
                            duration: 0.3,
                            delay: wordIndex * 0.2,
                            ease: 'power1.out'
                        });
                        wordIndex++;
                    });
                }
            });
        }
    });
}

// فراخوانی تابع بعد از بارگذاری DOM
animateMemoryWords();

// --- Countdown Timer ---
function updateCountdownTimer() {
    const startDate = new Date('2022-05-20');
    const today = new Date();
    
    // محاسبه تفاوت
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();
    let days = today.getDate() - startDate.getDate();
    
    // تصحیح اگر روز منفی شود
    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    // تصحیح اگر ماه منفی شود
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // تبدیل به اعداد فارسی
    const persianNumbers = (num) => {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(num).split('').map(digit => persianDigits[digit]).join('');
    };
    
    // بهروزرسانی DOM
    const yearsEl = document.getElementById('countdown-years');
    const monthsEl = document.getElementById('countdown-months');
    const daysEl = document.getElementById('countdown-days');
    
    if (yearsEl) yearsEl.textContent = persianNumbers(years);
    if (monthsEl) monthsEl.textContent = persianNumbers(months);
    if (daysEl) daysEl.textContent = persianNumbers(days);
}

// فراخوانی اولیه
updateCountdownTimer();

// بهروزرسانی هر روز
setInterval(updateCountdownTimer, 86400000);

// --- بخش ۲: انیمیشن گالری عکس با Parallax و Staggered Effects ---
const imageSections = gsap.utils.toArray('.scroll-section:not(.creative-slide)');
const scrollImages = gsap.utils.toArray('.scroll-image');

// ریست کردن تمام scroll-images به opacity 0
gsap.set(scrollImages, { opacity: 0 });

// هر بخش را جداگانه animate کن بدون pin کردن کل container
imageSections.forEach((section, index) => {
    const contentFrame = section.querySelector('.content-frame');
    const imageWrapper = section.querySelector('.sharp-image-wrapper');
    const textContent = section.querySelector('.text-content');
    const sharpImage = section.querySelector('.sharp-image');
    const isLastMemory = section.id === 'last-memory';
    const isTextOnly = section.classList.contains('text-only-section');
    
    // پیدا کردن src عکس sharp-image
    let imageSrc = sharpImage ? (sharpImage.dataset.src || sharpImage.src) : null;
    
    // اگر این عکس در scroll-images هست، آن را نمایش بده
    if (imageSrc) {
        const correspondingScrollImage = scrollImages.find(img => (img.dataset.src || img.src) === imageSrc);
        if (correspondingScrollImage) {
            // Timeline برای fade in و fade out
            const bgTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    end: "bottom 10%",
                    scrub: 0.5,
                    markers: false
                }
            });
            
            // Fade in از top 90% تا top 70%
            bgTimeline.fromTo(correspondingScrollImage,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power1.inOut" },
                0
            );
            
            // Stay visible در وسط
            bgTimeline.to(correspondingScrollImage, { opacity: 1, duration: 1 }, 0.5);
            
            // Fade out از bottom 30% تا bottom 10%
            bgTimeline.to(correspondingScrollImage,
                { opacity: 0, duration: 0.5, ease: "power1.inOut" }
            );
        }
    }
    
    // انیمیشن ظاهر شدن هر کارت
    // برای آخرین خاطره، انیمیشن نرم‌تر و بدون scrub است
    if (isTextOnly) {
        gsap.fromTo(contentFrame, 
            { autoAlpha: 0, scale: 0.95 }, 
            {
                autoAlpha: 1, 
                scale: 1, 
                duration: 0.6, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 0.5,
                    markers: false
                }
            }
        );
    } else if (isLastMemory) {
        gsap.fromTo(contentFrame, 
            { autoAlpha: 0, y: 30 }, 
            {
                autoAlpha: 1, 
                y: 0, 
                duration: 1, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    end: "top 65%",
                    scrub: false,
                    markers: false
                }
            }
        );
    } else {
        gsap.fromTo(contentFrame, 
            { autoAlpha: 0, y: 40, visibility: 'hidden' }, 
            {
                autoAlpha: 1, 
                y: 0, 
                visibility: 'visible', 
                duration: 0.5, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 0.5,
                    markers: false
                }
            }
        );
    }

    // Text reveal animation
    if (textContent) {
        if (isLastMemory) {
            gsap.fromTo(textContent,
                { autoAlpha: 0, x: -20 },
                {
                    autoAlpha: 1, 
                    x: 0, 
                    duration: 0.8, 
                    ease: "power2.out",
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        end: "top 65%",
                        scrub: false,
                        markers: false
                    }
                }
            );
        } else {
            gsap.fromTo(textContent,
                { autoAlpha: 0, x: -30 },
                {
                    autoAlpha: 1, 
                    x: 0, 
                    duration: 0.5, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "top 50%",
                        scrub: 0.5
                    }
                }
            );
        }
    }

    // Parallax effect برای عکس
    if (imageWrapper && !isLastMemory) {
        gsap.to(imageWrapper, {
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                scrub: 1,
                markers: false
            },
            y: -30,
            ease: "none"
        });
    }
});

// --- بخش ۳: Keyboard Navigation ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === ' ') {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
});

// --- بخش 4: منطق اسلایدر اتوماتیک ---
const multiPhotoSections = document.querySelectorAll(".multi-photo-memory");

multiPhotoSections.forEach((multiPhotoSection, sliderIndex) => {
    if (multiPhotoSection) {
        const sliderImages = gsap.utils.toArray(multiPhotoSection.querySelectorAll('.slider-image'));
        const sliderDots = gsap.utils.toArray(multiPhotoSection.querySelectorAll('.slider-dots .dot'));
        const prevBtn = multiPhotoSection.querySelector('.slider-nav.prev');
        const nextBtn = multiPhotoSection.querySelector('.slider-nav.next');
        
        let currentIndex = 0;
        let sliderInterval;
        let isSliderActive = false;

        const updateSlider = (newIndex) => {
            if (currentIndex === newIndex) return;

            const oldIndex = currentIndex;
            currentIndex = newIndex;

            // Remove classes from old image
            sliderImages[oldIndex].classList.remove('active');
            sliderImages[oldIndex].classList.add('prev');

            // Add active class to new image
            setTimeout(() => {
                sliderImages[oldIndex].classList.remove('prev');
            }, 800);

            sliderImages[currentIndex].classList.add('active');

            // Update dots
            sliderDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        const startAutoSlide = () => {
            stopAutoSlide(); // Ensure no multiple intervals are running
            sliderInterval = setInterval(nextSlide, 4000);
        };

        const stopAutoSlide = () => clearInterval(sliderInterval);

        const nextSlide = () => {
            clearInterval(sliderInterval);
            const newIndex = (currentIndex + 1) % sliderImages.length;
            updateSlider(newIndex);
            if (isSliderActive) {
                startAutoSlide();
            }
        };

        const prevSlide = () => {
            clearInterval(sliderInterval);
            const newIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
            updateSlider(newIndex);
            if (isSliderActive) {
                startAutoSlide();
            }
        };

        // Initialize slider
        const initSlider = () => {
            console.log(`Slider ${sliderIndex + 1} initialized`);
            gsap.set(sliderImages, { opacity: 0 });
            if (sliderImages.length > 0) {
                sliderImages[0].classList.add('active');
            }
            if (sliderDots.length > 0) {
                sliderDots[0].classList.add('active');
            }
            isSliderActive = true;
            startAutoSlide();
        };

        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        sliderDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                clearInterval(sliderInterval);
                updateSlider(idx);
                if (isSliderActive) {
                    startAutoSlide();
                }
            });
        });

        // Pause on hover
        multiPhotoSection.addEventListener('mouseenter', stopAutoSlide);
        multiPhotoSection.addEventListener('mouseleave', () => {
            if (isSliderActive) {
                startAutoSlide();
            }
        });

        ScrollTrigger.create({
            trigger: multiPhotoSection,
            start: "top center",
            end: "bottom center",
            onEnter: initSlider,
            onLeave: stopAutoSlide,
            onEnterBack: () => {
                isSliderActive = true;
                startAutoSlide();
            },
            onLeaveBack: stopAutoSlide,
        });
    }
});

// --- بخش ۵: منطق‌های دیگر (شمارشگر و دکمه بازگشت) ---
const progressContainer = document.getElementById('progress-container');
const progressBar = document.querySelector('.progress-bar');
const circumference = 2 * Math.PI * 28;

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        progressContainer.classList.add('visible');
    } else {
        progressContainer.classList.remove('visible');
    }
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    progressBar.style.strokeDashoffset = circumference - (scrollPercent * circumference);
});

progressContainer.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// شمارشگرها
const startDate = new Date('2022-05-20T00:00:00');
const returnDate = new Date('2024-12-14T00:00:00');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (hoursElement) hoursElement.innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (minutesElement) minutesElement.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (secondsElement) secondsElement.innerText = Math.floor((diff % (1000 * 60)) / 1000);

    const diffReturn = now - returnDate;
    document.getElementById('days-return').innerText = Math.floor(diffReturn / (1000 * 60 * 60 * 24));
    document.getElementById('hours-return').innerText = Math.floor((diffReturn % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('minutes-return').innerText = Math.floor((diffReturn % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('seconds-return').innerText = Math.floor((diffReturn % (1000 * 60)) / 1000);
}

if (document.getElementById('date-slide')) {
    setInterval(updateCounter, 1000);
    updateCounter();
}

// --- بخش ۶: Lazy Loading عکس‌ها ---
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('.scroll-image, .sharp-image, .slider-image');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// --- بخش ۷: انیمیشن نوشتن متن کلمه به کلمه در بخش پایانی ---
const closingText = document.getElementById('closing-text');
if (closingText) {
    const text = 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز است. کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فناوری اطلاعات شامل.';
    const words = text.split(' ');
    
    // تمام کلمات را به span میپیچیم
    const wordSpans = words.map(word => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word + ' ';
        return span;
    });
    
    closingText.append(...wordSpans);
    
    // ScrollTrigger برای شروع انیمیشن هنگام رسیدن به بخش
    ScrollTrigger.create({
        trigger: closingText,
        start: 'top 70%',
        onEnter: () => {
            wordSpans.forEach((span, index) => {
                gsap.to(span, {
                    opacity: 1,
                    duration: 0.3,
                    delay: index * 0.2,
                    ease: 'power1.out'
                });
            });
        }
    });
}

// --- Background Management: Set background image based on section content ---
(function() {
    const bgContainer = document.createElement('div');
    bgContainer.id = 'bg-transition';
    document.body.insertBefore(bgContainer, document.body.firstChild);

    // Helper function to set background
    const setBackground = (src) => {
        if (!src) {
            bgContainer.style.backgroundImage = 'none';
            bgContainer.style.backgroundColor = '#000';
        } else {
            bgContainer.style.backgroundImage = `url("${src}")`;
            bgContainer.style.backgroundColor = '#000';
        }
    };

    // Helper function to get image src from section
    const getImageSrcFromSection = (section) => {
        const isMultiPhoto = section.classList.contains('multi-photo-memory');
        const isTextOnly = section.classList.contains('text-only-section');

        if (isTextOnly) {
            return null; // Black background for text-only
        }

        if (isMultiPhoto) {
            // For slider sections, get the currently active image
            const activeImage = section.querySelector('.slider-image.active');
            if (activeImage) {
                return activeImage.dataset.src || activeImage.src;
            }
            // If no active image yet, get the first one
            const firstImage = section.querySelector('.slider-image');
            return firstImage ? (firstImage.dataset.src || firstImage.src) : null;
        }

        // For regular sections, get the sharp-image
        const sharpImage = section.querySelector('.sharp-image');
        if (sharpImage) {
            return sharpImage.dataset.src || sharpImage.src;
        }

        return null;
    };

    // Set initial background from first scroll section
    const firstSection = document.querySelector('.scroll-section');
    if (firstSection) {
        const initialSrc = getImageSrcFromSection(firstSection);
        setBackground(initialSrc);
    }

    // Handle scroll sections
    const scrollSections = document.querySelectorAll('.scroll-section');
    scrollSections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            onEnter: () => {
                const src = getImageSrcFromSection(section);
                setBackground(src);
            },
            onEnterBack: () => {
                const src = getImageSrcFromSection(section);
                setBackground(src);
            }
        });
    });

    // Handle slider image changes for multi-photo sections
    const multiPhotoSections = document.querySelectorAll('.multi-photo-memory');
    multiPhotoSections.forEach((section) => {
        // We need to hook into the slider update mechanism
        // Store a reference to update the background when slider changes
        section.addEventListener('sliderImageChange', (e) => {
            const src = getImageSrcFromSection(section);
            setBackground(src);
        });
    });
})();

// Modify the slider update function to notify background about changes
(function() {
    const multiPhotoSections = document.querySelectorAll(".multi-photo-memory");

    multiPhotoSections.forEach((multiPhotoSection, sliderIndex) => {
        const sliderImages = gsap.utils.toArray(multiPhotoSection.querySelectorAll('.slider-image'));
        
        // Store original updateSlider if we need to wrap it
        // We'll use MutationObserver to watch for active class changes
        const observer = new MutationObserver(() => {
            const activeImage = multiPhotoSection.querySelector('.slider-image.active');
            if (activeImage) {
                const src = activeImage.dataset.src || activeImage.src;
                const bgContainer = document.getElementById('bg-transition');
                if (bgContainer) {
                    bgContainer.style.backgroundImage = `url("${src}")`;
                }
            }
        });

        // Watch all slider images for class changes
        sliderImages.forEach(img => {
            observer.observe(img, { attributes: true, attributeFilter: ['class'] });
        });
    });
})();
