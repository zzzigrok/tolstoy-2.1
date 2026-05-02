import torch
import torch.nn as nn
import pickle
import os
import sys
import datetime
import time
from rich.console import Console
from core.config import Config
from core.model import SimpleLLM
from core.utils import setup_logging, get_device_info, print_banner

def chat(temperature=0.7, max_tokens=250):
    """
    Main chat interface for interacting with the trained model.
    
    Args:
        temperature (float): The generation temperature.
        max_tokens (int): The maximum number of tokens to generate.
    """
    # --- Setup ---
    logger = setup_logging("Chat", Config.log_path)
    device_info = get_device_info()
    device = device_info['device']
    ctx = device_info['ctx']
    console = Console()

    print_banner()

    if not os.path.exists(Config.vocab_path) or not os.path.exists(Config.weights_path):
        logger.error("ОШИБКА: Сначала обучите модель (train.py)!")
        return

    # --- Load Data & Model ---
    with open(Config.vocab_path, 'rb') as f:
        vocab_data = pickle.load(f)
    stoi = vocab_data['stoi']
    itos = vocab_data['itos']
    vocab_size = vocab_data['vocab_size']

    encode = lambda s: [stoi.get(c, 0) for c in s]
    decode = lambda l: ''.join([itos.get(i, '?') for i in l])

    with console.status("[bold cyan]⏳ Пробуждение нейросети и загрузка знаний...[/bold cyan]", spinner="bouncingBar"):
        model = SimpleLLM(
            vocab_size=vocab_size,
            n_embd=Config.n_embd,
            block_size=Config.block_size,
            n_head=Config.n_head,
            n_layer=Config.n_layer,
            dropout=Config.dropout,
            device=device
        ).to(device)
        
        try:
            model.load_state_dict(torch.load(Config.weights_path, map_location=device, weights_only=True))
        except Exception as e:
            logger.error(f"КРИТИЧЕСКАЯ ОШИБКА: Веса модели не соответствуют архитектуре!\n{e}")
            console.print(f"\n[bold red]ОШИБКА ЗАГРУЗКИ МОДЕЛИ:[/] {e}")
            console.print("[yellow]Совет: Убедитесь, что параметры в config.py совпадают с теми, что использовались при обучении.[/]")
            return
            
        model.eval()

        # Optimization
        if device == 'cpu':
            model = torch.ao.quantization.quantize_dynamic(
                model, {nn.Linear}, dtype=torch.qint8
            )

        try:
            # torch.compile might not be available on all platforms or versions
            model = torch.compile(model)
            logger.info("[bold green]Граф успешно скомпилирован![/bold green]")
        except Exception as e:
            logger.warning(f"⚠️ torch.compile не применился (продолжаем без него): {e}")

    logger.info(device_info['status'])
    logger.info(f"⚙️ Настройки: Температура = {temperature}, Токены = {max_tokens}")
    logger.info(f"Модель готова! Вычисления на: {device.upper()}")
    print("="*50)
    print("Введите начало фразы (или 'exit' для выхода):")

    while True:
        try:
            prompt = input("\nВы: ")
        except EOFError:
            break
            
        if prompt.lower() == 'exit': 
            break
            
        context = torch.tensor((encode(prompt),), dtype=torch.long, device=device)
        
        with console.status("[bold purple]✍️ Толстой AI размышляет...[/bold purple]", spinner="dots2"):
            generated_idx = model.generate(
                context, 
                max_new_tokens=max_tokens, 
                temperature=temperature, 
                top_k=10,
                ctx=ctx
            )[0].tolist()
        
        input_length = context.shape[1]
        response_text = decode(generated_idx[input_length:])
        
        console.print("\n[bold cyan]Толстой AI:[/bold cyan] ", end="")
        for char in response_text:
            console.print(char, end="", markup=False)
            time.sleep(0.015)
        console.print("\n")
        
        # Save History
        with open(Config.history_path, "a", encoding="utf-8") as f:
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            f.write(f"[{timestamp}] Вы:\n{prompt}\n\n")
            f.write(f"[{timestamp}] Толстой AI:\n{response_text}\n")
            f.write("-" * 50 + "\n\n")

def main():
    """Main execution function for chat."""
    temperature = 0.7
    max_tokens = 250
    if len(sys.argv) >= 3:
        try:
            temperature = float(sys.argv[1])
            max_tokens = int(sys.argv[2])
        except ValueError:
            pass
    chat(temperature, max_tokens)

if __name__ == '__main__':
    main()
