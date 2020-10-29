<template>
  <div class="fixed right-2 bottom-2">
    <div  class="flex items-center space-x-4">
      <div>
        <p class="text-gray-800 dark:text-gray-100">{{ inputText }}</p>
      </div>
      <overlay-record-button />
    </div>

  </div>
</template>

<script lang="ts">
import OverlayRecordButton from '@/components/OverlayRecordButton.vue';
import {
  AudioHelper,
  ClientEvent,
  RequestType,
  SpeechRecognizerEvent,
  WebRequest,
  WebResponse,
  Action,
  ActionType,
} from 'jovo-client-web-vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'overlay',
  components: { OverlayRecordButton },
})
export default class Overlay extends Vue {
  inputText = '';

  mounted() {
    this.$client.$speechRecognizer.on(
      SpeechRecognizerEvent.SpeechRecognized,
      this.onSpeechRecognized,
    );
    this.$client.on(ClientEvent.Request, this.onRequest);
    this.$client.on(ClientEvent.Response, this.onResponse);

    this.$client.on(ClientEvent.Action, this.onAction);
  }

  beforeDestroy() {
    this.$client.$speechRecognizer.off(
      SpeechRecognizerEvent.SpeechRecognized,
      this.onSpeechRecognized,
    );
    this.$client.off(ClientEvent.Request, this.onRequest);
    this.$client.off(ClientEvent.Response, this.onResponse);

    this.$client.off(ClientEvent.Action, this.onAction);
  }

  private onAction(action: Action) {
    if (action.type === ActionType.Custom) {
      switch (action.command) {
        case 'set-theme': {
          this.toggleDarkMode(action.value);
          break;
        }
        default:
      }
    }
  }

  private onSpeechRecognized(event: SpeechRecognitionEvent) {
    this.inputText = AudioHelper.textFromSpeechRecognition(event);
  }

  private onRequest(req: WebRequest) {
    if (req.request.type === RequestType.Text || req.request.type === RequestType.TranscribedText) {
      this.inputText = req.request.body.text || '';
    }
  }

  private onResponse(res: WebResponse) {
    if (res.context.request.asr?.text) {
      this.inputText = res.context.request.asr.text;
    }
  }


  private toggleDarkMode(theme: 'dark' | 'light') {
    if (theme === 'dark') {
      if (!document.documentElement.classList.contains('mode-dark')) {
        document.documentElement.classList.add('mode-dark');
      }
    } else if (theme === 'light') {
      if (document.documentElement.classList.contains('mode-dark')) {
        document.documentElement.classList.remove('mode-dark');
      }
    }
  }
}
</script>
