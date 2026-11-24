---
title: Drawer
description: 'Выдвижная шторка с плавными анимациями появления и скрытия.'
category: overlay
keywords:
  - bottom sheet
  - action sheet
  - mobile sheet
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Drawer.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/drawer
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/drawer
  - label: Drawer
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://github.com/unovue/vaul-vue
---

## Использование {#usage}

Поместите в слот по умолчанию Drawer компонент [Button](/docs/components/button/) или любой другой.

Затем слот `#content` добавляет содержимое, которое показывается при открытом Drawer.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button label="Открыть" />

  content: |

    <Placeholder class="h-48 m-4" />
---

:b24-button{label="Открыть"}

#content
:placeholder{class="h-48 m-4"}
::

Слоты `#header`{lang="ts-type"}, `#body`{lang="ts-type"} и `#footer`{lang="ts-type"} настраивают содержимое Drawer.

### Заголовок {#title}

Пропс `title` задаёт заголовок в шапке Drawer.

::component-code
---
prettier: true
props:
  title: 'Drawer с заголовком'
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

Пропс `description` задаёт описание в шапке Drawer.

::component-code
---
prettier: true
ignore:
  - title
props:
  title: 'Drawer с описанием'
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

### Направление {#direction}

Пропс `direction` задаёт направление Drawer. По умолчанию `bottom`.

::component-code
---
prettier: true
props:
  direction: 'right'
slots:
  default: |

    <B24Button label="Открыть" />

  content: |

    <Placeholder class="min-w-96 min-h-96 size-full m-4" />
---

:B24-button{label="Открыть"}

#content
:placeholder{class="min-w-96 min-h-96 size-full m-4"}
::

### Отступ от краёв {#inset}

Пропс `inset` отодвигает Drawer от краёв.

::component-code
---
prettier: true
props:
  direction: 'right'
  inset: true
slots:
  default: |

    <B24Button label="Открыть" />

  content: |

    <Placeholder class="min-w-96 min-h-96 size-full m-4" />
---

:b24-button{label="Открыть"}

#content
:placeholder{class="min-w-96 min-h-96 size-full m-4"}
::

### Ручка {#handle}

Пропс `handle` определяет, есть ли у Drawer ручка. По умолчанию `true`.

::component-code
---
prettier: true
props:
  handle: false
slots:
  default: |

    <B24Button label="Открыть" />

  content: |

    <Placeholder class="h-48 m-4" />
---

:b24-button{label="Открыть"}

#content
:placeholder{class="h-48 m-4"}
::

### Только ручка {#handle-only}

Пропс `handle-only` разрешает перетаскивать Drawer только за ручку.

::component-code
---
prettier: true
props:
  handleOnly: true
slots:
  default: |

    <B24Button label="Открыть" />

  content: |

    <Placeholder class="h-48 m-4" />
---

:b24-button{label="Открыть"}

#content
:placeholder{class="h-48 m-4"}
::

### Оверлей {#overlay}

Пропс `overlay` определяет, есть ли у Drawer оверлей. По умолчанию `true`.

::component-code
---
prettier: true
props:
  overlay: false
slots:
  default: |

    <B24Button label="Открыть" />

  content: |

    <Placeholder class="h-48 m-4" />
---

:b24-button{label="Открыть"}

#content
:placeholder{class="h-48 m-4"}
::

### Модальный режим {#modal}

Пропс `modal` определяет, блокирует ли Drawer взаимодействие с контентом вне него. По умолчанию `true`.

::note
Если `modal` равен `false`, оверлей отключается автоматически, и контент вне Drawer остаётся доступным.
::

::component-code
---
prettier: true
props:
  modal: false
slots:
  default: |

    <B24Button label="Открыть" />

  content: |

    <Placeholder class="h-48 m-4" />
---

:b24-button{label="Открыть"}

#content
:placeholder{class="h-48 m-4"}
::

### Закрытие вне Drawer {#dismissible}

Пропс `dismissible` определяет, закрывается ли Drawer по щелчку вне его или по клавише Esc. По умолчанию `true`.

::note
Когда пользователь пытается закрыть Drawer, срабатывает событие `close:prevent`.
::

