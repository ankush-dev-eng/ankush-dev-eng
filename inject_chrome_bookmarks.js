import fs from 'fs';
import path from 'path';

const bookmarkPath = path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'User Data', 'Default', 'Bookmarks');

if (!fs.existsSync(bookmarkPath)) {
  console.error('Chrome bookmarks file not found at:', bookmarkPath);
  process.exit(1);
}

const bookmarksData = JSON.parse(fs.readFileSync(bookmarkPath, 'utf8'));

const aiToolsFolder = {
  date_added: (Date.now() * 1000).toString(),
  date_last_used: "0",
  date_modified: (Date.now() * 1000).toString(),
  guid: "g-ai-tools-suite-" + Date.now(),
  id: Date.now().toString(),
  name: "Google AI Tools Suite",
  type: "folder",
  children: [
    { name: "01. Jules - Autonomous Code & Fix Bugs", url: "https://jules.google" },
    { name: "02. Google Opal - Text Prompt to Mini App", url: "https://opal.google" },
    { name: "03. Mixboard - AI Whiteboard for Brainstorming", url: "https://labs.google/mixboard" },
    { name: "04. Google Pomelli - Brand & Social Campaigns", url: "https://labs.google.com/pomelli/about" },
    { name: "05. AntiGravity - Agentic Coding IDE", url: "https://antigravity.google" },
    { name: "06. Stitch - Prompts to UI Design & Code", url: "https://stitch.withgoogle.com" },
    { name: "07. Firebase Studio - Full Stack Apps from Prompt", url: "https://studio.firebase.google.com" },
    { name: "08. Code Wiki - Searchable Codebase Wiki", url: "https://codewiki.google" },
    { name: "09. NotebookLM (Gemini Notebook) - Document Grounded Research", url: "https://notebooklm.google" },
    { name: "10. Disco - Tabs to Custom AI Apps", url: "https://labs.google/disco" },
    { name: "11. Doppl - Virtual Outfit Try-On (Mobile)", url: "https://play.google.com/store" },
    { name: "12. Learn Your Way - Notes to Study Sessions", url: "https://learnyourway.withgoogle.com" },
    { name: "13. Whisk - Remix Images into AI Visuals", url: "https://labs.google/whisk" },
    { name: "14. Google AI Studio - Gemini API & Prototyping", url: "https://aistudio.google.com" },
    { name: "15. Google Illuminate - Research Papers to Audio", url: "https://illuminate.google.com" }
  ].map((tool, idx) => ({
    date_added: (Date.now() * 1000 + idx).toString(),
    date_last_used: "0",
    guid: `g-ai-tool-${idx}-${Date.now()}`,
    id: (Date.now() + idx + 100).toString(),
    name: tool.name,
    type: "url",
    url: tool.url
  }))
};

const bookmarkBarChildren = bookmarksData.roots.bookmark_bar.children;
const existingIndex = bookmarkBarChildren.findIndex(item => item.name === "Google AI Tools Suite");

if (existingIndex !== -1) {
  bookmarkBarChildren[existingIndex] = aiToolsFolder;
  console.log('Updated existing "Google AI Tools Suite" folder in Chrome Bookmarks Bar.');
} else {
  bookmarkBarChildren.unshift(aiToolsFolder);
  console.log('Added "Google AI Tools Suite" folder to Chrome Bookmarks Bar.');
}

fs.writeFileSync(bookmarkPath, JSON.stringify(bookmarksData, null, 2), 'utf8');
console.log('Successfully saved Chrome Bookmarks!');
