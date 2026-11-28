---
title: AvatarGroup
description: 'Складывает несколько аватаров в одну группу.'
category: element
keywords:
  - stacked avatars
  - faces
  - members
  - группа аватаров
  - участники
  - стопка аватаров
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/AvatarGroup.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/avatar
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/avatar-group
---

## Использование {#usage}

Несколько [аватаров](/docs/components/avatar/), помещённых в AvatarGroup, складываются в стопку.

::component-code
---
prettier: true
slots:
  default: |
  
    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" />
    <B24Avatar src="https://github.com/bitrix24.png" alt="Bitrix24" />
    <B24Avatar src="/b24ui/avatar/assistant.png" alt="Assistant Name" />
---
:b24-avatar{src="/b24ui/avatar/employee.png" alt="Employee Name"}
:b24-avatar{src="https://github.com/bitrix24.png" alt="Bitrix24"}
:b24-avatar{src="/b24ui/avatar/assistant.png" alt="Assistant Name"}
::

### Размер {#size}

Пропс `size` меняет размер всех аватаров.

::component-code
---
prettier: true
props:
  size: xl
slots:
  default: |

    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" loading="lazy" />
    <B24Avatar src="https://github.com/bitrix24.png" alt="Bitrix24" loading="lazy" />
    <B24Avatar src="/b24ui/avatar/assistant.png" alt="Assistant Name" loading="lazy" />
---
:b24-avatar{src="/b24ui/avatar/employee.png" alt="Employee Name" loading="lazy"}
:b24-avatar{src="https://github.com/bitrix24.png" alt="Bitrix24" loading="lazy"}
:b24-avatar{src="/b24ui/avatar/assistant.png" alt="Assistant Name" loading="lazy"}
::

### Максимум {#max}

Пропс `max` ограничивает число видимых аватаров, остальные сворачиваются в аватар `+X`.

::component-code
---
prettier: true
props:
  max: 2
slots:
  default: |

    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" loading="lazy" />
    <B24Avatar src="https://github.com/bitrix24.png" alt="Bitrix24" loading="lazy" />
    <B24Avatar src="/b24ui/avatar/assistant.png" alt="Assistant Name" loading="lazy" />
---
:b24-avatar{src="/b24ui/avatar/employee.png" alt="Employee Name" loading="lazy"}
:b24-avatar{src="https://github.com/bitrix24.png" alt="Bitrix24" loading="lazy"}
:b24-avatar{src="/b24ui/avatar/assistant.png" alt="Assistant Name" loading="lazy"}
::

### Цвет {#color}

Пропс `color` меняет цвет всех аватаров.

::component-code
---
prettier: true
props:
  color: air-boost
slots:
  default: |

    <B24Avatar src="/b24ui/avatar/employee.png" alt="Employee Name" loading="lazy" />
    <B24Avatar src="https://github.com/bitrix24.png" alt="Bitrix24" loading="lazy" />
    <B24Avatar src="/b24ui/avatar/assistant.png" alt="Assistant Name" loading="lazy" />
---
:b24-avatar{src="/b24ui/avatar/employee.png" alt="Employee Name" loading="lazy"}
:b24-avatar{src="https://github.com/bitrix24.png" alt="Bitrix24" loading="lazy"}
:b24-avatar{src="/b24ui/avatar/assistant.png" alt="Assistant Name" loading="lazy"}
::

## Примеры {#examples}

### С подсказкой {#with-tooltip}

Оберните каждый аватар в [Tooltip](/docs/components/tooltip/), чтобы показывать подсказку при наведении.

:component-example{name="avatar-group-tooltip-example"}

### С чипом {#with-chip}

Оберните каждый аватар в [Chip](/docs/components/chip/), чтобы показать чип рядом с аватаром.

:component-example{name="avatar-group-chip-example"}

### Со ссылкой {#with-link}

Оберните каждый аватар в [Link](/docs/components/link/), чтобы по нему можно было кликнуть.

:component-example{name="avatar-group-link-example"}

### С маской {#with-mask}

CSS-маска придаёт аватару нестандартную форму.

:component-example{name="avatar-group-mask-example"}

::warning
С маской пропс `chip` работает некорректно: в зависимости от формы маски чип может обрезаться.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
