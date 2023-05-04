import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';
/**
 * loads and decorates the isi-tray
 * @param {Element} block The isi-tray block element
 */
async function decorateTray(block, cfg) {
  // fetch topbar content
  const trayPath = cfg.isitray || '/isitray';
  const resp = await fetch(`${trayPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();
    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'isitray');
    mainDiv.innerHTML = html;
    block.append(mainDiv);
  }
}
/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';
  await decorateTray(block, cfg);
  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();
    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;
    const sideButton = document.createElement('div');
    sideButton.classList.add('sideButton');
    sideButton.innerHTML = 'SEE THE SAFETY PROFILE';
    block.append(sideButton);

    decorateIcons(footer);
    block.append(footer);
  }
}
