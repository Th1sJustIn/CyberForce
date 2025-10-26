import sqlite3

def create_connection():
    conn = sqlite3.connect("cyber_db.db")
    cursor = conn.cursor()
    return conn, cursor
def initialization():
    conn, cursor = create_connection()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ports (
        ip TEXT NOT NULL,
        port TEXT NOT NULL,
        state TEXT NOT NULL,
        service TEXT NOT NULL,
        found_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(ip, port, state, service)

    )
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS network (
        ID TEXT NOT NULL,
        properties TEXT NOT NULL,
        found_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(ID, properties)

    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS domains (
        ip TEXT NOT NULL,
        domain TEXT NOT NULL,
        found_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(ip, domain)

    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS vulnerabilities (
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        severity TEXT NOT NULL,
        details TEXT NOT NULL,
        fixes TEXT NOT NULL,
        found_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.commit()
    conn.close()

def add_domain(ip, domain, cursor):
    try:
        cursor.execute("INSERT INTO domains (ip, domain) VALUES (?, ?)", (ip, domain))
    except:
        pass

def add_domain_batch(pairs):
    conn, cursor = create_connection()

    for i in pairs:
        add_domain(i[0],i[1], cursor)
    conn.commit()
    conn.close()
    print("added domain batch")

def add_network(ID, properties, cursor):
    try:
        cursor.execute("INSERT INTO network (ID, properties) VALUES (?, ?)", (ID, properties))
    except Exception as e:
        pass

def add_netork_batch(pairs):
    conn, cursor = create_connection()

    for i in pairs:
        add_network(i[0],str(i[1]), cursor)
    conn.commit()
    conn.close()
    print("added networks batch")

def add_port(ip, port, state, service, cursor):
    try:
        cursor.execute("INSERT INTO ports (ip, port, state, service) VALUES (?, ?, ?, ?)", (ip, port, state, service))
    except Exception as e:
        print (e)

def add_ports_batch(ip, ports):
    conn, cursor = create_connection()

    for i in ports:
        add_port(str(ip), str(i[0]) ,str(i[1]), str(i[2]),  cursor)
    conn.commit()
    conn.close()
    print("added ports batch")

def unique_IPs():
    polished = []
    conn, cursor = create_connection()
    cursor.execute("""
SELECT DISTINCT ip 
FROM domains 
WHERE ip NOT LIKE '255.255.255.255'
AND ip NOT LIKE '::1'
""")
    output = cursor.fetchall()
    conn.close()
    for i in output:
        polished.append(i[0])

    return polished

def get_info(table):
    final = []
    conn, cursor = create_connection()
    cursor.execute(f"SELECT * FROM {table}")
    rows = cursor.fetchall()
    conn.close()

    # Get column names from cursor.description
    columns = [desc[0] for desc in cursor.description]

    # Print header + rows
    final.append(columns)
    for row in rows:
        final.append(row)
    return str(final)

def add_vuln(title, description, severity, details, possible_fixes):
    conn, cursor = create_connection()
    cursor.execute("INSERT INTO vulnerabilities (title, description, severity, details, fixes) VALUES (?, ?, ?, ?, ?)", (title, description, severity, details, possible_fixes))
    conn.commit()
    conn.close()

initialization()

