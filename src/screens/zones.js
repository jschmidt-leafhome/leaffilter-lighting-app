export function renderZones(container, state) {
  function render() {
    const html = `
      <div class="screen" id="screen-zones">
        <div class="screen-header">
          <h1 class="screen-title">Zones</h1>
          <button class="btn-icon" id="add-zone-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        <!-- Zone stats summary -->
        <div class="zone-stats-bar">
          <div class="zone-stats-item">
            <span class="zone-stats-val">${state.allZones.filter(z => z.active).length}</span>
            <span class="zone-stats-label">Active</span>
          </div>
          <div class="zone-stats-divider"></div>
          <div class="zone-stats-item">
            <span class="zone-stats-val">${state.allZones.reduce((s, z) => s + (z.active ? z.leds : 0), 0)}</span>
            <span class="zone-stats-label">LEDs On</span>
          </div>
          <div class="zone-stats-divider"></div>
          <div class="zone-stats-item">
            <span class="zone-stats-val">${state.allZones.length}</span>
            <span class="zone-stats-label">Total Zones</span>
          </div>
        </div>

        <!-- All/None toggle -->
        <div style="display: flex; gap: var(--space-sm); margin-bottom: var(--space-md);">
          <button class="btn btn-secondary btn-sm" id="select-all-zones" style="flex:1;">Select All</button>
          <button class="btn btn-secondary btn-sm" id="deselect-all-zones" style="flex:1;">Deselect All</button>
        </div>

        <!-- Zone List -->
        <div class="section-label">All Zones</div>
        <div class="zones-list stagger">
          ${state.allZones.map(z => `
            <button class="zone-btn ${z.active ? 'active' : ''}" data-zone-id="${z.id}">
              <div class="zone-btn-indicator"></div>
              <div class="zone-btn-info">
                <div class="zone-btn-name">${z.name}</div>
                <div class="zone-btn-detail">${z.leds} LEDs · ${z.active ? 'Active' : 'Off'}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          `).join('')}
        </div>

        <!-- Controller Info -->
        <div class="section-label" style="margin-top: var(--space-lg);">Controller</div>
        <div class="card" style="margin-bottom: var(--space-md);">
          <div style="display: flex; align-items: center; gap: var(--space-md);">
            <div style="width:44px; height:44px; border-radius: var(--radius-md); background: var(--accent-subtle); display:flex; align-items:center; justify-content:center; font-size:22px;">📡</div>
            <div style="flex:1;">
              <div style="font-weight: var(--fw-semibold);">Main Controller</div>
              <div style="font-size: var(--fs-small); color: var(--text-secondary);">Firmware v2.4.1 · 478 LEDs</div>
            </div>
            <div class="chip chip-active">
              <span class="chip-dot online"></span>
              Online
            </div>
          </div>
        </div>

        <div style="height: 24px;"></div>
      </div>
    `;
    container.innerHTML = html;

    // Zone toggle
    container.querySelectorAll('.zone-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const zid = btn.dataset.zoneId;
        const zone = state.allZones.find(z => z.id === zid);
        if (zone) {
          zone.active = !zone.active;
          if (zone.active) { state.activeZones.push(zid); } else { state.activeZones = state.activeZones.filter(z => z !== zid); }
          render();
        }
      });
    });

    // Select all / none
    container.querySelector('#select-all-zones')?.addEventListener('click', () => {
      state.allZones.forEach(z => z.active = true);
      state.activeZones = state.allZones.map(z => z.id);
      render();
    });
    container.querySelector('#deselect-all-zones')?.addEventListener('click', () => {
      state.allZones.forEach(z => z.active = false);
      state.activeZones = [];
      render();
    });
  }

  render();
}
