/**
 * GameVerse Hub - SVG Cover Generator
 * Generates placeholder SVG images for game covers, screenshots, logo, and hero.
 * Run with: node generate-covers.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coversDir = path.join(__dirname, '..', 'images', 'covers');

// Create directories
fs.mkdirSync(coversDir, { recursive: true });

// Game config: [filename, title, color1, color2]
const games = [
  ['elden-ring', 'ELDEN RING', '#c9a227', '#3a2a08'],
  ['elden-ring-2', 'ELDEN RING', '#8b6b1f', '#1a1406'],
  ['elden-ring-3', 'ELDEN RING', '#5c4813', '#0f0c04'],
  ['zelda-totk', 'ZELDA TOTK', '#0e9e6a', '#06382a'],
  ['zelda-totk-2', 'ZELDA TOTK', '#0b7e58', '#02251c'],
  ['baldurs-gate-3', 'BG3', '#b42b2b', '#3a0b0b'],
  ['baldurs-gate-3-2', 'BG3', '#901f1f', '#260606'],
  ['god-of-war-ragnarok', 'GOW RAGNAROK', '#5aa1c9', '#12384f'],
  ['god-of-war-ragnarok-2', 'GOW RAGNAROK', '#3d7ba3', '#0b2638'],
  ['witcher-3', 'THE WITCHER 3', '#d8d8d8', '#4a5a6a'],
  ['witcher-3-2', 'THE WITCHER 3', '#b0c0d0', '#33424f'],
  ['rdr2', 'RDR2', '#c0402a', '#4a1408'],
  ['rdr2-2', 'RDR2', '#a03420', '#330d05'],
  ['hollow-knight', 'HOLLOW KNIGHT', '#3b4a8a', '#0c1026'],
  ['hollow-knight-2', 'HOLLOW KNIGHT', '#2c386e', '#070b1c'],
  ['tlou2', 'THE LAST OF US II', '#4a7a4a', '#102010'],
  ['tlou2-2', 'THE LAST OF US II', '#3a633a', '#0a150a'],
  ['spiderman-2', 'SPIDER-MAN 2', '#d43030', '#1b2a6b'],
  ['spiderman-2-2', 'SPIDER-MAN 2', '#b02323', '#142052'],
  ['hades', 'HADES', '#e08a2e', '#5a1a55'],
  ['hades-2', 'HADES', '#c67620', '#3d1238'],
  ['horizon-fw', 'HORIZON FW', '#2ea8e0', '#2a1a80'],
  ['horizon-fw-2', 'HORIZON FW', '#258fc4', '#1a105e'],
  ['celeste', 'CELESTE', '#f0679a', '#2c3e8a'],
  ['celeste-2', 'CELESTE', '#d85684', '#202d6b'],
  ['stardew-valley', 'STARDEW VALLEY', '#5a9e2e', '#28501a'],
  ['stardew-valley-2', 'STARDEW VALLEY', '#478226', '#1c3b12'],
  ['cyberpunk-2077', 'CYBERPUNK 2077', '#f0e830', '#3a2a55'],
  ['cyberpunk-2077-2', 'CYBERPUNK 2077', '#d6cd22', '#2a1d40'],
  ['minecraft', 'MINECRAFT', '#5ab52a', '#3a2408'],
  ['minecraft-2', 'MINECRAFT', '#4a9c22', '#2a1a05'],
  ['fortnite', 'FORTNITE', '#8a4ae0', '#1a2a6b'],
  ['fortnite-2', 'FORTNITE', '#7438c9', '#121d55'],
  ['inside', 'INSIDE', '#333333', '#0a0a0a'],
  ['inside-2', 'INSIDE', '#262626', '#050505'],
];

/**
 * Create a portrait game cover SVG (400x560)
 */
function coverSVG(title, c1, c2) {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '<');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/>
  </linearGradient><radialGradient id="glow" cx="50%" cy="40%" r="60%">
    <stop offset="0%" style="stop-color:rgba(255,255,255,0.25)"/><stop offset="100%" style="stop-color:rgba(255,255,255,0)"/>
  </radialGradient></defs>
  <rect width="400" height="560" fill="url(#bg)"/>
  <rect width="400" height="560" fill="url(#glow)"/>
  <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
  <polygon points="200,150 340,230 340,420 200,500 60,420 60,230" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <text x="200" y="330" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">${safeTitle}</text>
  <text x="200" y="368" font-family="Arial, Helvetica, sans-serif" font-size="13" fill="rgba(255,255,255,0.75)" text-anchor="middle" letter-spacing="4">GAME COVER</text>
  <text x="200" y="530" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="3">GAMEVERSE HUB</text>
  <rect x="1" y="1" width="398" height="558" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
