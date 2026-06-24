# Notas de Marca — Ponto Wine Garrafeira

Guia visual usado na construção da landing page. Estes valores estão refletidos
em `tailwind.config.ts` e `src/app/globals.css`.

> ⚠️ **Logo original ainda não fornecido.** Não foi encontrado nenhum ficheiro de
> logo no repositório (estava vazio). Foi criado um **placeholder elegante**
> (wordmark "Ponto Wine") em `src/components/brand/logo.tsx`, que mantém a
> personalidade vínica da marca sem inventar um símbolo novo. Ver instruções de
> substituição no fim deste documento.

## Paleta de cores

A paleta foi pensada para um universo **vínico, premium, quente e sofisticado**.
Quando o logo original existir, ajuste estes tons para corresponderem
exatamente às cores da marca.

| Token            | Hex       | Uso                                            |
| ---------------- | --------- | ---------------------------------------------- |
| `wine` (default) | `#5B0E14` | Vinho tinto profundo — base da marca           |
| `wine.500`       | `#7B1E2B` | Bordô — superfícies e botões secundários       |
| `wine.800`       | `#2C070A` | Fundos de cartões/diálogos                     |
| `gold` (default) | `#C9A24B` | Dourado/champagne — destaques, CTAs, detalhes  |
| `gold.soft`      | `#E6C97A` | Brilho dourado, hover                          |
| `gold.deep`      | `#A07E33` | Sombra do dourado, gradientes                  |
| `cork`           | `#A9744F` | Rolha/madeira — acentos e textura              |
| `cream` (default)| `#F7F1E8` | Branco quente — texto principal, rótulos       |
| `ink`            | `#120A0C` | Preto profundo — fundo geral                   |

## Tipografia

- **Serifa de display:** [Fraunces](https://fonts.google.com/specimen/Fraunces)
  — títulos, headlines e wordmark. Transmite carácter, calor e sofisticação.
- **Sans-serif de texto:** [Inter](https://fonts.google.com/specimen/Inter)
  — corpo de texto, formulários e UI. Legível e moderna.

Carregadas via `next/font/google` em `src/app/layout.tsx` (variáveis
`--font-fraunces` e `--font-inter`).

## Regras visuais

- **Fundo escuro** profundo com brilhos vínicos e dourados subtis (gradientes radiais).
- **Textura de papel/pedra** discreta (`.texture-paper`) em superfícies premium.
- **Glassmorphism** discreto (`.glass`) em formulários e cartões flutuantes.
- **Dourado para hierarquia**: CTAs principais, números, detalhes e brilho de texto.
- **Cantos arredondados** generosos (`--radius: 0.75rem`); botões em pílula.
- **Movimento:** scroll reveal suave, parallax leve, microinterações em botões,
  garrafa 3D interativa e "cork pop" em momentos de sucesso. Tudo respeita
  `prefers-reduced-motion`.
- **Sem deformar imagens:** usar sempre `object-contain`/`object-cover` conforme
  o caso; logos em SVG sempre que possível.

## Como colocar o logo original

1. Coloque o ficheiro em `public/brand/` — idealmente **`logo.svg`**; em
   alternativa, um **PNG transparente** de alta resolução.
2. Em `src/components/brand/logo.tsx`, mude `HAS_REAL_LOGO` para `true`
   (e ajuste `LOGO_SRC` se usar outro nome/extensão).
3. Se o logo trouxer cores próprias, atualize a paleta em `tailwind.config.ts`
   e as variáveis HSL em `src/app/globals.css` para manter coerência.
4. Para favicon, substitua/adicione `src/app/icon.png` (ou `favicon.ico`).
