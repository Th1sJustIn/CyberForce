import subprocess
from flask import Flask, jsonify
from database import get_vulns
from flask_cors import CORS
from scanning import vuln_analysis
from assets import scan_assets
import asyncio

app = Flask(__name__)
CORS(app)
def start_react_dev_server():
    try:
        subprocess.run(["npm", "run", "dev", "--", "--port", "9982"], cwd="./frontend")
        print("🚀 React dev server started on http://localhost:9982")
        return True
    except Exception as e:
        print("⚠️  Could not start React dev server:", e)
        return False

async def complete_scan():
    try:
        if await scan_assets():
            if await vuln_analysis():
                print("Vulnerability analysis completed")
                return True
            else:
                print("Vulnerability analysis failed")
                return False
        else:
            print("Asset scanning failed")
            return False
    except Exception as e:
        print(e)
        return False

@app.route("/vulnerabilities")
async def get_vulnerabilities():
    vulns = await get_vulns()
    return jsonify(vulns)

@app.route("/")
def index():
    # start_react_dev_server()
    return "hello world"


if __name__ == "__main__":
    try:
        result = asyncio.run(complete_scan())
        if result:
            print("Scan completed")
        else:
            print("Scan failed")
    except Exception as e:
        print("⚠️  Could not start React dev server:", e)
    
    else:
        app.run(port=9981, debug=True)