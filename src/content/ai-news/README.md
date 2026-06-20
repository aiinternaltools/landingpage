# AI News — weekly executive briefing content

One JSON file per week. Every edition uses the same article template ([`AiNewsArticleTemplate`](../../components/ai-news/briefing/AiNewsArticleTemplate.tsx)); only the JSON content changes.

## Add an edition

1. Copy [`articles/_template.json`](articles/_template.json) to `articles/your-edition.json` (do not keep the `_` prefix on the copy).
2. Fill every field. Match the shape in [`types.ts`](types.ts) and the sample [`3-9_May2026.json`](articles/3-9_May2026.json).
3. Set `"status": "published"` when ready (`"draft"` hides the edition from the site).
4. Optional: add MP3 under `public/audio/ai-news/` and an `audio` block in JSON for a pre-recorded full briefing.
5. **2-minute summary audio:** set `ELEVEN_LABS_API_KEY` and `ELEVEN_LABS_API_URL` in `.env`, then **restart** `npm run dev`. Defaults: **eleven_v3**, voice **Jessica**, speed **1.18**. Optional: `ELEVEN_LABS_VOICE_ID`, `ELEVEN_LABS_MODEL_ID`, `ELEVEN_LABS_SPEED`.

## URL

- Listing: `/ai-news`
- Article: `/ai-news/{seo.slug}`

## Template vs JSON

| Fixed in code (all articles) | From JSON (per week) |
|------------------------------|----------------------|
| Section order, nav anchors, section titles | `week_range`, dates, `hook`, `executive_summary` |
| Hero layout, TTS, CTA card | `market_pulse`, `stories[]`, `tools_to_test[]` |
| Styling (`briefing-article`, bands) | `strategic_insight`, `weekly_action_plan[]`, `beginner_term` |
| | `recommended_article_angle`, `seo`, optional `audio` |

Section labels live in [`article-template-sections.ts`](../../components/ai-news/briefing/article-template-sections.ts).

## Required top-level fields

- `week_range`, `date_start`, `date_end`
- `hook`, `executive_summary`, `signal_strength`, `theme_of_the_week`
- `market_pulse` — `{ summary, what_changed_this_week[] }`
- `stories[]` — at least one story; see `types.ts`
- `strategic_insight`, `weekly_action_plan[]` (at least one item), `beginner_term`
- `tools_to_test[]` — may be empty; section still renders
- `recommended_article_angle` — `{ title, subtitle }`
- `seo` — `{ meta_title, meta_description, slug, keywords[] }`

Files starting with `_` are ignored by the loader (use `_template.json` only as a copy source).

See [`types.ts`](types.ts) for the full TypeScript schema.
