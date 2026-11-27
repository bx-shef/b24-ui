---
title: FileUpload
description: 'Компонент загрузки файлов.'
category: form
keywords:
  - dropzone
  - drag and drop
  - file input
  - загрузка файлов
  - перетащить файл
  - выбор файла
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/FileUpload.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/file-upload
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/file-upload
---

## Использование {#usage}

Директива `v-model` управляет значением FileUpload.

Модель принимает нативные объекты [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) или собственные объекты [`FileUploadItem`](#with-custom-file-items) со свойствами:

- `name: string`{lang="ts-type"}
- `size?: number`{lang="ts-type"}
- `type?: string`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}

Тип элемента по умолчанию `File`; при собственных элементах он выводится из модели. `FileUploadItem` можно расширить своими свойствами.

::component-code
---
prettier: true
ignore:
  - modelValue
  - class
external:
  - modelValue
props:
  modelValue: null
  class: 'w-96 min-h-48'
---
::

### Несколько файлов {#multiple}

Пропс `multiple` разрешает выбрать несколько файлов.

::component-code
---
prettier: true
ignore:
  - class
props:
  multiple: true
  class: 'w-96 min-h-48'
---
::

### Зона перетаскивания {#dropzone}

Пропс `dropzone` включает и отключает область для перетаскивания. По умолчанию `true`.

::component-code
---
prettier: true
ignore:
  - class
props:
  dropzone: false
  class: 'w-96 min-h-48'
---
::

### Интерактивность {#interactive}

Пропс `interactive` включает и отключает область, по которой можно щёлкнуть. По умолчанию `true`.

::tip{to="#with-files-bottom-slot"}
Пригодится, если в слот `#actions` добавлен компонент `Button`.
::

::component-code
---
ignore:
  - class
props:
  interactive: false
  class: 'w-96 min-h-48'
---
::

### Допустимые типы {#accept}

Пропс `accept` задаёт допустимые типы файлов. Передайте список [MIME-типов](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types) или расширений через запятую (например, `image/png,application/pdf,.jpg`). По умолчанию `*` (любые файлы).

::component-code
---
ignore:
  - accept
  - class
props:
  accept: 'image/*'
  class: 'w-96 min-h-48'
---
::

### Подпись {#label}

Пропс `label` задаёт подпись FileUpload.

::component-code
---
prettier: true
ignore:
  - class
props:
  label: 'Перетащите изображение сюда'
  class: 'w-96 min-h-48'
---
::

### Описание {#description}

Пропс `description` задаёт описание FileUpload.

::component-code
---
prettier: true
ignore:
  - label
  - class
props:
  label: 'Перетащите изображение сюда'
  description: 'SVG, PNG, JPG или GIF (не больше 2 МБ)'
  class: 'w-96 min-h-48'
---
::

### Иконка {#icon}

