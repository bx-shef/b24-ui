---
title: Advice
description: 'Пара строк текста и аватар'
category: element
keywords:
  - совет
  - подсказка с аватаром
  - реплика
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Advice.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/advice
---

## Использование {#usage}

### Описание {#description}

Пропс `description` задаёт описание Advice.

::component-code
---
prettier: true
props:
  description: Сообщим руководителю, что сделка не движется: менеджер не перезванивает клиенту и не отвечает на его сообщения. Поставим менеджеру задачу от имени руководителя
---
::

### Иконка {#icon}

Пропс `icon` показывает [иконку](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  description: Сообщим руководителю, что сделка не движется: менеджер не перезванивает клиенту и не отвечает на его сообщения. Поставим менеджеру задачу от имени руководителя
---
::

### Аватар {#avatar}

Пропс `avatar` показывает [аватар](/docs/components/avatar/).

::component-code
---
prettier: true
ignore:
  - description
  - avatar.src
  - avatar.loading
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
    loading: lazy
  description: Сообщим руководителю, что сделка не движется: менеджер не перезванивает клиенту и не отвечает на его сообщения. Поставим менеджеру задачу от имени руководителя
---
::

### Угол {#angle}

Пропс `angle` меняет положение уголка.

::component-code
---
prettier: true
ignore:
  - description
  - avatar.src
  - avatar.loading
props:
  angle: top
  avatar:
    src: '/b24ui/avatar/employee.png'
    loading: lazy
  description: Сообщим руководителю, что сделка не движется: менеджер не перезванивает клиенту и не отвечает на его сообщения. Поставим менеджеру задачу от имени руководителя
---
::

### С пользовательским слотом {#with-custom-slot}

Слот позволяет настроить описание.

::component-example
---
name: 'advice-example'
props:
class: 'w-full flex flex-col flex-nowrap justify-center items-center gap-4'
collapse: true
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
