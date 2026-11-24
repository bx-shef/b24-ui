---
title: Modal
description: 'Всплывающее окно для показа сообщений или получения данных от пользователя.'
category: overlay
keywords:
  - dialog
  - popup
  - confirm
  - alert dialog
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Modal.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/modal
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/modal
  - label: Dialog
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/dialog
---

## Использование {#usage}

Поместите в слот по умолчанию Modal [Button](/docs/components/button/) или любой другой компонент.

Затем слот `#content` задаёт содержимое, которое показывается при открытом Modal.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button label="Открыть" />

  content: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#content
:placeholder{class="h-48"}
::

Слоты `#header`{lang="ts-type"}, `#body`{lang="ts-type"} и `#footer`{lang="ts-type"} позволяют настроить содержимое Modal.

### Заголовок {#title}

Пропс `title` задаёт заголовок в шапке Modal.

::component-code
---
prettier: true
props:
  title: 'Модальное окно с заголовком'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-48"}
::

### Описание {#description}

Пропс `description` задаёт описание в шапке Modal.

::component-code
---
prettier: true
ignore:
  - title
props:
  title: 'Модальное окно с описанием'
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-48"}
::

### Закрытие {#close}

Пропс `close` настраивает кнопку закрытия в шапке Modal или скрывает её (значение `false`).

Можно передать любое свойство компонента [Button](/docs/components/button/).

::component-code
---
prettier: true
ignore:
  - title
  - close.color
props:
  title: 'Модальное окно с кнопкой закрытия'
  close:
    color: air-secondary-accent-2
    class: 'rounded-full'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-48"}
::

::tip
Кнопка закрытия не показывается, если используется слот `#content`: она входит в шапку.
::

### Иконка закрытия {#close-icon}

