import axios from 'axios';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import { config } from '../config';

export class GrantMap {
  constructor() {
    this.targetClass = 'grant-map';
    this.grantCycles = config.grantCycles;
    const MEDIA_QUERY = config.mediaQuery;
    const API_KEY = config.googleMapsKey;

    if (document.querySelector(`.${this.targetClass}`) === null) {
      return;
    }

    Vue.use(VueGoogleMaps, {
      load: {
        key: API_KEY,
        installComponents: false
      }
    })

    this.initVue();
  }
  initVue() {
    Vue.component('google-map', VueGoogleMaps.Map);
    Vue.component('google-marker', VueGoogleMaps.Marker);
    this.mapApp = new Vue({
      el: `#${this.targetClass}`,
      data: {
        center: {
          lat: 33.062464,
          lng: 21.282761
        },
        markers: []
      },
      mounted: () => {
        this.getMarkers();
      }
    });
  }
  getMarkers() {
    if (this.grantCycles.length === 0) { return };

    axios.all(this.grantCycles.map(urlId => axios.get(`https://taylor-ho-28z3.squarespace.com/${urlId}?format=json`)))
      .then((responses) => {
        const markerArrs = responses
          .filter(response => !response.data.empty)
          .sort((a, b) => {
            const current = a.data.collection.urlId;
            const next = b.data.collection.urlId;

            return current.localeCompare(next);
          })
          .map((response, i, arr) => {
            const items = response.data.items;
            const isRecent = (i === arr.length - 1);

            return items.map((item) => {
              return {
                position: {
                  lng: item.location.mapLng,
                  lat: item.location.mapLat
                },
                icon: isRecent ? `/assets/icon-map-marker--current.png` : `/assets/icon-map-marker.png`
              }
            })
          });

        const markers = [].concat(...markerArrs);

        Vue.set(this.mapApp, 'markers', markers);
      })
    .catch((error) => {
      this.handleError(error);
    });
  }
  handleError(error) {
    console.log(error);
  }
};
