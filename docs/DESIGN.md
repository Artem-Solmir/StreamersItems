# StreamersItems — дизайн

> Wireframes: Canvas «StreamersItems — предварительный дизайн» в Cursor.

## Продукт

**Каталог внутриигровых предметов стримеров.** Цепочка: стример → игра → предмет.

## Концепция UI: «Интерактивный кибер-инвентарь»

Вместо плоской сетки — **слоты инвентаря** на фоне «глубокого космоса»: неон, **динамическое свечение редкости** (`--rarity-color`), **tilt**, **CSS-глитч** (legendary/secret), **UI-звук** при collect (Zustand + Web Audio).

### Палитра (dark — основной cyber-look)

| Token | Value | Назначение |
|-------|-------|------------|
| `--bg-main` | `#0b0e14` | Фон приложения |
| `--bg-card` | `#131822` | Слот карточки |
| `--accent-neon` | `#00ffcc` | Live, collected, акцент |
| `--twitch-purple` | `#9146ff` | Стример / rare glow |
| `--rarity-color` | per item | Inline на карточке |

Light theme — осветлённые значения в `src/index.css`.

### Реализованные компоненты

- `StreamerItemCard` — слот предмета
- `CyberInventorySection` — сетка, счётчик коллекции, toggle звука
- `useCollectedItemsStore`, `useInventoryUiStore`

### UX-фишки

1. **UI audio** — короткий тон при collect (можно выключить).
2. **Glitch** — `enableGlitch` / rarity `secret` | `legendary`.
3. **Tilt** — `useTilt`; off при `prefers-reduced-motion`.

## IA и маршруты (MVP)

| Маршрут | Экран |
|---------|--------|
| `/` | Кибер-инвентарь / featured items, streamers (развитие) |
| `/streamers` | Список стримеров |
| `/streamers/:login` | Профиль + сетка предметов |
| `/items/:id` | Карточка предмета |
| `/games/:slug` | По игре |

## Shell (целевой)

Header: логотип, поиск, nav, язык, тема. CSS Modules, max-width ~70rem.

## Следующие шаги

1. React Router + `AppLayout`.
2. Токены в `src/styles/tokens.css`.
3. Данные items/streamers вне mock.
4. Страницы streamer / item detail в cyber-стиле.