</svg>`;
}

/**
 * Create a landscape screenshot SVG (800x450)
 */
function screenshotSVG(title, c1, c2, num) {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '<');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/>
  </linearGradient></defs>
  <rect width="800" height="450" fill="url(#bg)"/>
  <circle cx="150" cy="120" r="60" fill="rgba(255,255,255,0.08)"/>
  <circle cx="650" cy="340" r="90" fill="rgba(255,255,255,0.06)"/>
  <rect x="80" y="120" width="640" height="220" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.2)" stroke-width="2" rx="8"/>
  <text x="400" y="215" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">${safeTitle}</text>
  <text x="400" y="256" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="rgba(255,255,255,0.75)" text-anchor="middle" letter-spacing="4">SCREENSHOT ${num}</text>
  <text x="400" y="430" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="3">GAMEVERSE HUB</text>
</svg>`;
}

// Generate cover/screenshot SVGs
let count = 0;
for (const [filename, title, c1, c2] of games) {
  const content = /-\d+$/.test(filename)
    ? screenshotSVG(title, c1, c2, /-3$/.test(filename) ? 3 : 2)
    : coverSVG(title, c1, c2);
  fs.writeFileSync(path.join(coversDir, `${filename}.svg`), content);
  count++;
}

// Logo SVG
const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="60" viewBox="0 0 220 60">
  <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:#a855f7"/><stop offset="100%" style="stop-color:#06b6d4"/>
  </linearGradient></defs>
  <polygon points="8,30 26,8 44,30 26,52" fill="none" stroke="url(#lg)" stroke-width="3"/>
  <polygon points="22,30 34,16 46,30 34,44" fill="url(#lg)" opacity="0.6"/>
  <text x="60" y="30" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="bold" fill="#a855f7" letter-spacing="1">GAMEVERSE</text>
  <text x="60" y="48" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="bold" fill="#06b6d4" letter-spacing="3">HUB</text>
</svg>`;
fs.writeFileSync(path.join(__dirname, '..', 'images', 'logo.svg'), logo);

// Hero background SVG
const hero = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs><linearGradient id="hbg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:#0f0518"/><stop offset="45%" style="stop-color:#2a0a4a"/><stop offset="100%" style="stop-color:#061a2e"/>
  </linearGradient><radialGradient id="hglow" cx="50%" cy="40%" r="50%">
    <stop offset="0%" style="stop-color:rgba(168,85,247,0.45)"/><stop offset="100%" style="stop-color:rgba(168,85,247,0)"/>
  </radialGradient></defs>
  <rect width="1600" height="900" fill="url(#hbg)"/>
  <rect width="1600" height="900" fill="url(#hglow)"/>
  <g fill="#ffffff">
    <circle cx="120" cy="150" r="2" opacity="0.7"/><circle cx="340" cy="90" r="1.5" opacity="0.5"/>
    <circle cx="520" cy="220" r="2" opacity="0.6"/><circle cx="700" cy="120" r="1.5" opacity="0.8"/>
    <circle cx="900" cy="260" r="2" opacity="0.5"/><circle cx="1100" cy="140" r="1.5" opacity="0.7"/>
    <circle cx="1300" cy="90" r="2" opacity="0.6"/><circle cx="1480" cy="200" r="1.5" opacity="0.5"/>
    <circle cx="200" cy="420" r="1.5" opacity="0.4"/><circle cx="1350" cy="420" r="2" opacity="0.4"/>
  </g>
  <polygon points="1200,520 1290,420 1380,520 1290,620" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.5)" stroke-width="2"/>
  <polygon points="180,600 260,510 340,600 260,690" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.5)" stroke-width="2"/>
  <circle cx="780" cy="700" r="140" fill="none" stroke="rgba(168,85,247,0.3)" stroke-width="3"/>
  <circle cx="780" cy="700" r="100" fill="none" stroke="rgba(168,85,247,0.2)" stroke-width="2"/>
  <text x="800" y="840" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="rgba(255,255,255,0.12)" text-anchor="middle" letter-spacing="8">GAMEVERSE HUB</text>
</svg>`;
fs.writeFileSync(path.join(__dirname, '..', 'images', 'hero.svg'), hero);

console.log(`Generated ${count} cover images + logo + hero background`);

