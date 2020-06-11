<template>
  <div class="Detail">
    <Header></Header>
    <div class="Afb"></div>
    <div class="info">
      <h1>Detail over gebouw {{this.$route.params.id}}</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus impedit vero sunt hic deleniti accusantium libero fugit eum labore, excepturi doloremque asperiores consequuntur. Nemo ea perspiciatis voluptas sapiente est alias.</p>
      <button
        class="button"
        id="wiki"
        type="button"
        onclick="location.href='https://nl.wikipedia.org/wiki/Het_Utrechts_Archief'"
      >Vul dit verhaal aan op Wikipedia</button>
      <button
        class="button"
        id="archief"
        type="button"
        onclick="location.href='https://nl.wikipedia.org/wiki/Het_Utrechts_Archief'"
      >Meer in het Utrechts Archief</button>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Detail",
  components: {
    Header
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Detail {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 50px 1fr;
}
.Header {
  grid-row: 1 / span 1;
  grid-column: 1 / span 2;
}
.Afb {
  grid-row: 2 / 2;
  grid-column: 1 / span 1;
  background-color: white;
}
.info {
  grid-row: 2 / 2;
  grid-column: 2 / span 1;
  text-align: left;
  padding: 50px;
  line-height: 4em;
}
.button {
  display: block;
}

#wiki {
  background-color: #30988A;
}
#archief {
  background-color: #455dc7;
}
</style>
