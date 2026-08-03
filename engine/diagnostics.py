import os
import sys
import pickle
import torch
import random
import logging

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from rich.console import Console, Group
from rich.panel import Panel
from rich.table import Table
from rich.prompt import Prompt
from rich.text import Text
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich import box

from core.config import Config
from core.model import SimpleLLM
from core.utils import get_device_info, get_model_stats, benchmark_inference, get_data_stats
from engine.evaluator import evaluate_generation_quality

logger = logging.getLogger("Manager")
console = Console()

def clear_screen():
    """Очищает консоль в зависимости от ОС."""
    os.system('cls' if os.name == 'nt' else 'clear')

def model_analysis():
    """Analyzes the model architecture and weights."""
    clear_screen()
    console.print(Panel("[bold cyan]Анализ архитектуры и весов модели[/]", border_style="cyan"))
    
    # Пытаемся загрузить vocab_size
    vocab_size = 100 
    if os.path.exists(Config.vocab_path):
        try:
            with open(Config.vocab_path, 'rb') as f:
                vocab = pickle.load(f)
                if isinstance(vocab, dict):
                    vocab_size = vocab.get('vocab_size', len(vocab.get('stoi', [])))
                else:
                    vocab_size = len(vocab)
        except Exception as e:
            logger.warning(f"Не удалось прочитать {Config.vocab_path}: {e}")
            
    device_info = get_device_info()
    model = SimpleLLM(
        vocab_size=vocab_size,
        n_embd=Config.n_embd,
        block_size=Config.block_size,
        n_head=Config.n_head,
        n_layer=Config.n_layer,
        dropout=0.0,
        device=device_info['device']
    ).to(device_info['device'])

    weights_loaded = False
    if os.path.exists(Config.weights_path):
        try:
            checkpoint = torch.load(Config.weights_path, map_location=device_info['device'], weights_only=True)
            model.load_state_dict(checkpoint)
            weights_loaded = True
        except Exception as e:
            logger.error(f"Ошибка загрузки весов: {e}")
            console.print(f"[bold red]ВНИМАНИЕ:[/] Веса не соответствуют текущей архитектуре или словарю. ({e})")

    stats, total_params = get_model_stats(model, Config.weights_path if weights_loaded else None)
    
    table = Table(title=f"Параметры модели (Всего: {total_params:,})", box=box.ROUNDED)
    table.add_column("Layer Name", style="white")
    table.add_column("Shape", style="dim")
    table.add_column("Params", justify="right")
    if weights_loaded:
        table.add_column("Mean", justify="right", style="cyan")
        table.add_column("Std", justify="right", style="magenta")
        table.add_column("Min", justify="right", style="red")
        table.add_column("Max", justify="right", style="green")

    for s in stats:
        row = [s['name'], str(s['shape']), f"{s['params']:,}"]
        if weights_loaded:
            row.extend([f"{s['mean']:.4f}", f"{s['std']:.4f}", f"{s['min']:.4f}", f"{s['max']:.4f}"])
        table.add_row(*row)

    console.print(table)
    Prompt.ask("\nНажмите Enter для продолжения")

def performance_bench():
    """Runs a performance benchmark on the model."""
    clear_screen()
    console.print(Panel("[bold cyan]Тест производительности (Inference speed)[/]", border_style="cyan"))
    
    device_info = get_device_info()
    vocab_size = 100
    if os.path.exists(Config.vocab_path):
        try:
            with open(Config.vocab_path, 'rb') as f:
                vocab = pickle.load(f)
                if isinstance(vocab, dict):
                    vocab_size = vocab.get('vocab_size', len(vocab.get('stoi', [])))
                else:
                    vocab_size = len(vocab)
        except Exception as e:
            logger.warning(f"Не удалось прочитать словарь: {e}")

    model = SimpleLLM(
        vocab_size=vocab_size,
        n_embd=Config.n_embd,
        block_size=Config.block_size,
        n_head=Config.n_head,
        n_layer=Config.n_layer,
        dropout=0.0,
        device=device_info['device']
    ).to(device_info['device'])

    if os.path.exists(Config.weights_path):
        try:
            model.load_state_dict(torch.load(Config.weights_path, map_location=device_info['device'], weights_only=True))
        except Exception as e:
            logger.error(f"Ошибка загрузки весов: {e}")
            console.print(f"[bold red]ОШИБКА:[/] Не удалось загрузить веса для бенчмарка. Проверьте совместимость архитектуры.\n({e})")
            Prompt.ask("\nНажмите Enter для возврата")
            return
    
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        transient=True,
    ) as progress:
        progress.add_task(description="Запуск расширенного бенчмарка...", total=None)
        res = benchmark_inference(model, device_info['device'])

    table = Table(title="Результаты теста производительности", box=box.ROUNDED)
    table.add_column("Метрика", style="cyan")
    table.add_column("Значение", style="white")

    table.add_row("Tokens per Second", f"{res['tokens_per_sec']:.2f} tok/s")
    table.add_row("Latency per Token", f"{res['ms_per_token']:.2f} ms")
    table.add_row("Cold Start (First call)", f"{res['cold_start_ms']:.2f} ms")
    table.add_row("Avg Batch Time", f"{res['avg_batch_ms']:.2f} ms")

    if res['mem_info']:
        table.add_row("VRAM Allocated", f"{res['mem_info'].get('mem_allocated', 0):.2f} MB")
        table.add_row("VRAM Peak", f"{res['mem_info'].get('mem_peak', 0):.2f} MB")

    console.print(table)
    console.print(f"\n[dim]Конфигурация теста: {res['iters']} итераций по {res['total_tokens'] // res['iters']} токенов[/dim]")
    Prompt.ask("\nНажмите Enter для продолжения")


