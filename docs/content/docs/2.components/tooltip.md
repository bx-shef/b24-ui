---
title: Tooltip
description: 'Небольшое окно с подробностями, которое появляется при наведении мыши на элемент.'
category: overlay
keywords:
  - hint
  - всплывающая подсказка
  - подсказка при наведении
  - тултип
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Tooltip.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/tooltip
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/tooltip
  - label: Tooltip
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/tooltip
---

## Использование {#usage}

Поместите в слот по умолчанию Tooltip [Button](/docs/components/button/) или любой другой компонент.

::component-code
---
prettier: true
ignore:
  - text
props:
  text: 'Открыть на GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

::warning
Оберните приложение в компонент [`App`](/docs/components/app/): он использует компонент [`TooltipProvider`](https://reka-ui.com/docs/components/tooltip#provider) из Reka UI.
::

::tip{to="/docs/components/app/#props"}
Пропс `tooltip` компонента `App` показывает, как настроить Tooltip глобально.
::

### Текст {#text}

Пропс `text` задаёт содержимое Tooltip.

::component-code
---
prettier: true
props:
  text: 'Открыть на GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

### Клавиши {#kbds}

Пропс `kbds` отрисовывает в Tooltip компоненты [Kbd](/docs/components/kbd/).

::component-code
---
prettier: true
ignore:
  - text
  - kbds
props:
  text: 'Открыть на GitHub'
  kbds:
    - meta
    - G
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

::tip
Можно использовать специальные клавиши, например `meta`: на macOS она отображается как `⌘`, на остальных платформах как `Ctrl`.
::

### Задержка {#delay}

Пропс `delay-duration` меняет задержку перед появлением Tooltip. Например, значение `0` показывает его сразу.

::component-code
---
prettier: true
ignore:
  - text
props:
  delayDuration: 0
  text: 'Открыть на GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

::tip
Глобально это настраивается опцией `tooltip.delayDuration` в компоненте [`App`](/docs/components/app/).
::

### Содержимое {#content}

Пропс `content` управляет отрисовкой содержимого Tooltip, например его `align` или `side`.

::tip
Глобально это настраивается опцией `tooltip.content` в компоненте [`App`](/docs/components/app/).
::

::component-code
---
prettier: true
ignore:
  - text
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
  text: 'Открыть на GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

### Стрелка {#arrow}

Пропс `arrow` показывает стрелку у Tooltip.

::component-code
---
prettier: true
ignore:
  - text
props:
  arrow: true
  text: 'Открыть на GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

### Отключение {#disabled}

Пропс `disabled` отключает Tooltip.

::component-code
---
prettier: true
ignore:
  - text
props:
  disabled: true
  text: 'Открыть на GitHub'
slots:
  default: |

    <B24Button label="Open" />
---

:b24-button{label="Open"}
::

## Примеры {#examples}

### Управление открытием {#control-open-state}

Состоянием открытия управляют пропс `default-open` или директива `v-model:open`.

::component-example
---
name: 'tooltip-open-example'
---
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) Tooltip переключается по нажатию :kbd{value="O"}.
::

### С привязкой к курсору {#with-following-cursor}

Чтобы Tooltip следовал за курсором при наведении на элемент, используйте пропс [`reference`](https://reka-ui.com/docs/components/tooltip#trigger):

::component-example
---
name: 'tooltip-cursor-example'
---
::

### Иконка справки {#help-icon}

Tooltip можно сочетать с [иконкой](https://bitrix24.github.io/b24icons/icons/).

::component-example
---
name: 'tooltip-help-icon-example'
---
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
