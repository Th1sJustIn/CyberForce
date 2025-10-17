import subprocess
import csv

def create_csv(data, filename):
    with open(filename, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerows(data)
        file.close()
    print(f"{filename} saved")
def find_ports():
    ports = []
    result = subprocess.run(["nmap", "-p", "1-65535", "127.0.0.1"], capture_output=True, text=True)
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


    create_csv(ports, "assets/ports.csv")

def find_ips():
    Ips  = [
        ["ID", "Properties"]
    ]
    result = subprocess.run(["ifconfig"], capture_output=True, text=True)
    output = result.stdout

    split = output.split("\n")
    curr = []
    for i in range(len(split)):
        fixed = split[i].replace("\t", "")
        if fixed.__contains__(": flags"):
            if curr:
                Ips.append(curr)
                curr = []
            colon_pos = fixed.find(":")
            curr_ID = (fixed[:colon_pos])
            curr.append(curr_ID)
            curr.append(fixed[colon_pos +2 :])
        else:
            curr.append(fixed)
    create_csv(Ips, "assets/ips.csv")

def find_domains():
    result = subprocess.run(["cat", "/etc/hosts"], capture_output=True, text=True)
    output = result.stdout
    print(output)

# find_ports()
# find_ips()
find_domains()
