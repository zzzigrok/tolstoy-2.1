// Canvas Particles Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.5)';
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw lines
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 229, 255, ${0.2 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animate();

// Scroll Reveal
const revealElements = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// Terminal Typing Simulation
const terminalBody = document.getElementById('terminal-content');
const codeLines = [
    '<span class="cyan">$ python cli.py</span>',
    '<span class="amber">Loading Tolstoy AI v2.1...</span>',
    'CUDA Device: NVIDIA GeForce RTX 4090 detected.',
    'Model initialized with 12 layers, 768 hidden size.',
    '',
    '-------------------------------------------',
    '       [ TOLSTOY AI CONTROL PANEL ]',
    '-------------------------------------------',
    '[1] Select Dataset         <span class="cyan">✔ OK</span>',
    '[2] Data Cleaner           <span class="cyan">✔ Ready</span>',
    '[3] Start Training         <span class="amber">⏳ Pending</span>',
    '[4] Run Chat Interface',
    '[5] Debug & Diagnostics',
    '-------------------------------------------',
    '',
    '<span class="cyan">Select option [1-5]: </span>'
];

let lineIndex = 0;
function typeCode() {
    if (lineIndex < codeLines.length) {
        const line = document.createElement('div');
        line.innerHTML = codeLines[lineIndex];
        terminalBody.appendChild(line);
        lineIndex++;
        setTimeout(typeCode, 300);
    }
}

// Start typing when terminal is revealed
const terminalObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        typeCode();
        terminalObserver.disconnect();
    }
}, { threshold: 0.5 });

terminalObserver.observe(document.querySelector('.terminal-window'));
