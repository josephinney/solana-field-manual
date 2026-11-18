/* ============================================================
   main.js
   Runs on every page. Each page sets on <body>:
     data-root  path back to the site root ('' or '../')
     data-page  'home', 'glossary' or an article id ('01', '02'...)
   ============================================================ */
(function () {
  const body = document.body;
  const root = body.dataset.root || '';
  const page = body.dataset.page || '';
  const site = window.SITE;

  // sidebar + clock
  const sidebar = document.getElementById('sidebar');
  FM.sidebar.render(sidebar, { root, page, site });
  FM.clock.start(document.getElementById('clock'));

  // footer signature
  FM.footer.render(document.getElementById('site-footer'), { root, site });

  // "on this page" (articles only)
  const article = document.querySelector('.article');
  if (article) FM.scrollSpy.init(article, sidebar);

  // syntax colors, then copy buttons
  if (FM.highlight) FM.highlight.init(document);
  FM.copyCode.init(document);

  // home: the start button always points to the first article in data/articles.js
  const startLink = document.getElementById('start-link');
  if (startLink && site) {
    const first = site.articles.find((a) => a.status === 'published');
    if (first) startLink.href = root + first.file;
  }

  // articles: previous / next links
  const pager = document.getElementById('pager');
  if (pager && site) {
    const i = site.articles.findIndex((a) => a.id === page);
    const prev = i > 0 ? site.articles[i - 1] : null;
    const next = i > -1 ? site.articles[i + 1] : null;
    pager.innerHTML =
      (prev ? `<a href="${root + prev.file}">&lt;&lt; prev: ${prev.id} ${prev.nav}</a>` : `<a href="${root}index.html">&lt;&lt; home</a>`) +
      (next ? `<a href="${root + next.file}">next: ${next.id} ${next.nav} &gt;&gt;</a>` : `<a href="${root}index.html">home &gt;&gt;</a>`);
  }

  // glossary page
  const gloss = document.getElementById('gloss');
  if (gloss) {
    FM.glossaryFilter.init({
      list: gloss,
      input: document.getElementById('gloss-q'),
      count: document.getElementById('gloss-count'),
      terms: window.GLOSSARY
    });
  }
})();
