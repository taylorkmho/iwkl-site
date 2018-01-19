import { config } from '../config';
import { getOffsetTop, scrollTo } from '../helpers';
import Vue from 'vue';

export class HomeSplash {
  constructor() {
    const MEDIA_QUERY = config.mediaQuery;
    const isMobile = window.matchMedia(MEDIA_QUERY).matches;

    if (document.querySelector(`.home-section--top`) === null || isMobile) {
      return;
    }

    this.initVue();
  }

  initVue() {
    new Vue({
      el: `.home-section--top`,
      mounted: function() {
        this.$el.classList.add('home-section--scroll-ready');
        this.$el.querySelector('.home-section__arrow').onclick = function (event) {
          const y = getOffsetTop(document.querySelector('#home-section__anchor'));
          event.preventDefault();
          scrollTo(document.body, y, 500);
        }
      }
    });
  }
};
