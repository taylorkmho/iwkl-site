import axios from 'axios';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps'
import { config } from '../config.js';

export class GrantMap {
  constructor() {
    this.targetClass = 'grant-map';
    this.grantCycles = config.grantCycles;
    const MEDIA_QUERY = config.mediaQuery;
    const API_KEY = 'AIzaSyARpLGAWtpKWkMJCPZy42oivTtJowJfzMg';

    if (document.querySelector(`.${this.targetClass}`) === null) {
      return;
    }

    Vue.use(VueGoogleMaps, {
      load: {
        key: API_KEY,
        libraries: 'places',
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
          lat: 33.1929123,
          lng: -66.627005
        },
        markers: []
      }
    });

    this.fetchGrantCycles();
  }
  fetchGrantCycles() {
    if (this.grantCycles.length === 0) { return };

    this.grantCycles.forEach( (grantCycle) => {
      axios.get(`https://taylor-ho-28z3.squarespace.com/${grantCycle}?format=json`)
        .then( (response) => {
          const data = response.data;

          if (data.empty) { return };

          data.items.forEach( (item) => {
            const squarespaceDefaultLocation = {
              mapLat: 40.721,
              mapLng: -74.001
            }
            const newMarker = {
              position: {
                lng: item.location.mapLng,
                lat: item.location.mapLat
              }
            };
            const isDefaultLocation = item.location.mapLat.toFixed(3) == squarespaceDefaultLocation.mapLat && item.location.mapLng.toFixed(3) == squarespaceDefaultLocation.mapLng;

            if (isDefaultLocation) {
              return;
            }

            Vue.set(this.mapApp.markers, this.mapApp.markers.length, newMarker);
          })

        })
        .catch( function(error) {
          console.log(error);
        });
    })
  }
};
