<template>
  <div id="app">
    <overlay />
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
