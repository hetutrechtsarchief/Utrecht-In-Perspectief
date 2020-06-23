<template>
  <div class="App">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App"
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
}
.leaflet-bar a:hover {
    background: #455DC7;
}

.leaflet-control-fullscreen a {
    background: #3B3F54 url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAzMCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05IDM3SDdWMzlWNDNIOVYzOUgxM1YzN0g5WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05IDQ3SDdWNTFWNTNIOUgxM1Y1MUg5VjQ3WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMyA0N0gyMVY1MUgxN1Y1M0gyMUgyM1Y1MVY0N1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTcgMzdWMzlIMjFWNDNIMjNWMzlWMzdIMjFIMTdaIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxMiIgeT0iNDIiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHJ4PSIyIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkgN0g3VjlWMTNIOVY5SDEzVjdIOVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOSAxN0g3VjIxVjIzSDlIMTNWMjFIOVYxN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjMgMTdIMjFWMjFIMTdWMjNIMjFIMjNWMjFWMTdaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3IDdWOUgyMVYxM0gyM1Y5VjdIMjFIMTdaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K") no-repeat 0 0 !important;
    background-size: 30px 60px;
}
  .leaflet-fullscreen-on .leaflet-control-fullscreen a {
    background-position:0 -30px !important;
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

</style>
