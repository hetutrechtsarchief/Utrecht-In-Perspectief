<template>
  <div class="DrieLuik">
    <Header></Header>
    <div class="paarseBalk" id="paarseBalk1"></div>
    <Panorama></Panorama>
    <div class="paarseBalk" id="paarseBalk2"></div>
    <Map></Map>
    <Carrousel></Carrousel>
  </div>
</template>

<script>
import Panorama from "../components/Panorama.vue";
import Header from "../components/Header.vue";
import Map from "../components/Map.vue";
import Carrousel from "../components/Carrousel.vue";

export default {
  name: "DrieLuik",
  components: {
    Header,
    Panorama,
    Map,
    Carrousel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.DrieLuik {
  height: 100vh;
  display: grid;
  grid-template-columns: 320px repeat(2, 1fr);
  grid-template-rows: 56px repeat(2, 8px) 1fr repeat(2, 8px) 1fr repeat(2, 8px) 1fr;
}
.paarseBalk {
  background: #DACBB2;
  z-index: 10;
}
#paarseBalk1 {
  background: #455DC7;
  grid-row: 2 / span 2;
  grid-column: 2 / span 2;
}
#paarseBalk2 {
  grid-row: 5 / span 2;
  grid-column: 2 / span 2;
}
#paarseBalk3 {
  grid-row: 8 / span 2;
  grid-column: 2 / span 2;
}

.Header {
  grid-row: 1 / span 2;
  grid-column: 1 / span 2;
  width: 100vw;
}
.Panorama {
  grid-row: 3 / span 3;
  grid-column: 1 / span 3;
  z-index: 1;
}
.Map {
  grid-row: 6 / span 3;
  grid-column: 1 / span 3;
}
.Carrousel {
  grid-row: 9 / span 2;
  grid-column: 1 / span 3;
}
</style>
