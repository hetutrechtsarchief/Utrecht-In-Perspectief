# Data

## Wikidata query 
Query op 25 van de 36 bekende [Gebouwen.md](Gebouwen.md) uit het Saftleven uit 1684: https://w.wiki/GaT

## geojsonlint.com
* Via http://geojsonlint.com kun GeoJSON valideren en ook visualiseren op een kaart. 
* Github kan het ook zelf visualiseren: [saftleven.geojson](GeoJSON/saftleven.geojson)

## Afbeeldingen van gebouwen

Het turtle bestand (`Afbeeldingen-van-Gebouwen.ttl`) is als graph bb-wdgebouwen opgenomen in https://data.netwerkdigitaalerfgoed.nl/hetutrechtsarchief/Beeldbank/graphs, en ook via de sparqlendpoint op https://data.netwerkdigitaalerfgoed.nl/hetutrechtsarchief/Beeldbank/sparql/Beeldbank bevraagbaar. Bijvoorbeeld met de volgende query:

```SPARQL
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
SELECT * WHERE {
  ?bb dct:spatial wd:Q12013358 .
  ?bb edm:isShownBy ?img .
  ?bb dc:description ?description .
  ?bb dc:rights ?rights .
  ?bb sem:hasBeginTimeStamp ?begin .
  BIND(year(?begin) AS ?year) .
  ?bb sem:hasEndTimeStamp ?end .
  ?bb dc:identifier ?catnr .
} 
ORDER BY ?begin
LIMIT 1000
```

## voorbeeld aanroep query vanuit PHP
```php
<?php

$wikidataID = "Q12013358";

$sparqlQueryString = "
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
SELECT * WHERE {
  ?bb dct:spatial wd:" . $wikidataID . " .
  ?bb edm:isShownBy ?img .
  ?bb dc:description ?description .
  ?bb dc:rights ?rights .
  ?bb sem:hasBeginTimeStamp ?begin .
  BIND(year(?begin) AS ?year) .
  ?bb sem:hasEndTimeStamp ?end .
  ?bb dc:identifier ?catnr .
} 
ORDER BY ?begin
LIMIT 1000
";

$endpointUrl = 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/hetutrechtsarchief/Beeldbank/services/Beeldbank/sparql';
$url = $endpointUrl . '?query=' . urlencode($sparqlQueryString) . "&format=json";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch,CURLOPT_USERAGENT,'JustMe');
$headers = [
    'Accept: application/sparql-results+json'
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec ($ch);
//var_dump($response);
curl_close ($ch);

$data = json_decode($response, true);
//print_r($data);
  
// even platslaan
$imgs = array();
foreach ($data['results']['bindings'] as $k => $v) {
  $imgs[] = array(
    "url" => "https://hetutrechtsarchief.nl/collectie/beeldmateriaal/catalogusnummer/" . $v['catnr']['value'],
    "imgurl" => $v['img']['value'],
    "jaar" => $v['year']['value'],
    "beschrijving" => $v['description']['value'],
    "rechten" => $v['rights']['value']
  );  
}

print_r($imgs);
```