---
title: Popover
description: 'Немодальное всплывающее окно для показа сообщений или сбора данных от пользователя.'
category: overlay
keywords:
  - hover card
  - flyout
  - поповер
  - всплывающая панель
  - немодальное окно
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Popover.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/popover
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/popover
  - label: Popover
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/popover
---

## Использование {#usage}

Поместите в слот по умолчанию Popover [Button](/docs/components/button/) или любой другой компонент.

Затем слот `#content` задаёт содержимое, которое показывается при открытии Popover.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Режим {#mode}

Пропс `mode` меняет режим Popover. По умолчанию `click`.

::tip
В режиме `hover` пропс `enable-touch` позволяет открывать и закрывать Popover касанием по триггеру на сенсорных устройствах. Для триггеров, на которые рассчитано нажатие, используйте режим `click`.
::

::component-code
---
prettier: true
items:
  mode:
    - click
    - hover
props:
  mode: 'hover'
  enableTouch: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

::note
В режиме `hover` вместо [`Popover`](https://reka-ui.com/docs/components/popover) используется компонент [`HoverCard`](https://reka-ui.com/docs/components/hover-card) из Reka UI.
::

### Задержка {#delay}

В режиме `hover` пропсы `open-delay` и `close-delay` задают задержку перед открытием и закрытием Popover.

::component-code
---
prettier: true
ignore:
  - mode
props:
  mode: 'hover'
  openDelay: 500
  closeDelay: 300
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Содержимое {#content}

Пропс `content` управляет отрисовкой содержимого Popover: например, `align` и `side` задают выравнивание и сторону.

::component-code
---
prettier: true
items:
  content.align:
    - start
    - center
    - end
  content.side:
    - right
    - left
    - top
    - bottom
props:
  content:
    align: center
    side: bottom
    sideOffset: 8
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Стрелка {#arrow}

Пропс `arrow` показывает стрелку у Popover.

::component-code
---
prettier: true
ignore:
  - arrow
props:
  arrow: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Модальный режим {#modal}

Пропс `modal` определяет, блокирует ли Popover взаимодействие с остальной страницей. По умолчанию `false`.

::component-code
---
prettier: true
ignore:
  - title
props:
  modal: true
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="size-48 m-4 inline-flex" />
---

:b24-button{label="Open"}

#content
:placeholder{class="size-48 m-4 inline-flex"}
::

### Закрытие по действию вне окна {#dismissible}

Пропс `dismissible` определяет, закрывается ли Popover по клику вне его или по Esc. По умолчанию `true`.

::note
Когда пользователь пытается закрыть Popover, срабатывает событие `close:prevent`.
::

::component-example
---
name: 'popover-dismissible-example'
---
::

## Примеры {#examples}

### Управление открытием {#control-open-state}

Состоянием открытия управляют пропс `default-open` или директива `v-model:open`.

::component-example
---
name: 'popover-open-example'
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) Popover переключается по нажатию :kbd{value="O"}.
::

### С командной палитрой {#with-command-palette}

Внутрь содержимого Popover можно поместить компонент [CommandPalette](/docs/components/command-palette/).

::component-example
---
collapse: true
name: 'popover-command-palette-example'
---
::

### С привязкой к курсору {#with-following-cursor}

Чтобы Popover следовал за курсором при наведении на элемент, используйте пропс [`reference`](https://reka-ui.com/docs/components/tooltip#trigger):

::component-example
---
name: 'popover-cursor-example'
---
::

### Со слотом anchor {#with-anchor-slot}

Слот `#anchor` позиционирует Popover относительно произвольного элемента.

::warning
Слот работает только при `mode`, равном `click`.
::

::component-example
---
collapse: true
name: 'popover-anchor-slot-example'
---
::

### Карточка сведений о сущности {#entity-info-card}

Пример из практики: сводка по аккаунту или сделке во всплывающем окне при наведении. Собрана из [`Card`](/docs/components/card/), [`Avatar`](/docs/components/avatar/), [`Separator`](/docs/components/separator/), [`Button`](/docs/components/button/), [`Link`](/docs/components/link/) и [`DescriptionList`](/docs/components/description-list/) — без своих стилей, кроме акцента аватара.

::component-example
---
collapse: true
name: 'popover-entity-info-example'
---
::

::prompt
---
description: Собрать всплывающее окно со сведениями о сущности для любой записи или объекта.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Опирайтесь на навык `b24-ui-nuxt` (см. `references/recipes/overlays.md` → «Info popover (entity summary)»), чтобы собрать компактное всплывающее окно со сведениями о сущности, которое открывается над названием сущности в тексте. Окно должно кратко показывать запись: цветной аватар, название сущности, одну строку подписи, главную кнопку-призыв, разделитель и список «подпись / значение», где одно-два значения отрисованы отдельными компонентами (ссылка, бейдж, время).

Перед написанием кода уточните недостающее:
- Какую сущность описывает окно (например, пользователь, аккаунт, заказ, обращение, проект, товар, событие)? От этого зависят иконка аватара и акцент дизайн-токена (`alert`, `success`, `warning`, `copilot`).
- Что служит триггером — `B24Link` посреди абзаца (наведение) или отдельный элемент управления (клик)?
- Какие поля нужны на карточке: название, подпись (короткая строка статуса: число, стадия или роль), текст и цель кнопки, а также 2–4 пары «подпись / значение» (ответственный, дата создания, статус, категория, место и так далее)?
- Нужен ли каким-то значениям свой компонент (ссылка, бейдж, время)? Если да, используйте общий слот `#description` с `v-if="item.slot === '<key>'"` вместо замены всей пары `<dt>/<dd>` слотом отдельного элемента.
- Локаль, предпросмотр в тёмной теме и события аналитики, которые нужно отправлять при открытии окна и клике по кнопке.

Когда ответы получены, соберите окно только из стандартных компонентов (`B24Popover`, `B24Avatar`, `B24Button`, `B24Separator`, `B24DescriptionList`, `B24Link`) и с помощью пропса `:b24ui`:
- зафиксируйте раскладку в одну колонку внутри узкой карточки и уберите разделители строк;
- выдержите компактный ритм образца (`p-6`, `gap-4.5`, `w-65`, кнопка `size="sm"`);
- перекрасьте аватар через дизайн-токены — никаких hex-значений в коде.

Для названия и подписи используйте семантические утилиты типографики (`text-label`, `text-description`), а все тексты оставьте на запрошенной локали.
::

### Виджет динамики продаж {#sales-dynamics-widget}

Пример из практики: Popover со статистической карточкой. Сам виджет описан на странице [Card](/docs/components/card/#sales-dynamics-widget); здесь он лежит внутри `B24Popover`, и кнопка-триггер показывает его по требованию.

::component-example
---
collapse: true
name: 'popover-sales-dynamics-example'
---
::

::prompt
---
description: Обернуть виджет динамики продаж в Popover, чтобы кнопка или ссылка показывала его по требованию.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Возьмите образец виджета «Sales dynamics» (см. `references/recipes/overlays.md` → «Stats widget (KPI summary)») и покажите его через `B24Popover`, чтобы кнопка или ссылка в тексте открывала метрики по требованию — это удобно в строках дашборда, ячейках списка и тексте, где полная карточка была бы слишком тяжёлой.

Перед написанием кода уточните недостающее:
- Что служит триггером — `B24Button` (отдельный элемент управления, обычно `mode="click"`) или `B24Link is-action` посреди абзаца (обычно `mode="hover"`)?
- Должно ли окно следовать за курсором, крепиться к своему `#anchor` или оставаться у триггера?
- Должно ли окно оставаться открытым, пока пользователь работает с виджетом? Если кнопки `Configure` и `Feedback` самого виджета должны работать без закрытия, оставьте `dismissible` по умолчанию (true), но не давайте обработчикам кликов всплывать до корня окна.
- Какова форма данных за строками (и необязательной выделенной строкой) и откуда они берутся — пропсы страницы, хранилище или асинхронный запрос?
- Локаль и аналитика: открытия окна и клики по кнопке отслеживайте раздельно — это поверхность «заглянуть», а не основная страница метрик.

Когда ответы получены, соберите окно только из стандартных компонентов:
- Уберите оформление содержимого окна через `:b24ui="{ content: 'p-0 bg-transparent border-0 shadow-none' }"`, чтобы виджет рисовал свою поверхность (градиент, скруглённые углы и тень у него внутри).
- Поместите триггер в слот по умолчанию (`B24Button` или `B24Link is-action` — не оба сразу в одном окне); `mode` выбирайте под вид триггера.
- Сам виджет отрисуйте в `#content` ровно так, как описано в образце: корень `edge-dark`, фиолетовый радиальный градиент (`--ui-color-copilot-bg-content-3 → -2 → -1`), выделенная строка `style-filled-boost` и три кнопки действий `air-secondary-accent`.
- Для триггера-ссылки в тексте привяжите окно через `:content="{ side: 'bottom', sideOffset: 8 }"`, чтобы виджет открывался под ссылкой и не перекрывал окружающий абзац.

Все тексты оставьте на запрошенной локали, а данные передавайте в той же форме (`title`, `totalLine`, `todayLine`, `rangeLabel`, `rows`, `highlight`), что и в самостоятельном образце.
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

::note
Функция `close` доступна только при `mode`, равном `click`: Reka UI даёт её для [`Popover`](https://reka-ui.com/docs/components/popover#close-using-slot-props), но не для [`HoverCard`](https://reka-ui.com/docs/components/hover-card).
::

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
