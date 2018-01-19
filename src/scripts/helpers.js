export function scrollTo(element, to, duration) {
  let start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

  let animateScroll = function(){
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if(currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
const easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

export function getOffsetTop(el) {
  let bodyRect = document.body.getBoundingClientRect(),
      elemRect = el.getBoundingClientRect();
  return elemRect.top - bodyRect.top;
}
