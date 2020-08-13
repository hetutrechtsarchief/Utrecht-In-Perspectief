<template>
  <div class="Map">
    <MglMap
      :mapStyle="mapStyle"
      :center="center"
      :zoom="16"
      :maxZoom="17"
      :minZoom="14"
      :pitchWithRotate="false"
      :dragRotate="false"
      :accessToken="accessToken"
      @load="onLoad"
      @click="onMapClick"
      @mousemove="onMapMoveMouse"
      :pitch="0"
      :bearing="71"
    >
      <MglAttributionControl position="bottom-right" />
      <MglNavigationControl :showCompass="false" position="top-right" />
      <MglFullscreenControl position="top-right" />
      <MglGeojsonLayer
        sourceId="gebouwen"
        :source="geojsonSource"
        layerId="gebouwen"
        :layer="geojsonLayer"
      ></MglGeojsonLayer>
    </MglMap>
  </div>
</template>

<script>
import style from "../assets/mapStyle.json";
import geojson from "../assets/saftleven.json";
import Mapbox from "mapbox-gl";
import PitchToggle from "./../pitchtogglecontrol";
import {
  MglMap,
  MglAttributionControl,
  MglNavigationControl,
  MglFullscreenControl,
  MglGeojsonLayer,
} from "v-mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "v-mapbox/dist/v-mapbox.css";

export default {
  name: "Map",
  components: {
    MglMap,
    MglAttributionControl,
    MglNavigationControl,
    MglFullscreenControl,
    MglGeojsonLayer,
  },

  data() {
    return {
      // gekozenGebouw: "",
      geojsonSource: {
        data: {
          id: "gebouwen",
          type: "FeatureCollection",
          features: [],
        },
      },
      geojsonLayer: {
        id: "gebouwen",
        type: "circle",
        source: "gebouwen",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 12, 7, 20, 15],
          "circle-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "#30988A",
            "#455DC7",
          ],
          "circle-opacity": 0.8,
          "circle-pitch-alignment": "map",
        },
      },
      mapStyle: style, // your map style,
      accessToken: "mpUE8UJCeHr5LXgVR1cW",
      center: [5.121044, 52.09031],
    };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    onLoad(event) {
      this.map = event.map;
      this.map.addControl(
        new PitchToggle({
          bearing: 71,
          pitch: 60,
          minpitchzoom: null,
        })
      );
      this.geojsonSource = this.geojsonSource = { data: geojson };
      geojson.features.forEach((item) => {
        if (item.properties.label === this.gekozenGebouw.properties.label) {
          event.map.flyTo({ center: item.geometry.coordinates });
        }
      });
    },
    onMapClick(event) {
      let e = event.mapboxEvent;
      this.coordinatesPopup = [e.lngLat.lng, e.lngLat.lat];
      var bbox = [
        [e.point.x - 2, e.point.y - 2],
        [e.point.x + 2, e.point.y + 2],
      ];
      let layercontent = event.map.queryRenderedFeatures(bbox, {
        layers: ["gebouwen"],
      });
      event.map.flyTo({ center: [e.lngLat.lng, e.lngLat.lat] });
      if (layercontent && layercontent[0] && layercontent[0].layer) {
        let geb = layercontent[0].properties;
        this.$store.commit("data/setGekozenGebouw", geb.label);
        this.$router.push(`/Drieluik/${geb.label}`);
        this.$store.dispatch("data/setGekozenGebouwWiki");
      }
    },
    onMapMoveMouse(event) {
      let e = event.mapboxEvent;
      let hoveredFeature;
      if (event.map.isStyleLoaded()) {
        let features = event.map.queryRenderedFeatures(e.point, {
          layers: ["gebouwen"],
        });
        if (features[0]) {
          event.map.setFeatureState(
            { source: "gebouwen", id: features[0].id },
            { hover: true }
          );
          event.map.getCanvas().style.cursor = "pointer";
          if (hoveredFeature && hoveredFeature != features[0].id)
            event.map.removeFeatureState({
              source: "gebouwen",
              id: hoveredFeature,
            });
          hoveredFeature = features[0].id;
        } else {
          event.map.removeFeatureState({
            source: "gebouwen",
            id: hoveredFeature,
          });
          event.map.getCanvas().style.cursor = "";
          hoveredFeature = null;
        }
      }
    },
  },
  computed: {
    gekozenGebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    },
  },
  watch: {
    gekozenGebouw() {
      geojson.features.forEach((item) => {
        if (item.properties.label === this.gekozenGebouw.properties.label) {
          this.map.flyTo({ center: item.geometry.coordinates, curve: 1 });
        }
      });
    },
  },
};
</script>

<style>
.Map {
  color: #3b3f54;
  background-color: #dacbb2;
}

.mapboxgl-ctrl-group {
  border-radius: 0px;
  background: #3b3f54 !important;
}

