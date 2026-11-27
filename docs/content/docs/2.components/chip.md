---
title: Chip
description: 'Индикатор: число или состояние.'
category: element
keywords:
  - notification dot
  - status dot
  - чип
  - индикатор-точка
  - счётчик на значке
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Chip.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chip
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chip
---

## Использование {#usage}

Оберните любой компонент в Chip, чтобы показать индикатор.

::component-code
---
prettier: true
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Кнопка" />
---
:b24-button{color="air-secondary-no-accent" label="Кнопка"}
::

### Цвет {#color}

Пропс `color` меняет цвет Chip.

::component-code
---
prettier: true
props:
  color: air-primary-warning
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Кнопка" />
---
:b24-button{color="air-secondary-no-accent" label="Кнопка"}
::

### Инверсия {#inverted}

Пропс `inverted` инвертирует цвет Chip.

::warning
Доступно только для цветов `air-primary*`.
::

::component-code
---
prettier: true
props:
  inverted: true
  color: 'air-primary'
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Кнопка" />
---
:b24-button{color="air-secondary-no-accent" label="Кнопка"}
::

### Размер {#size}

Пропс `size` меняет размер Chip.

::component-code
---
prettier: true
props:
  size: lg
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Кнопка" />
---
:b24-button{color="air-secondary-no-accent" label="Кнопка"}
::

### Текст {#text}

Пропс `text` задаёт текст Chip.

::component-code
---
prettier: true
props:
  text: '+5'
  size: lg
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Кнопка" />
---
:b24-button{color="air-secondary-no-accent" label="Кнопка"}
::

### Скрыть ноль {#hide-zero}

Пропс `hideZero` скрывает текст, если он равен `0`.

::component-code
---
prettier: true
props:
  hideZero: true
  text: 1
  size: lg
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Кнопка" />
---
:b24-button{color="air-secondary-no-accent" label="Кнопка"}
::

### Иконка справа {#trailing-icon}

Пропс `trailing-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) справа.

::component-code
---
prettier: true
ignore:
  - trailingIcon
cast:
  trailingIcon: 'RocketIcon'
props:
  trailingIcon: 'RocketIcon'
  text: '+1'
  size: lg
  hideZero: true
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Кнопка" />
---
:b24-button{color="air-secondary-no-accent" label="Кнопка"}
::

### Положение {#position}

Пропс `position` меняет положение Chip.

::component-code
---
prettier: true
props:
  position: 'bottom-left'
slots:
  default: |

    <B24Button color="air-secondary-no-accent" label="Кнопка" />
---
:b24-button{color="air-secondary-no-accent" label="Кнопка"}
::

### Внутри компонента {#inset}

Пропс `inset` показывает Chip внутри компонента. Это удобно для скруглённых компонентов.

::component-code
---
prettier: true
props:
  inset: true
slots:
  default: |

    <B24Avatar src="/b24ui/avatar/employee.png" loading="lazy" />
---
:b24-avatar{src="/b24ui/avatar/employee.png" loading="lazy"}
::

### Отдельный индикатор {#standalone}

Пропс `standalone` вместе с пропсом `inset` показывает Chip в строке.

::component-code
---
props:
  standalone: true
  inset: true
---
::

::note
Так он используется, например, в компонентах [`CommandPalette`](/docs/components/command-palette/), [`InputMenu`](/docs/components/input-menu/), [`Select`](/docs/components/select/) и [`SelectMenu`](/docs/components/select-menu/).
::

## Примеры {#examples}

### Управление видимостью {#control-visibility}

Видимостью Chip управляет пропс `show`.

:component-example{name="chip-show-example"}

::note
В этом примере у каждого статуса свой цвет Chip, а показывается он, когда статус не `offline`.
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
