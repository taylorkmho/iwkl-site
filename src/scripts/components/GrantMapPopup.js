export const GrantMapPopup = {
  template: `
    <div class="grant-map-popup" :class="{ 'grant-map-popup--visible': isVisible }">
      <main v-if="isActive">
        <p class="grant-map-popup__grant-cycle copy--small" v-text="grantCycleTitle"></p>
        <h3 class="grant-map-popup__title" v-text="title"></h3>
        <ul class="grant-map-popup__country-list">
          <li
            class="grant-map-popup__country copy--small copy--nowrap"
            v-for="(c, i) in country"
            :key="i"
            v-text="c">
          </li>
        </ul>
        <button class="grant-map-popup__link button button--nofill-blue button--small">LEARN MORE</button>
      </main>
      <main v-else>
        <div class="grant-map-popup__status">
          <img src="/assets/icon-map-marker--current.png">
          <p v-html="statusMessage"></p>
        </div>
      </main>
    </div>
  `,
  props: [ 'country', 'isVisible', 'statusMessage', 'isActive', 'title', 'grantCycleTitle' ]
}
