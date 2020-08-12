<template>
  <div class="App">
    <cookie-law theme="utrechtSkyline">
      <div 
      slot="message"> We plaatsen cookies om het gebruik van de website te analyseren en het gebruiksgemak te verbeteren. Door deze melding te sluiten of ergens op de website te klikken, gaat u hiermee akkoord. <router-link to="Colofon">Cookievoorwaarden</router-link>
      </div>
    </cookie-law>
    
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

.home .Panorama .leaflet-control-container {
  visibility: hidden;
}
.home .Header button {
  visibility: hidden;
}
.home .Header .role-selector {
  visibility: hidden;
}
.Colofon .Header .role-selector {
  visibility: hidden;
}
.Detail .Header .role-selector {
  visibility: hidden;
}

/* COOKIE STYLING */
.Cookie--utrechtSkyline {
    background:#f1f1f1;
    color:#3B3F54;
    text-align: left;
    padding:1.25em
}
.Cookie--utrechtSkyline .Cookie__button {
    background:#30988A;;
    padding:.625em 3.125em;
    color:#fff;
    border-radius:0;
    border:0;
    font-size:1em
}
.Cookie--utrechtSkyline .Cookie__button:hover {
    background:#3B3F54;
}

.Cookie--utrechtSkyline a {
  color: #30988A;
  text-decoration: underline;
}

.Cookie--utrechtSkyline a:hover {
  color: #3B3F54;
}

/* RESPONSIVENESS */

@media (min-width: 3000px) {

  /* MAP */
  .mapboxgl-ctrl-pitchtoggle-3d {     
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAzNnB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4zRDwvdGV4dD4NCjwvc3ZnPg==")
  }  
  .mapboxgl-ctrl-pitchtoggle-2d {     
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+DQo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZHk9Ii4zNWVtIiBmaWxsPSIjZmZmIiBzdHlsZT0iZm9udC1zaXplOiAzNnB4OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJyxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjsgZm9udC13ZWlnaHQ6IGJvbGQ7IHRleHQtYW5jaG9yOiBtaWRkbGU7Ij4yRDwvdGV4dD4NCjwvc3ZnPg==")
  }

}

</style>
