# Pear Media - AI Text and Image Generation Platform

A full-stack web application that integrates multiple AI APIs to enhance user prompts, generate images, and analyze existing images. This prototype demonstrates advanced prompt engineering and multimodal AI integration.

## Project Overview

Pear Media is a sophisticated AI-powered tool that provides two distinct workflows:

1. Text Enhancement and Image Generation Workflow
2. Image Analysis and Variation Generation Workflow

The application showcases seamless integration of Google Gemini API for text/image analysis and Stability AI for advanced image generation.

## Features

### Text-to-Image Workflow

- User provides initial text prompt
- System enhances prompt using Google Gemini 2.5-Flash API with detailed styling and lighting suggestions
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

- Google Generative AI API (Gemini 2.5-Flash)
  - Text enhancement and analysis
  - Image analysis with vision capabilities
  - Detailed prompt refinement
- Stability AI API v2beta
  - SD3 image generation model
  - High-quality image synthesis
  - PNG output format support

### Environment Management

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
git clone <repository-url>
cd pear-media
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

Terminal 1 (Backend Server):

```bash
cd backend
node server.js
```

Backend will run on http://localhost:5000

Terminal 2 (Frontend Development Server):

```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:5174 (or available port)

## API Setup Instructions

### Google Generative AI (Gemini 2.5-Flash)

1. Visit https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the generated API key
4. Add to frontend/.env as VITE_GEMINI_KEY

Capabilities Used:

- Text Generation: Prompt enhancement with style and lighting details
- Vision: Image analysis with multipart requests
- Model: gemini-2.5-flash for optimal performance

### Stability AI (Image Generation)

1. Visit https://platform.stability.ai/
2. Sign up or log in
3. Navigate to API Keys section
4. Create new API key
5. Add to backend/.env as STABILITY_KEY

Capabilities Used:

- Image Generation: SD3 model for high-quality synthesis
- Output Format: PNG with configurable dimensions
- Advanced: Full multipart form-data support

## Project Structure

```
pear-media/
├── README.md
├── .env (root level)
├── .gitignore
│
├── frontend/
│   ├── .env (frontend environment variables)
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
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
│   │   └── assets/ (Static images, fonts, etc.)
│   └── public/ (Root static files)
│
└── backend/
    ├── .env (backend environment variables)
    ├── package.json
    ├── package-lock.json
    ├── server.js (Express server & routes)
    └── node_modules/
