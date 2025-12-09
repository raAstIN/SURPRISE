gsap.registerPlugin(ScrollTrigger);

// --- Color Extraction Utility: استخراج رنگ‌های غالب از عکس ---
const ColorExtractor = {
    cache: new Map(),
    
    extractColors: function(imageSrc, callback) {
        if (this.cache.has(imageSrc)) {
            callback(this.cache.get(imageSrc));
            return;
        }
        
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 150;
            canvas.height = 150;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 150, 150);
            
            const imageData = ctx.getImageData(0, 0, 150, 150);
            const data = imageData.data;
            const pixels = [];
            
            // نمونه‌برداری از پیکسل‌ها (هر 4 پیکسل)
            for (let i = 0; i < data.length; i += 16) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];
                
                // نادیده گرفتن پیکسل‌های شفاف یا خیلی روشن
                if (a > 128 && !(r > 240 && g > 240 && b > 240)) {
                    pixels.push([r, g, b]);
                }
            }
            
            // کمینز کلاسترینگ برای پیدا کردن رنگ‌های اصلی
            const colors = this.kMeans(pixels, 3);
            const sortedColors = colors.sort((a, b) => this.brightness(b) - this.brightness(a));
            
            const result = {
                colors: sortedColors.map(c => `rgb(${c[0]},${c[1]},${c[2]})`),
                hex: sortedColors.map(c => this.rgbToHex(c[0], c[1], c[2]))
            };
            
            this.cache.set(imageSrc, result);
            callback(result);
        };
        img.onerror = () => {
            // رنگ پیش‌فرض اگر عکس لود نشد
            callback({
                colors: ['rgb(30, 30, 30)', 'rgb(60, 60, 60)', 'rgb(90, 90, 90)'],
                hex: ['#1e1e1e', '#3c3c3c', '#5a5a5a']
            });
        };
        img.src = imageSrc;
    },
    
    kMeans: function(pixels, k, iterations = 5) {
        if (pixels.length === 0) return Array(k).fill([50, 50, 50]);
        
        let centroids = [];
        for (let i = 0; i < k; i++) {
            centroids.push(pixels[Math.floor(Math.random() * pixels.length)]);
        }
        
        for (let iter = 0; iter < iterations; iter++) {
            const clusters = Array(k).fill(null).map(() => []);
            
            pixels.forEach(pixel => {
                let minDist = Infinity;
                let closestCluster = 0;
                
                centroids.forEach((centroid, i) => {
                    const dist = Math.pow(pixel[0] - centroid[0], 2) + 
                                Math.pow(pixel[1] - centroid[1], 2) + 
                                Math.pow(pixel[2] - centroid[2], 2);
                    if (dist < minDist) {
                        minDist = dist;
                        closestCluster = i;
                    }
                });
                
                clusters[closestCluster].push(pixel);
            });
            
            centroids = clusters.map(cluster => {
                if (cluster.length === 0) return [50, 50, 50];
                const avg = [0, 0, 0];
                cluster.forEach(p => {
                    avg[0] += p[0];
                    avg[1] += p[1];
                    avg[2] += p[2];
                });
                return [Math.round(avg[0] / cluster.length), 
                        Math.round(avg[1] / cluster.length), 
                        Math.round(avg[2] / cluster.length)];
            });
        }
        
        return centroids;
    },
    
    brightness: function(rgb) {
        return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    },
    
    rgbToHex: function(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
};

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
    
    // انیمیشن کلمات با GSAP
    const introTL = gsap.timeline({ delay: 1.3 });
    
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
// --- Background Gradient Transition: استخراج رنگ و ایجاد گرادینت دینامیک ---
(function() {
    const sections = document.querySelectorAll('.scroll-section');
    if (!sections || sections.length === 0) return;

    const bgContainer = document.createElement('div');
    bgContainer.id = 'bg-transition';
    const layerA = document.createElement('div');
    layerA.className = 'bg-layer visible';
    const layerB = document.createElement('div');
    layerB.className = 'bg-layer';
    bgContainer.appendChild(layerA);
    bgContainer.appendChild(layerB);
    document.body.insertBefore(bgContainer, document.body.firstChild);

    let visible = layerA;
    let hidden = layerB;

    const getSectionBackground = (section) => {
        if (section.dataset && section.dataset.bg) return section.dataset.bg;
        const img = section.querySelector('img.scroll-image, img.slider-image, img.sharp-image');
        let src = null;
        if (img) {
            src = (img.dataset && img.dataset.src) ? img.dataset.src : img.src;
        }
        if (!src) {
            const cs = getComputedStyle(section);
            const bg = cs.backgroundImage || '';
            const m = bg.match(/url\((?:"|')?(.*?)(?:"|')?\)/);
            if (m) src = m[1];
        }
        return src;
    };

    const setGradientBg = (imageSrc) => {
        if (!imageSrc) {
            hidden.style.background = 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)';
        } else {
            ColorExtractor.extractColors(imageSrc, (colorData) => {
                const colors = colorData.colors;
                // ایجاد یک گرادینت پیچیده با 3-4 رنگ
                const gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
                hidden.style.background = gradient;
            });
        }
    };

    const setBg = (src) => {
        if (!src) return;
        
        // تنظیم گرادینت روی hidden layer
        setGradientBg(src);
        
        hidden.style.transition = 'none';
        hidden.style.opacity = '0';
        void hidden.offsetHeight;
        hidden.style.transition = 'opacity 0.8s cubic-bezier(0.22, 0.9, 0.35, 1)';
        hidden.style.opacity = '1';
        
        setTimeout(() => {
            visible.classList.remove('visible');
            hidden.classList.add('visible');
            const tmp = visible;
            visible = hidden;
            hidden = tmp;
        }, 800);
    };

    const firstBg = getSectionBackground(sections[0]);
    setGradientBg(firstBg);
    visible.classList.add('visible');

    sections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            onEnter: () => {
                const src = getSectionBackground(section);
                setBg(src);
            },
            onEnterBack: () => {
                const src = getSectionBackground(section);
                setBg(src);
            }
        });
    });

})();
