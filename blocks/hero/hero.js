import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';
import { readBlockConfig } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  const cfg = readBlockConfig(block);
  block.classList.add(`columns-${cols.length}-cols`, 'first');
  //await decorateTopbar(block, cfg);
    console.log('in block decorator');
    console.log(block);
  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('hero-img-col');
        }
      }
    });
  });
}
