import subprocess
from flask import Flask, jsonify
from database import get_vulns
from flask_cors import CORS



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
        print("🚀 React dev server started on http://localhost:9981")
    except Exception as e:
        print("⚠️  Could not start React dev server:", e)

    app.run(port=9981, debug=True)