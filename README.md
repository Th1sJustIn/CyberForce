# CyberForce

A vulnerability scanning and analysis tool that scans network assets, open ports, and domains, then uses AI to identify potential security vulnerabilities.

## Basic introduction

CyberForce consists of:
- **Backend (Python/Flask)**: Performs network scanning using nmap, analyzes vulnerabilities using Google's Gemini AI, and stores results in SQLite
- **Frontend (React/TypeScript)**: Dashboard for viewing scan results and vulnerabilities

## Prerequisites

- Python 3.8+ (should be available as `python3` on most systems)
- Node.js 16+ and npm (for frontend)
- nmap (installed on the host system)
- Google Gemini API key

On Debian/Ubuntu you can install required system packages with:

```bash
sudo apt update
sudo apt install -y python3 python3-venv nmap nodejs npm
```

On macOS:

```bash
brew install python nmap node
```

## Download / install

Option A — Clone the Git repository (recommended if you plan to contribute):

```bash
git clone https://github.com/Th1sJustIn/CyberForce.git
cd CyberForce
```

Option B — Download ZIP from GitHub

1. Open the repository page on GitHub (if available).
2. Click "Code" → "Download ZIP" and extract.

(Note: replace the GitHub URL above with the remote you use if different.)

## Setup

### 1. Backend Setup

Create and activate a virtual environment (recommended):

```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

The `requirements.txt` includes:
- `google-generativeai` - For AI-powered vulnerability analysis
- `requests` - HTTP library
- `python-dotenv` - Environment variable management
- `flask` and `Flask[async]` - Web framework
- `flask-cors` - CORS support

### 2. Environment Variables

Create a `.env` file in the project root with your Google Gemini API key:

```bash
GOOGLE_API_KEY=your_api_key_here
```

To get a Google Gemini API key:
1. Visit https://ai.google.dev/
2. Sign in and create an API key
3. Add it to your `.env` file

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
cd ..
```

## Running the Application

The application requires both backend and frontend to be running.

### Option 1: Run both services separately (recommended)

**Terminal 1 - Backend:**
```bash
# From project root, with virtual environment activated
python3 backend/app.py
```

The backend will:
- Scan network assets, domains, and open ports
- Analyze vulnerabilities using AI
- Start the Flask API server on http://localhost:9981

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will start on http://localhost:5173 (or the next available port)

### Option 2: Quick scan without frontend

To run just the scanning and vulnerability analysis:

```bash
python3 backend/assets.py
```

## API Endpoints

Once the backend is running, the following endpoints are available:

- `GET /` - Health check endpoint
- `GET /vulnerabilities` - Returns all discovered vulnerabilities in JSON format

Example:
```bash
curl http://localhost:9981/vulnerabilities
```

## How It Works

1. **Network Discovery**: Scans local network interfaces using `ifconfig`
2. **Domain Scanning**: Parses `/etc/hosts` for domain mappings
3. **Port Scanning**: Uses nmap to scan all ports (1-65535) on discovered IPs
4. **AI Analysis**: Sends collected data to Google Gemini AI for vulnerability analysis
5. **Storage**: Results are stored in SQLite database (`backend/cyber_db.db`)
6. **Visualization**: Frontend dashboard displays vulnerabilities with severity ratings

## Database Schema

The application uses SQLite with four tables:
- `domains` - IP to domain mappings
- `network` - Network interface information
- `ports` - Open ports and services
- `vulnerabilities` - Discovered security issues with severity and remediation steps

## Notes and safety

- Only scan hosts/networks you own or have explicit permission to test.
- This repository is a learning/demo asset. Do not use it for unauthorized scanning.

