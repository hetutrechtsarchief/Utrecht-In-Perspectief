<template>
  <div class="App">
    <cookie-law theme="utrechtSkyline">
      <div slot="message">
        We plaatsen cookies om het gebruik van de website te analyseren en het gebruiksgemak te verbeteren. Door deze melding te sluiten of ergens op de website te klikken, gaat u hiermee akkoord.
        <router-link to="Colofon">Cookievoorwaarden</router-link>
      </div>
    </cookie-law>

    <router-view />
  </div>
</template>

<script>
import CookieLaw from "vue-cookie-law";

export default {
  name: "App",
  components: { CookieLaw },
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
  background-color: #dacbb2;
  color: #3b3f54;
}
.App {
  height: 100vh;
  width: 100vw;
  font-family: "Ropa Sans", "Lato", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #dacbb2;
  margin: 0;
  padding: 0;
}

button {
  text-align: center;
  border: none;
  cursor: pointer;
  padding: 15px;
  margin: 5px 5px 5px 0px;
  color: white;
}

a {
  color: white;
  text-decoration: none;
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
  background: #f1f1f1;
  color: #3b3f54;
  text-align: left;
  padding: 1.25em;
}
.Cookie--utrechtSkyline .Cookie__button {
  background: #30988a;
  padding: 0.625em 3.125em;
  color: #fff;
  border-radius: 0;
  border: 0;
  font-size: 1em;
}
.Cookie--utrechtSkyline .Cookie__button:hover {
  background: #3b3f54;
}

.Cookie--utrechtSkyline a {
  color: #30988a;
  text-decoration: underline;
}

.Cookie--utrechtSkyline a:hover {
  color: #3b3f54;
}

.tooltip {
  display: block !important;
  z-index: 10000;
  width: 30vw;
  font-family: "Ropa Sans", "Lato", Helvetica, Arial, sans-serif;
}

.tooltip .tooltip-inner {
  background: #ffffff;
  color: #4B4B4B;
  border-radius: 5px;
  padding: 14px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #ffffff;
  z-index: 1;
}
tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 15px 15px 0 15px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -15px;
  left: calc(50% - 15px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>