def hardware_diagnostics():
    """Displays hardware diagnostics."""
    clear_screen()
    console.print(Panel("[bold cyan]Диагностика оборудования[/]", border_style="cyan"))
    
    info = get_device_info()
    details = info['details']
    
    table = Table(show_header=False, box=box.ROUNDED)
    table.add_row("Detected Device", info['device'])
    table.add_row("Device Type", info['device_type'])
    table.add_row("Autocast Dtype", str(info['autocast_dtype']))
    table.add_row("Status", info['status'])
    
    for k, v in details.items():
        val = f"{v:.2f} GB" if 'memory' in k else str(v)
        table.add_row(k.replace('_', ' ').title(), val)

    console.print(table)
    Prompt.ask("\nНажмите Enter для продолжения")

def data_stats_view():
    """Displays statistics about the dataset."""
    clear_screen()
    console.print(Panel("[bold cyan]Статистика данных (input_ru.txt)[/]", border_style="cyan"))
    
    stats = get_data_stats(Config.input_path)
    if not stats:
        logger.warning(f"Файл {Config.input_path} не найден!")
    else:
        table = Table(title="Data Distribution", box=box.ROUNDED)
        table.add_row("Total Characters", f"{stats['total_chars']:,}")
        table.add_row("Unique Tokens (Vocab)", str(stats['vocab_size']))
        console.print(table)
        
        dist_table = Table(title="Top 10 Characters", box=box.ROUNDED)
        dist_table.add_column("Char")
        dist_table.add_column("Frequency")
        for char, count in stats['top_chars']:
            display_char = repr(char)
            dist_table.add_row(display_char, str(count))
        console.print(dist_table)

    Prompt.ask("\nНажмите Enter для продолжения")

def config_view():
    """Displays the current configuration settings."""
    clear_screen()
    console.print(Panel("[bold cyan]Текущая конфигурация (Config)[/]", border_style="cyan"))
    
    config_dict = Config.to_dict()
    table = Table(show_header=True, header_style="bold magenta", box=box.ROUNDED)
    table.add_column("Параметр", style="cyan")
    table.add_column("Значение", style="white")

    for k, v in config_dict.items():
        table.add_row(k, str(v))

    console.print(table)
    Prompt.ask("\nНажмите Enter для продолжения")

