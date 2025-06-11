export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const apiKey = context.env.RESEND_API_KEY;
  const to = "moritsweba@gmail.com";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "mediaMW Kontakt <onboarding@resend.dev>",
      to,
      subject: "Neue Nachricht von deiner Website",
      reply_to: email,
      html: `
        <h2 style="color:#0a84ff;">Neue Nachricht über deine Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong><br>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="font-size:12px;color:#999;">Gesendet über das mediaMW-Website-System.</p>
      `,
    }),
  });

  return response.ok
    ? new Response("Erfolg", { status: 200 })
    : new Response("Fehler beim Senden", { status: 500 });
}
