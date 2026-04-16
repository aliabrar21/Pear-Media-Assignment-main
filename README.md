# Pear Media - AI Text and Image Generation Platform
A full-stack web application that integrates multiple AI APIs to enhance user prompts, generate images, and analyze existing images. This prototype demonstrates advanced prompt engineering and multimodal AI integration.

## Project Overview
Pear Media is a sophisticated AI-powered tool that provides two distinct workflows:

1. **Text Enhancement and Image Generation Workflow**
2. **Image Analysis and Variation Generation Workflow**

The application showcases seamless integration of Google Gemini API for text/image analysis and Stability AI for advanced image generation.

## Features
### Text-to-Image Workflow
- User provides initial text prompt
- System enhances prompt using Google Gemini 1.5-Flash API with detailed styling and lighting suggestions
- User can review and edit enhanced prompt
- Enhanced prompt is approved and sent to image generation
- Stability AI SD3 model generates high-quality images
- Download generated images with a single click

### Image-to-Variation Workflow
- Upload images from local system
- Google Gemini API analyzes image for:
  - Subject matter and objects
  - Artistic style and themes
  - Color palette and mood
  - Visual elements and composition
- System generates image variations based on analysis
- Download generated variations
- Full approval workflow with user control

### User Interface
- Modern split-view layout (Input panel on left, Output panel on right)
- Tab-based workflow switching
- Real-time error handling and user feedback
- Responsive design for multiple screen sizes
- Smooth animations and transitions
- Professional gradient header design

## Technology Stack
### Frontend
- React 19.2.4
- Vite 8.0.1 (Build tool)
- CSS3 with modern features (Grid, Flexbox, Gradients)
- ES6+ JavaScript

### Backend
- Node.js with Express.js
- ES6 modules
- CORS enabled for cross-origin requests
- JSON body parser middleware

### APIs Integrated
- **Google Generative AI API (Gemini 1.5-Flash)**
  - Text enhancement and analysis
  - Image analysis with vision capabilities
  - Detailed prompt refinement
- **Stability AI API v2beta**
  - SD3 image generation model
  - High-quality image synthesis
  - PNG output format support

## Environment Management
- Dotenv for secure API key management
- Separate .env files for frontend and backend

## Installation Guide
### Prerequisites
- Node.js 16+ and npm
- Git
- API keys:
  - Google Generative AI API key
  - Stability AI API key

### Step 1: Clone the Repository
```bash
git clone https://github.com/aliabrar21/Pear-Media-Assignment-main.git
cd Pear-Media-Assignment-main
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```
Create `.env` file in backend directory:
```
STABILITY_KEY=your_stability_api_key_here
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
```
Create `.env` file in frontend directory:
```
VITE_GEMINI_KEY=your_google_gemini_api_key_here
```

### Step 4: Start the Application
**Terminal 1 (Backend Server):**
```bash
cd backend
node server.js
```
Backend will run on `http://localhost:5000`

**Terminal 2 (Frontend Development Server):**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173` (or available port)

## API Setup Instructions
### Google Generative AI (Gemini 1.5-Flash)
1. Visit [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated API key
4. Add to `frontend/.env` as `VITE_GEMINI_KEY`

**Capabilities Used:**
- **Text Generation**: Prompt enhancement with style and lighting details
- **Vision**: Image analysis with multipart requests
- **Model**: `gemini-1.5-flash` for optimal performance

### Stability AI (Image Generation)
1. Visit [https://platform.stability.ai/](https://platform.stability.ai/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create new API key
5. Add to `backend/.env` as `STABILITY_KEY`

**Capabilities Used:**
- **Image Generation**: SD3 model for high-quality synthesis
- **Output Format**: PNG with configurable dimensions
- **Advanced**: Full multipart form-data support

## Project Structure
```
Pear-Media-Assignment-main/
├── README.md
├── .gitignore
│
├── frontend/
│   ├── .env (frontend environment variables)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx (React entry point)
│   │   ├── App.jsx (Main app component)
│   │   ├── App.css (Application styles)
│   │   ├── index.css (Global styles)
│   │   ├── components/
│   │   │   ├── TextFlow.jsx (Text enhancement & generation)
│   │   │   ├── TextFlow.css
│   │   │   ├── ImageFlow.jsx (Image upload & analysis)
│   │   │   ├── ImageFlow.css
│   │   │   └── Result.jsx
│   │   ├── utils/
│   │   │   └── api.js (API utility functions)
│   └── public/ (Root static files)
│
└── backend/
    ├── .env (backend environment variables)
    ├── package.json
    └── server.js (Express server & routes)
