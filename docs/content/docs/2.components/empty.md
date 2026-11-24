---
title: Empty
description: 'Компонент пустого состояния.'
category: data
keywords:
  - no data
  - placeholder
  - zero state
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Empty.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/empty
---

## Использование {#usage}

::component-example
---
collapse: true
name: 'empty-example'
---
::

### Заголовок {#title}

Пропс `title` задаёт заголовок пустого состояния.

::component-code
---
props:
  title: Проекты не найдены
---
::

::tip
По умолчанию заголовок отрисовывается как `h2`. Чтобы изменить тег, передайте в пропс `as` объект: например, `:as="{ title: 'h3' }"`{lang="ts-type"}. Так же можно задать корневой элемент: `:as="{ root: 'section', title: 'h3' }"`{lang="ts-type"}.
::

### Описание {#description}

Пропс `description` задаёт описание пустого состояния.

::component-code
---
prettier: true
ignore:
  - title
props:
  title: Проекты не найдены
  description: 'Похоже, вы ещё не добавили ни одного проекта. Создайте проект, чтобы начать.'
---
::

### Иконка {#icon}

Пропс `icon` задаёт иконку пустого состояния.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  title: Проекты не найдены
  description: 'Похоже, вы ещё не добавили ни одного проекта. Создайте проект, чтобы начать.'
---
::

### Загрузка {#loading}

Пропс `loading` показывает иконку загрузки вместо обычной иконки. Раскладка при этом не меняется, поэтому между состояниями загрузки и пустоты можно переключаться без сдвигов.

::component-code
---
prettier: true
ignore:
  - title
  - description
props:
  loading: true
  title: Загрузка проектов
  description: Подождите, мы загружаем ваши проекты.
---
::

### Иконка загрузки {#loading-icon}

Пропс `loading-icon` меняет иконку загрузки. По умолчанию `icons.loading`.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - loading
  - loadingIcon
cast:
  loadingIcon: 'RocketIcon'
props:
  loading: true
  loadingIcon: 'RocketIcon'
  title: Загрузка проектов
  description: Подождите, мы загружаем ваши проекты.
---
::

### Действия {#actions}

Пропс `actions` добавляет в пустое состояние действия в виде кнопок [Button](/docs/components/button/).

::component-code
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: RocketIcon
  title: Проекты не найдены
  description: 'Похоже, вы ещё не добавили ни одного проекта. Создайте проект, чтобы начать.'
  actions:
    - label: Создать
      color: air-primary
    - label: Обновить
---
::

### Цвет {#color}

Пропс `color` меняет цвет пустого состояния.

::component-code
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
  - icon
cast:
  icon: 'RocketIcon'
props:
  color: 'air-secondary-accent-2'
  icon: 'RocketIcon'
  title: Уведомлений нет
  description: 'Вы всё прочитали. Новые уведомления появятся здесь.'
  actions:
    - label: Обновить
---
::

### Инверсия {#inverted}

Пропс `inverted` инвертирует цвет пустого состояния.

::warning
Доступно только для цветов `air-primary*`.
::

::component-code
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
  - icon
cast:
  icon: 'RocketIcon'
props:
  inverted: true
  color: 'air-primary'
  icon: 'RocketIcon'
  title: Уведомлений нет
  description: 'Вы всё прочитали. Новые уведомления появятся здесь.'
  actions:
    - label: Обновить
---
::

### Размер {#size}

Пропс `size` меняет размер пустого состояния.

::component-code
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
  - icon
cast:
  icon: 'RocketIcon'
props:
  size: xl
  icon: 'RocketIcon'
  title: Уведомлений нет
  description: 'Вы всё прочитали. Новые уведомления появятся здесь.'
  actions:
    - label: Обновить
---
::

## Примеры {#examples}

### Со слотами {#with-slots}

Слоты позволяют собрать более сложное пустое состояние.

::component-example
---
collapse: true
name: 'empty-slots-example'
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
