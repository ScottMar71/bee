# The Beehive, Eaton, Norwich

Public house website. Cream pages, brick accent, owner-editable What’s On.

## Local

```bash
cp .env.example .env.local
# set ADMIN_PASSWORD (and optionally ADMIN_SECRET)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Owner updates: [http://localhost:3000/admin](http://localhost:3000/admin).

## Live (free)

1. Push this repo to GitHub (`ScottMar71/bee`).
2. Import the repo on [Vercel](https://vercel.com) (Hobby is enough).
3. Set env vars: `ADMIN_PASSWORD`, `ADMIN_SECRET`, `GITHUB_TOKEN` (repo contents write), `GITHUB_REPO=ScottMar71/bee`.
4. After a save in `/admin`, Vercel rebuilds from the commit (usually under a minute).

No paid third-party tools. Phone number is hidden until added in admin.
