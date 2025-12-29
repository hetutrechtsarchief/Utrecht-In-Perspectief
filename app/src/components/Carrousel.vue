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

      <div v-if="images.length >= 1" class="native-scroll" ref="nativeScroll"
        :class="{ grabbing: isDown }"
        @mousedown.prevent="onMouseDown"
        @mouseleave="onMouseLeave"
        @mouseup="onMouseUp"
        @mousemove.prevent="onMouseMove"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onMouseUp"
      >
        <div
          class="native-slide"
          v-for="(item, itemIndex) in images"
          :key="'slide'+itemIndex"
          :data-index="getCatnr(item)"
          :data-name="getCatnr(item)"
        >
          <img
            class="image"
            :src="getImgSrc(item)"
            :alt="getDescriptionText(item)"
            v-tooltip.top="'Afbl. : ' + getDescriptionText(item)"
            @click="onImageClick(itemIndex)"
            @error="hideImage(itemIndex)"
          />
        </div>
      </div>
      <div v-else class="replacement">Geen afbeeldingen beschikbaar</div>
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  name: "Carrousel",
  components: {
    CoolLightBox,
  },
  data() {
    return {
      index: null,
      isDown: false,
      startX: 0,
      scrollStart: 0,
      wasDragging: false,
    };
  },
  computed: {
    gebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    },
    images() {
      const imgs = this.$store.getters["data/getImages"];
      if (Array.isArray(imgs)) return imgs
      // support SPARQL-like object with bindings
      if (imgs && imgs.results && Array.isArray(imgs.results.bindings)) return imgs.results.bindings
      // support raw object with bindings property
      if (imgs && Array.isArray(imgs.bindings)) return imgs.bindings
      return []
    },
    imagesList() {
      // Specific list for CoolLightBox
      let list = [];

      const all = this.images
      if (all && all.length >= 1) {
        all.forEach((element) => {
          // Support both SPARQL binding style (element.img.value) and plain JSON (element.img as string)
          let imgVal = ''
          if (element && element.img) {
            if (typeof element.img === 'string') imgVal = element.img
            else if (element.img.value && typeof element.img.value === 'string') imgVal = element.img.value
          }
          const src = imgVal ? imgVal.replace('thumb', 'download') : ''

          let title = ''
          if (element && element.description) {
            if (typeof element.description === 'string') title = element.description
            else if (element.description.value && typeof element.description.value === 'string') title = element.description.value
          }

          list.push({ src, title })
        })
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
    ,
    getImgSrc(item) {
      if (!item) return ''
      if (typeof item.img === 'string') return item.img
      if (item.img && typeof item.img.value === 'string') return item.img.value
      return ''
    },
    getDescriptionText(item) {
      if (!item) return ''
      if (typeof item.description === 'string') return item.description
      if (item.description && typeof item.description.value === 'string') return item.description.value
      return ''
    },
    getCatnr(item) {
      if (!item) return ''
      if (typeof item.catnr === 'string') return item.catnr
      if (item.catnr && typeof item.catnr.value === 'string') return item.catnr.value
      return ''
    }
    ,
    onMouseDown(e) {
      this.isDown = true
      this.startX = e.pageX - this.$refs.nativeScroll.offsetLeft
      this.scrollStart = this.$refs.nativeScroll.scrollLeft
      this.wasDragging = false
      document.body.style.userSelect = 'none'
    },
    onMouseMove(e) {
      if (!this.isDown) return
      const x = e.pageX - this.$refs.nativeScroll.offsetLeft
      const dx = x - this.startX
      if (Math.abs(dx) > 5) this.wasDragging = true
      const walk = dx * 1
      this.$refs.nativeScroll.scrollLeft = this.scrollStart - walk
    },
    onMouseUp() {
      this.isDown = false
      document.body.style.userSelect = ''
      // keep wasDragging true a short time so click handlers can detect it
      setTimeout(() => { this.wasDragging = false }, 150)
    },
    onMouseLeave() {
      if (this.isDown) this.onMouseUp()
    },
    onTouchStart(e) {
      if (!e.touches || !e.touches.length) return
      this.isDown = true
      const touch = e.touches[0]
      this.startX = touch.pageX - this.$refs.nativeScroll.offsetLeft
      this.scrollStart = this.$refs.nativeScroll.scrollLeft
      this.wasDragging = false
    },
    onTouchMove(e) {
      if (!this.isDown) return
      const touch = e.touches[0]
      const x = touch.pageX - this.$refs.nativeScroll.offsetLeft
      const dx = x - this.startX
      if (Math.abs(dx) > 5) this.wasDragging = true
      const walk = dx * 1
      this.$refs.nativeScroll.scrollLeft = this.scrollStart - walk
    }
    ,
    onImageClick(index) {
      // Only open image if it was a genuine click/tap, not a drag
      if (this.wasDragging) return
      this.setIndex(index)
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
  /* Native horizontal scroll */
  .native-scroll {
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 8px 12px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .native-slide {
    flex: 0 0 auto;
  }

  /* hide default scrollbar in WebKit but keep scrolling */
  .native-scroll::-webkit-scrollbar { height: 8px; }
  .native-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 4px; }

</style>
