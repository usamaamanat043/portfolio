// Generates one illustration per project into public/projects/. Run: node scripts/make-images.js
const fs = require('fs');
const C = { bg1: '#0B1633', bg2: '#1B2F6B', blue: '#7C9BFF', amber: '#FFB840', mist: '#C9D3E8', card: '#14224A', line: '#3A4C85' };
const rnd = (i) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };
const wrap = (id, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.bg1}"/><stop offset="1" stop-color="${C.bg2}"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/>${body}</svg>`;
const box = (x, y, w, h, r = 12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${C.card}" stroke="${C.line}" stroke-width="2"/>`;
const bar = (x, y, w, h, c = C.blue) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${c}"/>`;
const txt = (x, y, s, size = 18, c = C.mist, w = 500) => `<text x="${x}" y="${y}" font-family="Helvetica,Arial,sans-serif" font-size="${size}" font-weight="${w}" fill="${c}">${s}</text>`;
const node = (x, y, label, c = C.blue) => `<rect x="${x - 70}" y="${y - 24}" width="140" height="48" rx="10" fill="${C.card}" stroke="${c}" stroke-width="2.5"/>${txt(x - 52, y + 6, label, 16, C.mist, 600)}`;
const line = (d, c = C.line, w = 3, extra = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;

const out = {};

// 1. Analytics assistant: question -> SQL -> chart
out['analytics-assistant'] = wrap('a',
  box(50, 50, 700, 70) + txt(80, 93, 'Which region grew fastest last quarter?', 22, C.mist, 500) + `<circle cx="712" cy="85" r="14" fill="${C.amber}"/>` +
  box(50, 150, 300, 300) + txt(76, 190, 'SELECT region,', 17, C.blue, 600) + txt(76, 216, '  SUM(revenue)', 17, C.mist) + txt(76, 242, 'FROM sales', 17, C.mist) + txt(76, 268, 'GROUP BY region;', 17, C.mist) +
  bar(76, 310, 220, 10, C.line) + bar(76, 340, 170, 10, C.line) + bar(76, 370, 200, 10, C.line) +
  box(380, 150, 370, 300) + [0, 1, 2, 3, 4].map((i) => bar(415 + i * 62, 410 - [90, 140, 110, 210, 170][i], 40, [90, 140, 110, 210, 170][i], i === 3 ? C.amber : C.blue)).join('') +
  line('M395 420 H730', C.line, 2));

// 2. Marketing and sales agents: lead -> agent -> outputs
out['marketing-sales-agents'] = wrap('b',
  line('M210 250 C300 250 300 150 400 150', C.line) + line('M210 250 C300 250 300 350 400 350', C.line) + line('M540 150 C600 150 600 250 660 250', C.line) + line('M540 350 C600 350 600 250 660 250', C.line) +
  node(140, 250, 'New lead', C.amber) + node(470, 150, 'Write message') + node(470, 350, 'Update CRM') +
  `<circle cx="700" cy="250" r="46" fill="${C.card}" stroke="${C.amber}" stroke-width="3"/><path d="M675 240 L700 260 L725 240 M675 240 H725 V268 H675 Z" fill="none" stroke="${C.mist}" stroke-width="3" stroke-linejoin="round"/>` +
  txt(60, 60, 'Agent workflow', 24, C.mist, 700) + txt(60, 90, 'trigger, generate, act', 16, C.blue));

// 3. Career recommender: user profile connected to careers and skills
const cx = 400, cy = 250, pts = [[150, 110, 'Data analyst'], [650, 110, 'ML engineer'], [120, 300, 'Python'], [680, 300, 'NLP'], [260, 430, 'Course'], [540, 430, 'Backend dev']];
out['career-recommender'] = wrap('c',
  pts.map(([x, y]) => line(`M${cx} ${cy} L${x} ${y}`, C.line, 2.5, 'stroke-dasharray="6 8"')).join('') +
  `<circle cx="${cx}" cy="${cy}" r="54" fill="${C.card}" stroke="${C.amber}" stroke-width="3.5"/>` + txt(cx - 30, cy + 6, 'Profile', 20, C.mist, 700) +
  pts.map(([x, y, l], i) => `<circle cx="${x}" cy="${y}" r="10" fill="${i % 2 ? C.amber : C.blue}"/>` + txt(x - 40, y - 22, l, 17, C.mist, 600)).join(''));

// 4. Healthcare platform: three layers + heartbeat
out['healthcare-platform'] = wrap('d',
  box(50, 50, 700, 130) + line('M80 120 H220 L245 80 L280 165 L310 100 L335 120 H480 L505 90 L530 150 L555 120 H720', C.amber, 4) + txt(80, 78, 'Live patient signal', 16, C.blue, 600) +
  [['Ingest', 50], ['Analyze', 285], ['Report', 520]].map(([l, x], i) => box(x, 220, 230, 230) + txt(x + 24, 262, l, 22, C.mist, 700) + bar(x + 24, 290, 150 - i * 20, 10, C.line) + bar(x + 24, 320, 180 - i * 30, 10, C.line) + (i === 2 ? [0, 1, 2, 3].map((k) => bar(x + 30 + k * 44, 420 - [40, 70, 55, 95][k], 28, [40, 70, 55, 95][k], C.blue)).join('') : `<circle cx="${x + 115}" cy="${390}" r="${28 + i * 8}" fill="none" stroke="${C.blue}" stroke-width="5" stroke-dasharray="${i ? '60 40' : '30 20'}"/>`)).join(''));

// 5. Sound recognition: waveform + mel-spectrogram grid
let cells = '';
for (let i = 0; i < 24; i++) for (let j = 0; j < 9; j++) { const v = rnd(i * 9 + j) * (1 - j / 11); cells += `<rect x="${60 + i * 28}" y="${230 + j * 26}" width="24" height="22" rx="3" fill="${v > 0.55 ? C.amber : C.blue}" opacity="${(0.15 + v * 0.85).toFixed(2)}"/>`; }
let wave = 'M60 130'; for (let i = 0; i <= 84; i++) wave += ` L${60 + i * 8.5} ${130 + Math.sin(i * 0.7) * 50 * Math.abs(Math.sin(i * 0.11)) + (rnd(i) - 0.5) * 12}`;
out['sound-recognition'] = wrap('e', txt(60, 60, 'Waveform', 16, C.blue, 600) + line(wave, C.mist, 2.5) + txt(60, 212, 'Mel-spectrogram', 16, C.blue, 600) + cells + box(600, 40, 150, 46, 10).replace('stroke="' + C.line + '"', 'stroke="' + C.amber + '"') + txt(618, 70, 'Class: rain', 17, C.mist, 700));

// 6. Auction prediction: history line + dashed forecast + bars
let hist = 'M60 360', pts6 = [];
for (let i = 0; i <= 12; i++) { const x = 60 + i * 44, y = 350 - i * 12 - Math.sin(i * 1.3) * 34 - rnd(i + 3) * 26; pts6.push([x, y]); hist += ` L${x} ${y}`; }
const [lx, ly] = pts6[12];
out['auction-prediction'] = wrap('f',
  line('M60 80 V400 H740', C.line, 2) + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => bar(75 + i * 44, 400 - 24 - rnd(i + 9) * 40, 28, 24 + rnd(i + 9) * 40, C.line)).join('') +
  line(hist, C.blue, 4) + line(`M${lx} ${ly} L${lx + 60} ${ly - 40} L${lx + 120} ${ly - 20}`, C.amber, 4, 'stroke-dasharray="10 10"') +
  `<circle cx="${lx + 120}" cy="${ly - 20}" r="9" fill="${C.amber}"/>` + txt(60, 60, 'Bid price over time, with prediction', 20, C.mist, 700));

fs.mkdirSync('public/projects', { recursive: true });
for (const [k, v] of Object.entries(out)) fs.writeFileSync(`public/projects/${k}.svg`, v);
console.log('wrote', Object.keys(out).length, 'images');