def collect_prompts(count=10):
    """Алгоритм 'собиратель промпта' для генерации тестовых заданий с семантической связью."""
    # Расширенная база знаний с семантическими метками
    word_base = {
        "characters": [
            {"name": "Князь", "gen": "m", "traits": ["мрачный", "старый", "уставший", "тихий"]},
            {"name": "Офицер", "gen": "m", "traits": ["быстрый", "холодный", "уставший", "странный"]},
            {"name": "Наташа", "gen": "f", "traits": ["веселая", "яркая", "тихая", "странная"]},
            {"name": "Анна", "gen": "f", "traits": ["мрачная", "холодная", "тихая", "старая"]},
            {"name": "Граф", "gen": "m", "traits": ["старый", "веселый", "тихий", "мрачный"]},
            {"name": "Слуга", "gen": "m", "traits": ["быстрый", "тихий", "уставший", "старый"]}
        ],
        "locations": [
            {"name": "Сад", "prep": "саду", "acc": "сад", "gen": "m", "traits": ["заброшенный", "тихий", "темный", "старый"]},
            {"name": "Лес", "prep": "лесу", "acc": "лес", "gen": "m", "traits": ["густой", "темный", "холодный", "страшный"]},
            {"name": "Зал", "prep": "зале", "acc": "зал", "gen": "m", "traits": ["яркий", "шумный", "огромный", "пустой"]},
            {"name": "Деревня", "prep": "деревне", "acc": "деревню", "gen": "f", "traits": ["тихая", "маленькая", "старая", "далекая"]},
            {"name": "Кабинет", "prep": "кабинете", "acc": "кабинет", "gen": "m", "traits": ["тесный", "темный", "тихий", "старый"]}
        ],
        "items": [
            {"name": "Книга", "acc": "книгу", "case_gen": "книги", "gen": "f", "traits": ["старая", "толстая", "пыльная"]},
            {"name": "Письмо", "acc": "письмо", "case_gen": "письма", "gen": "n", "traits": ["длинное", "тайное", "странное"]},
            {"name": "Шпага", "acc": "шпагу", "case_gen": "шпаги", "gen": "f", "traits": ["острая", "старая", "блестящая"]},
            {"name": "Свеча", "acc": "свечу", "case_gen": "свечи", "gen": "f", "traits": ["тусклая", "горящая", "тонкая"]}
        ],
        "verbs": {
            "static": ["сидел", "стоял", "молчал", "ждал"],
            "action": ["взял", "заметил", "видел", "спрятал"],
            "creative": ["читал", "писал", "думал", "вспоминал"],
            "movement": ["шел", "бежал", "ехал", "возвращался"]
        },
        "adverbs": ["грустно", "тихо", "внезапно", "долго", "медленно", "спокойно", "тревожно", "задумчиво"],
        "times": ["Утро", "День", "Ночь", "Рассвет", "Закат"]
    }

    # Маппинг окончаний для всех прилагательных (эвристический)
    def get_adj_form(adj, form, target_gen="m"):
        # Упрощенная логика склонения для базового списка
        endings = {
            "m": {"nom": "ый", "prep": "ом", "acc": "ый"},
            "f": {"nom": "ая", "prep": "ой", "acc": "ую"},
            "n": {"nom": "ое", "prep": "ом", "acc": "ое"}
        }
        # Исключения для мягких основ (тихий, синий)
        if adj.endswith("ий") or adj.endswith("яя") or adj.endswith("ее"):
            endings = {
                "m": {"nom": "ий", "prep": "ем", "acc": "ий"},
                "f": {"nom": "яя", "prep": "ей", "acc": "юю"},
                "n": {"nom": "ее", "prep": "ем", "acc": "ее"}
            }
        
        base = adj[:-2]
        if form == "prep": return base + endings[target_gen]["prep"]
        if form == "acc": return base + endings[target_gen]["acc"]
        return adj

    prompts = []
    for _ in range(count):
        pattern = random.randint(1, 10)
        time = random.choice(word_base["times"])
        adv = random.choice(word_base["adverbs"])
        
        # Выбор главных сущностей
        char_obj = random.choice(word_base["characters"])
        loc_obj = random.choice(word_base["locations"])
        item_obj = random.choice(word_base["items"])
        
        char_adj = random.choice(char_obj["traits"])
        loc_adj = random.choice(loc_obj["traits"])
        item_adj = random.choice(item_obj["traits"])

        if pattern == 1:
            # {adv} в {loc_adj_prep} {loc_prep} {char_adj} {char} {verb}
            verb = random.choice(word_base["verbs"]["static"])
            if char_obj["gen"] == "f" and verb.endswith("л"): verb += "а"
            p = f"{adv.capitalize()} в {get_adj_form(loc_adj, 'prep', loc_obj['gen'])} {loc_obj['prep']} {char_adj} {char_obj['name']} {verb}"
        
        elif pattern == 2:
            # {time}. {char_adj} {char} {adv} {verb_movement} в {loc_acc}
            verb = random.choice(word_base["verbs"]["movement"])
            if char_obj["gen"] == "f" and verb.endswith("л"): verb += "а"
            p = f"{time}. {char_adj.capitalize()} {char_obj['name']} {adv} {verb} в {get_adj_form(loc_adj, 'acc', loc_obj['gen'])} {loc_obj['acc']}"
            
        elif pattern == 3:
            # В {loc_adj_prep} {loc_prep} {char} {adv} {verb_creative} {item_acc}
            verb = random.choice(word_base["verbs"]["creative"])
            if char_obj["gen"] == "f" and verb.endswith("л"): verb += "а"
            p = f"В {get_adj_form(loc_adj, 'prep', loc_obj['gen'])} {loc_obj['prep']} {char_obj['name']} {adv} {verb} {get_adj_form(item_adj, 'acc', item_obj['gen'])} {item_obj['acc']}"
            
        elif pattern == 4:
            # {char} {verb_action} {item_adj_acc} {item_acc} и {adv} {verb_static}
            verb = random.choice(word_base["verbs"]["action"])
            verb2 = random.choice(word_base["verbs"]["static"])
            if char_obj["gen"] == "f":
                if verb.endswith("л"): verb += "а"
                if verb2.endswith("л"): verb2 += "а"
            p = f"{char_obj['name']} {verb} {get_adj_form(item_adj, 'acc', item_obj['gen'])} {item_obj['acc']} и {adv} {verb2}"
            
        elif pattern == 5:
            # Когда {char} {verb_movement} в {loc_acc}, он {verb_action} {item_acc}
            v1 = random.choice(word_base["verbs"]["movement"])
            v2 = random.choice(word_base["verbs"]["action"])
            if char_obj["gen"] == "f":
                if v1.endswith("л"): v1 += "а"
                if v2.endswith("л"): v2 += "а"
            p = f"Когда {char_obj['name']} {v1} в {loc_obj['acc']}, он {v2} {item_obj['acc']}"
            
        elif pattern == 6:
            # {adv.capitalize()} {char_adj} {char} {verb_static} у {item_gen}
            verb = random.choice(word_base["verbs"]["static"])
            if char_obj["gen"] == "f" and verb.endswith("л"): verb += "а"
            p = f"{adv.capitalize()} {char_adj} {char_obj['name']} {verb} у {item_obj['case_gen']}"
            
        elif pattern == 7:
            # {time}. {adv.capitalize()} {verb_movement} {char_adj} {char}
            verb = random.choice(word_base["verbs"]["movement"])
            if char_obj["gen"] == "f" and verb.endswith("л"): verb += "а"
            p = f"{time}. {adv.capitalize()} {verb} {char_adj} {char_obj['name']}"
            
        elif pattern == 8:
            # В {loc_prep} {verb_static} {char_adj} {char} и {adv} думал
            verb = random.choice(word_base["verbs"]["static"])
            if char_obj["gen"] == "f" and verb.endswith("л"): verb += "а"
            p = f"В {loc_obj['prep']} {verb} {char_adj} {char_obj['name']} и {adv} думал"
            if char_obj["gen"] == "f": p += "а"
            
        elif pattern == 9:
            # {char} {adv} {verb_creative}, пока в {loc_prep} {verb_static} другой {char2}
            v1 = random.choice(word_base["verbs"]["creative"])
            v2 = random.choice(word_base["verbs"]["static"])
            char2 = random.choice(word_base["characters"])
            if char_obj["gen"] == "f" and v1.endswith("л"): v1 += "а"
            if char2["gen"] == "f" and v2.endswith("л"): v2 += "а"
            p = f"{char_obj['name']} {adv} {v1}, пока в {loc_obj['prep']} {v2} {char2['name']}"
            
        elif pattern == 10:
            # {adv.capitalize()} {char} {verb_action}, посмотрел на {item_acc} и замолчал
            verb = random.choice(word_base["verbs"]["action"])
            if char_obj["gen"] == "f" and verb.endswith("л"): verb += "а"
            p = f"{adv.capitalize()} {char_obj['name']} {verb}, посмотрел на {item_obj['acc']} и замолчал"
            if char_obj["gen"] == "f": p = p.replace("посмотрел", "посмотрела").replace("замолчал", "замолчала")
            
        prompts.append(p + ", ")
        
    return prompts

