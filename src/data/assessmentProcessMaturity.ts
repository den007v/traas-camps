export type ProcessMaturityDomainId = "P1" | "P2" | "P3" | "P4" | "D1" | "D2" | "D3" | "D4";

export type AnswerOption = {
  id: string;
  text: string;
  value: string;
  score?: 0 | 1 | 2 | 3;
  anchor?: string;
};

export type ProfileQuestion = {
  id: "role" | "scope";
  type: "qualification";
  text: string;
  hint?: string;
  options: AnswerOption[];
};

export type DimensionInsight = {
  title: string;
  diagnosis: string;
  action: string;
};

export type AssessmentQuestionItem = {
  id: string;
  type: "expert";
  text: string;
  hint: string;
  domain: ProcessMaturityDomainId;
  dimension: string;
  dimensionIcon: string;
  weight: number;
  hardCap?: { score: 0; cap: number };
  options: AnswerOption[];
  dimensionInsights: [DimensionInsight, DimensionInsight, DimensionInsight, DimensionInsight];
};

export type ReadinessLevel = {
  id: "chaotic" | "basic" | "managed" | "platform";
  min: number;
  max: number;
  title: string;
  color: string;
  summary: string;
  description: string;
  showImmediately: string;
  ctaText: string;
  ctaLabel: string;
};

export type DomainScore = {
  id: ProcessMaturityDomainId;
  title: string;
  icon: string;
  score: number;
  rawScore: number;
  weight: number;
  insight: DimensionInsight;
};

export type RiskFlag = {
  title: string;
  observation: string;
  businessImpact: string;
  severity: "Высокая" | "Средняя";
};

export type ProcessMaturityResult = {
  totalScore: number;
  uncappedScore: number;
  level: ReadinessLevel;
  domainScores: DomainScore[];
  riskFlags: RiskFlag[];
  strengths: string[];
  quickWins: string[];
  roadmap: string[];
  hardCapApplied: boolean;
};

export type RadarAxisPoint = {
  axis: string;
  value: number;
};

export const profileQuestions: ProfileQuestion[] = [
  {
    id: "role",
    type: "qualification",
    text: "Ваша роль в компании",
    hint: "Нужно только для тональности отчёта и маршрутизации CTA. На оценку не влияет.",
    options: [
      { id: "A", value: "ceo_board", text: "CEO / Основатель / Член правления" },
      { id: "B", value: "cio_cto_cdo", text: "CIO / CTO / CDO / CDTO" },
      { id: "C", value: "function_owner", text: "Руководитель функции / направления (COO, CFO, владелец процесса)" },
      { id: "D", value: "manager_expert", text: "Менеджер / эксперт команды (PMO, аналитик, архитектор данных)" },
      { id: "E", value: "other", text: "Другое" },
    ],
  },
  {
    id: "scope",
    type: "qualification",
    text: "Какой контур вы оцениваете?",
    hint: "Выберите область, по которой будете отвечать дальше: вся компания, блок или отдельный сквозной процесс.",
    options: [
      { id: "A", value: "company_group", text: "Всю компанию / группу компаний" },
      { id: "B", value: "business_unit", text: "Отдельный бизнес-блок (коммерция, операции, производство, HR)" },
      { id: "C", value: "it_digital", text: "ИТ/Digital-блок и связанные с ним процессы" },
      { id: "D", value: "product_process", text: "Отдельный продукт / клиентский сервис / сквозной процесс" },
    ],
  },
];

