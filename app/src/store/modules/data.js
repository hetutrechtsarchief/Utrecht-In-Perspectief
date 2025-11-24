import lijst69 from '../../assets/data/gebouwen_1669.json';
import lijst84 from '../../assets/data/gebouwen_1684.json';

import Blaeu from "../../assets/data/mapStyleBlaeu_1669.json";
import Specht from "../../assets/data/mapStyleSpecht_1684.json";

let datas = {
  "Blaeu": lijst69,
  "Specht": lijst84
}
let styles = {
  "Blaeu": Blaeu,
  "Specht": Specht
}
let panoramas = {
  "Blaeu": "https://iiif2.hualab.nl/iiif/2/saftleven-panorama-1669.jpg/info.json",
  "Specht": "https://iiif2.hualab.nl/iiif/2/saftleven-panorama-1684.jpg/info.json"
}
export default {
  namespaced: true,
  state: {
    data: datas["Specht"],
    panorama:  panoramas["Specht"],
    mapStyle: styles["Specht"],
    gekozenGebouwId: "",
    gekozenGebouw: {
      properties: ""
    },
    gekozenGebouwWiki: {
      "images": []
    },
    imageList: {}
  },

  mutations: {

    setGekozenGebouw(state, gekozen) {
      state.gekozenGebouw = state.data[gekozen];
    },
    hideImage(state, itemIndex) {
      state.imageList.splice(itemIndex, 1);
    },
    setGekozenGebouwId(state, gekozen) {
      state.gekozenGebouwId = gekozen;
    },
    GET_WIKI(state, opgehaald) {
      state.gekozenGebouwWiki = opgehaald
    },
    fillImageList(state, list) {
      state.imageList = list
    },
    setMapStyle(state, mapStyle) {
      state.mapStyle = mapStyle
    },
    setPanorama(state,panorama){
      state.panorama = panorama
    },
    setDataset(state,data){
      state.data = data
    }
  },
  getters: {
    getDataSet : state => {
      return state.data
    },
    getPanormaUrl: state =>{
      return state.panorama
    },
    getMapStyle: state => {
      return state.mapStyle
    },
    getGekozenGebouwId: state => {
      return state.gekozenGebouwId
    },
    getGekozenGebouw: state => {
      return state.gekozenGebouw
    },
    getGekozenGebouwWiki: state => {
      return state.gekozenGebouwWiki
    },
    getImages: state => {
      return state.imageList
    }
  },
  actions: {
    toggleMapStyle({ state, commit }) {
      if (state.mapStyle === styles["Blaeu"]) {
        commit("setMapStyle", styles["Specht"])
        commit("setPanorama", panoramas["Specht"])
        commit("setDataset", datas["Specht"])

      } else if (state.mapStyle === styles["Specht"]) {
        commit("setMapStyle", styles["Blaeu"])
        commit("setPanorama", panoramas["Blaeu"])
        commit("setDataset", datas["Blaeu"])

      }
    },
    getGekozenGebouwImages({ commit, state }) {
      const wdid = state.gekozenGebouw && state.gekozenGebouw.properties && state.gekozenGebouw.properties.wdid;
      if (!wdid) {
        commit('fillImageList', [])
        return
      }

      // Fetch the JSON file from the built/served assets.
      // NOTE: To have these JSON files available at runtime as raw .json files,
      // place them under `public/assets/data/` so they're copied to the final build.
      const base = (typeof process !== 'undefined' && process.env && process.env.BASE_URL) ? process.env.BASE_URL : '/'
      const url = `${base}assets/data/${wdid}.json`

      fetch(url, { cache: 'no-cache' })
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status} while fetching ${url}`)
          return response.json()
        })
        .then(data => {
          if (Array.isArray(data)) {
            commit('fillImageList', data)
          } else if (data && data.results && data.results.bindings) {
            commit('fillImageList', data.results.bindings)
          } else {
            commit('fillImageList', data)
          }
        })
        .catch(err => {
          console.error('Error fetching local JSON for', wdid, url, err)
          commit('fillImageList', [])
        })
    },
    getGekozenGebouwWiki({ commit, state }) {
      // Get wikipedia page from wikidata id
      fetch(
        `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${state.gekozenGebouw.properties.wdid}&sitefilter=nlwiki&props=sitelinks/urls&origin=*&format=json`,
        {
          referrerPolicy: "origin-when-cross-origin",
          method: "GET",
          mode: "cors",
          cache: "default"
        }
      )
        .then(response => response.json())
        .then(data => {
          let url = data.entities[Object.keys(data.entities)[0]].sitelinks.nlwiki;
          if (url) {
            fetch(
              `https://nl.wikipedia.org/w/api.php?action=query&format=json&uselang=nl&prop=extracts|description|images&titles=${url.title}&redirects=1&origin=*`,
              {
                referrerPolicy: "origin-when-cross-origin",
                method: "GET",
                mode: "cors",
                cache: "default"
              }
            )
              .then(response => response.json())
              .then(data => {
                commit('GET_WIKI', data.query.pages[Object.keys(data.query.pages)[0]])
              });
          } else {
            commit('GET_WIKI', "")

          }

        });
    }
  }
}
