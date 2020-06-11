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

.mapboxgl-ctrl-pitchtoggle-3d {     
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAxNHB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4zRDwvdGV4dD4NCjwvc3ZnPg==")
}  
.mapboxgl-ctrl-pitchtoggle-2d {     
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAxNHB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4yRDwvdGV4dD4NCjwvc3ZnPg==")
}

</style>
