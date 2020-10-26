<template>
  <button
    class="bg-gray-300 rounded-full p-8 focus:outline-none shadow-inset"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
  >
    <mic-icon :class="[$client.isRecordingInput ? 'text-red-600' : '']" />
  </button>
</template>

<script lang="ts">
import MicIcon from 'vue-feather-icons/icons/MicIcon';
import PlayIcon from 'vue-feather-icons/icons/PlayIcon';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'overlay-record-button',
  components: {
    MicIcon,
    PlayIcon,
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
