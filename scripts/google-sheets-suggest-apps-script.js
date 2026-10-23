/**
 * =============================================================================
 * StreamersItems → Google Таблица (Google Apps Script)
 * =============================================================================
 *
 * СПОСОБ A — скрипт в таблице (если Расширения → Apps Script открывается)
 *
 * 1. Google Таблица → Расширения → Apps Script → вставить код (с var HEADERS).
 * 2. setupSheet → разрешения → Развернуть как веб-приложение (Доступ: Все).
 *
 * СПОСОБ B — если при переходе в Apps Script ошибка Google:
 *   "Sorry, unable to open the file at this time..."
 *   (часто: другой аккаунт, только просмотр таблицы, блокировка Apps Script в Workspace)
 *
 * 1. Создайте таблицу на https://sheets.google.com (аккаунт @gmail.com проще всего).
 * 2. Скопируйте ID из URL: .../spreadsheets/d/ЭТОТ_ID/edit
 * 3. Откройте https://script.google.com → Новый проект (НЕ через меню таблицы).
 * 4. Вставьте код ниже в Code.gs → Сохранить.
 * 5. Настройки проекта (шестерёнка) → Свойства скрипта → Добавить:
 *      SPREADSHEET_ID = ID из шага 2
 * 6. В редакторе: выберите setupSheet → Выполнить → разрешите доступ к таблице.
 * 7. testAppendRow — в таблице должна появиться тестовая строка.
 * 8. Развернуть → Новое развертывание → Веб-приложение:
 *      Запуск от имени: Я | Доступ: Все (Anyone)
 * 9. URL с /exec → Vercel GOOGLE_SHEETS_WEB_APP_URL
 *
 * Если СПОСОБ A не открывается — проверьте:
 * - В Chrome: правый верхний аватар = тот же аккаунт, что владелец таблицы.
 * - Доступ к таблице: Редактор, не только «Просмотр».
 * - Другой браузер / режим инкognito без блокировщиков.
 * - Корпоративный Google: админ может запретить Apps Script — тогда только личный Gmail или СПОСОБ B с личным аккаунтом.
 *
 * =============================================================================
 */

var HEADERS = [
  'submittedAt',
  'locale',
  'game',
  'itemName',
  'streamer',
  'description',
  'funFact',
  'sourceUrl',
  'email',
]

var SCRIPT_VERSION = '2026-03-26'

/** Меню в таблице — только если скрипт привязан (Способ A) */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('StreamersItems')
    .addItem('Подготовить лист (заголовки)', 'setupSheet')
    .addItem('Тест: добавить строку', 'testAppendRow')
    .addToUi()
}

/** Заголовки + запись SPREADSHEET_ID (из активной таблицы или из свойств) */
function setupSheet() {
  var ss = getSpreadsheet_()
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', ss.getId())

  var sheet = ss.getSheets()[0]
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
  }
}

function testAppendRow() {
  setupSheet()
  appendSuggestion_({
    submittedAt: new Date().toISOString(),
    locale: 'ru',
    game: 'Test Game',
    itemName: 'Test Item',
    streamer: 'Test Streamer',
    description: 'Test description',
    funFact: 'Test fun fact',
    sourceUrl: 'https://example.com',
    email: 'test@example.com',
  })
  Logger.log('OK: test row appended. Spreadsheet id=' + getSpreadsheet_().getId())
}

function doGet() {
  try {
    var sheet = getSheet_()
    var ss = sheet.getParent()
    return jsonResponse_({
      ok: true,
      message: 'StreamersItems suggest webhook ready',
      version: SCRIPT_VERSION,
      spreadsheetId: ss.getId(),
      sheetName: sheet.getName(),
    })
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err), version: SCRIPT_VERSION })
  }
}

function doPost(e) {
  try {
    e = e || {}

    if (!e.postData || !e.postData.contents) {
      return jsonResponse_({
        ok: false,
        error: 'NO_POST_BODY',
        hint: 'Пустое тело POST. URL должен быть .../exec',
      })
    }

    var data = JSON.parse(e.postData.contents)
    var expectedSecret = getSubmitSecret_()
    if (expectedSecret && data.secret !== expectedSecret) {
      return jsonResponse_({ ok: false, error: 'FORBIDDEN' })
    }

    setupSheet()
    appendSuggestion_(data)

    return jsonResponse_({ ok: true })
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) })
  }
}

function appendSuggestion_(data) {
  var sheet = getSheet_()
  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.locale || '',
    data.game || '',
    data.itemName || '',
    data.streamer || '',
    data.description || '',
    data.funFact || '',
    data.sourceUrl || '',
    data.email || '',
  ])
}

function getSpreadsheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  if (ss) {
    return ss
  }

  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')
  if (id) {
    return SpreadsheetApp.openById(String(id).trim())
  }

  throw new Error(
    'Не задана таблица. Способ B: Настройки проекта → Свойства скрипта → SPREADSHEET_ID = id из URL таблицы, затем снова setupSheet.',
  )
}

function getSheet_() {
  return getSpreadsheet_().getSheets()[0]
}

function getSubmitSecret_() {
  var value = PropertiesService.getScriptProperties().getProperty('SUBMIT_SECRET')
  return value ? String(value).trim() : ''
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
