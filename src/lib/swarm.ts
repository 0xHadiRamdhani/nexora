/*
  Particle swarm that rebuilds itself into a shape.
  Plain canvas 2D, no dependencies. Each section owns one instance; the loop
  only runs while its section is on screen and something is still moving.
*/

export type SwarmShape =
  | { kind: 'paths'; paths: string[]; view?: [number, number] }
  | { kind: 'text'; text: string };

/** Icon paths from lucide (ISC), on a 24×24 grid unless `view` says otherwise. */
export const SHAPES = {
  idea: {
    kind: 'paths',
    paths: [
      'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5',
      'M9 18h6',
      'M10 22h4',
    ],
  },
  devices: {
    kind: 'paths',
    view: [34, 24],
    paths: [
      'M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
      'M8 21h8',
      'M12 17v4',
      'M5.5 7h6',
      'M5.5 10.5h13',
      'M24.5 8h6a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5v-11a1.5 1.5 0 0 1 1.5-1.5z',
      'M27.5 19h.01',
    ],
  },
  code: { kind: 'paths', paths: ['m18 16 4-4-4-4', 'm6 8-4 4 4 4', 'm14.5 4-5 16'] },
  rocket: {
    kind: 'paths',
    paths: [
      'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
      'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09',
      'M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z',
      'M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05',
    ],
  },
  team: {
    kind: 'paths',
    paths: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M16 3.128a4 4 0 0 1 0 7.744', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0'],
  },
  layers: {
    kind: 'paths',
    paths: [
      'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z',
      'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12',
      'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17',
    ],
  },
  question: {
    kind: 'paths',
    paths: ['M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
  },
  mail: {
    kind: 'paths',
    paths: ['m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7', 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
  },
  brand: { kind: 'text', text: 'NEXORA' },
} satisfies Record<string, SwarmShape>;

export type ShapeName = keyof typeof SHAPES;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  k: number; // spring stiffness, varied per particle so they arrive at different times
  s: number; // swirl strength
  accent: boolean;
};

export type SwarmOptions = {
  shape: SwarmShape;
  reduced: boolean;
  /** multiplier on the particle count (1 = 60% of the shape's sampled points) */
  density?: number;
  /** share of particles drawn in the accent colour */
  accentShare?: number;
};

export class Swarm {
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private targets: Array<[number, number]> = [];
  private w = 0;
  private h = 0;
  private dpr = 1;
  private raf = 0;
  private last = 0;
  private visible = false;
  private mouse = { x: -9999, y: -9999, active: false };
  private colors = { brand: '#1653f0', accent: '#14c8d4' };
  private fontFamily = 'sans-serif';

  constructor(
    private canvas: HTMLCanvasElement,
    private opts: SwarmOptions
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas unavailable');
    this.ctx = ctx;
  }

  setColors(brand: string, accent: string, fontFamily: string) {
    const fontChanged = fontFamily !== this.fontFamily;
    this.colors = { brand, accent };
    this.fontFamily = fontFamily;
    if (fontChanged && this.opts.shape.kind === 'text' && this.w) this.resize(this.w, this.h);
    else this.redraw();
  }

  resize(width: number, height: number) {
    if (width < 2 || height < 2) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sizeChanged = Math.abs(width - this.w) > 1 || Math.abs(height - this.h) > 1;
    this.w = width;
    this.h = height;
    this.canvas.width = Math.round(width * this.dpr);
    this.canvas.height = Math.round(height * this.dpr);
    this.targets = this.sample(this.opts.shape);

    // enough particles to draw a dense outline, whatever the box size
    const density = this.opts.density ?? 1;
    const count = Math.round(Math.min(1600, Math.max(450, this.targets.length * 0.6 * density)));
    if (this.particles.length !== count || sizeChanged) {
      const accentShare = this.opts.accentShare ?? 0.18;
      this.particles = Array.from({ length: count }, () => ({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        tx: 0,
        ty: 0,
        k: 0.01 + Math.random() * 0.022,
        s: (Math.random() - 0.5) * 2,
        accent: Math.random() < accentShare,
      }));
      this.scatter();
      if (this.visible) this.rebuild();
    } else {
      this.assign(false);
    }
    this.redraw();
  }

  /** Throw every particle somewhere random, without animating (used while off screen). */
  scatter() {
    for (const p of this.particles) {
      p.x = Math.random() * this.w;
      p.y = Math.random() * this.h;
      p.vx = p.vy = 0;
    }
    this.assign(false);
    if (this.opts.reduced) return;
    // keep them scattered until rebuild() is called
    for (const p of this.particles) {
      p.tx = p.x;
      p.ty = p.y;
    }
  }

  /** Swarm from wherever the particles are into the shape. */
  rebuild() {
    this.assign(true);
  }

  pointer(x: number, y: number) {
    this.mouse = { x, y, active: true };
    this.kick();
  }

  pointerLeave() {
    this.mouse = { x: -9999, y: -9999, active: false };
    this.kick();
  }

