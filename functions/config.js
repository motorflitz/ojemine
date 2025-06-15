// Konfigurationsdatei für das Kontaktformular
export const CONFIG = {
  // E-Mail-Konfiguration
  RECIPIENT_EMAIL: "moritsweba@gmail.com",
  FROM_EMAIL: "mediaMW Kontakt <onboarding@resend.dev>",
  SUBJECT: "Neue Nachricht von deiner Website",
  
  // Validierungsregeln
  MAX_NAME_LENGTH: 100,
  MAX_MESSAGE_LENGTH: 5000,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Rate-Limiting (für zukünftige Implementierung)
  RATE_LIMIT: {
    MAX_REQUESTS_PER_MINUTE: 5,
    MAX_REQUESTS_PER_HOUR: 20
  },
  
  // Resend API
  RESEND_API_URL: "https://api.resend.com/emails"
};

// Hilfsfunktionen
export function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function validateInput(name, email, message) {
  const errors = [];

  // Name validieren
  if (!name || name.trim().length === 0) {
    errors.push("Name ist erforderlich");
  } else if (name.length > CONFIG.MAX_NAME_LENGTH) {
    errors.push(`Name darf maximal ${CONFIG.MAX_NAME_LENGTH} Zeichen lang sein`);
  }

  // E-Mail validieren
  if (!email || email.trim().length === 0) {
    errors.push("E-Mail ist erforderlich");
  } else if (!CONFIG.EMAIL_REGEX.test(email)) {
    errors.push("Ungültige E-Mail-Adresse");
  }

  // Nachricht validieren
  if (!message || message.trim().length === 0) {
    errors.push("Nachricht ist erforderlich");
  } else if (message.length > CONFIG.MAX_MESSAGE_LENGTH) {
    errors.push(`Nachricht darf maximal ${CONFIG.MAX_MESSAGE_LENGTH} Zeichen lang sein`);
  }

  return errors;
}

export function createEmailHtml(name, email, message) {
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br>");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color:#0a84ff; border-bottom: 2px solid #0a84ff; padding-bottom: 10px;">
        Neue Nachricht über deine Website
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 10px 0;"><strong>Name:</strong> ${escapedName}</p>
        <p style="margin: 10px 0;"><strong>E-Mail:</strong> 
          <a href="mailto:${escapedEmail}" style="color: #0a84ff;">${escapedEmail}</a>
        </p>
        <p style="margin: 10px 0;"><strong>Nachricht:</strong></p>
        <div style="background-color: white; padding: 15px; border-left: 4px solid #0a84ff; margin-top: 10px;">
          ${escapedMessage}
        </div>
      </div>
      
      <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
      
      <p style="font-size:12px; color:#6c757d; text-align: center;">
        Gesendet über das mediaMW-Website-System am ${new Date().toLocaleString('de-DE')}
      </p>
    </div>
  `;
}
