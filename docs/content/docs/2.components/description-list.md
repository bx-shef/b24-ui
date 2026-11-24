---
title: DescriptionList
description: 'Список описаний: таблица из пар «название — значение» для полноты страницы.'
category: data
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DescriptionList.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/description-list
---

## Использование {#usage}

Пропс `items` — массив объектов, который задаёт содержимое DescriptionList:

- `label?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- [`icon?: IconComponent`{lang="ts-type"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts-type"}](#with-avatar-in-items)
- [`actions?: ButtonProps[]`{lang="ts-type"}](#with-actions-in-items)
- [`orientation?: "horizontal" | "vertical"`{lang="ts-type"}](#with-actions-in-items)
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `b24ui?: { labelWrapper?: ClassNameValue, icon?: ClassNameValue, avatar?: ClassNameValue, label?: ClassNameValue, descriptionWrapper?: ClassNameValue, description?: ClassNameValue, actions?: ClassNameValue }`{lang="ts-type"}

::component-code
---
prettier: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  items:
    - label: 'Полное имя'
      description: 'Michael Foster'
    - label: 'Событие'
      description: 'Оплата проходит через Atol Online'
---
::

### Легенда {#legend}

Пропс `legend` задаёт легенду DescriptionList.

::component-code
---
prettier: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  legend: 'Данные заявителя'
  items:
    - label: 'Полное имя'
      description: 'Michael Foster'
    - label: 'Событие'
      description: 'Оплата проходит через Atol Online'
---
::

### Текст {#text}

Пропс `text` задаёт описание DescriptionList.

::component-code
---
prettier: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  legend: 'Данные заявителя'
  text: 'Личные данные и заявка.'
  items:
    - label: 'Полное имя'
      description: 'Michael Foster'
    - label: 'Событие'
      description: 'Оплата проходит через Atol Online'
---
::

### Ключ подписи {#label-key}

Свойство объекта, из которого берётся подпись, меняет пропс `label-key`. По умолчанию `label`.

::component-code
---
prettier: true
ignore:
  - legend
  - text
  - labelKey
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  legend: 'Данные заявителя'
  text: 'Личные данные и заявка.'
  labelKey: 'title'
  items:
    - title: 'Полное имя'
      description: 'Michael Foster'
    - title: 'Событие'
      description: 'Оплата проходит через Atol Online'
---
::

### Ключ описания {#description-key}

Свойство объекта, из которого берётся описание, меняет пропс `description-key`. По умолчанию `description`.

::component-code
---
prettier: true
ignore:
  - legend
  - text
  - labelKey
  - descriptionKey
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  legend: 'Данные заявителя'
  text: 'Личные данные и заявка.'
  labelKey: 'title'
  descriptionKey: 'info'
  items:
    - title: 'Полное имя'
      info: 'Michael Foster'
    - title: 'Событие'
      info: 'Оплата проходит через Atol Online'
---
::

### Размер {#size}

Пропс `size` меняет размер DescriptionList.

::component-code
---
prettier: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  size: sm
  legend: 'Данные заявителя'
  text: 'Личные данные и заявка.'
  items:
    - label: 'Полное имя'
      description: 'Michael Foster'
    - label: 'Событие'
      description: 'Оплата проходит через Atol Online'
---
::

## Примеры {#examples}

### С иконками в элементах {#with-icon-in-items}

Свойство `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/) внутри элементов.

::component-example
---
collapse: true
name: 'description-list-icon-example'
---
::

### С аватарами в элементах {#with-avatar-in-items}

Свойство `avatar` показывает [аватар](/docs/components/avatar/) внутри элементов.

::component-example
---
collapse: true
name: 'description-list-avatar-example'
---
::

### С действиями в элементах {#with-actions-in-items}

Свойство `actions` добавляет к элементам DescriptionList кнопки [Button](/docs/components/button/).

Свойство `orientation` меняет ориентацию действий элементов.

::component-example
---
collapse: true
name: 'description-list-actions-example'
---
::

### Свой слот {#with-custom-slot}

Свойство `slot` настраивает отдельный элемент.

Вам будут доступны слоты:

- `#{{ item.slot }}`{lang="ts-type"}

::component-example
---
collapse: true
name: 'description-list-custom-slot-example'
---
::

### Ссылка в описании {#link-in-the-description}

Слот `description` получает элемент, поэтому описание можно отрисовать как
[Link](/docs/components/link/) без дополнительного свойства у элемента. Слот
общий, а не отдельный для каждого элемента, поэтому ветка по умолчанию
оставляет остальные элементы обычным текстом.

::component-example
---
collapse: true
name: 'description-list-link-slot-example'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
