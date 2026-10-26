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

### React Router / SPA fallback

В `vercel.json` fallback на `index.html` срабатывает только для запросов с `Accept: text/html`, чтобы `/items/*` и другие файлы из `public/` не подменялись HTML.

### Если автодеплой из GitHub не срабатывает

**Симптом:** merge в `main` есть, а на [streamers-items.vercel.app](https://streamers-items.vercel.app) старый JS-бандл / 404 на новых файлах в `public/`. В GitHub у коммита **нет** Vercel check.

**Вариант A — починить Git в Vercel**

1. [Vercel Dashboard](https://vercel.com) → проект → **Deployments** — есть ли деплой для SHA на `main`?
2. **Settings → Git** → **Disconnect** и снова **Connect** репозиторий `Artem-Solmir/StreamersItems`, **Production Branch** = `main`.
3. **Settings → Git → Ignored Build Step** — поле пустое (или не блокирует `main`).
4. **Deployments → … → Redeploy** для последнего коммита `main`.

**Вариант B — автодеплой через GitHub Actions (рекомендуется, если webhook мёртв)**

Workflow: [`.github/workflows/vercel-production.yml`](.github/workflows/vercel-production.yml) — на каждый push в `main` (и вручную **Actions → Run workflow**).

Один раз добавьте **GitHub → Repository → Settings → Secrets and variables → Actions**:

| Secret | Где взять |
|--------|-----------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) → Create (scope: deploy) |
| `VERCEL_ORG_ID` | Vercel → Team Settings → **Team ID** (личный аккаунт: Settings → General) |
| `VERCEL_PROJECT_ID` | Project **StreamersItems** → Settings → General → **Project ID** |

После сохранения секретов: **Actions → Vercel production deploy → Run workflow** или любой push в `main`.

Локально те же ID лежат в `.vercel/project.json` после `npx vercel link` (файл не коммитится).

### Analytics и Speed Insights

- [@vercel/analytics](https://vercel.com/docs/analytics) — `<Analytics />` в `src/main.tsx` → Vercel → **Analytics**.
- [@vercel/speed-insights](https://vercel.com/docs/speed-insights) — `<SpeedInsights />` в `src/main.tsx` → Vercel → **Speed Insights**.
- Событие **`item_page_view`** (slug, game, locale) отправляется со страниц предметов `/en/items/...` и `/ru/items/...`.

На Hobby при необходимости включите Web Analytics / Speed Insights в настройках проекта.

## SEO

- **URL:** `/en` и `/ru` — каталог; `/en/games/{projectSlug}` — коллекция по игре; `/en/items/{itemSlug}` — карточка предмета (slug = `id` в каталоге).
- **Meta:** компонент `PageMeta` (`src/features/seo/`) — title, description, canonical, hreflang, Open Graph.
- **Production URL:** задайте `VITE_SITE_URL` в Vercel (без слэша в конце) для canonical и sitemap.
- **Sitemap / robots:** `npm run build` запускает `scripts/generate-sitemap.mjs` → `public/sitemap.xml`, `public/robots.txt`.

### Запуск в Search Console / Вебмастер

1. Подтвердите домен в [Google Search Console](https://search.google.com/search-console) и [Yandex Webmaster](https://webmaster.yandex.ru).
2. Отправьте sitemap: `https://<ваш-домен>/sitemap.xml`.
3. Проверьте индексацию URL Inspection для пары страниц предметов (`/en/items/...`, `/ru/items/...`).
4. В Vercel Analytics смотрите частоту `item_page_view` после появления органики.
