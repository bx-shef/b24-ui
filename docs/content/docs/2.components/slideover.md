---
title: Slideover
description: 'Диалог, который выезжает с любой стороны экрана.'
category: overlay
keywords:
  - sheet
  - side panel
  - off-canvas
  - боковая панель
  - выезжающая панель
  - панель сбоку
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Slideover.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/slideover
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/slideover
  - label: Dialog
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/dialog
---

## Использование {#usage}

Поместите в слот по умолчанию Slideover [Button](/docs/components/button/) или любой другой компонент.

Затем слот `#content` задаёт содержимое, которое показывается при открытом Slideover.

::component-code
---
prettier: true
collapse: true
ignore:
  - b24ui.content
props:
  b24ui.content: 'sm:top-[300px] sm:max-h-[calc(100%-300px)]'
slots:
  default: |

    <B24Button label="Open" />

  content: |

    <Placeholder class="h-full m-4" />
---

:b24-button{label="Open"}

#content
:placeholder{class="h-full m-4"}
::

Слоты `#header`{lang="ts-type"}, `#body`{lang="ts-type"} и `#footer`{lang="ts-type"} позволяют настроить содержимое Slideover.

### Заголовок {#title}

Пропс `title` задаёт заголовок в шапке Slideover.

::component-code
---
prettier: true
collapse: true
props:
  title: 'Боковая панель с заголовком'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

### Описание {#description}

Пропс `description` задаёт описание в шапке Slideover.

::component-code
---
prettier: true
collapse: true
ignore:
  - title
props:
  title: 'Боковая панель с описанием'
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

### Закрытие {#close}

Пропс `close` настраивает кнопку закрытия в шапке Slideover или скрывает её (значение `false`).

Можно передать любое свойство компонента [Button](/docs/components/button/).

::component-code
---
prettier: true
collapse: true
ignore:
  - title
  - close.color
props:
  title: 'Боковая панель с кнопкой закрытия'
  close:
    color: air-secondary-accent-2
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

::note
Кнопка закрытия не показывается, если используется слот `#content`: она входит в шапку.
::

### Иконка закрытия {#close-icon}

Пропс `close-icon` меняет [иконку](https://bitrix24.github.io/b24icons/icons/) кнопки закрытия.

::component-code
---
prettier: true
collapse: true
ignore:
  - title
  - closeIcon
cast:
  closeIcon: 'RocketIcon'
props:
  title: 'Боковая панель с кнопкой закрытия'
  closeIcon: 'RocketIcon'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

### Сторона {#side}

Пропс `side` задаёт сторону экрана, с которой выезжает Slideover. По умолчанию `bottom`.

::component-code
---
prettier: true
collapse: true
ignore:
  - title
props:
  side: 'bottom'
  title: 'Боковая панель со стороной выезда'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full min-h-48" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full min-h-48"}
::

### Отступ от краёв {#inset}

Пропс `inset` отодвигает Slideover от краёв экрана.

::component-code
---
prettier: true
ignore:
  - title
props:
  side: 'right'
  inset: true
  title: 'Боковая панель с отступом от краёв'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="min-w-96 min-h-96 size-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="min-w-96 min-h-96 size-full"}
::


### Анимация {#transition}

Пропс `transition` определяет, анимируется ли Slideover. По умолчанию `true`.

::component-code
---
prettier: true
collapse: true
ignore:
  - title
props:
  transition: false
  title: 'Боковая панель без анимации'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

### Оверлей {#overlay}

Пропс `overlay` определяет, есть ли у Slideover оверлей. По умолчанию `true`.

::component-code
---
prettier: true
collapse: true
ignore:
  - title
props:
  overlay: false
  title: 'Боковая панель без оверлея'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

### Размытие оверлея {#overlay-blur}

Чтобы отключить размытие фона, используйте пропс `overlayBlur`.

У пропса `overlayBlur` три значения:

- `auto`: когда пользователь **не запрашивал** [уменьшение анимации](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)
- `on`: размытие всегда включено
- `off`: (по умолчанию) размытия нет