export const processMaturityQuestions: AssessmentQuestionItem[] = [
  {
    id: "q3_process_map",
    type: "expert",
    domain: "P1",
    dimension: "Карта процессов и владельцы",
    dimensionIcon: "▧",
    weight: 0.15,
    hardCap: { score: 0, cap: 2.5 },
    text: "Есть ли в компании актуальная карта ключевых сквозных процессов с назначенными владельцами?",
    hint: "Имеется в виду end-to-end карта, а не отдельные регламенты по подразделениям. Выбирайте текущее состояние, а не желаемое.",
    options: [
      { id: "A", value: "none", score: 0, text: "Карты процессов нет; процессы существуют «в головах» руководителей и сотрудников", anchor: "Уровень 1: хаотично" },
      { id: "B", value: "local", score: 1, text: "Карты есть локально по подразделениям, но они не сшиваются в сквозные процессы; владельцы либо не назначены, либо их роль формальна", anchor: "Уровень 2: повторяемо" },
      { id: "C", value: "mapped", score: 2, text: "Есть единая карта ключевых процессов и назначенные владельцы, но карта обновляется редко и не используется как инструмент управления", anchor: "Уровень 3: определённый" },
      { id: "D", value: "managed", score: 3, text: "Карта актуальна, владельцы процессов отвечают за результат, регулярно проводятся ревью; карта — рабочий инструмент решений", anchor: "Уровень 4–5: управляемый" },
    ],
    dimensionInsights: [
      { title: "Процессы держатся на памяти людей", diagnosis: "Без карты и владельцев невозможно управлять сквозным результатом: каждый раз приходится восстанавливать цепочку вручную.", action: "Зафиксируйте 5–7 ключевых end-to-end процессов и назначьте владельцев, отвечающих за результат, а не только за участок." },
      { title: "Есть локальные карты, но нет сквозного управления", diagnosis: "Подразделения видят свои фрагменты, но бизнес-результат теряется на стыках функций.", action: "Соберите карту вокруг клиентских/операционных цепочек и отдельно отметьте зоны без владельца." },
      { title: "Фундамент есть, нужна управленческая роль", diagnosis: "Единая карта уже снижает хаос, но без регулярного использования быстро превращается в архив.", action: "Включите карту процессов в регулярные операционные ревью и decision path по изменениям." },
      { title: "Процессная карта стала инструментом управления", diagnosis: "Владельцы и актуальная карта позволяют быстрее находить узкие места и приоритизировать улучшения.", action: "Свяжите карту с метриками, SLA и backlog улучшений, чтобы перейти от описания к управлению." },
    ],
  },
  {
    id: "q4_sla_quality_gates",
    type: "expert",
    domain: "P2",
    dimension: "Формализация и SLA",
    dimensionIcon: "☷",
    weight: 0.1,
    text: "Как описаны ключевые процессы — есть ли SLA, входы/выходы и quality gates?",
    hint: "Речь о реальном описании работы, а не о наличии папки с регламентами.",
    options: [
      { id: "A", value: "none", score: 0, text: "Процессы не описаны или описаны фрагментарно; SLA и quality gates отсутствуют", anchor: "Уровень 1" },
      { id: "B", value: "rough", score: 1, text: "Описаны крупными мазками: входы/выходы есть, но SLA и quality gates не зафиксированы или не соблюдаются", anchor: "Уровень 2" },
      { id: "C", value: "formalized", score: 2, text: "Описаны сквозные процессы с входами, выходами, SLA и базовыми quality gates; описание тиражируется", anchor: "Уровень 3" },
      { id: "D", value: "embedded", score: 3, text: "Полная формализация: SLA и quality gates зашиты в инструменты, отклонения автоматически фиксируются и эскалируются", anchor: "Уровень 4–5" },
    ],
    dimensionInsights: [
      { title: "Нет операционных правил игры", diagnosis: "Команды вынуждены каждый раз договариваться заново, а качество зависит от опыта конкретных людей.", action: "Опишите входы, выходы и минимальные критерии качества для 2–3 критичных процессов." },
      { title: "Регламенты не стали рабочим механизмом", diagnosis: "Формальное описание без SLA и quality gates не помогает управлять ожиданиями и качеством.", action: "Добавьте к каждому ключевому процессу измеримый SLA и точку контроля качества." },
      { title: "Процессы можно тиражировать", diagnosis: "Базовая формализация уже позволяет обучать команды и снижать вариативность результата.", action: "Перенесите SLA и quality gates из документов в рабочие инструменты и отчётность." },
      { title: "SLA встроены в операционный контур", diagnosis: "Отклонения видны быстро, а управление качеством становится частью процесса, а не ручной проверкой после факта.", action: "Свяжите нарушения SLA с root-cause анализом и регулярным improvement backlog." },
    ],
  },
  {
    id: "q5_process_metrics",
    type: "expert",
    domain: "P3",
    dimension: "Метрики процессов",
    dimensionIcon: "◎",
    weight: 0.15,
    text: "Какие метрики собираются по ключевым процессам и используются ли они для управленческих решений?",
    hint: "Cycle time, defects, throughput, NPS, OTIF, MTTR — любые опережающие и запаздывающие метрики.",
    options: [
      { id: "A", value: "none", score: 0, text: "Метрики процессов системно не собираются; решения принимаются «по ощущениям» или после факта", anchor: "Уровень 1" },
      { id: "B", value: "manual", score: 1, text: "Часть метрик собирается вручную в Excel, но используется эпизодически и не для регулярного управления", anchor: "Уровень 2" },
      { id: "C", value: "dashboards", score: 2, text: "Метрики автоматизированы по большинству ключевых процессов, есть дашборды; используются на регулярных ревью", anchor: "Уровень 3" },
      { id: "D", value: "data_driven", score: 3, text: "Полный data-driven цикл: целевые значения, мониторинг отклонений, alerting, регулярные improvement-инициативы по метрикам", anchor: "Уровень 4–5" },
    ],
    dimensionInsights: [
      { title: "Управление вслепую", diagnosis: "Без метрик невозможно понять, улучшается ли процесс или просто становится громче проблема.", action: "Выберите 3 метрики для самого дорогого процесса: скорость, качество, объём/нагрузка." },
      { title: "Метрики есть, но не управляют решениями", diagnosis: "Ручная отчётность часто показывает прошлое, но не запускает действие в момент отклонения.", action: "Для каждой метрики определите порог, владельца реакции и регулярный ритм ревью." },
      { title: "Появился контур управляемости", diagnosis: "Дашборды и ревью дают основу для улучшений, если метрики действительно связаны с решениями.", action: "Свяжите операционные метрики с финансовым эффектом и backlog улучшений." },
      { title: "Data-driven цикл работает", diagnosis: "Процессные данные становятся инструментом постоянного улучшения и раннего обнаружения проблем.", action: "Автоматизируйте root-cause анализ по повторяющимся отклонениям и закрепите владельцев улучшений." },
    ],
  },
  {
    id: "q6_process_changes",
    type: "expert",
    domain: "P4",
    dimension: "Изменения и улучшения",
    dimensionIcon: "↻",
    weight: 0.1,
    text: "Как у вас устроены изменения процессов?",
    hint: "Имеется в виду регулярная работа с процессами, а не разовые проекты автоматизации.",
    options: [
      { id: "A", value: "crisis", score: 0, text: "Процессы меняются стихийно — обычно после кризиса или критического инцидента", anchor: "Уровень 1" },
      { id: "B", value: "ad_hoc", score: 1, text: "Изменения инициируются от случая к случаю отдельными лидерами; нет единого подхода", anchor: "Уровень 2" },
      { id: "C", value: "backlog", score: 2, text: "Есть регулярная работа: владельцы процессов планируют улучшения, есть бэклог изменений и ритм ревью", anchor: "Уровень 3" },
      { id: "D", value: "continuous", score: 3, text: "Непрерывное совершенствование как часть культуры: gemba/kaizen/PDCA, измеримый эффект каждой итерации", anchor: "Уровень 4–5" },
    ],
    dimensionInsights: [
      { title: "Изменения происходят через кризис", diagnosis: "Компания платит за улучшения авариями: процесс меняется только когда уже больно.", action: "Запустите ежемесячный процесс-review по 2–3 критичным цепочкам и фиксируйте backlog улучшений." },
      { title: "Инициативы зависят от отдельных лидеров", diagnosis: "Без единого ритма улучшения не масштабируются и конкурируют за внимание с операционкой.", action: "Введите простой шаблон инициативы: проблема, метрика, владелец, ожидаемый эффект, дата ревью." },
      { title: "Улучшения стали регулярной практикой", diagnosis: "Backlog и ритм ревью позволяют управлять изменениями, а не ждать внешнего давления.", action: "Добавьте измерение эффекта каждой инициативы и публичный статус по приоритетным изменениям." },
      { title: "Культура непрерывных улучшений", diagnosis: "Команды умеют менять процессы без потери управляемости, это сильный организационный актив.", action: "Масштабируйте практику через playbook владельцев процессов и портфель улучшений на уровне компании." },
    ],
  },
  {
    id: "q7_data_quality",
    type: "expert",
    domain: "D1",
    dimension: "Качество и доверие к данным",
    dimensionIcon: "◈",
    weight: 0.15,
    hardCap: { score: 0, cap: 2.5 },
    text: "Как у вас устроено качество данных в ключевых системах?",
    hint: "Думайте о данных, на которых принимаются управленческие решения и строится отчётность.",
    options: [
      { id: "A", value: "not_measured", score: 0, text: "Качество данных не измеряется; ошибки находят случайно, обычно после жалоб бизнеса или регулятора", anchor: "Уровень 1" },
      { id: "B", value: "manual_checks", score: 1, text: "Бывают разовые проверки и ручные сверки; единых требований к качеству нет, метрик нет", anchor: "Уровень 2" },
      { id: "C", value: "dq_metrics", score: 2, text: "Определены требования и метрики качества по ключевым датасетам; есть регулярный мониторинг и ответственные", anchor: "Уровень 3" },
      { id: "D", value: "automated_dq", score: 3, text: "Автоматический контроль качества с alerting, инциденты по DQ обрабатываются как ИТ-инциденты, есть SLA на исправление", anchor: "Уровень 4–5" },
    ],
    dimensionInsights: [
      { title: "Доверие к данным не управляется", diagnosis: "Ошибки всплывают после принятия решений, поэтому данные воспринимаются как риск, а не актив.", action: "Определите критичные датасеты и 3 базовые проверки: полнота, актуальность, уникальность." },
      { title: "Качество держится на ручных сверках", diagnosis: "Разовые проверки помогают тушить пожары, но не создают системного доверия к данным.", action: "Согласуйте требования к качеству по ключевым сущностям и назначьте владельцев исправления." },
      { title: "Контур data quality сформирован", diagnosis: "Появились метрики и ответственные, теперь можно переводить качество данных в управляемый сервис.", action: "Настройте автоматические алерты и SLA на исправление DQ-инцидентов." },
      { title: "Данные становятся надёжным активом", diagnosis: "Автоматический контроль качества снижает риски решений и открывает путь к AI/ML сценариям.", action: "Свяжите DQ-метрики с бизнес-процессами и стоимостью ошибок, чтобы приоритизировать улучшения." },
    ],
  },
  {
    id: "q8_master_data",
    type: "expert",
    domain: "D2",
    dimension: "Мастер-данные и модель",
    dimensionIcon: "◇",
    weight: 0.1,
    text: "Как у вас устроена работа с мастер-данными: клиенты, продукты, контрагенты?",
    hint: "«Золотая запись» — единый источник правды по ключевой сущности.",
    options: [
      { id: "A", value: "duplicates", score: 0, text: "Мастер-данные дублируются между системами; единого источника правды нет", anchor: "Уровень 1" },
      { id: "B", value: "fragmented", score: 1, text: "Есть несколько разрозненных MDM-решений или справочников; синхронизация ручная или batch", anchor: "Уровень 2" },
      { id: "C", value: "golden_record", score: 2, text: "По ключевым доменам есть «золотая запись», MDM-контур внедрён, синхронизация настроена для основных систем", anchor: "Уровень 3" },
      { id: "D", value: "real_time_mdm", score: 3, text: "Полноценный MDM-контур с real-time синхронизацией, data quality на уровне мастер-данных, дата-контрактами с системами-потребителями", anchor: "Уровень 4–5" },
    ],
    dimensionInsights: [
      { title: "Нет единого источника правды", diagnosis: "Разные версии клиента, продукта или контрагента создают ошибки в отчётности, интеграциях и клиентском опыте.", action: "Выберите одну ключевую сущность и назначьте мастер-систему, правила владения и синхронизации." },
      { title: "Справочники живут островами", diagnosis: "Ручная синхронизация и batch-обмены создают задержки и расхождения между системами.", action: "Опишите целевую модель мастер-данных и топ-3 интеграции, где расхождения стоят дороже всего." },
      { title: "Золотая запись появилась", diagnosis: "MDM-контур уже снижает хаос, но ценность зависит от покрытия и качества интеграций.", action: "Расширьте data quality проверки на мастер-данные и формализуйте контракты с системами-потребителями." },
      { title: "MDM работает как платформа", diagnosis: "Единая модель и синхронизация в реальном времени делают данные масштабируемой основой для процессов и аналитики.", action: "Используйте мастер-данные как основу для self-service аналитики и персонализированных цифровых сервисов." },
    ],
  },
  {
    id: "q9_integrations",
    type: "expert",
    domain: "D3",
    dimension: "Доступность и интеграция",
    dimensionIcon: "⌘",
    weight: 0.1,
    text: "Как данные ходят между системами в вашей компании?",
    hint: "Имеется в виду техническая и организационная сторона интеграций.",
    options: [
      { id: "A", value: "manual", score: 0, text: "Преимущественно ручной обмен: выгрузки, Excel, точечные интеграции «точка-в-точку»", anchor: "Уровень 1" },
      { id: "B", value: "point_to_point", score: 1, text: "Есть отдельные автоматизированные интеграции, но единой архитектуры обмена нет; интеграции дублируются", anchor: "Уровень 2" },
      { id: "C", value: "platform", score: 2, text: "Внедрена интеграционная платформа (ESB/API gateway/event bus); большинство ключевых обменов идёт через неё", anchor: "Уровень 3" },
      { id: "D", value: "contracts", score: 3, text: "Зрелая интеграционная архитектура с дата-контрактами, версионированием API, мониторингом и SLA на обмены", anchor: "Уровень 4–5" },
    ],
    dimensionInsights: [
      { title: "Данные переносятся вручную", diagnosis: "Excel и ручные выгрузки превращают интеграцию в операционный риск: ошибки, задержки, отсутствие traceability.", action: "Составьте карту ключевых обменов и найдите 3 ручных перехода с максимальной стоимостью ошибки." },
      { title: "Интеграции дублируются", diagnosis: "Point-to-point связи быстро становятся хрупкой сетью, где любое изменение ломает соседние процессы.", action: "Определите целевой интеграционный паттерн и запретите новые критичные обмены без архитектурного ревью." },
      { title: "Появился единый интеграционный слой", diagnosis: "Платформа снижает хаос, но без контрактов и мониторинга риски остаются на уровне качества обменов.", action: "Введите дата-контракты, owner для каждого обмена и SLA на доступность/задержку." },
      { title: "Интеграции управляются как сервис", diagnosis: "Версионирование, мониторинг и SLA позволяют безопасно масштабировать цифровой ландшафт.", action: "Перейдите к event-driven сценариям там, где бизнесу нужны near real-time решения." },
    ],
  },
  {
    id: "q10_data_governance",
    type: "expert",
    domain: "D4",
    dimension: "Governance данных",
    dimensionIcon: "◌",
    weight: 0.15,
    text: "Как организовано управление данными как активом?",
    hint: "Речь о ролях, политиках и процедурах вокруг данных, а не о технологиях.",
    options: [
      { id: "A", value: "absent", score: 0, text: "Управление данными как функция отсутствует; нет владельцев данных, нет политик хранения, нет каталога", anchor: "Уровень 1" },
      { id: "B", value: "elements", score: 1, text: "Есть отдельные элементы (например, политика ИБ или data-команда), но они не объединены в единый контур Data Governance", anchor: "Уровень 2" },
      { id: "C", value: "governance", score: 2, text: "Сформирован контур Data Governance: владельцы данных, дата-стюарды, базовый каталог, глоссарий, политики хранения и доступа", anchor: "Уровень 3" },
      { id: "D", value: "mature_governance", score: 3, text: "Зрелый Data Governance с метриками работы стюардов, привязкой к compliance, регулярным ревью и data literacy программой для бизнеса", anchor: "Уровень 4–5" },
    ],
    dimensionInsights: [
      { title: "Данные ничьи", diagnosis: "Если у данных нет владельцев и правил, ответственность появляется только после инцидента.", action: "Назначьте владельцев ключевых доменов данных и опишите минимальные политики хранения, доступа и качества." },
      { title: "Governance собран из фрагментов", diagnosis: "ИБ, аналитика и ИТ могут делать правильные вещи, но без единого контура правила конфликтуют и не масштабируются.", action: "Соберите единый Data Governance charter: роли, комитет, процессы изменений, каталог артефактов." },
      { title: "Data Governance сформирован", diagnosis: "Роли и политики уже дают основу доверия, следующий шаг — измерять работу governance как операционную функцию.", action: "Добавьте метрики: покрытие каталога, SLA стюардов, DQ-инциденты, доля датасетов с владельцем." },
      { title: "Данные управляются как бизнес-актив", diagnosis: "Governance связан с compliance, качеством и data literacy — это зрелый фундамент для масштабирования аналитики и AI.", action: "Развивайте data-продукты и self-service контуры, где governance встроен в пользовательский путь." },
    ],
  },
];

