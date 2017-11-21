export function HomeVideoPlayer(element) {
  const caption = element.querySelector('.video-caption');

  const handleClick = () => {
    element.classList.add('splash__video--playing');
  };

  element.addEventListener('click', handleClick);
}
