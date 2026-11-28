---
title: ChatAttachment
description: Показывает файл, прикреплённый к запросу или сообщению чата, с превью и состоянием загрузки.
category: chat
keywords:
  - attachment
  - file
  - upload
  - thumbnail
  - вложение чата
  - прикреплённый файл
  - миниатюра файла
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatAttachment.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chat-attachment
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-attachment
---

## Использование {#usage}

Компонент ChatAttachment показывает файл: имя, описание и рядом с ними превью картинки или иконку.

::note
Компонент [`ChatPrompt`](/docs/components/chat-prompt/#files) сам использует его для списка файлов, привязанных через `v-model:files`.
::

### Файл {#file}

Пропс `file` принимает `File`, например выбранный пользователем. Имя, тип и размер берутся из него, а превью картинки строится через object URL.

```vue
<script setup lang="ts">
defineProps<{
  file: File
}>()
</script>

<template>
  <B24ChatAttachment :file="file" />
</template>
```

### Имя {#name}

Пропсы `name` и `type` описывают файл, о котором известны только сведения, например файловую часть сообщения.

::component-code
---
props:
  name: 'quarterly-report.pdf'
  type: 'application/pdf'
---
::

### Адрес {#url}

Пропс `url` задаёт адрес картинки для превью. Картинка выводится, если `type` — тип изображения, а `name` служит её альтернативным текстом.

::component-code
---
prettier: true
props:
  name: 'landscape.jpg'
  type: 'image/jpeg'
  url: 'https://picsum.photos/id/1015/200'
---
::

::tip
Файловую часть сообщения сопоставляют с этими пропсами в слоте `#files` компонентов [ChatMessage](/docs/components/chat-message/) и [ChatMessages](/docs/components/chat-messages/).

```vue
<template>
  <B24ChatMessages :messages="messages" :status="status">
    <template #files="{ parts }">
      <B24ChatAttachment
        v-for="(part, index) in parts"
        :key="index"
        :name="part.filename"
        :type="part.mediaType"
        :url="part.url"
      />
    </template>
  </B24ChatMessages>
</template>
```
::

### Описание {#description}

Пропс `description` задаёт текст под именем. По умолчанию это расширение файла и, если передан `file`, его размер.

::component-code
---
prettier: true
ignore:
  - name
  - type
props:
  description: 'Загружен 2 минуты назад'
  name: 'quarterly-report.pdf'
  type: 'application/pdf'
---
::

### Статус {#status}

Пропс `status` показывает, что файл загружается (`uploading`) или загрузка не удалась (`error`). По умолчанию `idle`.

::note
Пока файл загружается, имя переливается, картинка тускнеет, а иконка файла сменяется индикатором загрузки. Ход загрузки или, при `error`, причину сбоя передавайте в пропс `description`.
::

::component-code
---
prettier: true
ignore:
  - name
  - type
props:
  status: 'uploading'
  name: 'quarterly-report.pdf'
  type: 'application/pdf'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет раскладку вложения. По умолчанию `horizontal`, а `vertical` даёт картинке крупное превью.

::component-code
---
prettier: true
ignore:
  - name
  - type
  - url
props:
  orientation: 'vertical'
  name: 'landscape.jpg'
  type: 'image/jpeg'
  url: 'https://picsum.photos/id/1015/200'
---
::

### Вариант {#variant}

Пропс `variant` меняет оформление вложения. По умолчанию `card`, а `thumbnail` показывает только картинку или иконку файла: кнопка удаления сидит на её углу, а имя остаётся доступным для программ экранного доступа. Вместе с пропсом `size` получается превью от `40px` для `xs` до `120px` для `xl`.

::component-code
---
prettier: true
ignore:
  - name
  - type
  - url
  - removable
props:
  variant: 'thumbnail'
  name: 'landscape.jpg'
  type: 'image/jpeg'
  url: 'https://picsum.photos/id/1015/200'
  removable: true
---
::

::note
Пропс `orientation` действует только для варианта `card`.
::

### Размер {#size}

Пропс `size` задаёт размер вложения. По умолчанию `md`.

::component-code
---
prettier: true
ignore:
  - name
  - type
props:
  size: 'sm'
  name: 'quarterly-report.pdf'
  type: 'application/pdf'
---
::

### Удаление {#removable}

Пропс `removable` выводит кнопку, которая вызывает событие `remove`.

::component-code
---
prettier: true
ignore:
  - name
  - type
props:
  removable: true
  name: 'quarterly-report.pdf'
  type: 'application/pdf'
---
::

### Иконка {#icon}

Пропс `icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) для файлов, которые не картинки. По умолчанию `icons.file`.

::component-code
---
prettier: true
ignore:
  - name
  - type
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  name: 'quarterly-report.pdf'
  type: 'application/pdf'
---
::

Иконки состояний и кнопки удаления настраиваются пропсами `loadingIcon`, `errorIcon` и `removeIcon`.

## API {#api}

### Пропсы {#props}

:component-props

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
