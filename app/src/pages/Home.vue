<template>
  <div class="home">
    <Header></Header>
    <div class="stylingBalk" id="stylingBalk1"></div>
    <Panorama></Panorama>
    <div class="stylingBalk" id="stylingBalk2"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Panorama from "../components/Panorama.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "HomePage",
  components: {
    Panorama,
    Header,
    Footer
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  height: 100vh;
  display: grid;
  grid-template-rows: 96px 24px auto 24px 96px;
  grid-template-columns: 1fr 960px 1fr;
}

.Panorama {
  grid-row: 1 / span 5;
  grid-column: 1 / span 3;
  z-index: 1;
}
.Header {
  grid-row: 1 / 1;
  grid-column: 2 / 2;
  z-index: 2;
}
.Footer {
  grid-row: 5 / 5;
  grid-column: 2 / 2;
  z-index: 2;
}

#stylingBalk1 {
  background: #3B3F54;
  mix-blend-mode: overlay;
  z-index: 2;
  grid-row: 2 / 2;
  grid-column: 2 / 2;
}
#stylingBalk2 {
  background: #30988A;
  mix-blend-mode: overlay;
  z-index: 2;
  grid-row: 4 / 4;
  grid-column: 2 / 2;
}


</style>
