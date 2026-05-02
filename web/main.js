// --- Canvas Background Animation ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

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
        this.color = Math.random() > 0.5 ? '#00e5ff' : '#a29bfe';
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + '44'; // Add alpha
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        
        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(162, 155, 254, ${0.1 * (1 - dist/120)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}
animate();

// --- Terminal Typewriter Effect ---
const terminalBody = document.getElementById('terminal-text');
const terminalLines = [
    '> Initializing Tolstoy-Core-v2.1...',
    '> Loading architecture: 12 Layers | 768 Emb | 12 Heads',
    '> Device: [CUDA] initialized on RTX 4090.',
    '> Loading weights... [####################] 100%',
    '> Ready for inference.',
    '> _'
];

let lineIdx = 0;
function typeTerminal() {
    if (lineIdx < terminalLines.length) {
        let line = terminalLines[lineIdx];
        let p = document.createElement('p');
        p.style.margin = '4px 0';
        terminalBody.appendChild(p);
        
        let charIdx = 0;
        let timer = setInterval(() => {
            p.textContent += line[charIdx];
            charIdx++;
            if (charIdx >= line.length) {
                clearInterval(timer);
                lineIdx++;
                setTimeout(typeTerminal, 400);
            }
        }, 30);
    }
}

// Start terminal typing when in view
const terminalObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        typeTerminal();
        terminalObserver.disconnect();
    }
}, { threshold: 0.5 });
terminalObserver.observe(document.querySelector('.terminal'));

// --- Interactive Generator Demo ---
const startBtn = document.getElementById('start-demo');
const output = document.getElementById('generation-output');
const userInput = document.getElementById('user-prompt');

const sampleTextFallback = "Все счастливые семьи похожи друг на друга, каждая несчастливая семья несчастлива по-своему. Все смешалось в доме Облонских. Жена узнала, что муж был в связи с бывшею в их доме француженкою-гувернанткой, и объявила мужу, что не может жить с ним в одном доме... Но в это мгновение он почувствовал, что жизнь его не кончена, что впереди еще много света и тени, и он улыбнулся своей мысли.";

let isGenerating = false;

async function typeEffect(text) {
    let i = 0;
    return new Promise(resolve => {
        let timer = setInterval(() => {
            output.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                resolve();
            }
        }, 40);
    });
}

startBtn.addEventListener('click', async () => {
    if (isGenerating) return;
    isGenerating = true;
    
    const prompt = userInput.value || "Все счастливые семьи";
    output.textContent = "";
    startBtn.disabled = true;
    startBtn.style.opacity = "0.5";

    try {
        // Пробуем подключиться к локальному серверу
        const response = await fetch('http://localhost:5000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, max_tokens: 150 })
        });

        if (response.ok) {
            const data = await response.json();
            await typeEffect(data.response);
        } else {
            throw new Error('Server unreachable');
        }
    } catch (err) {
        console.warn("Local API not running, using fallback simulation...");
        await typeEffect(sampleTextFallback);
    } finally {
        isGenerating = false;
        startBtn.disabled = false;
        startBtn.style.opacity = "1";
    }
});

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.feature-card, .section-title, .demo-box');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    revealObserver.observe(el);
});
