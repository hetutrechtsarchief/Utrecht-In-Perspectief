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
  "Blaeu": "http://iiif2.hualab.nl/iiif/2/saftleven-panorama-1669.jpg/info.json",
  "Specht": "http://iiif2.hualab.nl/iiif/2/saftleven-panorama-1684.jpg/info.json"
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
    setGekozenGebouwId(state, gekozen) {
      state.gekozenGebouwId = gekozen;
    },
    GET_WIKI(state, opgehaald) {
      state.gekozenGebouwWiki = opgehaald
    },
    fillImageList(state, list) {
      state.imageList = list
    }
    ,
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
      
      let sparqlQuery = `
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX dct: <http://purl.org/dc/terms/>
        PREFIX dct: <http://purl.org/dc/terms/>   
        PREFIX wd: <http://www.wikidata.org/entity/> 
        SELECT DISTINCT * WHERE {
          <https://hetutrechtsarchief.nl/id/utrecht-in-perspectief> <https://schema.org/hasPart> ?bb .
          ?bb dct:spatial wd:${state.gekozenGebouw.properties.wdid} .
          ?bb foaf:depiction ?img .
          ?bb rdfs:label ?description .
          ?bb dct:identifier ?catnr .
          ?bb dct:date ?date .

        }
        ORDER BY ?date
        LIMIT 15
      `
      
      fetch("https://data.netwerkdigitaalerfgoed.nl/hetutrechtsarchief/Dataset/sparql/Dataset?query=" + encodeURIComponent(sparqlQuery) ,
        {
          "headers": { "accept": "application/sparql-results+json" }, "method": "GET"
        })
        .then(response => response.json())
        .then(json => {
          if (json.results) {
            commit('fillImageList', json.results.bindings)
          }
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
