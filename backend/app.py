from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from enum import Enum
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://user:password@db:5432/database"
db = SQLAlchemy(app)


class Occurrence(Enum):
    DAILY = 1
    WEEKLY = 2
    MONTHLY = 3


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"User('{self.username}')"


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    value = db.Column(db.Float, nullable=False)
    occurrence = db.Column(db.Enum(Occurrence), nullable=False)
    status = db.Column(db.Boolean, default=False)
    streak = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", backref=db.backref("todos", lazy=True))

    def __repr__(self):
        return f"Todo('{self.title}')"


@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401


@app.route("/register", methods=["POST"])
def register():
    username = request.json["username"]
    password = generate_password_hash(request.json["password"])
    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created"}), 201


@app.route("/todos", methods=["GET"])
def get_todos():
    todos = Todo.query.all()
    return jsonify([{
        "id": todo.id,
        "title": todo.title,
        "description": todo.description,
        "value": todo.value,
        "occurrence": todo.occurrence.name,
        "status": todo.status,
        "streak": todo.streak
    } for todo in todos])


@app.route("/todos", methods=["POST"])
def create_todo():
    title = request.json["title"]
    description = request.json["description"]
    value = request.json["value"]
    occurrence = Occurrence[request.json["occurrence"]]
    status = request.json["status"]
    streak = request.json["streak"]
    todo = Todo(
        title=title,
        description=description,
        value=value,
        occurrence=occurrence,
        status=status,
        streak=streak
    )
    db.session.add(todo)
    db.session.commit()
    return jsonify({"message": "Todo created"}), 201


@app.before_first_request
def setup_db():
    db.create_all()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)