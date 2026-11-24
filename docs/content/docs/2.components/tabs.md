---
title: Tabs
description: 'Набор вкладок, панели которых показываются по одной.'
category: navigation
keywords:
  - tabbed
  - panels
  - sections
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Tabs.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/tabs
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/tabs
  - label: Tabs
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/tabs
---

## Использование {#usage}

Tabs показывает список элементов в виде вкладок.

::component-example
---
collapse: true
prettier: true
name: 'tabs-example'
props:
  class: 'w-full'
---
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- [`icon?: IconComponent`{lang="ts-type"}](#usage)
- `avatar?: AvatarProps`{lang="ts-type"}
- `badge?: string | number | BadgeProps`{lang="ts-type"}
- `content?: string`{lang="ts-type"}
- `value?: string | number`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `b24ui?: { trigger?: ClassNameValue, leadingIcon?: ClassNameValue, leadingAvatar?: ClassNameValue, leadingAvatarSize?: ClassNameValue, label?: ClassNameValue, trailingBadge?: ClassNameValue, trailingBadgeSize?: ClassNameValue, content?: ClassNameValue }`{lang="ts-type"}

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - TabsItem[]
props:
  items:
    - label: Аккаунт
      content: 'Это содержимое аккаунта.'
    - label: Пароль
      content: 'Это содержимое пароля.'
  class: 'w-full'
---
::

### Содержимое {#content}

Значение `false` в пропсе `content` отрисовывает триггеры без панелей. По умолчанию `true`.

::component-code
---
collapse: true
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - TabsItem[]
props:
  content: false
  items:
    - label: Аккаунт
      content: 'Это содержимое аккаунта.'
    - label: Пароль
      content: 'Это содержимое пароля.'
  class: 'w-full'
---
::

### Выгрузка содержимого {#unmount}

Пропс `unmount-on-hide` не даёт выгружать содержимое, когда вкладка скрыта. По умолчанию `true`.

::component-code
---
collapse: true
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - TabsItem[]
props:
  unmountOnHide: false
  items:
    - label: Аккаунт
      content: 'Это содержимое аккаунта.'
    - label: Пароль
      content: 'Это содержимое пароля.'
  class: 'w-full'
---
::

::note
В DOM видно, что содержимое каждого элемента отрисовано.
::

### Размер {#size}

Пропс `size` меняет размер Tabs.

::component-code
---
collapse: true
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - TabsItem[]
props:
  size: xl
  content: false
  items:
    - label: Аккаунт
    - label: Пароль
  class: 'w-full'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию Tabs. По умолчанию `horizontal`.

::component-code
---
collapse: true
ignore:
  - content
  - items
  - class
external:
  - items
externalTypes:
  - TabsItem[]
props:
  orientation: vertical
  content: false
  items:
    - label: Аккаунт
    - label: Пароль
  class: 'w-full'
---
::

## Примеры {#examples}

### Управление активным элементом {#control-active-item}

Активным элементом управляют пропс `default-value` или директива `v-model` со значением `value` элемента. Если `value` не задан, берётся индекс **в виде строки**.

:component-example{name="tabs-model-value-example" collapse}

::tip
Пропс `value-key` меняет ключ, по которому элементы сопоставляются с `v-model` или `default-value`.
::

### С query-параметром маршрута {#with-route-query}

Активным элементом можно управлять через query-параметр URL, используя `route.query.tab` как `value` элемента.

:component-example{name="tabs-route-query-example"}

### Со слотом content {#with-content-slot}

Слот `#content` настраивает содержимое каждого элемента.

:component-example{name="tabs-content-slot-example" collapse}

### С нижней панелью вкладок {#with-bottom-tab-bar}

Пропс `b24ui` превращает Tabs в нижнюю панель вкладок в мобильном стиле: значки и маленькие подписи, как в YouTube или Instagram.

:component-example{name="tabs-bottom-tab-bar-example" collapse}

### С собственным слотом {#with-custom-slot}

Свойство `slot` настраивает отдельный элемент.

Вам будут доступны слоты:

- `#{{ item.slot }}`{lang="ts-type"}

::component-example
---
collapse: true
name: 'tabs-custom-slot-example'
---
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

При обращении к компоненту через ref в шаблоне доступно:

| Имя | Тип |
| ---- | ---- |
| `triggersRef`{lang="ts-type"} | `Ref<ComponentPublicInstance[]>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
