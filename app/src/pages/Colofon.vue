<template>
  <div class="Colofon">
    <Header></Header>
    <div class="paarseBalk" id="paarseBalk1"></div>
    <div class="Afb"></div>
    <div class="info">
      <h1>Over dit project</h1>
      <p>In de zomer van 2020 stroomt in Utrecht weer water door de hele Stadsbuitengracht, waarmee het aangezicht van Utrecht verandert. Wist je dat in de korte periode tussen 1669 en 1684 die skyline óók al drastisch veranderde? Dat had alles te maken met de desastreuze storm die in de zomer van 1674 over de stad raasde.</p>
      <h2>Ontwerp en realisatie:</h2>
      <ul>
        <li><a href="https://www.hicsuntleones.nl/">Hic Sunt Leones</a></li>
        <li><a href="https://www.uu.nl/bijzondere-collecties">Marco van Egmond, conservator Universiteitsbibliotheek Utrecht, Bijzondere Collecties</a></li>
        <li><a href="https://hetutrechtsarchief.nl/">Het Utrechts Archief</a></li>
      </ul>
      <p>De applicatie is mede mogelijk gemaakt door het <a href="https://www.mondriaanfonds.nl/">Mondriaanfonds</a>.</p>
        <h2>Cookies voor webstatistieken en onderzoek</h2>
        <p>Deze website gebruikt cookies voor onderzoek en webstatistieken. Dat doen we om te begrijpen hoe bezoekers de website gebruiken. Deze informatie helpt ons de site te verbeteren. Bijvoorbeeld door informatie aan te vullen of door het gebruikersgemak te verbeteren. Dit soort cookies heeft geen impact op uw privacy. Ze vallen daarom onder de uitzondering van de cookiebepaling in de Telecommunicatiewet. Als gevolg daarvan vragen wij geen toestemming voor het plaatsen van deze cookies.</p>
        <h2>Google Analytics</h2>
        <p>Wij gebruiken Google Analytics, een webanalyse-service die wordt aangeboden door Google Inc. (Google). Wij hebben Google Analytics privacyvriendelijk ingesteld conform de “Handleiding privacyvriendelijk instellen van Google Analytics” van de Autoriteit Persoonsgegevens van 6 maart 2018. Dit betekent dat wij een verwerkersovereenkomst met Google hebben gesloten. Daarbij zijn wij overeengekomen dat:
          <ul>
            <li>het laatste octet van het IP-adres wordt verwijderd voordat het wordt opgeslagen;</li>
            <li>de instelling “gegevens delen” is uitgezet, en</li>
            <li>wij geen gebruik maken van andere Google-diensten in combinatie met de Google Analytics-cookies.</li>
          </ul>
        </p>
        <p>Deze website gebruikt de volgende analytische cookies:
          <table>
            <tr>
              <th>Naam</th>
              <th>Geplaatst door</th>
              <th>Tijdsduur</th>
            </tr>
            <tr>
              <td>_ga</td>
              <td>.-.nl</td>
              <td>2 jaar</td>
            </tr>
            <tr>
              <td>_gid</td>
              <td>.-.nl</td>
              <td>1 dag</td>
            </tr>
            <tr>
              <td>_gat_UA-26882017-1</td>
              <td>.-.nl</td>
              <td>sessie</td>
            </tr>
          </table>
        </p>
        <p>Google kan deze informatie aan derden verschaffen als Google hiertoe wettelijk wordt verplicht, of voor zover derden de informatie namens Google verwerken. Wij hebben hier geen invloed op.</p>
        <h2>Geen trackingcookies</h2>
        <p>Trackingcookies zijn cookies die bezoekers tijdens het surfen over andere websites volgen. Deze website gebruikt geen trackingcookies. De website biedt daarom geen ondersteuning voor de DoNotTrack-instelling van browsers. Deze site houdt zich aan de in Nederland geldende wetgeving.</p>
        <h2>Hebt u bezwaar tegen cookies?</h2>
        <p>Wilt u cookies helemaal uitsluiten? Dat kan via de instellingen van uw browser (internetprogramma). Meer informatie over cookies en het uitschakelen van cookies vindt u op de website <a href="https://veiliginternetten.nl/" class="link_text" target="blank">Veiliginternetten.nl</a>.</p>
        <h2>GitHub</h2>
        <p>Dit project is gebouwd met open source software.</p>

        <button
          class="button"
          id="github"
          type="button"
          onclick="location.href='https://github.com/hetutrechtsarchief/Utrecht-Skyline'"
        >Bekijk op GitHub</button>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Colofon",
  components: {
    Header
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Colofon {
  height: 100vh;
  display: grid;
  grid-template-columns: 320px repeat(2, 1fr);;
  grid-template-rows: 56px repeat(2, 8px);
  overflow-x: hidden;
}
.Header {
  grid-row: 1 / span 2;
  grid-column: 1 / span 3;
}

.Colofon .Header .router-link-exact-active.router-link-active {
  display: none;
}
.paarseBalk {
  grid-row: 2 / span 2;
  grid-column: 2 / span 2;
  background: #455dc7;
  z-index: 10;
  justify-self: stretch;
  align-self: stretch;
}
.Afb {
  grid-row: 3 / span 4;
  grid-column: 1 / span 1;
  background: url("../assets/images/saftleven_1684_crop.jpg") no-repeat center;
  background-size: cover;
}
.info {
  grid-row: 4 / span 3;
  grid-column: 2 / span 2;
  text-align: left;
  padding: 70px 320px 70px 70px;
}

.info li {
  margin-left: 20px;
}

.Header a {
  color: #fff;
}

a {
  color: #30988A;
}

p, ul, table {
  margin: 10px 0px;
}
h2 {
  margin-top: 24px;
}

.button {
  display: block;
  margin: 20px 0px;
}

#github {
  background-color: #30988A;
}

/* RESPONSIVENESS */

@media (min-width: 3000px) {

  .info {
    font-size: 2em;
    padding: 120px 320px 120px 120px;
  }
  .info li {
    margin-left: 60px;
  }

  p, ul {
    margin: 24px 0px;
  }
  h2 {
    margin-top: 48px;
  }
  .button {
    font-size: 0.9em;
    margin: 40px 0px;
  }
}
</style>