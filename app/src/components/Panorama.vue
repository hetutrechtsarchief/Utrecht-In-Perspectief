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
        :fillColor=building.style.fillColor
        :fillOpacity=building.style.fillOpacity
        :stroke=building.style.stroke
        :key="name"
        @click="doRouting(name)"
        @mouseover="doHighlight(building)"
        @mouseout="doReset(building)"
      >
      <l-tooltip :content="name" :options="{sticky: true}"/>
      </l-rectangle>
    </LMap>
  </div>
</template>

<script>
import { CRS } from "leaflet";
import { LMap, LImageOverlay, LRectangle, LControlZoom, LTooltip } from "vue2-leaflet";
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';

export default {
  name: "Panorama",
  components: {
    LMap,
    LImageOverlay,
    LRectangle,
    LTooltip,
    LControlZoom
  },
  data() {
    return {
      mapOptions: {attributionControl: false, zoomControl: false },
      url:
        "./saftleven_1684_app.jpg",
      bounds: [
        [0, 0],
        [1597, 9468]
      ],
      maxBounds: [
        [0, 0],
        [1597, 9468]
      ],
      crs: CRS.Simple,
      opacity: 0.8
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
    },
    doHighlight(building) {
      building.style.fillOpacity = 0.6,
      building.style.fillColor = "rgb(48, 152, 138)"
    },
    doReset(building) {
      building.style.fillOpacity = 0.4,
      building.style.fillColor = "#455DC7"
    }
  },
  created() {
    this.buildings = this.$store.getters["data/getGebouwen"];
  },
  computed: {
    gebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    },
    fillOpacity () {
      return this.opacity / 2
    }
  },
  watch: {
    gebouw() {
      this.$refs.map.fitBounds(this.gebouw.bounds);
    }
  },
  mounted() {
  const map = this.$refs.map.mapObject;
  map.addControl(new window.L.Control.Fullscreen({position:'topright'}));
  },
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