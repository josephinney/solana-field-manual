# Solana Field Manual

Blog estático sobre Solana con estilo de terminal retro. Es HTML, CSS y JavaScript puros: no necesita build, frameworks ni `npm install`.

## Estructura

```
solana-field-manual/
├── index.html                  home: lista de artículos
├── glossary.html               glosario con filtro
├── articles/
│   ├── _template.html          plantilla para un artículo nuevo
│   ├── 01-what-is-solana.html
│   └── 02-spl-tokens.html      placeholder
├── css/
│   ├── base.css                colores, fuentes, tipografía
│   ├── layout.css              barra lateral + columna de contenido
│   └── components.css          código, tablas, notas, figuras, glosario
├── js/
│   ├── main.js                 arranca todo en cada página
│   └── helpers/
│       ├── clock.js            reloj
│       ├── sidebar.js          menú lateral
│       ├── scroll-spy.js       "on this page" + barra de progreso
│       ├── copy-code.js        botones [copy]
│       ├── highlight.js        colores del código (rust, typescript, bash, json)
│       └── glossary-filter.js  buscador del glosario
└── data/
    ├── articles.js             lista de artículos
    └── glossary.js             términos del glosario
```

## Ver el sitio en local

Abre `index.html` con doble clic. Funciona sin servidor porque los datos están en archivos `.js` y no en `.json`.

Si prefieres un servidor local:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Agregar un artículo

1. Copia `articles/_template.html` y renómbralo, por ejemplo `articles/03-mi-tema.html`.
2. En el `<body>`, cambia `data-page="03"` para que coincida con el `id` del paso 3.
3. Agrega una entrada en `data/articles.js`:

   ```js
   {
     id: '03',
     title: 'Título completo',
     nav: 'título corto',          // texto del menú lateral
     file: 'articles/03-mi-tema.html',
     status: 'published',          // o 'draft'
     level: 'beginner',
     minutes: 6
   }
   ```

La barra lateral, la lista de la home y los enlaces anterior/siguiente se actualizan solos.

## Convenciones dentro de un artículo

- Cada `<h2 id="...">` aparece en "on this page". `data-short="..."` define el texto corto que se muestra en la barra lateral.
- Notas: `.note` (info), `.note.warn` (ámbar) y `.note.crit` (rojo).
- Bloques de código: el botón `[copy]` omite las líneas de comentario que empiezan con `#`. Agrega `data-raw` al botón para copiar el bloque tal cual (JSON, Rust...).
- Figuras: SVG dentro del HTML del artículo, con las clases de `css/components.css`. No van en archivos `.svg` aparte porque así no podrían usar las fuentes ni los colores del sitio.
- Color solo cuando distingue algo: ámbar para advertencias y valores enlazados en figuras, rojo para errores o advertencias críticas.

## Publicar

Sube la carpeta completa a cualquier hosting estático: GitHub Pages, Netlify (arrastrar y soltar la carpeta), Cloudflare Pages o Vercel.
