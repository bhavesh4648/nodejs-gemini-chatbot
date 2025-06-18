const express = require("express");
const app = express();
require("dotenv").config();
const { GoogleGenAI, Modality } = require("@google/genai");

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

app.post("/generate-image", async (req, res) => {
  const userPrompt = req.body.prompt;
  if (!userPrompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: userPrompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    console.log("respomn------------", response);

    if (
      response &&
      Array.isArray(response.candidates) &&
      response.candidates[0] &&
      response.candidates[0].content &&
      Array.isArray(response.candidates[0].content.parts)
    ) {
      const parts = response.candidates[0].content.parts;
      const imagePart = parts.find(
        (part) => part.inlineData && part.inlineData.data
      );
      if (imagePart) {
        return res.json({ image: imagePart.inlineData.data });
      }
    }

    return res
      .status(500)
      .json({ error: "No image generated or unexpected response." });
  } catch (error) {
    console.error("Error generating image:", error);
    res
      .status(500)
      .json({ error: "Failed to generate image from Gemini API." });
  }
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
