import subprocess

result = subprocess.run(["nmap"], ["-p"], ["1-1000"], ["127.0.0.1"], capture_output=True, text=True)
print(result.stdout)