export const readinessLevels: ReadinessLevel[] = [
  {
    id: "chaotic",
    min: 1,
    max: 2,
    title: "Хаотичный ландшафт",
    color: "#e30613",
    summary: "Процессы и данные существуют как практика отдельных людей.",
    description: "Ваша компания держится на людях, а не на системе. Процессы — в головах сотрудников, данные — в Excel-файлах и почте. Это работает, пока команда сильная и нагрузка управляемая. Но любая попытка масштабироваться, внедрять AI или digital-инициативы упирается в отсутствие фундамента.",
    showImmediately: "Top-3 quick wins на 30 дней + CTA на discovery",
    ctaText: "Разберём, где именно процессы и данные создают операционный риск, и соберём первый план наведения порядка.",
    ctaLabel: "Получить разбор от TraaS",
  },
  {
    id: "basic",
    min: 2,
    max: 3,
    title: "Базовый порядок",
    color: "#d38f1f",
    summary: "Формальные элементы есть, но они не работают как единый контур.",
    description: "У вас уже есть карты процессов, отдельные интеграции, частичные регламенты. Но это не сшито в единый управляемый контур: данные в одной системе расходятся с данными в другой, изменения процессов идут «по инициативе», метрики собираются вручную и используются эпизодически.",
    showImmediately: "Heatmap по доменам + 30/90-day plan",
    ctaText: "Поможем связать разрозненные инициативы в понятную дорожную карту процессов и данных.",
    ctaLabel: "Обсудить план действий",
  },
  {
    id: "managed",
    min: 3,
    max: 4,
    title: "Управляемая зрелость",
    color: "#2ea36b",
    summary: "Процессы и данные работают как сквозная система с метриками и владельцами.",
    description: "Процессы и данные у вас работают как сквозная система — есть владельцы, метрики, регулярные ревью. Это сильная база. Главный потолок — переход от управления процессами к управлению по данным: автоматическому контролю отклонений, real-time принятию решений, продуктовой работе с данными.",
    showImmediately: "Heatmap + risk flags + roadmap масштабирования",
    ctaText: "Покажем, что мешает перейти от управляемости к data-driven операционной модели.",
    ctaLabel: "Получить экспертную оценку",
  },
  {
    id: "platform",
    min: 4,
    max: 5.01,
    title: "Платформенная зрелость",
    color: "#0f9f6e",
    summary: "Процессы и данные — операционный актив компании.",
    description: "Ваши процессы и данные — операционный актив, а не функция поддержки. Вы готовы к продвинутым кейсам: AI-агентам в производственном контуре, real-time decisions, продуктовизации данных как сервиса для партнёров и клиентов. Главные вызовы — масштабирование без потери управляемости и извлечение экспоненциальной ценности из фундамента.",
    showImmediately: "Roadmap масштабирования + CTA на workshop",
    ctaText: "Соберём roadmap следующего уровня: data-продукты, AI-сценарии и масштабирование governance.",
    ctaLabel: "Обсудить roadmap",
  },
];

