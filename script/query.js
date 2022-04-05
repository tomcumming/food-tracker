/**
 * @template Type
 * @param {{ new(): Type}} type
 * @param {Element} root
 * @param {string} selector
 * @returns {Type}
 */
export function findElement(type, root, selector) {
  const found = root.querySelector(selector);
  if (found instanceof type) return found;
  throw new Error(`Could not find expected child '${selector}'`);
}
