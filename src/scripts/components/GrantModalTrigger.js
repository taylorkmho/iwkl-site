import axios from 'axios';
import { ProgressBar } from './ProgressBar';

export const GrantModalTrigger = {
  template: `
    <div>
      <div
        class="grant-list-item__trigger"
        v-on:click="handleClick"
        v-on:mouseover="prefetchImage">
      </div>
      <div
        class="modal"
        :class="{ 'modal--visible' : modal.hasVisibleClass, 'modal--loading' : !dataLoaded }"
        v-show="modal.isRendered"
        v-on:click.self="closeModal">
        <progress-bar ref="loader"></progress-bar>
        <div class="modal__container container container--modal">
          <aside class="modal__image" :style="style"></aside>
          <main class="modal__copy">
            <p class="modal__grant-title">{{grantCycleTitle}}</p>
            <h2>{{title}}</h2>
            <ul class="modal__country pill-list">
              <li
                class="pill-list__item pill-list__item--blue"
                v-for="(c, i) in country"
                :key="i"
                v-text="c">
              </li>
            </ul>
            <div class="modal__body" v-html="description"></div>
          </main>
        </div>
        <button class="modal__close" v-on:click="closeModal"><img src="/assets/icon--close.svg"></button>
      </div>
    </div>
  `,
  components: {
    'progress-bar': ProgressBar
  },
  data: function() {
    return {
      modal: {
        isRendered: false,
        hasVisibleClass: false,
      },
      dataLoaded: false,
      country: [],
      description: '',
      title: '',
      grantCycleTitle: '',
      style: {},
      imageIsLoaded: false,
    }
  },
  methods: {
    handleClick: function() {
      this.showModal();
      if (this.dataLoaded) return;
      const rand = Math.random() * (.6 - .2) + .2;
      this.$refs.loader.increaseBy(rand);

      setTimeout(()=>{
        const rand = Math.random() * (.6 - .2) + .2;
        this.$refs.loader.increaseBy(rand);
      }, 250);

      axios.get(`${this.url}?format=json`)
        .then((response) => {
          const item = response.data.item;
          const collection = response.data.collection;

          setTimeout(() => {
            this.country = item.customContent.country.split(', ');
            this.title = item.title;
            this.description = item.body;
            this.assetUrl = item.assetUrl;
            this.grantCycleTitle = collection.title;
            this.style = {
              backgroundImage: 'url(' + item.assetUrl + ')',
              backgroundPositionX: `${parseInt(parseFloat(item.mediaFocalPoint.x) * 100)}%`,
              backgroundPositionY: `${parseInt(parseFloat(item.mediaFocalPoint.y) * 100)}%`
            };
            this.dataLoaded = true;
            this.$refs.loader.complete();
          }, 250);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    prefetchImage: function() {
      if (this.imageIsLoaded) return;

      const img = new Image();
      img.src = this.assetUrl;
      this.imageIsLoaded = true;
    },
    showModal: function() {
      document.body.style.overflow = 'hidden';

      this.modal.isRendered = true;
      setTimeout(() => {
        this.modal.hasVisibleClass = true;
      }, 10);
    },
    closeModal: function() {
      document.body.style.overflow = '';

      this.modal.hasVisibleClass = false;
      setTimeout(() => {
        this.modal.isRendered = false;
      }, 150);
    }
  },
  props: ['assetUrl', 'url'],
}