```

## Usage Guide

### Running the Application

1. Ensure both servers are running (backend on 5000, frontend on 5174)
2. Open browser at http://localhost:5174
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

**Text Enhancement (TextFlow.jsx, Line 16)**

```javascript
POST https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={VITE_GEMINI_KEY}
```

Sends user prompt to Gemini and receives enhanced version

**Image Generation (TextFlow.jsx, Line 47)**

```javascript
POST http://localhost:5000/generate-image
Body: { prompt: enhancedPrompt }
```

Sends enhanced prompt to backend for Stability AI processing

**Image Analysis (ImageFlow.jsx, Line 35)**

```javascript
POST https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={VITE_GEMINI_KEY}
```

Analyzes uploaded image with base64 encoding and multipart request

### Backend API Calls

**Stability AI Integration (server.js, Line 50-80)**

```javascript
POST https://api.stability.ai/v2beta/stable-image/generate/sd3
FormData: { prompt, model: 'sd3', output_format: 'png' }
Headers: { Authorization, Accept }
```

Generates images and returns PNG buffer to frontend

## Component Details

### App.jsx

- Main application shell
- Manages tab state (text/image workflows)
- Handles output image display
- Provides download functionality
- Implements split-view layout

### TextFlow.jsx

- Two-step workflow component
- Step 1: Enhance text using Gemini 2.5-Flash
- Shows enhanced text in editable textarea
- Step 2: Generate image from enhanced prompt via backend
- Loading states and error handling

### ImageFlow.jsx

- Image upload with drag-and-drop support
- Converts images to base64 for API submission
- Image analysis using Gemini vision capabilities
- Shows analysis in formatted box
- Variation generation from analysis text
- Display variations in responsive grid

### Styling

- Global variables in index.css (colors, spacing, shadows)
- Component-specific CSS (TextFlow.css, ImageFlow.css, App.css)
- Modern design patterns with gradients and transitions
- Scrollbar hiding for clean appearance
- Responsive breakpoints at 1024px and 768px

## Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

Output: dist/ folder with optimized production build

### Production Hosting

The frontend can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

Backend can be deployed to:

- Heroku
- Railway
- AWS Lambda
- DigitalOcean App Platform

## Error Handling

### Frontend Error Messages

- Missing image before upload check
- API unavailability notification
- Network timeout messages
- Invalid API response handling

### Backend Error Messages

- Missing STABILITY_KEY notification
- Stability AI error details passed to frontend
- Request validation errors
- Response parsing failures

Console logging available for debugging:

- API request/response details
- Error stack traces
- Component state changes

## Performance Considerations

### Image Generation

- Typical response time: 10-30 seconds
- Shown as "Generating..." button state
- Images stored as blob URLs (client-side only)

### API Rate Limiting

- Free tier: 50 requests/month for Gemini
- Stability AI: Varies by subscription
- Implement delays for production use

### Optimization

- CSS classes for smooth transitions
- React hooks for efficient state management
- Image blob URLs prevent memory leaks
- Hidden scrollbars reduce visual clutter

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile responsive (iOS Safari, Android Chrome)

## Troubleshooting

### "undefined API Key" Error

- Ensure .env files exist in correct directories
- Frontend: frontend/.env with VITE_GEMINI_KEY
- Backend: backend/.env with STABILITY_KEY
- Restart development servers after adding keys

### 400 Bad Request from Gemini

- Verify API key format (should start with AIza...)
- Check request body JSON structure
- Ensure proper Content-Type headers

### 404 from Image API

- Confirm Stability AI API key is valid
- Verify endpoint URL hasn't changed
- Check Accept header configuration

### Port Already in Use

- Backend: Change to different port in server.js
- Frontend: Vite automatically tries next available port
- Use netstat to find conflicting processes

## Development Notes

### Adding New Features

- New components should follow existing CSS structure
- Use CSS variables from index.css for consistency
- Update component imports in App.jsx
- Test API integration before deploying

### Code Quality

- Run linter: npm run lint (in frontend)
- Follow React best practices
- Use hooks for state management
- Add error boundaries for robustness

## Security Notes

Warning: Never commit .env files to repository

- Add to .gitignore (already included)
- Use environment variables in production
- Rotate API keys periodically
- Monitor API usage for unusual activity

## Future Enhancements

- Multiple image generation results
- Advanced filters and post-processing
- Image history and saved generations
- User authentication and storage
- Batch processing capabilities
- Additional models (DALL-E, Midjourney)
- Real-time collaboration features
- Cloud storage integration

## License

This project is provided as-is for educational purposes.

## Support & Contact

For issues or questions:

1. Check the Troubleshooting section
2. Review API documentation from providers
3. Check console logs for detailed errors
4. Verify environment variable setup

## Deployment Checklist

Before deployment:

- [ ] Both APIs have valid keys and sufficient credits
- [ ] .env files configured (never commit)
- [ ] npm run build successfully completes
- [ ] All workflows tested locally
- [ ] Error handling verified
- [ ] Landing page accessible
- [ ] Mobile responsiveness verified
- [ ] API keys rotated for production

## Assignment Completion Status

Workflow Status:

- Text Enhance: Approval: Image Generation - COMPLETE
- Image: Analysis: Variation Generation - COMPLETE

API Integration:

- Google Gemini 2.5-Flash: INTEGRATED (text & vision)
- Stability AI SD3: INTEGRATED (image generation)

UI/UX:

- Split-view layout: IMPLEMENTED
- Tab switching: IMPLEMENTED
- Responsive design: IMPLEMENTED
- Error handling: IMPLEMENTED

Documentation:

- README: COMPLETE
- Code comments: INCLUDED
- API setup guide: INCLUDED
- Troubleshooting: INCLUDED

---

Last Updated: March 29, 2026
Version: 1.0.0
