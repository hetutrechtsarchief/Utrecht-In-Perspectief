<template>
  <div class="Carrousel">
    <div id="left">
      <h1>{{gebouw.properties.label}}</h1>
      <p>{{gebouw.properties.types[0]}}</p>
      <p>Gebouwd in {{gebouw.properties.built_in}}</p>
      <p v-if="gebouw.properties.demolished_in">Verdwenen in {{gebouw.properties.demolished_in}}</p>
      <p v-if="gebouw.properties.users"> Gebruikt door {{gebouw.properties.users}}</p>
      <p v-if="gebouw.properties.uses">Gebruikt voor {{gebouw.properties.uses}}</p>
      
      <router-link :to="{name: 'Detail', params:{ id:$route.params.id}}">
        <button class="button" id="meer">Ontdek meer over dit gebouw</button>
      </router-link>
    </div>
    <div id="right" v-bind:style="{backgroundImage: 'url(' + gebouw.properties.image+')'}"></div>
    <img
      v-for="(image) in wiki.images"
      :key="image.title"
      :src="'http://commons.wikimedia.org/wiki/Special:FilePath/'+ image.title.substr(8).replace(/\s+/g, '_')"
      :alt="image.title.substr(8)"
    />
  </div>
</template>

<script>
export default {
  name: "Carrousel",
  state: {
    wiki: {},
    gebouw: {}
  },
  computed: {
    gebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    },
    wiki() {
      return this.$store.getters["data/getGekozenGebouwWiki"];
    }
  }

};
</script>

<style scoped>
.Carrousel {
  display: grid;
  grid-template-columns: repeat(2, 50vw);
  color: #3B3F54;
  background-color: #DACBB2;
}

h1 {
  color: #30988A;
}

#meer {
  background-color: #30988A;
}

#left {
  grid-row: 1;
  grid-column: 1;
  margin: 50px;
  text-align: left;
}
#right {
  grid-row: 1;
  grid-column: 2;
  background-color: #3B3F54;
  margin: 10px;
  align-self: stretch;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>