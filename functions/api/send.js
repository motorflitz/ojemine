import { CONFIG, validateInput, createEmailHtml } from '../config.js';

export async function onRequestPost(context) {
  try {
    // API-Key prüfen
    const apiKey = context.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY nicht konfiguriert");
      return new Response(
        JSON.stringify({ error: "Server-Konfigurationsfehler" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Formulardaten extrahieren
    const formData = await context.request.formData();
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    // Input validieren
    const validationErrors = validateInput(name, email, message);
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({
          error: "Validierungsfehler",
          details: validationErrors
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // E-Mail senden
    const response = await fetch(CONFIG.RESEND_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONFIG.FROM_EMAIL,
        to: CONFIG.RECIPIENT_EMAIL,
        subject: CONFIG.SUBJECT,
        reply_to: email,
        html: createEmailHtml(name, email, message),
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Resend API Fehler:", response.status, errorData);

      return new Response(
        JSON.stringify({
          error: "E-Mail konnte nicht gesendet werden"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Erfolgreiche Antwort
    return new Response(
      JSON.stringify({
        success: true,
        message: "Nachricht erfolgreich gesendet"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("Unerwarteter Fehler:", error);
    return new Response(
      JSON.stringify({
        error: "Ein unerwarteter Fehler ist aufgetreten"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
