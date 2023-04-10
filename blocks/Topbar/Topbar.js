/*async function decorateTopbar(block, cfg) {
  // fetch topbar content
  const topbarPath = cfg.topbar || '/topbar';
  const resp = await fetch(`${topbarPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();
    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'topbar');
    mainDiv.innerHTML = html;
    block.append(mainDiv);
  }
}*/
