/* clock.js: local time in HH:MM:SS, updated every second. */
window.FM = window.FM || {};

FM.clock = {
  start(el) {
    if (!el) return;
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const d = new Date();
      el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    tick();
    setInterval(tick, 1000);
  }
};
