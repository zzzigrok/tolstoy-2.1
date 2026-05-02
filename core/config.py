import os

class Config:
    # --- Data Path ---
    input_path = 'data/input_ru.txt'
    vocab_path = 'models/vocab.pkl'
    weights_path = 'models/model_weights.pth'
    log_path = 'data/tolstoy.log'
    history_path = 'data/chat_history.txt'

    # --- Model Architecture ---
    block_size = 256
    n_embd = 768
    n_head = 12
    n_layer = 12
    dropout = 0.2

    # --- Training Hyperparameters ---
    batch_size = 16
    gradient_accumulation_steps = 2
    max_iters = 6000
    eval_interval = 100 # Increased from 10 for less noise
    learning_rate = 6e-4
    min_lr = 6e-5
    warmup_iters = 200

    # --- Hardware ---
    seed = 42

    @classmethod
    def to_dict(cls):
        return {k: v for k, v in cls.__dict__.items() if not k.startswith('__') and not callable(v)}
