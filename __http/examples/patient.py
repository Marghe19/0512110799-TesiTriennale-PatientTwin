import os
from datetime import datetime
from lib2to3.pytree import Base


import dgl
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import networkx as nx
import numpy as np
import joblib
from sqlalchemy import Column, Integer, create_engine, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker

import digital_patient
from our_load_data import our_load_physiology

Base = declarative_base()

class Esecuzione(Base):
    __tablename__ = 'esecuzioni'

    id = Column(Integer, primary_key=True)
    numero = Column(Integer)
    timestamp = Column(DateTime, default=datetime.now)
def main():

    # Crea una cartella con un timestamp come nome
    timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    result_dir = f'results/patient-old5/{timestamp}/'
    os.makedirs(result_dir)
    # create directory to save results
    #result_dir = 'results/patient-old5/'
    #if not os.path.isdir(result_dir):
     #   os.makedirs(result_dir)

    # load data
    window_size = 500
    x_train, y_train, x_test, y_test, edge_list, addendum, scaler = our_load_physiology(window_size)
    joblib.dump(scaler, f'{result_dir}scaler.joblib')
    # scaler2 = joblib.load(f'{result_dir}scaler.joblib')
    engine = create_engine('sqlite:///mydatabase.db')
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    # Ottieni il numero dell'esecuzione corrente
    numero_esecuzione = session.query(Esecuzione).count() + 1

    # Registra l'esecuzione nel database con il numero e il timestamp
    nuova_esecuzione = Esecuzione(numero=numero_esecuzione)
    session.add(nuova_esecuzione)
    session.commit()

    # instantiate a digital patient model
    G = dgl.graph(edge_list)
    dp = digital_patient.DigitalPatient(G, epochs=20, lr=0.01, window_size=window_size - 2)

    # plot the graph corresponding to the digital patient
    nx_G = dp.G.to_networkx()
    # pos = nx.circular_layout(nx_G)
    pos = nx.spring_layout(nx_G)
    node_labels = {}
    for i, cn in enumerate(list(addendum["RAS"][1]) + list(addendum["CARDIO"][1])):
        node_labels[i] = cn
    # plt.figure()
    # nx.draw(nx_G, pos, alpha=0.3)
    # nx.draw_networkx_labels(nx_G, pos, labels=node_labels)
    # plt.tight_layout()
    # plt.savefig(f'{result_dir}/graph.png')
    # plt.show()

    # instantiate the model, train and predict
    dp.fit(x_train, y_train)
    predictions = dp.predict(x_test)

    # fig, ax = plt.subplots()
    # plot_graph(nx_G, , ax)
    # plt.show()
    # return

    # plot the results
    sns.set_style('whitegrid')
    # Lista per contenere i link delle immagini PNG generate
    image_links = []

    # ciclo for per le immagini PNG generate
    for i, name in enumerate(list(addendum["RAS"][1]) + list(addendum["CARDIO"][1])):
        for j in range(predictions.shape[0]):
            xi = y_test[j, :, i]
            pi = predictions[j, :, i]

            if name == 't' or name == 't2':
                continue

            if name in addendum["RAS"][1]:
                ti = addendum["RAS"][0][j]
                ylabel= 'concentration [ng/mL]'
                xlabel = 't [days]'
            else:
                ti = addendum["CARDIO"][0][j]
                ylabel= 'pressure [mmHg]'
                xlabel = 't [sec]'

            tik = np.repeat(ti, pi.shape[0])
            pik = np.hstack(pi)

            df = pd.DataFrame(np.vstack([ti[np.newaxis, :], xi[np.newaxis, :], pi]).T)
            df.to_csv(f'{result_dir}/{name}_{j}.csv')

            plt.figure()
            plt.plot(ti, xi, label='true')
            for pik in pi:
                plt.plot(ti, pik, c='r', alpha=0.2)
            # sns.lineplot(tik, pik, alpha=0.2, ci=0.9)
            # plt.fill_between(ti, pi[:, 0], pi[:, 1], alpha=0.2, label='predicted')
            plt.title(name)
            plt.legend()
            plt.ylabel(ylabel)
            plt.xlabel(xlabel)
            plt.tight_layout()
            session.close()
            plt.savefig(os.path.join(result_dir, f'{name}_{j}.png'))
            #plt.savefig(f'{result_dir}{name}_{j}.png')
            plt.show()

            #image_path = f'{result_dir}{name}_{j}.png'
            #plt.savefig(image_path)
            #plt.close()

            # Print the image path
            #print(image_path)
            break



if __name__ == '__main__':
    main()