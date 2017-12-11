export const ProgressBar = {
  template: `
    <svg class="progress-bar" viewBox="0 0 1280 5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g fill="none" fill-rule="evenodd">
        <mask :id="uniqueMaskId">
          <rect class="progress-bar__mask" :style="style" fill="#fff" width="1280" height="5"/>
        </mask>
        <g class="progress-bar__bars">
          <rect fill="#DE5449" :mask="uniqueMaskIdUrl" width="320" height="5"/>
          <rect fill="#2A9F7D" :mask="uniqueMaskIdUrl" x="320" width="320" height="5"/>
          <rect fill="#2A829F" :mask="uniqueMaskIdUrl" x="640" width="320" height="5"/>
          <rect fill="#F7C22C" :mask="uniqueMaskIdUrl" x="960" width="320" height="5"/>
        </g>
      </g>
    </svg>
  `,
  data: function() {
    return {
      percent: 0,
      hasCompleted: false
    }
  },
  computed: {
    style: function() {
      return {
        transform: `scaleX(${this.percent})`
      }
    },
    uniqueMaskId: function() {
      return this._uid;
    },
    uniqueMaskIdUrl: function() {
      return `url(#${this._uid})`;
    }
  },
  methods: {
    complete: function() {
      this.hasCompleted = true;
      this.percent = 1;
      this.$el.classList.add('progress-bar--hidden');
    },
    increaseBy: function(percent) {
      if (this.hasCompleted) return;
      if (this.percent + percent >= 1) {
        this.complete();
        return;
      }
      this.percent = this.percent + percent;
    },
    setTo: function(percent) {
      this.percent = percent;
    }
  }
}
