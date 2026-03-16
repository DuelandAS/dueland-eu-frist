export default async function handler(req, res) {

  const API_KEY = "251f0827-6d15-4702-849d-a3ceb3888b91";
  const regnr = (req.query.registreringsnummer || "").toString().trim().toUpperCase();

  if (!regnr) {
    return res.status(400).json({ error: "Mangler registreringsnummer." });
  }

  try {

    const response = await fetch(
      `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?registreringsnummer=${encodeURIComponent(regnr)}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "x-api-key": API_KEY
        }
      }
    );

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).json(data);

  } catch (error) {

    return res.status(500).json({
      error: "Proxy feil",
      details: error.message
    });

  }

}
