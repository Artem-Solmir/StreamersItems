# StreamersItems

React + TypeScript (Vite) frontend.

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

## Twitch

Интеграция с [Twitch Helix API](https://dev.twitch.tv/docs/api/): блок «Twitch streamers» на главной, серверный прокси `GET /api/twitch/channels`.

1. [Twitch Developer Console](https://dev.twitch.tv/console/apps) → создайте приложение → **Client ID** и **Client Secret**.
2. **Vercel** → Settings → Environment Variables:
   - `TWITCH_CLIENT_ID`
   - `TWITCH_CLIENT_SECRET`
   - `VITE_TWITCH_STREAMER_LOGINS` — логины через запятую, например `shroud,ninja`
3. Redeploy production.

Локально с API: `npx vercel dev` (с `.env` по образцу `.env.example`). Обычный `npm run dev` не поднимает `/api/*`.

Код: `src/features/twitch/`, `api/twitch/channels.ts`.
