/* glossary-filter.js: renders the glossary from data/glossary.js
   and filters it as you type. */
window.FM = window.FM || {};

FM.glossaryFilter = {
  init({ list, input, count, terms }) {
    if (!list || !terms) return;

    const render = (query = '') => {
      const q = query.trim().toLowerCase();
      const rows = terms.filter(([term, def]) => !q || `${term} ${def}`.toLowerCase().includes(q));
      list.innerHTML = rows.length
        ? rows.map(([term, def, topic]) => `<dt>${term} <span class="tag">[${topic}]</span></dt><dd>${def}</dd>`).join('')
        : '<dt>no match</dt><dd>Try another term.</dd>';
      if (count) count.textContent = `${rows.length}/${terms.length}`;
    };

    if (input) input.addEventListener('input', () => render(input.value));
    render();
  }
};
