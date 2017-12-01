export function Masthead(element) {
  const targetClass = 'masthead';
  const mastheadBg = element.querySelector(`.${targetClass}__bg`);
  const imageHasBg = mastheadBg.style.backgroundImage.includes('url');

  if (imageHasBg) {
    const focus = {
      'x': mastheadBg.dataset.focusX ? `${parseInt(parseFloat(mastheadBg.dataset.focusX) * 100)}%` : 'center',
      'y': mastheadBg.dataset.focusY ? `${parseInt(parseFloat(mastheadBg.dataset.focusY) * 100)}%` : 'center'
    }
    mastheadBg.style.backgroundPositionX = focus.x;
    mastheadBg.style.backgroundPositionY = focus.y;
  }
}
