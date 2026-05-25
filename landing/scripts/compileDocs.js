import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

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
          icon = '💡';
          title = 'Совет:';
          className = 'alert-tip';
          break;
        case 'IMPORTANT':
          icon = '📢';
          title = 'Важно:';
          className = 'alert-important';
          break;
        case 'WARNING':
          icon = '⚠️';
          title = 'Внимание:';
          className = 'alert-warning';
          break;
        case 'NOTE':
          icon = 'ℹ️';
          title = 'Примечание:';
          className = 'alert-note';
          break;
      }
      
      const innerContent = alertLines.join('\n').trim();
      const htmlContent = marked.parse(innerContent).trim();
      
      const alertHtml = `<div class="alert-box ${className}"><span class="alert-icon">${icon}</span><strong>${title}</strong> ${htmlContent}</div>`;
      resultLines.push(alertHtml);
    } else {
      resultLines.push(line);
      i++;
    }
  }
  return resultLines.join('\n');
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
