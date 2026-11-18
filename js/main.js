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

  // "on this page" (articles only)
  const article = document.querySelector('.article');
  if (article) FM.scrollSpy.init(article, sidebar);

  // copy buttons
  FM.copyCode.init(document);

  // home: file listing
  const listing = document.getElementById('file-list');
  if (listing && site) {
    const rows = site.articles.map((a) => {
      const name = a.file.split('/').pop().replace('.html', '.txt');
      if (a.status === 'published') {
        return `<tr><td class="perm">-rw-r--r--</td><td>${a.id}</td><td><a href="${root + a.file}">${name}</a></td>` +
               `<td class="meta">~${a.minutes} min · ${a.level}</td></tr>`;
      }
      return `<tr class="locked"><td class="perm">----------</td><td>${a.id}</td><td>${name}</td>` +
             `<td>in preparation · <a href="${root + a.file}">outline</a></td></tr>`;
    });
    const terms = window.GLOSSARY ? `${window.GLOSSARY.length} terms` : 'reference';
    rows.push(`<tr><td class="perm">-rw-r--r--</td><td>--</td><td><a href="${root}glossary.html">glossary.txt</a></td>` +
              `<td class="meta">${terms}</td></tr>`);
    listing.innerHTML = rows.join('');
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
