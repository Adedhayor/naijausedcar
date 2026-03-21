// naijausedcar.com — main.js

// ── Cursor glow (desktop only) ─────────────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div')
  glow.className = 'cursor-glow'
  document.body.appendChild(glow)

  let mx = 0, my = 0, cx = -999, cy = -999

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX
    my = e.clientY
  })

  ;(function tick() {
    cx += (mx - cx) * 0.07
    cy += (my - cy) * 0.07
    glow.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`
    requestAnimationFrame(tick)
  })()
}

// ── Scroll-reveal for below-fold sections ──────────────────
const revealEls = document.querySelectorAll('[data-reveal]')

if (revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
  )
  revealEls.forEach((el) => io.observe(el))
}
