import os
import re
from core.config import Config
from core.utils import setup_logging

def clean_data(input_file=None, output_file=None):
    """
    Reads raw text, cleans it of unwanted characters, and saves it.
    
    Args:
        input_file (str): Path to the input raw text file.
        output_file (str): Path to the output cleaned text file.
    """
    if input_file is None:
        input_file = Config.raw_path
    if output_file is None:
        output_file = Config.input_path

    logger = setup_logging("DataCleaner", Config.log_path)
    
    # --- 1.1 Графическое изображение ---
    RESET  = "\033[0m"
    SKY = "\033[38;5;117m"  

    print(SKY + r"""
 _____       _          _                    
(_   _)     (_ )       ( )_                  
  | |   _    | |   ___ | ,_)   _    _   _    
  | | /'_`\  | | /',__)| |   /'_`\ ( ) ( )   
  | |( (_) ) | | \__, \| |_ ( (_) )| (_) |   
  (_)`\___/'(___)(____/`\__)`\___/'`\__, |   
                                   ( )_| |   
                      [ V2.1 ]     `\___/'                                                                                                                                                                                               
""" + RESET)

    logger.info(f"Читаем сырой файл '{input_file}'...")
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            text = f.read()
    except FileNotFoundError:
        logger.error(f"ОШИБКА: Файл '{input_file}' не найден! Положите ваши тексты в этот файл.")
        return

    # ИСПРАВЛЕННЫЙ ШАБЛОН (включая русские кавычки «»):
    allowed_chars = re.compile(r'[^а-яА-ЯёЁa-zA-Z0-9\s.,!?;:()\[\]"\'«»—–-]')

    logger.info("Очищаем от мусорных символов (эмодзи, иероглифы и т.д.)...")
    clean_text = allowed_chars.sub('', text)

    # Убираем множественные пустые строки (сжимаем текст)
    clean_text = re.sub(r'\n\s*\n', '\n\n', clean_text)

    out_dir = os.path.dirname(output_file)
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(clean_text)

    logger.info(f"Успех! Текст очищен и сохранен в '{output_file}'.")

def main():
    """Main execution function for data_cleaner."""
    clean_data()

if __name__ == '__main__':
    main()