const fallbackRiskFlags: RiskFlag[] = [
  {
    title: "Нет прозрачного ownership на стыках",
    observation: "Сквозные процессы требуют владельцев, которые отвечают за результат всей цепочки.",
    businessImpact: "Решения замедляются, проблемы перекидываются между функциями, а улучшения не закрепляются.",
    severity: "Средняя",
  },
  {
    title: "Метрики не всегда превращаются в действие",
    observation: "Даже при наличии дашбордов важно понимать, кто и когда реагирует на отклонения.",
    businessImpact: "Компания видит проблему, но теряет время между сигналом и управленческим решением.",
    severity: "Средняя",
  },
  {
    title: "Governance может отставать от скорости бизнеса",
    observation: "Чем больше систем и данных, тем важнее единые правила владения, качества и доступа.",
    businessImpact: "Масштабирование аналитики и AI упирается в недоверие к данным и ручные согласования.",
    severity: "Средняя",
  },
];

export function normalizeScore(rawScore: number): number {
  return 1 + (rawScore * 4) / 3;
}

export function formatMaturityScore(score: number): string {
  return score.toFixed(1);
}

export function getReadinessLevel(totalScore: number): ReadinessLevel {
  return readinessLevels.find((level) => totalScore >= level.min && totalScore < level.max) ?? readinessLevels[0];
}

