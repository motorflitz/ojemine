# mediaMW Kontaktformular

Ein sicheres, modernes Kontaktformular mit Cloudflare Pages und Resend API.

## Features

✅ **Sicherheit**
- Input-Validierung (Client & Server)
- XSS-Schutz durch HTML-Escaping
- Rate-Limiting vorbereitet
- Sichere API-Schlüssel-Verwaltung

✅ **Benutzerfreundlichkeit**
- Modernes, responsives Design
- Echtzeit-Validierung
- Loading-States und Feedback
- Zeichenzähler für Nachrichten
- Barrierefreie Formulare

✅ **Code-Qualität**
- Modulare Struktur
- Umfassende Fehlerbehandlung
- Konfigurierbare Einstellungen
- Saubere Trennung von Frontend/Backend

## Setup-Anleitung

### 1. Repository vorbereiten
```bash
git clone <repository-url>
cd kontaktformular
```

### 2. Cloudflare Pages Setup
1. Dieses Projekt bei GitHub hochladen
2. In Cloudflare Pages ein neues Projekt aus diesem Repository erstellen
3. Build-Einstellungen:
   - Framework preset: None
   - Build command: (leer lassen)
   - Build output directory: /

### 3. Environment Variables konfigurieren
Unter "Settings" → "Environment Variables":
- `RESEND_API_KEY`: Dein Resend API-Schlüssel

### 4. Konfiguration anpassen
Bearbeite `functions/config.js` für:
- E-Mail-Empfänger (`RECIPIENT_EMAIL`)
- Absender-Adresse (`FROM_EMAIL`)
- Validierungsregeln
- Rate-Limiting-Einstellungen

### 5. Deployment
- Seite wird automatisch bei Git-Push deployed
- Kontaktformular ist unter der Cloudflare Pages URL verfügbar

## Verwendung

1. Besuche die Website
2. Fülle das Kontaktformular aus
3. E-Mail wird an die konfigurierte Adresse gesendet
4. Bestätigung wird angezeigt

## Konfiguration

### E-Mail-Einstellungen
```javascript
// functions/config.js
export const CONFIG = {
  RECIPIENT_EMAIL: "deine@email.com",
  FROM_EMAIL: "Kontakt <noreply@deinedomain.com>",
  SUBJECT: "Neue Nachricht von deiner Website"
};
```

### Validierungsregeln
- Name: Max. 100 Zeichen
- E-Mail: RFC-konforme Validierung
- Nachricht: Max. 5000 Zeichen

## Sicherheitshinweise

- API-Schlüssel niemals im Code committen
- Regelmäßige Updates der Dependencies
- Rate-Limiting in Produktion aktivieren
- HTTPS immer verwenden

## Troubleshooting

### E-Mails kommen nicht an
1. Resend API-Schlüssel prüfen
2. Environment Variables in Cloudflare überprüfen
3. Spam-Ordner kontrollieren
4. Resend Dashboard für Logs checken

### Formular funktioniert nicht
1. Browser-Konsole auf Fehler prüfen
2. Cloudflare Functions Logs überprüfen
3. Network-Tab für API-Aufrufe kontrollieren

## Domain-Verifizierung

**Aktuell**: Absender ist `onboarding@resend.dev` (Testmodus)

**Für Produktion**:
1. Domain bei Resend verifizieren
2. `FROM_EMAIL` in config.js anpassen
3. SPF/DKIM Records konfigurieren

## Support

Bei Problemen:
1. Cloudflare Pages Logs prüfen
2. Resend Dashboard kontrollieren
3. GitHub Issues erstellen
