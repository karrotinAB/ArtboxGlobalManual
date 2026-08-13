// 공통 렌더러: content 데이터 + 언어 코드를 받아 사이트 마크업(표지+본문)을 생성한다.
// index.html이 이 함수를 사용해 페이지 전체를 그린다.

function iconHtml(icon, sizePx) {
  sizePx = sizePx || 18;
  if (!icon) return '';
  if (typeof icon === 'object') {
    if (icon.type === 'image' && icon.value) {
      return `<img src="${icon.value}" alt="" style="height:${sizePx}px;vertical-align:-3px;">`;
    }
    return icon.value || '';
  }
  return icon; // legacy plain-emoji string
}

function imgCell(im, t) {
  const w = im.width || 220;
  const h = im.height || 160;
  return `
    <div class="image-cell" style="width:${w}px;">
      <figure>
        <img src="${im.src}" alt="${t(im.caption)}" style="height:${h}px;"
             onerror="this.style.background='#f1d9d6'; this.removeAttribute('src');">
        <figcaption>${t(im.caption)}</figcaption>
      </figure>
    </div>`;
}

function imgFloat(im, side, t) {
  const w = im.width || 240;
  const h = im.height ? `height:${im.height}px;` : '';
  return `
    <figure class="img-float img-float-${side}" style="width:${w}px;">
      <img src="${im.src}" alt="${t(im.caption)}" style="${h}"
           onerror="this.style.background='#f1d9d6'; this.removeAttribute('src');">
      <figcaption>${t(im.caption)}</figcaption>
    </figure>`;
}

function renderSite(root, data, lang) {
  const t = (field) => (field && (field[lang] || field.ko || field.en)) || '';
  const chapters = data.chapters || [];

  root.innerHTML = '';

  const hero = document.createElement('div');
  hero.className = 'hero';
  hero.innerHTML = `
    <div class="hero-eyebrow">${lang === 'ko' ? '해외사업부 · 운영 매뉴얼' : 'Global Business Unit · Operations Manual'}</div>
    <h1>${t(data.meta.siteTitle)}</h1>
    <p class="subtitle">${t(data.meta.subtitle)}</p>
    <div class="scroll-hint"><span class="arrow">↓</span> ${lang === 'ko' ? '스크롤해서 보기' : 'Scroll to view'}</div>
    <div class="hero-logo">${data.meta.logo || 'ARTBOX'}</div>
  `;
  root.appendChild(hero);

  chapters.forEach((chapter) => {
    const divider = document.createElement('div');
    divider.className = 'chapter-divider';
    divider.id = chapter.id;
    divider.innerHTML = `
      <span class="num-badge">${chapter.num}</span>
      <h2>${iconHtml(chapter.icon)} ${t(chapter.title)}</h2>
    `;
    root.appendChild(divider);

    (chapter.sections || []).forEach((sec) => {
      const card = document.createElement('div');
      card.className = 'section-card';
      card.id = chapter.id + '-' + sec.num;
      const bullets = (sec.bullets && sec.bullets[lang]) || [];
      const images = sec.images || [];

      const groups = { above: [], left: [], right: [], below: [] };
      images.forEach((im) => {
        const p = im.position || 'below';
        (groups[p] || groups.below).push(im);
      });

      const aboveHtml = groups.above.length
        ? `<div class="image-grid">${groups.above.map((im) => imgCell(im, t)).join('')}</div>` : '';
      const belowHtml = groups.below.length
        ? `<div class="image-grid">${groups.below.map((im) => imgCell(im, t)).join('')}</div>` : '';
      const floatHtml =
        groups.left.map((im) => imgFloat(im, 'left', t)).join('') +
        groups.right.map((im) => imgFloat(im, 'right', t)).join('');

      card.innerHTML = `
        <div class="section-head">
          <span class="section-pill">${sec.num}. ${t(sec.title)}</span>
        </div>
        <div class="section-sub">${lang === 'ko' ? '설명' : 'Description'}</div>
        ${aboveHtml}
        <div class="text-flow">
          ${floatHtml}
          <ul class="bullets">${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
        </div>
        ${belowHtml}
      `;
      root.appendChild(card);
    });
  });
}

// ---------- Scroll-spy: 현재 보고 있는 챕터/섹션을 사이드바에 강조 표시 ----------
function initScrollSpy(root, sidebar) {
  const targets = root.querySelectorAll('.chapter-divider, .section-card');
  if (!targets.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = sidebar.querySelector(`[data-id="${entry.target.id}"]`);
      if (!link) return;
      link.classList.toggle('active', entry.isIntersecting);
    });
  }, { root: null, rootMargin: '-46px 0px -70% 0px', threshold: 0 });

  targets.forEach((el) => observer.observe(el));
}
