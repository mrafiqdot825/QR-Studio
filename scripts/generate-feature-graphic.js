const fs = require('fs');
const path = require('path');
const { createCanvas } = require('/opt/homebrew/lib/node_modules/goldie/node_modules/@napi-rs/canvas');

const WIDTH = 1024;
const HEIGHT = 500;
const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// 1. Background - Deep obsidian with cinematic radial ambient glows
const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
bgGrad.addColorStop(0, '#07090F');
bgGrad.addColorStop(0.5, '#0B0E17');
bgGrad.addColorStop(1, '#05070B');
ctx.fillStyle = bgGrad;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Ambient glow top-right (Accent blue)
const glow1 = ctx.createRadialGradient(780, 200, 10, 780, 200, 360);
glow1.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
glow1.addColorStop(0.5, 'rgba(30, 58, 138, 0.12)');
glow1.addColorStop(1, 'rgba(0, 0, 0, 0)');
ctx.fillStyle = glow1;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Ambient glow bottom-left (Purple/indigo accent)
const glow2 = ctx.createRadialGradient(250, 420, 10, 250, 420, 320);
glow2.addColorStop(0, 'rgba(139, 92, 246, 0.16)');
glow2.addColorStop(0.6, 'rgba(67, 56, 202, 0.08)');
glow2.addColorStop(1, 'rgba(0, 0, 0, 0)');
ctx.fillStyle = glow2;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// 2. Left Side: Brand Typography & Badges
ctx.save();

// Badge
const badgeX = 80;
const badgeY = 90;
const badgeW = 200;
const badgeH = 32;
ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 16);
ctx.fill();
ctx.stroke();

ctx.fillStyle = '#38BDF8';
ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('NEXT-GEN QR CREATOR', badgeX + badgeW / 2, badgeY + badgeH / 2);

// Title: QR STUDIO
ctx.textAlign = 'left';
ctx.fillStyle = '#FFFFFF';
ctx.font = '900 54px system-ui, -apple-system, sans-serif';
ctx.fillText('QR Studio', 80, 180);

// Subtitle
ctx.fillStyle = '#94A3B8';
ctx.font = '500 18px system-ui, -apple-system, sans-serif';
ctx.fillText('Real-Time 3D Styling & Vector Exports', 80, 220);

// Bullet Highlights
const bullets = [
  '⚡  120fps Instant Concurrent Rendering',
  '🎨  Luxury Eye Shapes, Dots & Themes',
  '🔒  100% On-Device Privacy & Offline',
  '📦  Vector SVG & High-Resolution Formats',
];

ctx.font = '500 14px system-ui, -apple-system, sans-serif';
bullets.forEach((bullet, index) => {
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText(bullet, 82, 280 + index * 32);
});

ctx.restore();

// 3. Right Side: Glassmorphic QR Card Preview
ctx.save();
ctx.translate(760, 250);
ctx.rotate((5 * Math.PI) / 180); // 5 degree tilt

const cardW = 320;
const cardH = 340;
const cardX = -cardW / 2;
const cardY = -cardH / 2;

// Outer shadow
ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
ctx.shadowBlur = 40;
ctx.shadowOffsetY = 20;

// Card body
ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.roundRect(cardX, cardY, cardW, cardH, 28);
ctx.fill();
ctx.stroke();

// Inner glass highlight border
ctx.shadowColor = 'transparent';
ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.roundRect(cardX + 2, cardY + 2, cardW - 4, cardH - 4, 26);
ctx.stroke();

// White inner QR canvas
const qrBoxSize = 220;
const qrBoxX = -qrBoxSize / 2;
const qrBoxY = cardY + 28;

ctx.fillStyle = '#FFFFFF';
ctx.beginPath();
ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 20);
ctx.fill();

// Render stylized QR pattern
const qrGrid = 15;
const qrCell = qrBoxSize / qrGrid;
const qrFg = '#0F172A';
ctx.fillStyle = qrFg;

function drawEye(ex, ey) {
  // Outer frame
  ctx.fillStyle = '#0284C7';
  ctx.beginPath();
  ctx.roundRect(qrBoxX + ex * qrCell, qrBoxY + ey * qrCell, qrCell * 4, qrCell * 4, qrCell);
  ctx.fill();

  // Inner cutout
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(qrBoxX + (ex + 0.8) * qrCell, qrBoxY + (ey + 0.8) * qrCell, qrCell * 2.4, qrCell * 2.4, qrCell * 0.6);
  ctx.fill();

  // Core dot
  ctx.fillStyle = '#0284C7';
  ctx.beginPath();
  ctx.arc(qrBoxX + (ex + 2) * qrCell, qrBoxY + (ey + 2) * qrCell, qrCell * 0.65, 0, Math.PI * 2);
  ctx.fill();
}

// 3 Position Eyes
drawEye(1, 1);
drawEye(10, 1);
drawEye(1, 10);

// QR Data Dots (rounded matrix)
ctx.fillStyle = qrFg;
for (let r = 0; r < qrGrid; r++) {
  for (let c = 0; c < qrGrid; c++) {
    // Avoid eyes
    if ((r < 5 && c < 5) || (r < 5 && c >= 10) || (r >= 10 && c < 5)) continue;
    // Avoid center logo area
    if (r >= 6 && r <= 8 && c >= 6 && c <= 8) continue;
    // Pseudo random pattern
    if ((r * 7 + c * 13 + (r % 3)) % 3 !== 0) {
      const dotX = qrBoxX + c * qrCell + qrCell * 0.5;
      const dotY = qrBoxY + r * qrCell + qrCell * 0.5;
      ctx.beginPath();
      ctx.arc(dotX, dotY, qrCell * 0.38, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// Center Logo Badge
const logoSize = 36;
ctx.fillStyle = '#38BDF8';
ctx.beginPath();
ctx.roundRect(-logoSize / 2, qrBoxY + qrBoxSize / 2 - logoSize / 2, logoSize, logoSize, 9);
ctx.fill();

ctx.fillStyle = '#FFFFFF';
ctx.font = 'bold 18px system-ui, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('⚡', 0, qrBoxY + qrBoxSize / 2);

// Card Label at bottom
ctx.fillStyle = '#FFFFFF';
ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Live QR Stage', 0, cardY + cardH - 36);

ctx.fillStyle = '#64748B';
ctx.font = '11px system-ui, -apple-system, sans-serif';
ctx.fillText('Tap to export HD vector', 0, cardY + cardH - 18);

ctx.restore();

// 4. Save to assets/images/play-store-feature-graphic.png
const outPath = path.resolve(__dirname, '../assets/images/play-store-feature-graphic.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outPath, buffer);
console.log(`Generated Play Store Feature Graphic at: ${outPath} (${WIDTH}x${HEIGHT})`);