::tip
Чтобы фон при открытом Drawer оставался доступным и Drawer не закрывался, объедините `modal: false` и `dismissible: false`.
::

::component-example
---
prettier: true
name: 'drawer-dismissible-example'
---
::

### Масштабирование фона {#scale-background}

Пропс `should-scale-background` масштабирует фон при открытом Drawer и создаёт эффект глубины. Пропс `set-background-color-on-scale` со значением `false` запрещает менять цвет фона.

::component-code
---
prettier: true
props:
  shouldScaleBackground: true
  setBackgroundColorOnScale: true
slots:
  default: |

    <B24Button label="Открыть" />

  content: |

    <Placeholder class="h-48 m-4" />
---

:b24-button{label="Открыть"}

#content
:placeholder{class="h-screen m-4"}
::

::warning
Чтобы это работало, добавьте директиву `data-vaul-drawer-wrapper` родительскому элементу приложения.

```vue [app.vue]
<template>
  <B24App>
    <div class="bg-default" data-vaul-drawer-wrapper>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </B24App>
</template>
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  app: {
    rootAttrs: {
      'data-vaul-drawer-wrapper': '',
      'class': 'bg-default'
    }
  }
})
```

::

### Без стилей для body :badge{label="2.15+" class="align-text-top"} {#no-body-styles}

Пропс `no-body-styles` запрещает Drawer применять стили к элементу `<body>`: например, `pointer-events: none`, который блокирует взаимодействие со страницей, пока Drawer открыт.

::note
При включённом `overlay` прокрутка body всё равно блокируется. Чтобы страница оставалась интерактивной, объедините `no-body-styles` и `overlay: false`.
::

::component-code
---
prettier: true
props:
  noBodyStyles: true
  overlay: false
slots:
  default: |

    <B24Button label="Открыть" />

  content: |

    <Placeholder class="h-48 m-4" />
---

:b24-button{label="Открыть"}

#content
:placeholder{class="h-48 m-4"}
::

## Примеры {#examples}

### Управление состоянием открытия {#control-open-state}

Состоянием открытия управляют пропс `default-open` или директива `v-model:open`.

::component-example
---
prettier: true
name: 'drawer-open-example'
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) Drawer открывается и закрывается клавишей :kbd{value="O"}.
::

::tip
Так триггер можно вынести за пределы Drawer или убрать совсем.
::

### Адаптивный Drawer {#responsive-drawer}

Например, на десктопе можно показывать компонент [Modal](/docs/components/modal/), а на мобильных устройствах — Drawer.

::component-example
---
prettier: true
name: 'drawer-responsive-example'
---
::

### Вложенные Drawer {#nested-drawers}

Drawer можно вкладывать друг в друга пропсом `nested`.

::component-example
---
prettier: true
name: 'drawer-nested-example'
---
::

### Слот footer {#with-footer-slot}

Слот `#footer` добавляет контент после тела Drawer.

::component-example
---
prettier: true
collapse: true
name: 'drawer-footer-slot-example'
---
::

### С командной палитрой {#with-command-palette}

Внутри содержимого Drawer можно использовать [CommandPalette](/docs/components/command-palette/).

::component-example
---
collapse: true
name: 'drawer-command-palette-example'
---
::

::note
В этом примере `useLazyFetch` с `immediate: false` загружает данные только при открытии Drawer.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Доступность :badge{label="2.14+" class="align-text-top"} {#accessibility}

При открытии фокус на один такт уходит с триггера, и только потом его перехватывает ловушка фокуса диалога. Так обходится [ошибка тайминга в reka-ui](https://github.com/unovue/reka-ui/issues/1280), из-за которой браузер отказывается применять `aria-hidden` и пишет в консоль *«Blocked aria-hidden on an element because its descendant retained focus»*.

Фокус возвращается туда, где он был до открытия, в том числе когда компонент открывают программно, а не через слот триггера. Скринридеры, которые сразу озвучивают смену фокуса (прежде всего VoiceOver), могут ненадолго озвучить заголовок страницы раньше заголовка диалога.

## Тема {#theme}

:component-theme
