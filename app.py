from flask import Flask, render_template
import os

# Define paths
template_path = os.path.join('src', 'front_end', 'templates')
static_path = os.path.join('src', 'front_end', 'static')

# Create Flask app with correct paths
app = Flask(__name__, template_folder=template_path, static_folder=static_path)

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True, port=8000)
