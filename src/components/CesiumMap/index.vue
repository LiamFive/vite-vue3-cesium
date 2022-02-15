<script setup>
import CesiumSourceManager from './helper/cesium-source-manager';
import { onMounted, provide, ref } from 'vue';

let mapLoaded = ref(false);
let cesiumSourceManager;

onMounted(() => {
  cesiumSourceManager = new CesiumSourceManager();
  cesiumSourceManager.initMap('cesiumMap');
  mapLoaded.value = true;
  provide('cesiumSourceManager', cesiumSourceManager);
});
</script>

<template>
  <div id="cesiumMap">
    <template v-if="mapLoaded">
      <slot />
    </template>
  </div>
</template>

<style lang="less" scoped>
#cesiumMap {
  width: 100%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
