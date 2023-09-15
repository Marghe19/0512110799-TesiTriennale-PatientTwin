import csv
import random

numero_di_righeCARDIO = 3099

datiCARDIO = [["id", "t2", "Pra", "Prv", "Pla", "Plv", "Vra", "Vrv", "Vla", "Vlv", "Vpap", "Vpad", "Vpa", "Vpc", "Vpv", "Ppap", "Ppad", "Ppa", "Ppc", "Ppv", "Vsa", "Vsap", "Vsc", "Vsv", "Psa", "Psap", "Psc", "Psv"]]

for i in range(1, numero_di_righeCARDIO + 1):
    id = random.uniform(0.0000000000000000, 3099.0000000000000000)
    t2 = random.uniform(0.0000000000000000, 5.0000000000000000)
    Pra = random.uniform(1.0000000000000000, 6.0000000000000000)
    Prv = random.uniform(1.0000000000000000, 32.0000000000000000)
    Pla = random.uniform(5.0000000000000000, 7.0000000000000000)
    Plv = random.uniform(4.0000000000000000, 120.0000000000000000)
    Vra = random.uniform(75.0000000000000000, 108.0000000000000000)
    Vrv = random.uniform(98.0000000000000000, 183.0000000000000000)
    Vla = random.uniform(58.0000000000000000, 100.0000000000000000)
    Vlv = random.uniform(43.0000000000000000, 130.0000000000000000)
    Vpap = random.uniform(25.0000000000000000, 40.0000000000000000)
    Vpad = random.uniform(49.0000000000000000, 64.0000000000000000)
    Vpa = random.uniform(44.0000000000000000, 74.0000000000000000)
    Vpc = random.uniform(91.0000000000000000, 112.0000000000000000)
    Vpv = random.uniform(258.0000000000000000, 324.0000000000000000)
    Ppap = random.uniform(12.0000000000000000, 32.0000000000000000)
    Ppad = random.uniform(12.0000000000000000, 33.0000000000000000)
    Ppa = random.uniform(11.0000000000000000, 24.0000000000000000)
    Ppc = random.uniform(8.0000000000000000, 12.0000000000000000)
    Ppv = random.uniform(5.0000000000000000, 8.0000000000000000)
    Vsa = random.uniform(518.0000000000000000, 528.0000000000000000)
    Vsap = random.uniform(148.0000000000000000, 192.0000000000000000)
    Vsc = random.uniform(209.0000000000000000, 257.0000000000000000)
    Vsv = random.uniform(2942.0000000000000000, 2989.0000000000000000)
    Psa = random.uniform(83.0000000000000000, 115.0000000000000000)
    Psap = random.uniform(83.0000000000000000, 121.0000000000000000)
    Psc = random.uniform(31.0000000000000000, 42.0000000000000000)
    Psv = random.uniform(17.0000000000000000, 19.0000000000000000)
    datiCARDIO.append([id, t2, Pra, Prv, Pla, Plv, Vra, Vrv, Vla, Vlv, Vpap, Vpad, Vpa, Vpc, Vpv, Ppap, Ppad, Ppa, Ppc, Ppv, Vsa, Vsap, Vsc, Vsv, Psa, Psap, Psc, Psv])

nome_fileCARDIO = 'CARDIO_drug-0_glu-6_infection-0_renal-normal.csv'

with open(nome_fileCARDIO, mode='w', newline='') as file_csvCARDIO:
    writer = csv.writer(file_csvCARDIO)

    # Scrive i dati nel file CSV
    for riga in datiCARDIO:
        writer.writerow(riga)

print(f"I dati sono stati scritti nel file {nome_fileCARDIO}.")