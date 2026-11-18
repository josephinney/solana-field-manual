/* highlight.js: colors the code inside .code blocks.
   The language comes from the block label: "rust", "typescript · tests/x.ts", "bash", "json".
   Blocks with any other label (for example "project tree") are left as they are.
   Terminal screens (.term) are never touched.

   Classes it writes, styled in components.css:
     .c   comment          .kw  keyword            .at  attribute or macro
     .s   string           .ty  type                .v   shell variable */
window.FM = window.FM || {};

FM.highlight = {
  LANGS: { rust: 'rust', rs: 'rust', typescript: 'ts', ts: 'ts', javascript: 'ts', js: 'ts',
           bash: 'bash', sh: 'bash', shell: 'bash', json: 'json' },

  KEYWORDS: {
    rust: 'as async await break const continue crate else enum false fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait true type unsafe use where while dyn',
    ts: 'as async await break case catch class const continue default else export extends false finally for from function if import in instanceof interface let new null of return super this throw true try type typeof undefined var void while'
  },

  PRIMITIVES: 'u8 u16 u32 u64 u128 usize i8 i16 i32 i64 i128 isize f32 f64 bool str char string number boolean bigint',

  init(root = document) {
    const kw = {}, prim = new Set(this.PRIMITIVES.split(' '));
    for (const k in this.KEYWORDS) kw[k] = new Set(this.KEYWORDS[k].split(' '));

    root.querySelectorAll('.code').forEach((block) => {
      const label = block.querySelector('.label span');
      const pre = block.querySelector('pre');
      if (!label || !pre) return;
      const lang = this.LANGS[label.textContent.split('·')[0].trim().toLowerCase()];
      if (!lang) return;
      pre.innerHTML = this.tokenize(pre.textContent, lang, kw[lang], prim);
    });
  },

  esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  wrap(cls, s) {
    return `<span class="${cls}">${this.esc(s)}</span>`;
  },

  // Each rule is [sticky regex, class]. The first rule that matches at the
  // current position wins. A class of 'word' means "decide by the word".
  rules(lang) {
    const str = [/b?"(?:\\.|[^"\\])*"/y, 's'];
    switch (lang) {
      case 'rust': return [
        [/\/\/[^\n]*/y, 'c'],
        [/#!?\[/y, 'attr'],
        str,
        [/'(?:\\.|[^'\\\n])'/y, 's'],      // char literal
        [/'[a-z_]\w*/y, ''],                // lifetime such as 'info
        [/[a-z_]\w*!/y, 'at'],              // macro such as msg!
        [/[A-Za-z_]\w*/y, 'word']
      ];
      case 'ts': return [
        [/\/\/[^\n]*/y, 'c'],
        [/\/\*[\s\S]*?\*\//y, 'c'],
        [/"(?:\\.|[^"\\\n])*"/y, 's'],
        [/'(?:\\.|[^'\\\n])*'/y, 's'],
        [/`(?:\\.|[^`\\])*`/y, 's'],
        [/[A-Za-z_$][\w$]*/y, 'word']
      ];
      case 'bash': return [
        [/(?:^|(?<=\s))#[^\n]*/my, 'c'],
        [/\$\{?\w+\}?/y, 'v'],
        [/[\w-]+/y, '']
      ];
      case 'json': return [
        [/"(?:\\.|[^"\\])*"(?=\s*:)/y, ''], // keys stay plain
        [/"(?:\\.|[^"\\])*"/y, 's'],
        [/\b(?:true|false|null)\b/y, 'kw']
      ];
    }
    return [];
  },

  word(w, kw, prim) {
    if (kw && kw.has(w)) return 'kw';
    if (prim.has(w)) return 'ty';
    if (/^[A-Z][A-Z0-9_]+$/.test(w)) return '';   // CONSTANTS stay plain
    if (/^[A-Z]/.test(w)) return 'ty';
    return '';
  },

  // Reads a Rust attribute from "#[" to its matching "]" and colors it as a
  // whole. Strings inside it keep their own color.
  attribute(src, i) {
    let depth = 0, j = i;
    while (j < src.length) {
      const ch = src[j];
      if (ch === '"') {
        j++;
        while (j < src.length && src[j] !== '"') j += src[j] === '\\' ? 2 : 1;
      } else if (ch === '[') depth++;
      else if (ch === ']' && --depth === 0) { j++; break; }
      j++;
    }
    const text = src.slice(i, j);
    // split keeps the strings at the odd positions
    const inner = text.split(/(b?"(?:\\.|[^"\\])*")/)
      .map((part, k) => (k % 2 ? this.wrap('s', part) : this.esc(part))).join('');
    return { html: `<span class="at">${inner}</span>`, end: j };
  },

  tokenize(src, lang, kw, prim) {
    const rules = this.rules(lang);
    let out = '', plain = '', i = 0;
    const flush = () => { out += this.esc(plain); plain = ''; };

    while (i < src.length) {
      let hit = false;
      for (const [re, cls] of rules) {
        re.lastIndex = i;
        const m = re.exec(src);
        if (!m || m[0] === '') continue;
        hit = true;
        if (cls === 'attr') {
          flush();
          const a = this.attribute(src, i);
          out += a.html; i = a.end;
          break;
        }
        let c = cls === 'word' ? this.word(m[0], kw, prim) : cls;
        if (c === 'kw' && src[i - 1] === '.') c = '';   // Buffer.from is a property, not a keyword
        if (c) { flush(); out += this.wrap(c, m[0]); } else plain += m[0];
        i += m[0].length;
        break;
      }
      if (!hit) plain += src[i++];
    }
    flush();
    return out;
  }
};
