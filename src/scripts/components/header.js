export function Header(element) {
  const targetClass = 'header__bg';
  const image = element.querySelector(`.${targetClass}`);
  const imageHasBg = image.style.backgroundImage.includes('url');

  if (imageHasBg) {
    const focus = {
      'x': image.dataset.focusX ? `${parseInt(parseFloat(image.dataset.focusX) * 100)}%` : 'center',
      'y': image.dataset.focusY ? `${parseInt(parseFloat(image.dataset.focusY) * 100)}%` : 'center'
    }
    image.style.backgroundPositionX = focus.x;
    image.style.backgroundPositionY = focus.y;
  }
}
