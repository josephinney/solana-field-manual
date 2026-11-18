/* ============================================================
   data/articles.js
   List of articles. The sidebar, the home start button and the
   prev/next links are built from this list.

   To add an article: create the file in /articles and add
   one entry here, in reading order.

   status: "published" → normal link
           "draft"     → shown dimmed, opens the outline page
   ============================================================ */

window.SITE = {
  title: 'Solana Field Manual',
  updated: '18 Nov 2026',
  articles: [
    {
      id: '00',
      title: 'Centralized vs Decentralized',
      nav: 'centralized vs decentralized',
      file: 'articles/00-centralized-vs-decentralized.html',
      status: 'published',
      level: 'beginner',
      minutes: 6
    },
    {
      id: '01',
      title: 'What is Solana?',
      nav: 'what is solana',
      file: 'articles/01-what-is-solana.html',
      status: 'published',
      level: 'beginner',
      minutes: 9
    },
    {
      id: '02',
      title: 'Tokens on Solana',
      nav: 'tokens',
      file: 'articles/02-spl-tokens.html',
      status: 'published',
      level: 'beginner',
      minutes: 6
    },
    {
      id: '03',
      title: 'Create your own token on devnet',
      nav: 'create a token',
      file: 'articles/03-create-a-token.html',
      status: 'published',
      level: 'beginner',
      minutes: 15
    },
    {
      id: '04',
      title: 'Wallets and keys',
      nav: 'wallets and keys',
      file: 'articles/04-wallets-and-keys.html',
      status: 'published',
      level: 'beginner',
      minutes: 8
    },
    {
      id: '05',
      title: 'Transactions and fees',
      nav: 'transactions and fees',
      file: 'articles/05-transactions-and-fees.html',
      status: 'published',
      level: 'beginner',
      minutes: 10
    },
    {
      id: '06',
      title: 'Validators and staking',
      nav: 'validators and staking',
      file: 'articles/06-validators-and-staking.html',
      status: 'published',
      level: 'beginner',
      minutes: 8
    },
    {
      id: '07',
      title: 'Programs',
      nav: 'programs',
      file: 'articles/07-programs.html',
      status: 'published',
      level: 'beginner',
      minutes: 9
    },
    {
      id: '08',
      title: 'Your first program with Anchor',
      nav: 'first program',
      file: 'articles/08-first-program-anchor.html',
      status: 'published',
      level: 'beginner',
      minutes: 30
    },
    {
      id: '09',
      title: 'Writing safer programs',
      nav: 'safer programs',
      file: 'articles/09-writing-safer-programs.html',
      status: 'published',
      level: 'beginner',
      minutes: 10
    },
    {
      id: '10',
      title: 'Two paths: consensus or applications',
      nav: 'two paths',
      file: 'articles/10-two-paths.html',
      status: 'published',
      level: 'beginner',
      minutes: 8
    }
  ]
};
