import os

from flask import Flask, render_template
from pathlib import Path
import signal
from subprocess import Popen, PIPE
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder='template')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Musica.23@localhost/pt_mysql'
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