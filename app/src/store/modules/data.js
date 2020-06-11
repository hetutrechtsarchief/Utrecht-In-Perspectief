
import lijst from '../../assets/gebouwen.json';
export default {
  namespaced: true,
  state: {
    gebouwen: lijst,
    gekozenGebouw: {}
    ,
    gekozenGebouwWiki: {
      "images": []
    }
  },
  mutations: {
    setGekozenGebouw(state, gekozen) {
      state.gekozenGebouw = state.gebouwen[gekozen]
    },
    GET_WIKI(state, opgehaald){
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
