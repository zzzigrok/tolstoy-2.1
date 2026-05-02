import torch
import pickle
import time
import math
from core.config import Config
from core.model import SimpleLLM
from core.utils import setup_logging, get_device_info, print_banner

def train():
    """Main training routine."""
    # --- Setup ---
    logger = setup_logging("Trainer", Config.log_path)
    device_info = get_device_info()
    device = device_info['device']
    ctx = device_info['ctx']

    print_banner()
    logger.info(device_info['status'])

    torch.manual_seed(Config.seed)

    # --- Data Loading ---
    logger.info(f"Загрузка текста из {Config.input_path}...")
    try:
        with open(Config.input_path, 'r', encoding='utf-8') as f:
            text = f.read()
    except FileNotFoundError:
        logger.error(f"Файл {Config.input_path} не найден!")
        return

    chars = sorted(list(set(text)))
    vocab_size = len(chars)

    stoi = { ch:i for i,ch in enumerate(chars) }
    itos = { i:ch for i,ch in enumerate(chars) }

    with open(Config.vocab_path, 'wb') as f:
        pickle.dump({'stoi': stoi, 'itos': itos, 'vocab_size': vocab_size}, f)
    logger.info(f"Словарь сохранен. Уникальных символов: {vocab_size}")

    encode = lambda s:[stoi.get(c, 0) for c in s]
    data = torch.tensor(encode(text), dtype=torch.long)
    n = int(0.9*len(data))
    train_data = data[:n]
    val_data = data[n:]

    # --- Data Batching ---
    def get_batch(split):
        data_split = train_data if split == 'train' else val_data
        
        # Robustness fix: ensure data is long enough for block_size
        if len(data_split) <= Config.block_size:
            logger.error(f"Ошибка: Данные {split} слишком малы для block_size={Config.block_size}. Увеличьте объем текста.")
            raise RuntimeError(f"Данные {split} слишком малы")
            
        ix = torch.randint(len(data_split) - Config.block_size, (Config.batch_size,))
        
        x = torch.stack([data_split[i:i+Config.block_size] for i in ix]).pin_memory()
        y = torch.stack([data_split[i+1:i+Config.block_size+1] for i in ix]).pin_memory()
        
        return x.to(device, non_blocking=True), y.to(device, non_blocking=True)

    # --- Model Initialization ---
    model = SimpleLLM(
        vocab_size=vocab_size,
        n_embd=Config.n_embd,
        block_size=Config.block_size,
        n_head=Config.n_head,
        n_layer=Config.n_layer,
        dropout=Config.dropout,
        device=device
    ).to(device)

    optimizer = torch.optim.AdamW(model.parameters(), lr=Config.learning_rate)

    logger.info(f"Масса мозга: {sum(p.numel() for p in model.parameters()) / 1e6:.2f} Млн параметров")

    # --- Training Loop ---
    def get_lr(it):
        if it < Config.warmup_iters:
            return Config.learning_rate * it / Config.warmup_iters
        if it > Config.max_iters:
            return Config.min_lr
        decay_ratio = (it - Config.warmup_iters) / (Config.max_iters - Config.warmup_iters)
        coeff = 0.5 * (1.0 + math.cos(math.pi * decay_ratio))
        return Config.min_lr + coeff * (Config.learning_rate - Config.min_lr)

    start_time = time.time()

    logger.info("Начало обучения...")
    try:
        for iter in range(Config.max_iters):
            lr = get_lr(iter)
            for param_group in optimizer.param_groups:
                param_group['lr'] = lr

            if iter % Config.eval_interval == 0 or iter == Config.max_iters - 1:
                model.eval()
                with torch.no_grad():
                    x_val, y_val = get_batch('val')
                    with ctx:
                        _, loss_val = model(x_val, y_val)
                    
                    elapsed_time = time.time() - start_time
                    iters_per_sec = (iter + 1) / elapsed_time if elapsed_time > 0 else 0
                    eta_mins = int(((Config.max_iters - iter) / iters_per_sec) // 60) if iters_per_sec > 0 else 0
                    logger.info(f"Шаг {iter:4d}/{Config.max_iters} | Ошибка: {loss_val.item():.4f} | LR: {lr:.2e} | Скорость: {iters_per_sec:.2f} шаг/сек | Осталось: ~{eta_mins} мин.")
                model.train()

            optimizer.zero_grad(set_to_none=True)
            for _ in range(Config.gradient_accumulation_steps):
                xb, yb = get_batch('train')
                with ctx:
                    logits, loss = model(xb, yb)
                    loss = loss / Config.gradient_accumulation_steps
                loss.backward()
            
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            optimizer.step()
    except Exception as e:
        logger.error(f"Ошибка во время обучения: {e}")
        return

    logger.info("Обучение завершено!")
    torch.save(model.state_dict(), Config.weights_path)
    logger.info(f"[bold green]Ура! Веса модели успешно сохранены в '{Config.weights_path}'[/bold green]")

def main():
    """Main execution function for train."""
    train()

if __name__ == '__main__':
    main()
