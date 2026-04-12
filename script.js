/* ======================================================
   BigLinker Transfer — Shared JS
   Modules: SocialProofToasts · ScrollReveal · FloatingCTA · UrgencyCounter
====================================================== */

/* ── 1. Social Proof Toast System ─────────────────── */
class SocialProofToasts {
  constructor() {
    this.visitorEl  = document.getElementById('sp-visitor');
    this.successEl  = document.getElementById('sp-success');
    this.countEl    = document.getElementById('sp-visitor-count');
    this.VISITOR_BASE = 20;

    /* 합격 알림 pool — 페이지 공통 */
    this.SUCCESS_POOL = [
      { name: '김○○ 학생', action: '연세대 편입 합격', time: '방금 전' },
      { name: '이○○ 학생', action: '고려대 편입 합격', time: '3분 전' },
      { name: '박○○ 학생', action: '성균관대 편입 합격', time: '8분 전' },
      { name: '최○○ 학생', action: '한양대 면접 합격', time: '15분 전' },
      { name: '정○○ 학생', action: '서강대 자기소개서 통과', time: '22분 전' },
      { name: '강○○ 학생', action: '중앙대 편입 최종합격', time: '31분 전' },
      { name: '윤○○ 학생', action: '경희대 편입 최종합격', time: '44분 전' },
      { name: '장○○ 학생', action: '이화여대 면접 통과', time: '1시간 전' },
    ];

    /* 페이지별 pool 순서를 랜덤하게 섞음 */
    this._shuffle(this.SUCCESS_POOL);
    this.poolIndex = 0;
  }

  _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  init() {
    if (!this.visitorEl || !this.successEl) return;

    /* 방문자 카운터 — 1.5초 후 노출 */
    setTimeout(() => this._showVisitor(), 1500);

    /* 첫 합격 알림 — 6초 후 */
    setTimeout(() => this._cycleSuccess(), 6000);
  }

  _showVisitor() {
    const count = this.VISITOR_BASE + Math.floor(Math.random() * 7) - 3;
    this.countEl.textContent = count;
    this.visitorEl.classList.remove('is-hidden');
    this.visitorEl.classList.add('is-visible');

    /* 25~40초마다 ±1 변동 */
    setInterval(() => {
      const cur   = parseInt(this.countEl.textContent, 10);
      const delta = Math.random() > 0.5 ? 1 : -1;
      this.countEl.textContent = Math.max(12, Math.min(36, cur + delta));
    }, 28000 + Math.random() * 12000);
  }

  _cycleSuccess() {
    const data = this.SUCCESS_POOL[this.poolIndex % this.SUCCESS_POOL.length];
    this.poolIndex++;

    this.successEl.querySelector('.sp-toast__name').textContent   = data.name;
    this.successEl.querySelector('.sp-toast__action').textContent = data.action;
    this.successEl.querySelector('.sp-toast__time').textContent   = data.time;
    this.successEl.querySelector('.sp-toast__avatar').textContent = data.name[0];

    /* 노출 */
    this.successEl.classList.remove('is-hidden');
    this.successEl.classList.add('is-visible');

    /* 6초 후 자동 사라짐 */
    setTimeout(() => {
      this.successEl.classList.remove('is-visible');
      this.successEl.classList.add('is-hidden');
    }, 6000);

    /* 다음 사이클: 18~34초 뒤 */
    const nextDelay = 18000 + Math.random() * 16000;
    setTimeout(() => this._cycleSuccess(), nextDelay + 6500);
  }
}


/* ── 2. Scroll Reveal ──────────────────────────────── */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  items.forEach((el) => observer.observe(el));
}


/* ── 3. Floating CTA — Hero 벗어날 때 노출 ────────── */
function initFloatingCTA() {
  const heroActions = document.querySelector(
    '.hero-actions, .admissions-cta-row, .hero .btn-primary'
  );
  const floatingCta = document.querySelector('.mobile-floating-cta');
  if (!heroActions || !floatingCta) return;

  const observer = new IntersectionObserver(([entry]) => {
    floatingCta.classList.toggle('is-floating-active', !entry.isIntersecting);
  }, { threshold: 0 });

  observer.observe(heroActions);
}


/* ── 4. Urgency Counter — URL 기반 잔여석 ─────────── */
function initUrgencyCounter() {
  const el = document.getElementById('urgency-spots');
  if (!el) return;

  const MAP = {
    'admissions':        { spots: 3, month: '5월' },
    'self-introduction': { spots: 5, month: '5월' },
    'interview':         { spots: 4, month: '5월' },
    'thesis':            { spots: 2, month: '5월' },
    'ec-coaching':       { spots: 6, month: '5월' },
    'design-coaching':   { spots: 4, month: '5월' },
  };

  const path = window.location.pathname;
  const key  = Object.keys(MAP).find((k) => path.includes(k));
  if (!key) return;

  const { spots, month } = MAP[key];
  el.textContent = `이번 달 잔여 ${spots}자리`;

  /* urgency-band 안의 month 텍스트 업데이트 */
  const bandText = el.closest('.urgency-band__text');
  if (bandText) {
    const suffix = bandText.querySelector('.urgency-month');
    if (suffix) suffix.textContent = `${month} 신청 마감 임박`;
  }
}


/* ── Init ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  new SocialProofToasts().init();
  initScrollReveal();
  initFloatingCTA();
  initUrgencyCounter();
});
