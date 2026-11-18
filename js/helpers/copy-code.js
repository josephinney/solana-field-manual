/* copy-code.js: [copy] buttons on code blocks.
   By default lines starting with "#" (shell comments) are skipped.
   Add data-raw to the button to copy the block exactly as shown. */
window.FM = window.FM || {};

FM.copyCode = {
  init(root = document) {
    root.querySelectorAll('.code .copy').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pre = btn.closest('.code').querySelector('pre');
        const text = btn.hasAttribute('data-raw')
          ? pre.innerText
          : pre.innerText.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#')).join('\n');

        const done = (msg) => {
          btn.textContent = msg;
          setTimeout(() => { btn.textContent = 'copy'; }, 1400);
        };

        try {
          navigator.clipboard.writeText(text).then(() => done('copied'), () => done('select text'));
        } catch (err) {
          done('select text');
        }
      });
    });
  }
};
