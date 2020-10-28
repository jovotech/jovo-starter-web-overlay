<template>
  <button
    class="bg-gray-100 dark:bg-gray-800 rounded-full p-8 focus:outline-none shadow-2xl"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
  >
    <mic-icon class="text-gray-800 dark:text-gray-400" :class="[$client.isRecordingInput ? 'text-red-600 dark:text-red-600' : '']" />
  </button>
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

  private onMouseUp(event: MouseEvent | TouchEvent) {
    window.removeEventListener('mouseup', this.onMouseUp);
    this.$client.stopInputRecording();
  }
}
</script>
