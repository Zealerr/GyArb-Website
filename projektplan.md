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

## 6. Spel funktioner idéer

- Win on 3 points? 5?

- Stoppable movement (Instead of always having to move up or down)
  >Feels better to control?
  >Adds more possible AI behaviours?

- Special events (rage quit and similar)
  >Stimulate how erratic human behavior can be

- Additional content on website (Information about the project, how to do etc.)

- More AI types
  >Might be figured out if repetitive
  >Solve by not queueing against the same AI ID several times?




