const express = require("express");
const app = express();
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const geminiAPIKey = process.env.API_KEY;

if (!geminiAPIKey) {
  console.log("Gemini API KEY required");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: geminiAPIKey });

app.use(express.json());
app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: userMessage,
    });

    console.log("reply ::-", response);

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to get response from Gemini API." });
  }
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
