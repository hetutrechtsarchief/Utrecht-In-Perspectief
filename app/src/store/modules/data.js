
import lijst from '../../assets/gebouwen.json';
import rdfstore from 'rdfstore';




export default {
  namespaced: true,
  state: {
    gebouwen: lijst,
    gekozenGebouw: {}
    ,
    gekozenGebouwWiki: {
      "images": []
    },
    vraag: 'PREFIX dc: <http://purl.org/dc/elements/1.1/>  \
PREFIX dct: <http://purl.org/dc/terms/> \
PREFIX wd: <http://www.wikidata.org/entity/> \
PREFIX edm: <http://www.europeana.eu/schemas/edm/> \
PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/> \
SELECT * WHERE { \
  ?bb dct:spatial wd:Q12013358 . \
  ?bb edm:isShownBy ?img . \
  ?bb dc:description ?description . \
  ?bb dc:rights ?rights . \
  ?bb sem:hasBeginTimeStamp ?begin . \
  BIND(year(?begin) AS ?year) . \
  ?bb sem:hasEndTimeStamp ?end . \
  ?bb dc:identifier ?catnr . \
} \
ORDER BY ?begin \
LIMIT 10 '
  },
  mutations: {
    setGekozenGebouw(state, gekozen) {
      state.gekozenGebouw = state.gebouwen[gekozen]
    },
    GET_WIKI(state, opgehaald) {
      state.gekozenGebouwWiki = opgehaald
    }
  },
  getters: {
    getGebouwen: state => {
      return state.gebouwen
    },
    getGekozenGebouw: state => {
      return state.gekozenGebouw
    },
    getGekozenGebouwWiki: state => {
      return state.gekozenGebouwWiki
    }
  },
  actions: {
    sparqlImages({ state }) {
      rdfstore.create(function (err, store) {
        store.execute('LOAD <https://data.netwerkdigitaalerfgoed.nl/hetutrechtsarchief/Beeldbank/sparql/Beeldbank>', function (err) {

          if (err) {
            store.execute(state.vraag, function (err, results) {
              if (!err) {
                console.log(results[0].s.value)
              }
            })
          }

        })
      })

    },
    setGekozenGebouwWiki({ commit, state }) {
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
          let url = data.entities[Object.keys(data.entities)[0]].sitelinks;
          fetch(
            `https://nl.wikipedia.org/w/api.php?action=query&format=json&uselang=nl&prop=extracts|description|images&titles=${url.nlwiki.title}&redirects=1&origin=*`,
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
        });
    }
  }
}