Пропс `close-icon` меняет [иконку](https://bitrix24.github.io/b24icons/icons/) кнопки закрытия.

::component-code
---
prettier: true
ignore:
  - title
  - closeIcon
cast:
  closeIcon: 'RocketIcon'
props:
  title: 'Модальное окно с кнопкой закрытия'
  closeIcon: 'RocketIcon'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-48"}
::

### Анимация {#transition}

Пропс `transition` определяет, анимируется ли Modal. По умолчанию `true`.

::component-code
---
prettier: true
ignore:
  - title
props:
  transition: false
  title: 'Модальное окно без анимации'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-48"}
::

### Оверлей {#overlay}

Пропс `overlay` определяет, есть ли у Modal оверлей. По умолчанию `true`.

::component-code
---
prettier: true
ignore:
  - title
props:
  overlay: false
  title: 'Модальное окно без оверлея'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-48"}
::

### Размытие оверлея {#overlay-blur}

Чтобы отключить размытие фона, используйте пропс `overlayBlur`.

У пропса `overlayBlur` три значения:

- `auto`: (по умолчанию) когда пользователь **не запрашивал** [уменьшение анимации](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)
- `on`: размытие всегда включено
- `off`: размытия нет

::component-code
---
prettier: true
ignore:
  - title
  - overlay
items:
  overlayBlur:
    - auto
    - on
    - off
props:
  overlay: true
  overlayBlur: 'auto'
  title: 'Размытие оверлея'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-48"}
::

### Модальный режим {#modal}

Пропс `modal` определяет, блокирует ли Modal взаимодействие с содержимым вне окна. По умолчанию `true`.

::note
При `modal` равном `false` оверлей отключается автоматически, а содержимое вне окна остаётся интерактивным.
::

::component-code
---
prettier: true
ignore:
  - title
props:
  modal: false
  title: 'Интерактивное модальное окно'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-48"}
::

### Закрытие по действию вне окна {#dismissible}

Пропс `dismissible` определяет, закрывается ли Modal щелчком вне окна или нажатием Escape. По умолчанию `true`.

::note
При попытке закрыть окно генерируется событие `close:prevent`.
::

::tip
Сочетание `modal: false` и `dismissible: false` делает фон интерактивным, не закрывая Modal.
::

::component-code
---
prettier: true
ignore:
  - title
props:
  dismissible: false
  modal: true
  title: 'Модальное окно без закрытия по щелчку вне окна'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-48"}
::

### Прокрутка {#scrollable}

Пропс `scrollable` делает содержимое Modal прокручиваемым внутри оверлея.

::warning
Для прокрутки нужен оверлей, поэтому `modal: false` не подходит, а `overlay: false` убирает только фон.
::

::component-code
---
prettier: true
ignore:
  - title
props:
  scrollable: true
  overlay: true
  title: 'Прокручиваемое модальное окно'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-screen"}
::

::caution
Есть [известная проблема](https://reka-ui.com/docs/components/dialog#scrollable-overlay): в некоторых операционных системах щелчок по полосе прокрутки может случайно закрыть диалог.
::

### Во весь экран {#fullscreen}

Пропс `fullscreen` разворачивает Modal на весь экран.

::component-code
---
prettier: true
ignore:
  - title
  - fullscreen
props:
  fullscreen: true
  title: 'Модальное окно во весь экран'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-full"}
::

### Выгрузка содержимого {#unmount}

Пропс `unmount-on-hide` управляет выгрузкой содержимого Modal при закрытии. По умолчанию `true`.

::component-code
---
prettier: true
ignore:
  - title
props:
  unmountOnHide: false
  title: 'Модальное окно'
slots:
  default: |

    <B24Button label="Открыть" />

  body: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть"}

#body
:placeholder{class="h-48"}
::

::note
В DOM видно, что содержимое Modal отрисовано, даже пока окно закрыто.
::

::tip
Если пропс `portal` равен `false`, содержимое отрисовывается и на сервере. Это полезно, чтобы отрисовать открытый Modal при SSR без мигания при загрузке страницы, или чтобы открыть содержимое для SEO.
::

## Примеры {#examples}

### Управление открытием {#control-open-state}

Состоянием открытия управляют пропс `default-open` или директива `v-model:open`.

::component-example
---
name: 'modal-open-example'
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) Modal переключается по нажатию :kbd{value="O"}.
::

::tip
Так можно вынести триггер за пределы Modal или убрать его совсем.
::

### Программное использование {#programmatic-usage}

Открыть Modal программно позволяет композабл [`useOverlay`](/docs/composables/use-overlay/).

::warning
Оберните приложение в компонент [`App`](/docs/components/app/), который использует компонент [`OverlayProvider`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/OverlayProvider.vue).
::

Сначала создайте компонент модального окна, которое будет открываться программно:

::component-example
---
prettier: true
name: 'modal-example'
preview: false
---
::

::note
Здесь при закрытии или отклонении окна генерируется событие `close`. Через него можно передать любые данные: они станут результатом `open()`. Событие нужно сгенерировать, иначе промис не завершится.
::

Затем используйте его в приложении:

::component-example
---
name: 'modal-programmatic-example'
---
::

::tip
Закрыть модальное окно изнутри компонента можно вызовом `emit('close')`.
::

### Вложенные окна {#nested-modals}

Модальные окна можно вкладывать друг в друга.

::component-example
---
name: 'modal-nested-example'
---
::

### Со слотом footer {#with-footer-slot}

Слот `#footer` добавляет содержимое после тела Modal.

::component-example
---
name: 'modal-footer-slot-example'
---
::

### Промо-композиция {#marketing-promo-composition}

Промо-окно или окно апгрейда собирается из существующих компонентов, новый компонент не нужен. Тело использует адаптивный flex в две колонки (заголовок и описание слева, карточка возможностей справа), а в футере основной призыв к действию сочетается с третичным действием «напомнить позже». Декоративный фон — градиентная утилита Tailwind, переданная через `b24ui.body`.

::component-example
---
collapse: true
name: 'modal-marketing-example'
---
::

::prompt
---
description: Собрать маркетинговое (промо) модальное окно для любого бизнеса или приложения.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Вы помогаете мне собрать маркетинговое (промо) модальное окно в приложении на `@bitrix24/b24ui-nuxt`. Загрузите навык `b24-ui-nuxt` и следуйте рецепту **Marketing / promo modal** из `skills/b24-ui-nuxt/references/recipes/overlays.md`.

Цель: сфокусированное модальное окно с одной задачей для любой маркетинговой активности (окончание пробного периода, допродажа тарифа, сезонное предложение, запуск функции, кампания по возврату пользователей), с одним основным призывом к действию и одним действием закрытия, которое подталкивает пользователя, не блокируя основной рабочий процесс.

Прежде чем писать код, задайте мне уточняющие вопросы о:
- самой активности: что продвигается (предложение, тариф, функция, событие), ценностное предложение в одном предложении и количественная выгода, которую стоит подчеркнуть;
- аудитории: какой сегмент пользователей, роль или этап жизненного цикла;
- триггере и частоте повторного показа: загрузка страницы, route guard, баннер с учётом закрытия, окно запланированной кампании;
- основном действии: куда ведёт призыв (сценарий в приложении, глубокая ссылка, внешняя страница) и какие права или feature flags нужны;
- действии закрытия: его текст, просто закрывает оно окно или откладывает на N дней, закрывают ли окно ESC и щелчок по оверлею;
- тексте и локали: тон, язык и нужны ли ключи i18n с самого начала;
- аналитике: какие события отправлять (`promo_shown`, `promo_dismissed`, `promo_clicked`) и какие роли пользователей учитывать;
- ограничениях: доступность, предпросмотр в тёмной теме, приоритет мобильного экрана.

Когда договоримся, собирайте окно только из существующих компонентов b24ui (новый компонент не вводите), нанесите брендовый градиент boost на `b24ui.content`, прижмите ряд с призывом к действию к низу тела окна, а боковую карточку оставьте коротким тизером главных преимуществ, а не матрицей возможностей.
::

### Виджет динамики продаж {#sales-dynamics-widget}

Практический пример: карточка статистики за Modal. Сам виджет описан на странице [Card](/docs/components/card/#sales-dynamics-widget); здесь он находится внутри `B24Modal`, и кнопка-триггер открывает его как сфокусированный оверлей. Это удобно, когда интерфейс страницы перегружен, а дашборду нужно окно быстрого просмотра без перехода по навигации.

::component-example
---
collapse: true
name: 'modal-sales-dynamics-example'
---
::

::prompt
---
description: Обернуть виджет динамики продаж в Modal, чтобы кнопка-триггер открывала его как сфокусированный оверлей.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
Возьмите рецепт виджета динамики продаж (см. `references/recipes/overlays.md` → «Stats widget (KPI summary)») и выведите его через `B24Modal`, чтобы кнопка или ссылка на странице открывала метрики как сфокусированный оверлей. Это полезно, когда дашборд вокруг слишком загружен, чтобы показывать полную карточку на месте.

Прежде чем писать код, выясните недостающее:
- Что служит триггером: `B24Button` (отдельный элемент), `B24Link is-action` посреди абзаца или программное открытие через `useOverlay`?
- Должно ли окно закрываться по ESC и щелчку по оверлею или только действиями самого виджета (тогда `:dismissible="false"`)?
- Должно ли окно блокировать страницу (по умолчанию `modal: true`) или плавать как немодальный оверлей (`modal: false`), чтобы пользователь мог прокручивать дашборд позади него?
- Должны ли кнопки `Configure` / `Feedback` самого виджета закрывать окно, уводить со страницы или оставлять его открытым, запуская побочные эффекты?
- Какова форма данных за строками (и необязательной выделенной строкой) и откуда они берутся: пропсы страницы, хранилище или асинхронный запрос, который срабатывает только при открытии окна?
- Локаль и аналитика: открытия окна и щелчки по призыву к действию отслеживайте отдельно, поскольку это поверхность «быстрого просмотра», а не основная страница метрик.

Когда ответы получены, собирайте окно только из штатных компонентов:
- Уберите оформление содержимого окна через `:b24ui="{ content: 'sm:max-w-md bg-transparent shadow-none border-0', body: 'p-0' }"`, чтобы виджет рисовал собственную поверхность (градиент, скругления и тень он несёт внутри).
- Отключите встроенное закрытие (`:close="false"`), чтобы крестик не конфликтовал с шапкой виджета: окно закрывается по ESC, щелчку по оверлею или одной из кнопок футера виджета.
- Триггер поместите в слот по умолчанию (`B24Button` или `B24Link is-action`, но не оба сразу в одном окне), а сам виджет — в `#body`.
- Отрисуйте виджет в точности как в рецепте: корень `edge-dark`, фиолетовый радиальный градиент (`--ui-color-copilot-bg-content-3 → -2 → -1`), выделенная строка `style-filled-boost` и три кнопки действий `air-secondary-accent`.

Весь текст оформляйте на запрошенном языке и отдавайте данные в той же форме (`title`, `totalLine`, `todayLine`, `rangeLabel`, `rows`, `highlight`), что и в самостоятельном рецепте.
::

### С командной палитрой {#with-command-palette}

Компонент [CommandPalette](/docs/components/command-palette/) можно использовать внутри содержимого Modal.

::component-example
---
collapse: true
name: 'modal-command-palette-example'
---
::

::note
В примере `useLazyFetch` вызывается с `immediate: false`, поэтому данные запрашиваются только при открытии Modal.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Доступность :badge{label="2.14+" class="align-text-top"} {#accessibility}

При открытии фокус на один такт снимается с триггера, после чего его перехватывает ловушка фокуса диалога. Так обходится [ошибка тайминга в reka-ui](https://github.com/unovue/reka-ui/issues/1280), из-за которой браузер отказывается применять `aria-hidden` и пишет в журнал *«Blocked aria-hidden on an element because its descendant retained focus»*.

Фокус возвращается туда, где он был до открытия, в том числе когда компонент открыт программно, а не через слот триггера. Скринридеры, которые сразу озвучивают смену фокуса (в первую очередь VoiceOver), могут на мгновение произнести заголовок страницы раньше заголовка диалога.

## Тема {#theme}

:component-theme
