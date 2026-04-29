# AI Readiness Assessment — журнал ручных изменений

Документ фиксирует изменения, внесенные вручную после шага, где были переданы 3 файла ТЗ:

- `02b-TZ-CORE-FIXES.md`
- `01-CONTENT-v2.md`
- `INDUSTRY-BENCHMARKS.md`

## 1) Что сделано по Этапу 1.1

### 1.1 Тёмная тема и визуальная переработка

- Переведен assessment на темную визуальную систему.
- Удалена светлая подача и старые стили preview/gate flow.
- Применена обновленная палитра, затем дополнительно приведена к общему языку сайта (`surface`, `divider`, `primary`, `color-mix`, radial-accent, gradient CTA).
- Добавлены общие стилевые helper-утилиты для assessment:
  - `src/app/assessment/ai-readiness/_components/styles.ts`

### 1.2 Удаление blur-overlay и обязательного gate

- Убрана старая цепочка `preview → gate → full`.
- Реализован прямой путь:
  - `intro → questions → result`
- Полный результат открывается сразу, без блокировки.

### 1.3 Email-gate как опциональный бонус

- Email-форма оставлена внутри результата как отдельный бонусный блок.
- Реализован success-state после отправки.
- Если `/api/contact` недоступен, пользователь не блокируется (успех показывается в любом случае).

### 1.4 Глубокий контент результата

- Полностью расширен контент профилей и блокеров.
- Добавлены новые секции:
  - `BenchmarkSection`
  - `PitfallsSection`
  - `TeamQuestions`
  - `RoadmapSection`
- Добавлен новый источник данных бенчмарков:
  - `src/app/assessment/ai-readiness/_lib/benchmarks.ts`
- Обновлены структуры данных в `types.ts` под расширенный контент.

### 1.5 Смысловые визуальные якоря (последующие ручные улучшения)

- В отчете добавлены явные, но аккуратные semantic-акценты:
  - блок **«Что будет, если не закрыть»** — красный (risk);
  - блок **«Первый шаг»** — зеленый (action);
  - в hero: **«В чем риск»** — красный, **«В чем возможность»** — зеленый;
  - в roadmap усилены action/deliverables акценты;
  - в benchmarks добавлен мягкий warning-акцент для рыночного контекста.

## 2) Что добавлено сверх исходного запроса (по дальнейшим вашим уточнениям)

### 2.1 Автопереход между вопросами

- После выбора ответа реализован автоматический переход к следующему шагу.
- Кнопка **«Следующий вопрос»** удалена.
- Оставлена только навигация **«Назад»**.

### 2.2 Профилирование пользователя без email

- Добавлены 2 обязательных контекстных вопроса перед основной диагностикой:
  - роль пользователя;
  - размер компании.
- Эти вопросы **не влияют** на scoring готовности.
- Обновлен общий прогресс (теперь учитывает profile-step + core-questions).

### 2.3 Сбор анонимной аналитики по новой версии assessment

- Данные profile-вопросов и результат отправляются в `/api/assessment/ai-readiness`.
- API расширен поддержкой версии `ai_readiness_stage_1_1`.
- Профильные данные также включаются в payload отправки email-бонуса (`/api/contact`), если пользователь оставляет контакт.
- Профильный контекст отображается в hero результата (чипы «роль/размер»).

## 3) Основные затронутые файлы

### Изменены

- `src/app/assessment/ai-readiness/page.tsx`
- `src/app/assessment/ai-readiness/_lib/types.ts`
- `src/app/assessment/ai-readiness/_lib/schema.ts`
- `src/app/assessment/ai-readiness/_lib/content.ts`
- `src/app/assessment/ai-readiness/_components/IntroScreen.tsx`
- `src/app/assessment/ai-readiness/_components/QuestionScreen.tsx`
- `src/app/assessment/ai-readiness/_components/FullResult.tsx`
- `src/app/assessment/ai-readiness/_components/BlockerCard.tsx`
- `src/app/assessment/ai-readiness/_components/Heatmap.tsx`
- `src/app/assessment/ai-readiness/_components/ScoreCircle.tsx`
- `src/app/assessment/ai-readiness/_components/EmailGate.tsx`
- `src/app/assessment/ai-readiness/_components/ProgressBar.tsx`
- `src/app/api/assessment/ai-readiness/route.ts`
- `src/app/globals.css`

### Добавлены

- `src/app/assessment/ai-readiness/_lib/benchmarks.ts`
- `src/app/assessment/ai-readiness/_components/BenchmarkSection.tsx`
- `src/app/assessment/ai-readiness/_components/PitfallsSection.tsx`
- `src/app/assessment/ai-readiness/_components/TeamQuestions.tsx`
- `src/app/assessment/ai-readiness/_components/RoadmapSection.tsx`
- `src/app/assessment/ai-readiness/_components/ProfileQuestionScreen.tsx`
- `src/app/assessment/ai-readiness/_components/styles.ts`

### Удалены

- `src/app/assessment/ai-readiness/_components/PreviewResult.tsx`

## 4) Проверки, выполненные после изменений

- `npm run build` — успешно.
- `npm run lint` — без ошибок в зоне assessment (в проекте остаются старые warning вне этой зоны).
- Локальный route доступен:
  - `http://127.0.0.1:3000/assessment/ai-readiness` (HTTP 200).

