import os

from flask_bcrypt import Bcrypt
from flask import Flask, render_template, request, jsonify, session
from pathlib import Path
from models import db, User
from config import ApplicationConfig
from flask_session import Session

app = Flask(__name__, template_folder='template')

app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)

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

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods = ["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })