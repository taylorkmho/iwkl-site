import axios from 'axios';

export const GrantModalTrigger = {
  template: `
    <div>
      <div class="grant-list-item__trigger" v-on:click="handleClick"></div>
      <div
        class="modal"
        :class="{ 'modal--visible' : modal.hasVisibleClass, 'modal--loading' : !dataLoaded }"
        v-show="modal.isRendered"
        v-on:click.self="closeModal">
        <div class="modal__container container container--modal">
          <aside class="modal__image" :style="style"></aside>
          <main class="modal__copy">
            <p class="modal__grant-title">{{grantCycleTitle}}</p>
            <h2>{{title}}</h2>
            <ul class="modal__country pill-list">
              <li
                class="pill-list__item pill-list__item--red copy--nowrap"
                v-for="(c, i) in country"
                :key="i"
                v-text="c">
              </li>
            </ul>
            <div v-html="description"></div>
          </main>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      modal: {
        isRendered: false,
        hasVisibleClass: false,
      },
      dataLoaded: false,
      assetUrl: '',
      country: [],
      description: '',
      title: '',
      grantCycleTitle: '',
      style: {}
    }
  },
  methods: {
    handleClick: function() {
      this.showModal();

      if (this.dataLoaded) return;

      axios.get(`${this.url}?format=json`)
        .then((response) => {
          console.log('🎾 fetch!');
          const item = response.data.item;
          const collection = response.data.collection;
          this.country = item.customContent.country.split(', ');
          this.title = item.title;
          this.description = item.body;
          this.assetUrl = item.assetUrl;
          this.grantCycleTitle = collection.title;
          this.style = {
            backgroundImage: 'url(' + item.assetUrl + ')'
          }
          this.dataLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    showModal: function() {
      this.modal.isRendered = true;
      setTimeout(() => {
        this.modal.hasVisibleClass = true;
      }, 10);
    },
    closeModal: function() {
      this.modal.hasVisibleClass = false;
      setTimeout(() => {
        this.modal.isRendered = false;
      }, 150);
    }
  },
  props: ['url'],
}
