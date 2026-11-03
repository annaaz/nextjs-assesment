# Next.js / TypeScript Mid-Level Assessment

Solutions for 5 coding challenges, implemented in a single Next.js (App Router) application. Each challenge has its own page for manual verification, and the pure logic has unit tests.

## Tech Stack

- Next.js (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Vitest + React Testing Library (unit and component tests)
- No UI component library, no external runtime dependencies beyond Next.js and React

## Prerequisites

- Node.js 20 or newer
- npm

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open http://localhost:3000. The home page links to all five challenges.

## Running the Tests

```bash
npm test
```

Runs every `*.test.ts` and `*.test.tsx` file once with Vitest. For watch mode:

```bash
npx vitest
```

## Production Check

```bash
npx tsc --noEmit   # type check
npm run lint       # lint
npm run build      # production build
npm start          # serve the production build
```

## Challenges

| # | Challenge | Page | Logic / Component | Tests |
|---|-----------|------|-------------------|-------|
| 1 | Filter, Sort, and Paginate Products | `/challenge-1` | `lib/searchProducts.ts` | `lib/searchProducts.test.ts` |
| 2 | Resolve the Best Matching Route | `/challenge-2` | `lib/findRoute.ts` | `lib/findRoute.test.ts` |
| 3 | Build a Safe Breadcrumb Trail | `/challenge-3` | `lib/buildBreadcrumbs.ts`, `components/Breadcrumbs.tsx` | `lib/buildBreadcrumbs.test.ts` |
| 4 | Build a Product Card Component | `/challenge-4` | `components/ProductCard.tsx`, `lib/formatIDR.ts` | `lib/formatIDR.test.ts`, `components/ProductCard.test.tsx` |
| 5 | Build an Accessible Tabs Component | `/challenge-5` | `components/Tabs.tsx` | `components/Tabs.test.tsx` |

## Project Structure

```
app/
  page.tsx                 # index with links to every challenge
  challenge-1/page.tsx     # ... through challenge-5
components/
  Breadcrumbs.tsx
  ProductCard.tsx
  Tabs.tsx
lib/
  searchProducts.ts
  findRoute.ts
  buildBreadcrumbs.ts
  formatIDR.ts
vitest.config.ts
```

Pure logic lives in `lib/` and is kept separate from the UI so it can be tested without rendering anything.

## How to Verify Each Challenge Manually

**1. Filter, Sort, Paginate** (`/challenge-1`)
- Defaults (query `ap`, page 1) show matches sorted case-insensitively.
- Try page `0` or negative (treated as page 1), page size `0` (empty result), a page beyond the last (empty), and an empty query (all items).
- Switch to the 100,000-item dataset. The execution time is shown in the UI.

**2. Route Matching** (`/challenge-2`)
- Click the example chips. Examples 1, 2, 3 from the spec return `0`, `-1`, `0`.
- Also try "First match" and "Param kosong".

**3. Breadcrumbs** (`/challenge-3`)
- "Contoh 1" returns `Shop` and `blue mug` with `/products` and `/products/blue%20mug`.
- "Encoding rusak" must not crash the page.

**4. Product Card** (`/challenge-4`)
- Prices render as `Rp 12.500`. Clicking "Add to cart" logs `onAdd("<id>")`.
- The last product is out of stock: the button is disabled and reads "Out of stock".

**5. Tabs** (`/challenge-5`)
- "Reviews" is selected on load. Click a tab to switch.
- With the keyboard: `Tab` enters the tab list, then `←` `→` `Home` `End` move between tabs.

## Design Notes

- **Challenge 1:** lowercase keys are computed once per item (not inside the sort comparator), giving O(n + m log m). Sorting is done on a new array, so the input is never mutated. `NaN` page is treated as 1 and `NaN` page size returns `[]`.
- **Challenge 2:** a trailing slash is removed once on both the pattern and the path. Segments are compared whole, so there are no partial matches. A `:param` never matches an empty segment. The first matching pattern wins. Matching is case-sensitive.
- **Challenge 3:** `decodeURIComponent` is wrapped in a try/catch so malformed input like `%E0%A4%A` never throws. Hrefs are re-encoded per segment, so `a%2Fb` stays one segment. Labels are looked up with `hasOwnProperty`, so names like `constructor` are not read from the prototype. Labels are rendered as React text (no `dangerouslySetInnerHTML`).
- **Challenge 4:** `formatIDR` formats manually instead of using `Intl.NumberFormat`. `Intl` emits a non-breaking space and its output can vary by ICU version, which would break exact matching and risk hydration mismatches. The card uses a plain `<img>` to avoid `next/image` domain configuration, and an inline ESLint disable comment is included for that line.
- **Challenge 5:** follows the WAI-ARIA tabs pattern (`tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`, `aria-labelledby`) with roving `tabindex` and automatic activation on arrow keys. The component is fully controlled and has no internal active state. Only the active panel is rendered. Ids are generated with `useId` and sanitized.

## Important Notes

- Run all commands from the project root (the folder containing this `package.json`). Running `npm i` in a parent folder creates a second `node_modules` and causes hooks errors such as `Cannot read properties of null (reading 'useId')` during tests.
- The `@/` import alias must be enabled in `tsconfig.json` (the default from `create-next-app`) and is mirrored in `vitest.config.ts`.
- Component tests need `jsdom`, `@vitejs/plugin-react`, `@testing-library/react`, and `@testing-library/dom`. All are listed in `devDependencies`.
- `globals: true` in `vitest.config.ts` enables automatic DOM cleanup between component tests.
- Challenge pages are Client Components (`"use client"`) because they hold interactive state. `ProductCard` itself has no hooks and can be used from a Server Component, while `Tabs` is a Client Component.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Cannot find name 'test'` (TS2582) | Import `test` and `expect` from `vitest` in test files, or confirm `vitest` is installed. |
| `Cannot find module 'vitest'` during `tsc` or build | Run `npm install` in the project root. |
| `useId` of null in component tests | Check `npm ls react react-dom` for a single version and remove any stray `node_modules` in parent folders. |
| "Found multiple elements" in tests | Make sure `globals: true` is set, or call `cleanup` in `afterEach`. |
