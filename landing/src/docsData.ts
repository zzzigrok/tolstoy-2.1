export interface DocHeading {
  text: string;
  id: string;
  level: number;
}

export interface DocItem {
  id: string;
  title: string;
  html: string;
  readingTime: number;
  headings: DocHeading[];
}

export interface DocCategory {
  title: string;
  slug: string;
  items: DocItem[];
}

export const docsData: DocCategory[] = [
  {
    "title": "Введение и быстрый старт",
    "slug": "intro",
    "items": [
      {
        "id": "quick-start",
        "title": "Быстрый старт в интерфейсе",
        "html": "<h1>🚀 Быстрый старт в интерфейсе</h1>\n<div class=\"alert-box alert-tip\"><span class=\"alert-icon\">💡</span><strong>Совет:</strong> <p>Проект Tolstoy AI оснащен удобным текстовым интерфейсом (TUI) на базе библиотеки <code>rich</code>. Это позволяет управлять полным циклом жизни нейросети — от подготовки данных до глубокого анализа весов — без написания кода.</p></div><h2 id=\"оглавление\">📋 Оглавление</h2>\n<ol>\n<li><a href=\"#%D0%BF%D0%BE%D0%B4%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BA%D0%B0-%D0%BE%D0%BA%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F\">Подготовка окружения</a></li>\n<li><a href=\"#%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D1%84%D0%B5%D0%B9%D1%81%D0%B0\">Запуск интерфейса</a></li>\n<li><a href=\"#%D0%BF%D1%83%D1%82%D1%8C-%D0%BE%D1%82-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D0%B4%D0%BE-%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8\">Путь от данных до генерации</a></li>\n<li><a href=\"#%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BC%D0%B5%D0%BD%D1%8E\">Описание главного меню</a></li>\n<li><a href=\"#%D1%83%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B5%D0%BF%D0%BE%D0%BB%D0%B0%D0%B4%D0%BE%D0%BA-troubleshooting\">Устранение неполадок (Troubleshooting)</a></li>\n<li><a href=\"#%D0%B4%D0%B8%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0-%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%B0\">Диаграмма процесса</a></li>\n<li><a href=\"#%D0%B3%D0%BB%D0%BE%D1%81%D1%81%D0%B0%D1%80%D0%B8%D0%B9\">Глоссарий</a></li>\n</ol>\n<hr>\n<h2 id=\"подготовка-окружения\">🛠 Подготовка окружения</h2>\n<p>Перед первым запуском крайне рекомендуется использовать виртуальное окружение, чтобы избежать конфликтов библиотек.</p>\n<h3 id=\"windows\">Windows</h3>\n<pre><code class=\"language-powershell\">python -m venv venv\n.\\venv\\Scripts\\activate\npip install -r requirements.txt\n</code></pre>\n<h3 id=\"linux-macos\">Linux / macOS</h3>\n<pre><code class=\"language-bash\">python3 -m venv venv\nsource venv/bin/activate\npip install -r requirements.txt\n</code></pre>\n<div class=\"alert-box alert-important\"><span class=\"alert-icon\">📢</span><strong>Важно:</strong> <p>Для работы на GPU NVIDIA убедитесь, что у вас установлены драйверы версии 520+ и соответствующая версия CUDA Toolkit.</p></div><hr>\n<h2 id=\"запуск-интерфейса\">🖥 Запуск интерфейса</h2>\n<p>После активации окружения запустите основной файл управления:</p>\n<pre><code class=\"language-bash\">python cli.py\n</code></pre>\n<p>После запуска вы увидите стильное ASCII-лого и главную панель управления. В нижней части экрана отображаются индикаторы состояния:</p>\n<ul>\n<li><strong>RAW</strong>: Наличие исходного текста.</li>\n<li><strong>DATA</strong>: Готовность очищенного датасета.</li>\n<li><strong>MODEL</strong>: Наличие обученных весов.</li>\n</ul>\n<hr>\n<h2 id=\"путь-от-данных-до-генерации\">🛤 Путь от данных до генерации</h2>\n<p>Чтобы получить первую осмысленную генерацию текста, необходимо пройти четыре основных этапа:</p>\n<ol>\n<li><strong>Выбор датасета [1]</strong>: Найдите любой текстовый файл в формате <code>.txt</code> в корневой папке проекта. Система скопирует его как <code>raw_text.txt</code>.</li>\n<li><strong>Очистка данных [2]</strong>: Запустите <code>data_cleaner.py</code>. Скрипт удалит лишние символы, нормализует пунктуацию и создаст файл <code>input_ru.txt</code>. <ul>\n<li><em>Совет</em>: Если файл очень большой (&gt;100МБ), очистка может занять несколько минут.</li>\n</ul>\n</li>\n<li><strong>Обучение модели [3]</strong>: Запустите процесс обучения. Вы увидите прогресс-бар и текущие значения Loss. <ul>\n<li><em>Важно</em>: Если вы прервали обучение (Ctrl+C), веса сохранятся, и вы сможете продолжить позже.</li>\n</ul>\n</li>\n<li><strong>Запуск чата [4]</strong>: Модель готова! Введите затравку (например, &quot;В тот вечер князь...&quot;), и нейросеть продолжит текст.</li>\n</ol>\n<hr>\n<h2 id=\"описание-главного-меню\">📋 Описание главного меню</h2>\n<p>В главном меню <code>cli.py</code> доступны следующие пункты:</p>\n<ul>\n<li><strong>[1] 📂 Выбрать датасет</strong>: Интерактивный список всех <code>.txt</code> файлов. Можно быстро переключаться между разными авторами.</li>\n<li><strong>[2] 🧹 Очистка данных</strong>: Удаление мусора, нормализация кавычек и дефисов. Создает <code>input_ru.txt</code> и <code>vocab.pkl</code>.</li>\n<li><strong>[3] 🧠 Обучение модели</strong>: Точка входа в <code>train.py</code>. Можно настроить количество итераций перед стартом.</li>\n<li><strong>[4] 💬 Запуск чата</strong>: Генерация в реальном времени. Параметр <strong>Temperature</strong> (0.1 - 1.5) меняет стиль от сухого повторения до полного безумия.</li>\n<li><strong>[5] 🛠️ Debug Menu</strong>: Инструменты анализа железа и &quot;мозгов&quot; модели.</li>\n</ul>\n<hr>\n<h2 id=\"устранение-неполадок-troubleshooting\">🆘 Устранение неполадок (Troubleshooting)</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Проблема</th>\n<th align=\"left\">Решение</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>&quot;ModuleNotFoundError&quot;</strong></td>\n<td align=\"left\">Вы забыли активировать <code>venv</code> или запустить <code>pip install</code>.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>&quot;CUDA Out of Memory&quot;</strong></td>\n<td align=\"left\">Снизьте <code>batch_size</code> или <code>n_embd</code> в <code>config.py</code>.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Квадратики вместо текста</strong></td>\n<td align=\"left\">Проверьте, что ваш терминал поддерживает UTF-8 (рекомендуется Windows Terminal или VS Code).</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Loss = NaN</strong></td>\n<td align=\"left\">Слишком высокий <code>learning_rate</code>. Попробуйте уменьшить его в два раза.</td>\n</tr>\n</tbody></table>\n<hr>\n<h2 id=\"диаграмма-процесса\">📊 Диаграмма процесса</h2>\n<pre><code class=\"language-mermaid\">flowchart TD\n    START([Запуск cli.py]) --&gt; STEP1[&quot;[1] Выбор .txt файла&quot;]\n    STEP1 --&gt; STEP2[&quot;[2] Очистка (data_cleaner)&quot;]\n    STEP2 --&gt; STEP3[&quot;[3] Обучение (train.py)&quot;]\n    STEP3 --&gt; STEP4[&quot;[4] Чат и генерация&quot;]\n    STEP4 --&gt; END([Результат: Текст])\n\n    STEP3 -.-&gt; DEBUG{&quot;Нужен анализ?&quot;}\n    DEBUG --&gt;|Да| STEP5[&quot;[5] Debug Menu&quot;]\n    STEP5 --&gt; STEP3\n    \n    style START fill:#1a1a2e,stroke:#00e5ff,color:#fff\n    style END fill:#1a1a2e,stroke:#00e5ff,color:#fff\n    style STEP3 fill:#2d3436,stroke:#fab1a0,color:#fff\n</code></pre>\n<hr>\n<h2 id=\"глоссарий\">Глоссарий</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Термин</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>TUI</strong></td>\n<td align=\"left\">Text User Interface — интерфейс пользователя внутри терминала.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Промпт</strong></td>\n<td align=\"left\">Начальный текст, который вы вводите для продолжения.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Venv</strong></td>\n<td align=\"left\">Изолированная папка с библиотеками Python для конкретного проекта.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>CLI</strong></td>\n<td align=\"left\">Command Line Interface — управление через ввод команд в консоли.</td>\n</tr>\n</tbody></table>\n<p align=\"center\">\n  <a href=\"DATASET_GUIDE.md\">Далее: Сбор датасета →</a><br/>\n  <sub>Tolstoy AI • Documentation • 2024</sub>\n</p>\n",
        "readingTime": 4,
        "headings": [
          {
            "text": "Оглавление",
            "id": "оглавление",
            "level": 2
          },
          {
            "text": "Подготовка окружения",
            "id": "подготовка-окружения",
            "level": 2
          },
          {
            "text": "Windows",
            "id": "windows",
            "level": 3
          },
          {
            "text": "Linux / macOS",
            "id": "linux-macos",
            "level": 3
          },
          {
            "text": "Запуск интерфейса",
            "id": "запуск-интерфейса",
            "level": 2
          },
          {
            "text": "Путь от данных до генерации",
            "id": "путь-от-данных-до-генерации",
            "level": 2
          },
          {
            "text": "Описание главного меню",
            "id": "описание-главного-меню",
            "level": 2
          },
          {
            "text": "Устранение неполадок (Troubleshooting)",
            "id": "устранение-неполадок-troubleshooting",
            "level": 2
          },
          {
            "text": "Диаграмма процесса",
            "id": "диаграмма-процесса",
            "level": 2
          },
          {
            "text": "Глоссарий",
            "id": "глоссарий",
            "level": 2
          }
        ]
      }
    ]
  },
  {
    "title": "Архитектура и модель",
    "slug": "architecture",
    "items": [
      {
        "id": "model-spec",
        "title": "Архитектура Модели",
        "html": "<h1>🧠 Архитектура Модели</h1>\n<div class=\"alert-box alert-tip\"><span class=\"alert-icon\">💡</span><strong>Совет:</strong> <p>В данном разделе представлен подробный обзор архитектуры нейросети Tolstoy. Модель построена на базе классического Transformer (Decoder-only) с использованием посимвольной токенизации.</p></div><h2 id=\"оглавление\">📋 Оглавление</h2>\n<ul>\n<li><a href=\"#%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF%D1%8B\">Основные принципы</a></li>\n<li><a href=\"#%D0%BF%D0%BE%D1%87%D0%B5%D0%BC%D1%83-transformer\">Почему Transformer?</a></li>\n<li><a href=\"#%D0%B3%D0%B8%D0%BF%D0%B5%D1%80%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B\">Гиперпараметры</a></li>\n<li><a href=\"#%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-transformer\">Структура Transformer</a></li>\n<li><a href=\"#%D0%B8%D0%BD%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-%D0%B2%D0%B5%D1%81%D0%BE%D0%B2\">Инициализация весов</a></li>\n<li><a href=\"#%D0%B4%D0%B8%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0-%D0%BF%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%B2-%D1%82%D0%B5%D0%BD%D0%B7%D0%BE%D1%80%D0%BE%D0%B2\">Диаграмма потоков тензоров</a></li>\n</ul>\n<h2 id=\"основные-принципы\">Основные принципы</h2>\n<p>Модель Tolstoy представляет собой <strong>Causal Decoder-only Transformer</strong>. Это означает, что она обучается предсказывать следующий символ в последовательности, основываясь исключительно на предыдущих символах контекста.</p>\n<p>Основные особенности:</p>\n<ul>\n<li><strong>Character-level токенизация</strong>: Модель работает напрямую с символами, а не со словами или BPE-токенами. Это снижает размерность слоя эмбеддингов, но требует более глубокой архитектуры для выявления сложных словарных зависимостей.</li>\n<li><strong>Scaled Dot-Product Attention</strong>: Использование оптимизированного механизма внимания из <code>torch.nn.functional</code> (<code>F.scaled_dot_product_attention</code>), который автоматически выбирает наилучшую реализацию (FlashAttention, Memory-Efficient Attention) в зависимости от железа.</li>\n<li><strong>Pre-LayerNorm</strong>: Нормализация применяется перед блоками внимания и полносвязными слоями, что повышает стабильность обучения глубоких сетей (предотвращает взрыв градиентов).</li>\n</ul>\n<h2 id=\"почему-transformer\">Почему Transformer?</h2>\n<p>В отличие от рекуррентных нейросетей (RNN, LSTM), Transformer:</p>\n<ol>\n<li>Не имеет рекуррентной зависимости во времени, что позволяет обрабатывать всю входную последовательность параллельно.</li>\n<li>Не страдает от забывания долгосрочного контекста благодаря механизму Self-Attention, который устанавливает прямые связи между любыми токенами в пределах <code>block_size</code>.</li>\n</ol>\n<h2 id=\"гиперпараметры\">Гиперпараметры</h2>\n<p>Все настройки модели хранятся в классе конфигурации (обычно <code>Config</code> в <code>config.py</code>). Базовые параметры:</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Параметр</th>\n<th align=\"left\">Значение</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><code>block_size</code></td>\n<td align=\"left\">256</td>\n<td align=\"left\">Максимальная длина контекста. Определяет, насколько &quot;далеко в прошлое&quot; может смотреть модель.</td>\n</tr>\n<tr>\n<td align=\"left\"><code>n_embd</code></td>\n<td align=\"left\">768</td>\n<td align=\"left\">Размерность скрытого состояния (Embedding dimension).</td>\n</tr>\n<tr>\n<td align=\"left\"><code>n_head</code></td>\n<td align=\"left\">12</td>\n<td align=\"left\">Количество голов в механизме Multi-Head Attention. Определяет число параллельных проекций Q, K, V.</td>\n</tr>\n<tr>\n<td align=\"left\"><code>n_layer</code></td>\n<td align=\"left\">12</td>\n<td align=\"left\">Количество последовательных слоев Transformer Block.</td>\n</tr>\n<tr>\n<td align=\"left\"><code>dropout</code></td>\n<td align=\"left\">0.2</td>\n<td align=\"left\">Вероятность зануления нейронов для предотвращения переобучения.</td>\n</tr>\n</tbody></table>\n<h2 id=\"структура-transformer\">Структура Transformer</h2>\n<p>Модель состоит из следующих ключевых компонентов:</p>\n<ol>\n<li><strong>Token Embedding Layer</strong>: Матрица размера <code>[vocab_size, n_embd]</code>, конвертирующая индексы токенов в плотные векторы.</li>\n<li><strong>Position Embedding Layer</strong>: Матрица размера <code>[block_size, n_embd]</code>, добавляющая информацию о позиции токена. В нашей модели используются обучаемые абсолютные позиционные эмбеддинги.</li>\n<li><strong>Transformer Blocks</strong>: Стек из 12 идентичных блоков. Каждый блок содержит:<ul>\n<li>Causal Multi-Head Self-Attention.</li>\n<li>Position-wise Feed-Forward Network (FFN).</li>\n<li>Layer Normalization и Residual Connections.</li>\n</ul>\n</li>\n<li><strong>Language Model Head</strong>: Финальный линейный слой размера <code>[n_embd, vocab_size]</code>, проецирующий скрытое состояние обратно в вероятности токенов словаря.</li>\n</ol>\n<h2 id=\"инициализация-весов\">Инициализация весов</h2>\n<p>Для стабильного старта обучения критически важна правильная инициализация:</p>\n<ul>\n<li>Линейные слои и эмбеддинги инициализируются нормальным распределением со средним $0$ и стандартным отклонением $0.02$.</li>\n<li>Веса проекций, находящихся перед остаточными связями (residual pathways), масштабируются с коэффициентом $\\frac{1}{\\sqrt{2 \\cdot n_layer}}$. Это предотвращает рост дисперсии активаций по мере углубления сети.</li>\n</ul>\n<h2 id=\"диаграмма-потоков-тензоров\">Диаграмма потоков тензоров</h2>\n<pre><code class=\"language-mermaid\">flowchart TD\n    START([Входные индексы: B, T]) --&gt; EMB1[&quot;Token Emb: B, T, C&quot;]\n    START --&gt; EMB2[&quot;Pos Emb: T, C&quot;]\n    EMB1 --&gt; ADD_EMB((+))\n    EMB2 --&gt; ADD_EMB\n    ADD_EMB --&gt; DOUT[&quot;Dropout&quot;]\n    \n    DOUT --&gt; BLOCKS[&quot;12x Transformer Blocks\\nВход: B, T, C -&gt; Выход: B, T, C&quot;]\n    BLOCKS --&gt; LN[&quot;LayerNorm (ln_f)&quot;]\n    LN --&gt; HEAD[&quot;LM Head (Linear)\\nB, T, C -&gt; B, T, VocabSize&quot;]\n    HEAD --&gt; STOP([Логиты: B, T, VocabSize])\n    \n    style START fill:#1a1a2e,stroke:#00e5ff,color:#fff\n    style STOP fill:#1a1a2e,stroke:#00e5ff,color:#fff\n    style BLOCKS fill:#2d3436,stroke:#fab1a0,color:#fff\n    style ADD_EMB fill:#0984e3,stroke:#fff,color:#fff\n</code></pre>\n<p><em>(где B - размер батча, T - длина контекста, C - размерность n_embd)</em></p>\n<h2 id=\"глоссарий\">Глоссарий</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Термин</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>Logits</strong></td>\n<td align=\"left\">Ненормированные предсказания модели до применения Softmax.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Embedding</strong></td>\n<td align=\"left\">Векторное представление дискретного объекта (символа).</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Residual Connection</strong></td>\n<td align=\"left\">Остаточная связь ($x + layer(x)$), позволяющая градиентам легче проходить сквозь глубокую сеть при Backpropagation.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Causal</strong></td>\n<td align=\"left\">Причинный. Модель не имеет доступа к будущим токенам в процессе вычисления текущего.</td>\n</tr>\n</tbody></table>\n<p align=\"center\">\n  <a href=\"DATASET.md\">Далее: Подготовка данных →</a><br/>\n  <sub>Tolstoy LLM • Documentation • 2024</sub>\n</p>\n",
        "readingTime": 5,
        "headings": [
          {
            "text": "Оглавление",
            "id": "оглавление",
            "level": 2
          },
          {
            "text": "Основные принципы",
            "id": "основные-принципы",
            "level": 2
          },
          {
            "text": "Почему Transformer?",
            "id": "почему-transformer",
            "level": 2
          },
          {
            "text": "Гиперпараметры",
            "id": "гиперпараметры",
            "level": 2
          },
          {
            "text": "Структура Transformer",
            "id": "структура-transformer",
            "level": 2
          },
          {
            "text": "Инициализация весов",
            "id": "инициализация-весов",
            "level": 2
          },
          {
            "text": "Диаграмма потоков тензоров",
            "id": "диаграмма-потоков-тензоров",
            "level": 2
          },
          {
            "text": "Глоссарий",
            "id": "глоссарий",
            "level": 2
          }
        ]
      },
      {
        "id": "simple-llm",
        "title": "Класс SimpleLLM",
        "html": "<h1>🧩 Класс SimpleLLM</h1>\n<div class=\"alert-box alert-tip\"><span class=\"alert-icon\">💡</span><strong>Совет:</strong> <p><code>SimpleLLM</code> — это корневой модуль модели, объединяющий эмбеддинги, стек трансформер-блоков и генерационный цикл. Это точка входа для прямых проходов (forward passes) и генерации текста.</p></div><h2 id=\"оглавление\">📋 Оглавление</h2>\n<ul>\n<li><a href=\"#%D0%B8%D0%BD%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F\">Инициализация</a></li>\n<li><a href=\"#%D0%BF%D1%80%D1%8F%D0%BC%D0%BE%D0%B9-%D0%BF%D1%80%D0%BE%D1%85%D0%BE%D0%B4-forward\">Прямой проход (forward)</a></li>\n<li><a href=\"#%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81-%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B0\">Процесс генерации текста</a></li>\n<li><a href=\"#%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%B5%D0%B3%D0%B8%D0%B8-%D1%81%D1%8D%D0%BC%D0%BF%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F\">Стратегии сэмплирования</a></li>\n</ul>\n<h2 id=\"инициализация\">Инициализация</h2>\n<p>При создании экземпляра модели конструируются все структурные элементы:</p>\n<pre><code class=\"language-python\">class SimpleLLM(nn.Module):\n    def __init__(self, vocab_size, n_embd, block_size, n_head, n_layer, dropout, device):\n        super().__init__()\n        # 1. Эмбеддинги токенов (Словарь -&gt; Векторы)\n        self.token_embedding_table = nn.Embedding(vocab_size, n_embd)\n        \n        # 2. Позиционные эмбеддинги (Индексы 0..block_size -&gt; Векторы)\n        self.position_embedding_table = nn.Embedding(block_size, n_embd)\n        \n        # 3. Стек Transformer Blocks\n        self.blocks = nn.Sequential(\n            *[Block(n_embd, n_head, dropout) for _ in range(n_layer)]\n        )\n        \n        # 4. Финальный LayerNorm перед предсказанием\n        self.ln_f = nn.LayerNorm(n_embd)\n        \n        # 5. Линейная проекция в пространство словаря\n        self.lm_head = nn.Linear(n_embd, vocab_size)\n        \n        # Сохранение конфигурации\n        self.block_size = block_size\n        self.device = device\n</code></pre>\n<p>Модель использует абсолютные позиционные эмбеддинги, поэтому максимальная длина контекста жестко ограничена параметром <code>block_size</code>.</p>\n<h2 id=\"прямой-проход-forward\">Прямой проход (forward)</h2>\n<p>Метод <code>forward</code> определяет логику потока данных через слои. Если переданы целевые значения (<code>targets</code>), модель также вычислит функцию потерь (Cross Entropy).</p>\n<ol>\n<li>Извлечение токенных эмбеддингов для входной последовательности <code>idx</code>.</li>\n<li>Создание вектора позиций от <code>0</code> до <code>T-1</code> и извлечение позиционных эмбеддингов.</li>\n<li>Сложение токенных и позиционных векторов (теперь модель &quot;знает&quot;, на каком месте стоит каждый токен).</li>\n<li>Прохождение через 12 блоков трансформера.</li>\n<li>Финальная нормализация и генерация логитов.</li>\n</ol>\n<div class=\"alert-box alert-important\"><span class=\"alert-icon\">📢</span><strong>Важно:</strong> <p>Вычисление Loss происходит внутри модели только на этапе обучения. Во время инференса (генерации) <code>targets</code> равно <code>None</code>, и метод возвращает только логиты (вероятностное распределение).</p></div><h2 id=\"процесс-генерации-текста\">Процесс генерации текста</h2>\n<p>Метод <code>generate</code> реализует авторегрессионный цикл — модель предсказывает следующий токен, добавляет его к контексту и подает обновленный контекст обратно на вход.</p>\n<pre><code class=\"language-python\">@torch.no_grad()\ndef generate(self, idx, max_new_tokens, temperature=0.7, top_k=10):\n    for _ in range(max_new_tokens):\n        # 1. Обрезка контекста (модель не может видеть дальше block_size)\n        idx_cond = idx[:, -self.block_size:]\n        \n        # 2. Прямой проход (получаем логиты)\n        logits, _ = self(idx_cond)\n        \n        # 3. Берем логиты только для последнего шага времени\n        logits = logits[:, -1, :] / temperature\n        \n        # 4. Ограничиваем выбор (Top-K фильтрация)\n        if top_k is not None:\n            v, _ = torch.topk(logits, min(top_k, logits.size(-1)))\n            logits[logits &lt; v[:, [-1]]] = -float(&#39;Inf&#39;)\n            \n        # 5. Применяем Softmax для получения вероятностей\n        probs = F.softmax(logits, dim=-1)\n        \n        # 6. Сэмплирование из распределения\n        idx_next = torch.multinomial(probs, num_samples=1)\n        \n        # 7. Добавление предсказанного токена к контексту\n        idx = torch.cat((idx, idx_next), dim=1)\n        \n    return idx\n</code></pre>\n<h2 id=\"стратегии-сэмплирования\">Стратегии сэмплирования</h2>\n<ul>\n<li><strong>Temperature (Температура)</strong>: Коэффициент, на который делятся логиты перед <code>softmax</code>. <ul>\n<li>$T = 1.0$: Обычное распределение.</li>\n<li>$T &lt; 1.0$ (например, 0.7): Смещение в сторону наиболее вероятных токенов (более предсказуемый и правильный текст).</li>\n<li>$T &gt; 1.0$: Сглаживание распределения (модель начинает фантазировать и может бредить).</li>\n</ul>\n</li>\n<li><strong>Top-K</strong>: Вместо того чтобы выбирать из всех токенов словаря, мы отбираем $K$ (например, 10) наиболее вероятных вариантов и сэмплируем только из них. Вероятности остальных приравниваются к нулю. Это исключает появление совершенно неуместных символов.</li>\n</ul>\n<h2 id=\"глоссарий\">Глоссарий</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Термин</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>Autoregressive</strong></td>\n<td align=\"left\">Модель предсказывает новые элементы последовательности на основе ею же сгенерированных предыдущих элементов.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Multinomial Sampling</strong></td>\n<td align=\"left\">Выбор следующего токена случайно, но пропорционально его вероятности (взвешенная случайность), а не просто выбор самого вероятного (<code>argmax</code> или greedy search).</td>\n</tr>\n</tbody></table>\n<p align=\"center\">\n  <a href=\"../TRAINING.md\">← Назад: Процесс обучения</a> | <a href=\"ATTENTION.md\">Далее: Механизм внимания →</a><br/>\n  <sub>Tolstoy LLM • Documentation • 2024</sub>\n</p>\n",
        "readingTime": 4,
        "headings": [
          {
            "text": "Оглавление",
            "id": "оглавление",
            "level": 2
          },
          {
            "text": "Инициализация",
            "id": "инициализация",
            "level": 2
          },
          {
            "text": "Прямой проход (forward)",
            "id": "прямой-проход-forward",
            "level": 2
          },
          {
            "text": "Процесс генерации текста",
            "id": "процесс-генерации-текста",
            "level": 2
          },
          {
            "text": "Стратегии сэмплирования",
            "id": "стратегии-сэмплирования",
            "level": 2
          },
          {
            "text": "Глоссарий",
            "id": "глоссарий",
            "level": 2
          }
        ]
      }
    ]
  },
  {
    "title": "Компоненты трансформера",
    "slug": "components",
    "items": [
      {
        "id": "attention",
        "title": "Механизм Внимания (Attention)",
        "html": "<h1>⚡ Механизм Внимания (Attention)</h1>\n<div class=\"alert-box alert-tip\"><span class=\"alert-icon\">💡</span><strong>Совет:</strong> <p>Механизм Self-Attention (Само-внимание) — это алгоритм, который позволяет модели &quot;взвешивать&quot; важность каждого слова (токена) в контексте других слов. Это &quot;сердце&quot; архитектуры Transformer.</p></div><h2 id=\"оглавление\">📋 Оглавление</h2>\n<ul>\n<li><a href=\"#%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0-attention\">Математика Attention</a></li>\n<li><a href=\"#causal-self-attention\">Causal Self-Attention</a></li>\n<li><a href=\"#%D0%BC%D0%B0%D1%81%D0%BA%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0-masking\">Маскировка (Masking)</a></li>\n<li><a href=\"#multi-head-%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0\">Multi-Head структура</a></li>\n<li><a href=\"#%D0%BC%D0%B0%D1%81%D1%88%D1%82%D0%B0%D0%B1%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-scaling\">Масштабирование (Scaling)</a></li>\n</ul>\n<h2 id=\"математика-attention\">Математика Attention</h2>\n<p>Суть механизма внимания описывается одной классической формулой:</p>\n<p>$$ \\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V $$</p>\n<p>Где:</p>\n<ul>\n<li><strong>$Q$ (Query - Запрос)</strong>: То, что текущий токен &quot;ищет&quot; в контексте.</li>\n<li><strong>$K$ (Key - Ключ)</strong>: То, что каждый токен &quot;предлагает&quot; или &quot;содержит&quot;.</li>\n<li><strong>$V$ (Value - Значение)</strong>: Сама информация, которая будет извлечена, если $Q$ и $K$ совпадут.</li>\n</ul>\n<p><strong>Простыми словами:</strong> Каждый токен создает свой запрос и ключ. Затем запросы всех токенов умножаются на ключи всех токенов ($QK^T$). Это дает матрицу &quot;внимания&quot;, где каждая ячейка показывает, насколько один токен важен для другого.</p>\n<h2 id=\"causal-self-attention\">Causal Self-Attention</h2>\n<p>В нашей модели используется <strong>Causal (причинный или авторегрессионный)</strong> механизм. Поскольку задача языковой модели — предсказывать будущее, токен на позиции $t$ <strong>не должен</strong> иметь доступа к токенам на позициях $t+1, t+2 \\dots$ (заглядывать в будущее).</p>\n<p>Для реализации причинности используется <strong>нижнетреугольная маска</strong>.</p>\n<h2 id=\"маскировка-masking\">Маскировка (Masking)</h2>\n<p>В PyTorch причинная маскировка реализована на низком уровне для максимальной скорости. В коде это достигается передачей параметра <code>is_causal=True</code> в функцию <code>F.scaled_dot_product_attention</code>.</p>\n<pre><code class=\"language-python\"># Быстрая и оптимизированная реализация внимания в PyTorch 2.0+\ny = F.scaled_dot_product_attention(\n    q, k, v, \n    attn_mask=None,\n    dropout_p=self.dropout if self.training else 0.0,\n    is_causal=True # Автоматически применяет причинную маску\n)\n</code></pre>\n<div class=\"alert-box alert-note\"><span class=\"alert-icon\">ℹ️</span><strong>Примечание:</strong> <p>Как работает маска математически? Перед применением операции <code>softmax</code>, все значения матрицы $QK^T$, находящиеся выше главной диагонали (то есть соответствующие связям &quot;текущий токен -&gt; будущий токен&quot;), заменяются на $-\\infty$. Softmax превращает $-\\infty$ в $0$, таким образом вес внимания к будущему становится строго нулевым.</p></div><h2 id=\"multi-head-структура\">Multi-Head структура</h2>\n<p>Вместо одного большого механизма внимания, мы делим векторы признаков на <code>n_head</code> (в нашем случае 12) параллельных частей (&quot;голов&quot;).</p>\n<p>Зачем это нужно? Каждая голова может обучиться находить свои специфические закономерности. Например:</p>\n<ul>\n<li>Голова 1: Ищет ближайшие знаки пунктуации.</li>\n<li>Голова 2: Связывает местоимения с существительными.</li>\n<li>Голова 3: Следит за структурой абзацев.</li>\n</ul>\n<pre><code class=\"language-python\"># Трансформация размерностей для Multi-Head Attention\n# Из (Batch, Time, Channels) в (Batch, Heads, Time, Head_Size)\nk = k.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)\nq = q.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)\nv = v.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)\n</code></pre>\n<p>После вычисления внимания результаты всех голов снова склеиваются (через <code>transpose</code> и <code>view</code>) и пропускаются через финальный линейный слой проекции.</p>\n<h2 id=\"масштабирование-scaling\">Масштабирование (Scaling)</h2>\n<p>В формуле присутствует деление на $\\sqrt{d_k}$ (корень из размера головы).\nЕсли размерность векторов $Q$ и $K$ велика, их скалярное произведение может принимать очень большие значения. Это приводит к тому, что значения после <code>softmax</code> становятся близкими к $0$ или $1$, а градиенты (производные) стремятся к нулю (проблема затухания градиентов). Деление на $\\sqrt{d_k}$ нормализует дисперсию и стабилизирует обучение.</p>\n<h2 id=\"диаграмма-работы-attention\">Диаграмма работы Attention</h2>\n<pre><code class=\"language-mermaid\">flowchart TD\n    IN[/&quot;Входной тензор (B, T, C)&quot;/] --&gt; LINEAR[&quot;Linear Projection (Q, K, V)&quot;]\n    LINEAR --&gt; SPLIT[&quot;Split to Heads &amp; Transpose\\n(B, Heads, T, HeadSize)&quot;]\n    \n    SPLIT --&gt; Q[Query]\n    SPLIT --&gt; K[Key]\n    SPLIT --&gt; V[Value]\n    \n    Q --&gt; DOT[&quot;Q × K^T&quot;]\n    K --&gt; DOT\n    DOT --&gt; SCALE[&quot;Scale (÷ √d_k)&quot;]\n    SCALE --&gt; MASK[&quot;Apply Causal Mask&quot;]\n    MASK --&gt; SOFTMAX[&quot;Softmax&quot;]\n    SOFTMAX --&gt; DROP[&quot;Dropout&quot;]\n    \n    DROP --&gt; MULT[&quot;Weight × V&quot;]\n    V --&gt; MULT\n    \n    MULT --&gt; CONCAT[&quot;Concat Heads &amp; Transpose&quot;]\n    CONCAT --&gt; OUTPROJ[&quot;Linear Projection (Out)&quot;]\n    OUTPROJ --&gt; OUT[/&quot;Выходной тензор (B, T, C)&quot;/]\n\n    style IN fill:#1a1a2e,stroke:#00e5ff,color:#fff\n    style OUT fill:#1a1a2e,stroke:#00e5ff,color:#fff\n    style MASK fill:#c0392b,stroke:#fff,color:#fff\n</code></pre>\n<h2 id=\"глоссарий\">Глоссарий</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Термин</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>SDPA</strong></td>\n<td align=\"left\">Scaled Dot-Product Attention — эффективная реализация внимания, включенная в ядро PyTorch.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>FlashAttention</strong></td>\n<td align=\"left\">Аппаратно-оптимизированный алгоритм вычисления SDPA, который минимизирует обращения к медленной памяти (VRAM) GPU.</td>\n</tr>\n</tbody></table>\n<p align=\"center\">\n  <a href=\"SIMPLE_LLM.md\">← Назад: SimpleLLM</a> | <a href=\"BLOCKS.md\">Далее: Transformer Blocks →</a><br/>\n  <sub>Tolstoy LLM • Documentation • 2024</sub>\n</p>\n",
        "readingTime": 5,
        "headings": [
          {
            "text": "Оглавление",
            "id": "оглавление",
            "level": 2
          },
          {
            "text": "Математика Attention",
            "id": "математика-attention",
            "level": 2
          },
          {
            "text": "Causal Self-Attention",
            "id": "causal-self-attention",
            "level": 2
          },
          {
            "text": "Маскировка (Masking)",
            "id": "маскировка-masking",
            "level": 2
          },
          {
            "text": "Multi-Head структура",
            "id": "multi-head-структура",
            "level": 2
          },
          {
            "text": "Масштабирование (Scaling)",
            "id": "масштабирование-scaling",
            "level": 2
          },
          {
            "text": "Диаграмма работы Attention",
            "id": "диаграмма-работы-attention",
            "level": 2
          },
          {
            "text": "Глоссарий",
            "id": "глоссарий",
            "level": 2
          }
        ]
      },
      {
        "id": "blocks",
        "title": "Transformer Blocks & FeedForward",
        "html": "<h1>🧱 Transformer Blocks &amp; FeedForward</h1>\n<div class=\"alert-box alert-tip\"><span class=\"alert-icon\">💡</span><strong>Совет:</strong> <p>Transformer Block — это композитный строительный модуль модели, который объединяет механизм внимания (поиск взаимосвязей) и полносвязную нейросеть (нелинейная обработка признаков).</p></div><h2 id=\"оглавление\">📋 Оглавление</h2>\n<ul>\n<li><a href=\"#%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE-%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0-block\">Устройство блока (Block)</a></li>\n<li><a href=\"#layernorm-%D0%B8-pre-norm\">LayerNorm и Pre-Norm</a></li>\n<li><a href=\"#feedforward-%D1%81%D0%B5%D1%82%D1%8C-mlp\">FeedForward сеть (MLP)</a></li>\n<li><a href=\"#%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BE%D1%87%D0%BD%D1%8B%D0%B5-%D1%81%D0%B2%D1%8F%D0%B7%D0%B8-residuals\">Остаточные связи (Residuals)</a></li>\n<li><a href=\"#%D1%81%D1%85%D0%B5%D0%BC%D0%B0-%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85\">Схема движения данных</a></li>\n</ul>\n<h2 id=\"устройство-блока-block\">Устройство блока (Block)</h2>\n<p>Классический трансформер строится путем многократного повторения блоков <code>Block</code>. Каждый блок последовательно применяет слой внимания (Self-Attention) и слой нейросети прямого распространения (FeedForward).</p>\n<pre><code class=\"language-python\">class Block(nn.Module):\n    def __init__(self, n_embd, n_head, dropout):\n        super().__init__()\n        self.ln_1 = nn.LayerNorm(n_embd)\n        self.attn = CausalSelfAttention(n_embd, n_head, dropout)\n        self.ln_2 = nn.LayerNorm(n_embd)\n        self.mlp = FeedForward(n_embd, dropout)\n\n    def forward(self, x):\n        # Внимание (связи между токенами)\n        x = x + self.attn(self.ln_1(x))\n        # FeedForward (осмысление полученных признаков)\n        x = x + self.mlp(self.ln_2(x))\n        return x\n</code></pre>\n<h2 id=\"layernorm-и-pre-norm\">LayerNorm и Pre-Norm</h2>\n<p>Для того чтобы сеть обучалась стабильно, распределение значений в тензорах не должно улетать в бесконечность или сжиматься в ноль по мере прохождения через десятки слоев. Эту задачу решает <strong>Layer Normalization</strong> (Нормализация по слоям).\nОна вычисляет среднее значение и дисперсию вдоль размерности каналов (каждого токена отдельно) и нормализует вектор, после чего применяет обучаемые параметры <code>gamma</code> (масштабирование) и <code>beta</code> (сдвиг).</p>\n<p>В оригинальном трансформере (2017 год) LayerNorm применялся <em>после</em> слоев внимания и FFWD (Post-Norm). В Tolstoy, как и во всех современных LLM (GPT-2, GPT-3, LLaMA), используется конфигурация <strong>Pre-Norm</strong>: нормализация применяется <em>до</em> слоев. Это доказанно улучшает стабильность градиентов без необходимости сложных расписаний <code>Learning Rate Warmup</code>.</p>\n<h2 id=\"feedforward-сеть-mlp\">FeedForward сеть (MLP)</h2>\n<p>После того как механизм внимания собрал информацию из контекста, необходимо обработать эту информацию. В то время как Attention обеспечивает коммуникацию <em>между</em> токенами, FeedForward сеть обрабатывает каждый токен <em>независимо</em> от остальных.</p>\n<p><strong>Архитектура FeedForward:</strong></p>\n<ol>\n<li><strong>Расширение (Linear)</strong>: Размерность признаков увеличивается в 4 раза (с <code>n_embd</code> до <code>4 * n_embd</code>). Это создает большое внутреннее пространство для сложных нелинейных трансформаций (своеобразная &quot;память&quot; сети).</li>\n<li><strong>Активация (GELU)</strong>: Применяется функция активации GELU (Gaussian Error Linear Unit). В отличие от ReLU, GELU имеет плавную кривую в отрицательной области, что помогает избегать проблемы &quot;мертвых нейронов&quot;.</li>\n<li><strong>Сжатие (Linear)</strong>: Размерность возвращается обратно к <code>n_embd</code>.</li>\n<li><strong>Регуляризация (Dropout)</strong>: Случайное зануление связей для предотвращения переобучения.</li>\n</ol>\n<pre><code class=\"language-python\">self.net = nn.Sequential(\n    nn.Linear(n_embd, 4 * n_embd),\n    nn.GELU(),\n    nn.Linear(4 * n_embd, n_embd),\n    nn.Dropout(dropout)\n)\n</code></pre>\n<h2 id=\"остаточные-связи-residuals\">Остаточные связи (Residuals)</h2>\n<p>Запись вида <code>x = x + layer(x)</code> называется остаточной связью (Residual Connection). \nЗачем она нужна? В очень глубоких сетях градиенты при обучении склонны затухать, проходя через множество нелинейных слоев. Остаточная связь создает своеобразный &quot;шорткат&quot; (короткий путь), по которому градиенты могут беспрепятственно течь от конца сети в самое её начало. Это позволяет обучать сети глубиной в сотни слоев.</p>\n<h2 id=\"схема-движения-данных\">Схема движения данных</h2>\n<pre><code class=\"language-mermaid\">flowchart TD\n    IN[/&quot;Входной тензор x\\n(B, T, C)&quot;/] --&gt; LN1[&quot;LayerNorm 1&quot;]\n    \n    subgraph Attention Phase\n        LN1 --&gt; MSA[&quot;Multi-Head Attention&quot;]\n        MSA --&gt; ADD1((+))\n    end\n    \n    IN --&gt;|Residual Connection| ADD1\n    \n    ADD1 --&gt; LN2[&quot;LayerNorm 2&quot;]\n    \n    subgraph FeedForward Phase\n        LN2 --&gt; FFWD_EXP[&quot;Linear (C -&gt; 4C)&quot;]\n        FFWD_EXP --&gt; GELU[&quot;GELU Activation&quot;]\n        GELU --&gt; FFWD_PROJ[&quot;Linear (4C -&gt; C)&quot;]\n        FFWD_PROJ --&gt; DROP[&quot;Dropout&quot;]\n        DROP --&gt; ADD2((+))\n    end\n    \n    ADD1 --&gt;|Residual Connection| ADD2\n    \n    ADD2 --&gt; OUT[/&quot;Выходной тензор x&#39;\\n(B, T, C)&quot;/]\n\n    style IN fill:#1a1a2e,stroke:#00e5ff,color:#fff\n    style OUT fill:#1a1a2e,stroke:#00e5ff,color:#fff\n    style ADD1 fill:#0984e3,stroke:#fff,color:#fff\n    style ADD2 fill:#0984e3,stroke:#fff,color:#fff\n</code></pre>\n<h2 id=\"глоссарий\">Глоссарий</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Термин</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>GELU</strong></td>\n<td align=\"left\">Функция активации, плавно аппроксимирующая ReLU. $x \\cdot \\Phi(x)$, где $\\Phi(x)$ — кумулятивная функция стандартного нормального распределения.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Pre-Norm</strong></td>\n<td align=\"left\">Архитектурное решение, при котором нормализация выполняется до трансформаций (Attention/MLP), а не после.</td>\n</tr>\n</tbody></table>\n<p align=\"center\">\n  <a href=\"ATTENTION.md\">← Назад: Механизм внимания</a><br/>\n  <sub>Tolstoy LLM • Documentation • 2024</sub>\n</p>\n",
        "readingTime": 4,
        "headings": [
          {
            "text": "Оглавление",
            "id": "оглавление",
            "level": 2
          },
          {
            "text": "Устройство блока (Block)",
            "id": "устройство-блока-block",
            "level": 2
          },
          {
            "text": "LayerNorm и Pre-Norm",
            "id": "layernorm-и-pre-norm",
            "level": 2
          },
          {
            "text": "FeedForward сеть (MLP)",
            "id": "feedforward-сеть-mlp",
            "level": 2
          },
          {
            "text": "Остаточные связи (Residuals)",
            "id": "остаточные-связи-residuals",
            "level": 2
          },
          {
            "text": "Схема движения данных",
            "id": "схема-движения-данных",
            "level": 2
          },
          {
            "text": "Глоссарий",
            "id": "глоссарий",
            "level": 2
          }
        ]
      }
    ]
  },
  {
    "title": "Обучение и датасет",
    "slug": "training",
    "items": [
      {
        "id": "dataset-spec",
        "title": "Подготовка Данных",
        "html": "<h1>📊 Подготовка Данных</h1>\n<div class=\"alert-box alert-note\"><span class=\"alert-icon\">ℹ️</span><strong>Примечание:</strong> <p>Качество генерации напрямую зависит от чистоты входных данных. В этом разделе подробно описан процесс обработки текста, создания словаря, управления датасетами и подготовки данных для PyTorch.</p></div><h2 id=\"оглавление\">📋 Оглавление</h2>\n<ul>\n<li><a href=\"#%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%BA%D0%B0-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B0-data_cleanerpy\">Очистка текста (data_cleaner.py)</a></li>\n<li><a href=\"#%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-input_rutxt\">Структура input_ru.txt</a></li>\n<li><a href=\"#%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C-%D0%B8-%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F\">Словарь и Токенизация</a></li>\n<li><a href=\"#%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D0%B2-pytorch\">Загрузка данных в PyTorch</a></li>\n<li><a href=\"#%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-train-%D0%B8-validation\">Разделение на Train и Validation</a></li>\n<li><a href=\"#%D1%81%D1%82%D0%B0%D1%82%D0%B8%D1%81%D1%82%D0%B8%D0%BA%D0%B0\">Статистика</a></li>\n</ul>\n<h2 id=\"очистка-текста-datacleanerpy\">Очистка текста (data_cleaner.py)</h2>\n<p>Скрипт <code>data_cleaner.py</code> выполняет предварительную обработку сырого текста из <code>raw_text.txt</code>. Грязные данные с артефактами парсинга или нестандартными символами могут сильно ухудшить качество генерации модели.</p>\n<p><strong>Основные этапы очистки:</strong></p>\n<ol>\n<li><strong>Фильтрация символов</strong>: Регулярное выражение <code>[^а-яА-ЯёЁa-zA-Z0-9\\s.,!?;:()\\[\\]&quot;\\&#39;—–-]</code> удаляет все недопустимые знаки (эмодзи, спецсимволы, иероглифы). Это гарантирует, что размер словаря не раздуется из-за редких или случайных символов.</li>\n<li><strong>Нормализация отступов</strong>: Удаление лишних пробелов и сжатие множественных пустых строк в двойные переносы для сохранения структуры абзацев.</li>\n<li><strong>Сохранение регистра</strong>: Мы намеренно сохраняем регистр букв, чтобы модель научилась правильно использовать заглавные буквы в начале предложений и в именах собственных.</li>\n</ol>\n<p><strong>Пример обработки:</strong>\n<em>До очистки:</em> <code>Привет!!! 👋 Как дела?     Это текст\\n\\n\\nс пробелами.</code>\n<em>После очистки:</em> <code>Привет!!! Как дела? Это текст\\n\\nс пробелами.</code></p>\n<h2 id=\"структура-inputrutxt\">Структура input_ru.txt</h2>\n<p>Файл <code>input_ru.txt</code> является основным источником данных для обучения. Это текстовый файл в кодировке <strong>UTF-8</strong>, содержащий очищенный корпус произведений Л.Н. Толстого (или другой выбранный текст).</p>\n<div class=\"alert-box alert-warning\"><span class=\"alert-icon\">⚠️</span><strong>Внимание:</strong> <p>Перед началом обучения убедитесь, что размер <code>input_ru.txt</code> достаточно велик (минимум несколько мегабайт, в идеале от 10 МБ до 100 МБ) для корректного обучения 12-слойной модели. Недостаток данных приведет к переобучению (overfitting).</p></div><h2 id=\"словарь-и-токенизация\">Словарь и Токенизация</h2>\n<p>Процесс превращения текста в числа происходит посимвольно (Character-level). Почему выбран именно этот подход, а не BPE (Byte-Pair Encoding)?</p>\n<ul>\n<li><strong>Простота реализации:</strong> Не требует сложных алгоритмов токенизации.</li>\n<li><strong>Устойчивость к опечаткам:</strong> Модель лучше справляется с нестандартным написанием слов.</li>\n<li><strong>Стилизация:</strong> Позволяет модели точно копировать пунктуацию и длину слов автора.</li>\n</ul>\n<ol>\n<li><strong>Сбор уникальных символов</strong>: <code>chars = sorted(list(set(text)))</code>.</li>\n<li><strong>Маппинг</strong>: Создаются два словаря:<ul>\n<li><code>stoi</code>: символ -&gt; число (индекс).</li>\n<li><code>itos</code>: число -&gt; символ.</li>\n</ul>\n</li>\n<li><strong>Сериализация</strong>: Объекты <code>stoi</code>, <code>itos</code> и <code>vocab_size</code> сохраняются в файл <code>vocab.pkl</code> с помощью библиотеки <code>pickle</code>.</li>\n</ol>\n<pre><code class=\"language-python\"># Пример токенизации\nencode = lambda s: [stoi.get(c, 0) for c in s]\ndecode = lambda l: &#39;&#39;.join([itos.get(i, &#39;&#39;) for i in l])\n\nprint(encode(&quot;Привет&quot;)) # Вывод: [52, 65, 49, 44, 46, 67]\n</code></pre>\n<h2 id=\"загрузка-данных-в-pytorch\">Загрузка данных в PyTorch</h2>\n<p>Для обучения трансформера необходимо сформировать контекстные окна и целевые токены. Если <code>block_size = 256</code>, то мы берем кусок текста длиной 256 символов как вход (<code>x</code>), и смещенный на 1 символ вперед кусок как цель (<code>y</code>).</p>\n<pre><code class=\"language-python\">def get_batch(split):\n    # Генерация случайных индексов для начала контекстного окна\n    data = train_data if split == &#39;train&#39; else val_data\n    ix = torch.randint(len(data) - block_size, (batch_size,))\n    x = torch.stack([data[i:i+block_size] for i in ix])\n    y = torch.stack([data[i+1:i+block_size+1] for i in ix])\n    x, y = x.to(device), y.to(device)\n    return x, y\n</code></pre>\n<h2 id=\"разделение-на-train-и-validation\">Разделение на Train и Validation</h2>\n<p>Весь доступный текст из <code>input_ru.txt</code> обычно делится на обучающую (90%) и валидационную (10%) выборки. </p>\n<ul>\n<li><strong>Train data</strong> используется для обновления весов модели.</li>\n<li><strong>Validation data</strong> используется для контроля переобучения. Мы регулярно измеряем loss на валидационной выборке. Если train loss падает, а validation loss начинает расти, это сигнал о переобучении.</li>\n</ul>\n<h2 id=\"статистика\">Статистика</h2>\n<p>Типичный словарь для русского языка после очистки составляет <strong>~100-110 символов</strong>, включая:</p>\n<ul>\n<li>Алфавит русский (А-Я, а-я, ё).</li>\n<li>Алфавит английский (A-Z, a-z) для заимствований и терминов.</li>\n<li>Цифры (0-9).</li>\n<li>Знаки препинания (.,!?;:).</li>\n<li>Спецсимволы (кавычки, скобки, тире).</li>\n<li>Пробельные символы (\\n, пробел).</li>\n</ul>\n<h2 id=\"глоссарий\">Глоссарий</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Термин</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>Pickle</strong></td>\n<td align=\"left\">Стандартный модуль Python для сериализации и десериализации объектов.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Character-level</strong></td>\n<td align=\"left\">Уровень токенизации, где минимальной единицей является один символ.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Corpus</strong></td>\n<td align=\"left\">Набор текстов, используемый для обучения языковой модели.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Batch</strong></td>\n<td align=\"left\">Пакет данных, обрабатываемый моделью за один шаг оптимизации.</td>\n</tr>\n</tbody></table>\n<p align=\"center\">\n  <a href=\"MODEL.md\">← Назад: Архитектура</a> | <a href=\"TRAINING.md\">Далее: Процесс обучения →</a><br/>\n  <sub>Tolstoy LLM • Documentation • 2024</sub>\n</p>\n",
        "readingTime": 5,
        "headings": [
          {
            "text": "Оглавление",
            "id": "оглавление",
            "level": 2
          },
          {
            "text": "Очистка текста (data_cleaner.py)",
            "id": "очистка-текста-datacleanerpy",
            "level": 2
          },
          {
            "text": "Структура input_ru.txt",
            "id": "структура-inputrutxt",
            "level": 2
          },
          {
            "text": "Словарь и Токенизация",
            "id": "словарь-и-токенизация",
            "level": 2
          },
          {
            "text": "Загрузка данных в PyTorch",
            "id": "загрузка-данных-в-pytorch",
            "level": 2
          },
          {
            "text": "Разделение на Train и Validation",
            "id": "разделение-на-train-и-validation",
            "level": 2
          },
          {
            "text": "Статистика",
            "id": "статистика",
            "level": 2
          },
          {
            "text": "Глоссарий",
            "id": "глоссарий",
            "level": 2
          }
        ]
      },
      {
        "id": "dataset-guide",
        "title": "Сбор и подготовка датасета",
        "html": "<h1>📚 Сбор и подготовка датасета</h1>\n<div class=\"alert-box alert-note\"><span class=\"alert-icon\">ℹ️</span><strong>Примечание:</strong> <p>Качество генерации текста нейросетью напрямую зависит от качества и объема входных данных. Если вы загрузите &quot;грязный&quot; текст, модель будет генерировать мусор.</p></div><h2 id=\"оглавление\">📋 Оглавление</h2>\n<ol>\n<li><a href=\"#%D0%B3%D0%B4%D0%B5-%D0%B1%D1%80%D0%B0%D1%82%D1%8C-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D1%8B-%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B8\">Где брать тексты (Источники)</a></li>\n<li><a href=\"#%D1%80%D0%B5%D0%BA%D0%BE%D0%BC%D0%B5%D0%BD%D0%B4%D0%B0%D1%86%D0%B8%D0%B8-%D0%BF%D0%BE-%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%D1%83\">Рекомендации по размеру</a></li>\n<li><a href=\"#%D1%82%D0%BE%D0%BD%D0%BA%D0%B0%D1%8F-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%BA%D0%B8\">Тонкая настройка очистки</a></li>\n<li><a href=\"#%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE%D1%8F%D0%B7%D1%8B%D1%87%D0%BD%D0%BE%D1%81%D1%82%D1%8C-ruen\">Многоязычность (RU/EN)</a></li>\n<li><a href=\"#%D1%87%D0%B5%D0%BA-%D0%BB%D0%B8%D1%81%D1%82-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC\">Чек-лист перед обучением</a></li>\n<li><a href=\"#%D0%B3%D0%BB%D0%BE%D1%81%D1%81%D0%B0%D1%80%D0%B8%D0%B9\">Глоссарий</a></li>\n</ol>\n<hr>\n<h2 id=\"где-брать-тексты-источники\">🌐 Где брать тексты (Источники)</h2>\n<p>Для обучения хорошей модели требуется качественная литература. Вот список проверенных ресурсов:</p>\n<ul>\n<li><strong>Библиотека Максима Мошкова (Lib.ru)</strong>: Огромный архив русской классики в формате <code>.txt</code>.</li>\n<li><strong>Project Gutenberg</strong>: Лучший источник для англоязычных текстов и мировой классики.</li>\n<li><strong>Викитека (Wikisource)</strong>: Удобно для поиска конкретных исторических документов.</li>\n<li><strong>Kaggle Datasets</strong>: Готовые корпуса текстов (например, &quot;Все стихи Пушкина&quot; или &quot;Диалоги из фильмов&quot;).</li>\n</ul>\n<hr>\n<h2 id=\"рекомендации-по-размеру\">📏 Рекомендации по размеру</h2>\n<p>Tolstoy AI — это посимвольная модель. Она учится на каждом знаке, включая пробелы и точки.</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Размер файла</th>\n<th align=\"left\">Эпох до качества</th>\n<th align=\"left\">Результат</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>100 КБ - 500 КБ</strong></td>\n<td align=\"left\">2000 - 5000</td>\n<td align=\"left\">Модель выучит короткие фразы, но будет часто повторяться.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>1 МБ - 10 МБ</strong></td>\n<td align=\"left\">5000 - 10000</td>\n<td align=\"left\"><strong>Золотая середина</strong>. Хорошая грамматика, узнаваемый стиль автора.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>50 МБ - 200 МБ</strong></td>\n<td align=\"left\">20000+</td>\n<td align=\"left\">Высокий уровень &quot;интеллекта&quot;. Требует мощной видеокарты (VRAM).</td>\n</tr>\n</tbody></table>\n<hr>\n<h2 id=\"тонкая-настройка-очистки\">🧹 Тонкая настройка очистки</h2>\n<p>Модуль <code>data_cleaner.py</code> можно настроить под себя. Если вы откроете файл, вы увидите блок регулярных выражений:</p>\n<pre><code class=\"language-python\"># Пример кастомного правила в data_cleaner.py\ntext = re.sub(r&#39;\\[\\d+\\]&#39;, &#39;&#39;, text) # Удаляет ссылки типа [1], [22]\ntext = re.sub(r&#39;\\n{3,}&#39;, &#39;\\n\\n&#39;, text) # Убирает лишние пустые строки\n</code></pre>\n<div class=\"alert-box alert-tip\"><span class=\"alert-icon\">💡</span><strong>Совет:</strong> <p>Если ваш текст содержит много технических пометок (например, &quot;Глава 1&quot;, &quot;Стр. 5&quot;), лучше удалить их регулярными выражениями перед запуском очистки, чтобы модель не пыталась их генерировать в середине предложения.</p></div><hr>\n<h2 id=\"многоязычность-ruen\">🇷🇺 Многоязычность (RU/EN)</h2>\n<p>Tolstoy AI поддерживает смешанные датасеты. Однако есть нюансы:</p>\n<ol>\n<li><strong>Размер словаря</strong>: Если в тексте 50% русского и 50% английского, размер <code>vocab_size</code> вырастет. Это потребует небольшого увеличения <code>n_embd</code>.</li>\n<li><strong>Доминирующий язык</strong>: Модель будет лучше писать на том языке, которого в датасете больше. </li>\n<li><strong>Кодировка</strong>: Обязательно сохраняйте файлы в <strong>UTF-8</strong>, иначе английские буквы сохранятся, а русские превратятся в &quot;кракозябры&quot;.</li>\n</ol>\n<hr>\n<h2 id=\"чек-лист-перед-обучением\">✅ Чек-лист перед обучением</h2>\n<p>Проверьте эти пункты, прежде чем нажать <strong>[3] Обучение</strong>:</p>\n<ul>\n<li><input disabled=\"\" type=\"checkbox\"> Файл <code>raw_text.txt</code> существует в корне.</li>\n<li><input disabled=\"\" type=\"checkbox\"> Вы запустили <strong>[2] Очистка данных</strong> после последнего изменения текста.</li>\n<li><input disabled=\"\" type=\"checkbox\"> В файле <code>input_ru.txt</code> нет мусора (проверьте начало и конец файла).</li>\n<li><input disabled=\"\" type=\"checkbox\"> Размер словаря в консоли (Vocab Size) адекватен (обычно 80-120 символов).</li>\n<li><input disabled=\"\" type=\"checkbox\"> У вас достаточно места на диске для сохранения весов (<code>model_weights.pth</code> ~100-300 МБ).</li>\n</ul>\n<hr>\n<h2 id=\"диаграмма-потока-данных\">🔄 Диаграмма потока данных</h2>\n<pre><code class=\"language-mermaid\">flowchart LR\n    RAW[/raw_text.txt/] --&gt; CLEAN[&quot;data_cleaner.py&quot;]\n    CLEAN --&gt; INPUT[/input_ru.txt/]\n    INPUT --&gt; TRAIN[&quot;train.py&quot;]\n    TRAIN --&gt; MODEL[&quot;model_weights.pth&quot;]\n    \n    style RAW fill:#f9f,stroke:#333,stroke-width:2px\n    style INPUT fill:#00ff00,stroke:#333,stroke-width:2px\n    style MODEL fill:#00ffff,stroke:#333,stroke-width:4px\n</code></pre>\n<hr>\n<h2 id=\"глоссарий\">Глоссарий</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Термин</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>Корпус</strong></td>\n<td align=\"left\">Собрание текстов, объединенных по какому-либо признаку (автор, эпоха, жанр).</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Regex</strong></td>\n<td align=\"left\">Регулярные выражения — мощный инструмент для поиска и замены текста по шаблонам.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Token</strong></td>\n<td align=\"left\">В нашем случае 1 токен = 1 символ.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Epoch</strong></td>\n<td align=\"left\">Условный цикл, за который модель &quot;прочитывает&quot; весь ваш датасет один раз.</td>\n</tr>\n</tbody></table>\n<p align=\"center\">\n  <a href=\"QUICK_START.md\">← Назад: Быстрый старт</a> | <a href=\"HYPERPARAMETERS.md\">Далее: Гиперпараметры →</a><br/>\n  <sub>Tolstoy AI • Documentation • 2024</sub>\n</p>\n",
        "readingTime": 4,
        "headings": [
          {
            "text": "Оглавление",
            "id": "оглавление",
            "level": 2
          },
          {
            "text": "Где брать тексты (Источники)",
            "id": "где-брать-тексты-источники",
            "level": 2
          },
          {
            "text": "Рекомендации по размеру",
            "id": "рекомендации-по-размеру",
            "level": 2
          },
          {
            "text": "Тонкая настройка очистки",
            "id": "тонкая-настройка-очистки",
            "level": 2
          },
          {
            "text": "Многоязычность (RU/EN)",
            "id": "многоязычность-ruen",
            "level": 2
          },
          {
            "text": "Чек-лист перед обучением",
            "id": "чек-лист-перед-обучением",
            "level": 2
          },
          {
            "text": "Диаграмма потока данных",
            "id": "диаграмма-потока-данных",
            "level": 2
          },
          {
            "text": "Глоссарий",
            "id": "глоссарий",
            "level": 2
          }
        ]
      },
      {
        "id": "training-process",
        "title": "Процесс Обучения",
        "html": "<h1>🚂 Процесс Обучения</h1>\n<div class=\"alert-box alert-tip\"><span class=\"alert-icon\">💡</span><strong>Совет:</strong> <p>В этом разделе детально описан жизненный цикл обучения модели, настройка оптимизатора, управление аппаратным ускорением и логирование процесса сходимости.</p></div><h2 id=\"оглавление\">📋 Оглавление</h2>\n<ul>\n<li><a href=\"#%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F\">Запуск обучения</a></li>\n<li><a href=\"#%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0-%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2\">Поддержка устройств</a></li>\n<li><a href=\"#%D0%BB%D0%BE%D0%B3%D0%B8%D0%BA%D0%B0-%D0%BE%D0%BF%D1%82%D0%B8%D0%BC%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8\">Логика оптимизации</a></li>\n<li><a href=\"#%D0%BE%D1%86%D0%B5%D0%BD%D0%BA%D0%B0-validation\">Оценка (Validation)</a></li>\n<li><a href=\"#%D1%81%D0%BE%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B8-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0-%D1%87%D0%B5%D0%BA%D0%BF%D0%BE%D0%B8%D0%BD%D1%82%D0%BE%D0%B2\">Сохранение и загрузка чекпоинтов</a></li>\n</ul>\n<h2 id=\"запуск-обучения\">Запуск обучения</h2>\n<p>Обучение инициируется скриптом <code>train.py</code>. Перед запуском рекомендуется проверить наличие очищенного датасета <code>input_ru.txt</code>.</p>\n<pre><code class=\"language-bash\">python train.py\n</code></pre>\n<p><strong>Что происходит под капотом:</strong></p>\n<ol>\n<li><strong>Инициализация</strong>: Настройка логгера, сидирование случайных генераторов (<code>torch.manual_seed</code>) для воспроизводимости.</li>\n<li><strong>Определение устройства</strong>: Автоматический поиск GPU/MPS.</li>\n<li><strong>Загрузка данных</strong>: Чтение текста, токенизация, создание и сохранение <code>vocab.pkl</code>.</li>\n<li><strong>Инстанцирование модели</strong>: Создание <code>SimpleLLM</code> и перенос её на выбранное устройство.</li>\n<li><strong>Тренировочный цикл</strong>: Запуск итераций с вычислением Loss, обратным распространением ошибки (Backpropagation) и обновлением весов.</li>\n</ol>\n<h2 id=\"поддержка-устройств\">Поддержка устройств</h2>\n<p>Проект использует универсальную систему определения железа (находится в <code>utils.py</code>), чтобы обеспечить кроссплатформенность без изменения кода.</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Платформа</th>\n<th align=\"left\">Устройство</th>\n<th align=\"left\">Технологии ускорения</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>NVIDIA</strong></td>\n<td align=\"left\"><code>cuda</code></td>\n<td align=\"left\">Поддержка <code>bfloat16</code>, <code>FlashAttention-2</code>, <code>torch.compile</code> (на Linux).</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Apple Silicon</strong></td>\n<td align=\"left\"><code>mps</code></td>\n<td align=\"left\">Ускорение на GPU Mac (M1/M2/M3) через Metal Performance Shaders.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Intel / AMD</strong></td>\n<td align=\"left\"><code>xpu</code> / <code>cuda</code></td>\n<td align=\"left\">Поддержка ROCm для AMD или XPU для дискретных карт Intel.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>CPU</strong></td>\n<td align=\"left\"><code>cpu</code></td>\n<td align=\"left\">Автоматически используется, если нет аппаратного ускорителя. Крайне медленно.</td>\n</tr>\n</tbody></table>\n<div class=\"alert-box alert-note\"><span class=\"alert-icon\">ℹ️</span><strong>Примечание:</strong> <p>На системах с CUDA для ускорения обучения используется <code>torch.autocast</code>. Вычисления происходят в смешанной точности (Mixed Precision), что значительно экономит видеопамять и ускоряжает матрицы.</p></div><h2 id=\"логика-оптимизации\">Логика оптимизации</h2>\n<p>Обучение трансформера требует тонкой настройки гипепараметров. В Tolstoy LLM мы применяем современные практики:</p>\n<ul>\n<li><strong>Оптимизатор</strong>: Мы используем <code>torch.optim.AdamW</code>. В отличие от стандартного Adam, AdamW корректно применяет <code>weight_decay</code> (регуляризацию L2), что критически важно для предотвращения переобучения трансформеров.</li>\n<li><strong>Разделение параметров</strong>: <code>weight_decay</code> применяется к матрицам весов (Linear, Embedding), но <strong>не применяется</strong> к смещениям (biases) и параметрам 1D слоев нормализации (LayerNorm). Это стандартная практика.</li>\n<li><strong>Gradient Accumulation (Накопление градиентов)</strong>: Если объем памяти GPU не позволяет использовать большой размер батча (batch_size), мы можем делать несколько проходов <code>forward+backward</code> перед вызовом <code>optimizer.step()</code>. Это математически эквивалентно большему батчу.</li>\n<li><strong>Gradient Clipping</strong>: <code>torch.nn.utils.clip_grad_norm_</code>. Норма градиентов ограничивается значением 1.0. Это защищает от проблемы &quot;взрывающихся градиентов&quot;, когда один неудачный батч может разрушить веса модели.</li>\n</ul>\n<h2 id=\"оценка-validation\">Оценка (Validation)</h2>\n<p>Чтобы понимать, насколько хорошо обучается модель, каждые $N$ итераций (например, <code>eval_interval = 500</code>) запускается функция <code>estimate_loss()</code>. </p>\n<p>В этом режиме:</p>\n<ol>\n<li>Модель переводится в режим оценки: <code>model.eval()</code>.</li>\n<li>Отключается расчет градиентов: <code>with torch.no_grad():</code>.</li>\n<li>Loss усредняется по нескольким батчам (<code>eval_iters</code>) для тренировочной и валидационной выборок.</li>\n</ol>\n<p>Если <code>val_loss</code> начинает стабильно расти, пока <code>train_loss</code> продолжает падать, это явный признак переобучения. Обучение следует остановить или увеличить регуляризацию (dropout/weight_decay).</p>\n<h2 id=\"сохранение-и-загрузка-чекпоинтов\">Сохранение и загрузка чекпоинтов</h2>\n<p>По завершении обучения (или при достижении лучшего <code>val_loss</code>) веса модели сохраняются в файл <code>model_weights.pth</code>.</p>\n<pre><code class=\"language-python\"># Сохранение (только веса)\ntorch.save(model.state_dict(), Config.weights_path)\n\n# Загрузка\nmodel.load_state_dict(torch.load(Config.weights_path, map_location=device))\n</code></pre>\n<p>Сохранение только <code>state_dict</code> вместо всего объекта модели делает файл весов более компактным, безопасным и не зависящим от конкретной структуры директорий.</p>\n<h2 id=\"глоссарий\">Глоссарий</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Термин</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>Loss (Ошибка)</strong></td>\n<td align=\"left\">Функция потерь. Для языковых моделей используется Cross Entropy. Меньше = лучше.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Iteration / Step</strong></td>\n<td align=\"left\">Один шаг обновления весов модели после обработки батча данных.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Mixed Precision</strong></td>\n<td align=\"left\">Использование форматов данных с плавающей запятой пониженной точности (FP16/BF16) для ускорения.</td>\n</tr>\n</tbody></table>\n<p align=\"center\">\n  <a href=\"DATASET.md\">← Назад: Подготовка данных</a> | <a href=\"subdocs/SIMPLE_LLM.md\">Далее: Разбор кода (SimpleLLM) →</a><br/>\n  <sub>Tolstoy LLM • Documentation • 2024</sub>\n</p>\n",
        "readingTime": 4,
        "headings": [
          {
            "text": "Оглавление",
            "id": "оглавление",
            "level": 2
          },
          {
            "text": "Запуск обучения",
            "id": "запуск-обучения",
            "level": 2
          },
          {
            "text": "Поддержка устройств",
            "id": "поддержка-устройств",
            "level": 2
          },
          {
            "text": "Логика оптимизации",
            "id": "логика-оптимизации",
            "level": 2
          },
          {
            "text": "Оценка (Validation)",
            "id": "оценка-validation",
            "level": 2
          },
          {
            "text": "Сохранение и загрузка чекпоинтов",
            "id": "сохранение-и-загрузка-чекпоинтов",
            "level": 2
          },
          {
            "text": "Глоссарий",
            "id": "глоссарий",
            "level": 2
          }
        ]
      },
      {
        "id": "hyperparameters",
        "title": "Настройка гиперпараметров",
        "html": "<h1>⚙️ Настройка гиперпараметров</h1>\n<div class=\"alert-box alert-tip\"><span class=\"alert-icon\">💡</span><strong>Совет:</strong> <p><strong>Гиперпараметры</strong> — это &quot;ручки управления&quot;, которые определяют архитектуру мозга нейросети и то, как именно она будет учиться. В Tolstoy AI они находятся в файле <code>config.py</code>.</p></div><h2 id=\"оглавление\">📋 Оглавление</h2>\n<ol>\n<li><a href=\"#%D1%80%D0%B0%D0%B7%D0%B1%D0%BE%D1%80-%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B2%D1%8B%D1%85-%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D0%B0%D0%BD%D1%82\">Разбор ключевых констант</a></li>\n<li><a href=\"#%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D1%8B%D0%B5-%D1%80%D0%B5%D1%86%D0%B5%D0%BF%D1%82%D1%8B-%D0%BF%D1%80%D0%B5%D1%81%D0%B5%D1%82%D1%8B\">Золотые рецепты (Пресеты)</a></li>\n<li><a href=\"#%D0%B3%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%BE%D0%B5-%D0%BF%D0%BE%D0%B3%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-learning-rate\">Глубокое погружение: Learning Rate</a></li>\n<li><a href=\"#%D1%80%D0%B5%D0%B3%D1%83%D0%BB%D1%8F%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-dropout-%D0%B8-weight-decay\">Регуляризация (Dropout и Weight Decay)</a></li>\n<li><a href=\"#%D1%80%D0%B0%D1%81%D1%87%D0%B5%D1%82-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-vram\">Расчет памяти (VRAM)</a></li>\n<li><a href=\"#%D0%B3%D0%BB%D0%BE%D1%81%D1%81%D0%B0%D1%80%D0%B8%D0%B9\">Глоссарий</a></li>\n</ol>\n<hr>\n<h2 id=\"разбор-ключевых-констант\">🔍 Разбор ключевых констант</h2>\n<p>Все настройки хранятся в классе <code>Config</code> в файле <code>config.py</code>.</p>\n<h3 id=\"архитектура-модели\">🏗 Архитектура модели</h3>\n<ul>\n<li><strong><code>n_layer</code></strong>: Количество слоев Трансформера. Влияет на способность модели понимать сложные логические связи.</li>\n<li><strong><code>n_embd</code></strong>: Ширина сети. Чем больше, тем точнее модель описывает нюансы стиля, но тем тяжелее она становится.</li>\n<li><strong><code>block_size</code></strong>: Окно памяти. Если <code>block_size = 256</code>, модель видит только последние 256 символов.</li>\n</ul>\n<hr>\n<h2 id=\"золотые-рецепты-пресеты\">🍳 Золотые рецепты (Пресеты)</h2>\n<p>Выберите пресет в зависимости от вашего железа:</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Пресет</th>\n<th align=\"left\">Железо</th>\n<th align=\"left\">n_layer</th>\n<th align=\"left\">n_embd</th>\n<th align=\"left\">batch_size</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>&quot;Минимальный&quot;</strong></td>\n<td align=\"left\">Обычный ноутбук (CPU)</td>\n<td align=\"left\">4</td>\n<td align=\"left\">128</td>\n<td align=\"left\">8</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>&quot;Стандарт&quot;</strong></td>\n<td align=\"left\">GPU (4-6 ГБ VRAM)</td>\n<td align=\"left\">8</td>\n<td align=\"left\">384</td>\n<td align=\"left\">32</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>&quot;Толстой&quot;</strong></td>\n<td align=\"left\">GPU (8-12 ГБ VRAM)</td>\n<td align=\"left\">12</td>\n<td align=\"left\">768</td>\n<td align=\"left\">64</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>&quot;Максимум&quot;</strong></td>\n<td align=\"left\">GPU (24 ГБ VRAM)</td>\n<td align=\"left\">24</td>\n<td align=\"left\">1024</td>\n<td align=\"left\">128</td>\n</tr>\n</tbody></table>\n<hr>\n<h2 id=\"глубокое-погружение-learning-rate\">🚄 Глубокое погружение: Learning Rate</h2>\n<p><code>learning_rate</code> — это, пожалуй, самая важная цифра. Она определяет размер шага, который делает модель в сторону правильного ответа.</p>\n<ul>\n<li><strong>Слишком высокий ( &gt; 1e-3)</strong>: Модель будет &quot;перепрыгивать&quot; через правильное решение. Loss станет <code>NaN</code>.</li>\n<li><strong>Слишком низкий ( &lt; 1e-5)</strong>: Обучение будет идти вечность, и модель может застрять в &quot;локальном минимуме&quot; (выучить одну фразу и повторять её).</li>\n</ul>\n<div class=\"alert-box alert-important\"><span class=\"alert-icon\">📢</span><strong>Важно:</strong> <p>Мы используем косинусное расписание (<code>Cosine Annealing</code>). Это значит, что в начале шаги большие, а к концу обучения они становятся микроскопическими для точной подстройки весов.</p></div><hr>\n<h2 id=\"регуляризация-dropout-и-weight-decay\">🛡 Регуляризация (Dropout и Weight Decay)</h2>\n<p>Чтобы модель не зазубривала текст (Overfitting), используются два механизма:</p>\n<ol>\n<li><strong><code>dropout</code> (0.1 - 0.2)</strong>: Случайное &quot;выключение&quot; нейронов во время обучения. Это заставляет сеть искать общие правила языка, а не полагаться на конкретные связи.</li>\n<li><strong><code>weight_decay</code> (0.1)</strong>: Штраф за слишком большие веса. Удерживает &quot;мозг&quot; модели в рамках, не давая отдельным параметрам стать слишком доминирующими.</li>\n</ol>\n<hr>\n<h2 id=\"расчет-памяти-vram\">📊 Расчет памяти (VRAM)</h2>\n<p>Потребление памяти растет линейно от количества слоев и <strong>квадратично</strong> от <code>block_size</code>.</p>\n<p>Примерная формула:\n<code>Memory ≈ (n_layer * n_head * block_size^2) * batch_size * 4 bytes</code></p>\n<p>Если вы получили ошибку <code>CUDA Out of Memory</code>:</p>\n<ol>\n<li>Уменьшите <code>batch_size</code> (это не влияет на качество, только на скорость).</li>\n<li>Если не помогло, уменьшите <code>block_size</code> до 128.</li>\n<li>В крайнем случае снижайте <code>n_embd</code>.</li>\n</ol>\n<hr>\n<h2 id=\"диаграмма-зависимостей\">📊 Диаграмма зависимостей</h2>\n<pre><code class=\"language-mermaid\">flowchart TD\n    PARAMS[&quot;Параметры (n_layer, n_embd)&quot;] --&gt; QUALITY[&quot;Качество текста&quot;]\n    PARAMS --&gt; MEMORY[&quot;Потребление памяти (VRAM)&quot;]\n    PARAMS --&gt; SPEED[&quot;Время обучения (Time)&quot;]\n\n    style QUALITY fill:#00b894,color:#fff\n    style MEMORY fill:#d63031,color:#fff\n    style SPEED fill:#fdcb6e,color:#000\n</code></pre>\n<hr>\n<h2 id=\"глоссарий\">Глоссарий</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Термин</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>VRAM</strong></td>\n<td align=\"left\">Видеопамять вашей видеокарты.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Loss</strong></td>\n<td align=\"left\">Ошибка модели. Чем она меньше, тем лучше модель предсказывает следующий символ.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Convergence</strong></td>\n<td align=\"left\">Сходимость — состояние, когда модель перестает улучшаться и Loss стабилизируется.</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Linear Layer</strong></td>\n<td align=\"left\">Слой, выполняющий умножение весов на входные данные.</td>\n</tr>\n</tbody></table>\n<p align=\"center\">\n  <a href=\"DATASET_GUIDE.md\">← Назад: Сбор датасета</a> | <a href=\"DEBUG_AND_EVALUATION.md\">Далее: Debug и анализ →</a><br/>\n  <sub>Tolstoy AI • Documentation • 2024</sub>\n</p>\n",
        "readingTime": 4,
        "headings": [
          {
            "text": "Оглавление",
            "id": "оглавление",
            "level": 2
          },
          {
            "text": "Разбор ключевых констант",
            "id": "разбор-ключевых-констант",
            "level": 2
          },
          {
            "text": "Архитектура модели",
            "id": "архитектура-модели",
            "level": 3
          },
          {
            "text": "Золотые рецепты (Пресеты)",
            "id": "золотые-рецепты-пресеты",
            "level": 2
          },
          {
            "text": "Глубокое погружение: Learning Rate",
            "id": "глубокое-погружение-learning-rate",
            "level": 2
          },
          {
            "text": "Регуляризация (Dropout и Weight Decay)",
            "id": "регуляризация-dropout-и-weight-decay",
            "level": 2
          },
          {
            "text": "Расчет памяти (VRAM)",
            "id": "расчет-памяти-vram",
            "level": 2
          },
          {
            "text": "Диаграмма зависимостей",
            "id": "диаграмма-зависимостей",
            "level": 2
          },
          {
            "text": "Глоссарий",
            "id": "глоссарий",
            "level": 2
          }
        ]
      }
    ]
  },
  {
    "title": "Отладка и CLI",
    "slug": "debug",
    "items": [
      {
        "id": "debug-evaluation",
        "title": "Debug режим и лингвистический анализ",
        "html": "<h1>🔍 Debug режим и лингвистический анализ</h1>\n<div class=\"alert-box alert-tip\"><span class=\"alert-icon\">💡</span><strong>Совет:</strong> <p>Качественная модель — это не только низкий Loss, но и структурно правильный текст. В Tolstoy AI встроен уникальный движок &quot;лингвистического аудита&quot;, который оценивает синтаксис нейросети по 4 группам паттернов русского языка.</p></div><h2 id=\"оглавление\">📋 Оглавление</h2>\n<ol>\n<li><a href=\"#%D1%84%D0%B8%D0%BB%D0%BE%D1%81%D0%BE%D1%84%D0%B8%D1%8F-%D0%B4%D0%B8%D0%B0%D0%B3%D0%BD%D0%BE%D1%81%D1%82%D0%B8%D0%BA%D0%B8\">Философия диагностики</a></li>\n<li><a href=\"#%D0%BD%D0%B0%D0%B2%D0%B8%D0%B3%D0%B0%D1%86%D0%B8%D1%8F-%D0%BF%D0%BE-debug-menu\">Навигация по Debug Menu</a></li>\n<li><a href=\"#%D0%BF%D1%83%D0%BD%D0%BA%D1%82-1--%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7-%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8\">Пункт 1 — Анализ модели</a></li>\n<li><a href=\"#%D0%BF%D1%83%D0%BD%D0%BA%D1%82-2--%D1%82%D0%B5%D1%81%D1%82-%D0%BF%D1%80%D0%BE%D0%B8%D0%B7%D0%B2%D0%BE%D0%B4%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8\">Пункт 2 — Тест производительности</a></li>\n<li><a href=\"#%D0%BF%D1%83%D0%BD%D0%BA%D1%82-3--%D0%B4%D0%B8%D0%B0%D0%B3%D0%BD%D0%BE%D1%81%D1%82%D0%B8%D0%BA%D0%B0-%D0%B6%D0%B5%D0%BB%D0%B5%D0%B7%D0%B0\">Пункт 3 — Диагностика железа</a></li>\n<li><a href=\"#%D0%BF%D1%83%D0%BD%D0%BA%D1%82-4--%D1%81%D1%82%D0%B0%D1%82%D0%B8%D1%81%D1%82%D0%B8%D0%BA%D0%B0-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85\">Пункт 4 — Статистика данных</a></li>\n<li><a href=\"#%D0%BF%D1%83%D0%BD%D0%BA%D1%82-5--%D0%BF%D1%80%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80-%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D0%B8\">Пункт 5 — Просмотр конфигурации</a></li>\n<li><a href=\"#%D0%BF%D1%83%D0%BD%D0%BA%D1%82-6--%D0%BB%D0%B8%D0%BD%D0%B3%D0%B2%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9-%D0%B0%D1%83%D0%B4%D0%B8%D1%82\">Пункт 6 — Лингвистический аудит</a></li>\n<li><a href=\"#%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC-%D1%81%D0%BE%D0%B1%D0%B8%D1%80%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-%D0%BF%D1%80%D0%BE%D0%BC%D0%BF%D1%82%D0%B0\">Алгоритм «Собиратель промпта»</a></li>\n<li><a href=\"#heuristicsyntaxengine--%D0%B4%D0%B2%D0%B8%D0%B6%D0%BE%D0%BA-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0\">HeuristicSyntaxEngine — движок анализа</a></li>\n<li><a href=\"#%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0-%D1%81%D0%BA%D0%BE%D1%80%D0%B8%D0%BD%D0%B3%D0%B0\">Система скоринга</a></li>\n<li><a href=\"#%D1%8D%D0%B2%D0%BE%D0%BB%D1%8E%D1%86%D0%B8%D1%8F-%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8-%D0%BF%D0%BE-%D0%B8%D1%82%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D1%8F%D0%BC\">Эволюция модели по итерациям</a></li>\n<li><a href=\"#%D0%B4%D0%B8%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%8B\">Диаграммы</a></li>\n<li><a href=\"#%D0%B3%D0%BB%D0%BE%D1%81%D1%81%D0%B0%D1%80%D0%B8%D0%B9\">Глоссарий</a></li>\n</ol>\n<hr>\n<h2 id=\"философия-диагностики\">🎯 Философия диагностики</h2>\n<p>Loss (функция потерь) показывает лишь числовую ошибку предсказания. Но модель с Loss = 1.2 может генерировать бессвязный набор слов, а модель с Loss = 1.5 — грамматически правильные предложения. Debug Menu решает эту проблему, предоставляя инструменты для <strong>качественной</strong> оценки модели.</p>\n<p><strong>Когда использовать Debug Menu:</strong></p>\n<ul>\n<li><strong>До обучения</strong>: Пункты [3], [4], [5] — проверить железо, данные и конфигурацию.</li>\n<li><strong>Во время обучения</strong>: Пункт [1] — убедиться, что веса не &quot;взорвались&quot;.</li>\n<li><strong>После обучения</strong>: Пункты [2], [6] — замерить скорость и оценить качество текста.</li>\n</ul>\n<hr>\n<h2 id=\"навигация-по-debug-menu\">🗺 Навигация по Debug Menu</h2>\n<p>В главном меню <code>cli.py</code> выберите пункт <strong>[5] 🛠️ Debug Menu</strong>. Откроется подменю с шестью инструментами:</p>\n<table>\n<thead>\n<tr>\n<th align=\"center\">Пункт</th>\n<th align=\"left\">Название</th>\n<th align=\"left\">Модуль</th>\n<th align=\"left\">Что делает</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"center\"><strong>[1]</strong></td>\n<td align=\"left\">Анализ модели</td>\n<td align=\"left\"><code>get_model_stats()</code></td>\n<td align=\"left\">Архитектура слоев, статистика весов (Mean/Std/Min/Max)</td>\n</tr>\n<tr>\n<td align=\"center\"><strong>[2]</strong></td>\n<td align=\"left\">Тест производительности</td>\n<td align=\"left\"><code>benchmark_inference()</code></td>\n<td align=\"left\">Замер tok/s, latency, cold start, VRAM</td>\n</tr>\n<tr>\n<td align=\"center\"><strong>[3]</strong></td>\n<td align=\"left\">Диагностика железа</td>\n<td align=\"left\"><code>get_device_info()</code></td>\n<td align=\"left\">Тип GPU, объём VRAM, dtype для autocast</td>\n</tr>\n<tr>\n<td align=\"center\"><strong>[4]</strong></td>\n<td align=\"left\">Статистика данных</td>\n<td align=\"left\"><code>get_data_stats()</code></td>\n<td align=\"left\">Размер корпуса, vocab_size, Top-10 символов</td>\n</tr>\n<tr>\n<td align=\"center\"><strong>[5]</strong></td>\n<td align=\"left\">Просмотр конфигурации</td>\n<td align=\"left\"><code>Config.to_dict()</code></td>\n<td align=\"left\">Все параметры из <code>config.py</code></td>\n</tr>\n<tr>\n<td align=\"center\"><strong>[6]</strong></td>\n<td align=\"left\">Лингвистический аудит</td>\n<td align=\"left\"><code>evaluate_generation_quality()</code></td>\n<td align=\"left\">Глубокий синтаксический тест с вердиктом</td>\n</tr>\n</tbody></table>\n<hr>\n<h2 id=\"пункт-1-анализ-модели\">📊 Пункт [1] — Анализ модели</h2>\n<p>Функция <code>model_analysis()</code> создаёт экземпляр <code>SimpleLLM</code>, загружает веса из <code>model_weights.pth</code> и вызывает <code>get_model_stats()</code>.</p>\n<p><strong>Выходная таблица содержит колонки:</strong></p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Колонка</th>\n<th align=\"left\">Описание</th>\n<th align=\"left\">Здоровые значения</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>Layer Name</strong></td>\n<td align=\"left\">Полное имя параметра (например, <code>blocks.0.attn.c_attn.weight</code>)</td>\n<td align=\"left\">—</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Shape</strong></td>\n<td align=\"left\">Размерность тензора (например, <code>[768, 2304]</code>)</td>\n<td align=\"left\">—</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Params</strong></td>\n<td align=\"left\">Количество параметров в слое</td>\n<td align=\"left\">—</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Mean</strong></td>\n<td align=\"left\">Среднее значение весов</td>\n<td align=\"left\">Близко к <strong>0.0</strong> (±0.01)</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Std</strong></td>\n<td align=\"left\">Стандартное отклонение</td>\n<td align=\"left\"><strong>0.01 – 0.1</strong> для линейных слоев</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Min / Max</strong></td>\n<td align=\"left\">Экстремальные значения</td>\n<td align=\"left\">Не должны превышать ±5.0</td>\n</tr>\n</tbody></table>\n<div class=\"alert-box alert-warning\"><span class=\"alert-icon\">⚠️</span><strong>Внимание:</strong> <p>Если <strong>Std &gt; 1.0</strong> или <strong>Max &gt; 10.0</strong> — это признак &quot;взрыва градиентов&quot;. Уменьшите <code>learning_rate</code> в <code>config.py</code> или проверьте, что Gradient Clipping активен в <code>train.py</code>.</p></div><div class=\"alert-box alert-note\"><span class=\"alert-icon\">ℹ️</span><strong>Примечание:</strong> <p>Если веса не загружены (файл <code>model_weights.pth</code> отсутствует), таблица покажет только архитектуру без статистики. Общее число параметров модели при стандартной конфигурации (12 слоев, 768 embd) составляет около <strong>85 миллионов</strong>.</p></div><hr>\n<h2 id=\"пункт-2-тест-производительности\">🚀 Пункт [2] — Тест производительности</h2>\n<p>Функция <code>performance_bench()</code> использует <code>benchmark_inference()</code> из <code>utils.py</code>. Методология:</p>\n<ol>\n<li><strong>Cold Start</strong>: Генерация 5 токенов &quot;на холодную&quot; (первый вызов, загрузка ядер GPU).</li>\n<li><strong>Warmup</strong>: Один прогон из 50 токенов для прогрева кешей.</li>\n<li><strong>Benchmark</strong>: 10 итераций по 50 токенов с замером времени каждой.</li>\n</ol>\n<p><strong>Выходные метрики:</strong></p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Метрика</th>\n<th align=\"left\">Что значит</th>\n<th align=\"left\">Пример</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>Tokens per Second</strong></td>\n<td align=\"left\">Скорость генерации символов</td>\n<td align=\"left\">350.00 tok/s</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Latency per Token</strong></td>\n<td align=\"left\">Время на один символ</td>\n<td align=\"left\">2.86 ms</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Cold Start</strong></td>\n<td align=\"left\">Задержка первого вызова</td>\n<td align=\"left\">1200 ms</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Avg Batch Time</strong></td>\n<td align=\"left\">Среднее время на батч из 50 токенов</td>\n<td align=\"left\">143 ms</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>VRAM Allocated</strong></td>\n<td align=\"left\">Текущее потребление видеопамяти</td>\n<td align=\"left\">650 MB</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>VRAM Peak</strong></td>\n<td align=\"left\">Пиковое потребление</td>\n<td align=\"left\">820 MB</td>\n</tr>\n</tbody></table>\n<p><strong>Эталонные значения:</strong></p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Устройство</th>\n<th align=\"left\">tok/s</th>\n<th align=\"left\">Latency</th>\n<th align=\"left\">Рекомендация</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\">CPU (i5/i7)</td>\n<td align=\"left\">5 – 20</td>\n<td align=\"left\">50 – 200 ms</td>\n<td align=\"left\">Только тесты</td>\n</tr>\n<tr>\n<td align=\"left\">Apple M1/M2 (MPS)</td>\n<td align=\"left\">50 – 150</td>\n<td align=\"left\">7 – 20 ms</td>\n<td align=\"left\">Средние модели</td>\n</tr>\n<tr>\n<td align=\"left\">RTX 3060 (12GB)</td>\n<td align=\"left\">200 – 500</td>\n<td align=\"left\">2 – 5 ms</td>\n<td align=\"left\">Полноценное обучение</td>\n</tr>\n<tr>\n<td align=\"left\">RTX 4090 (24GB)</td>\n<td align=\"left\">500 – 1200</td>\n<td align=\"left\">0.8 – 2 ms</td>\n<td align=\"left\">Глубокие сети</td>\n</tr>\n</tbody></table>\n<hr>\n<h2 id=\"пункт-3-диагностика-железа\">💻 Пункт [3] — Диагностика железа</h2>\n<p>Функция <code>hardware_diagnostics()</code> вызывает <code>get_device_info()</code>. Логика определения устройства:</p>\n<ol>\n<li><code>torch.cuda.is_available()</code> → <strong>NVIDIA CUDA</strong></li>\n<li><code>torch.backends.mps.is_available()</code> → <strong>Apple MPS</strong></li>\n<li><code>torch.xpu.is_available()</code> → <strong>Intel XPU</strong></li>\n<li>Иначе → <strong>CPU</strong> (автоматически <code>torch.set_num_threads(os.cpu_count())</code>)</li>\n</ol>\n<p><strong>Выходные поля:</strong></p>\n<ul>\n<li><strong>Detected Device</strong>: <code>cuda</code>, <code>mps</code>, <code>xpu</code> или <code>cpu</code></li>\n<li><strong>Device Type</strong>: Совпадает с Device (используется для <code>torch.autocast</code>)</li>\n<li><strong>Autocast Dtype</strong>: <code>bfloat16</code> (CUDA с поддержкой), <code>float16</code> (MPS/старые CUDA) или <code>bfloat16</code> (CPU)</li>\n<li><strong>Name</strong>: Название GPU (например, &quot;NVIDIA GeForce RTX 3060&quot;)</li>\n<li><strong>Memory Total / Free</strong>: Объём и свободная VRAM в ГБ</li>\n</ul>\n<hr>\n<h2 id=\"пункт-4-статистика-данных\">📈 Пункт [4] — Статистика данных</h2>\n<p>Функция <code>data_stats_view()</code> вызывает <code>get_data_stats()</code> для файла <code>input_ru.txt</code>.</p>\n<p><strong>Что показывает:</strong></p>\n<ul>\n<li><strong>Total Characters</strong>: Общее число символов в корпусе.</li>\n<li><strong>Unique Tokens (Vocab)</strong>: Размер словаря. Типично <strong>80–120</strong> для русского текста.</li>\n<li><strong>Top 10 Characters</strong>: Десять самых частых символов с частотой.</li>\n</ul>\n<p><strong>На что обратить внимание:</strong></p>\n<ul>\n<li>Пробел (<code>&#39; &#39;</code>) и буква <code>о</code> обычно в тройке лидеров.</li>\n<li>Если в топе есть <code>\\x00</code>, <code>\\ufeff</code> или подобные — в данных мусор, нужна повторная очистка.</li>\n<li>Если <code>vocab_size &gt; 200</code> — возможно, в тексте есть иероглифы или эмодзи.</li>\n</ul>\n<hr>\n<h2 id=\"пункт-5-просмотр-конфигурации\">📋 Пункт [5] — Просмотр конфигурации</h2>\n<p>Функция <code>config_view()</code> вызывает <code>Config.to_dict()</code> и выводит все параметры:</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Параметр</th>\n<th align=\"left\">Значение</th>\n<th align=\"left\">Категория</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><code>input_path</code></td>\n<td align=\"left\"><code>input_ru.txt</code></td>\n<td align=\"left\">Пути</td>\n</tr>\n<tr>\n<td align=\"left\"><code>vocab_path</code></td>\n<td align=\"left\"><code>vocab.pkl</code></td>\n<td align=\"left\">Пути</td>\n</tr>\n<tr>\n<td align=\"left\"><code>weights_path</code></td>\n<td align=\"left\"><code>model_weights.pth</code></td>\n<td align=\"left\">Пути</td>\n</tr>\n<tr>\n<td align=\"left\"><code>block_size</code></td>\n<td align=\"left\">256</td>\n<td align=\"left\">Архитектура</td>\n</tr>\n<tr>\n<td align=\"left\"><code>n_embd</code></td>\n<td align=\"left\">768</td>\n<td align=\"left\">Архитектура</td>\n</tr>\n<tr>\n<td align=\"left\"><code>n_head</code></td>\n<td align=\"left\">12</td>\n<td align=\"left\">Архитектура</td>\n</tr>\n<tr>\n<td align=\"left\"><code>n_layer</code></td>\n<td align=\"left\">12</td>\n<td align=\"left\">Архитектура</td>\n</tr>\n<tr>\n<td align=\"left\"><code>dropout</code></td>\n<td align=\"left\">0.2</td>\n<td align=\"left\">Архитектура</td>\n</tr>\n<tr>\n<td align=\"left\"><code>batch_size</code></td>\n<td align=\"left\">16</td>\n<td align=\"left\">Обучение</td>\n</tr>\n<tr>\n<td align=\"left\"><code>gradient_accumulation_steps</code></td>\n<td align=\"left\">2</td>\n<td align=\"left\">Обучение</td>\n</tr>\n<tr>\n<td align=\"left\"><code>max_iters</code></td>\n<td align=\"left\">6000</td>\n<td align=\"left\">Обучение</td>\n</tr>\n<tr>\n<td align=\"left\"><code>eval_interval</code></td>\n<td align=\"left\">100</td>\n<td align=\"left\">Обучение</td>\n</tr>\n<tr>\n<td align=\"left\"><code>learning_rate</code></td>\n<td align=\"left\">6e-4</td>\n<td align=\"left\">Обучение</td>\n</tr>\n<tr>\n<td align=\"left\"><code>min_lr</code></td>\n<td align=\"left\">6e-5</td>\n<td align=\"left\">Обучение</td>\n</tr>\n<tr>\n<td align=\"left\"><code>warmup_iters</code></td>\n<td align=\"left\">200</td>\n<td align=\"left\">Обучение</td>\n</tr>\n<tr>\n<td align=\"left\"><code>seed</code></td>\n<td align=\"left\">42</td>\n<td align=\"left\">Железо</td>\n</tr>\n</tbody></table>\n<hr>\n<h2 id=\"пункт-6-лингвистический-аудит\">🧠 Пункт [6] — Лингвистический аудит</h2>\n<p>Это самый продвинутый инструмент. Функция <code>generation_quality_test()</code> выполняет полный цикл:</p>\n<ol>\n<li>Загружает модель и словарь (<code>vocab.pkl</code>).</li>\n<li>Генерирует 10 тестовых промптов через алгоритм <strong>«Собиратель промпта»</strong>.</li>\n<li>Для каждого промпта модель генерирует продолжение (80 токенов, temperature=0.8, top_k=20).</li>\n<li>Движок <code>HeuristicSyntaxEngine</code> анализирует результат.</li>\n<li>Выводится таблица с баллами и финальный <strong>«Вердикт лингвиста»</strong>.</li>\n</ol>\n<p><strong>Выходная таблица содержит:</strong></p>\n<ul>\n<li><strong>Промпт / Результат</strong>: Задание и ответ модели.</li>\n<li><strong>Сложность</strong>: Три числа через <code>/</code> — запятые / тире / союзы (синий / фиолетовый / жёлтый).</li>\n<li><strong>Синтаксис (Паттерны)</strong>: Найденные грамматические конструкции.</li>\n<li><strong>Балл</strong>: Оценка от 0% до 100%.</li>\n</ul>\n<hr>\n<h2 id=\"алгоритм-собиратель-промпта\">🎲 Алгоритм «Собиратель промпта»</h2>\n<p>Функция <code>collect_prompts()</code> генерирует 10 грамматически правильных русских предложений из базы слов. Она использует <strong>10 шаблонов</strong>:</p>\n<table>\n<thead>\n<tr>\n<th align=\"center\">№</th>\n<th align=\"left\">Шаблон</th>\n<th align=\"left\">Пример</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"center\">1</td>\n<td align=\"left\"><code>{наречие} в {прил.} {место} {персонаж} {глаг.}</code></td>\n<td align=\"left\">&quot;Тихо в тёмном кабинете Князь сидел&quot;</td>\n</tr>\n<tr>\n<td align=\"center\">2</td>\n<td align=\"left\"><code>{время} {персонаж} {наречие} {глаг.движ.} в {место}</code></td>\n<td align=\"left\">&quot;Утро Офицер медленно шёл в город&quot;</td>\n</tr>\n<tr>\n<td align=\"center\">3</td>\n<td align=\"left\"><code>В {прил.} {место} {персонаж} {наречие} {глаг.} {предмет}</code></td>\n<td align=\"left\">&quot;В старом доме Граф тихо читал книгу&quot;</td>\n</tr>\n<tr>\n<td align=\"center\">4</td>\n<td align=\"left\"><code>{персонаж} {глаг.} {прил.} {предмет} и {наречие} {глаг.}</code></td>\n<td align=\"left\">&quot;Андрей взял тёмную шпагу и грустно смотрел&quot;</td>\n</tr>\n<tr>\n<td align=\"center\">5</td>\n<td align=\"left\"><code>Когда {персонаж} {глаг.} через {место}, он {глаг.} {предмет}</code></td>\n<td align=\"left\">&quot;Когда Солдат шёл через поле, он заметил ружьё&quot;</td>\n</tr>\n<tr>\n<td align=\"center\">6</td>\n<td align=\"left\"><code>{наречие} {персонаж} {глаг.} у {предмет.род.}</code></td>\n<td align=\"left\">&quot;Спокойно Старик стоял у окна&quot;</td>\n</tr>\n<tr>\n<td align=\"center\">7</td>\n<td align=\"left\"><code>{время} {наречие} {глаг.} {прил.} {персонаж}</code></td>\n<td align=\"left\">&quot;Ночь внезапно бежал уставший Генерал&quot;</td>\n</tr>\n<tr>\n<td align=\"center\">8</td>\n<td align=\"left\"><code>В {место} {глаг.} {прил.} {персонаж} и думал</code></td>\n<td align=\"left\">&quot;В саду сидел мрачный Князь и думал&quot;</td>\n</tr>\n<tr>\n<td align=\"center\">9</td>\n<td align=\"left\"><code>{перс.} {наречие} {глаг.} {предмет}, пока в {месте} {глаг.} {перс.2}</code></td>\n<td align=\"left\">&quot;Граф тихо писал письмо, пока в зале ждал Слуга&quot;</td>\n</tr>\n<tr>\n<td align=\"center\">10</td>\n<td align=\"left\"><code>{наречие} {перс.} {глаг.}, побежал в {место} и замолчал</code></td>\n<td align=\"left\">&quot;Вдруг Андрей заметил, побежал в дом и замолчал&quot;</td>\n</tr>\n</tbody></table>\n<div class=\"alert-box alert-note\"><span class=\"alert-icon\">ℹ️</span><strong>Примечание:</strong> <p>Все промпты используют грамматически корректные падежные формы прилагательных и существительных через словари <code>adj_forms</code>, <code>place_data</code> и <code>item_data</code>. Каждый промпт заканчивается запятой, чтобы спровоцировать модель на продолжение сложного предложения.</p></div><hr>\n<h2 id=\"heuristicsyntaxengine-движок-анализа\">⚙️ HeuristicSyntaxEngine — движок анализа</h2>\n<p>Класс <code>HeuristicSyntaxEngine</code> из <code>evaluator.py</code> определяет грамматические конструкции русского языка <strong>без внешних NLP-библиотек</strong>, используя только регулярные выражения и эвристики.</p>\n<h3 id=\"методы-определения-частей-речи\">Методы определения частей речи</h3>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Метод</th>\n<th align=\"left\">Логика</th>\n<th align=\"left\">Окончания</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><code>is_verb()</code></td>\n<td align=\"left\">Поиск глагольных окончаний</td>\n<td align=\"left\"><code>-ет</code>, <code>-ит</code>, <code>-ут</code>, <code>-ют</code>, <code>-л</code>, <code>-ла</code>, <code>-ться</code> и др.</td>\n</tr>\n<tr>\n<td align=\"left\"><code>is_inf()</code></td>\n<td align=\"left\">Поиск окончаний инфинитива</td>\n<td align=\"left\"><code>-ть</code>, <code>-ти</code>, <code>-чь</code></td>\n</tr>\n<tr>\n<td align=\"left\"><code>is_praed()</code></td>\n<td align=\"left\">Проверка по словарю предикативов</td>\n<td align=\"left\"><code>холодно</code>, <code>жаль</code>, <code>надо</code>, <code>пора</code>, <code>можно</code>, <code>нельзя</code>...</td>\n</tr>\n</tbody></table>\n<h3 id=\"четыре-прохода-анализа\">Четыре прохода анализа</h3>\n<p><strong>Проход 1 — Группа 4 (Фразеологизмы)</strong>:\nДвижок ищет идиоматические конструкции через RegEx с обратными ссылками:</p>\n<ul>\n<li><code>(\\w+) так \\1</code> → Тождество (&quot;день так день&quot;)</li>\n<li><code>(\\w+) как \\1</code> → Обыденность</li>\n<li><code>взял и \\w+</code> → Внезапность (&quot;взял и ушёл&quot;)</li>\n<li><code>что за \\w+</code> → Оценка (&quot;что за человек!&quot;)</li>\n<li><code>ну и \\w+</code> → Оценка (&quot;ну и дела!&quot;)</li>\n</ul>\n<p><strong>Проход 2 — Определение типа предложения</strong>:</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Условие</th>\n<th align=\"left\">Паттерн</th>\n<th align=\"left\">Пример</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\">Субъект + глагол</td>\n<td align=\"left\"><code>N1 - Vf (Двусоставное)</code></td>\n<td align=\"left\">&quot;Князь сидел&quot;</td>\n</tr>\n<tr>\n<td align=\"left\">Субъект + предикатив</td>\n<td align=\"left\"><code>N1 - Praed</code></td>\n<td align=\"left\">&quot;Ему холодно&quot;</td>\n</tr>\n<tr>\n<td align=\"left\">Предикатив + инфинитив</td>\n<td align=\"left\"><code>Praed + Inf (Безличное)</code></td>\n<td align=\"left\">&quot;Надо идти&quot;</td>\n</tr>\n<tr>\n<td align=\"left\">Только инфинитив</td>\n<td align=\"left\"><code>Inf (Независимый инфинитив)</code></td>\n<td align=\"left\">&quot;Молчать!&quot;</td>\n</tr>\n<tr>\n<td align=\"left\">Глагол без субъекта</td>\n<td align=\"left\"><code>V (Односоставное глагольное)</code></td>\n<td align=\"left\">&quot;Смеркалось&quot;</td>\n</tr>\n<tr>\n<td align=\"left\">Субъект + тире</td>\n<td align=\"left\"><code>N1 - Cop - N1 (Связка)</code></td>\n<td align=\"left\">&quot;Москва — столица&quot;</td>\n</tr>\n<tr>\n<td align=\"left\">Только субъект</td>\n<td align=\"left\"><code>N1 (Назывное)</code></td>\n<td align=\"left\">&quot;Ночь. Улица.&quot;</td>\n</tr>\n</tbody></table>\n<p><strong>Проход 3 — Сложность</strong>:\nЕсли в тексте найдены союзы (<code>и</code>, <code>а</code>, <code>но</code>, <code>что</code>, <code>когда</code>, <code>хотя</code>...), добавляется метка <code>Сложное (Союзная связь)</code>.</p>\n<h3 id=\"метрики-сложности-getcomplexitymetrics\">Метрики сложности (<code>get_complexity_metrics</code>)</h3>\n<ul>\n<li><strong>Запятые</strong> (<code>,</code>): Показатель вложенности и перечислений.</li>\n<li><strong>Тире</strong> (<code>—</code>, <code>-</code>): Признак авторской пунктуации и вводных конструкций.</li>\n<li><strong>Союзы</strong>: Количество найденных союзов из словаря (12 штук).</li>\n</ul>\n<hr>\n<h2 id=\"система-скоринга\">📐 Система скоринга</h2>\n<p>Каждый промпт оценивается по формуле (максимум 100 баллов):</p>\n<pre><code>Балл = min(уникальные_паттерны × 15, 45)     // До 45 за разнообразие\n     + min(знаки_сложности × 5, 25)           // До 25 за пунктуацию\n     + 15 (если найден паттерн Группы 4)       // Бонус за идиомы\n     + 15 (если текст заканчивается на .!?…)   // Бонус за завершённость\n</code></pre>\n<p><strong>Пример расчёта:</strong>\nМодель на промпт &quot;В старом доме Граф тихо читал книгу,&quot; сгенерировала:</p>\n<blockquote>\n<p>&quot;которую нашёл в библиотеке отца. Он долго сидел и думал.&quot;</p>\n</blockquote>\n<ul>\n<li>Паттерны: <code>N1 - Vf</code>, <code>Сложное</code> → 2 × 15 = <strong>30</strong></li>\n<li>Сложность: 1 запятая + 0 тире + 1 союз (&quot;и&quot;) = 2 × 5 = <strong>10</strong></li>\n<li>Группа 4: нет → <strong>0</strong></li>\n<li>Завершённость: заканчивается на <code>.</code> → <strong>15</strong></li>\n<li><strong>Итого: 55%</strong></li>\n</ul>\n<h3 id=\"три-вердикта-лингвиста\">Три вердикта лингвиста</h3>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Вердикт</th>\n<th align=\"left\">Баллы</th>\n<th align=\"left\">Цвет</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>Высокая структурная связность</strong></td>\n<td align=\"left\">&gt; 60%</td>\n<td align=\"left\">🟢 Зелёный</td>\n<td align=\"left\">Модель строит сложные предложения с правильной пунктуацией</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Базовое понимание грамматики</strong></td>\n<td align=\"left\">30 – 60%</td>\n<td align=\"left\">🟡 Жёлтый</td>\n<td align=\"left\">Простые конструкции, ошибки в запятых</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Низкая синтаксическая точность</strong></td>\n<td align=\"left\">&lt; 30%</td>\n<td align=\"left\">🔴 Красный</td>\n<td align=\"left\">&quot;Словесный салат&quot;, модель не выучила структуру языка</td>\n</tr>\n</tbody></table>\n<hr>\n<h2 id=\"эволюция-модели-по-итерациям\">📈 Эволюция модели по итерациям</h2>\n<p>Типичная динамика качества при обучении на корпусе ~10 МБ:</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Итерация</th>\n<th align=\"left\">Loss</th>\n<th align=\"left\">Аудит</th>\n<th align=\"left\">Характер текста</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>100</strong></td>\n<td align=\"left\">~3.5</td>\n<td align=\"left\">0 – 5%</td>\n<td align=\"left\">Случайные буквы: <code>ктмоваенн пр</code></td>\n</tr>\n<tr>\n<td align=\"left\"><strong>500</strong></td>\n<td align=\"left\">~2.5</td>\n<td align=\"left\">5 – 15%</td>\n<td align=\"left\">Псевдослова: <code>привезано на домой</code></td>\n</tr>\n<tr>\n<td align=\"left\"><strong>1000</strong></td>\n<td align=\"left\">~2.0</td>\n<td align=\"left\">15 – 30%</td>\n<td align=\"left\">Короткие фразы: <code>Он пришел. Она сказал.</code></td>\n</tr>\n<tr>\n<td align=\"left\"><strong>3000</strong></td>\n<td align=\"left\">~1.5</td>\n<td align=\"left\">30 – 60%</td>\n<td align=\"left\">Грамматика: <code>Князь долго думал и решил</code></td>\n</tr>\n<tr>\n<td align=\"left\"><strong>6000</strong></td>\n<td align=\"left\">~1.2</td>\n<td align=\"left\">50 – 80%+</td>\n<td align=\"left\">Стиль автора: сложные предложения с правильными союзами</td>\n</tr>\n</tbody></table>\n<div class=\"alert-box alert-important\"><span class=\"alert-icon\">📢</span><strong>Важно:</strong> <p>Если на итерации 3000+ аудит показывает &lt; 20%, проверьте: (1) достаточный ли объём датасета, (2) не слишком ли высокий <code>dropout</code>, (3) не было ли прерывания обучения.</p></div><hr>\n<h2 id=\"диаграммы\">📊 Диаграммы</h2>\n<h3 id=\"навигация-по-debug-menu\">Навигация по Debug Menu</h3>\n<pre><code class=\"language-mermaid\">flowchart TD\n    MAIN([&quot;Главное меню cli.py&quot;]) --&gt;|&quot;[5]&quot;| DEBUG[&quot;Debug Menu&quot;]\n    \n    DEBUG --&gt; A1[&quot;[1] Анализ модели&quot;]\n    DEBUG --&gt; A2[&quot;[2] Тест производительности&quot;]\n    DEBUG --&gt; A3[&quot;[3] Диагностика железа&quot;]\n    DEBUG --&gt; A4[&quot;[4] Статистика данных&quot;]\n    DEBUG --&gt; A5[&quot;[5] Просмотр конфигурации&quot;]\n    DEBUG --&gt; A6[&quot;[6] Лингвистический аудит&quot;]\n    DEBUG --&gt;|&quot;[0]&quot;| MAIN\n\n    style MAIN fill:#1a1a2e,stroke:#00e5ff,color:#fff\n    style DEBUG fill:#2d3436,stroke:#fab1a0,color:#fff\n    style A6 fill:#6c5ce7,stroke:#fff,color:#fff\n</code></pre>\n<h3 id=\"пайплайн-лингвистического-аудита\">Пайплайн лингвистического аудита</h3>\n<pre><code class=\"language-mermaid\">flowchart TD\n    START([&quot;Запуск [6]&quot;]) --&gt; LOAD[&quot;Загрузка модели и vocab.pkl&quot;]\n    LOAD --&gt; COLLECT[&quot;collect_prompts(10)\\nГенерация 10 заданий&quot;]\n    COLLECT --&gt; GEN[&quot;SimpleLLM.generate()\\n80 токенов, temp=0.8, top_k=20&quot;]\n    GEN --&gt; SPLIT[&quot;Разбор на предложения\\nre.split по .!?…&quot;]\n    SPLIT --&gt; PASS1{&quot;Группа 4?\\nФразеологизмы&quot;}\n    PASS1 --&gt;|Да| SCORE\n    PASS1 --&gt;|Нет| PASS2[&quot;POS-теггинг\\nis_verb / is_inf / is_praed&quot;]\n    PASS2 --&gt; CLASS[&quot;Классификация\\nN1-Vf / Praed+Inf / ...&quot;]\n    CLASS --&gt; COMPLEX[&quot;Проверка союзов\\nСложное предложение?&quot;]\n    COMPLEX --&gt; SCORE[&quot;Расчёт балла\\nmax 100%&quot;]\n    SCORE --&gt; VERDICT([&quot;Вердикт лингвиста&quot;])\n\n    style START fill:#1a1a2e,stroke:#00e5ff,color:#fff\n    style VERDICT fill:#2d3436,stroke:#fab1a0,color:#fff\n    style PASS1 fill:#e17055,stroke:#fff,color:#fff\n</code></pre>\n<hr>\n<h2 id=\"глоссарий\">Глоссарий</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Метка</th>\n<th align=\"left\">Термин</th>\n<th align=\"left\">Описание</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"left\"><strong>N1</strong></td>\n<td align=\"left\">Субъект</td>\n<td align=\"left\">Существительное или местоимение в именительном падеже</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Vf</strong></td>\n<td align=\"left\">Глагол (личная форма)</td>\n<td align=\"left\">Спрягаемый глагол: &quot;сидел&quot;, &quot;идёт&quot;, &quot;пишут&quot;</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Inf</strong></td>\n<td align=\"left\">Инфинитив</td>\n<td align=\"left\">Начальная форма глагола: &quot;писать&quot;, &quot;идти&quot;, &quot;беречь&quot;</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Praed</strong></td>\n<td align=\"left\">Предикатив</td>\n<td align=\"left\">Слово категории состояния: &quot;холодно&quot;, &quot;надо&quot;, &quot;пора&quot;</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Cop</strong></td>\n<td align=\"left\">Связка</td>\n<td align=\"left\">Тире или глагол-связка: &quot;Москва — столица&quot;</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>SDPA</strong></td>\n<td align=\"left\">Scaled Dot-Product Attention</td>\n<td align=\"left\">Оптимизированная реализация внимания в PyTorch</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>tok/s</strong></td>\n<td align=\"left\">Tokens per second</td>\n<td align=\"left\">Скорость генерации символов в секунду</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>VRAM</strong></td>\n<td align=\"left\">Video RAM</td>\n<td align=\"left\">Видеопамять GPU, основной ограничитель при обучении</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Cold Start</strong></td>\n<td align=\"left\">Холодный старт</td>\n<td align=\"left\">Задержка первого вызова из-за загрузки ядер GPU</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Heuristic</strong></td>\n<td align=\"left\">Эвристика</td>\n<td align=\"left\">Упрощённое правило для быстрой оценки без полного NLP-разбора</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>POS-теггинг</strong></td>\n<td align=\"left\">Определение части речи</td>\n<td align=\"left\">Классификация слов по частям речи (глагол, существительное и т.д.)</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>RegEx</strong></td>\n<td align=\"left\">Регулярное выражение</td>\n<td align=\"left\">Шаблон для поиска текстовых паттернов</td>\n</tr>\n</tbody></table>\n<p align=\"center\">\n  <a href=\"HYPERPARAMETERS.md\">← Назад: Гиперпараметры</a> | <a href=\"QUICK_START.md\">В начало: Быстрый старт</a><br/>\n  <sub>Tolstoy AI • Documentation • 2024</sub>\n</p>\n",
        "readingTime": 16,
        "headings": [
          {
            "text": "Оглавление",
            "id": "оглавление",
            "level": 2
          },
          {
            "text": "Философия диагностики",
            "id": "философия-диагностики",
            "level": 2
          },
          {
            "text": "Навигация по Debug Menu",
            "id": "навигация-по-debug-menu",
            "level": 2
          },
          {
            "text": "Пункт [1] — Анализ модели",
            "id": "пункт-1-анализ-модели",
            "level": 2
          },
          {
            "text": "Пункт [2] — Тест производительности",
            "id": "пункт-2-тест-производительности",
            "level": 2
          },
          {
            "text": "Пункт [3] — Диагностика железа",
            "id": "пункт-3-диагностика-железа",
            "level": 2
          },
          {
            "text": "Пункт [4] — Статистика данных",
            "id": "пункт-4-статистика-данных",
            "level": 2
          },
          {
            "text": "Пункт [5] — Просмотр конфигурации",
            "id": "пункт-5-просмотр-конфигурации",
            "level": 2
          },
          {
            "text": "Пункт [6] — Лингвистический аудит",
            "id": "пункт-6-лингвистический-аудит",
            "level": 2
          },
          {
            "text": "Алгоритм «Собиратель промпта»",
            "id": "алгоритм-собиратель-промпта",
            "level": 2
          },
          {
            "text": "HeuristicSyntaxEngine — движок анализа",
            "id": "heuristicsyntaxengine-движок-анализа",
            "level": 2
          },
          {
            "text": "Методы определения частей речи",
            "id": "методы-определения-частей-речи",
            "level": 3
          },
          {
            "text": "Четыре прохода анализа",
            "id": "четыре-прохода-анализа",
            "level": 3
          },
          {
            "text": "Метрики сложности (get_complexity_metrics)",
            "id": "метрики-сложности-getcomplexitymetrics",
            "level": 3
          },
          {
            "text": "Система скоринга",
            "id": "система-скоринга",
            "level": 2
          },
          {
            "text": "Три вердикта лингвиста",
            "id": "три-вердикта-лингвиста",
            "level": 3
          },
          {
            "text": "Эволюция модели по итерациям",
            "id": "эволюция-модели-по-итерациям",
            "level": 2
          },
          {
            "text": "Диаграммы",
            "id": "диаграммы",
            "level": 2
          },
          {
            "text": "Навигация по Debug Menu",
            "id": "навигация-по-debug-menu",
            "level": 3
          },
          {
            "text": "Пайплайн лингвистического аудита",
            "id": "пайплайн-лингвистического-аудита",
            "level": 3
          },
          {
            "text": "Глоссарий",
            "id": "глоссарий",
            "level": 2
          }
        ]
      }
    ]
  }
];
