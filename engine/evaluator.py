import re
import torch
import time

class HeuristicSyntaxEngine:
    """
    Эвристический движок для определения синтаксических паттернов русского языка.
    Основан на 4-х группах паттернов.
    """
    
    def __init__(self):
        # Группа 4: Фразеологизированные схемы (RegEx с обратными ссылками)
        self.group4_patterns = [
            (r"\b(\w+)\s+так\s+\1\b", "N1 - так - N1 / Vf - так - Vf (Тождество)"),
            (r"\b(\w+)\s+как\s+\1\b", "N1 - как - N1 (Обыденность)"),
            (r"\bвзял[аои]?\s+и\s+\w+\b", "Взять - и - Vf (Внезапность)"),
            (r"\bнет-нет\s+да\s+и\s+\w+\b", "Нет-нет - да - и - Vf"),
            (r"\bтолько\s+и\s+делает,\s+что\s+\w+\b", "Только и делает, что..."),
            (r"\bчто\s+за\s+\w+\b", "Что - за - N1 (Оценка)"),
            (r"\bну\s+и\s+\w+\b", "Ну - и - N1 (Оценка)")
        ]
        
        # Общие окончания для эвристического POS-теггинга
        # Добавлены рефлексивные формы (-ся/-сь) и причастия
        self.verb_endings = r"(ет|ит|ут|ют|л|ла|ло|ли|ешь|ишь|ем|им|ете|ите|у|ю|ться|тся|лся|лась|лось|лись|шься|мся|тесь)$"
        self.inf_endings = r"(ть|ти|чь|ться|тись)$"
        self.adj_endings = r"(ый|ий|ая|яя|ое|ее|ые|ие|ого|его|ому|ему|ую|юю|ым|им|ом|ем)$"
        
        self.praed_list = {
            "холодно", "жаль", "надо", "пора", "можно", "нельзя", "нужно", "грустно", 
            "вредно", "бесполезно", "тяжело", "легко", "страшно", "необходимо", 
            "жарко", "душно", "виднеется", "слышно", "видно", "жалко", "горько"
        }
        self.conjunctions = {
            "и", "а", "но", "что", "чтобы", "если", "когда", "хотя", "ибо", 
            "также", "словно", "будто", "раз", "точно", "зато", "дабы", "потому", "поэтому", "как"
        }

    def is_verb(self, word):
        w = word.lower()
        if w in self.praed_list or w in self.conjunctions: return False
        return bool(re.search(self.verb_endings, w)) and not self.is_inf(w)

    def is_inf(self, word):
        return bool(re.search(self.inf_endings, word.lower()))

    def is_praed(self, word):
        return word.lower() in self.praed_list

    def is_adj(self, word):
        return bool(re.search(self.adj_endings, word.lower()))

    def is_n1(self, word):
        """Улучшенная эвристика для поиска потенциального подлежащего."""
        w = word.lower()
        if len(w) < 2 and w not in {"я", "и"}: return False
        if w in self.conjunctions or w in self.praed_list: return False
        if self.is_verb(w) or self.is_inf(w) or self.is_adj(w): return False
        # Исключаем распространенные предлоги
        if w in {"в", "на", "с", "у", "к", "по", "из", "за", "от", "до", "об", "при", "про"}: return False
        return True

    def get_complexity_metrics(self, text):
        """Считает количество знаков препинания и союзов."""
        commas = text.count(',')
        dashes = text.count('—') + text.count('-')
        found_conjunctions = [w for w in re.findall(r'[а-яА-ЯёЁ]+', text.lower()) if w in self.conjunctions]
        
        return {
            'commas': commas,
            'dashes': dashes,
            'conjunctions': len(found_conjunctions),
            'total_complex_marks': commas + dashes + len(found_conjunctions)
        }

    def analyze_sentence(self, sentence):
        """Разбор одного предложения на паттерны с повышенной точностью."""
        sentence = sentence.strip()
        if not sentence: return []
        
        found_patterns = []
        # Очистка от пунктуации для выделения слов
        words = re.findall(r'[а-яА-ЯёЁa-zA-Z]+', sentence)
        
        # Pass 1: Группа 4 (Фразеологизмы)
        for pattern, label in self.group4_patterns:
            if re.search(pattern, sentence, re.IGNORECASE):
                found_patterns.append(label)
        
        # Pass 2: Анализ структуры
        has_verb = any(self.is_verb(w) for w in words)
        has_inf = any(self.is_inf(w) for w in words)
        has_praed = any(self.is_praed(w) for w in words)
        has_n1 = any(self.is_n1(w) for w in words)
        has_adj = any(self.is_adj(w) for w in words)

        # Классификация по иерархии
        if has_n1 and has_verb:
            found_patterns.append("N1 - Vf (Двусоставное)")
        elif has_n1 and has_praed:
            found_patterns.append("N1 - Praed")
        elif has_praed and has_inf:
            found_patterns.append("Praed + Inf (Безличное)")
        elif has_inf and not has_verb:
            found_patterns.append("Inf (Независимый инфинитив)")
        elif has_verb and not has_n1:
            found_patterns.append("V (Односоставное глагольное)")
        elif has_n1 and not has_verb:
            if re.search(r"(\s—\s|\s-\s|\bэто\b)", sentence):
                found_patterns.append("N1 - Cop - N1 (Связка)")
            else:
                found_patterns.append("N1 (Назывное)")
        
        if has_adj:
            found_patterns.append("Adj (Атрибутивное)")
                
        if any(w.lower() in self.conjunctions for w in words):
            found_patterns.append("Сложное (Союзная связь)")
            
        return list(set(found_patterns))

