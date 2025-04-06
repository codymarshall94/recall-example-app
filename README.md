# 🗣️ Google Meet Transcript App

This is a simple [Next.js](https://nextjs.org) app that uses [Recall.ai](https://recall.ai) to transcribe a **Google Meet meeting** in real time using **meeting captions**.

No webhooks, no complex setup — just enter your API key, paste a meeting link, and watch the transcript appear.

---

##  Features

- Transcribes **Google Meet** meetings via Recall.ai
- Includes **speaker names**
- Updates transcript in **real time** (polling every 3 seconds)

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/codymarshall94/recall-example-app.git
cd recall-example-app

2. Get Your Recall API Key
Go to https://dashboard.recall.ai

Sign up or log in

Create and Copy your API Key from the dashboard

3. Configure Your Environment
Copy the example environment file:

cp .env.example .env.local
Then open .env.local and update with your own credentials:

RECALL_API_KEY=your-api-key-here
RECALL_REGION=us-east-1
RECALL_REGION is required. If unsure, it will be located on your dashboard

4. Install Dependencies
Install everything with:

npm install
5. Start the Development Server
Run the dev server locally:

npm run dev

How It Works
You paste a Google Meet URL into the input field

Clicking Start Transcription calls the /api/start-bot API route

This route:
Sends a POST request to https://${RECALL_REGION}.recall.ai/api/v1/bot/

Includes your meeting_url and required recording_config.transcript.provider.meeting_captions

Authorization is done using Token ${RECALL_API_KEY} (Your authorization token must be prefixed with "Token"

The Recall bot joins the meeting and begins capturing captions

The frontend uses setInterval to poll the /api/get-transcript endpoint every 3 seconds

The transcript (with speaker names + text) appears in real time in the UI
