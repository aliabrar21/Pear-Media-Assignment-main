import express from "express";
import cors from "cors";
import fetch, { FormData } from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
console.log("API KEY:", process.env.STABILITY_KEY);

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("model", "sd3");
    formData.append("output_format", "png");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_KEY}`,
          Accept: "image/*"
        },
        body: formData
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Stability AI Error:", error);
      return res.status(response.status).send({ error });
    }

    const buffer = await response.arrayBuffer();
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));