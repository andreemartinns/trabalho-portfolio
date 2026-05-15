/**
 * =============================================================
 *  VIEW — Camada de Apresentação
 *  Responsável por renderizar dados no DOM.
 *  Não contém lógica de negócio nem manipula eventos.
 * =============================================================
 */

const View = (() => {

  // ---- Helpers internos ----

  /** Cria um elemento HTML com atributos opcionais */
  function el(tag, attrs = {}, ...children) {
    const elem = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') elem.className = v;
      else if (k === 'html') elem.innerHTML = v;
      else elem.setAttribute(k, v);
    });
    children.forEach(child => {
      if (typeof child === 'string') elem.insertAdjacentText('beforeend', child);
      else if (child) elem.appendChild(child);
    });
    return elem;
  }

  /** Encontra um elemento no DOM */
  function $(id) { return document.getElementById(id); }

  // ====================================================
  //  HERO
  // ====================================================
  function renderHero(profile) {
    const { name, role, subtitle, initials, stats } = profile;
    if ($('heroName'))     $('heroName').textContent     = name;
    if ($('heroRole'))     $('heroRole').textContent     = role;
    if ($('heroSubtitle')) $('heroSubtitle').textContent = subtitle;
    if ($('heroInitials')) $('heroInitials').textContent = initials;

    // Estatísticas (contador animado via Controller)
    if ($('statProjects')) $('statProjects').dataset.target = stats.projects;
    if ($('statYears'))    $('statYears').dataset.target    = stats.years;
    if ($('statClients'))  $('statClients').dataset.target  = stats.clients;
  }

  // ====================================================
  //  ABOUT
  // ====================================================
  function renderAbout(about) {
    // Texto principal
    if ($('aboutLead')) $('aboutLead').textContent = about.lead;
    if ($('aboutBody')) $('aboutBody').textContent = about.body;

    // Highlights list
    const highlightsEl = $('aboutHighlights');
    if (highlightsEl) {
      about.highlights.forEach(h => {
        const li = el('li', { className: 'highlight-item', role: 'listitem' }, h);
        highlightsEl.appendChild(li);
      });
    }

    // Info card
    const infoList = $('aboutInfoList');
    if (infoList) {
      about.info.forEach(({ icon, label, value }) => {
        const li = el('li', { className: 'info-item', role: 'listitem' });
        li.innerHTML = `
          <span class="info-icon" aria-hidden="true">${icon}</span>
          <span class="info-label">${label}</span>
          <span class="info-value">${value}</span>
        `;
        infoList.appendChild(li);
      });
    }
  }

  // ====================================================
  //  PROJECTS
  // ====================================================
  function renderProjects(projects) {
    const grid = $('projectsGrid');
    if (!grid) return;

    projects.forEach((proj, i) => {
      const card = el('article', {
        className: `project-card glass-card${proj.featured ? ' project-card--featured' : ''}`,
        role: 'listitem',
        'aria-label': `Projeto: ${proj.title}`,
        style: `--accent: ${proj.accent}; --delay: ${i * 0.08}s`,
        'data-animate': 'true',
      });

      card.innerHTML = `
        <div class="project-card__top">
          <span class="project-card__emoji" aria-hidden="true">${proj.emoji}</span>
          ${proj.featured ? '<span class="project-card__badge">Destaque</span>' : ''}
        </div>
        <h3 class="project-card__title">${proj.title}</h3>
        <p class="project-card__category">${proj.category}</p>
        <p class="project-card__desc">${proj.description}</p>
        <ul class="project-card__tags" role="list" aria-label="Tecnologias usadas">
          ${proj.tags.map(t => `<li class="tag" role="listitem">${t}</li>`).join('')}
        </ul>
        <div class="project-card__actions">
          <a href="${proj.live}" class="project-link" aria-label="Ver demo ao vivo de ${proj.title}" rel="noopener noreferrer" target="_blank">
            Demo <span aria-hidden="true">↗</span>
          </a>
          <a href="${proj.repo}" class="project-link project-link--ghost" aria-label="Ver código fonte de ${proj.title}" rel="noopener noreferrer" target="_blank">
            Código <span aria-hidden="true">⌥</span>
          </a>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // ====================================================
  //  SKILLS
  // ====================================================
  function renderSkills(skills) {
    const grid = $('skillsGrid');
    if (!grid) return;

    skills.forEach((cat, ci) => {
      const wrap = el('div', {
        className: 'skill-category glass-card',
        role: 'listitem',
        'aria-label': `Categoria: ${cat.category}`,
        style: `--delay: ${ci * 0.1}s`,
        'data-animate': 'true',
      });

      const header = `
        <div class="skill-category__header">
          <span class="skill-category__icon" aria-hidden="true">${cat.icon}</span>
          <h3 class="skill-category__title">${cat.category}</h3>
        </div>
      `;

      const bars = cat.items.map(skill => `
        <div class="skill-bar" aria-label="${skill.name}: ${skill.level}%">
          <div class="skill-bar__meta">
            <span class="skill-bar__name">${skill.name}</span>
            <span class="skill-bar__pct">${skill.level}%</span>
          </div>
          <div class="skill-bar__track" role="progressbar" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100" aria-label="${skill.name}">
            <div class="skill-bar__fill" data-level="${skill.level}" style="width: 0%"></div>
          </div>
        </div>
      `).join('');

      wrap.innerHTML = header + `<div class="skill-category__bars">${bars}</div>`;
      grid.appendChild(wrap);
    });
  }

  // ====================================================
  //  CONTACT
  // ====================================================
  function renderContact(contact) {
    if ($('contactIntro')) $('contactIntro').textContent = contact.intro;

    const channels = $('contactChannels');
    if (channels) {
      contact.channels.forEach(({ icon, label, value, href }) => {
        const li = el('li', { className: 'contact-channel', role: 'listitem' });
        li.innerHTML = `
          <span class="contact-channel__icon" aria-hidden="true">${icon}</span>
          <div class="contact-channel__text">
            <span class="contact-channel__label">${label}</span>
            <a href="${href}" class="contact-channel__value" aria-label="${label}: ${value}">${value}</a>
          </div>
        `;
        channels.appendChild(li);
      });
    }
  }

  // ====================================================
  //  FOOTER
  // ====================================================
  function renderFooter(footer) {
    if ($('footerCopy')) $('footerCopy').innerHTML = footer.copy;

    const socials = $('footerSocials');
    if (socials) {
      footer.socials.forEach(({ icon, label, href }) => {
        const li = el('li', { role: 'listitem' });
        li.innerHTML = `
          <a href="${href}" class="footer__social-link" aria-label="${label}" rel="noopener noreferrer" target="_blank">
            <span aria-hidden="true">${icon}</span>
          </a>
        `;
        socials.appendChild(li);
      });
    }
  }

  // ====================================================
  //  Feedback do formulário
  // ====================================================
  function showFormFeedback(message, type = 'success') {
    const el = $('formFeedback');
    if (!el) return;
    el.textContent = message;
    el.className = `form-feedback form-feedback--${type}`;
    el.removeAttribute('hidden');
    setTimeout(() => {
      el.textContent = '';
      el.className = 'form-feedback';
    }, 5000);
  }

  // ====================================================
  //  Header scroll state
  // ====================================================
  function setHeaderScrolled(scrolled) {
    document.querySelector('.header')?.classList.toggle('header--scrolled', scrolled);
  }

  // ---- API pública da View ----
  return {
    renderHero,
    renderAbout,
    renderProjects,
    renderSkills,
    renderContact,
    renderFooter,
    showFormFeedback,
    setHeaderScrolled,
  };

})();