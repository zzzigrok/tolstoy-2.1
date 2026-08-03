import os
import sys
import logging
import shutil
from rich.console import Console, Group
from rich.panel import Panel
from rich.table import Table
from rich.prompt import Prompt, FloatPrompt, IntPrompt
from rich.text import Text
from rich.align import Align
from rich.logging import RichHandler
from rich import box

from core.config import Config
from modules import data_cleaner, train, chat
from engine.diagnostics import (model_analysis, performance_bench, hardware_diagnostics,
                         data_stats_view, config_view, generation_quality_test)

# Инициализация глобального логгера для менеджера
Config.ensure_dirs()
logging.basicConfig(
    level=logging.INFO,
    format="%(message)s",
    datefmt="[%X]",
    handlers=[
        RichHandler(rich_tracebacks=True, show_path=False),
        logging.FileHandler(Config.log_path, encoding="utf-8")
    ]
)
logger = logging.getLogger("Manager")

console = Console()

def clear_screen():
    """Очищает консоль в зависимости от ОС."""
    os.system('cls' if os.name == 'nt' else 'clear')

def draw_header():
    """Отрисовывает красивый заголовок."""
    logo_str = r"""
 _______  _______  ___      _______  _______  _______  __   __ 
|       ||       ||   |    |       ||       ||       ||  | |  |
|_     _||   _   ||   |    |  _____||_     _||   _   ||  |_|  |
  |   |  |  | |  ||   |    | |_____   |   |  |  | |  ||       |
  |   |  |  |_|  ||   |___ |_____  |  |   |  |  |_|  ||_     _|
  |   |  |       ||       | _____| |  |   |  |       |  |   |  
  |___|  |_______||_______||_______|  |___|  |_______|  |___|  
                             [ V 2.1 ]                         
"""
    # Убираем пустые переносы в начале/конце для красоты
    logo_text = Text(logo_str.strip("\n"), style="bold bright_cyan")
    
    # Добавляем ваши подписи
    subtitle_llm = Text("легкая посимвольная LLM на PyTorch", style="italic bright_yellow", justify="center")
    subtitle_tech = Text("CUDA / MPS / XPU / CPU Optimized", style="dim white", justify="center")
    
    # Группируем элементы: центрируем ASCII-логотип как единый блок (Align), 
    # чтобы не сломались переносы строк.
    header_group = Group(
        Align.center(logo_text),
        Text(""), # пустая строка-разделитель
        subtitle_llm,
        subtitle_tech
    )
    
    panel = Panel(
        header_group,
        box=box.DOUBLE_EDGE,
        border_style="cyan",
        padding=(1, 2)
    )
    console.print(panel)

def check_files():
    """Проверяет наличие необходимых файлов для отображения статуса."""
    status = {
        "raw_text": os.path.exists(Config.raw_path),
        "input_ru": os.path.exists(Config.input_path),
        "vocab": os.path.exists(Config.vocab_path),
        "weights": os.path.exists(Config.weights_path)
    }
    return status

def draw_menu(status):
    """Отрисовывает меню выбора действий с текущим статусом."""
    table = Table(show_header=False, box=box.SIMPLE, expand=True)
    table.add_column("Кнопка", style="bold yellow", justify="right", width=5)
    table.add_column("Действие", style="white")
    table.add_column("Статус", justify="left")

    # Формируем статусы для каждого шага
    step1_status = "[bold green]✔ Выбран[/]" if status["raw_text"] else "[bold red]✖ Не выбран[/]"
    step2_status = "[bold green]✔ Готово[/]" if status["input_ru"] else ("[bold red]✖ Нужен датасет[/]" if not status["raw_text"] else "[bold yellow]⏳ Ожидает очистки[/]")
    step3_status = "[bold green]✔ Обучено[/]" if status["weights"] else ("[bold red]✖ Нужен очищенный датасет[/]" if not status["input_ru"] else "[bold yellow]⏳ Готов к обучению[/]")
    step4_status = "[bold green]✔ Готов к работе[/]" if status["weights"] and status["vocab"] else "[bold red]✖ Нужны веса модели[/]"

    table.add_row("[1]", "📂 Выбрать датасет (.txt)", step1_status)
    table.add_row("[2]", "🧹 Очистка данных (data_cleaner.py)", step2_status)
    table.add_row("[3]", "🧠 Обучение модели (train.py)", step3_status)
    table.add_row("[4]", "💬 Запуск чата (chat.py)", step4_status)
    table.add_row("[5]", "🛠️ Debug Menu", "[bold cyan]Диагностика и тесты[/]")
    table.add_row("", "", "")
    table.add_row("[0]", "[bold red]Выход[/]", "")

    menu_panel = Panel(table, title="[bold]Управление модулями[/bold]", border_style="blue", padding=(0, 2))
    console.print(menu_panel)

