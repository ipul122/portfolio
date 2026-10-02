# Anwar Udin Sayfulloh — Portfolio

An AI/ML engineer's portfolio: machine learning, deep learning and geoscience, in one hand-built page.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://ipul122.github.io/portfolio/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://ipul122.github.io/portfolio/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://ipul122.github.io/portfolio/)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile--first-22c55e?style=flat-square)](https://ipul122.github.io/portfolio/)
[![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-181717?style=flat-square&logo=github&logoColor=white)](https://ipul122.github.io/portfolio/)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG_2.1-AA-6d28d9?style=flat-square)](https://ipul122.github.io/portfolio/)

**Live site:** <https://ipul122.github.io/portfolio/>

## About

I'm Anwar Udin Sayfulloh, an AI/ML engineer who builds end-to-end machine learning workflows — from data preparation and modelling in Python to the interface that makes the results usable. My work sits where machine learning meets geoscience: gold prospectivity mapping, landslide risk prediction, rock classification and subsurface interpretation, across 5+ projects and one published paper.

This repository is the source of my personal portfolio site. It is written from scratch with semantic HTML, hand-written CSS and vanilla JavaScript — no framework and no build step — so it loads quickly, stays easy to update, and remains usable for everyone who visits it.

## Tech Stack

Astro (static output, zero framework JS), hand-written CSS with a dark/light theme, GSAP + ScrollTrigger + Flip for animation, Lenis for smooth scroll. Fonts are self-hosted via Fontsource; images are converted to responsive WebP at build time.

| Layer | Choice |
| --- | --- |
| Markup | Astro components, semantic HTML5, JSON-LD `Person` schema |
| Content | Typed data in `src/data/` (projects, experience, skills) |
| Styling | CSS custom properties, Grid/Flexbox, `prefers-reduced-motion` respected |
| Motion | GSAP, ScrollTrigger, Flip, Lenis |
| Delivery | GitHub Actions builds `dist/` and deploys to GitHub Pages |

The previous plain HTML/CSS/JS version is kept (git-ignored) in `legacy/`.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # outputs dist/
```

## Key Features

- **Single-page structure** — Hero, About, Experience, Projects, Research & Leadership, Certificates, Skills, Education and Contact.
- **Project filtering** — All / Machine Learning / Computer Vision / Geophysics, animated with GSAP Flip, with an `aria-live` status line announcing the visible count.
- **Editorial motion** — a Lenis smooth-scroll surface, masked line-by-line title reveals, a scroll-drawn experience timeline, animated counters and a hover image preview on the project list.
- **Accessible by default** — skip link, semantic landmarks, labelled interactive elements, visible focus, and `prefers-reduced-motion` disables every animation.
- **Works without JavaScript** — content is rendered by Astro and visible by default; a CSS fallback reveals any text the motion layer would animate.
- **Fast by default** — responsive WebP images generated at build time, self-hosted fonts, no client framework.
- **SEO and social ready** — Open Graph and Twitter metadata, JSON-LD `Person` schema, `robots.txt` and `sitemap.xml`.
- **Downloadable CV** — the hero button serves the PDF from `public/cv/`.
- **Responsive** — laid out from 320 px phones up to large desktops.

## Project Structure

```text
portfolio-anwar/
├── src/
│   ├── layouts/Base.astro      # <head>, metadata, JSON-LD, nav, footer
│   ├── pages/index.astro       # All page sections
│   ├── components/SecHead.astro
│   ├── data/                   # Typed content: profile.ts, projects.ts
│   ├── styles/                 # base.css (tokens, nav, hero), sections.css
│   ├── scripts/main.ts         # Lenis + GSAP: intro, reveals, filter, counters
│   └── assets/                 # Source images, optimised at build time
├── public/                     # Copied verbatim: favicon, og-cover, cv/, robots, sitemap
└── .github/workflows/deploy.yml
```

## Contact

- **Email:** [anwarusdata@gmail.com](mailto:anwarusdata@gmail.com)
- **LinkedIn:** [anwar-udin-sayfulloh](https://www.linkedin.com/in/anwar-udin-sayfulloh-6268501b1/)
- **GitHub:** [@ipul122](https://github.com/ipul122)

Always happy to talk about AI/ML engineering, research collaboration or data work.

## License

Released under the **MIT License** — free to use, modify and share, including commercially, as long as the copyright notice is kept.

Copyright © 2026 Anwar Udin Sayfulloh
