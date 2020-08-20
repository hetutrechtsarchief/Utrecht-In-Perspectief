<template>
  <div class="Panorama">
    <LMap
      ref="map"
      :minZoom="this.$route.name === 'DrieLuik' ? 2: 4"
      :maxZoom="6"
      :zoom="this.$route.name === 'DrieLuik' ? 2: 4"
      :crs="crs"
      :center="center"
      :options="{
        attributionControl: false,
        zoomControl: false,
      }"
      @ready="onLoad"
    >
      <l-iiif :url="iiifUrl" :options="iiifOpts" />
      <l-control-zoom position="topright"></l-control-zoom>
      <l-rectangle
        v-for="(gebouw, name) in this.gebouwen"
        :interactive="true"
        :bounds="gebouw.bounds"
        v-bind:fillColor=" name === gekozenGebouwId ?  'rgb(48, 152, 138)'  : gebouw.style.fillColor "
        v-bind:fillOpacity=" name === gekozenGebouwId ?  0.6  : gebouw.style.fillOpacity "
        :stroke="gebouw.style.stroke"
        :key="name"
        @click="handleClick(name)"
        @mouseover="mouseover"
        @mouseout="mouseout"
        :attribution="gebouw.properties.label"
      >
        <l-tooltip :content="name" :options="{sticky: true}" />
      </l-rectangle>
    </LMap>
  </div>
</template>

<script>
import { CRS } from "leaflet";
import { LMap, LRectangle, LControlZoom, LTooltip } from "vue2-leaflet";
import LIiif from "vue2-leaflet-iiif";
import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";

export default {
  name: "Panorama",
  components: {
    LMap,
    LRectangle,
    LTooltip,
    LControlZoom,
    LIiif,
  },
  data() {
    return {
      center: [-30, 156.3],
      crs: CRS.Simple,
      opacity: 0.8,
      iiifOpts: {
        tileFormat: "jpg",
        tileSize: 512,
        fitBounds: false,
        setMaxBounds: true,
      },
    };
  },
  mounted() {
    const map = this.$refs.map.mapObject;
    map.addControl(new window.L.Control.Fullscreen({ position: "topright" }));
  },
  created() {},
  computed: {
    gebouwen() {
      return this.$store.getters["data/getDataSet"];
    },
    iiifUrl() {
      return this.$store.getters["data/getPanormaUrl"];
    },
    gekozenGebouwId() {
      if (this.$store.getters["data/getGekozenGebouwId"]) {
        return this.$store.getters["data/getGekozenGebouwId"];
      } else {
        return "";
      }
    },
    gekozenGebouw() {
      if (this.$store.getters["data/getGekozenGebouw"]) {
        return this.$store.getters["data/getGekozenGebouw"];
      } else {
        return "";
      }
    },
  },
  watch: {
    iiifUrl(){
      this.center = [-22,98]
    },
    gekozenGebouw() {
      this.$refs.map.fitBounds(this.gekozenGebouw.bounds);
    },
  },
  methods: {

    onLoad(event) {
      this.map = event.map;
      // On Drieluik zoom in to chosen building
      if (this.gekozenGebouw.bounds && this.$route.name !== "HomePage") {
        this.$refs.map.fitBounds(this.gekozenGebouw.bounds);
      }
    },
    handleClick(name) {
      // Prevent from routing when chosenbuilding is same as click.
      if (name && name !== this.gekozenGebouwId) {
        this.$store.commit("data/setGekozenGebouwId", name);
        this.$store.commit("data/setGekozenGebouw", name);
      }
    },
    mouseover: function (e) {
      this.doHighlight(e.target);
    },
    mouseout: function (e) {
      this.doReset(e.target);
    },
    doHighlight(layer) {
      if (layer.options.attribution !== this.gekozenGebouwId) {
        layer.setStyle({
          fillColor: "rgb(48, 152, 138)",
          fillOpacity: 0.6,
        });
      }
    },
    doReset(layer) {
      if (layer.options.attribution !== this.gekozenGebouwId) {
        layer.setStyle({
          fillColor: "#455DC7",
          fillOpacity: 0.4,
        });
      }
    },
  },
};
</script>

<style>
.Panorama {
  color: #fff;
  background-color: #ddcab1;
}

.leaflet-container {
  background: #ddcab1;
}

.leaflet-bar {
  box-shadow: none;
}

.leaflet-bar a,
.leaflet-bar a:hover {
  background: none repeat scroll 0 0 #3b3f54;
  color: #fff;
  border-radius: 0px;
  box-shadow: none;
  width: 39px !important;
  height: 39px !important;
  line-height: 35px !important;
}
.leaflet-bar a:hover {
  background: #30988a;
}

