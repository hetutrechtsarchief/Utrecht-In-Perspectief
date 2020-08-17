<template>
  <div class="Carrousel">
    <div id="left">
      <h1>{{gebouw.properties.label}}</h1>
      <ul id="gebouwfuncties">
        <li v-for="type in gebouw.properties.types" :key="type">{{ type }}</li>
      </ul>
      <p>Gebouwd in {{gebouw.properties.built_in}}</p>
      <p v-if="gebouw.properties.demolished_in">Verdwenen in {{gebouw.properties.demolished_in}}</p>
      <p v-if="gebouw.properties.users">Gebruikt door {{gebouw.properties.users}}</p>
      <p v-if="gebouw.properties.uses">Gebruikt voor {{gebouw.properties.uses}}</p>

      <router-link :to="{name: 'Detail', params:{ id:$route.params.id}}">
        <button class="button" id="meer">Ontdek meer over dit gebouw</button>
      </router-link>
    </div>

    <carousel id="right" :per-page="1" paginationActiveColor="#30988A">
      <slide v-for="item in images" :key="item">
        <img :src="item" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Carrousel",
  components: {
    Carousel,
    Slide,
  },
  state: {
    wiki: {},
    gebouw: {},
  },
  computed: {
    gebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    },
    wiki() {
      return this.$store.getters["data/getGekozenGebouwWiki"];
    },
    images() {
      return this.$store.getters["data/getImages"];
    },
  },
  watch: {},
};
</script>

<style scoped>
.Carrousel {
  display: grid;
  grid-template-columns: 35vw 65vw;
  color: #3b3f54;
  background-color: #dacbb2;
}

h1 {
  color: #30988a;
}

p {
  margin-bottom: 10px;
}

ul#gebouwfuncties {
  display: inline-block;
  margin: 10px 0;
  list-style: none;
}

ul#gebouwfuncties li {
  display: inline-block;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE0IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQgNEw3LjM3OTUxIDBMNi42MDg0IDEuNDI2NzlMOS41MDc0NSAzLjE3ODM0SDBWNC44MjE2NUg5LjUwNzQ2TDYuNjA4NCA2LjU3MzIxTDcuMzc5NTEgOEwxNCA0WiIgZmlsbD0iIzNCM0Y1NCIvPgo8L3N2Zz4K");
  background-repeat: no-repeat;
  background-position: 0 0.4em;
  padding-left: 20px;
  margin-left: 10px; /* Also needed for space (tweak if needed) */
}
ul#gebouwfuncties li:first-child {
  background-image: none;
  margin-left: 0;
  padding-left: 0px;
}

#meer {
  background-color: #30988a;
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
  background-color: #3b3f54;
  margin: 0px;
  align-self: stretch;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  color: #30988a;
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