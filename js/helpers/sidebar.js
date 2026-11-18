/* sidebar.js: builds the sidebar (site name, clock, index)
   from data/articles.js and marks the current page. */
window.FM = window.FM || {};

FM.sidebar = {
  /**
   * @param {HTMLElement} el    the <aside id="sidebar"> element
   * @param {object} opts
   * @param {string} opts.root  path back to the site root ('' or '../')
   * @param {string} opts.page  key of the current page: 'home', 'glossary' or an article id
   * @param {object} opts.site  window.SITE
   */
  render(el, { root, page, site }) {
    if (!el || !site) return;

    const items = [
      { key: 'home', label: 'home', href: `${root}index.html` },
      ...site.articles.map((a) => ({
        key: a.id,
        label: `${a.id} ${a.nav}`,
        href: root + a.file,
        locked: a.status !== 'published'
      })),
      { key: 'glossary', label: 'glossary', href: `${root}glossary.html` }
    ];

    const links = items.map((it) => {
      const current = it.key === page ? ' aria-current="page"' : '';
      const cls = it.locked ? ' class="locked"' : '';
      return `<li><a href="${it.href}"${cls}${current}>${it.label}</a></li>`;
    }).join('');

    el.innerHTML = `
      <div class="top-row">
        <a class="site" href="${root}index.html"><span class="sol">SOLANA</span><br>FIELD MANUAL</a>
        <div class="clock" id="clock" aria-label="Local time">--:--:--</div>
      </div>
      <hr>
      <div class="h">index</div>
      <ul class="nav">${links}</ul>`;
  }
};
