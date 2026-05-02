import torch
import pickle
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from core.config import Config
from core.model import SimpleLLM

app = Flask(__name__)
CORS(app)  # Разрешаем запросы с лендинга

# Глобальные переменные для модели
model = None
stoi = None
itos = None
device = 'cuda' if torch.cuda.is_available() else 'cpu'

def load_model():
    global model, stoi, itos
    print(f"[*] Загрузка модели на {device}...")
    
    if not os.path.exists(Config.vocab_path) or not os.path.exists(Config.weights_path):
        return False

    with open(Config.vocab_path, 'rb') as f:
        vocab_data = pickle.load(f)
    stoi = vocab_data['stoi']
    itos = vocab_data['itos']
    vocab_size = vocab_data['vocab_size']

    model = SimpleLLM(
        vocab_size=vocab_size,
        n_embd=Config.n_embd,
        block_size=Config.block_size,
        n_head=Config.n_head,
        n_layer=Config.n_layer,
        dropout=0,
        device=device
    ).to(device)

    model.load_state_dict(torch.load(Config.weights_path, map_location=device, weights_only=True))
    model.eval()
    print("[+] Модель успешно загружена!")
    return True

@app.route('/generate', methods=['POST'])
def generate():
    if model is None:
        if not load_model():
            return jsonify({"error": "Модель не найдена. Сначала обучите её!"}), 500

    data = request.json
    prompt = data.get('prompt', '')
    max_tokens = data.get('max_tokens', 100)
    temperature = data.get('temperature', 0.7)

    encode = lambda s: [stoi.get(c, 0) for c in s]
    decode = lambda l: ''.join([itos.get(i, '?') for i in l])

    context = torch.tensor((encode(prompt),), dtype=torch.long, device=device)
    
    # Генерация
    with torch.no_grad():
        generated_idx = model.generate(
            context, 
            max_new_tokens=max_tokens, 
            temperature=temperature, 
            top_k=10
        )[0].tolist()

    input_length = context.shape[1]
    response_text = decode(generated_idx[input_length:])
    
    return jsonify({
        "prompt": prompt,
        "response": response_text
    })

if __name__ == '__main__':
    load_model()
    print("\n[!] API запущено на http://localhost:5000")
    print("[!] Теперь лендинг может отправлять реальные запросы к модели!")
    app.run(host='0.0.0.0', port=5000)
