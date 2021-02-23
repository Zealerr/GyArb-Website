# Projektplan

## 1. Projektbeskrivning (Beskriv vad sidan ska kunna göra).
- Skapa konto.
- Logga in.
- Starta en match och spela
- Se sin statistik
## 2. Vyer (visa bildskisser på dina sidor).

## 3. Databas med ER-diagram (Bild på ER-diagram).

## 4. Arkitektur (Beskriv filer och mappar - vad gör/innehåller de?).

## 5. Restful Routes
URL(routes) | HTTP Verb | Action | Förklaring
--- | --- | --- | ---
/ | GET | start | "hem" sidan ska ha länk till spel, om inte inloggad går till logga in. 
/signup | GET | signup | visa formulär som lägger till användare
/signup | POST | create | lägg till användare
/login | GET | login | visa formulär som loggar in en användare
/login | POST | login | logga in användare
/logout | POST | logout | logga ut nuvarande användare
/user/account | GET | show | visa användarens info (endast för användaren som är inloggad)
/user/stats | GET | stats | visa användarens stats samt leaderboards med alla användare i databasen. 
/game | GET | game | spelet körs här.