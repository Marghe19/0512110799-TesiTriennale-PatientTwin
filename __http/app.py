import json
import os
import subprocess
from PIL import Image

from flask_bcrypt import Bcrypt
from flask import Flask, render_template, request, jsonify, session, send_file, send_from_directory
from pathlib import Path

from werkzeug.debug import console

from examples.our_load_data import our_load_physiology
from models import db, User
from config import ApplicationConfig
from flask_session import Session
from flask_cors import CORS, cross_origin

app = Flask(__name__, template_folder='template')

app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

#image_paths = []
@app.route('/api/images', methods=['POST'])
def get_image_names():
    data = request.get_json()
    timestamp = data.get('timestamp', None)
    #print('Nome cartella', timestamp);
    if timestamp:
        folder_path = os.path.join('examples/results/patient-old5', timestamp)
        print('percorso', folder_path)
        if os.path.isdir(folder_path):
            image_names = [filename for filename in os.listdir(folder_path) if filename.lower().endswith('.png')]
            #image_paths = '\n'.join([os.path.join(folder_path, img_name) for img_name in image_names])
            image_paths = '\n'.join([os.path.join(folder_path, img_name) for img_name in image_names])

            #print(image_paths)
            return (image_paths)
            #return jsonify(image_names)
    return jsonify([])

@app.route('/get_image_link', methods=['GET'])
def get_image_link():
    image_paths = ['examples/results/patient-old5/ACE2_0.png', 'examples/results/patient-old5/ang17_0.png']
    return jsonify({'image_paths': image_paths})


@app.route('/api/folders', methods=['GET'])
def get_folders():
    # Sostituisci 'path/to/your/folder' con il percorso reale in cui vengono generate le cartelle
    folder_path = 'examples/results/patient-old5'

    # Ottieni l'elenco delle cartelle con timestamp
    folders_with_timestamp = []

    for folder in os.listdir(folder_path):
        if os.path.isdir(os.path.join(folder_path, folder)):
            folder_info = {"timestamp": folder, "images": []}

            # Trova i nomi dei file di immagine nella cartella
            for file_name in os.listdir(os.path.join(folder_path, folder)):
                if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
                    folder_info["images"].append(file_name)

            folders_with_timestamp.append(folder_info)

    return jsonify(folders_with_timestamp)





@app.route('/run-python-script', methods=['GET'])
def run_python_script():
    try:
        result = subprocess.check_output(['python3', 'examples\patient.py'], stderr=subprocess.STDOUT)
        return result
    except subprocess.CalledProcessError as e:
        return str(e.output)

@app.route('/examples/<path:filename>')
def serve_static(filename):
    return send_from_directory('examples', filename)



@app.route('/')
def index():
    dir = str(Path('__http/template/index.html').parent.absolute())
    return render_template('index.html')


@app.route('/ras')
def ras():
    dir = str(Path('__http/template/ras.html').parent.absolute())
    return render_template('ras.html')


@app.route('/patient')
def patient():
    dir = str(Path('__http/template/patient.html').parent.absolute())
    return render_template('patient.html')

@app.route('/run/<command>')
def run(command):
    dir = str(Path('examples/' + command + '.py').parent.absolute())
    path = str(dir) + '/' + command + '.py'
    print(path)
    out = os.popen('python3.10 ' + path).read()
    return render_template('index.html')

@app.route('/api/start_script', methods=['GET'])
def start_script():
    try:
        result = subprocess.check_output(['python3', 'examples/patient.py'], stderr=subprocess.STDOUT)
        return result
    except subprocess.CalledProcessError as e:
        return str(e.output)

@app.route('/api/cardio', methods=['GET'])
def cardio():
    try:
        result = subprocess.check_output(['python3', 'examples/randomcsvcardio.py'], stderr=subprocess.STDOUT)
        return result
    except subprocess.CalledProcessError as e:
        return str(e.output)

@app.route('/api/dkd', methods=['GET'])
def dkd():
    try:
        result = subprocess.check_output(['python3', 'examples/rnadomcsv.py'], stderr=subprocess.STDOUT)
        return result
    except subprocess.CalledProcessError as e:
        return str(e.output)



if __name__ == "__main__":
    app.run(
        port=8000,
        debug=True,
        host='localhost',
        threaded=True
    )