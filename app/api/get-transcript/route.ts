export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const botId = searchParams.get("botId");

  const url = `https://${process.env.RECALL_REGION}.recall.ai/api/v1/bot/${botId}/transcript/`;
  const options = {
    headers: {
      Authorization: `Token ${process.env.RECALL_API_KEY}`,
      Accept: "application/json",
    },
  };

  const res = await fetch(url, options);

  const data = await res.json();

  console.log(data);
  return Response.json(data);
}