export function scoreColor(score: number): string {
  if (score < 2) return "#e30613";
  if (score < 3) return "#d38f1f";
  if (score < 4) return "#d7b51f";
  if (score < 4.6) return "#2ea36b";
  return "#0f9f6e";
}

export function getProfileLabel(id: ProfileQuestion["id"], value?: string): string {
  const question = profileQuestions.find((q) => q.id === id);
  const option = question?.options.find((o) => o.value === value);
  return option?.text ?? value ?? "Не указано";
}

export function buildRadarData(domainScoresOrRaw: DomainScore[] | number[]): RadarAxisPoint[] {
  if (domainScoresOrRaw.length && typeof domainScoresOrRaw[0] === "number") {
    return processMaturityQuestions.map((q, idx) => ({
      axis: q.dimension,
      value: normalizeScore((domainScoresOrRaw[idx] as number | undefined) ?? 0),
    }));
  }

  return (domainScoresOrRaw as DomainScore[]).map((domain) => ({
    axis: domain.title,
    value: domain.score,
  }));
}

export function calculateProcessMaturityResult(answerValues: Record<string, string>): ProcessMaturityResult {
  const domainScores = processMaturityQuestions.map((question) => {
    const selected = answerValues[question.id];
    const option = question.options.find((item) => item.value === selected) ?? question.options[0];
    const rawScore = option.score ?? 0;
    const score = normalizeScore(rawScore);
    return {
      id: question.domain,
      title: question.dimension,
      icon: question.dimensionIcon,
      score,
      rawScore,
      weight: question.weight,
      insight: question.dimensionInsights[rawScore],
    } satisfies DomainScore;
  });

  const uncappedScore = domainScores.reduce((sum, domain) => sum + domain.score * domain.weight, 0);
  const hardCapApplied = processMaturityQuestions.some((question) => {
    if (!question.hardCap) return false;
    const domain = domainScores.find((item) => item.id === question.domain);
    return domain?.rawScore === question.hardCap.score;
  });
  const totalScore = hardCapApplied ? Math.min(uncappedScore, 2.5) : uncappedScore;
  const level = getReadinessLevel(totalScore);

  const weakest = [...domainScores].sort((a, b) => a.score - b.score).slice(0, 3);
  const riskFlags = weakest.map((domain) => ({
    title: domain.insight.title,
    observation: domain.insight.diagnosis,
    businessImpact: domain.insight.action,
    severity: domain.score < 2.4 ? "Высокая" : "Средняя",
  })) satisfies RiskFlag[];

  const strengths = [...domainScores]
    .filter((domain) => domain.score >= 3.6)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((domain) => `${domain.title}: ${domain.insight.title.toLowerCase()}`);

  const quickWins = weakest.map((domain) => domain.insight.action);
  const roadmap = [
    "За 30 дней: зафиксировать владельцев, текущие метрики и проблемные стыки по трём самым критичным доменам.",
    "За 60 дней: собрать backlog улучшений с оценкой эффекта, сложности и владельца внедрения.",
    "За 90 дней: перевести приоритетные улучшения в регулярный контур управления с SLA, метриками и ревью результата.",
  ];

  return {
    totalScore,
    uncappedScore,
    level,
    domainScores,
    riskFlags: riskFlags.length ? riskFlags : fallbackRiskFlags,
    strengths: strengths.length ? strengths : ["Есть достаточный материал для первичной диагностики: ответы уже показывают, где начинать наведение порядка."],
    quickWins,
    roadmap,
    hardCapApplied,
  };
}
