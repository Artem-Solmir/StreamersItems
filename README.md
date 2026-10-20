# StreamersItems

Сайт про **внутриигровые предметы стримеров**: скины, экипировка, инвентарь и другие in-game items, которые принадлежат или используются стримерами. Пользователь сможет смотреть стримеров, игры и их предметы (каталог, карточки, детали — в разработке).

Стек: React + TypeScript (Vite), i18n (EN/RU), деплой на Vercel.

## Локальная разработка

```bash
npm install
npm run dev
```

Сборка: `npm run build` · Превью сборки: `npm run preview`

## Языки (i18n)

- **English** (`en`) — основной язык и fallback.
- **Русский** (`ru`).

Переводы: `src/features/i18n/locales/en.json` и `ru.json`. Переключатель в шапке; выбор сохраняется в `localStorage` (`locale`).

## Тема оформления

Светлая и тёмная темы (`src/features/theme`, переключатель в шапке). По умолчанию **«как в системе»** (`system`); можно зафиксировать light/dark. Выбор в `localStorage` (`theme`); CSS на `[data-theme='light'|'dark']` в `src/index.css`.

## Деплой на Vercel (бесплатно)

1. Зайдите на [vercel.com](https://vercel.com) и войдите через **GitHub**.
2. **Add New… → Project** → выберите репозиторий `StreamersItems`.
3. Vercel подхватит настройки из `vercel.json` (Vite, папка `dist`, команда `npm run build`).
4. Нажмите **Deploy**. После каждого push в подключённую ветку будет автоматический деплой; для PR — preview-URL.

Публичный URL вида `https://streamers-items.vercel.app` (имя можно изменить в настройках проекта).

### Переменные окружения

Клиентские переменные только с префиксом `VITE_`. В Vercel: **Project → Settings → Environment Variables**. Локально — файл `.env` (не коммитится; см. `.env.example` при добавлении).

### React Router

В `vercel.json` настроен fallback на `index.html`, чтобы прямые переходы по маршрутам не отдавали 404.

### Analytics и Speed Insights

- [@vercel/analytics](https://vercel.com/docs/analytics) — `<Analytics />` в `src/main.tsx` → Vercel → **Analytics**.
- [@vercel/speed-insights](https://vercel.com/docs/speed-insights) — `<SpeedInsights />` в `src/main.tsx` → Vercel → **Speed Insights**.

На Hobby при необходимости включите Web Analytics / Speed Insights в настройках проекта.
