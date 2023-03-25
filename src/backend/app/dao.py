import psycopg2

conn = psycopg2.connect(database="postgres",
                        host="127.0.0.1",
                        user="postgres",
                        password="password",
                        port="5432")
# tmp
milestones = [
    {
        "id": "1",
        "item": "Read a book."
    },
    {
        "id": "2",
        "item": "Cycle around town."
    }
]

cursor = conn.cursor()

cursor.execute("SELECT * FROM example_table")

# Closing the connection
conn.close()
