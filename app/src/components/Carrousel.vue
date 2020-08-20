<template>
  <div class="Carrousel">
    <div id="left">
      <h1>{{gebouw.properties.label}}</h1>
      <ul id="gebouwfuncties">
        <li v-for="type in gebouw.properties.types" :key="type">{{ type }}</li>
      </ul>
      <p>Gebouwd in {{gebouw.properties.built_in}}</p>
      <!-- <p v-if="gebouw.properties.demolished_in">Verdwenen in {{gebouw.properties.demolished_in}}</p>
      <p v-if="gebouw.properties.users">Gebruikt door {{gebouw.properties.users}}</p>
      <p v-if="gebouw.properties.uses">Gebruikt voor {{gebouw.properties.uses}}</p>-->

      <router-link v-if="wiki" :to="{name: 'Detail', params:{ id:$route.params.id}}">
        <button class="button" id="meer">Ontdek meer over dit gebouw</button>
      </router-link>
    </div>
    <div id="right">
      <Carousel
        :scrollPerPage="true"
        :perPageCustom="[[480, 3], [768, 4], [1000,6]]"
        paginationActiveColor="#30988A"
        :atuoplay="true"
        :centerMode="true"
        :paginationPadding="2"
      >
        <Slide
          v-for="item in images"
          :key="item.catnr.value"
          :data-index="item.catnr.value"
          :data-name="item.catnr.value"
        >
          <img
            :src="item.img.value"
            :alt="item.description.value"
            v-tooltip.top="'Afbl. : ' + item.description.value "
          />
        </Slide>
      </Carousel>
    </div>
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
    gebouw: {},
  },
  computed: {
    gebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    },
    images() {
      return this.$store.getters["data/getImages"];
    },
    wiki() {
      return this.$store.getters["data/getGekozenGebouwWiki"];
    },
  },
  watch: {},
};
</script>

<style scoped>
.Carrousel {
  display: grid;
  grid-template-columns: 35vw 65vw;
  grid-template-rows: 1fr;
  color: #3b3f54;
  background-color: #dacbb2;
  /* overflow: hidden; */
}

#left {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  justify-self: center;
  align-self: center;
  margin: 50px;
  text-align: left;
}

#right {
  background-color: #3b3f54;
  color: #30988a;
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
  justify-self: stretch;
  align-self: stretch;
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

.VueCarousel {
}
.VueCarousel-pagination {
  bottom: 0;
}
.VueCarousel-dot-container {
  margin-top: 0 !important;
}
.VueCarousel-dot {
  margin: 0px !important;
}

.VueCarousel-inner {
}

.VueCarousel-slide {
  text-align: center;
  height: 20vh;
}

#meer {
  background-color: #30988a;
}

img {
  margin: 6px;
  /* min-height: 10vh; */
  max-height: 20vh;
  width: auto;
  /* max-width: 10vw; */
}

</style>