Пропс `icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) FileUpload.

::component-code
---
prettier: true
ignore:
  - label
  - description
  - class
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  label: 'Перетащите изображение сюда'
  description: 'SVG, PNG, JPG или GIF (не больше 2 МБ)'
  class: 'w-96 min-h-48'
---
::

### Цвет {#color}

Пропс `color` меняет цвет FileUpload.

::component-code
---
prettier: true
ignore:
  - label
  - description
  - class
props:
  color: 'air-primary-alert'
  highlight: true
  label: 'Перетащите изображение сюда'
  description: 'SVG, PNG, JPG или GIF (не больше 2 МБ)'
  class: 'w-96 min-h-48'
---
::

::note
Пропс `highlight` здесь показывает состояние фокуса. Внутри компонента он включается при ошибке валидации.
::

### Вариант {#variant}

Пропс `variant` меняет вариант FileUpload.

::component-code
---
ignore:
  - class
props:
  variant: button
---
::

### Размер {#size}

Пропс `size` меняет размер FileUpload.

::component-code
---
prettier: true
ignore:
  - label
  - description
  - class
props:
  size: lg
  variant: area
  label: 'Перетащите изображение сюда'
  description: 'SVG, PNG, JPG или GIF (не больше 2 МБ)'
---
::

### Раскладка {#layout}

Пропс `layout` меняет способ отображения файлов в FileUpload. По умолчанию `grid`.

::warning
Пропс работает только при `variant` равном `area`.
::

::component-code
---
prettier: true
ignore:
  - label
  - description
  - multiple
  - class
  - b24ui.base
props:
  layout: list
  multiple: true
  label: 'Перетащите изображения сюда'
  description: 'SVG, PNG, JPG или GIF (не больше 2 МБ)'
  class: 'w-96'
  b24ui:
    base: 'min-h-48'
---
::

### Положение {#position}

Пропс `position` меняет положение файлов в FileUpload. По умолчанию `outside`.

::warning
Пропс работает только при `variant` равном `area` и `layout` равном `list`.
::

::component-code
---
prettier: true
ignore:
  - label
  - description
  - multiple
  - layout
  - class
  - b24ui.base
props:
  position: inside
  layout: list
  multiple: true
  label: 'Перетащите изображения сюда'
  description: 'SVG, PNG, JPG или GIF (не больше 2 МБ)'
  class: 'w-96'
  b24ui:
    base: 'min-h-48'
---
::

## Примеры {#examples}

### С собственными элементами-файлами :badge{label="2.15+" class="align-text-top"} {#with-custom-file-items}

Чтобы показать уже существующий файл, передайте объект с `name`, необязательными метаданными файла и [Avatar](/docs/components/avatar/). Нативные файлы, выбранные пользователем, попадают в ту же модель. В моделях и слотах файлов рядом с вашим типом есть `File`, поэтому перед обращением к собственным свойствам сузьте тип элемента.

::component-example
---
name: 'file-upload-items-example'
prettier: true
collapse: true
---
::

### Со статусом загрузки :badge{label="2.15+" class="align-text-top"} {#with-upload-status}

Расширьте `FileUploadItem` своими полями и показывайте в слотах файлов прогресс загрузки и другие асинхронные состояния. В примере выбранные файлы превращаются в собственные элементы, имитируется прогресс загрузки, а по завершении показываются превью изображений.

::component-example
---
prettier: true
collapse: true
name: 'file-upload-status-example'
---
::

### С валидацией формы {#with-form-validation}

FileUpload можно использовать вместе с компонентами [Form](/docs/components/form/) и [FormField](/docs/components/form-field/), чтобы обрабатывать валидацию и ошибки.

::component-example
---
prettier: true
collapse: true
name: 'file-upload-form-validation-example'
---
::

### С отклонёнными файлами :badge{label="2.15+" class="align-text-top"} {#with-rejected-files}

Файлы, не подходящие под `accept`, при перетаскивании игнорируются. Чтобы показать сообщение об ошибке, подпишитесь на событие `reject`.

::component-example
---
prettier: true
collapse: true
name: 'file-upload-reject-example'
---
::

### Со слотом по умолчанию {#with-default-slot}

Слот по умолчанию позволяет собрать собственный компонент загрузки.

::note
Если нужен только выбор файлов без обёртки, воспользуйтесь композаблом `useFileUpload`: на нём построен сам FileUpload. `const { open, isDragging, inputRef, dropzoneRef } = useFileUpload({ accept: 'image/*', multiple: true, onUpdate: files => {} })`{lang="ts"}. `open()`{lang="ts"} открывает диалог выбора файлов, `dropzoneRef` привязывается к элементу, принимающему перетаскивание, а `isDragging` показывает состояние наведения. Разметка остаётся за вами: композабл ничего не отрисовывает.
::

::warning
`inputRef` нужен, только если в DOM требуется настоящий `<input type="file">` — для нативной отправки формы или валидации. Он ожидает **компонент**, а не элемент: значение читается как `inputRef.value.$el`{lang="ts"}, и FileUpload привязывает его к `VisuallyHidden as="input"`. Если привязать его к обычному `<input>`{lang="html"}, ничего не произойдёт: `$el` не определён, и перетащенные файлы не попадут в поле. Если поле не нужно, оставьте `inputRef` непривязанным.
::

::warning
`accept` попадает в диалог выбора как есть, а зона перетаскивания получает только MIME-часть: при перетаскивании известен тип, но не имя файла. Поэтому если `accept` состоит только из расширений (`'.pdf,.docx'`{lang="ts"}), зона перетаскивания примет любые файлы. Когда важны именно расширения, проверяйте имя в `onUpdate`.
::

::component-example
---
prettier: true
collapse: true
name: 'file-upload-default-slot-example'
---
::

### Со слотом files-bottom {#with-files-bottom-slot}

Слот `files-bottom` позволяет добавить [Button](/docs/components/button/) под списком файлов, например, чтобы удалить все файлы.

::component-example
---
prettier: true
collapse: true
name: 'file-upload-files-bottom-slot-example'
---
::

::note{to="#interactive"}
В этом примере пропс `interactive` равен `false`, чтобы отключить область, по которой можно щёлкнуть.
::

### Со слотом files-top {#with-files-top-slot}

Слот `files-top` позволяет добавить [Button](/docs/components/button/) над списком файлов, например, чтобы добавить новые файлы.

::component-example
---
prettier: true
collapse: true
name: 'file-upload-files-top-slot-example'
---
::

## API

### Пропсы {#props}

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes" target="_blank"}
Компонент поддерживает и все нативные HTML-атрибуты `<input>`.
::

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

### Доступ через ref {#expose}

При обращении к компоненту через ref в шаблоне доступно:

| Имя | Тип |
| ---- | ---- |
| `inputRef`{lang="ts-type"}    | `Ref<HTMLInputElement \| null>`{lang="ts-type"} |
| `dropzoneRef`{lang="ts-type"} | `Ref<HTMLDivElement \| null>`{lang="ts-type"}   |

## Тема {#theme}

:component-theme
