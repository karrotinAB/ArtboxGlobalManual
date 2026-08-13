// 공통 렌더러: content 데이터 + 언어 코드를 받아 사이트 마크업을 생성한다.
// index.html과 editor.html의 실시간 미리보기가 이 함수를 공유한다.

function renderSite(root, data, lang, opts = {}) {
  const t = (field) => (field && (field[lang] || field.ko || field.en)) || '';
  const chapters = data.chapters || [];

  root.innerHTML = '';

  // Compact title bar (was a full cover hero)
  const hero = document.createElement('div');
  hero.className = 'hero';
  hero.innerHTML = `
    <div class="hero-eyebrow">${lang === 'ko' ? '해외사업부 · 운영 매뉴얼' : 'Global Business Unit · Operations Manual'}</div>
    <h1>${t(data.meta.siteTitle)}</h1>
    <p class="subtitle">${t(data.meta.subtitle)}</p>
    <div class="hero-logo">${data.meta.logo || 'ARTBOX'}</div>
  `;
  root.appendChild(hero);

  chapters.forEach((chapter) => {
    const divider = document.createElement('div');
    divider.className = 'chapter-divider';
    divider.id = chapter.id;
    divider.innerHTML = `
      <span class="num-badge">${chapter.num}</span>
      <h2>${chapter.icon || ''} ${t(chapter.title)}</h2>
    `;
    root.appendChild(divider);

    (chapter.sections || []).forEach((sec) => {
      const card = document.createElement('div');
      card.className = 'section-card';
      card.id = chapter.id + '-' + sec.num;
      const bullets = (sec.bullets && sec.bullets[lang]) || [];
      const images = sec.images || [];
      card.innerHTML = `
        <div class="section-head">
          <span class="section-pill">${sec.num}. ${t(sec.title)}</span>
        </div>
        <div class="section-sub">${lang === 'ko' ? '설명' : 'Description'}</div>
        <ul class="bullets">${bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
        ${images.length ? `<div class="image-grid">
          ${images.map((im) => `
            <div class="image-cell">
              <figure>
                <img src="${im.src}" alt="${t(im.caption)}" onerror="this.style.background='#f1d9d6'; this.removeAttribute('src');">
                <figcaption>${t(im.caption)}</figcaption>
              </figure>
            </div>
          `).join('')}
        </div>` : ''}
      `;
      root.appendChild(card);
    });
  });
}
