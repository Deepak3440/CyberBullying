import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import nltk
import re
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)
CORS(app)

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Specify relative paths to the model and vectorizer files
model_file_rel_path = 'random_forest_model1.pkl'
vectorizer_file_rel_path = 'tfidf_vectorizer1.pkl'

# Construct absolute paths to the model and vectorizer files
model_file_path = os.path.join(script_dir, model_file_rel_path)
vectorizer_file_path = os.path.join(script_dir, vectorizer_file_rel_path)

# Load the model and vectorizer
model = joblib.load(model_file_path)
tfidf_vectorizer = joblib.load(vectorizer_file_path)

def preprocess_input(input_text):
    input_text = input_text.lower()
    input_text = re.sub(f"[{re.escape(string.punctuation)}]", "", input_text)

    tokens = nltk.word_tokenize(input_text)
    tokens = [word for word in tokens if word not in stopwords.words('english')]

    porter_stemmer = PorterStemmer()
    tokens = [porter_stemmer.stem(word) for word in tokens]

    return " ".join(tokens)

@app.route('/classify', methods=['GET', 'POST'])
def classify_text():
    if request.method == 'GET':
        return "GET request is allowed for testing purposes."
    try:
        data = request.json
        text = data.get('text', '')

        if not text:
            return jsonify({'error': 'No text provided in the request.'})

        preprocessed_text = preprocess_input(text)
        tfidf_result = tfidf_vectorizer.transform([preprocessed_text])
        prediction = model.predict(tfidf_result)

        if prediction == 1:
            result = "Cyberbullying"
        else:
            result = "Not Cyberbullying"

        return jsonify({'result': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
