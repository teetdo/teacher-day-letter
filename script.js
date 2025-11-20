// Background floating icons
const bgDecoration = document.getElementById('bg-decoration');
const icons = ['📚', '✏️', '🎓', '🍎', '📖', '🌟', '💡', '🏆'];

for (let i = 0; i < 15; i++) {
    const icon = document.createElement('div');
    icon.className = 'floating-icon';
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.left = Math.random() * 100 + '%';
    icon.style.top = Math.random() * 100 + '%';
    icon.style.animationDelay = Math.random() * 5 + 's';
    icon.style.animationDuration = (Math.random() * 10 + 10) + 's';
    bgDecoration.appendChild(icon);
}

const container = document.getElementById('envelope-container');
const instruction = document.getElementById('instruction');
const closeBtn = document.getElementById('close-btn');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d', { alpha: true });

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let isOpen = false;
let animationFrameId = null;

container.addEventListener('click', (e) => {
    if (!isOpen && e.target.id !== 'close-btn') {
        container.classList.add('open');
        instruction.style.display = 'none';
        isOpen = true;
        
        createHeartBurst(e.clientX, e.clientY);
        
        setTimeout(() => {
            startConfetti();
        }, 800);
    }
});

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen) {
        container.classList.remove('open');
        instruction.style.display = 'block';
        isOpen = false;
        
        particles.length = 0;
        ctx.clearRect(0, 0, width, height);
        
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
});

function createHeartBurst(x, y) {
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-burst';
        heart.textContent = '❤️';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 100;
        heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }, 250);
});

const particles = [];
const shapes = ['🌸', '🌺', '🌼', '🌻', '💮', '🏵️', '🌷', '⭐', '✨', '💫', '🎊'];

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = -50;
        this.size = Math.random() * 15 + 12;
        this.speedY = Math.random() * 1.5 + 0.8;
        this.speedX = (Math.random() * 1.5 - 0.75);
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.4 + 0.4;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > height + 50) {
            this.reset();
        }
    }

    draw(context) {
        context.save();
        context.globalAlpha = this.opacity;
        context.translate(this.x, this.y);
        context.rotate((this.rotation * Math.PI) / 180);
        context.font = `${this.size}px Arial`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(this.shape, 0, 0);
        context.restore();
    }
}

function initParticles() {
    particles.length = 0;
    for (let i = 0; i < 30; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
    }
    
    animationFrameId = requestAnimationFrame(animate);
}

function startConfetti() {
    initParticles();
    animate();
}