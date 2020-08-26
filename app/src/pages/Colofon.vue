<template>
  <div class="Colofon">
    <Header></Header>
    <div class="Afb"></div>
    <div class="info">
      <h1>Colofon</h1>
      <p>Ontwerp en realisatie:</p>
      <ul>
        <li><a href="https://www.hicsuntleones.nl/">Hic Sunt Leones</a></li>
        <li><a href="https://www.uu.nl/bijzondere-collecties">Marco van Egmond, conservator Universiteitsbibliotheek Utrecht, Bijzondere Collecties</a></li>
        <li><a href="https://hetutrechtsarchief.nl/">Het Utrechts Archief</a></li>
      </ul>
      <p>De applicatie is mede mogelijk gemaakt door het <a href="https://www.mondriaanfonds.nl/">Mondriaanfonds</a></p>
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

      <button
        class="button"
        id="github"
        type="button"
        onclick="location.href='https://github.com/hetutrechtsarchief/Utrecht-Skyline'"
      >Naar de GitHub Repro</button>
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
<style scoped>
.Colofon {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 50px 1fr;
}
.Header {
  grid-row: 1 / span 1;
  grid-column: 1 / span 2;
}
.Afb {
  grid-row: 2 / 2;
  grid-column: 1 / span 1;
  background-color: white;
}
.info {
  grid-row: 2 / 2;
  grid-column: 2 / span 1;
  text-align: left;
  padding: 50px;
}

.info li {
  margin-left: 20px;
}

a {
  color: #30988A;
}

.button {
  display: block;
}

#github {
  background-color: #30988A;
}
</style>