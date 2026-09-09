/* ============================================
   PORTFOLIO — Anwar Udin Sayfulloh
   Interaktivitas: neural network, typing,
   scroll reveal, filter, navbar, dll.
   ============================================ */

// ===== 1. PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1800); // tampil 1.8 detik
});

// ===== 2. NAVBAR: scroll effect & active link =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Navbar background saat scroll
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Highlight nav link sesuai section aktif
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Scroll-to-top button
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
});

// ===== 3. HAMBURGER MENU (Mobile) =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== 4. TYPING EFFECT (Hero) =====
const typingText = document.getElementById('typing-text');
const phrases = [
    'AI Engineer',
    'Machine Learning',
    'Deep Learning',
    'Data Analytics',
    'MLOps Engineer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 45 : 90;

    // Selesai mengetik -> jeda, lalu hapus
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 1800; // jeda di akhir kalimat
        isDeleting = true;
    }
    // Selesai menghapus -> pindah frasa
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// ===== 5. NEURAL NETWORK ANIMATION (Canvas Hero) =====
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 70;
const connectDistance = 130;
const mouse = { x: null, y: null, radius: 160 };

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2 + 1
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        // Gerakkan particle
        p.x += p.vx;
        p.y += p.vy;

        // Pantul di tepi
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Interaksi dengan mouse (partikel menjauh)
        if (mouse.x !== null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouse.radius && dist > 0) {
                p.x += (dx / dist) * 1.5;
                p.y += (dy / dist) * 1.5;
            }
        }

        // Gambar titik
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 217, 255, 0.7)';
        ctx.fill();
    });

    // Gambar garis koneksi antar partikel
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.hypot(dx, dy);

            if (dist < connectDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 217, 255, ${1 - dist / connectDistance})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

// Track mouse
canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

resizeCanvas();
initParticles();
animateParticles();

// ===== 6. SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== 7. PROJECT FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects .project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update tombol aktif
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category.includes(filter)) {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                card.offsetHeight; // trigger reflow
                card.style.animation = 'fadeInCard 0.5s ease';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== 8. COUNTER ANIMATION (Stats) =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            if (Number.isNaN(target)) {
                counterObserver.unobserve(el);
                return;
            }
            let count = 0;
            const duration = 1500;
            const increment = Math.ceil(target / (duration / 16));

            const updateCount = () => {
                count += increment;
                if (count >= target) {
                    el.textContent = target;
                } else {
                    el.textContent = count;
                    requestAnimationFrame(updateCount);
                }
            };
            updateCount();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

// ===== 9. SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scroll-top');

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== 10. EASTER EGG: Konami-style console log =====
console.log(
    '%c👋 Hello, fellow explorer!%c\n' +
    '%cInterested in the code behind this portfolio?\n' +
    'Check out my GitHub: https://github.com/ipul122',
    'color:#00d9ff;font-size:16px;font-weight:bold;',
    '',
    'color:#8b949e;font-size:12px;'
);