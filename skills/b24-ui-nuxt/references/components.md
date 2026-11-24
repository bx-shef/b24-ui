# Компоненты

Краткий индекс более чем 130 компонентов. В таблицах перечислены те, что вы используете напрямую; составные части вроде `B24SidebarSection` или `B24DropdownMenuContent` описаны на странице родительского компонента. Подробные спецификации API (пропсы, слоты, события и примеры) — в официальной документации.

## Раскладка

| Компонент | Назначение | Документация |
|---|---|---|
| `B24App` | **Обязательная** корневая обёртка — уведомления, подсказки, оверлеи, локализация | [app.md](https://bitrix24.github.io/b24ui/raw/docs/components/app.md) |
| `B24Header` | Адаптивная шапка с мобильным меню | [header.md](https://bitrix24.github.io/b24ui/raw/docs/components/header.md) |
| `B24Footer` | Подвал со слотами left/right/top/bottom | [footer.md](https://bitrix24.github.io/b24ui/raw/docs/components/footer.md) |
| `B24FooterColumns` | Многоколоночный подвал с группами ссылок | [footer-columns.md](https://bitrix24.github.io/b24ui/raw/docs/components/footer-columns.md) |
| `B24Main` | Основная область содержимого | [main.md](https://bitrix24.github.io/b24ui/raw/docs/components/main.md) |
| `B24Container` | Контейнер по центру с ограниченной шириной | [container.md](https://bitrix24.github.io/b24ui/raw/docs/components/container.md) |
| `B24Link` | Расширенная ссылка — NuxtLink/RouterLink с активными состояниями | [link.md](https://bitrix24.github.io/b24ui/raw/docs/components/link.md) |
| `B24Splitter` | Группа панелей с изменяемым размером и ручками перетаскивания | [splitter.md](https://bitrix24.github.io/b24ui/raw/docs/components/splitter.md) |

## Элементы

| Компонент | Назначение | Документация |
|---|---|---|
| `B24Button` | Кнопки — ссылки, действия, иконки, состояния загрузки | [button.md](https://bitrix24.github.io/b24ui/raw/docs/components/button.md) |
| `B24Badge` | Метки, теги, индикаторы статуса | [badge.md](https://bitrix24.github.io/b24ui/raw/docs/components/badge.md) |
| `B24Avatar` | Фото пользователей, инициалы, иконки | [avatar.md](https://bitrix24.github.io/b24ui/raw/docs/components/avatar.md) |
| `B24AvatarGroup` | Стопка аватаров с ограничением `max` | [avatar-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/avatar-group.md) |
| `B24Card` | Контейнер с рамкой, шапкой, телом и подвалом | [card.md](https://bitrix24.github.io/b24ui/raw/docs/components/card.md) |
| `B24Alert` | Встроенные сообщения — информация, предупреждение, ошибка, успех | [alert.md](https://bitrix24.github.io/b24ui/raw/docs/components/alert.md) |
| `B24Banner` | Липкая полоса объявлений для всего приложения | [banner.md](https://bitrix24.github.io/b24ui/raw/docs/components/banner.md) |
| `B24Chip` | Точка-уведомление поверх дочернего элемента | [chip.md](https://bitrix24.github.io/b24ui/raw/docs/components/chip.md) |
| `B24Kbd` | Отображение клавиши | [kbd.md](https://bitrix24.github.io/b24ui/raw/docs/components/kbd.md) |
| `B24Separator` | Разделительная линия с необязательной подписью | [separator.md](https://bitrix24.github.io/b24ui/raw/docs/components/separator.md) |
| `B24Skeleton` | Заглушка на время загрузки | [skeleton.md](https://bitrix24.github.io/b24ui/raw/docs/components/skeleton.md) |
| `B24Progress` | Индикатор выполнения | [progress.md](https://bitrix24.github.io/b24ui/raw/docs/components/progress.md) |
| `B24ProgressGroup` | Индикатор выполнения из цветных сегментов с легендой | [progress-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/progress-group.md) |
| `B24Toast` | Уведомление (показывается через `useToast`) | [toast.md](https://bitrix24.github.io/b24ui/raw/docs/components/toast.md) |
| `B24Calendar` | Календарь дат (одна дата, диапазон, несколько) | [calendar.md](https://bitrix24.github.io/b24ui/raw/docs/components/calendar.md) |
| `B24Collapsible` | Анимированное разворачивание и сворачивание | [collapsible.md](https://bitrix24.github.io/b24ui/raw/docs/components/collapsible.md) |
| `B24FieldGroup` | Горизонтальная группа полей формы | [field-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/field-group.md) |
| `B24Empty` | Заглушка пустого состояния с иконкой, заголовком и действиями | [empty.md](https://bitrix24.github.io/b24ui/raw/docs/components/empty.md) |
| `B24Error` | Вывод ошибки с действием «повторить» | [error.md](https://bitrix24.github.io/b24ui/raw/docs/components/error.md) |
| `B24ScrollArea` | Прокручиваемая область с собственной полосой прокрутки | [scroll-area.md](https://bitrix24.github.io/b24ui/raw/docs/components/scroll-area.md) |
| `B24Timeline` | Хронология событий и активности | [timeline.md](https://bitrix24.github.io/b24ui/raw/docs/components/timeline.md) |
| `B24User` | Пользователь — аватар, имя и описание | [user.md](https://bitrix24.github.io/b24ui/raw/docs/components/user.md) |
| `B24Theme` | Переопределение классов `b24ui` и значений пропсов для поддерева | [theme.md](https://bitrix24.github.io/b24ui/raw/docs/components/theme.md) |
| `B24Advice` | Пара строк текста рядом с аватаром | [advice.md](https://bitrix24.github.io/b24ui/raw/docs/components/advice.md) |
| `B24Countdown` | Таймер обратного отсчёта с управлением запуском, паузой и отменой | [countdown.md](https://bitrix24.github.io/b24ui/raw/docs/components/countdown.md) |
| `B24LocaleSelect` | Список для переключения локали приложения | [locale-select.md](https://bitrix24.github.io/b24ui/raw/docs/components/locale-select.md) |

## Формы

| Компонент | Назначение | Документация |
|---|---|---|
| `B24Input` | Поле ввода — текст, email, пароль, поиск | [input.md](https://bitrix24.github.io/b24ui/raw/docs/components/input.md) |
| `B24Textarea` | Многострочный текст с автоподбором высоты | [textarea.md](https://bitrix24.github.io/b24ui/raw/docs/components/textarea.md) |
| `B24Select` | Выпадающий список, похожий на нативный, для небольших списков | [select.md](https://bitrix24.github.io/b24ui/raw/docs/components/select.md) |
| `B24SelectMenu` | Богатый выпадающий список с поиском, множественным выбором и группами | [select-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/select-menu.md) |
| `B24InputMenu` | Автодополнение / combobox | [input-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-menu.md) |
| `B24InputNumber` | Числовое поле с кнопками +/− | [input-number.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-number.md) |
| `B24InputDate` | Выбор даты с календарём | [input-date.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-date.md) |
| `B24InputTime` | Выбор времени (12/24 ч) | [input-time.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-time.md) |
| `B24DateTimePicker` | Выбор даты и времени — календарь, затем сетка часов и минут | [date-time-picker.md](https://bitrix24.github.io/b24ui/raw/docs/components/date-time-picker.md) |
| `B24InputTags` | Ввод тегов в виде чипов | [input-tags.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-tags.md) |
| `B24InputRating` | Ввод оценки звёздами или иконками | [input-rating.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-rating.md) |
| `B24Listbox` | Список для одиночного и множественного выбора, всегда развёрнут | [listbox.md](https://bitrix24.github.io/b24ui/raw/docs/components/listbox.md) |
| `B24PinInput` | Ввод кода подтверждения | [pin-input.md](https://bitrix24.github.io/b24ui/raw/docs/components/pin-input.md) |
| `B24Checkbox` | Один булев чекбокс | [checkbox.md](https://bitrix24.github.io/b24ui/raw/docs/components/checkbox.md) |
| `B24CheckboxGroup` | Несколько чекбоксов | [checkbox-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/checkbox-group.md) |
| `B24RadioGroup` | Группа переключателей (radio) | [radio-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/radio-group.md) |
| `B24Switch` | Переключатель | [switch.md](https://bitrix24.github.io/b24ui/raw/docs/components/switch.md) |
| `B24Range` | Ползунок диапазона | [range.md](https://bitrix24.github.io/b24ui/raw/docs/components/range.md) |
| `B24ColorPicker` | Выбор цвета (hex/rgb/hsl) | [color-picker.md](https://bitrix24.github.io/b24ui/raw/docs/components/color-picker.md) |
| `B24FileUpload` | Загрузка файлов (кнопка или область перетаскивания) | [file-upload.md](https://bitrix24.github.io/b24ui/raw/docs/components/file-upload.md) |
| `B24Form` | Обёртка валидации по Standard Schema | [form.md](https://bitrix24.github.io/b24ui/raw/docs/components/form.md) |
| `B24FormField` | Обёртка поля с подписью, подсказкой и ошибками | [form-field.md](https://bitrix24.github.io/b24ui/raw/docs/components/form-field.md) |

## Оверлеи

| Компонент | Назначение | Документация |
|---|---|---|
| `B24Modal` | Диалог по центру — подтверждения, формы | [modal.md](https://bitrix24.github.io/b24ui/raw/docs/components/modal.md) |
| `B24Slideover` | Боковая панель — подробности, редактирование | [slideover.md](https://bitrix24.github.io/b24ui/raw/docs/components/slideover.md) |
| `B24Drawer` | Нижняя шторка — действия на мобильных | [drawer.md](https://bitrix24.github.io/b24ui/raw/docs/components/drawer.md) |
| `B24Popover` | Контекстное всплывающее окно, привязанное к триггеру | [popover.md](https://bitrix24.github.io/b24ui/raw/docs/components/popover.md) |
| `B24Tooltip` | Подсказка при наведении или фокусе (неинтерактивная) | [tooltip.md](https://bitrix24.github.io/b24ui/raw/docs/components/tooltip.md) |
| `B24ContextMenu` | Меню по правому клику | [context-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/context-menu.md) |
| `B24CommandPalette` | Поиск и навигация с клавиатуры (Cmd+K) | [command-palette.md](https://bitrix24.github.io/b24ui/raw/docs/components/command-palette.md) |

## Навигация

| Компонент | Назначение | Документация |
|---|---|---|
| `B24Sidebar` | Отдельное боковое меню с шапкой, телом и подвалом | [sidebar.md](https://bitrix24.github.io/b24ui/raw/docs/components/sidebar.md) |
| `B24NavigationMenu` | Основная навигация — горизонтальная или вертикальная | [navigation-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/navigation-menu.md) |
| `B24Tabs` | Переключатель вкладок внутри страницы | [tabs.md](https://bitrix24.github.io/b24ui/raw/docs/components/tabs.md) |
| `B24DropdownMenu` | Меню действий у триггера | [dropdown-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/dropdown-menu.md) |
| `B24Pagination` | Постраничная навигация | [pagination.md](https://bitrix24.github.io/b24ui/raw/docs/components/pagination.md) |
| `B24Stepper` | Многошаговый мастер | [stepper.md](https://bitrix24.github.io/b24ui/raw/docs/components/stepper.md) |
| `B24Accordion` | Сворачиваемые разделы | [accordion.md](https://bitrix24.github.io/b24ui/raw/docs/components/accordion.md) |
| `B24Breadcrumb` | Хлебные крошки с путём до текущей страницы | [breadcrumb.md](https://bitrix24.github.io/b24ui/raw/docs/components/breadcrumb.md) |

## Данные

| Компонент | Назначение | Документация |
|---|---|---|
| `B24Table` | Таблица данных (TanStack Table) с сортировкой, выбором, закреплением | [table.md](https://bitrix24.github.io/b24ui/raw/docs/components/table.md) |
| `B24Chart` | Линейные, площадные, столбчатые и кольцевые графики (TanStack Charts, необязательный peer `@tanstack/charts`) | [chart.md](https://bitrix24.github.io/b24ui/raw/docs/components/chart.md) |
| `B24TableWrapper` | Обёртка, оформляющая обычный HTML `<table>` | [table-wrapper.md](https://bitrix24.github.io/b24ui/raw/docs/components/table-wrapper.md) |
| `B24DescriptionList` | Список «ключ — значение»: строка таблицы, превращённая в отдельный блок | [description-list.md](https://bitrix24.github.io/b24ui/raw/docs/components/description-list.md) |

## Дашборд

| Компонент | Назначение | Документация |
|---|---|---|
| `B24DashboardGroup` | Корневая обёртка дашборда | [dashboard-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/dashboard-group.md) |
| `B24DashboardSidebar` | Боковое меню с изменяемым размером и сворачиванием | [dashboard-sidebar.md](https://bitrix24.github.io/b24ui/raw/docs/components/dashboard-sidebar.md) |
| `B24DashboardPanel` | Панель содержимого с шапкой, телом и подвалом | [dashboard-panel.md](https://bitrix24.github.io/b24ui/raw/docs/components/dashboard-panel.md) |
| `B24DashboardNavbar` | Полоса заголовка панели | [dashboard-navbar.md](https://bitrix24.github.io/b24ui/raw/docs/components/dashboard-navbar.md) |
| `B24DashboardToolbar` | Панель фильтров и действий под navbar | [dashboard-toolbar.md](https://bitrix24.github.io/b24ui/raw/docs/components/dashboard-toolbar.md) |
| `B24DashboardResizeHandle` | Ручка изменения размера между панелями | [dashboard-resize-handle.md](https://bitrix24.github.io/b24ui/raw/docs/components/dashboard-resize-handle.md) |
| `B24DashboardSidebarToggle` | Кнопка-переключатель бокового меню на мобильных | [dashboard-sidebar-toggle.md](https://bitrix24.github.io/b24ui/raw/docs/components/dashboard-sidebar-toggle.md) |
| `B24DashboardSearchButton` | Кнопка поиска для бокового меню | [dashboard-search-button.md](https://bitrix24.github.io/b24ui/raw/docs/components/dashboard-search-button.md) |
| `B24DashboardSearch` | Оверлей поиска уровня дашборда | [dashboard-search.md](https://bitrix24.github.io/b24ui/raw/docs/components/dashboard-search.md) |
| `B24DashboardSidebarCollapse` | Кнопка сворачивания бокового меню | [dashboard-sidebar-collapse.md](https://bitrix24.github.io/b24ui/raw/docs/components/dashboard-sidebar-collapse.md) |

## Page (маркетинг)

| Компонент | Назначение | Документация |
|---|---|---|
| `B24Page` | Многоколоночная раскладка с левым и правым боковыми блоками | [page.md](https://bitrix24.github.io/b24ui/raw/docs/components/page.md) |
| `B24PageSection` | Раздел с сеткой преимуществ | [page-section.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-section.md) |
| `B24PageHeader` | Заголовок и описание страницы | [page-header.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-header.md) |
| `B24PageBody` | Основная область содержимого | [page-body.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-body.md) |
| `B24PageGrid` | Раскладка карточек сеткой | [page-grid.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-grid.md) |
| `B24PageColumns` | Многоколоночная раскладка | [page-columns.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-columns.md) |
| `B24PageCard` | Карточка содержимого для сеток | [page-card.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-card.md) |
| `B24PageCardGroup` | Выбор из сетки карточек — одиночный или множественный выбор вариантов с иконкой, заголовком и описанием, с необязательными разделами по категориям, тенью при наведении, размерами sm/md/lg | [page-card-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-card-group.md) |
| `B24PageAside` | Обёртка липкой боковой колонки | [page-aside.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-aside.md) |
| `B24PageLinks` | Ссылки на связанные ресурсы | [page-links.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-links.md) |
| `B24PageList` | Раскладка списком для элементов страницы | [page-list.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-list.md) |
| `B24PageFeature` | Одно преимущество — иконка, заголовок и описание | [page-feature.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-feature.md) |

## Prose — базовая типографика

Стандартные элементы Markdown, которые подставляют Comark/Content/MDC. Префикс `::` не нужен — они соответствуют синтаксису markdown напрямую (`# Heading` → `ProseH1`, `**bold**` → `ProseStrong` и т. д.).

| Компонент | Что отрисовывает | Особенности |
|---|---|---|
| `H1` `H2` `H3` `H4` `H5` `H6` | Заголовки | У H1–H3 есть якорные ссылки и записи в оглавлении |
| `P` | Абзац | |
| `A` | Ссылка | Внешним ссылкам добавляются target и rel |
| `Strong` | Жирный | |
| `Em` | Курсив | |
| `Blockquote` | Цитата | |
| `Hr` | Горизонтальная линия | |
| `Ul` `Ol` `Li` | Списки | Вложенные и смешанные списки |
| `Table` `Thead` `Tbody` `Tr` `Th` `Td` | Таблицы | |
| `Img` | Изображение | Увеличение по клику (отключается `:zoom="false"`), поддержка `@nuxt/image` |
| `Pre` | Блок кода | Кнопка копирования, имя файла и иконка, подсветка строк (`{2,4-6}`), diff |
| `Code` | Код в строке | Пропсы `color` и `lang` |

## Prose — функциональные компоненты

Prose-компоненты, специфичные для Bitrix24 UI. В markdown-файлах они используются **без префикса `Prose`** (например, `::callout`, `::steps`). В Vue на них ссылаются как `ProseCallout`, `ProseSteps` и т. д. Comark подставляет их автоматически, когда установлен `@bitrix24/b24ui-nuxt`.

Bitrix24 UI также регистрирует краткие псевдонимы для `Callout`: `::note`, `::tip`, `::warning`, `::caution` (с готовыми `color` и `icon`).

| Компонент | Назначение |
|---|---|
| `Callout` | Выделенная заметка, предупреждение или совет (`color`, `iconName`, `to`) |
| `Badge` | Бейдж или тег в строке |
| `Kbd` | Клавиша |
| `Prompt` | Блок приглашения терминала |
| `Card` `CardGroup` | Карточка содержимого и сетка карточек |
| `Steps` | Нумерованный список шагов (пропс `level` задаёт уровень заголовков) |
| `Tabs` `TabsItem` | Содержимое во вкладках (`sync` — синхронизация через localStorage, `hash` — прокрутка при смене) |
| `Accordion` `AccordionItem` | Сворачиваемые разделы аккордеона |
| `Collapsible` | Один сворачиваемый раздел |
| `Field` `FieldGroup` | Отображение поля формы |
| `CodeGroup` | Блоки кода во вкладках |
| `CodeCollapse` | Сворачиваемый блок кода |
| `CodeIcon` | Иконка типа файла в заголовках кода |
| `CodePreview` | Код и живой предпросмотр рядом |
| `Script` | Вставка скрипта |

## Контент (Nuxt Content)

| Компонент | Назначение | Документация |
|---|---|---|
| `B24ContentToc` | Оглавление | [content-toc.md](https://bitrix24.github.io/b24ui/raw/docs/components/content-toc.md) |
| `B24ContentSurround` | Переходы к предыдущей и следующей странице | [content-surround.md](https://bitrix24.github.io/b24ui/raw/docs/components/content-surround.md) |
| `B24ContentSearch` | Командная палитра поиска | [content-search.md](https://bitrix24.github.io/b24ui/raw/docs/components/content-search.md) |
| `B24ContentSearchButton` | Кнопка вызова поиска по содержимому | [content-search-button.md](https://bitrix24.github.io/b24ui/raw/docs/components/content-search-button.md) |

## Чат (AI)

| Компонент | Назначение | Документация |
|---|---|---|
| `B24ChatAttachment` | Файл, прикреплённый к запросу или сообщению | [chat-attachment.md](https://bitrix24.github.io/b24ui/raw/docs/components/chat-attachment.md) |
| `B24ChatMessages` | Прокручиваемый список сообщений | [chat-messages.md](https://bitrix24.github.io/b24ui/raw/docs/components/chat-messages.md) |
| `B24ChatMessage` | Отдельное сообщение | [chat-message.md](https://bitrix24.github.io/b24ui/raw/docs/components/chat-message.md) |
| `B24ChatReasoning` | Сворачиваемый блок рассуждений AI | [chat-reasoning.md](https://bitrix24.github.io/b24ui/raw/docs/components/chat-reasoning.md) |
| `B24ChatTool` | Статус вызова инструмента | [chat-tool.md](https://bitrix24.github.io/b24ui/raw/docs/components/chat-tool.md) |
| `B24ChatShimmer` | Анимация потокового текста | [chat-shimmer.md](https://bitrix24.github.io/b24ui/raw/docs/components/chat-shimmer.md) |
| `B24ChatPrompt` | Расширенное многострочное поле для запросов | [chat-prompt.md](https://bitrix24.github.io/b24ui/raw/docs/components/chat-prompt.md) |
| `B24ChatPromptSubmit` | Кнопка отправки со статусом | [chat-prompt-submit.md](https://bitrix24.github.io/b24ui/raw/docs/components/chat-prompt-submit.md) |
| `B24ChatPalette` | Раскладка чата для оверлеев | [chat-palette.md](https://bitrix24.github.io/b24ui/raw/docs/components/chat-palette.md) |

## Редактор

| Компонент | Назначение | Документация |
|---|---|---|
| `B24Editor` | Редактор форматированного текста (JSON/HTML/Markdown) | [editor.md](https://bitrix24.github.io/b24ui/raw/docs/components/editor.md) |
| `B24EditorToolbar` | Панель инструментов (фиксированная/всплывающая/плавающая) | [editor-toolbar.md](https://bitrix24.github.io/b24ui/raw/docs/components/editor-toolbar.md) |
| `B24EditorDragHandle` | Перетаскивание блоков | [editor-drag-handle.md](https://bitrix24.github.io/b24ui/raw/docs/components/editor-drag-handle.md) |
| `B24EditorSuggestionMenu` | Меню слэш-команд | [editor-suggestion-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/editor-suggestion-menu.md) |
| `B24EditorMentionMenu` | Меню упоминаний через @ | [editor-mention-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/editor-mention-menu.md) |
| `B24EditorEmojiMenu` | Выбор эмодзи | [editor-emoji-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/editor-emoji-menu.md) |

## Цветовая схема

| Компонент | Назначение | Документация |
|---|---|---|
| `B24ColorModeButton` | Кнопка-переключатель (светлая/тёмная) | [color-mode-button.md](https://bitrix24.github.io/b24ui/raw/docs/components/color-mode-button.md) |
| `B24ColorModeSwitch` | Переключатель (светлая/тёмная) | [color-mode-switch.md](https://bitrix24.github.io/b24ui/raw/docs/components/color-mode-switch.md) |
| `B24ColorModeSelect` | Выпадающий список (светлая/тёмная/системная) | [color-mode-select.md](https://bitrix24.github.io/b24ui/raw/docs/components/color-mode-select.md) |
| `B24ColorModeAvatar` | Аватар, меняющийся вместе с цветовой схемой | [color-mode-avatar.md](https://bitrix24.github.io/b24ui/raw/docs/components/color-mode-avatar.md) |
| `B24ColorModeImage` | Изображение, меняющееся вместе с цветовой схемой | [color-mode-image.md](https://bitrix24.github.io/b24ui/raw/docs/components/color-mode-image.md) |
