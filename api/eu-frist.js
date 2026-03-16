export default async function handler(req, res) {

  const API_KEY = "251f0827-6d15-4702-849d-a3ceb3888b91";
  const regnr = (req.query.registreringsnummer || "").toUpperCase();

  if (!regnr) {
    return res.status(400).json({ error: "Mangler registreringsnummer." });
  }

  try {

    const url =
      `https://autosys-kjoretoy-api.atlas.vegvesen.no/kjoretoydata/api/v1/kjoretoy?registreringsnummer=${encodeURIComponent(regnr)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
        "Accept": "application/json"
      }
    });

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).json({
      status: response.status,
      ok: response.ok,
      raw: text
    });

  } catch (error) {

    return res.status(500).json({
      error: "Proxy feil",
      details: error.message
    });

  }

}
