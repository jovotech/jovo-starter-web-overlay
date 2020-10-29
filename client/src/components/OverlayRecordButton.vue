<template>
  <div>
    <button
      ref="recordButton"
      class="bg-gray-100 dark:bg-gray-800 rounded-full p-8 focus:outline-none shadow-2xl "
      :class="[$client.isRecordingInput ? 'shadow-inner circle-ripple' : '']"
      @mousedown="onMouseDown"
      @touchstart="onMouseDown"
    >
      <mic-icon class="text-gray-800 dark:text-gray-400" />
    </button>
  </div>
</template>

<script lang="ts">
import MicIcon from 'vue-feather-icons/icons/MicIcon';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'overlay-record-button',
  components: {
    MicIcon,
  },
})
export default class OverlayRecordButton extends Vue {
  async onMouseDown(event: MouseEvent | TouchEvent) {
    if (!this.$client.isInitialized) {
      await this.$client.initialize();
    }
    if (this.$client.isRecordingInput) {
      return;
    }
    if (event instanceof MouseEvent) {
      window.addEventListener('mouseup', this.onMouseUp);
    } else {
      window.addEventListener('touchend', this.onMouseUp);
    }

    await this.$client.startInputRecording();
  }

  private onMouseUp() {
    window.removeEventListener('mouseup', this.onMouseUp);
    this.$client.stopInputRecording();
  }
}
</script>
<style lang="css">
.ripple {
  animation: ripple-animation 0.5s linear infinite;
}
@keyframes ripple-animation {
  100% {
    box-shadow: 0 0 0 0.6em rgba(67, 74, 101, 0.3),
    0 0 0 0.35em rgba(67, 74, 101, 0.3),
    0 0 0 0.125em rgba(67, 74, 101, 0.3),
    0 0 0 0 rgba(67, 74, 101, 0.3);
  }
  0% {
    box-shadow: 0 0 0 1em rgba(67, 74, 101, 0),
    0 0 0 0.65em rgba(67, 74, 101, 0.3),
    0 0 0 0.35em rgba(67, 74, 101, 0.3),
    0 0 0 0.125em rgba(67, 74, 101, 0.3);
  }
}
</style>
