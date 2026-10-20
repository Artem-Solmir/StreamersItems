# StreamersItems — предварительный дизайн

> Живые wireframes: см. Canvas «StreamersItems — предварительный дизайн» в Cursor.

## Концепция

**Каталог внутриигровых предметов стримеров** — спокойный «inventory / catalog» UI: предмет на первом плане, интерфейс не перегружает (не лаунчер и не маркетплейс с ценами в v1).

### Принципы

1. **Clarity over hype** — читаемость, сетка карточек, минимум декора.
2. **Streamer → game → item** — навигация и фильтры следуют этой цепочке.
3. **Rarity as color** — компактные бейджи редкости (по игре — своя палитра позже).
4. **Trust** — дата обновления, владелец, ссылка на Twitch; без выдуманных цен.

## IA и маршруты (MVP)

| Маршрут | Экран |
|---------|--------|
| `/` | Главная: поиск, featured items, trending streamers, фильтр по играм |
| `/streamers` | Список стримеров |
| `/streamers/:login` | Профиль: аватар, live, табы по играм, сетка предметов |
| `/items/:id` | Карточка предмета: арт, редкость, мета, владелец |
| `/games/:slug` | Предметы и стримеры по игре |

## Shell (общий каркас)

- **Header:** логотип, глобальный поиск, nav (Browse / Streamers / Games / Trending), язык, тема.
- **Footer (позже):** about, legal, ссылки.
- **Контент:** max-width ~70rem, padding в rem, CSS Modules по фичам.

## Ключевые компоненты

| Компонент | Назначение |
|-----------|------------|
| `ItemCard` | Превью, название, игра, редкость, @streamer |
| `StreamerRow` / `StreamerCard` | Аватар, login, счётчик items, live/offline |
| `GamePill` / `RarityBadge` | Фильтры и метки |
| `SearchBar` | Items, streamers, games |
| `AppLayout` | Header + outlet (React Router) |

## Визуальные токены (на базе текущего `index.css`)

- **Accent:** существующий фиолетовый (`--accent`); для ссылок «на Twitch» можно добавить `--twitch: #9146FF`.
- **Surfaces:** `--bg`, `--code-bg` для карточек, `--border` для разделителей.
- **Типографика (целевая):** display 2–2.5rem; UI 1rem / 0.875rem; mono для float, ID.
- **Радиусы:** карточки 0.75rem, превью предмета 0.5rem.
- **Темы:** light / dark / system — уже реализованы.

## Главная (блоки сверху вниз)

1. Hero + одна строка value prop + quick filters по играм.
2. **Featured items** — сетка 4→2→1 колонки.
3. **Trending streamers** + боковая колонка **By game** (counts).

## Следующие шаги в коде

1. React Router + `AppLayout`.
2. Design tokens в `src/styles/tokens.css` (вынести из `index.css`).
3. Фичи `src/features/items`, `streamers`, `games` с mock-данными.
4. Заменить Vite-заготовку на реальную главную.