def generation_quality_test():
    """Tests the model's generation syntax quality."""
    clear_screen()
    console.print(Panel("[bold cyan]Тест качества генерации (Лингвистический аудит V2.1)[/]", border_style="cyan"))
    
    # Легенда обозначений
    legend = Table.grid(padding=(0, 2))
    legend.add_column(style="bold yellow")
    legend.add_column(style="dim")
    legend.add_row("N1", "Существительное/местоимение в И.п.")
    legend.add_row("Vf", "Глагол в личной форме (сидел, идет)")
    legend.add_row("Inf", "Инфинитив (начальная форма: пить, бежать)")
    legend.add_row("Adj", "Прилагательное / Причастие (красивый, идущий)")
    legend.add_row("Praed", "Предикатив (состояние: холодно, надо)")
    legend.add_row("Cop", "Связка (тире или слово 'это')")

    console.print(Panel(legend, title="Легенда обозначений", border_style="yellow", expand=False))

    device_info = get_device_info()
    vocab_size = 100
    if os.path.exists(Config.vocab_path):
        try:
            with open(Config.vocab_path, 'rb') as f:
                vocab = pickle.load(f)
                if isinstance(vocab, dict):
                    vocab_size = vocab.get('vocab_size', len(vocab.get('stoi', [])))
                else:
                    vocab_size = len(vocab)
        except Exception as e:
            logger.warning(f"Не удалось прочитать словарь: {e}")

    model = SimpleLLM(
        vocab_size=vocab_size,
        n_embd=Config.n_embd,
        block_size=Config.block_size,
        n_head=Config.n_head,
        n_layer=Config.n_layer,
        dropout=0.0,
        device=device_info['device']
    ).to(device_info['device'])

    if os.path.exists(Config.weights_path):
        try:
            model.load_state_dict(torch.load(Config.weights_path, map_location=device_info['device'], weights_only=True))
        except Exception as e:
            logger.error(f"Ошибка загрузки весов: {e}")
            console.print(f"[bold red]ОШИБКА:[/] Не удалось загрузить веса. ({e})")
            Prompt.ask("\nНажмите Enter для возврата")
            return

    if not os.path.exists(Config.vocab_path):
        logger.error(f"Словарь {Config.vocab_path} не найден!")
        console.print(f"[bold red]ОШИБКА:[/] Файл словаря '{Config.vocab_path}' не найден. Сначала обучите модель.")
        Prompt.ask("\nНажмите Enter для возврата")
        return

    with open(Config.vocab_path, 'rb') as f:
        vocab_data = pickle.load(f)
    stoi = vocab_data['stoi']
    itos = vocab_data['itos']
    encode = lambda s: [stoi.get(c, 0) for c in s]
    decode = lambda l: ''.join([itos.get(i, '?') for i in l])

    # Генерация 10 кастомных промптов через алгоритм "собиратель"
    custom_prompts = collect_prompts(10)

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        transient=True,
    ) as progress:
        progress.add_task(description="Глубокий синтаксический анализ...", total=None)
        report = evaluate_generation_quality(model, device_info['device'], encode, decode, device_info['ctx'], prompts=custom_prompts)

    table = Table(title=f"Детальный отчет (Общий балл: {report['average_score']:.1f}%)", box=box.ROUNDED, expand=True)
    table.add_column("Промпт / Результат нейросети", style="cyan", width=60)
    table.add_column("Сложность", justify="center", width=12)
    table.add_column("Синтаксис (Паттерны)", style="green", width=30)
    table.add_column("Балл", justify="right", style="bold", width=8)

    for d in report['details']:
        comp = d['complexity']
        # Метрика: , / — / Союзы
        comp_str = f"[blue]{comp['commas']}[/] / [magenta]{comp['dashes']}[/] / [yellow]{comp['conjunctions']}[/]"
        
        patterns_str = "\n".join(d['patterns']) if d['patterns'] else "[red]Шум[/]"
        
        # Комбинируем промпт и ответ для экономии места по горизонтали
        content_group = Group(
            Text(f"Q: {d['prompt']}", style="bold cyan"),
            Text(f"A: {d['generated']}", style="white italic")
        )
        
        table.add_row(
            content_group, 
            comp_str,
            patterns_str, 
            f"{d['score']}%"
        )

    console.print(table)
    
    # Мини-аналитика
    perf_color = "green" if report['average_score'] > 60 else "yellow" if report['average_score'] > 30 else "red"
    console.print(Panel(
        f"[{perf_color}]Анализ завершен. Модель демонстрирует " + 
        ("высокую структурную связность." if report['average_score'] > 60 else "базовое понимание грамматики." if report['average_score'] > 30 else "низкую синтаксическую точность."),
        title="Вердикт лингвиста", border_style=perf_color
    ))
    
    Prompt.ask("\nНажмите Enter для продолжения")
