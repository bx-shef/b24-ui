---
title: FieldGroup
description: 'Объединяет несколько элементов, похожих на кнопки, в группу.'
category: element
keywords:
  - segmented control
  - toggle group
  - button group
  - input group
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/FieldGroup.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/field-group
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/field-group
---

## Использование {#usage}

Оберните несколько [Button](/docs/components/button/) в FieldGroup, чтобы сгруппировать их.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button color="air-primary-copilot" label="Кнопка" />
    <B24Button color="air-primary-copilot" label="Кнопка" />
---
:b24-button{color="air-primary-copilot" label="Кнопка"}
:b24-button{color="air-primary-copilot" label="Кнопка"}
::

### Без разделителя {#no-split}

Если элементы имеют разные цвета, свойство `no-split` отключает разделитель.

::component-code
---
prettier: true
ignore:
  - noSplit
props:
  noSplit: true
slots:
  default: |

    <B24Button color="air-primary-copilot" label="Кнопка" />
    <B24Button color="air-primary-success" label="Кнопка" />
    <B24Button color="air-primary-alert" label="Кнопка" />
---
:b24-button{color="air-primary-copilot" label="Кнопка"}
:b24-button{color="air-primary-success" label="Кнопка"}
:b24-button{color="air-primary-alert" label="Кнопка"}
::

### Размер {#size}

Пропс `size` меняет размер всех кнопок.

::component-code
---
prettier: true
props:
  size: xl
slots:
  default: |

    <B24Button color="air-primary-copilot" label="Кнопка" />
    <B24Button color="air-primary-copilot" label="Кнопка" />
---
:b24-button{color="air-primary-copilot" label="Кнопка"}
:b24-button{color="air-primary-copilot" label="Кнопка"}
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию кнопок. По умолчанию `horizontal`.

::component-code
---
prettier: true
props:
  orientation: vertical
slots:
  default: |

    <B24Button color="air-primary-copilot" label="Кнопка" />
    <B24Button color="air-primary-copilot" label="Кнопка" />
---
:b24-button{color="air-primary-copilot" label="Кнопка"}
:b24-button{color="air-primary-copilot" label="Кнопка"}
::

## Примеры {#examples}

### С полем ввода {#with-input}

В FieldGroup можно использовать компоненты вроде [Input](/docs/components/input/), [InputMenu](/docs/components/input-menu/), [Select](/docs/components/select/), [SelectMenu](/docs/components/select-menu/) и другие.

::component-code
---
prettier: true
slots:
  default: |

    <B24Input placeholder="Введите токен" />

    <B24Button label="Кнопка" />
---
:b24-input{placeholder="Введите токен"}
:b24-button{label="Кнопка"}
::

### С подсказкой {#with-tooltip}

В FieldGroup можно использовать [Tooltip](/docs/components/tooltip/).

:component-example{name="field-group-tooltip-example"}

### С выпадающим меню {#with-dropdown-menu}

В FieldGroup можно использовать [DropdownMenu](/docs/components/dropdown-menu/).

:component-example{name="field-group-dropdown-example"}

### С бейджем {#with-badge}

В FieldGroup можно использовать [Badge](/docs/components/badge/).

:component-example{name="field-group-badge-example"}

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