.mapboxgl-ctrl > button {
  box-sizing: content-box !important;
  margin: 0 !important;
  padding: 5px !important;
}

.mapboxgl-ctrl > button:not(:disabled):hover {
  background-color: #30988a;
}

.mapboxgl-ctrl > button:disabled {
  background-color: #fff;
}

.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {
  background-image: url(data:image/svg+xml;charset=utf8,<svg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27>%0A%20%20<path%20style%3D%27fill%3A%23ffffff%3B%27%20d%3D%27M%2010%206%20C%209.446%206%209%206.4459904%209%207%20L%209%209%20L%207%209%20C%206.446%209%206%209.446%206%2010%20C%206%2010.554%206.446%2011%207%2011%20L%209%2011%20L%209%2013%20C%209%2013.55401%209.446%2014%2010%2014%20C%2010.554%2014%2011%2013.55401%2011%2013%20L%2011%2011%20L%2013%2011%20C%2013.554%2011%2014%2010.554%2014%2010%20C%2014%209.446%2013.554%209%2013%209%20L%2011%209%20L%2011%207%20C%2011%206.4459904%2010.554%206%2010%206%20z%27%20%2F>%0A<%2Fsvg>%0A) !important;
}

.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {
  background-image: url(data:image/svg+xml;charset=utf8,<svg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27>%0A%20%20<path%20style%3D%27fill%3A%23ffffff%3B%27%20d%3D%27m%207%2C9%20c%20-0.554%2C0%20-1%2C0.446%20-1%2C1%200%2C0.554%200.446%2C1%201%2C1%20l%206%2C0%20c%200.554%2C0%201%2C-0.446%201%2C-1%200%2C-0.554%20-0.446%2C-1%20-1%2C-1%20z%27%20%2F>%0A<%2Fsvg>%0A) !important;
}

.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNCAwSDBWNFYxMkg0VjRIMTJWMEg0WiIgZmlsbD0id2hpdGUiLz4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNCAyMEgwVjI4VjMySDRIMTJWMjhINFYyMFoiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMyIDIwSDI4VjI4SDIwVjMySDI4SDMyVjI4VjIwWiIgZmlsbD0id2hpdGUiLz4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMFY0SDI4VjEySDMyVjRWMEgyOEgyMFoiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==") !important;
}

.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNCAwSDBWNFYxMkg0VjRIMTJWMEg0WiIgZmlsbD0id2hpdGUiLz4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNCAyMEgwVjI4VjMySDRIMTJWMjhINFYyMFoiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMyIDIwSDI4VjI4SDIwVjMySDI4SDMyVjI4VjIwWiIgZmlsbD0id2hpdGUiLz4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMFY0SDI4VjEySDMyVjRWMEgyOEgyMFoiIGZpbGw9IndoaXRlIi8+DQo8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjIiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==") !important;
}

.mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%2330988A'%3E%3Cpath d='M10.5 14l4-8 4 8h-8z'/%3E%3Cpath d='M10.5 16l4 8 4-8h-8z' fill='%23fff'/%3E%3C/svg%3E") !important;
}

.mapboxgl-ctrl-pitchtoggle-3d {
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAxNHB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4zRDwvdGV4dD4NCjwvc3ZnPg==")
}
.mapboxgl-ctrl-pitchtoggle-2d {
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAxNHB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4yRDwvdGV4dD4NCjwvc3ZnPg==")
}

/* RESPONSIVENESS */

@media (min-width: 3000px) {
  .mapboxgl-ctrl-group > button {
    width: 80px;
    height: 80px;
  }

  .mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMiAxNkgxNlYyMlYzNEgyMlYyMkgzNFYxNkgyMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIgNDZIMTZWNThWNjRIMjJIMzRWNThIMjJWNDZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTY0IDQ2SDU4VjU4SDQ2VjY0SDU4SDY0VjU4VjQ2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NiAxNlYyMkg1OFYzNEg2NFYyMlYxNkg1OEg0NloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=") !important;
  }

  .mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMiAxNkgxNlYyMlYzNEgyMlYyMkgzNFYxNkgyMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIgNDZIMTZWNThWNjRIMjJIMzRWNThIMjJWNDZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTY0IDQ2SDU4VjU4SDQ2VjY0SDU4SDY0VjU4VjQ2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NiAxNlYyMkg1OFYzNEg2NFYyMlYxNkg1OEg0NloiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjMxIiB5PSIzMSIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==") !important;
  }

  .mapboxgl-ctrl-pitchtoggle-3d {     
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAzNnB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4zRDwvdGV4dD4NCjwvc3ZnPg==")
  }  
  .mapboxgl-ctrl-pitchtoggle-2d {     
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAzNnB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4yRDwvdGV4dD4NCjwvc3ZnPg==")
  }

}
</style>