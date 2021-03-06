import { findElement } from "../query.js";
import {
  createTemplateElement,
  replaceContentsWithTemplate,
} from "../template.js";

const templateId = "ft-nav-template";

const template = `
  <a class="_back button">Go Back</a>
  <h1>Food Tracker</h1>
`;

const backLinkAttr = "back-link";

class FtNav extends HTMLElement {
  constructor() {
    super();
    this.#render();
  }

  static get observedAttributes() {
    return [backLinkAttr];
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    const backUrl = this.getAttribute(backLinkAttr);

    replaceContentsWithTemplate(this, templateId);
    const backLink = findElement(HTMLAnchorElement, this, ":scope > a._back");
    const title = findElement(HTMLHeadingElement, this, ":scope > h1");

    if (backUrl) {
      backLink.href = backUrl;
      title.remove();
    } else {
      backLink.remove();
    }
  }
}

createTemplateElement(templateId, template);
customElements.define("ft-nav", FtNav);
