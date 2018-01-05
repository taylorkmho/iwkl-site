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
      template: `<button v-on:click="toggleMenu" class="menu-button">MENU</button>`,
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
            this.setToMobile();
          } else {
            this.setToDesktop();
          }
        },
        setToDesktop: function() {
          this.$el.classList.remove(`${TARGET_CLASS}--mobile`);
        },
        setToMobile: function() {
          this.$el.classList.add(`${TARGET_CLASS}--mobile`);
        },
        toggleMenu: function(e) {
          if (this.isOpen) {
            this.$el.classList.remove(`${TARGET_CLASS}--active`);
          } else {
            this.$el.classList.add(`${TARGET_CLASS}--active`);
          }
          this.isOpen = !this.isOpen;
        }
      }
    })
  }
};
