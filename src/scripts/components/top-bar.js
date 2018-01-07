import Vue from 'vue';
import { config } from '../config.js';

export class TopBarMenu {
  constructor() {
    const TARGET_CLASS = 'top-bar';
    const MEDIA_QUERY = config.mediaQuery;

    if (document.querySelector(`.${TARGET_CLASS}`) === null) {
      return;
    }

    const MenuButton = {
      template: `
        <button v-on:click="toggleMenu" :class="{ 'menu-button': true, 'menu-button--is-open': isOpen }">
          <svg class="menu-button__svg" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="evenodd">
              <rect y="7" width="30" height="2" class="menu-button__bar menu-button__bar--top"/>
              <rect y="14" width="30" height="2" class="menu-button__bar menu-button__bar--middle"/>
              <rect y="21" width="30" height="2" class="menu-button__bar menu-button__bar--bottom"/>
            </g>
          </svg>
        </button>
      `,
      props: ['isOpen'],
      methods: {
        toggleMenu: function() {
          this.$emit('toggle-menu');
        }
      }
    };

    const Menu = new Vue({
      el: `#${TARGET_CLASS}`,
      components: {
        'menu-button': MenuButton
      },
      data: {
        isOpen: false,
        isMobile: window.matchMedia(MEDIA_QUERY).matches
      },
      mounted: function() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
      },
      methods: {
        handleResize: function() {
          this.isMobile = window.matchMedia(MEDIA_QUERY).matches;
          if (this.isMobile) {
            this.$el.classList.add(`${TARGET_CLASS}--mobile`);
          } else {
            this.$el.classList.remove(`${TARGET_CLASS}--mobile`);
          }
        },
        toggleMenu: function(e) {
          this.$el.classList.toggle(`${TARGET_CLASS}--active`);
          this.isOpen = !this.isOpen;
        }
      }
    })
  }
};
