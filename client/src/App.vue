<template>
  <div id="app" class="w-screen h-screen bg-gray-300 dark:bg-gray-900">
    <overlay v-if="$client.$speechRecognizer.isAvailable" />
    <div v-else class="flex flex-col flex-grow justify-center items-center">
      <div class="px-8">
        <p class="text-lg text-center text-gray-800 dark:text-gray-400">
          This demo uses the Chrome Web Speech API, which unfortunately isn't supported in this browser.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Overlay from '@/components/Overlay.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { Overlay },
})
export default class App extends Vue {}
</script>

<style>
@import 'assets/css/theme.css';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
