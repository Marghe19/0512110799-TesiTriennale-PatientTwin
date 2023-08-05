import json
import os
import subprocess

from flask_bcrypt import Bcrypt
from flask import Flask, render_template, request, jsonify, session, send_file
from pathlib import Path
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


@app.route('/get_image_link', methods=['GET'])
def get_image_link():
    image_link = 'examples/results/patient-old5/ACE2_0.png'
    return jsonify({'link': image_link})

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


if __name__ == "__main__":
    app.run(
        port=8000,
        debug=True,
        host='localhost',
        threaded=True
    )