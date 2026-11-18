/* footer.js: builds the footer of every page from window.SITE.author.

   It shows a terminal-style signature and a link to report errors:
     $ whoami
     [github icon] @user
     found an error? open an issue ↗

   The issue link opens a new GitHub issue in window.SITE.repo with the
   title already filled in with the name of the current page.

   The icon is GitHub's official mark, which you download from
   https://github.com/logos and save as assets/github-mark-white.svg.
   If the file is missing, the icon is simply left out. */
window.FM = window.FM || {};

FM.footer = {
  render(el, { root, site }) {
    if (!el || !site || !site.author) return;
    const { user, url } = site.author;

    el.innerHTML =
      `<p class="whoami"><span class="pr">$</span> whoami</p>` +
      `<a class="gh" href="${url}" target="_blank" rel="noopener">` +
        `<img src="${root}assets/github-mark-white.svg" alt="" width="16" height="16">` +
        `<span>@${user}</span>` +
      `</a>` +
      this.issueLink(site.repo);

    // no icon file yet: hide the image so no broken-image box appears
    const img = el.querySelector('img');
    img.addEventListener('error', () => img.remove());
  },

  issueLink(repo) {
    if (!repo) return '';
    const page = document.title.replace(/\s*·\s*Solana Field Manual$/, '') || 'Solana Field Manual';
    const href = `${repo}/issues/new?title=${encodeURIComponent('Error in: ' + page)}`;
    return `<p class="report"><a href="${href}" target="_blank" rel="noopener">found an error? open an issue ↗</a></p>`;
  }
};
