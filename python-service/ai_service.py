from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from collections import Counter

app = Flask(__name__)
CORS(app)

# --- Simple frequency-based summarizer ---
def summarize_text(text, max_sentences=3):
    # Split text into sentences
    sentences = re.split(r'(?<=[.!?]) +', text)
    if len(sentences) <= max_sentences:
        return text  # short text, return as is

    # Tokenize words and compute frequency
    words = re.findall(r'\w+', text.lower())
    freq = Counter(words)

    # Score sentences
    sentence_scores = {}
    for sentence in sentences:
        sentence_words = re.findall(r'\w+', sentence.lower())
        score = sum(freq[word] for word in sentence_words)
        sentence_scores[sentence] = score

    # Pick top max_sentences sentences
    top_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:max_sentences]
    return " ".join(top_sentences)

# --- Summary endpoint ---
@app.route("/summary", methods=["POST"])
def summary():
    data = request.get_json()
    transcript = data.get("transcript", "")

    if not transcript:
        return jsonify({"summary": ""})

    try:
        summary_text = summarize_text(transcript, max_sentences=3)
        return jsonify({"summary": summary_text})
    except Exception as e:
        return jsonify({"summary": f"Error: {str(e)}"})

# --- Highlights / action items endpoint ---
@app.route("/highlights", methods=["POST"])
def highlights():
    data = request.get_json()
    transcript = data.get("transcript", "")

    if not transcript:
        return jsonify({"highlights": ""})

    try:
        # Simple highlights: sentences containing action words
        action_words = ["should", "must", "action", "decide", "assign", "follow up"]
        highlights_list = [line for line in re.split(r'(?<=[.!?]) +', transcript)
                           if any(word in line.lower() for word in action_words)]
        highlights_text = " | ".join(highlights_list)
        if not highlights_text:
            highlights_text = "No clear highlights found."
        return jsonify({"highlights": highlights_text})
    except Exception as e:
        return jsonify({"highlights": f"Error: {str(e)}"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
