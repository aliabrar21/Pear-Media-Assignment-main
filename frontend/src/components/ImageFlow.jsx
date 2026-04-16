import "./ImageFlow.css";
import { useState } from "react";

function ImageFlow({ onImageGenerated }) {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [variations, setVariations] = useState([]);

  // Upload image
  const handleUpload = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
      setAnalysis("");
      setError("");
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Analyze image using Gemini
  const analyzeImage = async () => {
    if (!file) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    setError("");

    const base64 = file.split(",")[1];

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Describe this image in detail: subject, style, colors, mood"
                  },
                  {
                    inline_data: {
                      mime_type: "image/jpeg",
                      data: base64
                    }
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();

      if (data.candidates) {
        setAnalysis(data.candidates[0].content.parts[0].text);
      } else {
        setError("Image analysis failed");
      }
    } catch (err) {
      setError("Error analyzing image");
      console.error(err);
    }

    setLoading(false);
  };

  // Generate image variations from analysis
  const generateVariations = async () => {
    if (!analysis) {
      setError("Please analyze image first");
      return;
    }

    setLoading(true);
    setError("");
    setVariations([]);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/generate-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: analysis })
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to generate variations");
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setVariations([imageUrl]);
      if (onImageGenerated) {
        onImageGenerated(imageUrl);
      }
    } catch (err) {
      setError("Error generating variations");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="image-container">
      <div className="upload-area">
        <label htmlFor="file-input" className="upload-label">
          <div>Click to upload or drag image</div>
          <input
            id="file-input"
            type="file"
            onChange={handleUpload}
            accept="image/*"
          />
        </label>
      </div>

      {file && (
        <div className="preview">
          <img src={file} alt="Preview" className="preview-img" />
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <button onClick={analyzeImage} disabled={!file || loading}>
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {analysis && (
        <div className="analysis-box">
          <h3>Image Analysis</h3>
          <p>{analysis}</p>
          <button onClick={generateVariations} disabled={loading}>
            {loading ? "Generating Variations..." : "Generate Variations"}
          </button>
        </div>
      )}

      {variations.length > 0 && (
        <div className="variations-box">
          <h3>Generated Variations</h3>
          <div className="variations-container">
            {variations.map((url, idx) => (
              <img key={idx} src={url} alt={`Variation ${idx + 1}`} className="variation-img" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageFlow;