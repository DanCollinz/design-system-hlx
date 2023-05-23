
import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';
import decorate from '../fragment/fragment.js';

export default async function decorateISITray(block) {
  const toggleIsiTray = () => {
    const expandCollapseContainer = document.querySelector(".cmp-isi-expand");
    const expanded = document.querySelector(".expanded-active");
    if (!expanded) {
      expandCollapseContainer.textContent = 'Collpase';
      expandCollapseContainer.classList.add('expanded-active');
      document.querySelector(".isi-tray").setAttribute('aria-expanded', true);
    }
    else {
      expandCollapseContainer.textContent = 'Expand';
      expandCollapseContainer.classList.remove('expanded-active');
      document.querySelector(".isi-tray").setAttribute('aria-expanded', false);
    }
    //update to add icon to change icon as well
  }

    const isiTray = document.querySelector(".isi-tray-wrapper");
    document.querySelector(".isi-tray").setAttribute('aria-expanded', false);
    isiTray.firstElementChild.firstElementChild.className = 'isi-header';
    isiTray.firstElementChild.firstElementChild.firstElementChild.className = 'cmp-isi-fixed-header-title';
    isiTray.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.className = 'cmp-isi-expand';
    const isiHeaderContent = document.querySelector(".isi-header").innerHTML;
    const isiWrapperHeaderContent = "<div class='isi-header-wrapper'>" + isiHeaderContent + "</div>"
    document.querySelector(".isi-header").innerHTML = isiWrapperHeaderContent;
    document.querySelector(".isi-header").nextElementSibling.className = 'isi-body-content';
    document.querySelector(".cmp-isi-expand").onclick = toggleIsiTray;


}