```

## Usage Guide
### Running the Application
1. Ensure both servers are running (backend on 5000, frontend on 5173)
2. Open browser at `http://localhost:5173`
3. Select desired workflow using tabs

### Text-to-Image Workflow
1. Navigate to "Text to Image" tab
2. Enter your creative prompt (e.g., "A futuristic city at sunset")
3. Click "Enhance Prompt" to leverage Gemini's enhancement
4. Review the enhanced version showing added style and lighting details
5. Edit if needed for personalization
6. Click "Generate Image" to create the image
7. View result in the output panel
8. Click "Download Image" to save

### Image-to-Variation Workflow
1. Navigate to "Image Processing" tab
2. Click upload area or drag-and-drop an image
3. Click "Analyze Image" to extract visual characteristics
4. Review analysis including subject, style, colors, and mood
5. Click "Generate Variations" to create similar images
6. View generated variations in the output panel
7. Download any variation to save

## API Integration Details
### Frontend API Calls
**Text Enhancement (TextFlow.jsx)**
- `POST https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={VITE_GEMINI_KEY}`
- Sends user prompt to Gemini and receives enhanced version

**Image Generation (TextFlow.jsx)**
- `POST http://localhost:5000/generate-image`
- Body: `{ prompt: enhancedPrompt }`
- Sends enhanced prompt to backend for Stability AI processing

**Image Analysis (ImageFlow.jsx)**
- `POST https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={VITE_GEMINI_KEY}`
- Analyzes uploaded image with base64 encoding and multipart request

### Backend API Calls
**Stability AI Integration (server.js)**
- `POST https://api.stability.ai/v2beta/stable-image/generate/sd3`
- FormData: `{ prompt, model: 'sd3', output_format: 'png' }`
- Headers: `{ Authorization, Accept }`
- Generates images and returns PNG buffer to frontend

## Component Details
### App.jsx
- Main application shell
- Manages tab state (text/image workflows)
- Handles output image display
- Provides download functionality
- Implements split-view layout

### TextFlow.jsx
- Two-step workflow component
- Step 1: Enhance text using Gemini 1.5-Flash
- Shows enhanced text in editable textarea
- Step 2: Generate image from enhanced prompt via backend
- Loading states and error handling

### ImageFlow.jsx
- Image upload with drag-and-drop support
- Converts images to base64 for API submission
- Image analysis using Gemini vision capabilities
- Shows analysis in formatted box
- Variation generation from analysis text

## Styling
- Global variables in `index.css` (colors, spacing, shadows)
- Component-specific CSS (`TextFlow.css`, `ImageFlow.css`, `App.css`)
- Modern design patterns with gradients and transitions
- Responsive breakpoints at 1024px and 768px

## Building for Production
**Frontend Build**
```bash
cd frontend
npm run build
```
Output: `dist/` folder with optimized production build

## Error Handling
### Frontend Error Messages
- Missing image before upload check
- API unavailability notification
- Network timeout messages
- Invalid API response handling

### Backend Error Messages
- Missing `STABILITY_KEY` notification
- Stability AI error details passed to frontend
- Request validation errors

## Security Notes
> [!IMPORTANT]
> Never commit `.env` files to the repository. They are already included in `.gitignore`. Use secret management for production deployments.

## Future Enhancements
- Multiple image generation results
- Advanced filters and post-processing
- Image history and saved generations
- User authentication and storage
- Batch processing capabilities

## License
This project is provided as-is for educational purposes.

## Support & Contact
For issues or questions, please verify your environment variable setup and check the console logs for detailed error reports.

---
**Last Updated:** April 16, 2026 | **Version:** 1.0.0