  setVisible(v: boolean) {
    this.visible = v;
    if (v) {
      this.kick();
    } else {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  // ---- internals -------------------------------------------------------

  private assign(burst: boolean) {
    const pts = this.targets;
    if (!pts.length) return;
    const order = shuffle(pts.length);
    this.particles.forEach((p, i) => {
      const [tx, ty] = pts[order[i % pts.length]];
      const jitter = i >= pts.length ? 1.2 : 0;
      p.tx = tx + (Math.random() - 0.5) * jitter;
      p.ty = ty + (Math.random() - 0.5) * jitter;
      if (burst && !this.opts.reduced) {
        const a = Math.random() * Math.PI * 2;
        const f = 2 + Math.random() * 7;
        p.vx += Math.cos(a) * f;
        p.vy += Math.sin(a) * f;
      }
      if (this.opts.reduced) {
        p.x = p.tx;
        p.y = p.ty;
        p.vx = p.vy = 0;
      }
    });
    this.kick();
  }

  /** Rasterise the shape offscreen and keep the filled pixels as targets. */
  private sample(shape: SwarmShape): Array<[number, number]> {
    const { w, h } = this;
    const off = document.createElement('canvas');
    off.width = Math.round(w);
    off.height = Math.round(h);
    const c = off.getContext('2d', { willReadFrequently: true });
    if (!c) return [];
    c.fillStyle = '#000';
    c.strokeStyle = '#000';

    if (shape.kind === 'paths') {
      const [vw, vh] = shape.view ?? [24, 24];
      const scale = Math.min((w * 0.86) / vw, (h * 0.86) / vh);
      c.save();
      c.translate((w - vw * scale) / 2, (h - vh * scale) / 2);
      c.scale(scale, scale);
      c.lineWidth = 2.1;
      c.lineCap = 'round';
      c.lineJoin = 'round';
      shape.paths.forEach((d) => c.stroke(new Path2D(d)));
      c.restore();
    } else {
      let fontSize = h * 0.8;
      c.font = `800 ${fontSize}px ${this.fontFamily}`;
      const measured = c.measureText(shape.text).width;
      if (measured > w * 0.94) fontSize *= (w * 0.94) / measured;
      c.font = `800 ${fontSize}px ${this.fontFamily}`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(shape.text, w / 2, h / 2);
    }

    const data = c.getImageData(0, 0, off.width, off.height).data;
    const gap = Math.max(2, Math.round(Math.min(w, h) / 140));
    const pts: Array<[number, number]> = [];
    for (let y = 0; y < off.height; y += gap) {
      for (let x = 0; x < off.width; x += gap) {
        if (data[(y * off.width + x) * 4 + 3] > 128) pts.push([x, y]);
      }
    }
    return pts;
  }

  private redraw() {
    if (this.raf) return;
    this.draw();
  }

  private kick() {
    if (!this.visible) return;
    if (this.raf) return; // a frame is already queued
    this.last = 0;
    this.raf = requestAnimationFrame(this.tick);
  }

  private tick = (now: number) => {
    // Physics is tuned per 60 Hz step; run as many steps as real time has passed,
    // so the swarm moves at the same speed on 60 Hz, 120 Hz and throttled screens.
    const elapsed = this.last ? now - this.last : 16.7;
    this.last = now;
    const steps = Math.min(4, Math.max(1, Math.round(elapsed / 16.7)));
    let moving = false;
    if (!this.opts.reduced) for (let i = 0; i < steps; i++) moving = this.step();
    this.draw();
    this.raf = moving || this.mouse.active ? requestAnimationFrame(this.tick) : 0;
  };

  private step(): boolean {
    const R = Math.max(70, Math.min(this.w, this.h) * 0.18);
    const R2 = R * R;
    const { x: mx, y: my } = this.mouse;
    let energy = 0;

    for (const p of this.particles) {
      const dx = p.tx - p.x;
      const dy = p.ty - p.y;
      let ax = dx * p.k;
      let ay = dy * p.k;

      // swirl around the target while still far away
      const far = Math.min(1, Math.hypot(dx, dy) / 120);
      ax += -dy * 0.004 * p.s * far;
      ay += dx * 0.004 * p.s * far;

      // the cursor pushes particles out of the way
      const mdx = p.x - mx;
      const mdy = p.y - my;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < R2 && md2 > 0.01) {
        const md = Math.sqrt(md2);
        const f = (1 - md / R) * 3.2;
        ax += (mdx / md) * f;
        ay += (mdy / md) * f;
      }

      p.vx = (p.vx + ax) * 0.87;
      p.vy = (p.vy + ay) * 0.87;
      p.x += p.vx;
      p.y += p.vy;
      energy += Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(dx) * 0.02 + Math.abs(dy) * 0.02;
    }
    return energy / this.particles.length > 0.02;
  }

  private draw() {
    const { ctx, dpr } = this;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);
    const size = Math.max(2, Math.min(this.w, this.h) / 220);

    ctx.fillStyle = this.colors.brand;
    for (const p of this.particles) if (!p.accent) ctx.fillRect(p.x, p.y, size, size);
    ctx.fillStyle = this.colors.accent;
    for (const p of this.particles) if (p.accent) ctx.fillRect(p.x, p.y, size, size);
  }
}

function shuffle(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
