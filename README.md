# StreamersItems

React + TypeScript (Vite) frontend.

## Локальная разработка

```bash
npm install
npm run dev
```

Сборка: `npm run build` · Превью сборки: `npm run preview`

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
