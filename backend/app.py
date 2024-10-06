from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Database setup
client = MongoClient("mongodb+srv://v83500074:9WVdMpuGWZoNuenv@cluster0.jybed.mongodb.net/?retryWrites=true&w=majority")
db = client['overlayDB']

def create_app():
    from routes import api  # Importing here to avoid circular import
    app.register_blueprint(api)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

