import mysql.connector.plugins

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    auth_plugin="caching_sha2_password",
    database="pt_db"
)

cursor = mydb.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS pt_db ")

cursor.execute("CREATE TABLE IF NOT EXISTS patient ("
               "id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, "
               "name VARCHAR(50) NOT NULL, "
               "surname VARCHAR(50) NOT NULL, "
               "CF VARCHAR(22) NOT NULL, "
               "birth DATE NOT NULL, "
               "cellular VARCHAR(12) NOT NULL)")

cursor.execute("CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, "
               "name VARCHAR(50) NOT NULL, "
               "surname VARCHAR(50) NOT NULL, "
               "username VARCHAR(50) NOT NULL, "
               "password VARCHAR(50) NOT NULL, "
               "email VARCHAR(50) NOT NULL, "
               "sector VARCHAR(255) NOT NULL,"
               "role VARCHAR(30),"
               "CHECK (role IN ('admin', 'medico')))")

cursor.execute("CREATE TABLE IF NOT EXISTS storico (id_utente INT,"
               "FOREIGN KEY (id_utente) REFERENCES user(id),"
               "id_paziente INT,"
               "FOREIGN KEY (id_paziente) REFERENCES patient(id),"
               "date DATE NOT NULL)")