def select_dataset():
    """Интерактивный выбор .txt файла в папке для использования как raw_text.txt"""
    clear_screen()
    draw_header()
    console.print("[bold cyan]Доступные текстовые файлы в текущей папке:[/]", justify="center")
    console.print("")

    # Исключаем системные и уже обработанные файлы
    exclude_files = [
        os.path.basename(Config.input_path),
        os.path.basename(Config.raw_path),
        os.path.basename(Config.history_path),
        os.path.basename(Config.log_path),
        'requirements.txt', 'config.py', 'model.py', 'utils.py'
    ]
    txt_files = [f for f in os.listdir('.') if f.endswith('.txt') and f not in exclude_files]

    if not txt_files:
        logger.warning("Не найдено подходящих .txt файлов для датасета в текущей папке!")
        Prompt.ask("\nНажмите Enter для возврата в меню")
        return

    # Рисуем таблицу с файлами
    table = Table(show_header=True, header_style="bold magenta", box=box.ROUNDED)
    table.add_column("№", style="bold yellow", width=3)
    table.add_column("Имя файла", style="white")
    table.add_column("Размер", justify="right", style="cyan")

    for idx, file in enumerate(txt_files):
        size_mb = os.path.getsize(file) / (1024 * 1024)
        table.add_row(str(idx + 1), file, f"{size_mb:.2f} MB")

    console.print(Align.center(table))

    choice = Prompt.ask("\n[bold cyan]Введите номер файла для загрузки (или 0 для отмены)[/]", default="0")

    if choice.isdigit():
        choice_idx = int(choice) - 1
        if 0 <= choice_idx < len(txt_files):
            selected_file = txt_files[choice_idx]
            try:
                # Копируем выбранный файл как raw_text.txt
                shutil.copy(selected_file, Config.raw_path)
                logger.info(f"Файл [bold green]{selected_file}[/] успешно выбран и назначен как основной датасет.")
            except Exception as e:
                logger.error(f"Ошибка при копировании файла: {e}")
        elif choice == "0":
            logger.info("Выбор датасета отменен.")
        else:
            logger.warning("Файл с таким номером не найден.")
    else:
        logger.warning("Пожалуйста, введите корректное число.")

    Prompt.ask("\nНажмите Enter для продолжения")

def debug_menu():
    """Меню отладки и диагностики."""
    while True:
        clear_screen()
        draw_header()
        
        table = Table(show_header=False, box=box.SIMPLE, expand=True)
        table.add_column("Кнопка", style="bold yellow", justify="right", width=5)
        table.add_column("Действие", style="white")

        table.add_row("[1]", "📊 Анализ модели (Архитектура и веса)")
        table.add_row("[2]", "🚀 Тест производительности (Inference speed)")
        table.add_row("[3]", "💻 Диагностика железа")
        table.add_row("[4]", "📈 Статистика данных (input_ru.txt)")
        table.add_row("[5]", "📋 Просмотр конфигурации (config.py)")
        table.add_row("[6]", "🧠 Тест качества генерации (Синтаксис)")
        table.add_row("", "")
        table.add_row("[0]", "[bold cyan]Назад в главное меню[/]")

        console.print(Panel(table, title="[bold red]Debug Menu[/bold red]", border_style="red", padding=(0, 2)))

        choice = Prompt.ask("\n[bold cyan]Выберите диагностику[/]", choices=["0", "1", "2", "3", "4", "5", "6"], default="0")

        if choice == "1":
            model_analysis()
        elif choice == "2":
            performance_bench()
        elif choice == "3":
            hardware_diagnostics()
        elif choice == "4":
            data_stats_view()
        elif choice == "5":
            config_view()
        elif choice == "6":
            generation_quality_test()
        elif choice == "0":
            break

def main():
    while True:
        clear_screen()
        draw_header()
        
        status = check_files()
        draw_menu(status)
        
        choice = Prompt.ask("\n[bold cyan]Выберите действие[/]", choices=["0", "1", "2", "3", "4", "5"], default="0")
        
        if choice == "1":
            select_dataset()
        elif choice == "2":
            clear_screen()
            logger.info("Запуск модуля: [bold cyan]data_cleaner.py[/bold cyan]...")
            data_cleaner.main()
            Prompt.ask("\nНажмите Enter, чтобы вернуться в меню")
        elif choice == "3":
            clear_screen()
            logger.info("Запуск модуля: [bold cyan]train.py[/bold cyan]...")
            train.main()
            Prompt.ask("\nНажмите Enter, чтобы вернуться в меню")
        elif choice == "4":
            console.print("\n[bold yellow]⚙️ Настройки генерации:[/]")
            temperature = FloatPrompt.ask("Температура (креативность, 0.1 - 2.0)", default=0.7)
            max_tokens = IntPrompt.ask("Максимальное количество токенов", default=250)
            clear_screen()
            logger.info("Запуск модуля: [bold cyan]chat.py[/bold cyan]...")
            chat.chat(temperature, max_tokens)
            Prompt.ask("\nНажмите Enter, чтобы вернуться в меню")
        elif choice == "5":
            debug_menu()
        elif choice == "0":
            clear_screen()
            console.print(Panel("[bold green]До свидания! Спасибо за использование Толстой AI.[/]", border_style="green", expand=False))
            break

if __name__ == "__main__":
    main()
