import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();
app.use(json());
app.use(cors());

app.post("/api/speak-ai", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an advanced, voice-activated assistant, skilled at processing transcriptions from voice inputs and providing intelligent and helpful responses.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      res.status(500).json({ message: "Error calling OpenAI API" });
    }
    const data = await response.json();
    const output = data.choices[0].message.content.trim().replace(/^\?+/, "");

    res.status(200).json(output);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

app.use((_, res) => {
  res.status(404).send("Not Found");
});

app.listen(3001, () => console.log("Server running on port 3001"));
