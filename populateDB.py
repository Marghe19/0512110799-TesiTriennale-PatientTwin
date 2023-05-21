import mysql.connector.plugins

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    auth_plugin="caching_sha2_password",
    database="pt_db"
)

cursor = mydb.cursor()

sql_patient = "INSERT INTO patient (name, surname, CF, birth, cellular) VALUES (%s,%s,%s,%s,%s)"
values_patient =[ ("Mario", "Rossi", "DGBFHA59C30A976M", '1950-5-15', "3334050124"),
                  ("Alessandra", "Napolitano", "LVMMRW83D16I718T", '1970-11-23', "3809988012")
                  ]

sql_user = "INSERT INTO user (name, surname, username, password, email, sector, role) VALUES (%s,%s,%s,%s,%s,%s,%s)"
values_user = [ ("Francesco", "Alfieri", "f.alfieri", "passalfieri", "f.alfieri@medici.com", "cardiochirurgia", "medico"),
                ("Anna", "Scotti", "a.scotti", "passscotti", "a.scotti@admin.com", "amministrazione", "admin")

                ]

cursor.executemany(sql, values)


mydb.commit()