import axios from 'axios';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import { config } from '../config';
import { GrantMapPopup } from './GrantMapPopup';

export class GrantMap {
  constructor() {
    this.targetId = '#grant-map';
    this.grantCycles = config.grantCycles;
    const MEDIA_QUERY = config.mediaQuery;
    const API_KEY = config.googleMapsKey;

    if (document.querySelector(this.targetId) === null) {
      return;
    }

    Vue.use(VueGoogleMaps, {
      load: {
        key: API_KEY,
        installComponents: false
      }
    })
    Vue.component('google-map', VueGoogleMaps.Map);
    Vue.component('google-marker', VueGoogleMaps.Marker);
    Vue.component('grant-map-popup', GrantMapPopup);

    this.initVue();
  }

  initVue() {
    this.mapApp = new Vue({
      el: this.targetId,
      data: {
        apiLoaded: false,
        center: {
          lat: 33.062464,
          lng: 21.282761
        },
        markers: [],
        options: {
          backgroundColor: '#acbcc9',
          draggable: true,
          fullscreenControl: false,
          minZoom: 2,
          scrollwheel: false,
          streetViewControl: false,
          styles: config.mapStyle
        },
        popup: {
          country: '',
          title: '',
          grantCycleTitle: '',
          isVisible: false
        }
      },
      beforeMount: () => {
        this.getMarkers();
      },
      mounted: function() {
        VueGoogleMaps.loaded.then(() => this.apiLoaded = true);
      },
      methods: {
        handlePopupClose: function() {
          if (!this.popup.isVisible) return;
          this.popup.isVisible = false;

          setTimeout(function() {
            this.popup = {
              country: '',
              title: '',
              grantCycleTitle: '',
              isVisible: false
            }
          }, 250);
        },
        handleMarkerClick: function(marker, idx) {
          this.$refs.gMap.panTo({
            lat: marker.position.lat,
            lng: marker.position.lng
          });

          this.popup = {
            country: marker.country,
            title: marker.title,
            grantCycleTitle: marker.grantCycleTitle,
            isVisible: true,
          }
        }
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
            const grantCycleTitle = response.data.collection.title;

            return items.map((item) => {
              return {
                icon: isRecent ? `/assets/icon-map-marker--current.png` : `/assets/icon-map-marker.png`,
                position: {
                  lng: item.location.mapLng,
                  lat: item.location.mapLat
                },
                country: item.customContent.country,
                title: item.title,
                grantCycleTitle: grantCycleTitle
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
