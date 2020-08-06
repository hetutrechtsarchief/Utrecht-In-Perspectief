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
    
     <carousel id="right" :per-page="1" paginationActiveColor="#30988A">
      <slide>
        Slide 1 Content
      </slide>
      <slide>
        Slide 2 Content
      </slide>
      <slide>
        Slide 3 Content
      </slide>
      <slide>
        Slide 4 Content
      </slide>
    </carousel>
    
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
  name: "Carrousel",
  components: {
    Carousel,
    Slide
  },
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
  grid-template-columns: 35vw 65vw;
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
  overflow: scroll;
}
#right {
  grid-row: 1;
  grid-column: 2;
  background-color: #3B3F54;
  margin: 0px;
  align-self: stretch;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  color: #30988A;
}

.example-slide {
    align-items: center;
    background-color: #666;
    color: #999;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    min-height: 10rem;
  }
</style>