def evaluate_generation_quality(model, device, encode_fn, decode_fn, ctx, prompts=None):
    engine = HeuristicSyntaxEngine()
    
    # Расширенный список промптов по умолчанию (25 штук)
    if prompts is None:
        prompts = [
            # Литературные/Описательные
            "Когда наступила зима, ", "Князь Андрей посмотрел на небо и ", "Москва — это ",
            "Смеркалось. Вдруг ", "Лес зашумел, и ", "Утро было ", "Солнце медленно ",
            "На берегу реки ", "Тишина прервалась ",
            # Философские/Абстрактные
            "Любить — значит ", "Счастье — это когда ", "Жизнь прожить — ", "Истина всегда ",
            "Никто не знал, что ", "Человек должен ", "Смысл жизни в том, чтобы ",
            # Персонажи и ситуации
            "Наташа Ростова вбежала в ", "Пьер Безухов долго думал о ", "Анна Аркадьевна ",
            "Старый граф ", "В разгар бала ",
            # Условные/Сложные конструкции
            "Если бы я мог, я бы ", "Хотя он и знал это, но ", "Для того чтобы ",
            "Несмотря на то что ", "Как только он вошел, ",
            # Группа 4 (Идиоматические зачины)
            "Праздник ", "Нужно ", "Взял ", "Только и ", "Что за ", "Ну и "
        ]
    
    results = []
    total_score = 0
    
    for prompt in prompts:
        context = torch.tensor((encode_fn(prompt),), dtype=torch.long, device=device)
        
        with torch.no_grad():
            generated_idx = model.generate(
                context, 
                max_new_tokens=80, 
                temperature=0.8, 
                top_k=20,
                ctx=ctx
            )[0].tolist()
            
        input_length = context.shape[1]
        response_text = decode_fn(generated_idx[input_length:])
        full_text = prompt + response_text
        
        # Очистка для вывода
        clean_response = response_text.replace("\n", " ").strip()
        
        # Метрики сложности
        complexity = engine.get_complexity_metrics(response_text)
        
        # Разбор на предложения (улучшенный regex)
        sentences = re.split(r'(?<=[.!?…])\s+(?=[А-ЯЁ])', full_text)
        if len(sentences) == 1: # Fallback если нет заглавных букв после знака
            sentences = re.split(r'(?<=[.!?…])\s+', full_text)
            
        prompt_patterns = []
        for s in sentences:
            prompt_patterns.extend(engine.analyze_sentence(s))
            
        unique_patterns = list(set(prompt_patterns))
        
        # Скоринг (0-100) с учетом точности и чистоты
        score = 0
        if unique_patterns:
            score += min(len(unique_patterns) * 12, 40) # До 40 за разнообразие паттернов
        
        score += min(complexity['total_complex_marks'] * 6, 30) # До 30 за знаки/союзы
        
        if any(p in str(unique_patterns) for p in ["так", "как", "Взять", "делает", "Что", "Ну"]):
            score += 15 # Бонус за Группу 4
            
        if re.search(r'[.!?…]$', full_text.strip()):
            score += 15 # Бонус за завершенность
            
        # Штрафы за "мусор"
        words = re.findall(r'[а-яА-ЯёЁ]+', response_text)
        if words:
            # Штраф за слишком длинные слова (вероятно склейка)
            long_words = [w for w in words if len(w) > 22]
            score -= len(long_words) * 10
            
            # Штраф за отсутствие гласных в длинных словах (абракадабра)
            for w in words:
                if len(w) > 6 and not re.search(r'[аеёиоуыэюя]', w.lower()):
                    score -= 15
                    
            # Бонус за лексическое разнообразие (TTR)
            unique_words = set(w.lower() for w in words)
            ttr = len(unique_words) / len(words)
            if ttr > 0.8 and len(words) > 5:
                score += 10

        score = max(0, min(score, 100))
        total_score += score
        results.append({
            'prompt': prompt,
            'generated': clean_response,
            'patterns': unique_patterns,
            'complexity': complexity,
            'score': int(score)
        })
        
    return {
        'average_score': total_score / len(prompts),
        'details': results
    }
