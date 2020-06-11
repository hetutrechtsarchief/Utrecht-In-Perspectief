<template>
  <div class="Panorama">
    <LMap
      ref="map"
      :maxBounds="maxBounds"
      :minZoom="this.$route.name === 'DrieLuik' ? -2: 0"
      :maxZoom="2"
      :zoom="this.$route.name === 'DrieLuik' ? -2: 0"
      :crs="crs"
      :center="[900, 3080]"
      :options="mapOptions"
      @ready="onLoad"
    >
      <l-control-zoom 
      position="topright">
      </l-control-zoom>
      <LImageOverlay :url="url" :bounds="bounds" />
      <l-rectangle
        v-for="(building, name) in buildings"
        :interactive="true"
        :bounds="building.bounds"
        :key="name"
        :l-style="building.style"
        @click="doRouting(name)"
      ></l-rectangle>
    </LMap>
  </div>
</template>

<script>
import { CRS } from "leaflet";
import { LMap, LImageOverlay, LRectangle, LControlZoom } from "vue2-leaflet";

export default {
  name: "Panorama",
  components: {
    LMap,
    LImageOverlay,
    LRectangle,
    LControlZoom
  },
  data() {
    return {
      mapOptions: { attributionControl: false, zoomControl: false },
      url:
        "https://raw.githubusercontent.com/hetutrechtsarchief/Utrecht-Skyline/master/panoramas/Saftleven-1669-27570.jpg",
      bounds: [
        [0, 0],
        [1597, 9449]
      ],
      maxBounds: [
        [150, 89],
        [1500, 9300]
      ],
      crs: CRS.Simple
    };
  },
  methods: {
    onLoad(event) {
      this.map = event.map;
      if(this.gebouw.bounds && this.$route.name !== "HomePage")this.$refs.map.fitBounds(this.gebouw.bounds);
    },
    doRouting(name) {
      this.$store.commit("data/setGekozenGebouw", name);
      this.$router.push(`/Drieluik/${name}`);
      this.$store.dispatch("data/setGekozenGebouwWiki");
    }
  },
  created() {
    this.buildings = this.$store.getters["data/getGebouwen"];
  },
  computed: {
    gebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    }
  },
  watch: {
    gebouw() {
      this.$refs.map.fitBounds(this.gebouw.bounds);
    }
  }
};
</script>

<style scoped>
.Panorama {
  color: #fff;
  background-color: #ddcab1;
}

.leaflet-container {
  background: #ddcab1;
}
</style>