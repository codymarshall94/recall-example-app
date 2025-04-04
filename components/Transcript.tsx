"use client";

import { useEffect, useRef, useState } from "react";

type TranscriptItem = {
  speaker: string;
  words: { text: string }[];
};

export default function TranscriptDisplay() {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const startTranscription = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/start-bot", {
        method: "POST",
        body: JSON.stringify({ meetingUrl }),
      });
      const data = await res.json();
      if (!data.bot_id) {
        throw new Error("No bot ID returned");
      }

      // Start polling
      const poll = setInterval(async () => {
        const res = await fetch(`/api/get-transcript?botId=${data.bot_id}`);
        const newTranscript = await res.json();
        setTranscript(newTranscript);
      }, 3000);

      return () => clearInterval(poll);
    } catch (err: any) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [transcript]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Google Meet Transcript</h1>

      <input
        type="text"
        placeholder="Paste Google Meet URL"
        value={meetingUrl}
        onChange={(e) => setMeetingUrl(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={startTranscription}
        disabled={loading || !meetingUrl}
        className={`px-4 py-2 rounded text-white ${
          loading || !meetingUrl
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Starting...
          </span>
        ) : (
          "Start Transcription"
        )}
      </button>

      <div
        ref={scrollRef}
        className="mt-6 max-h-[400px] overflow-y-auto space-y-4"
      >
        {transcript.length === 0 ? (
          <p className="text-gray-500 text-center">
            Transcript will appear here once the meeting starts.
          </p>
        ) : (
          transcript.map((item, i) => (
            <div key={i}>
              <p className="text-sm font-semibold text-blue-600">
                {item.speaker}
              </p>
              <p className="pl-4 border-l-2 border-gray-200 text-gray-800">
                {item.words.map((w) => w.text).join(" ")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
