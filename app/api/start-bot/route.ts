export async function POST(req: Request) {
  const { meetingUrl } = await req.json();

  const url = `https://${process.env.RECALL_REGION}.recall.ai/api/v1/bot/`;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.RECALL_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      meeting_url: meetingUrl,
      bot_name: "Google Meet Bot",
      recording_config: {
        transcript: {
          provider: {
            meeting_captions: {},
          },
        },
      },
    }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Recall Bot creation failed:", res.status, errorText);
    return Response.json(
      { error: "Bot creation failed", status: res.status },
      { status: res.status }
    );
  }

  const data = await res.json();
  return Response.json({ bot_id: data.id });
}
