/** Create a template element to use from custom elements
 * @param {string} id
 * @param {string} src
 */
export function createTemplateElement(id, src) {
  const el = document.createElement("template");
  el.innerHTML = src;
  el.id = id;
  document.body.appendChild(el);
}

/**
 * @param {string} id
 */
export function getTemplateContents(id) {
  const el = document.getElementById(id);
  if (el instanceof HTMLTemplateElement) {
    return el.content.cloneNode(true);
  } else throw new Error(`Can't find template element with id '${id}'`);
}

/**
 * @param {HTMLElement} element
 * @param {string} templateId
 */
export function replaceContentsWithTemplate(element, templateId) {
  while (element.firstChild) element.removeChild(element.firstChild);

  const contents = getTemplateContents(templateId);
  element.appendChild(contents);
}
