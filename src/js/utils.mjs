// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(template);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}





export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) return; // safety check
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// Async function to fetch HTML template from a path
export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load template: ${path}`);
  const template = await res.text();
  return template;
}

// Load header and footer into DOM
export async function loadHeaderFooter() {
  const headerElement = document.querySelector("#header");
  const footerElement = document.querySelector("#footer");

  if (!headerElement || !footerElement) return; // safety check

  // Load templates using loadTemplate
  const [headerTemplate, footerTemplate] = await Promise.all([
    loadTemplate("/partials/header.html"),
    loadTemplate("/partials/footer.html")
  ]);

  // Render templates into their DOM placeholders
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}


