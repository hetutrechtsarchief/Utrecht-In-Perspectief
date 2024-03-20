<template>
  <div class="Carrousel">
    <div id="left">
      <h1>{{gebouw.properties.label}}</h1>
      <p>{{gebouw.properties.description}}</p>
      <!--
      <ul v-if="gebouw.properties.types" id="gebouwfuncties">
        <li v-for="type in gebouw.properties.types" :key="type">{{ type }}</li>
      </ul>
      <p>Gebouwd in {{gebouw.properties.built_in}}</p>
      <p v-if="gebouw.properties.demolished_in">Verdwenen in {{gebouw.properties.demolished_in}}</p>
      <p v-if="gebouw.properties.users">Gebruikt door {{gebouw.properties.users}}</p>
      <p v-if="gebouw.properties.uses">Gebruikt voor {{gebouw.properties.uses}}</p>-->

      <!-- <router-link v-if="wiki" :to="{name: 'Detail', params:{ id:$route.params.id}}">
        <button class="button" id="meer">Ontdek meer over dit gebouw</button>
      </router-link> -->
      <p v-if="gebouw.properties.wikipedia" class="wikilink"><a :href="gebouw.properties.wikipedia" target="_blank" >Ontdek meer op Wikipedia</a></p>
    </div>
    <div id="right">
      <CoolLightBox
        :items="imagesList"
        :fullScreen="true"
        :index="index"
        @close="index = null"
        srcName="src"
      ></CoolLightBox>

      <Carousel
        class="images-wrapper"
        v-if="images.length >=1"
        :scrollPerPage="true"
        :perPageCustom="[[480, 3], [768, 4], [1000,6]]"
        paginationActiveColor="#30988A"
        paginationColor="#dacbb2"
        :centerMode="true"
        :paginationPadding="2"
      >
        <Slide
          v-for="(item, itemIndex) in images"
          :key="'slide'+itemIndex"
          :data-index="item.catnr ? item.catnr.value : ''"
          :data-name="item.catnr ? item.catnr.value: ''"
          :src="item.img.value"
        >
          <img
            class="image"
            :src="item.img.value"
            :key="itemIndex"
            :alt="item.description.value"
            v-tooltip.top="'Afbl. : ' + item.description.value "
            @click="setIndex(itemIndex)"
            @error="hideImage(itemIndex)"
          />
        </Slide>
      </Carousel>
      <div v-else class="replacement">Geen afbeeldingen beschikbaar</div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  name: "Carrousel",
  components: {
    Carousel,
    Slide,
    CoolLightBox,
  },
  data() {
    return {
      index: null,
    };
  },
  computed: {
    gebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    },
    images() {
      return this.$store.getters["data/getImages"];
    },
    imagesList() {
      // Specific list for CoolLightBox
      let list = [];

      if (this.$store.getters["data/getImages"].length >= 1) {
        let all = this.$store.getters["data/getImages"];
        all.forEach((element) => {
          list.push({
            src: element.img.value.replace("thumb", "download"),
            title: element.description.value,
          });
        });
      }

      return list;
    },
    wiki() {
      return this.$store.getters["data/getGekozenGebouwWiki"];
    },
  },
  methods: {
    setIndex(index) {
      this.index = index;
    },
    hideImage(itemIndex) {
      this.$store.commit("data/hideImage", itemIndex);
    }
  },
  watch: {},
};
</script>

<style scoped>

.wikilink {
  line-height: 24px;
  padding-top: 10px;
}

.wikilink a,
.wikilink a:visited,
.wikilink a:hover,
.wikilink a:active  {
  color: #fff;
  font-weight: bold;
  background-color: #30988a;
  padding: 10px;
}

.Carrousel {
  display: grid;
  grid-template-columns: 35vw 65vw;
  grid-template-rows: 1fr;
  /*color: #3b3f54;
  background-color: #dacbb2;*/
  color: #ffffff;
  background-color: #3b3f54;
  overflow-y: hidden;
  overflow-x: hidden;
}

#left {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  margin: 25px 50px 0px;
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
  margin-top: 10px;
  margin-bottom: 20px;
}

/*ul#gebouwfuncties {
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
  margin-left: 10px; 
}
ul#gebouwfuncties li:first-child {
  background-image: none;
  margin-left: 0;
  padding-left: 0px;
} */

.images-wrapper {
  margin-top: 8px !important;
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

.VueCarousel-slide {
  text-align: center;
  height: 25vh;
}
.images-wrapper{
  padding: 0;
  margin:0;
}

img {
  margin: 8px 8px 0px 0px;
  /* min-height: 10vh; */
  height: 25vh;
  width: auto;
  /* max-width: 10vw; */
}

/* RESPONSIVENESS */

@media (min-width: 3000px) {
  
  .VueCarousel-slide {
  text-align: center;
  height: 28vh;
  }

  img {
  height: 28vh;
  }
  
  #left {
    font-size: 2em;
    margin: 50px;
  }

  .button {
    font-size: 0.9em;
    margin: 50px 0px 0px 0px;
  }
  .wikilink {
    display: none;
  }
}
</style>