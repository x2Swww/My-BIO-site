from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/secret')
def secret():
    return render_template('secret.html')

@app.route('/song')
def song():
    # ส่งไฟล์เพลงจาก static/assets
    return send_from_directory('static/assets', 'song.mp3')

if __name__ == '__main__':
    app.run(debug=True)
