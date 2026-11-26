# Project rules

- Keep module-specific content and media in typed listing records rendered by one shared page; permanent module routes and a keyed listing view prevent cross-module content and gallery state from leaking.
- Keep the agent directory shared across module pages and include the selected listing in inquiry links; switching a listing must not duplicate or modify agent records.
- In `src/pages/Index.tsx`, grid span classes (`md:col-span-*`, `md:row-span-*`) must go on the `Reveal` wrapper via its `className` prop: `Reveal` renders the `motion.div` that is the actual grid item, so spans on the inner button or image are ignored.
- The Tailwind theme colors are declared as `hsl(var(--x))` without an `<alpha-value>` placeholder, so opacity modifiers such as `bg-primary/55` render fully opaque; for a translucent theme color use an inline `hsl(var(--x) / 0.55)`.
- Photos the site displays are imported files under `src/assets` (not CDN pointers) so they stay editable with image tools; a reworked photo gets a new filename rather than overwriting the one already imported.
