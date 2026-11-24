# Выбор компонента

Матрицы выбора подходящего компонента. Список всех компонентов — на [странице документации](https://bitrix24.github.io/b24ui/raw/docs/components.md)

## Оверлеи

| Задача | Компонент | Документация | Почему |
|---|---|---|---|
| Диалог подтверждения, сфокусированная задача, форма | `B24Modal` | [modal.md](https://bitrix24.github.io/b24ui/raw/docs/components/modal.md) | Блокирует страницу, по центру, забирает фокус |
| Панель сведений, настройки, второстепенное содержимое | `B24Slideover` | [slideover.md](https://bitrix24.github.io/b24ui/raw/docs/components/slideover.md) | Выезжает от края, прерывает работу меньше, чем модальное окно |
| Нижняя шторка, ориентированная на мобильные | `B24Drawer` | [drawer.md](https://bitrix24.github.io/b24ui/raw/docs/components/drawer.md) | Привычный на мобильных приём, закрывается свайпом |
| Контекстная информация, привязанная к элементу-триггеру | `B24Popover` | [popover.md](https://bitrix24.github.io/b24ui/raw/docs/components/popover.md) | Без затемнения, позиционируется относительно триггера |
| Простая подсказка при наведении | `B24Tooltip` | [tooltip.md](https://bitrix24.github.io/b24ui/raw/docs/components/tooltip.md) | Неинтерактивная, только при наведении или фокусе |

### Правила
- `B24Modal` — для подтверждения опасных действий («Точно удалить?»)
- `B24Slideover` — для подробностей в дашбордах (предпросмотр письма, профиль пользователя)
- `B24Drawer` — для мобильной навигации и листов действий
- У Modal и Slideover нет `mode="drawer"`: чтобы получить поведение drawer, задайте `B24Slideover` `side="bottom"` или используйте `B24Drawer` напрямую
- Для программных оверлеев используйте `useOverlay()` вместо `v-model:open`
- Не размещайте интерактивное содержимое (кнопки, ссылки) внутри `B24Tooltip`

## Навигация

| Задача | Компонент | Документация | Почему |
|---|---|---|---|
| Основная навигация сайта или приложения | `B24NavigationMenu` | [navigation-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/navigation-menu.md) | Горизонтальная (шапка) или вертикальная (боковое меню) |
| Переключение видов на одной странице | `B24Tabs` | [tabs.md](https://bitrix24.github.io/b24ui/raw/docs/components/tabs.md) | Содержимое остаётся на странице, смена маршрута не нужна |
| Показать текущее место в иерархии | `B24Breadcrumb` | [breadcrumb.md](https://bitrix24.github.io/b24ui/raw/docs/components/breadcrumb.md) | Вложенная структура страниц |
| Поиск и навигация с клавиатуры | `B24CommandPalette` | [command-palette.md](https://bitrix24.github.io/b24ui/raw/docs/components/command-palette.md) | Опытные пользователи, глобальный поиск |
| Контекстные действия для элемента-триггера | `B24DropdownMenu` | [dropdown-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/dropdown-menu.md) | Меню по правому клику, кнопки действий |
| Пошаговый процесс | `B24Stepper` | [stepper.md](https://bitrix24.github.io/b24ui/raw/docs/components/stepper.md) | Многошаговые формы, мастера |

### Правила
- `B24NavigationMenu` с `orientation="vertical"` — в боковых меню, по умолчанию (горизонтальный) — в шапках
- `B24Tabs` — когда переключаемые виды не требуют отдельного URL
- Навигацию по маршрутам (пропс `to`) используйте, если у видов должны быть ссылки, которыми можно поделиться
- `B24CommandPalette` обычно открывают по `Cmd+K` — подключите сочетание через `defineShortcuts`

## Поля ввода

| Задача | Компонент | Документация | Почему |
|---|---|---|---|
| Небольшой фиксированный список (< 10 элементов) | `B24Select` | [select.md](https://bitrix24.github.io/b24ui/raw/docs/components/select.md) | Похож на нативный, простой, лёгкий |
| Список с поиском, множественный выбор, группы | `B24SelectMenu` | [select-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/select-menu.md) | Богатое выпадающее меню с поиском, множественным выбором и группами |
| Автодополнение / combobox (ввод и выбор) | `B24InputMenu` | [input-menu.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-menu.md) | Можно вводить свободно и выбирать из подсказок |
| Ввод произвольного текста | `B24Input` | [input.md](https://bitrix24.github.io/b24ui/raw/docs/components/input.md) | Текст, email, пароль, поиск |
| Многострочный текст | `B24Textarea` | [textarea.md](https://bitrix24.github.io/b24ui/raw/docs/components/textarea.md) | С `autoresize` и `maxrows` |
| Число с кнопками +/− | `B24InputNumber` | [input-number.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-number.md) | Ограничения min, max, step |
| Выбор даты | `B24InputDate` | [input-date.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-date.md) | Выпадающий календарь, поддерживает диапазоны |
| Выбор времени | `B24InputTime` | [input-time.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-time.md) | Выбор часов и минут, 12- и 24-часовой формат |
| Теги / несколько произвольных значений | `B24InputTags` | [input-tags.md](https://bitrix24.github.io/b24ui/raw/docs/components/input-tags.md) | Ввод в виде чипов с ограничением количества |
| Код подтверждения | `B24PinInput` | [pin-input.md](https://bitrix24.github.io/b24ui/raw/docs/components/pin-input.md) | Ввод кода фиксированной длины |
| Булев переключатель | `B24Switch` | [switch.md](https://bitrix24.github.io/b24ui/raw/docs/components/switch.md) | Вкл/выкл, включить/отключить |
| Булев чекбокс | `B24Checkbox` | [checkbox.md](https://bitrix24.github.io/b24ui/raw/docs/components/checkbox.md) | Один вариант с подписью |
| Несколько вариантов из списка | `B24CheckboxGroup` | [checkbox-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/checkbox-group.md) | Множественный выбор, вертикально или горизонтально |
| Один вариант из видимого списка | `B24RadioGroup` | [radio-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/radio-group.md) | Все варианты видны, выбран один |
| Выбрать одну или несколько «именованных возможностей» из набора, где каждому варианту нужны иконка и предложение | `B24PageCardGroup` | [page-card-group.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-card-group.md) | Сетка карточек с иконкой, заголовком и описанием у каждого варианта, необязательные разделы по категориям, одиночный или множественный выбор, тень при наведении, размеры sm/md/lg |
| Значение из диапазона | `B24Range` | [range.md](https://bitrix24.github.io/b24ui/raw/docs/components/range.md) | Минимум и максимум с наглядной дорожкой |
| Значение цвета | `B24ColorPicker` | [color-picker.md](https://bitrix24.github.io/b24ui/raw/docs/components/color-picker.md) | Выбор в Hex, RGB, HSL |
| Загрузка файла | `B24FileUpload` | [file-upload.md](https://bitrix24.github.io/b24ui/raw/docs/components/file-upload.md) | Варианты: кнопка или область для перетаскивания |

### Правила
- Страницы входа и регистрации собирайте из `B24Form`, `B24FormField` и `B24Input`: отдельного компонента авторизации нет, поэтому поля, кнопки входа через внешние сервисы и раскладка составляются как в любой другой форме (см. [формы](forms.md)). Полям с учётными данными задайте `type="password"` и подходящий `autocomplete` (`username`, `current-password`, `new-password`), чтобы работали менеджеры паролей; секреты клиента OAuth и проверку адреса перенаправления держите на сервере, не в компоненте
- `B24Select` — для коротких известных списков (страна, статус, роль)
- `B24SelectMenu` — когда список длинный или нужен поиск
- `B24InputMenu` — когда пользователь может ввести значение, которого нет в списке
- Все поля формы оборачивайте в `B24FormField` — для подписей, описаний, подсказок и ошибок валидации
- Связанные поля в одной строке группируйте через `B24FieldGroup`
- `B24PageCardGroup` — когда каждому варианту нужно своё предложение: варианты настроек («какой шаблон формы?»), включение возможностей («какие каналы использует сценарий?») или первый шаг мастера. Пользователь читает, прежде чем нажать. Если подписей достаточно, возвращайтесь к `B24RadioGroup` / `B24CheckboxGroup`.

## Обратная связь

| Задача | Компонент | Документация | Почему |
|---|---|---|---|
| Кратковременное уведомление после действия | `useToast()` | [use-toast.md](https://bitrix24.github.io/b24ui/raw/docs/composables/use-toast.md) | Закрывается само, накапливается, не блокирует работу |
| Постоянное сообщение внутри страницы | `B24Alert` | [alert.md](https://bitrix24.github.io/b24ui/raw/docs/components/alert.md) | Остаётся на виду, в контексте страницы |
| Объявление для всего приложения | `B24Banner` | [banner.md](https://bitrix24.github.io/b24ui/raw/docs/components/banner.md) | Липкая верхняя полоса, можно закрыть |
| Состояние загрузки | `B24Skeleton` | [skeleton.md](https://bitrix24.github.io/b24ui/raw/docs/components/skeleton.md) | Заглушка с мерцанием на время загрузки |
| Индикатор прогресса | `B24Progress` | [progress.md](https://bitrix24.github.io/b24ui/raw/docs/components/progress.md) | Определённый или неопределённый прогресс |

### Правила
- `useToast()` — для отклика на действие: «Элемент сохранён», «Письмо отправлено», «Произошла ошибка»
- `B24Alert` — для контекстных предупреждений в формах и разделах
- `B24Banner` — для сообщений на весь сайт (техработы, новая возможность)
- Не используйте уведомление для сведений, на которые пользователь должен отреагировать, — берите alert или модальное окно

## Контейнеры раскладки

| Задача | Компонент | Документация | Почему |
|---|---|---|---|
| Сгруппированное содержимое с шапкой, телом и подвалом | `B24Card` | [card.md](https://bitrix24.github.io/b24ui/raw/docs/components/card.md) | Контейнер с рамкой или тенью и слотами |
| Карточка с иконкой, бейджем и ссылками | `B24PageCard` | [page-card.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-card.md) | Расширенная карточка для сеток: иконка, бейдж, выделение, ссылки |
| Раздел маркетинговой страницы | `B24PageSection` | [page-section.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-section.md) | Раздел на всю ширину с надзаголовком, заголовком и преимуществами |
| Сетка преимуществ | `B24PageGrid` + `B24PageCard` | [page-grid.md](https://bitrix24.github.io/b24ui/raw/docs/components/page-grid.md) | Сетка карточек в несколько колонок |
| Обёртка содержимого по центру | `B24Container` | [container.md](https://bitrix24.github.io/b24ui/raw/docs/components/container.md) | Контейнер с ограниченной шириной |
| Сворачиваемый раздел | `B24Collapsible` | [collapsible.md](https://bitrix24.github.io/b24ui/raw/docs/components/collapsible.md) | Анимированное разворачивание и сворачивание |
| Аккордеон (несколько сворачиваемых блоков) | `B24Accordion` | [accordion.md](https://bitrix24.github.io/b24ui/raw/docs/components/accordion.md) | FAQ, сгруппированное сворачиваемое содержимое |

### Правила
- Не злоупотребляйте `B24Card`: обычное содержимое с отступами часто лучше, чем всё в карточках
- `B24PageCard` вместо `B24Card`, когда нужны иконка, бейдж, выделение или ссылки: он создан для сеток преимуществ и лендингов
- `B24PageSection` — для разделов маркетинговых страниц и лендингов, не для интерфейса приложения
- `B24Container` внутри тела `B24DashboardPanel` даёт единую ширину содержимого
