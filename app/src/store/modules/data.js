import lijst from '../../assets/gebouwen_1684.json';
// import lijst2 from '../../assets/gebouwen_1669.json';

import Bleau from "../../assets/mapStyleBleau_1669.json";
import Specht from "../../assets/mapStyleSpecht_1684.json";

let styles = {
  "Bleau": Bleau,
  "Specht": Specht
}
export default {
  namespaced: true,
  state: {
    mapStyle: styles["Bleau"],
    gebouwen: lijst,
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
      state.gekozenGebouw = state.gebouwen[gekozen];
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
    }
  },
  getters: {
    getMapStyle: state => {
      return state.mapStyle
    },
    getGebouwen: state => {
      return state.gebouwen
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
      if (state.mapStyle === styles["Bleau"]) {
        commit("setMapStyle", styles["Specht"])
      } else if (state.mapStyle === styles["Specht"]) {
        commit("setMapStyle", styles["Bleau"])
      }
    },
    getGekozenGebouwImages({ commit, state }) {
      fetch("https://data.netwerkdigitaalerfgoed.nl/hetutrechtsarchief/Beeldbank/sparql/Beeldbank?query=" + `PREFIX dc: <http://purl.org/dc/elements/1.1/>  \
      PREFIX dct: <http://purl.org/dc/terms/> \
      PREFIX wd: <http://www.wikidata.org/entity/> \
      PREFIX edm: <http://www.europeana.eu/schemas/edm/> \
      PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/> \
      SELECT * WHERE { \
        ?bb dct:spatial wd:${state.gekozenGebouw.properties.wdid} . \
        ?bb edm:isShownBy ?img . \
        ?bb dc:description ?description . \
        ?bb dc:rights ?rights . \
        ?bb sem:hasBeginTimeStamp ?begin . \
        BIND(year(?begin) AS ?year) . \
        ?bb sem:hasEndTimeStamp ?end . \
        ?bb dc:identifier ?catnr . \
      } \
      ORDER BY ?begin \
      LIMIT 15 ` ,
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
