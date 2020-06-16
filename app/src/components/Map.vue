<template>
  <div class="Map">
    <MglMap
      :mapStyle="mapStyle"
      :center="center"
      :zoom="16"
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
  MglGeojsonLayer
} from "vue-mapbox";
export default {
  name: "Map",
  components: {
    MglMap,
    MglAttributionControl,
    MglNavigationControl,
    MglFullscreenControl,
    MglGeojsonLayer
  },

  data() {
    return {
      // gekozenGebouw: "",
      geojsonSource: {
        data: {
          id: "gebouwen",
          type: "FeatureCollection",
          features: []
        }
      },
      geojsonLayer: {
        id: "gebouwen",
        type: "circle",
        source: "gebouwen",
        paint: {
          "circle-radius": 20,
          "circle-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "#30988A",
            "#455DC7"
            ],
          "circle-opacity": 0.8,
          "circle-pitch-alignment": "map"
        }
      },
      mapStyle: style, // your map style,
      accessToken: "mpUE8UJCeHr5LXgVR1cW",
      center: [5.121044, 52.09031]
    };
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    onLoad(event) {
      this.map = event.map;
      this.map.addControl(new PitchToggle(
        {
        bearing: 71,
        pitch: 60,
        minpitchzoom: null
        }
        )
      );
      this.geojsonSource = this.geojsonSource = { data: geojson };
      geojson.features.forEach(item => {
        if (item.properties.label === this.gekozenGebouw.properties.label) {
          event.map.flyTo({ center: item.geometry.coordinates });
        }
      });
      this.on()
    },
    onMapClick(event) {
      let e = event.mapboxEvent;
      this.coordinatesPopup = [e.lngLat.lng, e.lngLat.lat];
      var bbox = [
        [e.point.x - 2, e.point.y - 2],
        [e.point.x + 2, e.point.y + 2]
      ];
      let layercontent = event.map.queryRenderedFeatures(bbox, {
        layers: ["gebouwen"]
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
      var bbox = [
        [e.point.x - 5, e.point.y - 5],
        [e.point.x + 5, e.point.y + 5]
      ];
      if (event.map.isStyleLoaded()) {
        let features = event.map.queryRenderedFeatures(bbox, {
          layers: ["gebouwen"]
        });
        event.map.getCanvas().style.cursor = features.length ? "pointer" : "";
      }
    }
  },
  computed: {
    gekozenGebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    }
  },
  watch: {
    gekozenGebouw() {
      geojson.features.forEach(item => {
        if (item.properties.label === this.gekozenGebouw.properties.label) {
          this.map.flyTo({ center: item.geometry.coordinates, curve: 1 });
        }
      });
    }
  }
};
</script>

<style>
.Map {
  color: #3b3f54;
  background-color: #dacbb2;
}

.mapboxgl-ctrl-group {
  border-radius: 0px;
  background: #3B3F54 !important;
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

</style>