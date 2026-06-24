# Pasta de marca (`public/brand`)

Coloque aqui os ficheiros oficiais da Ponto Wine:

- `logo.svg` — **logótipo principal** (preferencial; vetorial, não deforma).
- `logo.png` — alternativa em PNG transparente de alta resolução.
- `logo-light.svg` / `logo-dark.svg` — variantes para fundos claros/escuros (opcional).

Depois de adicionar o `logo.svg`, ative-o em
`src/components/brand/logo.tsx` mudando `HAS_REAL_LOGO` para `true`.

> Enquanto não existir logo, é mostrado um wordmark placeholder elegante.
> O placeholder NÃO inventa um símbolo novo — usa apenas o nome "Ponto Wine".
