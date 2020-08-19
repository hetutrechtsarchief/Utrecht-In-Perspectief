<template>
  <div class="home">
    <Header></Header>
    <div class="colofonbutton">
      <router-link :to="{name: 'Colofon', params:{ id: this.$route.params.id}}">
        <button v-if="this.$route.name !== 'Colofon'" class="button">Colofon</button>
      </router-link>
    </div>

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
    Footer,
  },
  created() {
    this.$store.commit("data/setGekozenGebouwId", "");
    this.$store.commit("data/setGekozenGebouw", {});
  },
  watch: {
    gekozenGebouwId() {
      if (this.gekozenGebouwId) {
        this.$store.dispatch("data/getGekozenGebouwWiki");
        this.$store.dispatch("data/getGekozenGebouwImages");
        this.$router.push({
          name: "DrieLuik",
          params: { gebouw: `${this.gekozenGebouwId}` },
        });
      }
    },
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
  grid-column: 2 / span 1;
  z-index: 2;
}
.Footer {
  grid-row: 5 / 5;
  grid-column: 2 / span 1;
  z-index: 2;
}

#stylingBalk1 {
  background: #3b3f54;
  mix-blend-mode: overlay;
  z-index: 2;
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
}
#stylingBalk2 {
  background: #30988a;
  mix-blend-mode: overlay;
  z-index: 2;
  grid-row: 4 / 4;
  grid-column: 2 / 2;
}

.colofonbutton {
  grid-row: 1 / 1;
  grid-column: 3 / 3;
  z-index: 2;
  display: flex;
  justify-content: center;
}

.button {
  background-color: #3b3f54;
  margin: 0 5px 5px 5px;
}

.button:hover {
  background-color: #30988a;
}
</style>
