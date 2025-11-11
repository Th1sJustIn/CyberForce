import subprocess
import csv
from database import add_domain_batch, add_netork_batch, unique_IPs, add_ports_batch

def create_csv(data, filename):
    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerows(data)
        file.close()
    print(f"{filename} saved")
def find_ports():
    ports = []
    open_Ips = unique_IPs()
    for open in open_Ips:
        result = subprocess.run(["nmap", "-p", "1-65535", open], capture_output=True, text=True)
        output = result.stdout

        split = output.split("\n")

        for i in range(4,len(split)-3):
            sectioned = (split[i].split(" "))
            curr = []
            for j in sectioned:
                if j != "":
                    curr.append(j)
            if curr:
                ports.append(curr)

        add_ports_batch(open, ports[1:])

def find_networks():
    Ips  = []
    result = subprocess.run(["ifconfig"], capture_output=True, text=True)
    output = result.stdout

    split = output.split("\n")
    curr = []
    second = []
    for i in range(len(split)):
        fixed = split[i].replace("\t", "")
        if fixed.__contains__(": flags"):
            if curr:
                curr.append(second)
                Ips.append(curr)
                curr = []
                second = []
            colon_pos = fixed.find(":")
            curr_ID = (fixed[:colon_pos])
            curr.append(curr_ID)
            second.append(fixed[colon_pos +2 :])
        else:
            second.append(fixed)
    add_netork_batch(Ips)

def find_domains():
    result = subprocess.run(["cat", "/etc/hosts"], capture_output=True, text=True)
    output = result.stdout
    pairs = []
    stripped = output.strip("\n")

    with open("/etc/hosts","r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            # remove inline comments
            if "#" in line:
                line = line.split("#", 1)[0].strip()
            if not line:
                continue
            parts = line.split()
            if len(parts) < 2:
                continue
            ip = parts[0]
            # remaining tokens are hostnames/aliases
            for host in parts[1:]:
                # skip stray tokens that look like option flags
                if host.startswith(":") or host == "":
                    continue
                pairs.append((ip, host))
    add_domain_batch(pairs)



try:
    find_networks()
    find_domains()
except Exception as e:
    print(e)
finally:
    find_ports()
