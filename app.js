(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const svg = $("characterSheet");
  const title = $("characterTitle");
  const status = $("status");

  const namesA = ["Mika", "Hina", "Rin", "Yuna", "Aki", "Sora", "Nami", "Kira", "Rei", "Noa", "Emi", "Kaede"];
  const namesB = ["Aozora", "Tsukino", "Hanabira", "Kisaragi", "Mizuno", "Hoshino", "Amamiya", "Kurose", "Fujimoto", "Shirayuki"];
  const hairColors = ["#27253c", "#7b3f54", "#e6b95f", "#7199c8", "#a58ac8", "#b75e45", "#3c7d69"];
  const skinColors = ["#f7d7c5", "#edc2a7", "#ffe0cb", "#d9a889"];
  const eyeColors = ["#5a789e", "#6b8e62", "#9b6b9b", "#9a6948", "#477f87"];
  const palettes = {
    sakura: { main: "#b76e8a", light: "#f4dce4", dark: "#613d59", accent: "#d99caf", bg: "#fff4f5" },
    ocean: { main: "#497c9d", light: "#dcecf4", dark: "#29495e", accent: "#79b9bd", bg: "#f0f8fb" },
    sunset: { main: "#c16c4e", light: "#f7dfc8", dark: "#693e49", accent: "#e8a75e", bg: "#fff6ec" },
    forest: { main: "#5d806a", light: "#e1ebdc", dark: "#344c43", accent: "#b5c58b", bg: "#f3f7ef" },
    mono: { main: "#77717d", light: "#e8e4e8", dark: "#38343e", accent: "#b9aebd", bg: "#f7f5f7" }
  };
  const styleNames = {
    school: "SCHOOL FANTASY", street: "URBAN STREETWEAR",
    fantasy: "FANTASY ADVENTURER", "sci-fi": "SCI-FI ACADEMY"
  };
  const state = {};

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&apos;" }[c]));

  function getPalette() {
    const key = $("paletteSelect").value;
    return palettes[key === "random" ? pick(Object.keys(palettes)) : key];
  }
  function getMood() {
    const val = $("moodSelect").value;
    return val === "random" ? pick(["happy", "calm", "confident", "shy"]) : val;
  }
  function getHair() {
    const val = $("hairSelect").value;
    return val === "random" ? pick(hairColors) : val;
  }

  function renderCharacter() {
    const style = $("styleSelect").value;
    const palette = getPalette();
    const hair = getHair();
    const skin = pick(skinColors);
    const eyes = pick(eyeColors);
    const mood = getMood();
    const bangs = rand(0, 3);
    const accessory = pick(["clip", "ribbon", "none", "star"]);
    const name = `${pick(namesA)} ${pick(namesB)}`;
    const age = rand(18, 26);
    const number = String(rand(1, 99)).padStart(2, "0");
    const outfit = outfitFor(style, palette, accessory);
    title.textContent = name;
    $("characterTitle").setAttribute("aria-label", `Karakter ${name}`);
    svg.innerHTML = buildSheet({ style, palette, hair, skin, eyes, mood, bangs, accessory, name, age, number, outfit });
    svg.setAttribute("aria-label", `Character sheet anime 2D ${name}, gaya ${styleNames[style]}`);
    status.textContent = `Karakter baru dibuat: ${name}.`;
  }

  function outfitFor(style, p, accessory) {
    if (style === "street") return `
      <path d="M370 345 Q450 320 530 345 L566 490 L334 490 Z" fill="${p.main}" stroke="${p.dark}" stroke-width="3"/>
      <path d="M390 354 L450 405 L510 354 L490 490 L410 490 Z" fill="${p.light}"/>
      <path d="M370 345 L328 380 L350 420 L390 385 M530 345 L572 380 L550 420 L510 385" fill="${p.main}" stroke="${p.dark}" stroke-width="3"/>
      <path d="M407 430 L493 430 M403 447 L497 447" stroke="${p.dark}" stroke-width="4" opacity=".7"/>
      <path d="M395 490 L390 555 L438 555 L450 490 L462 555 L510 555 L505 490" fill="${p.dark}"/>`;
    if (style === "fantasy") return `
      <path d="M370 345 Q450 320 530 345 L570 490 L330 490 Z" fill="${p.main}" stroke="${p.dark}" stroke-width="3"/>
      <path d="M450 350 L420 490 L450 468 L480 490 Z" fill="${p.light}"/>
      <path d="M370 350 L330 400 L350 430 L395 390 M530 350 L570 400 L550 430 L505 390" fill="${p.dark}" stroke="${p.dark}" stroke-width="3"/>
      <path d="M395 490 L380 565 L435 565 L450 490 L465 565 L520 565 L505 490" fill="${p.main}"/>
      <path d="M405 390 L450 420 L495 390" fill="none" stroke="${p.accent}" stroke-width="5"/>`;
    if (style === "sci-fi") return `
      <path d="M370 345 Q450 320 530 345 L560 490 L340 490 Z" fill="${p.dark}" stroke="${p.main}" stroke-width="3"/>
      <path d="M405 350 L450 390 L495 350 L480 490 L420 490 Z" fill="${p.light}"/>
      <path d="M370 350 L325 385 L350 425 L390 390 M530 350 L575 385 L550 425 L510 390" fill="${p.dark}" stroke="${p.main}" stroke-width="3"/>
      <path d="M405 430 H495 M410 448 H490" stroke="${p.accent}" stroke-width="5"/>
      <path d="M395 490 L390 560 L438 560 L450 490 L462 560 L510 560 L505 490" fill="${p.dark}"/>`;
    return `
      <path d="M370 345 Q450 320 530 345 L560 490 L340 490 Z" fill="${p.main}" stroke="${p.dark}" stroke-width="3"/>
      <path d="M405 350 L450 395 L495 350 L480 490 L420 490 Z" fill="${p.light}"/>
      <path d="M370 350 L330 390 L350 420 L392 385 M530 350 L570 390 L550 420 L508 385" fill="${p.main}" stroke="${p.dark}" stroke-width="3"/>
      <path d="M395 490 L390 558 L438 558 L450 490 L462 558 L510 558 L505 490" fill="${p.dark}"/>
      <path d="M430 410 L450 425 L470 410" fill="none" stroke="${p.accent}" stroke-width="4"/>`;
  }

  function face({ hair, skin, eyes, mood, bangs, accessory }) {
    const smile = mood === "happy" ? "M431 239 Q450 256 469 239" :
      mood === "shy" ? "M438 244 Q450 248 462 244" :
      mood === "confident" ? "M435 242 Q450 249 465 238" : "M438 242 Q450 244 462 242";
    const brows = mood === "confident"
      ? `<path d="M405 211 L426 208 M474 208 L495 211" stroke="${hair}" stroke-width="4" stroke-linecap="round"/>`
      : `<path d="M405 210 Q416 205 427 210 M473 210 Q484 205 495 210" stroke="${hair}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
    const fringe = [
      `M390 190 Q400 130 450 139 Q504 133 511 190 L493 204 L480 170 Q452 193 420 170 L405 204 Z`,
      `M390 190 Q396 133 450 139 Q503 132 511 190 L485 199 L468 161 L450 187 L433 160 L412 201 Z`,
      `M390 190 Q399 130 450 139 Q505 132 511 190 L491 205 Q485 175 474 166 Q448 198 419 166 L406 204 Z`,
      `M390 190 Q397 131 450 139 Q503 132 511 190 L493 201 L479 165 Q450 181 427 164 L407 204 Z`
    ][bangs];
    let extra = "";
    if (accessory === "clip") extra = `<path d="M490 158 l17 -10 l-3 20 Z" fill="${"#f3c86a"}" stroke="${hair}" stroke-width="2"/>`;
    if (accessory === "ribbon") extra = `<path d="M477 151 Q494 130 508 151 L497 166 L511 177 L490 177 L479 166 L465 177 L469 160 Z" fill="#d88ea8" stroke="${hair}" stroke-width="2"/>`;
    if (accessory === "star") extra = `<path d="M494 145 l4 9 10 1 -8 6 2 10 -8 -5 -8 5 2 -10 -8 -6 10 -1 Z" fill="#f3c86a"/>`;
    return `
      <path d="M390 178 Q367 187 384 219 Q390 229 400 220 M510 178 Q533 187 516 219 Q510 229 500 220" fill="${skin}" stroke="#9f7166" stroke-width="2"/>
      <path d="M398 175 Q398 145 450 145 Q502 145 502 175 L495 224 Q490 260 450 266 Q410 260 405 224 Z" fill="${skin}" stroke="#9f7166" stroke-width="2"/>
      <path d="M408 216 Q420 227 431 216 M469 216 Q480 227 492 216" fill="none" stroke="#d99b91" stroke-width="2" opacity=".8"/>
      ${brows}
      <ellipse cx="418" cy="222" rx="10" ry="13" fill="#fffdf9"/><ellipse cx="482" cy="222" rx="10" ry="13" fill="#fffdf9"/>
      <ellipse cx="419" cy="224" rx="6" ry="9" fill="${eyes}"/><ellipse cx="481" cy="224" rx="6" ry="9" fill="${eyes}"/>
      <ellipse cx="421" cy="220" rx="2.5" ry="3.5" fill="#fff"/><ellipse cx="483" cy="220" rx="2.5" ry="3.5" fill="#fff"/>
      <path d="${smile}" fill="none" stroke="#9b5e65" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M389 188 Q379 145 420 134 Q450 119 481 136 Q521 151 511 190 L505 223 L493 193 L490 165 Q451 187 412 165 L405 196 L399 224 Z" fill="${hair}"/>
      <path d="${fringe}" fill="${hair}" stroke="${hair}" stroke-width="2" stroke-linejoin="round"/>
      ${extra}`;
  }

  function buildSheet(c) {
    const p = c.palette;
    const faceSvg = face(c);
    const mini = (x, y, label, rotate = 0) => `
      <g transform="translate(${x} ${y}) rotate(${rotate}) scale(.36)">
        <path d="M-60 20 Q-55 -65 0 -65 Q55 -65 60 20 L54 85 L-54 85 Z" fill="${c.hair}"/>
        <path d="M-43 -15 Q-40 -45 0 -45 Q40 -45 43 -15 L35 30 Q30 54 0 57 Q-30 54 -35 30 Z" fill="${c.skin}" stroke="#9f7166" stroke-width="2"/>
        <ellipse cx="-15" cy="5" rx="6" ry="8" fill="${c.eyes}"/><ellipse cx="15" cy="5" rx="6" ry="8" fill="${c.eyes}"/>
        <path d="M-11 27 Q0 33 11 27" fill="none" stroke="#9b5e65" stroke-width="2"/>
        <path d="M-45 -12 Q-40 -55 0 -55 Q45 -55 45 -12 L30 0 L22 -30 Q0 -12 -25 -30 L-35 0 Z" fill="${c.hair}"/>
      </g><text x="${x}" y="${y + 44}" text-anchor="middle" class="small">${label}</text>`;
    return `
      <defs>
        <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="${p.dark}" opacity=".12"/></pattern>
        <style>
          .label{font:700 11px Inter,Arial,sans-serif;letter-spacing:2px;fill:${p.dark}}
          .small{font:700 10px Inter,Arial,sans-serif;letter-spacing:1px;fill:${p.dark}}
          .name{font:800 31px Inter,Arial,sans-serif;letter-spacing:-1px;fill:${p.dark}}
          .muted{font:11px Inter,Arial,sans-serif;fill:#8b7c82}
          .rule{stroke:${p.dark};opacity:.18}
        </style>
      </defs>
      <rect width="900" height="680" fill="${p.bg}"/>
      <rect width="900" height="680" fill="url(#dots)"/>
      <path d="M0 0 H900 V82 H0 Z" fill="${p.light}"/>
      <text x="36" y="35" class="label">CHARACTER DESIGN / CONCEPT FILE</text>
      <text x="36" y="63" class="name">${esc(c.name)}</text>
      <text x="864" y="37" text-anchor="end" class="label">${esc(styleNames[c.style])}</text>
      <text x="864" y="61" text-anchor="end" class="muted">DESIGN NO. ${c.number}</text>
      <line x1="36" y1="100" x2="864" y2="100" class="rule"/>
      <text x="40" y="126" class="label">01 / MAIN VIEW</text>
      <text x="605" y="126" class="label">02 / EXPRESSION STUDY</text>
      <rect x="32" y="141" width="540" height="492" rx="12" fill="#ffffff" opacity=".55"/>
      <circle cx="450" cy="275" r="122" fill="${p.light}" opacity=".9"/>
      <circle cx="450" cy="275" r="92" fill="${p.accent}" opacity=".22"/>
      <path d="M450 145 V615 M345 285 H555" stroke="${p.dark}" stroke-dasharray="3 7" opacity=".12"/>
      <g>
        <path d="M421 257 L421 303 L479 303 L479 257" fill="${c.skin}" stroke="#9f7166" stroke-width="2"/>
        ${outfitFor(c.style, p, c.accessory)}
        <path d="M365 347 Q450 320 535 347 L557 490 L343 490 Z" fill="${p.main}" opacity=".35"/>
        <path d="M385 490 L385 570 L434 570 L450 490 L466 570 L515 570 L515 490" fill="${p.dark}"/>
        <path d="M385 566 L434 566 M466 566 L515 566" stroke="${p.accent}" stroke-width="4"/>
        <path d="M390 181 Q370 220 385 276 L403 316 L421 270 L405 207 M510 181 Q530 220 515 276 L497 316 L479 270 L495 207" fill="${c.hair}" stroke="${c.hair}" stroke-width="3"/>
        ${faceSvg}
        <path d="M411 303 L450 327 L489 303" fill="none" stroke="${p.accent}" stroke-width="4"/>
      </g>
      <text x="52" y="609" class="small">FRONT VIEW / FULL COLOR</text>
      <rect x="592" y="141" width="276" height="208" rx="12" fill="#ffffff" opacity=".65"/>
      ${mini(660, 204, "HAPPY", -2)}
      ${mini(748, 204, "CALM", 1)}
      ${mini(828, 204, "FOCUSED", -1)}
      <text x="610" y="329" class="muted">Expression thumbnails · concept preview</text>
      <rect x="592" y="366" width="276" height="267" rx="12" fill="#ffffff" opacity=".65"/>
      <text x="612" y="394" class="label">03 / COLOR PALETTE</text>
      <rect x="612" y="411" width="48" height="38" rx="6" fill="${p.main}"/>
      <rect x="670" y="411" width="48" height="38" rx="6" fill="${p.light}"/>
      <rect x="728" y="411" width="48" height="38" rx="6" fill="${p.dark}"/>
      <rect x="786" y="411" width="48" height="38" rx="6" fill="${p.accent}"/>
      <text x="612" y="467" class="muted">OUTFIT</text><text x="670" y="467" class="muted">LIGHT</text>
      <text x="728" y="467" class="muted">SHADOW</text><text x="786" y="467" class="muted">ACCENT</text>
      <line x1="612" y1="489" x2="848" y2="489" class="rule"/>
      <text x="612" y="516" class="label">04 / PROFILE</text>
      <text x="612" y="540" class="muted">NAME</text><text x="688" y="540" class="small">${esc(c.name.toUpperCase())}</text>
      <text x="612" y="563" class="muted">AGE</text><text x="688" y="563" class="small">${c.age} YEARS</text>
      <text x="612" y="586" class="muted">MOOD</text><text x="688" y="586" class="small">${esc(c.mood.toUpperCase())}</text>
      <text x="612" y="609" class="muted">HAIR</text><text x="688" y="609" class="small">${esc(c.hair.toUpperCase())}</text>
      <text x="36" y="660" class="muted">ANIME SHEET STUDIO · ORIGINAL VECTOR CONCEPT · ${new Date().getFullYear()}</text>
      <text x="864" y="660" text-anchor="end" class="muted">SHEET ${c.number}</text>`;
  }

  function downloadPNG() {
    const clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const source = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1800;
      canvas.height = 1360;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fffdfb";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((png) => {
        if (!png) {
          status.textContent = "Ekspor gagal. Coba browser lain.";
          return;
        }
        const pngUrl = URL.createObjectURL(png);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = `${title.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-character-sheet.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
        status.textContent = "Character sheet berhasil diekspor sebagai PNG.";
      }, "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      status.textContent = "Ekspor gagal. Coba buat ulang karakter.";
    };
    img.src = url;
  }

  $("randomizeBtn").addEventListener("click", renderCharacter);
  $("downloadBtn").addEventListener("click", downloadPNG);
  ["styleSelect", "hairSelect", "moodSelect", "paletteSelect"].forEach(id => {
    $(id).addEventListener("change", renderCharacter);
  });
  renderCharacter();
})();