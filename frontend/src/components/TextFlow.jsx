import { useState } from "react";
import "./TextFlow.css";

function TextFlow({ onImageGenerated }) {
  const [input, setInput] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const enhanceText = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Enhance this prompt for image generation with detailed style, lighting: ${input}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();
      setEnhanced(data.candidates[0].content.parts[0].text);
    } catch (err) {
      setError("Failed to enhance prompt");
      console.error(err);
    }

    setLoading(false);
  };

  const generateImage = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/generate-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: enhanced })
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to generate image");
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      if (onImageGenerated) {
        onImageGenerated(imageUrl);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="text-container">
      <textarea
        className="textarea"
        placeholder="Enter your prompt here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={enhanceText} disabled={!input || loading}>
        {loading ? "Enhancing..." : "Enhance Prompt"}
      </button>

      {error && <div className="error-message">{error}</div>}

      {enhanced && (
        <>
          <textarea
            className="textarea"
            value={enhanced}
            onChange={(e) => setEnhanced(e.target.value)}
            placeholder="Your enhanced prompt"
          />
          <button onClick={generateImage} disabled={loading}>
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </>
      )}
    </div>
  );
}

export default TextFlow;