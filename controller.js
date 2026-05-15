/**
 * =============================================================
 *  CONTROLLER — Camada de Controle
 *  Orquestra Model e View, gerencia eventos, animações e
 *  interações do usuário. Nenhum dado bruto nem HTML aqui.
 * =============================================================
 */

const Controller = (() => {

  // ====================================================
  //  INIT — ponto de entrada principal
  // ====================================================
  function init() {
    // 1. Renderizar todas as seções com dados do Model
    View.renderHero(Model.getProfile());
    View.renderAbout(Model.getProfile().about);
    View.renderProjects(Model.getProjects());
    View.renderSkills(Model.getSkills());
    View.renderContact(Model.getContact());
    View.renderFooter(Model.getFooter());

    // 2. Registrar todos os eventos
    _bindMenuToggle();
    _bindSmoothScroll();
    _bindScrollEffects();
    _bindFormSubmit();
    _bindKeyboardNav();

    // 3. Iniciar animações
    _initIntersectionObserver();
    _animateCounters();
  }

  // ====================================================
  //  MENU MOBILE
  // ====================================================
  function _bindMenuToggle() {
    const toggle = document.getElementById('menuToggle');
    const menu   = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      const next   = !isOpen;

      toggle.setAttribute('aria-expanded', String(next));
      toggle.classList.toggle('nav__toggle--open', next);

      if (next) {
        menu.removeAttribute('hidden');
        menu.classList.add('mobile-menu--open');
        // foco no primeiro link para acessibilidade
        menu.querySelector('a')?.focus();
      } else {
        menu.classList.remove('mobile-menu--open');
        menu.addEventListener('transitionend', () => {
          menu.setAttribute('hidden', '');
        }, { once: true });
      }
    });

    // Fechar ao clicar em qualquer link do menu mobile
    menu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('nav__toggle--open');
        menu.classList.remove('mobile-menu--open');
        menu.addEventListener('transitionend', () => {
          menu.setAttribute('hidden', '');
        }, { once: true });
      });
    });

    // Fechar ao pressionar Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.click();
        toggle.focus();
      }
    });
  }

  // ====================================================
  //  SCROLL SUAVE
  //  Intercepta cliques em âncoras internas e rola
  //  suavemente até a seção alvo.
  // ====================================================
  function _bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const headerH = document.querySelector('.header')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;

        window.scrollTo({ top, behavior: 'smooth' });

        // Atualizar aria-current para link ativo
        document.querySelectorAll('.nav__link').forEach(l => l.removeAttribute('aria-current'));
        document.querySelectorAll(`a[href="${href}"]`).forEach(l => l.setAttribute('aria-current', 'page'));
      });
    });
  }

  // ====================================================
  //  EFEITOS AO ROLAR
  // ====================================================
  function _bindScrollEffects() {
    const onScroll = () => {
      View.setHeaderScrolled(window.scrollY > 60);
      _highlightActiveNav();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // estado inicial
  }

  /** Destaca o link de navegação correspondente à seção visível */
  function _highlightActiveNav() {
    const sections   = document.querySelectorAll('section[id]');
    const navLinks   = document.querySelectorAll('.nav__link');
    const headerH    = document.querySelector('.header')?.offsetHeight || 0;
    const scrollMid  = window.scrollY + headerH + 80;

    let current = '';
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollMid) current = sec.id;
    });

    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('nav__link--active', active);
      link.setAttribute('aria-current', active ? 'page' : 'false');
    });
  }

  // ====================================================
  //  INTERSECTION OBSERVER — animações ao entrar na viewport
  // ====================================================
  function _initIntersectionObserver() {
    const options = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Animar barras de skill quando a seção entrar
          entry.target.querySelectorAll('.skill-bar__fill').forEach(bar => {
            const level = bar.dataset.level;
            // Pequeno delay para efeito visual
            requestAnimationFrame(() => {
              bar.style.width = level + '%';
            });
          });

          // Desregistrar após primeira animação
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observar cards de projetos, categorias de skills, seções inteiras
    document.querySelectorAll('[data-animate], .section-header, .about__text, .about__card, .contact__info, .contact__form').forEach(el => {
      el.classList.add('animate-ready');
      observer.observe(el);
    });
  }

  // ====================================================
  //  CONTADORES ANIMADOS (estatísticas hero)
  // ====================================================
  function _animateCounters() {
    const counters = document.querySelectorAll('[data-target]');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const dur    = 1400; // ms
        const step   = 16;  // ~60fps
        const inc    = target / (dur / step);
        let current  = 0;

        const tick = () => {
          current = Math.min(current + inc, target);
          el.textContent = Math.floor(current) + (current >= target ? '+' : '');
          if (current < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  // ====================================================
  //  FORMULÁRIO DE CONTATO
  // ====================================================
  function _bindFormSubmit() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name    = form.elements['name'].value.trim();
      const email   = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();

      // Validação simples
      if (!name || !email || !message) {
        View.showFormFeedback('Por favor, preencha todos os campos.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        View.showFormFeedback('E-mail inválido. Verifique e tente novamente.', 'error');
        return;
      }

      // Simula envio
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled  = true;
      btn.textContent = 'Enviando...';

      setTimeout(() => {
        View.showFormFeedback('Mensagem enviada! Entrarei em contato em breve. 🚀', 'success');
        form.reset();
        btn.disabled  = false;
        btn.innerHTML = 'Enviar mensagem <span aria-hidden="true">→</span>';
      }, 1200);
    });
  }

  // ====================================================
  //  NAVEGAÇÃO VIA TECLADO (acessibilidade)
  // ====================================================
  function _bindKeyboardNav() {
    // Trap focus no menu mobile quando aberto
    const menu = document.getElementById('mobileMenu');
    if (!menu) return;

    menu.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = [...menu.querySelectorAll('a, button')];
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // ---- API pública ----
  return { init };

})();

// ====================================================
//  Bootstrap — inicia a aplicação após o DOM estar pronto
// ====================================================
document.addEventListener('DOMContentLoaded', Controller.init);