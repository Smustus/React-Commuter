# CityTransit - Pendlaren

Pendlaren
<br>
Bakgrund
<hr>

Du är en skicklig webbutvecklare som arbetar på ett innovativt techföretag vid namn "TravelEase Solutions". Företaget har fått i uppdrag att utveckla en ny webbapp för en stor transportfirma, "CityTransit", som vill förbättra sina tjänster för resenärer i staden. CityTransit har märkt att många av deras kunder har svårt att hitta närmaste busshållplats och önskar en lösning som gör det enklare att navigera i stadens kollektivtrafik.

Din uppgift är att skapa en webbapp, kallad "Pendlaren", som hjälper användarna att snabbt och enkelt hitta närmaste busshållplats baserat på deras aktuella position. Genom att använda GPS-teknologi kan appen exakt lokalisera användarens longitud och latitud. Efter att ha fått användarens position, ska appen hämta data om närliggande hållplatser och visa dem på en karta.

När användaren väljer en specifik hållplats, ska appen visa de närmaste avgångarna för att hjälpa resenären att planera sin resa effektivt. Med "Pendlaren" vill CityTransit göra det enkelt och smidigt för resenärer att navigera i staden och förbättra deras reseupplevelse.
<br>
Hur
<hr>
Ni behöver skapa ett konto på Trafiklab här och efter det skapa ett projekt för att få en API-nyckel.
Steg
<hr>
    Hämta geolocation med geolocation API
    Gör ett API-anrop mot ReseRobot - reseplanerare med longitud och latitud.
    Låt användaren välja en hållplats och spara valet.
    Gör ett API-anrop mot ReseRobot - stolptidstabeller med id:et på hållplatsen (property extId i JSON-svaret).
    Visa avgångarna för användaren.

Level up
<hr>
Gör det möjligt att planera en resa mellan två stationer, använd reseplanerar - API:et nedan för detta.

API:er som behövs:
<hr>
Geolocation: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

ResRobot - Hållplatser nära dig: https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/nearby-stops/

ResRobot - stolptidstabeller: https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/timetables/

Level up

ResRobot - Reseplanerare: https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/route-planner/

<hr>
