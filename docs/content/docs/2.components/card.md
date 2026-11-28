---
title: Card
description: 'Карточка с заголовком, основной частью и подвалом.'
category: element
keywords:
  - panel
  - box
  - container
  - карточка
  - панель
  - блок
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Card.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/card
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/card
---

## Использование {#usage}

Слоты `header`, `default` и `footer` добавляют содержимое в Card.

::component-code
---
prettier: true
hide:
  - class
props:
  class: 'w-full'
slots:
  header: |

    <Placeholder class="h-8" />

  default: |

    <Placeholder class="h-32" />

  footer: |

    <Placeholder class="h-8" />
---

#header
:placeholder{class="h-8"}

#default
:placeholder{class="h-32"}

#footer
:placeholder{class="h-8"}
::

### Заголовок {#title}

Пропс `title` задаёт заголовок в шапке Card.

::component-code
---
prettier: true
ignore:
  - class
props:
  title: 'Карточка с заголовком'
  class: 'w-full'
slots:
  default: |

    <Placeholder class="h-32" />
---

#default
:placeholder{class="h-32"}
::

::tip
По умолчанию заголовок отрисовывается как `div`. Чтобы получить заголовок-тег, передайте в пропс `as` объект, например `:as="{ title: 'h3' }"`{lang="ts-type"}. Так же задаётся и корневой элемент: `:as="{ root: 'section', title: 'h3' }"`{lang="ts-type"}.
::

### Описание {#description}

Пропс `description` задаёт описание в шапке Card.

::component-code
---
prettier: true
ignore:
  - title
  - class
props:
  title: 'Карточка с описанием'
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  class: 'w-full'
slots:
  default: |

    <Placeholder class="h-32" />
---

#default
:placeholder{class="h-32"}
::

### Размер {#size}

Пропс `size` задаёт отступы шапки, основной части и подвала.

::component-code
---
prettier: true
hide:
  - class
items:
  size:
    - xs
    - sm
    - md
    - lg
props:
  size: lg
  class: 'w-full'
slots:
  header: |

    <Placeholder class="h-8" />

  default: |

    <Placeholder class="h-32" />

  footer: |

    <Placeholder class="h-8" />
---

#header
:placeholder{class="h-8"}

#default
:placeholder{class="h-32"}

#footer
:placeholder{class="h-8"}
::

### Вариант {#variant}

Пропс `variant` меняет вариант Card.

::component-code
---
prettier: true
hide:
  - class
props:
  variant: outline
  class: 'w-full'
slots:
  header: |

    <Placeholder class="h-8" />

  default: |

    <Placeholder class="h-32" />

  footer: |

    <Placeholder class="h-8" />
---

#header
:placeholder{class="h-8"}

#default
:placeholder{class="h-32"}

#footer
:placeholder{class="h-8"}
::

## Примеры {#examples}

### Виджет динамики продаж {#sales-dynamics-widget}

Пример из практики: виджет дашборда CRM, собранный из `Card` (вариант `filled-copilot` для фиолетового акцента), `Button`, `Tooltip` и небольшой CSS-сетки для строк с метриками. Выделенная строка «Conversion» — это просто полупрозрачная подложка `bg-white/15` поверх той же карточки.

::component-example
---
collapse: true
name: 'card-sales-dynamics-example'
---
::

::prompt
---
description: Отрисовать виджет дашборда CRM с несколькими метриками и выделенной строкой KPI.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
На дашборде CRM отрисуйте виджет «Repeat sales dynamics» со сводкой по числу и сумме сделок. У карточки акцент copilot, а внизу — выделенная строка с KPI конверсии.

Требования:
- Используйте `B24Card` с `variant="filled-copilot"`. В слоте `#header` — заголовок, описание в две строки и кнопка-таблетка `B24Button` справа вверху (`rounded`, `color="air-tertiary-no-accent"`, `:trailing-icon="RepeatIcon"`), которая переключает период
- Основная часть — небольшая CSS-сетка из трёх колонок (`1fr_auto_auto`): в первой строке заголовки колонок («Count» / «Amount»), затем по строке на метрику. Каждая строка лежит на `bg-white/5 rounded-xl`, чтобы читаться как строка поверх заливки copilot
- Выделенную строку KPI отрисуйте с `bg-white/15 ring-1 ring-white/20` для контраста. Рядом с подписью поставьте небольшую `Info1Icon` внутри `B24Tooltip` с описанием
- В слоте `#footer` две кнопки `air-tertiary-no-accent` по разным краям (`Configure` слева, `Feedback` справа) с иконками слева (`SettingsIcon`, `FeedbackIcon`)
- Значения берите из `rows: { label, count, amount }[]` и необязательного `highlight: { label, count, amount, info }`. Суммы храните готовыми строками, чтобы не зависеть от форматирования денег
::

### Панель сведений о канале {#channel-detail-panel}

Боковая панель сущности целиком из стандартных компонентов: `Card` (основная часть с `divide-y` даёт разделители секций автоматически), квадратный `Avatar`, `AvatarGroup` со счётчиком остатка, строки с `Switch`, счётчики `Badge` и заглушки секций `Empty`. Подойдёт как основа для панели сведений о чате или карточки записи CRM.

::component-example
---
collapse: true
name: 'card-channel-panel-example'
---
::

Эту раскладку можно сгенерировать с помощью AI-ассистента. Промпт просит ассистента до написания кода уточнить тип сущности и нужные секции:

::prompt
---
description: Собрать боковую панель сведений о сущности в стиле Битрикс24 из стандартных компонентов.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Вы — эксперт по Bitrix24 UI. Помогите собрать боковую панель сведений о сущности (информационную панель) только из стандартных компонентов `@bxshefby/b24ui-nuxt` с минимумом собственных стилей.

Перед написанием кода задайте уточняющие вопросы и дождитесь ответов:
- Для какой сущности панель (канал чата, контакт или сделка CRM, проект, что-то другое)?
- Что показывать в шапке (форма аватара, заголовок, подзаголовок, группа участников)?
- Какие переключатели нужны (например, уведомления, автоудаление) и в каком состоянии они по умолчанию?
- Какие строки сведений и счётчики нужны (и для каких нужен бейдж)?
- Какие секции содержимого нужны (например, «Медиа и файлы», «Задачи», «Встречи») и как они выглядят пустыми?

Когда я подтвержу, собирайте по таким правилам:
- Оберните всё в `B24Card` с `class="w-full max-w-xs overflow-hidden"` и `:b24ui="{ body: 'p-0 flex flex-col gap-0 divide-y divide-default' }"`, чтобы секции разделялись автоматически
- Аватар канала сделайте квадратным: `B24Avatar :b24ui="{ root: 'rounded-xl' }"`; участников показывайте через `B24AvatarGroup :max="N"` с одним лишним дочерним элементом, чтобы получился счётчик `+1`
- В строках-переключателях иконку вынесите наружу, а `B24Switch` используйте с пропсом `label` ради доступности и переверните раскладку через `:b24ui="{ root: 'flex-1 flex-row-reverse justify-between items-center', wrapper: 'ms-0' }"`
- Числовые счётчики в строках сведений — `B24Badge ... square`
- Пустые секции — `B24Empty`, «выровненный» через `:b24ui="{ root: 'ring-0 rounded-none py-3' }"`
- Используйте семантические токены текста (`text-label`, `text-description`, `text-dimmed`) и `<h3>` для заголовков секций
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
