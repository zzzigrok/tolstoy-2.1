import torch
import os
import sys
import logging
import pickle
import time

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from rich.logging import RichHandler
from rich.table import Table
from contextlib import nullcontext
from collections import Counter

def setup_logging(name, log_file="data/tolstoy.log"):
    dirname = os.path.dirname(log_file)
    if dirname:
        os.makedirs(dirname, exist_ok=True)
    logging.basicConfig(
        level=logging.INFO, 
        format="%(message)s", 
        datefmt="[%X]",
        handlers=[
            RichHandler(rich_tracebacks=True, show_path=False), 
            logging.FileHandler(log_file, encoding="utf-8")
        ]
    )
    return logging.getLogger(name)

def get_device_info():
    device = 'cpu'
    device_type = 'cpu'
    autocast_dtype = torch.bfloat16
    details = {}

    if torch.cuda.is_available():
        device = 'cuda'
        device_type = 'cuda'
        autocast_dtype = torch.bfloat16 if torch.cuda.is_bf16_supported() else torch.float16
        status = "🚀 УРА! Найдена графика NVIDIA (CUDA). Взлетаем!"
        details['name'] = torch.cuda.get_device_name(0)
        details['memory_total'] = torch.cuda.get_device_properties(0).total_memory / (1024**3)
        details['memory_free'] = torch.cuda.mem_get_info()[0] / (1024**3)
    elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
        device = 'mps'
        device_type = 'mps'
        autocast_dtype = torch.float16
        status = "🚀 УРА! Найдена графика Apple Silicon (MPS). Взлетаем!"
        details['name'] = "Apple Silicon GPU"
    elif hasattr(torch, "xpu") and torch.xpu.is_available():
        device = 'xpu'
        device_type = 'xpu'
        status = "🚀 УРА! Найдена графика Intel Arc (XPU). Взлетаем!"
        details['name'] = torch.xpu.get_device_name(0)
    else:
        status = "⚠️ Дискретная графика не найдена. Используем мощные ядра CPU."
        torch.set_num_threads(os.cpu_count() or 6)
        details['name'] = "CPU"
        details['cores'] = os.cpu_count()

    ctx = torch.autocast(device_type=device_type, dtype=autocast_dtype) if device_type in ['cuda', 'cpu', 'xpu'] else nullcontext()
    
    return {
        'device': device,
        'device_type': device_type,
        'autocast_dtype': autocast_dtype,
        'ctx': ctx,
        'status': status,
        'details': details
    }

def get_data_stats(file_path):
    if not os.path.exists(file_path):
        return None
    
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    total_chars = len(text)
    unique_chars = sorted(list(set(text)))
    char_dist = Counter(text).most_common(10)
    
    return {
        'total_chars': total_chars,
        'vocab_size': len(unique_chars),
        'top_chars': char_dist
    }

def get_model_stats(model, weights_path=None):
    stats = []
    total_params = 0
    
    for name, param in model.named_parameters():
        params = param.numel()
        total_params += params
        layer_stats = {
            'name': name,
            'params': params,
            'shape': list(param.shape)
        }
        
        if weights_path and os.path.exists(weights_path):
            # We assume model is already loaded with weights for this to be accurate
            # but if we just want to analyze the file:
            layer_stats['mean'] = param.data.mean().item()
            layer_stats['std'] = param.data.std().item()
            layer_stats['min'] = param.data.min().item()
            layer_stats['max'] = param.data.max().item()
            
        stats.append(layer_stats)
        
    return stats, total_params

def benchmark_inference(model, device, iters=10, tokens_to_gen=50):
    model.eval()
    idx = torch.zeros((1, 1), dtype=torch.long, device=device)
    
    # 1. Cold Start Measure
    start_cold = time.time()
    with torch.no_grad():
        model.generate(idx, max_new_tokens=5, temperature=1.0)
    cold_time = (time.time() - start_cold) * 1000 # ms
    
    # 2. Warmup
    with torch.no_grad():
        model.generate(idx, max_new_tokens=tokens_to_gen, temperature=1.0)
    
    # 3. Benchmark Runs
    latencies = []
    torch.cuda.reset_peak_memory_stats() if torch.cuda.is_available() else None
    
    start_bench = time.time()
    for _ in range(iters):
        t0 = time.time()
        with torch.no_grad():
            model.generate(idx, max_new_tokens=tokens_to_gen, temperature=1.0)
        latencies.append((time.time() - t0) * 1000) # ms
    end_bench = time.time()
    
    total_tokens = iters * tokens_to_gen
    avg_latency_batch = sum(latencies) / iters
    tokens_per_sec = total_tokens / (end_bench - start_bench)
    ms_per_token = (avg_latency_batch / tokens_to_gen)
    
    mem_info = {}
    if torch.cuda.is_available():
        mem_info['mem_allocated'] = torch.cuda.memory_allocated() / (1024**2) # MB
        mem_info['mem_reserved'] = torch.cuda.memory_reserved() / (1024**2) # MB
        mem_info['mem_peak'] = torch.cuda.max_memory_allocated() / (1024**2) # MB
    elif hasattr(torch, "xpu") and torch.xpu.is_available():
        # XPU memory stats might vary by torch version
        try:
            mem_info['mem_allocated'] = torch.xpu.memory_allocated() / (1024**2)
        except: pass

    return {
        'tokens_per_sec': tokens_per_sec,
        'ms_per_token': ms_per_token,
        'cold_start_ms': cold_time,
        'avg_batch_ms': avg_latency_batch,
        'mem_info': mem_info,
        'total_tokens': total_tokens,
        'iters': iters
    }

def print_banner():
    RESET = "\033[0m"
    SKY = "\033[38;5;117m"
    banner = SKY + r"""
 _____       _          _                    
(_   _)     (_ )       ( )_                  
  | |   _    | |   ___ | ,_)   _    _   _    
  | | /'_`\  | | /',__)| |   /'_`\ ( ) ( )   
  | |( (_) ) | | \__, \| |_ ( (_) )| (_) |   
  (_)`\___/'(___)(____/`\__)`\___/'`\__, |   
                                   ( )_| |   
                      [ V2.1 ]     `\___/'   
""" + RESET
    print(banner)
