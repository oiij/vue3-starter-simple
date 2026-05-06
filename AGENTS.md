# AGENTS.md

## Package Manager

pnpm only. Enforced by `preinstall` hook (`only-allow pnpm`). Never use npm/yarn.

## Key Commands

```bash
pnpm dev          # Vite dev server (port 5678, proxies /api → port 5633)
pnpm build        # vue-tsc --noEmit && vite build
pnpm lint         # eslint .
pnpm lint:fix     # eslint . --fix
pnpm test         # vitest (watch mode by default)
pnpm type:check   # vue-tsc --noEmit
```

Pre-commit hook runs `pnpm lint-staged && pnpm type:check` automatically.

## Verification Order

`lint:fix → type:check → test`

## Project Structure

```
src/              # App source
  pages/          # File-based routes (via @oiij/auto-router)
  layouts/        # Page layouts (vite-plugin-vue-layouts)
  stores/         # Pinia stores (auto-imported from src/stores)
  composables/    # Composables (auto-imported from src/composables)
  components/     # Components (auto-imported via unplugin-vue-components)
  modules/        # Plugin registration (useModules in main.ts)
  locales/        # i18n translations
plugins/          # Vite plugin configs (barrel-exported from plugins/index.ts)
config/           # App constants (DEV_PORT=5678, SERVER_PORT=5633, DEV_PROXY)
server/           # Nitro API routes (preset: vercel)
```

## Conventions

- **TypeScript**: Use `type` not `interface` (enforced by eslint rule `ts/consistent-type-definitions`)
- **Vue**: Composition API + `<script setup>` only
- **Path alias**: `~` → `src/` (via tsconfig `paths` and Vite `resolve.tsconfigPaths`)
- **CSS**: UnoCSS atomic classes (not Tailwind). Presets: wind3, attributify, icons, typography, webfonts, extra, scrollbar, animations, animaecss. Less preprocessor available.
- **Icons**: `@iconify-json/mage` via `unplugin-icons`. Use `<script setup>` icon imports or UnoCSS icon classes.
- **Formatting**: ESLint handles formatting (no Prettier). `eslint-plugin-format` for non-JS files.

## Auto-Imports

Configured in `plugins/auto-import.ts` and `plugins/components.ts`:

- **APIs**: vue, vue-router, @vueuse/core, pinia, vue-i18n, await-to-js `to()`
- **Dirs**: `src/composables/*`, `src/stores/*` — exports are auto-imported globally
- **Components**: `src/components/**/*.{vue,md}` + NaiveUiResolver + VueUseComponentsResolver
- Do NOT add manual imports for these — they are resolved at build time.

## Git & Commits

- `pnpm cz` — interactive commit via czg/cz-git
- `pnpm commit` — pull + add + cz + push (convenience shortcut)
- Commit types: feat, fix, docs, style, refactor, perf, type, test, build, ci, revert, chore
- Scoped commits supported (projects, components, hooks, utils, types, styles, deps, auth, release, other)

## Build Notes

- Output dir: `.vercel/output/static` — must match Nitro's vercel preset output
- Production: console/debugger stripped, sourcemaps enabled
- `vite-bundle-analyzer` generates static report on build
- Auto-generated `.d.ts` files: `auto-imports.d.ts`, `components.d.ts`, `typed-router.d.ts`, `svg-component.d.ts`, etc. — do not edit manually, gitignored

## Existing Rules

See `.agents/rules/` for project-info, tech-stack, ui-guidelines, and unocss (style conventions + oiijPreset shortcuts).
Skills in `.agents/skills/` and `skills-lock.json` (vue, unocss, pinia, vue-router, vueuse-functions, web-design-guidelines).
