<template>
  <div class="App">
    <footer>
      <cookie-law theme="base" message="This website uses cookies to ensure you get the best experience on our website.">
    </cookie-law>
    </footer>
    
    <router-view />
    
  </div>    
</template>

<script>
import CookieLaw from "vue-cookie-law";
export default {
  name: "App",
  components: { CookieLaw }
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  padding: 0;
  margin: 0;
  background-color: #DACBB2;
  color: #3B3F54;
}
.App {
  height: 100vh;
  width: 100vw;
  font-family: "Ropa Sans", "Lato", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #DACBB2;
  margin: 0;
  padding: 0;
}

button {
  text-align: center;
  border: none;
  cursor: pointer;
  padding: 15px;
  margin: 5px;
    color: white;
}

a {
  color: white;
  text-decoration: none;
}

.leaflet-bar {
  box-shadow: none;
}

.leaflet-bar a, .leaflet-bar a:hover {
    background: none repeat scroll 0 0 #3B3F54;
    color: #fff;
    border-radius: 0px;
    box-shadow: none;
    width: 39px !important;
    height: 39px !important;
    line-height: 35px !important;
}
.leaflet-bar a:hover {
    background: #30988A;
}

.leaflet-control-fullscreen a {
    background: #3B3F54 url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzkiIGhlaWdodD0iNzgiIHZpZXdCb3g9IjAgMCAzOSA3OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDUwLjVIMTEuNVY1Mi41VjU2LjVIMTMuNVY1Mi41SDE3LjVWNTAuNUgxMy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDYwLjVIMTEuNVY2NC41VjY2LjVIMTMuNUgxNy41VjY0LjVIMTMuNVY2MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy41IDYwLjVIMjUuNVY2NC41SDIxLjVWNjYuNUgyNS41SDI3LjVWNjQuNVY2MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS41IDUwLjVWNTIuNUgyNS41VjU2LjVIMjcuNVY1Mi41VjUwLjVIMjUuNUgyMS41WiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTYuNSIgeT0iNTUuNSIgd2lkdGg9IjYiIGhlaWdodD0iNiIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSAxMS41SDExLjVWMTMuNVYxNy41SDEzLjVWMTMuNUgxNy41VjExLjVIMTMuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSAyMS41SDExLjVWMjUuNVYyNy41SDEzLjVIMTcuNVYyNS41SDEzLjVWMjEuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjcuNSAyMS41SDI1LjVWMjUuNUgyMS41VjI3LjVIMjUuNUgyNy41VjI1LjVWMjEuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjEuNSAxMS41VjEzLjVIMjUuNVYxNy41SDI3LjVWMTMuNVYxMS41SDI1LjVIMjEuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=") no-repeat 0 0 !important;
    background-size: 39px 78px;
}
.leaflet-fullscreen-on .leaflet-control-fullscreen a {
    background-position:0 -39px !important;
}

.mapboxgl-ctrl-pitchtoggle-3d {     
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAxNHB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4zRDwvdGV4dD4NCjwvc3ZnPg==")
}  
.mapboxgl-ctrl-pitchtoggle-2d {     
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAxNHB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4yRDwvdGV4dD4NCjwvc3ZnPg==")
}

.home .Panorama .leaflet-control-container {
  visibility: hidden;
}

.home .Header button {
  visibility: hidden;
}

/* RESPONSIVENESS */

@media (min-width: 3000px) {
  
  /* PANORAMA */
  .leaflet-bar a, .leaflet-bar a:hover {
    width: 80px !important;
    height: 80px !important;
  }
  
  .leaflet-control-zoom-in {
    font-size: 60px !important;
    line-height: 65px !important;
  }

  .leaflet-control-zoom-out {
    font-size: 60px !important;
    line-height: 65px !important;
  }

  .leaflet-control-fullscreen a {
    background: #3B3F54 url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTYwIiB2aWV3Qm94PSIwIDAgODAgMTYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyIDk2SDE2VjEwMlYxMTRIMjJWMTAySDM0Vjk2SDIyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMiAxMjZIMTZWMTM4VjE0NEgyMkgzNFYxMzhIMjJWMTI2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NCAxMjZINThWMTM4SDQ2VjE0NEg1OEg2NFYxMzhWMTI2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NiA5NlYxMDJINThWMTE0SDY0VjEwMlY5Nkg1OEg0NloiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjMxIiB5PSIxMTEiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIgMTZIMTZWMjJWMzRIMjJWMjJIMzRWMTZIMjJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIyIDQ2SDE2VjU4VjY0SDIySDM0VjU4SDIyVjQ2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NCA0Nkg1OFY1OEg0NlY2NEg1OEg2NFY1OFY0NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDYgMTZWMjJINThWMzRINjRWMjJWMTZINThINDZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K") no-repeat 0 0 !important;
    background-size: 80px 160px;
  }
  
  .leaflet-fullscreen-on .leaflet-control-fullscreen a {
    background-position:0 -80px !important;
  }

  /* MAP */
  .mapboxgl-ctrl-pitchtoggle-3d {     
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAzNnB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4zRDwvdGV4dD4NCjwvc3ZnPg==")
  }  
  .mapboxgl-ctrl-pitchtoggle-2d {     
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAzNnB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4yRDwvdGV4dD4NCjwvc3ZnPg==")
  }

}

</style>
