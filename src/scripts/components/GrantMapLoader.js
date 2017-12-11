export const GrantMapLoader = {
  template: `
    <svg class="grant-map-loader" viewBox="0 0 1280 5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g fill="none" fill-rule="evenodd">
        <mask id="mask">
          <rect class="grant-map-loader__mask" :style="style" fill="#fff" width="1280" height="5"/>
        </mask>
        <g class="grant-map-loader__bars">
          <rect fill="#DE5449" mask="url(#mask)" width="320" height="5"/><rect fill="#2A9F7D" mask="url(#mask)" x="320" width="320" height="5"/><rect fill="#2A829F" mask="url(#mask)" x="640" width="320" height="5"/><rect fill="#F7C22C" mask="url(#mask)" x="960" width="320" height="5"/>
        </g>
      </g>
    </svg>
  `,
  data: function() {
    return {
      percent: 0,
      hasCompleted: false,
      style: {
        transform: `scaleX(0)`
      }
    }
  },
  methods: {
    increaseBy: function(percent) {
      if (this.hasCompleted) return;
      if (this.percent + percent >= 1) {
        this.complete();
        return;
      }
      this.percent = this.percent + percent;
      this.style.transform = `scaleX(${this.percent})`;
    },
    complete: function() {
      this.hasCompleted = true;
      this.percent = 1;
      this.style.transform = `scaleX(${this.percent})`;
      this.$el.classList.add('grant-map-loader--hidden');
    }
  }
}
