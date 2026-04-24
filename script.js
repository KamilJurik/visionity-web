/* =========================================================
   VISIONITY — script.js
   ========================================================= */

/* ── Navbar: přidá třídu .scrolled po odscrollování ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobilní burger menu ── */
const burger   = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Rok v patičce ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Načtení přednášejících ── */
const BIO_LIMIT = 300;

function truncateBio(bio, limit) {
  if (!bio || bio.length <= limit) return { short: bio, needsToggle: false };
  const cut = bio.lastIndexOf(' ', limit);
  const idx = cut > 0 ? cut : limit;
  return { short: bio.slice(0, idx).replace(/[,;:.\s]+$/, ''), needsToggle: true };
}

function loadSpeakers() {
  const data = SPEAKERS_DATA;
  const grid = document.getElementById('speakersGrid');
  const note = document.getElementById('networkingNote');

  grid.innerHTML = data.speakers.map(s => {
    const { short, needsToggle } = truncateBio(s.bio || '', BIO_LIMIT);
    return `
      <div class="speaker-card">
        <div class="speaker-photo-wrap ${s.photo ? '' : 'no-photo'}">
          ${s.photo
            ? `<img src="${s.photo}" alt="${s.name}" loading="lazy">`
            : `<span>${initials(s.name)}</span>`}
        </div>
        <div class="speaker-body">
          <p class="speaker-name">${s.name}</p>
          <p class="speaker-title">${s.title}</p>
          <div class="speaker-bio-wrap${needsToggle ? ' is-truncated' : ''}">
            <p class="speaker-bio speaker-bio-short">${needsToggle ? short + '…' : s.bio}</p>
            ${needsToggle ? `<p class="speaker-bio speaker-bio-full" hidden>${s.bio}</p>
            <button type="button" class="speaker-bio-toggle" aria-expanded="false">Zobrazit více</button>` : ''}
          </div>
          <div class="speaker-contacts">
            ${s.email ? `<a class="speaker-email" href="mailto:${s.email}">${s.email}</a>` : ''}
            ${s.linkedin
              ? `<a class="speaker-linkedin" href="${s.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn profil">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                 </a>`
              : `<span class="speaker-linkedin speaker-linkedin-empty" title="LinkedIn profil není k dispozici">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                 </span>`
            }
          </div>
        </div>
      </div>
    `;
  }).join('');

  /* Toggle show-more pro dlouhé biografie */
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.speaker-bio-toggle');
    if (!btn) return;
    const wrap = btn.closest('.speaker-bio-wrap');
    const shortP = wrap.querySelector('.speaker-bio-short');
    const fullP  = wrap.querySelector('.speaker-bio-full');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      fullP.setAttribute('hidden', '');
      shortP.removeAttribute('hidden');
      btn.textContent = 'Zobrazit více';
      btn.setAttribute('aria-expanded', 'false');
    } else {
      fullP.removeAttribute('hidden');
      shortP.setAttribute('hidden', '');
      btn.textContent = 'Zobrazit méně';
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  if (data.networking_note) {
    note.textContent = data.networking_note;
  }
}

/* ── Načtení programu ── */
function loadProgram() {
  const list = document.getElementById('programList');
  list.innerHTML = PROGRAM_DATA.map(item => `
    <div class="program-item type-${item.type || 'talk'}">
      <div class="program-meta">
        ${item.location ? `<span class="program-location">${item.location}</span>` : ''}
        <span class="program-time">${item.time}</span>
      </div>
      <div class="program-body">
        <p class="program-title">${item.title}</p>
        ${item.description ? `<p class="program-desc">${item.description}</p>` : ''}
        ${item.speaker ? `<p class="program-speaker"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:4px"><path d="M12 14c3.31 0 6-2.69 6-6S15.31 2 12 2 6 4.69 6 8s2.69 6 6 6zm0 2c-4 0-12 2-12 4v2h24v-2c0-2-8-4-12-4z"/></svg>${item.speaker}${item.speaker_title ? `<span class="program-speaker-title"> · ${item.speaker_title}</span>` : ''}</p>` : ''}
      </div>
    </div>
  `).join('');
}

/* ── Helper: iniciály pro placeholder fotky ── */
function initials(name) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

/* ── Vstupenky toggle ── */
const ticketsToggle = document.getElementById('ticketsToggle');
const ticketsForm   = document.getElementById('ticketsForm');
ticketsToggle.addEventListener('click', () => {
  const open = ticketsForm.hasAttribute('hidden');
  if (open) {
    ticketsForm.removeAttribute('hidden');
    ticketsToggle.textContent = '✕ Skrýt formulář';
    ticketsToggle.setAttribute('aria-expanded', 'true');
    ticketsForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    ticketsForm.setAttribute('hidden', '');
    ticketsToggle.innerHTML = '&#9654; Objednat vstupné';
    ticketsToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ── Init ── */
loadSpeakers();
loadProgram();
