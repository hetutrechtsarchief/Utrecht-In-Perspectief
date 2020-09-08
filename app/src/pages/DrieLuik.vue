<template>
  <div class="DrieLuik">
    <Header></Header>
    <div class="paarseBalk" id="paarseBalk1"></div>
    <Panorama></Panorama>
    <div class="paarseBalk" id="paarseBalk2"></div>
    <Map></Map>
    <div class="paarseBalk" id="paarseBalk3"></div>
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
    Carrousel,
  },

  watch: {
    gekozenGebouwId() {
      if (this.gekozenGebouwId) {
        this.$router.push({
          name: "DrieLuik",
          params: { gebouw: `${this.gekozenGebouwId}` },
        });
      }
    },
    $route(to, from) {
      if (to !== from) {
        this.$store.dispatch("data/getGekozenGebouwWiki");
        this.$store.dispatch("data/getGekozenGebouwImages");
      }
    },
  },
  created() {
    if (this.$route.params.gebouw) {
      this.$store.commit("data/setGekozenGebouwId", this.$route.params.gebouw);
    } else {
      this.$store.commit("data/setGekozenGebouwId", "");
    }
  },
  computed: {
    gekozenGebouwId() {
      if (this.$store.getters["data/getGekozenGebouwId"]) {
        return this.$store.getters["data/getGekozenGebouwId"];
      } else {
        return "";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.DrieLuik {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 320px repeat(2, 1fr);
  grid-template-rows: 56px repeat(2, 8px) 1fr repeat(2, 8px) 1fr repeat(2, 8px) 1fr;
}
.paarseBalk {
  background: #455dc7;
  position: relative;
  z-index: 500;
  justify-self: stretch;
  align-self: stretch;
}
#paarseBalk1 {
  grid-row: 2 / span 2;
  grid-column: 2 / span 2;
  justify-self: stretch;
  align-self: stretch;
}
#paarseBalk2 {
  grid-row: 5 / span 2;
  grid-column: 2 / span 2;
  justify-self: stretch;
  align-self: stretch;
}
#paarseBalk3 {
  grid-row: 8 / span 2;
  grid-column: 2 / span 2;
  justify-self: stretch;
  align-self: stretch;
}

.Header {
  grid-row: 1 / span 2;
  grid-column: 1 / span 3;
  justify-self: stretch;
  align-self: stretch;
}
.Panorama {
  grid-row: 3 / span 3;
  grid-column: 1 / span 3;
  z-index: 1;
  justify-self: stretch;
  align-self: stretch;
}
.Map {
  grid-row: 6 / span 3;
  grid-column: 1 / span 3;
  justify-self: stretch;
  align-self: stretch;
}
.Carrousel {
  grid-row: 9 / span 2;
  grid-column: 1 / span 3;
  justify-self: stretch;
  align-self: stretch;
}

/* RESPONSIVENESS */

@media (min-width: 3000px) {
  
  .Header {
    padding-right: 25px;
  }

}

</style>
