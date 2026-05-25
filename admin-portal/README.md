# Admin Portal (bfftracker.net)

This app is the admin dashboard intended to be served from the domain `bfftracker.net`.

Deployment notes:
- Static hosting (GitHub Pages / Netlify / Vercel): ensure `public/CNAME` contains `bfftracker.net` (already present).
- Build uses the `homepage` field in `package.json` set to `https://bfftracker.net`.
- Configure environment variable `REACT_APP_API_URL` (see `.env.example`) to point to your API (for example `https://bfftracker.net/api`).

Local run:
```
cd admin-portal
npm install
cp .env.example .env
npm start
```
