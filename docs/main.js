// --- Canvas Background ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

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
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.5)';
        ctx.fill();
    }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        particles.slice(i + 1).forEach(p2 => {
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 * (1 - dist / 150)})`;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animate();

// --- Marked Plugins ---
if (window.markedGfmHeadingId) {
    marked.use(window.markedGfmHeadingId.gfmHeadingId());
}

// --- Mermaid Init ---
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    themeVariables: {
        fontFamily: 'Inter',
        primaryColor: '#00e5ff',
        lineColor: '#00e5ff'
    }
});

// --- SPA Router & View Management ---
const landingView = document.getElementById('landing-view');
const docsView = document.getElementById('docs-view');
const docsContent = document.getElementById('docs-content');

function showView(viewName) {
    if (viewName === 'docs') {
        landingView.classList.add('hidden');
        docsView.classList.remove('hidden');
        window.scrollTo(0,0);
        // Load default doc if none selected
        if (!docsContent.innerHTML.trim()) loadDoc('README.md');
    } else {
        landingView.classList.remove('hidden');
        docsView.classList.add('hidden');
    }
}

// Event Listeners for Nav
document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-link');
        showView(target);
        if (target === 'docs' && link.hasAttribute('data-doc')) {
            loadDoc(link.getAttribute('data-doc'));
        }
    });
});

// Event listener for anchor links in markdown
docsContent.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Adjust scroll for sticky header offset
            const offset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            history.pushState(null, null, '#' + targetId);
        }
    }
});

// --- Markdown Rendering ---
async function loadDoc(fileName) {
    // Update active state in sidebar
    document.querySelectorAll('.docs-nav-link').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-doc') === fileName);
    });

    try {
        const response = await fetch(fileName);
        if (!response.ok) throw new Error('Failed to load doc');
        const markdown = await response.text();
        
        // Use marked to render markdown
        docsContent.innerHTML = `<div class="markdown-body">${marked.parse(markdown)}</div>`;
        
        // Transform Mermaid blocks from marked output
        document.querySelectorAll('pre code.language-mermaid').forEach(block => {
            const pre = block.parentElement;
            const mermaidDiv = document.createElement('div');
            mermaidDiv.className = 'mermaid';
            mermaidDiv.textContent = block.textContent;
            pre.replaceWith(mermaidDiv);
        });

        // Render Mermaid Diagrams
        await mermaid.run({
            nodes: document.querySelectorAll('.mermaid')
        });

        // Highlight code blocks
        document.querySelectorAll('pre code:not(.language-mermaid)').forEach((block) => {
            hljs.highlightElement(block);
        });

        window.scrollTo(0,0);
    } catch (err) {
        docsContent.innerHTML = `<p style="color: red;">Error loading documentation: ${err.message}</p>`;
    }
}

// --- Terminal Simulation ---
const terminalBody = document.getElementById('terminal-content');
const codeLines = [
    '<span class="cyan">$ python cli.py</span>',
    '<span class="amber">Initializing Tolstoy Architecture v2.1...</span>',
    'Hardware: [CUDA/RTX 4090] optimized.',
    'Layers: 12 | Hidden: 768 | Heads: 12',
    '-------------------------------------------',
    '       [ TOLSTOY AI CONTROL PANEL ]',
    '-------------------------------------------',
    '[1] Dataset Selection      <span class="cyan">✔ OK</span>',
    '[2] Neural Cleaner         <span class="cyan">✔ Ready</span>',
    '[3] Start Training         <span class="amber">⏳ Pending</span>',
    '[4] Interactive Chat',
    '[5] System Diagnostics',
    '-------------------------------------------',
    '<span class="cyan">Select option [1-5]: </span>'
];

let lineIndex = 0;
function typeCode() {
    if (lineIndex < codeLines.length) {
        const div = document.createElement('div');
        div.innerHTML = codeLines[lineIndex];
        terminalBody.appendChild(div);
        lineIndex++;
        setTimeout(typeCode, 200);
    }
}

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        typeCode();
        observer.disconnect();
    }
}, { threshold: 0.5 });
observer.observe(document.querySelector('.terminal-window'));
