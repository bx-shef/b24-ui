---
title: Collapsible
description: 'Сворачиваемый компонент: показывает или скрывает своё содержимое.'
category: element
keywords:
  - disclosure
  - expand
  - сворачиваемый блок
  - спойлер
  - показать и скрыть
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Collapsible.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/collapsible
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/collapsible
  - label: Collapsible
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/collapsible
---

## Использование {#usage}

В слоте по умолчанию Collapsible разместите [Button](/docs/components/button/) или любой другой компонент.

Содержимое, которое видно в раскрытом состоянии, добавьте в слот `#content`.

::component-code
---
prettier: true
ignore:
  - class
props:
  class: 'flex flex-col gap-2 w-48'
slots:
  default: |

    <B24Button label="Открыть" block use-dropdown />

  content: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть" block use-dropdown}

#content
:placeholder{class="h-48"}
::

### Размонтирование {#unmount}

Пропс `unmount-on-hide` управляет тем, размонтируется ли содержимое при сворачивании Collapsible. По умолчанию — `true`.

::component-code
---
prettier: true
ignore:
  - class
props:
  unmountOnHide: false
  class: 'flex flex-col gap-2 w-48'
slots:
  default: |

    <B24Button label="Открыть" block use-dropdown />

  content: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть" block use-dropdown}

#content
:placeholder{class="h-48"}
::

::note
Содержимое видно в DOM, если открыть инструменты разработчика.
::

### Отключение {#disabled}

Пропс `disabled` отключает Collapsible.

::component-code
---
prettier: true
ignore:
  - class
props:
  class: 'flex flex-col gap-2 w-48'
  disabled: true
slots:
  default: |

    <B24Button label="Открыть" block use-dropdown />

  content: |

    <Placeholder class="h-48" />
---

:b24-button{label="Открыть" block use-dropdown}

#content
:placeholder{class="h-48"}
::

## Примеры {#examples}

### Управление состоянием {#control-open-state}

Раскрытием управляют пропс `default-open` или директива `v-model:open`.

::component-example
---
name: 'collapsible-open-example'
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) Collapsible переключается по нажатию :kbd{value="O"}.
::

::tip
Так триггер можно вынести за пределы Collapsible или убрать совсем.
::

### С вращающейся иконкой {#with-rotating-icon}

Пример с вращающейся иконкой в Button, которая показывает, раскрыт ли Collapsible.

::component-example
---
name: 'collapsible-icon-example'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
