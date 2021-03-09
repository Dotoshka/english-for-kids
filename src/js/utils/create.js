export default function create(elem, classList, parent) {
  let element = '';
  if (elem) {
    element = document.createElement(elem);
  } else {
    element = document.createElement('div');
  }
  if (classList) element.classList.add(...classList.split(' '));
  if (parent) parent.append(element);
  return element;
}
