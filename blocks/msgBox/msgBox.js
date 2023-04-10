export default async function decorate(block) {

  const msgMeta = getMetadata('msgBox');
  const msgPath = msgMeta ? new URL(msgMeta).pathname : '/msgBox';
  const resp = await fetch(`${msgPath}.plain.html`);
  }
}