.leaflet-control-fullscreen a {
  background: #3b3f54
    url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzkiIGhlaWdodD0iNzgiIHZpZXdCb3g9IjAgMCAzOSA3OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDUwLjVIMTEuNVY1Mi41VjU2LjVIMTMuNVY1Mi41SDE3LjVWNTAuNUgxMy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDYwLjVIMTEuNVY2NC41VjY2LjVIMTMuNUgxNy41VjY0LjVIMTMuNVY2MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy41IDYwLjVIMjUuNVY2NC41SDIxLjVWNjYuNUgyNS41SDI3LjVWNjQuNVY2MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS41IDUwLjVWNTIuNUgyNS41VjU2LjVIMjcuNVY1Mi41VjUwLjVIMjUuNUgyMS41WiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTYuNSIgeT0iNTUuNSIgd2lkdGg9IjYiIGhlaWdodD0iNiIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSAxMS41SDExLjVWMTMuNVYxNy41SDEzLjVWMTMuNUgxNy41VjExLjVIMTMuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSAyMS41SDExLjVWMjUuNVYyNy41SDEzLjVIMTcuNVYyNS41SDEzLjVWMjEuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjcuNSAyMS41SDI1LjVWMjUuNUgyMS41VjI3LjVIMjUuNUgyNy41VjI1LjVWMjEuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjEuNSAxMS41VjEzLjVIMjUuNVYxNy41SDI3LjVWMTMuNVYxMS41SDI1LjVIMjEuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=")
    no-repeat 0 0 !important;
  background-size: 39px 78px;
}
.leaflet-fullscreen-on .leaflet-control-fullscreen a {
  background-position: 0 -39px !important;
}

.leaflet-control-fullscreen a:hover {
  background: #30988a
    url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzkiIGhlaWdodD0iNzgiIHZpZXdCb3g9IjAgMCAzOSA3OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDUwLjVIMTEuNVY1Mi41VjU2LjVIMTMuNVY1Mi41SDE3LjVWNTAuNUgxMy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDYwLjVIMTEuNVY2NC41VjY2LjVIMTMuNUgxNy41VjY0LjVIMTMuNVY2MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy41IDYwLjVIMjUuNVY2NC41SDIxLjVWNjYuNUgyNS41SDI3LjVWNjQuNVY2MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS41IDUwLjVWNTIuNUgyNS41VjU2LjVIMjcuNVY1Mi41VjUwLjVIMjUuNUgyMS41WiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTYuNSIgeT0iNTUuNSIgd2lkdGg9IjYiIGhlaWdodD0iNiIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSAxMS41SDExLjVWMTMuNVYxNy41SDEzLjVWMTMuNUgxNy41VjExLjVIMTMuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSAyMS41SDExLjVWMjUuNVYyNy41SDEzLjVIMTcuNVYyNS41SDEzLjVWMjEuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjcuNSAyMS41SDI1LjVWMjUuNUgyMS41VjI3LjVIMjUuNUgyNy41VjI1LjVWMjEuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjEuNSAxMS41VjEzLjVIMjUuNVYxNy41SDI3LjVWMTMuNVYxMS41SDI1LjVIMjEuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=")
    no-repeat 0 0 !important;
  background-size: 39px 78px;
}

.leaflet-fullscreen-on .leaflet-control-fullscreen a:hover {
  background-position: 0 -39px !important;
}

@media (min-width: 3000px) {
  /* PANORAMA */
  .leaflet-bar a,
  .leaflet-bar a:hover {
    width: 80px !important;
    height: 80px !important;
    line-height: 65px !important;
  }

  .leaflet-control-zoom-in {
    font-size: 60px !important;
  }

  .leaflet-control-zoom-out {
    font-size: 60px !important;
  }

  .leaflet-control-fullscreen a {
    background: #3b3f54
      url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTYwIiB2aWV3Qm94PSIwIDAgODAgMTYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyIDk2SDE2VjEwMlYxMTRIMjJWMTAySDM0Vjk2SDIyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMiAxMjZIMTZWMTM4VjE0NEgyMkgzNFYxMzhIMjJWMTI2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NCAxMjZINThWMTM4SDQ2VjE0NEg1OEg2NFYxMzhWMTI2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NiA5NlYxMDJINThWMTE0SDY0VjEwMlY5Nkg1OEg0NloiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjMxIiB5PSIxMTEiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIgMTZIMTZWMjJWMzRIMjJWMjJIMzRWMTZIMjJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyIDQ2SDE2VjU4VjY0SDIySDM0VjU4SDIyVjQ2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NCA0Nkg1OFY1OEg0NlY2NEg1OEg2NFY1OFY0NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDYgMTZWMjJINThWMzRINjRWMjJWMTZINThINDZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K")
      no-repeat 0 0 !important;
    background-size: 80px 160px;
  }

  .leaflet-fullscreen-on .leaflet-control-fullscreen a {
    background-position: 0 -80px !important;
  }

  .leaflet-control-fullscreen a:hover {
    background: #30988a
      url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTYwIiB2aWV3Qm94PSIwIDAgODAgMTYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyIDk2SDE2VjEwMlYxMTRIMjJWMTAySDM0Vjk2SDIyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMiAxMjZIMTZWMTM4VjE0NEgyMkgzNFYxMzhIMjJWMTI2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NCAxMjZINThWMTM4SDQ2VjE0NEg1OEg2NFYxMzhWMTI2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NiA5NlYxMDJINThWMTE0SDY0VjEwMlY5Nkg1OEg0NloiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjMxIiB5PSIxMTEiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIgMTZIMTZWMjJWMzRIMjJWMjJIMzRWMTZIMjJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyIDQ2SDE2VjU4VjY0SDIySDM0VjU4SDIyVjQ2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NCA0Nkg1OFY1OEg0NlY2NEg1OEg2NFY1OFY0NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDYgMTZWMjJINThWMzRINjRWMjJWMTZINThINDZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K")
      no-repeat 0 0 !important;
    background-size: 80px 160px;
  }

  .leaflet-fullscreen-on .leaflet-control-fullscreen a:hover {
    background-position: 0 -80px !important;
  }
}
</style>
