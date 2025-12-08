import os
import google.generativeai as genai
from dotenv import load_dotenv
from database import get_info, add_vuln
import json
import re
import webbrowser

async def vuln_analysis():
    load_dotenv()
    api_key = os.getenv("GOOGLE_API_KEY")
    genai.configure(api_key=api_key)

    ports = get_info("ports")
    domains = get_info("domains")
    network = get_info("network")
    vuln = get_info("vulnerabilities")
    print("grabbed info")

    prompt = """
    You are a cybersecurity vulnerability analysis assistant.

    Given system scan data, network information, open ports, or service configurations, analyze them and output vulnerabilities strictly in the following JSON array format:

    [
    {
        "title": "short, specific vulnerability title",
        "description": "what the issue is and why it matters (2-3 sentences max)",
        "severity": "Low | Medium | High | Critical",
        "details": "summarize technical evidence (affected IPs, ports, domains, or configs)",
        "possible_fixes": "clear, actionable remediation steps"
    }
    ]
    Components of an Attack Surface
        1. Known Assets: Web servers, APIs, cloud instances, and applications that are
        intentionally exposed.
        2. Unknown or Shadow Assets: Misconfigured services, abandoned
        subdomains, and development environments unintentionally exposed.
        3. Third-Party Dependencies: External services and APIs that could introduce
        vulnerabilities.

    Rules:
    - Always return ONLY valid JSON — no extra text, comments, or explanations.
    - The "severity" field MUST be one of these exact values: "Low", "Medium", "High", or "Critical" .
    - If no vulnerabilities are found, return an empty JSON array [].
    - Each vulnerability should be unique and concise (avoid duplicates or redundant issues).
    - Use cybersecurity language, but make it easily understandable by a non-technical person as this is supposed to be a report for a non-technical person.


    Here is the information you will be analyzing:

    These are the open domains:

    """ ,domains ,"\n\n\n Here are the open networks:\n", network, "Here are the open ports:\n", ports, "\n\nHere are the currently logged vulnerabilities. If any new vulnerability matches one already listed, do not include it in your output:", vuln

    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)

    raw = response.text.strip()

    # Remove code fences like ```json ... ```
    cleaned = re.sub(r"^```(?:json)?|```$", "", raw, flags=re.MULTILINE).strip()

    try:
        vulnerabilities = json.loads(cleaned)
        print(json.dumps(vulnerabilities, indent=2))
    except json.JSONDecodeError as e:
        print("❌ Could not parse JSON:")
        print(e)
        print(cleaned)
        return False
    else:
        if len(vulnerabilities) >= 1:
            for v in vulnerabilities:
                add_vuln(v["title"], v["description"], v["severity"], v["details"], v["possible_fixes"])
            print("Added to vulnerabilities table")
        else:
            print("Vulnerabilities table not touched")
        return True