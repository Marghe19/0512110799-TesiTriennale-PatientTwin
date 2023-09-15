import csv
import random
import io


numero_di_righeDKD = 2499

datiDKD = [["t", "angI", "Inhibition", "Renin", "AGT", "angII", "angII_norm", "diacid", "ang17", "at1r", "at2r", "ACE2", "IR"]]
for i in range(1, numero_di_righeDKD + 1):
    t = random.uniform(0.0000000000000000, 5.0000000000000000)
    angI = random.uniform(355000000.0000000000000000, 356000000.0000000000000000)
    Inhibition = random.uniform(84.0000000000000000, 94.0000000000000000)
    Renin = random.uniform(-22000.0000000000000000, 7000.0000000000000000)
    AGT = random.uniform(894000000000000.0000000000000000, 895000000000000.0000000000000000)
    angII = random.uniform(0.0000000000000000, 8.0000000000000000)
    angII_norm = random.uniform(0.0000000000000000, 33.0000000000000000)
    diacid = random.uniform(5.0000000000000000, 70.0000000000000000)
    ang17 = random.uniform(8.0000000000000000, 116.0000000000000000)
    at1r = random.uniform(5.0000000000000000, 50.0000000000000000)
    at2r = random.uniform(1.0000000000000000, 25.0000000000000000)
    ACE2 = random.uniform(0.0000000000000000, 1.0000000000000000)
    IR = random.uniform(0.0000000000000000, 1.0000000000000000)
    datiDKD.append([t, angI, Renin, AGT, angII, angII_norm, diacid, ang17, at1r, at2r, ACE2, IR])

nome_file = 'DKD_drug-5_glu-6_infection-0_renal-normal.csv'

with open(nome_file, mode='w', newline='') as file_csv:
    writer = csv.writer(file_csv)

    # Scrive i dati nel file CSV
    for riga in datiDKD:
        writer.writerow(riga)

print(f"I dati sono stati scritti nel file {nome_file}.")