::component-code
---
prettier: true
collapse: true
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

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

### Модальный режим {#modal}

Пропс `modal` определяет, блокирует ли Slideover взаимодействие с содержимым вне панели. По умолчанию `true`.

::note
При `modal` равном `false` оверлей отключается автоматически, а содержимое вне панели остаётся интерактивным.
::

::component-code
---
prettier: true
ignore:
  - title
props:
  modal: false
  title: 'Интерактивная боковая панель'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

### Закрытие по действию вне окна {#dismissible}

Пропс `dismissible` определяет, закрывается ли Slideover щелчком вне панели или нажатием Escape. По умолчанию `true`.

::note
При попытке закрыть панель генерируется событие `close:prevent`.
::

::tip
Сочетание `modal: false` и `dismissible: false` делает фон интерактивным, не закрывая Slideover.
::

::component-code
---
collapse: true
prettier: true
ignore:
  - title
  - dismissible
props:
  dismissible: false
  modal: true
  title: 'Боковая панель без закрытия по щелчку вне панели'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

### Выгрузка содержимого {#unmount}

Пропс `unmount-on-hide` управляет выгрузкой содержимого Slideover при закрытии. По умолчанию `true`.

::component-code
---
prettier: true
ignore:
  - title
props:
  unmountOnHide: false
  title: 'Боковая панель'
slots:
  default: |

    <B24Button label="Open" />

  body: |

    <Placeholder class="h-full" />
---

:b24-button{label="Open"}

#body
:placeholder{class="h-full"}
::

::note
В DOM видно, что содержимое Slideover отрисовано, даже пока панель закрыта.
::

::tip
Если пропс `portal` равен `false`, содержимое отрисовывается и на сервере. Это полезно, чтобы отрисовать открытый Slideover при SSR без мигания при загрузке страницы, или чтобы открыть содержимое для SEO.
::

## Примеры {#examples}

### Управление открытием {#control-open-state}

Состоянием открытия управляют пропс `default-open` или директива `v-model:open`.

::component-example
---
name: 'slideover-open-example'
collapse: true
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) Slideover переключается по нажатию :kbd{value="O"}.
::

::tip
Так можно вынести триггер за пределы Slideover или убрать его совсем.
::

### Программное использование {#programmatic-usage}

Открыть Slideover программно позволяет композабл [`useOverlay`](/docs/composables/use-overlay/).

::warning
Оберните приложение в компонент [`App`](/docs/components/app/), который использует компонент [`OverlayProvider`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/OverlayProvider.vue).
::

Сначала создайте компонент боковой панели, которая будет открываться программно:

::component-example
---
prettier: true
name: 'slideover-example'
preview: false
---
::

::note
Здесь при закрытии или отклонении панели генерируется событие `close`. Через него можно передать любые данные: они станут результатом `open()`. Событие нужно сгенерировать, иначе промис не завершится.
::

Затем используйте его в приложении:

::component-example
---
name: 'slideover-programmatic-example'
collapse: true
---
::

::tip
Закрыть боковую панель изнутри компонента можно вызовом `emit('close')`.
::

### Вложенные боковые панели {#nested-slideovers}

Боковые панели можно вкладывать друг в друга.

::component-example
---
name: 'slideover-nested-example'
collapse: true
---
::

### Со слотом footer {#with-footer-slot}

Слот `#footer` добавляет содержимое после тела Slideover.

::component-example
---
name: 'slideover-footer-slot-example'
collapse: true
---
::

### Простой список элементов {#simple-list-of-elements}

::component-example
---
name: 'slideover-simple-list-elements-example'
collapse: true
---
::

::tip
Много примеров есть в [песочнице](https://bitrix24.github.io/b24ui/demo/components/slideover) и в [демо-версии](https://github.com/bitrix24/b24ui/blob/main/playgrounds/demo/app/pages/components/slideover.vue).
::

## API {#api}

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
