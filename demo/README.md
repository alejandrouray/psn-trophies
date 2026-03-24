# Demo snapshot

`snapshot.json` contains static PSN data served when `DEMO_MODE=1`, keeping
the public demo online even when the NPSSO token has expired.

## Generate a fresh snapshot

1. Add a valid `PSN_NPSSO` to `.env.local`.
2. Optional: set `COMPARE_DEMO_ONLINE_ID` to a real PSN `onlineId` to include
   one compare flow (enables `/compare?user=…` for that player).
3. Run:

```bash
pnpm run export:demo
```

This overwrites `demo/snapshot.json` with:
- Full overview (profile, trophy summary, all titles).
- Every title's full trophy list (same data as `/games/[titleId]`).
- Optional compare data for `COMPARE_DEMO_ONLINE_ID`.

## Deploy on Vercel

Set `DEMO_MODE=true` in Vercel environment variables and commit the generated
`demo/snapshot.json`. The app will serve snapshot data on every request without
touching Sony's API.

## Privacy

The snapshot includes profile data, game list, and trophy progress. Review and
trim before committing if you prefer to keep certain data private.

## Health monitoring

Once deployed, point an uptime monitor (e.g. UptimeRobot, Better Uptime) at:

```
GET https://your-domain.com/api/health
```

- Returns `200` when PSN auth is healthy (or `DEMO_MODE=1`).
- Returns `503` when the NPSSO token is missing or has expired.

Configure an alert to notify you by email whenever it returns `503`.
