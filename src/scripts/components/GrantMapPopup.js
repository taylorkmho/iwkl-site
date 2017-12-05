export const GrantMapPopup = {
  template: `
    <div class="grant-map-popup" :class="{ 'grant-map-popup--visible': isVisible }">
      <header class="grant-map-popup__image" :style="{backgroundImage: 'url(' + assetUrl + ')' }"></header>
      <main class="grant-map-popup__copy">
        <h3 class="grant-map-popup__title copy--nowrap" v-text="title"></h3>
        <h5 class="grant-map-popup__subtitle copy--nowrap" v-text="country"></h5>
      </main>
    </div>
  `,
  props: [ 'country', 'isVisible', 'title', 'assetUrl' ]
}
