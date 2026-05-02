# 📚 Tolstoy AI v2.1 — Интеллектуальная Лингвистическая Студия

![Tolstoy AI Banner](assets/banner.png)

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.9+-blue.svg?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/PyTorch-2.0+-ee4c2c.svg?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch">
  <img src="https://img.shields.io/badge/Platform-CUDA%20|%20MPS%20|%20XPU-cyan.svg?style=for-the-badge" alt="Platform">
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License">
</p>

---

## 🌟 О проекте

**Tolstoy AI** — это научно-исследовательская экосистема для глубокого обучения и лингвистического анализа языковых моделей. Проект сфокусирован на воссоздании уникального стиля, синтаксической сложности и семантической глубины русской классической литературы (на примере Л.Н. Толстого).

В основе системы лежит **SimpleLLM** — легковесный Decoder-only Transformer, оптимизированный для работы на широком спектре оборудования: от мощных серверных GPU до потребительских ноутбуков.

> [!TIP]
> Версия 2.1 вводит алгоритм "Собиратель промптов" (Prompt Gatherer) и расширенный лингвистический аудит, позволяющий оценивать качество генерации по 100-балльной шкале.

---

## 💎 Ключевые возможности

### 🧠 Когнитивное ядро (SimpleLLM)
- **Decoder-only Transformer**: Классическая архитектура с Multi-Head Attention.
- **Character-based**: Посимвольное обучение позволяет модели улавливать тончайшие нюансы пунктуации и ритмики.
- **Hardware Agnostic**: Автоматическое переключение между CUDA (NVIDIA), MPS (Apple Silicon), XPU (Intel Arc) и оптимизированным CPU.

### 📊 Лингвистический аудит
- **Heuristic Syntax Engine**: Собственный движок для распознавания частей речи и синтаксических паттернов.
- **Метрики качества**: Оценка TTR (Lexical Diversity), анализ сложности предложений и выявление "галлюцинаций".
- **Диагностика весов**: Визуализация распределения параметров и "здоровья" слоев.

### 🎨 Премиальный TUI (Rich Interface)
- **Interactive CLI**: Удобный пульт управления всеми модулями через `cli.py`.
- **Дашборды**: Графики обучения и системного мониторинга в реальном времени.

---

## 🏗 Архитектура системы

```mermaid
flowchart TD
    subgraph "Data Pipeline"
        RAW[/"raw_text.txt (Source)"/] --> CLEAN["modules/data_cleaner.py"]
        CLEAN --> INPUT["data/input_ru.txt (Cleaned)"]
    end

    subgraph "Core Engine"
        INPUT --> TRAIN["modules/train.py"]
        TRAIN --> MODEL[("models/model_weights.pth")]
        MODEL --> INFER["Inference Engine"]
    end

    subgraph "Intelligence & UI"
        INFER --> CLI["cli.py (Rich TUI)"]
        CLI --> CHAT["modules/chat.py"]
        CLI --> DIAG["engine/diagnostics.py"]
        DIAG --> EVAL["engine/evaluator.py"]
    end

    style RAW fill:#f9f,stroke:#333
    style MODEL fill:#00e5ff,stroke:#333
    style CLI fill:#1a1a2e,stroke:#00e5ff,color:#fff
```

---

## 📁 Структура проекта

*   📂 **`core/`** — Логика модели (`model.py`), конфигурация (`config.py`) и базовые утилиты.
*   📂 **`modules/`** — Функциональные блоки: обучение, очистка данных и чат-интерфейс.
*   📂 **`engine/`** — Аналитический движок: диагностика железа и лингвистическая оценка.
*   📂 **`docs_2.1/`** — Подробная техническая документация и руководства.
*   📂 **`assets/`** — Визуальные материалы и промо-контент.

---

## 🚀 Быстрый старт

### 1. Окружение
```bash
pip install -r requirements.txt
```

### 2. Запуск
```bash
python cli.py
```

### 3. Рабочий процесс
1. **Подготовка**: Поместите текст в корень. В меню выберите `[1]` и `[2]`.
2. **Обучение**: Выберите `[3]`. Модель сама определит ваше железо и начнет процесс.
3. **Общение**: Выберите `[4]` для запуска интерактивного чата.
4. **Аудит**: В меню `[5]` проверьте, насколько хорошо модель усвоила правила русского языка.

---

## 📚 Документация

Для глубокого погружения изучите наши гайды:
- [📘 Спецификация модели SimpleLLM](docs_2.1/MODEL.md)
- [📗 Подготовка идеального датасета](docs_2.1/DATASET.md)
- [📙 Мастерство гиперпараметров](docs_2.1/tutorials/HYPERPARAMETERS.md)
- [🔍 Лингвистический дебаггинг](docs_2.1/tutorials/DEBUG_AND_EVALUATION.md)

---

## 📜 Лицензия

Проект выпускается под лицензией **MIT**. Полный текст доступен в файле [LICENSE](LICENSE).

<p align="center">
  <sub>Tolstoy AI Project • 2026 • Интеллектуальный анализ русской классики</sub>
</p>