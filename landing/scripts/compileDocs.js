import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import os from 'os';
import { marked } from 'marked';
import katex from 'katex';

// Setup marked custom extensions for math formulas
const inlineMath = {
  name: 'inlineMath',
  level: 'inline',
  start(src) { return src.indexOf('$'); },
  tokenizer(src, tokens) {
    const match = src.match(/^\$([^$\n]+?)\$/);
    if (match && match[1].trim()) {
      return {
        type: 'inlineMath',
        raw: match[0],
        formula: match[1].trim()
      };
    }
  },
  renderer(token) {
    try {
      return katex.renderToString(token.formula, { displayMode: false, throwOnError: false });
    } catch (err) {
      console.error('KaTeX inline math error:', err);
      return token.raw;
    }
  }
};

const blockMath = {
  name: 'blockMath',
  level: 'block',
  start(src) { return src.indexOf('$$'); },
  tokenizer(src, tokens) {
    const match = src.match(/^\$\$([\s\S]+?)\$\$/);
    if (match && match[1].trim()) {
      return {
        type: 'blockMath',
        raw: match[0],
        formula: match[1].trim()
      };
    }
  },
  renderer(token) {
    try {
      return `<div class="katex-block">${katex.renderToString(token.formula, { displayMode: true, throwOnError: false })}</div>`;
    } catch (err) {
      console.error('KaTeX block math error:', err);
      return token.raw;
    }
  }
};

// Define project root directory relative to script
const projectRoot = fs.existsSync('docs_2.1') 
  ? process.cwd() 
  : path.resolve(process.cwd(), '..');

