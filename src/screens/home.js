export function renderHome(container, state, navigate) {
  const html = `
    <div class="screen" id="screen-home">

      <!-- Logo Header -->
      <div class="home-logo-bar">
        <div class="home-logo">
          <div class="home-logo-icon app-logo-container">
            <img src="/logo.png" alt="LeafFilter" class="app-main-logo" />
          </div>
          <div class="home-logo-text">
            <span class="home-logo-brand">Lighting</span><span class="home-logo-sub">by LeafFilter</span>
          </div>
        </div>
        <div class="chip chip-active home-status-pill">
          <span class="chip-dot online"></span>
          Online
        </div>
      </div>

      <!-- Zone Selector (subtle top strip) -->
      <div class="zone-selector zone-selector--top">
        <button class="zone-selector-trigger zone-selector-trigger--subtle ${state.zoneDropdownOpen ? 'open' : ''}" id="zone-selector-btn">
          <div class="zone-selector-left">
            <span class="zone-selector-label">Zones</span>
            <span class="zone-selector-text">${(() => {
              const names = state.allZones.filter(z => z.active).map(z => z.name);
              if (names.length === 0) return 'No zones active';
              if (names.length <= 2) return names.join(', ');
              return `${names.slice(0, 2).join(', ')} +${names.length - 2}`;
            })()}</span>
          </div>
          <div class="zone-selector-right">
            <span class="zone-selector-count">${state.allZones.filter(z => z.active).length} / ${state.allZones.length}</span>
            <svg class="zone-selector-arrow ${state.zoneDropdownOpen ? 'open' : ''}" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </button>
        <div class="zone-selector-panel ${state.zoneDropdownOpen ? 'open' : ''}" id="zone-selector-panel">
          <div class="zone-selector-rows">
            ${state.allZones.map(z => `
              <button class="zone-selector-row ${z.active ? 'active' : ''}" data-zone-id="${z.id}">
                <div class="zone-selector-dot ${z.active ? 'active' : ''}"></div>
                <span class="zone-selector-name">${z.name}</span>
                <span class="zone-selector-leds">${z.leds} LEDs</span>
                <span class="zone-selector-state">${z.active ? 'On' : 'Off'}</span>
              </button>
            `).join('')}
          </div>
          <div class="zone-selector-footer">
            <button class="btn btn-secondary btn-sm" style="flex:1" id="home-select-all">Select All</button>
            <button class="btn btn-secondary btn-sm" style="flex:1" id="home-deselect-all">Deselect All</button>
          </div>
        </div>
      </div>

      <!-- Hero: Power + Scene -->
      <div class="home-hero">
        <div class="power-btn ${state.lightsOn ? 'active' : ''}" id="power-toggle">
          <div class="power-btn-ring"></div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M18.36 6.64a9 9 0 11-12.73 0"/>
            <line x1="12" y1="2" x2="12" y2="12"/>
          </svg>
        </div>
        <div class="home-scene-name" id="scene-display">${state.lightsOn ? state.activeScene : 'Lights Off'}</div>
        <div class="home-scene-label">${state.lightsOn ? 'Active Scene' : 'Tap to turn on'}</div>
        <div class="home-schedule-hint">Next: Sunset auto-on · 7:52 PM</div>
      </div>

      <!-- Brightness -->
      <div class="brightness-section">
        <div class="slider-container">
          <div class="slider-label">
            <span>☀️ Brightness</span>
            <span class="slider-value" id="brightness-val">${state.brightness}%</span>
          </div>
          <input type="range" min="0" max="100" value="${state.brightness}" id="brightness-slider" />
        </div>
      </div>

      <!-- Control Banner -->
      <button class="home-control-banner" data-action="control">
        <div class="home-control-banner-left">
          <div class="home-control-banner-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18.36 6.64a9 9 0 11-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
          </div>
          <div>
            <div class="home-control-banner-title">Control Lights</div>
            <div class="home-control-banner-sub">Color, brightness &amp; effects</div>
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <!-- Quick Actions -->
      <div class="quick-actions-row stagger">
        <button class="quick-action" data-action="favorites">
          <div class="quick-action-icon active">⭐</div>
          <span>Favorites</span>
        </button>
        <button class="quick-action" data-action="white">
          <div class="quick-action-icon">☀️</div>
          <span>White</span>
        </button>
        <button class="quick-action" data-action="holiday">
          <div class="quick-action-icon">🎄</div>
          <span>Holiday</span>
        </button>
        <button class="quick-action" data-action="timer">
          <div class="quick-action-icon">⏱️</div>
          <span>Timer</span>
        </button>
        <button class="quick-action" data-action="scenes">
          <div class="quick-action-icon">🎨</div>
          <span>Scenes</span>
        </button>
      </div>

      <!-- Now Playing -->
      <div class="section-label">Now Playing</div>
      <div class="now-playing">
        <div class="now-playing-header">
          <span class="now-playing-label">● Live</span>
          <div class="now-playing-colors">
            <div class="now-playing-dot" style="background:#FFA852"></div>
            <div class="now-playing-dot" style="background:#FFD4A3"></div>
            <div class="now-playing-dot" style="background:#FFF1E0"></div>
          </div>
        </div>
        <div class="now-playing-scene">${state.activeScene}</div>
        <div class="now-playing-meta">
          <span>Static</span>
          <span>·</span>
          <span>4 zones</span>
          <span>·</span>
          <span>${state.brightness}%</span>
        </div>
        <div class="now-playing-bar animated-gradient">
          <div style="background:#FFA852"></div>
          <div style="background:#FFD4A3"></div>
          <div style="background:#FFF1E0"></div>
          <div style="background:#FFD4A3"></div>
          <div style="background:#FFA852"></div>
        </div>
      </div>

      <!-- Recent Colors -->
      <div class="recent-colors-section">
        <div class="section-label">Recent Colors</div>
        <div class="recent-colors-row">
          ${['#FFA852', '#FF1744', '#4CAF50', '#2196F3', '#E91E63', '#FF6D00', '#AA00FF', '#FFD600', '#00BFA5', '#FFFFFF'].map(c =>
    `<div class="color-swatch" style="background:${c}" data-color="${c}"></div>`
  ).join('')}
        </div>
      </div>

      <!-- Status Footer -->
      <div style="text-align:center; padding: 8px 0 24px;">
        <span style="font-size: var(--fs-caption); color: var(--text-tertiary);">
          Online · Schedule Active · Next: 11:30 PM Off
        </span>
      </div>
    </div>
  `;
  container.innerHTML = html;

  // === Interactions ===
  // Power toggle
  container.querySelector('#power-toggle').addEventListener('click', () => {
    state.lightsOn = !state.lightsOn;
    renderHome(container, state, navigate);
    showToast(state.lightsOn ? 'Lights On' : 'Lights Off');
  });

  // Brightness slider
  const slider = container.querySelector('#brightness-slider');
  const bVal = container.querySelector('#brightness-val');
  slider.addEventListener('input', (e) => {
    state.brightness = parseInt(e.target.value);
    bVal.textContent = state.brightness + '%';
    slider.style.background = `linear-gradient(to right, var(--accent) ${state.brightness}%, var(--bg-quaternary) ${state.brightness}%)`;
  });
  slider.style.background = `linear-gradient(to right, var(--accent) ${state.brightness}%, var(--bg-quaternary) ${state.brightness}%)`;

  // Zone dropdown toggle
  container.querySelector('#zone-selector-btn')?.addEventListener('click', () => {
    state.zoneDropdownOpen = !state.zoneDropdownOpen;
    container.querySelector('#zone-selector-btn').classList.toggle('open', state.zoneDropdownOpen);
    container.querySelector('#zone-selector-panel').classList.toggle('open', state.zoneDropdownOpen);
    container.querySelector('.zone-selector-arrow').classList.toggle('open', state.zoneDropdownOpen);
  });

  // Zone rows inside dropdown
  container.querySelectorAll('.zone-selector-row').forEach(row => {
    row.addEventListener('click', (e) => {
      e.stopPropagation();
      const zid = row.dataset.zoneId;
      const zone = state.allZones.find(z => z.id === zid);
      if (zone) {
        zone.active = !zone.active;
        if (zone.active) { state.activeZones.push(zid); } else { state.activeZones = state.activeZones.filter(z => z !== zid); }
        renderHome(container, state, navigate);
      }
    });
  });

  // Select all / none inside dropdown
  container.querySelector('#home-select-all')?.addEventListener('click', (e) => {
    e.stopPropagation();
    state.allZones.forEach(z => z.active = true);
    state.activeZones = state.allZones.map(z => z.id);
    renderHome(container, state, navigate);
  });
  container.querySelector('#home-deselect-all')?.addEventListener('click', (e) => {
    e.stopPropagation();
    state.allZones.forEach(z => z.active = false);
    state.activeZones = [];
    renderHome(container, state, navigate);
  });

  // Control banner
  container.querySelector('[data-action="control"]')?.addEventListener('click', () => navigate('control'));

  // Quick action → screens
  container.querySelector('[data-action="scenes"]')?.addEventListener('click', () => navigate('scenes'));
  container.querySelector('[data-action="favorites"]')?.addEventListener('click', () => navigate('scenes'));
  container.querySelector('[data-action="holiday"]')?.addEventListener('click', () => navigate('scenes'));
  container.querySelector('[data-action="white"]')?.addEventListener('click', () => navigate('control'));
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.getElementById('app-frame').appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}
