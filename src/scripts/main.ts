import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const $ = <T extends Element>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- theme ---------- */
$('#theme-btn')?.addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});

/* ---------- mobile menu ---------- */
const menu = $('#menu')!;
const menuBtn = $<HTMLButtonElement>('#menu-btn')!;
const setMenu = (open: boolean) => {
  menu.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'Close' : 'Menu';
};
menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', (e) => (e.target as Element).closest('a') && setMenu(false));
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
});

/* ---------- nav: hide on scroll down, scrollspy ---------- */
const nav = $('#nav')!;
const links = $$<HTMLAnchorElement>('a.l', menu);
let last = 0;
addEventListener('scroll', () => {
  const y = scrollY;
  nav.classList.toggle('away', y > last && y > 200 && !menu.classList.contains('open'));
  last = y;
}, { passive: true });
$$('section[aria-labelledby]').forEach((s) => {
  const id = s.getAttribute('aria-labelledby');
  ScrollTrigger.create({
    trigger: s, start: 'top 50%', end: 'bottom 50%',
    onToggle: (self) => self.isActive && links.forEach((a) =>
      a.setAttribute('aria-current', String(a.getAttribute('href') === `#${id}`))),
  });
});

/* ---------- project filter ---------- */
const items = $$<HTMLElement>('.proj');
const status = $('#filter-status')!;
const btns = $$<HTMLButtonElement>('[data-filter]');
const filter = (f: string) => {
  btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
  const state = calm ? null : Flip.getState(items);
  items.forEach((el) => (el.hidden = f !== 'all' && el.dataset.cat !== f));
  const shown = items.filter((el) => !el.hidden).length;
  status.textContent = `${shown} of ${items.length} projects shown`;
  if (state) Flip.from(state, { duration: 0.5, ease: 'power2.out', absolute: false, onEnter: (e) => gsap.fromTo(e, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }) });
  ScrollTrigger.refresh();
};
btns.forEach((b) => b.addEventListener('click', () => filter(b.dataset.filter!)));

/* ---------- hover preview (desktop only) ---------- */
if (matchMedia('(hover: hover) and (pointer: fine) and (min-width: 861px)').matches) {
  items.forEach((el) => {
    const fig = $<HTMLElement>('.proj-fig', el)!;
    const x = gsap.quickTo(fig, 'x', { duration: 0.5, ease: 'power3' });
    const y = gsap.quickTo(fig, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => { x(e.clientX + 24); y(e.clientY - 80); });
    el.addEventListener('pointerenter', () => fig.classList.add('on'));
    el.addEventListener('pointerleave', () => fig.classList.remove('on'));
  });
}

/* ---------- motion ---------- */
if (!calm) {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Reset the CSS offset first: if the motion code never runs (or throws), the
  // CSS animation fallback reveals the text instead of leaving it hidden.
  gsap.set('.hero .line > span, .w > span', { y: 0 });

  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .to('.hero .line > span', { y: 0, duration: 1.1, stagger: 0.12 }, 0.1)
    .to('.hero [data-reveal]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.5);

  // titles: word by word
  $$('[data-title]').forEach((h) => {
    gsap.to($$('.w > span', h), {
      y: 0, duration: 0.9, stagger: 0.06, ease: 'power4.out',
      scrollTrigger: { trigger: h, start: 'top 85%', once: true },
    });
  });

  // generic reveal
  $$('[data-reveal]').filter((el) => !el.closest('.hero')).forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // timeline line draws with scroll
  gsap.fromTo('.tl-line', { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '.tl', start: 'top 70%', end: 'bottom 60%', scrub: true },
  });

  // counters
  $$<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    gsap.to(o, {
      v: end, duration: 1.5, ease: 'power2.out', snap: { v: 1 },
      onUpdate: () => (el.textContent = String(o.v)),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // smooth anchors
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const t = $(a.getAttribute('href')!);
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t as HTMLElement, { offset: -90 });
    }));
}

/* ---------- starfield (hero only) ---------- */
const canvas = $<HTMLCanvasElement>('#stars');
if (canvas) {
  const ctx = canvas.getContext('2d')!;
  const host = canvas.parentElement as HTMLElement;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  const stars = Array.from({ length: 130 }, () => ({
    x: Math.random(), y: Math.random(), r: rnd(0.4, 1.3),
    a: rnd(0.2, 0.85), sp: rnd(0.35, 1.6), ph: rnd(0, Math.PI * 2), depth: rnd(0.05, 0.4),
  }));
  let w = 0, h = 0, visible = true;
  const fit = () => {
    w = host.clientWidth; h = host.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  fit();
  addEventListener('resize', fit, { passive: true });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(host);

  const draw = (time: number) => {
    const light = document.documentElement.dataset.theme === 'light';
    const cCommon = light ? '92, 104, 142' : '215, 220, 239';
    const cAccent = light ? '138, 106, 47' : '217, 164, 91';
    const drift = Math.min(scrollY, h) * 0.15;
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const tw = calm ? 1 : 0.6 + 0.4 * Math.sin(time * 0.0011 * s.sp + s.ph);
      ctx.fillStyle = `rgb(${s.sp > 1.15 ? cAccent : cCommon})`;
      ctx.globalAlpha = s.a * tw;
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h + drift * s.depth, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  if (calm) {
    draw(0);
    document.addEventListener('click', (e) => {
      if ((e.target as Element).closest('#theme-btn')) requestAnimationFrame(() => draw(0));
    });
  } else {
    const loop = (t: number) => {
      if (visible) draw(t);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
