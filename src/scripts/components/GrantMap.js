import axios from 'axios';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import { config } from '../config';
import { GrantMapPopup } from './GrantMapPopup';
import { ProgressBar } from './ProgressBar';

export class GrantMap {
  constructor() {
    if (document.querySelector('#grant-map') === null) {
      return;
    }

    Vue.use(VueGoogleMaps, {
      load: {
        key: config.googleMapsKey,
        installComponents: false
      }
    })
    Vue.component('google-map', VueGoogleMaps.Map);
    Vue.component('google-marker', VueGoogleMaps.Marker);
    Vue.component('grant-map-popup', GrantMapPopup);
    Vue.component('progress-bar', ProgressBar);

    this.initVue();
  }

  initVue() {
    new Vue({
      el: '#grant-map',
      data: {
        apiLoaded: false,
        center: {
          lat: 33.062464,
          lng: 21.282761
        },
        grantCycles: config.grantCycles,
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
          country: [],
          grantCycleTitle: '',
          isActive: false,
          isVisible: false,
          statusMessage: '',
          title: '',
        }
      },
      mounted: function() {
        VueGoogleMaps.loaded.then(() => {
          this.apiLoaded = true;
          this.getMarkers();
        });

        this.$refs.loader.increaseBy(.275);
      },
      methods: {
        getMarkers: function() {
          if (this.grantCycles.length === 0) { return };

          axios.all(this.grantCycles.map(urlId => axios.get(`/${urlId}?format=json`)))
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
                      animation: google.maps.Animation.BOUNCE,
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
              this.markers = [].concat(...markerArrs);
              this.$refs.loader.increaseBy(.55);
            })
            .catch((error) => {
              this.handleError(error);
            });
        },
        handleError: function(error) {
          console.log(error);
        },
        handleLoaded: function() {
          setTimeout(() => {
            this.$refs.loader.complete();
            this.popup = {
              isVisible: true,
              statusMessage: 'Choose a marker on the map!',
            }
          }, 1000)
        },
        handleMarkerClick: function(marker, idx) {
          if (marker.title === this.popup.title) return;

          this.popup.isVisible = false;

          setTimeout(() => {
            this.popup = {
              country: marker.country.split(', '),
              title: marker.title,
              grantCycleTitle: marker.grantCycleTitle,
              isVisible: true,
              isActive: true,
            }
          }, 150);

          this.$refs.gMap.panTo({
            lat: marker.position.lat,
            lng: marker.position.lng
          });
        },
        handlePopupClose: function() {
          if (!this.popup.isVisible) return;
          this.popup.isVisible = false;

          setTimeout(() => {
            this.popup = {
              country: '',
              title: '',
              grantCycleTitle: '',
              isVisible: false,
              isActive: false,
            }
          }, 250);
        }
      }
    })
  }
};
