import Vue from 'vue';
import { config } from '../config';
import { GrantModalTrigger } from './GrantModalTrigger';

export class GrantModal {
  constructor() {
    const MEDIA_QUERY = config.mediaQuery;

    if (document.querySelector(`.grant-list-item`) === null) {
      return;
    }

    Vue.component('grant-modal-trigger', GrantModalTrigger);
    this.initVue();
  }

  initVue() {
    const listArray = document.querySelectorAll(`.grant-list-item`);
    listArray.forEach((item, idx) => {
      new Vue({
        el: item,
        data: {},
        mounted: function() {
          this.$el.classList.add('grant-list-item--interactable');
        },
        methods: {
          handlePopupClose: function() {
          }
        }
      });
    })
  }
};
