import { readBlockConfig } from '../../scripts/lib-franklin.js';

// const navBox = document.getElementsByClassName('nav-brand').innerHTML ;
// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
   sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
   section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {Element} navTop The nav sections above the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

async function decorateTopbar(block, cfg) {
  // fetch topbar content
  const topbarPath = cfg.topbar || '/topbar';
  const resp = await fetch(`${topbarPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();
    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'topbar');
    mainDiv.innerHTML = html;
    block.prepend(mainDiv);
  }
}

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';
  await decorateTopbar(block, cfg);
  // fetch nav content
  const navPath = cfg.nav || '/nav';
  const resp = await fetch(`${navPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();
    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.innerHTML = html;

    const classes = ['brand', 'sections', 'tools', 'navTop'];
    classes.forEach((e, j) => {
    const section = nav.children[j];
    if (section) section.classList.add(`nav-${e}`);
    });

      const brandContainer = nav.children[0];
      const navSections = [nav.children][1];
      const navTools = [nav.children][2];
      const navTop = [nav.children][3];
      //const navBox = document.getElementsByClassName('nav-brand').innerHTML ;

    if (navSections) {
      navSections.querySelectorAll(':scope > ul > li').forEach((navSection) => {
        if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
          navSection.addEventListener('click', () => {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          collapseAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
      });
    }

    if (navTop) {
      navTop.querySelectorAll(':scope > ul > li').forEach((navTop) => {
        if (navSection.querySelector('ul')) navTop.classList.add('nav-top');
        navTop.addEventListener('click', () => {
          const expanded = navTop.getAttribute('aria-expanded') === 'true';
          collapseAllNavSections(navTop);
          navTop.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
      });
    }

    // active item
    nav.querySelectorAll(':scope a').forEach((link) => {
      const url = link.href && new URL(link.href);
      if (url.pathname === window.location.pathname) {
      link.classList.add('active');
      }
    });

    // hamburger for mobile
    const hamburger = document.createElement('div');
    hamburger.classList.add('nav-hamburger');
    hamburger.innerHTML = '<div class="nav-hamburger-icon"></div>';
    hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    document.body.style.overflowY = expanded ? '' : 'hidden';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
    nav.prepend(hamburger);
    nav.setAttribute('aria-expanded', 'false');
    // decorateIcons(nav);
    const navBox = document.getElementsByClassName('nav-brand');
    const navA = nav.children[1];
    navA.innerHTML ='<a href="/" aria-disabled="false" target="_self"><img src="https://www.livtencity.com/content/experience-fragments/takeda/livtencity-hcp-branded/en_us/header/master/_jcr_content/root/navigationcontainer/primaryLogo/image.coreimg.svg/1670601417478/livtencity-logo-2x.svg" alt="Livtencity"></a>';
    block.prepend(nav);
  }
}
