from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from argostranslate import translate

app = Flask(__name__)
CORS(app)  # Permitir requests do frontend

# Rota principal que serve o frontend
@app.route('/')
def index():
    return render_template('index.html')

# Rota para traduzir texto
@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    text = data.get('text', '')
    from_lang = data.get('from', 'pt')
    to_lang = data.get('to', 'en')
    
    try:
        # Usar ArgosTranslate para traduzir o texto
        translated_text = translate.translate(text, from_lang, to_lang)
        return jsonify({'translatedText': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)