// Helper to clean emojis and pictographs
function cleanEmojis(str) {
  return str
    .replace(/\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu, '')
    .replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F9FF}\u{2300}-\u{23FF}]/gu, '')
    .replace(/[\uFE00-\uFE0F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanTitle(line) {
  const noHash = line.replace(/^#+\s*/, '').trim();
  return cleanEmojis(noHash);
}

function parseAlerts(content) {
  const lines = content.split('\n');
  const resultLines = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^\s*>\s*\[!(TIP|IMPORTANT|WARNING|NOTE)\]\s*$/i);
    if (match) {
      const type = match[1].toUpperCase();
      const alertLines = [];
      i++;
      while (i < lines.length && lines[i].match(/^\s*>\s?/)) {
        const contentLine = lines[i].replace(/^\s*>\s?/, '');
        alertLines.push(contentLine);
        i++;
      }
      
      let icon = '';
      let title = '';
      let className = '';
      
      switch (type) {
        case 'TIP':
          icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
          title = 'Совет';
          className = 'alert-tip';
          break;
        case 'IMPORTANT':
          icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;
          title = 'Важно';
          className = 'alert-important';
          break;
        case 'WARNING':
          icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`;
          title = 'Внимание';
          className = 'alert-warning';
          break;
        case 'NOTE':
          icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
          title = 'Примечание';
          className = 'alert-note';
          break;
      }
      
      const innerContent = alertLines.join('\n').trim();
      const htmlContent = marked.parse(innerContent).trim();
      
      const alertHtml = `<div class="alert-box ${className}"><div class="alert-icon">${icon}</div><div class="alert-content"><span class="alert-title">${title}</span><div class="alert-text">${htmlContent}</div></div></div>`;
      resultLines.push(alertHtml);
    } else {
      resultLines.push(line);
      i++;
    }
  }
  return resultLines.join('\n');
}

function findBrowserPath() {
  const possiblePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// Pre-render all Mermaid diagrams to SVG using a headless browser
async function batchRenderMermaid(diagramsList) {
  if (diagramsList.length === 0) return {};
  const browserPath = findBrowserPath();
  if (!browserPath) {
    console.warn('No supported headless browser found for Mermaid pre-rendering. Falling back to client-side.');
    return {};
  }

  const tmpHtml = path.resolve(os.tmpdir(), `mermaid_render_${Date.now()}.html`);
  const profileDir = path.resolve(os.tmpdir(), `mermaid_profile_${Date.now()}`);
  if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.4.0/dist/mermaid.esm.min.mjs';
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        background: 'transparent',
        primaryColor: '#1e293b',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: 'rgba(255, 255, 255, 0.15)',
        lineColor: '#60a5fa',
        arrowheadColor: '#60a5fa',
        edgeLabelBackground: '#0f172a',
        secondaryColor: '#0f172a',
        secondaryTextColor: '#cbd5e1',
        secondaryBorderColor: 'rgba(255, 255, 255, 0.1)',
        tertiaryColor: '#1e1b4b',
        tertiaryTextColor: '#e0e7ff',
        tertiaryBorderColor: 'rgba(129, 140, 248, 0.3)',
        noteBkgColor: '#1e293b',
        noteTextColor: '#f8fafc',
        noteBorderColor: 'rgba(255, 255, 255, 0.15)',
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 50,
        rankSpacing: 50,
      },
    });

    const diagrams = ${JSON.stringify(diagramsList)};
    window.renderResults = [];

    async function runAll() {
      for (let i = 0; i < diagrams.length; i++) {
        const d = diagrams[i];
        try {
          const { svg } = await mermaid.render('diagram-' + i, d);
          window.renderResults.push({ code: d, svg, error: null });
        } catch (err) {
          window.renderResults.push({ code: d, svg: null, error: err.message || String(err) });
        }
      }
      window.isDone = true;
    }

    runAll();
  </script>
</head>
<body></body>
</html>`;

  fs.writeFileSync(tmpHtml, htmlContent, 'utf8');

  const port = 9911 + Math.floor(Math.random() * 50);
  const browserProc = spawn(browserPath, [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${profileDir}`,
    `--remote-debugging-port=${port}`,
    `file:///${tmpHtml.replace(/\\/g, '/')}`
  ]);

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.warn('Mermaid batch render timed out after 10s.');
      try {
    if (process.platform === 'win32' && browserProc.pid) {
      spawn('taskkill', ['/pid', browserProc.pid.toString(), '/f', '/t']);
    } else {
      browserProc.kill('SIGKILL');
    }
  } catch (e) {}
      resolve({});
    }, 10000);

    const checkInterval = setInterval(async () => {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/list`).then(r => r.json());
        const target = res.find(t => t.type === 'page');
        if (target && target.webSocketDebuggerUrl) {
          clearInterval(checkInterval);
          const ws = new WebSocket(target.webSocketDebuggerUrl);

          ws.onopen = () => {
            ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
            
            const poll = setInterval(() => {
              ws.send(JSON.stringify({
                id: 9,
                method: 'Runtime.evaluate',
                params: { expression: 'window.isDone', returnByValue: true }
              }));
            }, 100);

            ws.onmessage = (evt) => {
              const data = JSON.parse(evt.data);
              if (data.id === 9 && data.result?.result?.value === true) {
                clearInterval(poll);
                ws.send(JSON.stringify({
                  id: 10,
                  method: 'Runtime.evaluate',
                  params: { expression: 'window.renderResults', returnByValue: true }
                }));
              } else if (data.id === 10) {
                clearTimeout(timeout);
                const results = data.result?.result?.value || [];
                const cache = {};
                for (const r of results) {
                  if (r.svg && !r.error) {
                    cache[r.code] = r.svg;
                  }
                }
                ws.close();
                try { browserProc.kill(); } catch (e) {}
                try { fs.unlinkSync(tmpHtml); } catch (e) {}
                try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}
                resolve(cache);
              }
            };
          };
        }
      } catch (e) {
        // waiting for port
      }
    }, 150);
  });
}

const categoriesDef = [
  {
    title: "Введение и быстрый старт",
    slug: "intro",
    items: [
      { id: "quick-start", file: "docs_2.1/tutorials/QUICK_START.md" }
    ]
  },
  {
    title: "Архитектура и модель",
    slug: "architecture",
    items: [
      { id: "model-spec", file: "docs_2.1/MODEL.md" },
      { id: "simple-llm", file: "docs_2.1/subdocs/SIMPLE_LLM.md" }
    ]
  },
  {
    title: "Компоненты трансформера",
    slug: "components",
    items: [
      { id: "attention", file: "docs_2.1/subdocs/ATTENTION.md" },
      { id: "blocks", file: "docs_2.1/subdocs/BLOCKS.md" }
    ]
  },
  {
    title: "Обучение и датасет",
    slug: "training",
    items: [
      { id: "dataset-spec", file: "docs_2.1/DATASET.md" },
      { id: "dataset-guide", file: "docs_2.1/tutorials/DATASET_GUIDE.md" },
      { id: "training-process", file: "docs_2.1/TRAINING.md" },
      { id: "hyperparameters", file: "docs_2.1/tutorials/HYPERPARAMETERS.md" }
    ]
  },
  {
    title: "Отладка и CLI",
    slug: "debug",
    items: [
      { id: "debug-evaluation", file: "docs_2.1/tutorials/DEBUG_AND_EVALUATION.md" }
    ]
  }
];

async function main() {
  // 1. Collect all mermaid diagram codes across files
  const allDiagramCodes = new Set();
  for (const cat of categoriesDef) {
    for (const item of cat.items) {
      const fullPath = path.resolve(projectRoot, item.file);
      if (fs.existsSync(fullPath)) {
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const regex = /```mermaid\r?\n([\s\S]*?)```/g;
        let m;
        while ((m = regex.exec(raw)) !== null) {
          allDiagramCodes.add(m[1].replace(/\r\n/g, '\n').trim());
        }
      }
    }
  }

  const diagramList = Array.from(allDiagramCodes);
  console.log(`Found ${diagramList.length} unique Mermaid diagram(s). Pre-rendering to SVG...`);
  const renderedCache = await batchRenderMermaid(diagramList);
  const successCount = Object.keys(renderedCache).length;
  console.log(`Successfully pre-rendered ${successCount}/${diagramList.length} diagrams to SVG.`);

  // 2. Configure marked with SVG injection for mermaid
  marked.use({
    extensions: [blockMath, inlineMath],
    renderer: {
      code({ text, lang }) {
        if (lang === 'mermaid') {
          const clean = text.replace(/\r\n/g, '\n').trim();
          const svg = renderedCache[clean];
          if (svg) {
            return `<div class="mermaid-wrapper my-6 flex justify-center w-full overflow-x-auto"><div class="mermaid">${svg}</div></div>\n`;
          }
          return `<div class="mermaid-wrapper my-6 flex justify-center w-full overflow-x-auto"><pre class="mermaid">${text}</pre></div>\n`;
        }
        return false;
      }
    }
  });

  const categoriesData = [];

  for (const cat of categoriesDef) {
    const itemsData = [];
    for (const item of cat.items) {
      const fullPath = path.resolve(projectRoot, item.file);
      if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        process.exit(1);
      }
      
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Extract title from first line starting with #
      const lines = content.split('\n');
      let titleLine = '';
      for (const line of lines) {
        if (line.startsWith('#')) {
          titleLine = line;
          break;
        }
      }
      const title = cleanTitle(titleLine || item.id);
      
      // Word count / 150, rounded up, min 1
      const words = content.trim().split(/\s+/).filter(Boolean);
      const wordCount = words.length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 150));
      
      // Parse alert blocks before markdown compilation
      const processedContent = parseAlerts(content);
      
      // Compile to HTML
      const html = marked.parse(processedContent);
      
      // Inject custom IDs into h2/h3 tags and extract to headings array
      const headings = [];
      const htmlWithIds = html.replace(/<h([23])(?:\s+[^>]*)?>(.*?)<\/h\1>/g, (match, level, headingContent) => {
        const plainText = headingContent.replace(/<[^>]*>/g, '');
        const id = plainText.toLowerCase().replace(/[^a-z0-9а-яё\s-]/g, '').trim().replace(/\s+/g, '-');
        const cleanText = cleanEmojis(plainText);
        headings.push({
          text: cleanText,
          id: id,
          level: parseInt(level, 10)
        });
        return `<h${level} id="${id}">${headingContent}</h${level}>`;
      });
      
      itemsData.push({
        id: item.id,
        title: title,
        html: htmlWithIds,
        readingTime: readingTime,
        headings: headings
      });
    }
    
    categoriesData.push({
      title: cat.title,
      slug: cat.slug,
      items: itemsData
    });
  }

  // Generate TS output
  const outputFilePath = path.resolve(projectRoot, 'landing/src/docsData.ts');

  const tsContent = `export interface DocHeading {
  text: string;
  id: string;
  level: number;
}

export interface DocItem {
  id: string;
  title: string;
  html: string;
  readingTime: number;
  headings: DocHeading[];
}

export interface DocCategory {
  title: string;
  slug: string;
  items: DocItem[];
}

export const docsData: DocCategory[] = ${JSON.stringify(categoriesData, null, 2)};
`;

  fs.writeFileSync(outputFilePath, tsContent, 'utf-8');
  console.log(`Successfully compiled docs to ${outputFilePath}`);
}

main().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('Compilation failed:', err);
  process.exit(1);
});
