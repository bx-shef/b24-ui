---
title: Breadcrumb
description: 'Навигация «хлебными крошками».'
category: navigation
keywords:
  - breadcrumbs
  - хлебные крошки
  - путь страницы
  - навигационная цепочка
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Breadcrumb.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/breadcrumb
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/breadcrumb
---

## Использование {#usage}

Компонент Breadcrumb показывает положение текущей страницы в иерархии сайта.

::component-code
---
collapse: true
ignore:
  - items
external:
  - items
externalTypes:
  - BreadcrumbItem[]
props:
  items:
    - label: 'Документация'
      to: '/docs'
    - label: 'Компоненты'
      to: '/docs/components'
    - label: 'Хлебные крошки'
      to: '/docs/components/breadcrumb'
---
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- [`icon?: IconComponent`{lang="ts-type"}](#with-custom-slot)
- `avatar?: AvatarProps`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLeadingAvatar?: ClassNameValue, linkLabel?: ClassNameValue, separator?: ClassNameValue, separatorIcon?: ClassNameValue }`{lang="ts-type"}

Можно передать любое свойство компонента [Link](/docs/components/link/#props): `to`, `target` и другие.

::component-code
---
ignore:
  - items
external:
  - items
externalTypes:
  - BreadcrumbItem[]
props:
  items:
    - label: 'Документация'
      to: '/docs'
    - label: 'Компоненты'
      to: '/docs/components'
    - label: 'Хлебные крошки'
      to: '/docs/components/breadcrumb'
---
::

::note
Если свойство `to` не задано, вместо ссылки отрисовывается `span`.
::

### Иконка-разделитель {#separator-icon}

Пропс `separator-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) между элементами.

::component-code
---
ignore:
  - items
  - separatorIcon
external:
  - items
externalTypes:
  - BreadcrumbItem[]
cast:
  separatorIcon: 'RocketIcon'
props:
  separatorIcon: 'RocketIcon'
  items:
    - label: 'Документация'
      to: '/docs'
    - label: 'Компоненты'
      to: '/docs/components'
    - label: 'Хлебные крошки'
      to: '/docs/components/breadcrumb'
---
::

### Цвет {#color}

Пропс `color` меняет цвет активного элемента Breadcrumb.

::component-code
---
ignore:
  - items
external:
  - items
externalTypes:
  - BreadcrumbItem[]
props:
  color: 'air-primary-alert'
  items:
    - label: 'Документация'
      to: '/docs'
    - label: 'Компоненты'
      to: '/docs/components'
    - label: 'Хлебные крошки'
      to: '/docs/components/breadcrumb'
---
::

## Примеры {#examples}

### Со слотом separator {#with-separator-slot}

Слот `#separator` настраивает разделитель между элементами.

:component-example{name="breadcrumb-separator-slot-example"}

### С пользовательским слотом {#with-custom-slot}

Свойство `slot` настраивает конкретный элемент.

Доступны слоты:

- `#{{ item.slot }}`{lang="ts-type"}
- `#{{ item.slot }}-leading`{lang="ts-type"}
- `#{{ item.slot }}-label`{lang="ts-type"}
- `#{{ item.slot }}-trailing`{lang="ts-type"}

:component-example{name="breadcrumb-custom-slot-example"}

::tip{to="#slots"}
Слоты `#item`, `#item-leading`, `#item-label` и `#item-trailing` настраивают сразу все элементы.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
