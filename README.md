# Chinese Bridge Competition Scoring and Evaluation System

汉语桥（小学组）阿德莱德赛区总决赛评分评价系统原型。

## Local development

```bash
npm install
npm run dev
```

## Supabase

1. Create a Supabase project.
2. Open the Supabase SQL Editor and run `supabase-schema.sql`.
3. Copy `.env.example` to `.env`.
4. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

Without these environment variables, the app falls back to local demo data.

## Build

```bash
npm run build
```

## Vercel

Import this repository from GitHub in Vercel. Vercel will run `npm run build` and publish the `dist` folder.
