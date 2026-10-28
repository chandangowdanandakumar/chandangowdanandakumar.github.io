# chandangowdanandakumar.github.io

Personal portfolio website for [Chandan Gowda Nandakumar](https://chandangowdanandakumar.github.io) — Software Engineer at Amazon.

## Stack

- **React 18** + **TypeScript** — component framework
- **Vite 5** — build tool
- **Tailwind CSS 3** — styling
- **GitHub Actions** — CI/CD, deploys on push to `master`

## Structure

```
src/
├── App.tsx        # All sections: Hero, About, Experience, Projects, Contact
├── main.tsx       # Entry point
└── index.css      # Tailwind + custom animations
.github/
└── workflows/
    └── deploy.yml # Build → deploy to GitHub Pages on push
```

## Local Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build → dist/
```

## Deployment

Pushes to `master` trigger GitHub Actions, which builds and deploys automatically to [chandangowdanandakumar.github.io](https://chandangowdanandakumar.github.io).
