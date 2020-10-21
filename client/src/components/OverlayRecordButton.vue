<template>
  <button
    class="bg-gray-300 rounded-full p-8 focus:outline-none shadow-inset"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
    @click="onClick"
  >
    <play-icon v-if="!$client.isInitialized" />
    <mic-icon v-else :class="[$client.isRecordingInput ? 'text-red-600' : '']" />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MicIcon from 'vue-feather-icons/icons/MicIcon';
import PlayIcon from 'vue-feather-icons/icons/PlayIcon';

@Component({
  name: 'overlay-record-button',
  components: {
    MicIcon,
    PlayIcon,
  },
})
export default class OverlayRecordButton extends Vue {
  async onClick() {
    if (!this.$client.isInitialized) {
      return this.$client.initialize();
    }
  }

  // Could be critical for other OS than Windows because those try to get the MediaStream when starting to record.
  // This will cause the mouse up event to be called before the actual recording has started,
  // which will then cause the recording to not be stopped on immediate mouse up
  // TODO find a solution for the issue mentioned above
  async onMouseDown(event: MouseEvent | TouchEvent) {
    if (this.$client.isInitialized) {
      event.preventDefault();
    }
    if (this.$client.isRecordingInput || !this.$client.isInitialized) {
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

<style scoped lang="scss"></style>
