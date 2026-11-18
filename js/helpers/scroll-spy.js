/* scroll-spy.js: builds "on this page" from the article's <h2 id="...">
   headings, marks the section being read and shows an ASCII progress bar.

   Where it goes depends on the screen width:
     wide screens (1200px and more)  → its own column, right of the article
     narrower screens                → inside the left sidebar, under the index
     phones (under 820px)            → hidden by css/layout.css

   Optional: <h2 id="s1" data-short="blockchain"> sets a shorter label. */
window.FM = window.FM || {};

FM.scrollSpy = {
  WIDE: '(min-width: 1200px)',

  init(article, sidebar) {
    if (!article || !sidebar) return;
    const heads = [...article.querySelectorAll('h2[id]')];
    if (!heads.length) return;

    const items = heads.map((h) => {
      const n = h.querySelector('.n');
      const label = h.dataset.short || h.textContent.replace(n ? n.textContent : '', '').trim();
      const num = n ? `<span class="n">${n.textContent}</span>` : '';
      return `<li><a href="#${h.id}">${num}${label}</a></li>`;
    }).join('');

    const block = document.createElement('div');
    block.className = 'onpage-block';
    block.innerHTML = `
      <hr>
      <div class="h">on this page</div>
      <ul class="onpage">${items}</ul>
      <div class="progress" aria-hidden="true"></div>`;

    // right column, created here so articles need no extra markup
    const layout = sidebar.closest('.layout');
    const right = document.createElement('aside');
    right.className = 'toc-side';
    right.setAttribute('aria-label', 'On this page');
    layout.appendChild(right);

    const wide = window.matchMedia(this.WIDE);
    const place = () => {
      (wide.matches ? right : sidebar).appendChild(block);
      right.hidden = !wide.matches;
      layout.classList.toggle('has-toc', wide.matches);
    };
    wide.addEventListener('change', place);
    place();

    const links = [...block.querySelectorAll('.onpage a')];
    const bar = block.querySelector('.progress');

    const update = () => {
      let active = 0;
      heads.forEach((h, i) => { if (h.getBoundingClientRect().top < 160) active = i; });
      links.forEach((a, i) => a.classList.toggle('on', i === active));

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0;
      const filled = Math.round(pct / 10);
      bar.textContent = `[${'#'.repeat(filled)}${'·'.repeat(10 - filled)}] ${pct}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
};
