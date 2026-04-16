import "./App.css";
import { useState } from "react";
import TextFlow from "./components/TextFlow";
import ImageFlow from "./components/ImageFlow";

function App() {
  const [tab, setTab] = useState("text");
  const [outputImage, setOutputImage] = useState("");

  const handleImageGenerated = (imageUrl) => {
    setOutputImage(imageUrl);
  };

  const downloadImage = () => {
    if (!outputImage) return;
    const link = document.createElement("a");
    link.href = outputImage;
    link.download = `image-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Pear Media AI</h1>
        <div className="tab-container">
          <button 
            className={`tab-btn ${tab === "text" ? "active" : ""}`}
            onClick={() => { setTab("text"); setOutputImage(""); }}
          >
            Text to Image
          </button>
          <button 
            className={`tab-btn ${tab === "image" ? "active" : ""}`}
            onClick={() => { setTab("image"); setOutputImage(""); }}
          >
            Image Processing
          </button>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="left-panel">
          <h2>Input</h2>
          {tab === "text" ? (
            <TextFlow onImageGenerated={handleImageGenerated} />
          ) : (
            <ImageFlow onImageGenerated={handleImageGenerated} />
          )}
        </div>
        <div className="divider"></div>
        <div className="right-panel">
          <h2>Output</h2>
          {outputImage ? (
            <div className="output-container">
              <img src={outputImage} alt="Generated" className="output-image" />
              <button className="download-btn" onClick={downloadImage}>
                Download Image
              </button>
            </div>
          ) : (
            <div className="output-placeholder">
              Generated content will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;