---
title: PageCard
description: 'Готовая стилизованная карточка с заголовком, описанием и необязательной ссылкой.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageCard.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-card
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-card
---

## Использование {#usage}

Компонент PageCard — гибкий способ показать содержимое в карточке с иллюстрацией в слоте по умолчанию.

::component-example
---
name: 'page-card-example'
class: 'p-8'
---
::

::tip
Чтобы показать несколько PageCard, используйте компоненты [PageGrid](/docs/components/page-grid/), [PageColumns](/docs/components/page-columns/) или [PageList](/docs/components/page-list/).
::

### Заголовок {#title}

Пропс `title` задаёт заголовок карточки.

::component-code
---
hide:
  - class
props:
  title: 'Онлайн-офис для всей команды'
  class: 'w-96'
---
::

::tip
Заголовок по умолчанию отрисовывается как `div`. Чтобы отрисовать его как заголовок, передайте в пропс `as` объект, например `:as="{ title: 'h3' }"`{lang="ts-type"}. Корневой элемент задаётся так же: `:as="{ root: 'section', title: 'h3' }"`{lang="ts-type"}.
::

### Описание {#description}

Пропс `description` задаёт описание карточки.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
props:
  title: 'Онлайн-офис для всей команды'
  description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 позволяет командам работать эффективно и слаженно, где бы они ни были: дома, в офисе или в дороге.'
  class: 'w-96'
---
::

### Иконка {#icon}

Пропс `icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) карточки.

::component-code
---
prettier: true
hide:
  - class
  - icon
cast:
  icon: 'RocketIcon'
ignore:
  - title
  - description
props:
  title: 'Онлайн-офис для всей команды'
  description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 позволяет командам работать эффективно и слаженно, где бы они ни были: дома, в офисе или в дороге.'
  icon: 'RocketIcon'
  class: 'w-96'
---
::

### Ссылка {#link}

Можно передать любое свойство компонента [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), например `to`, `target`, `rel` и другие.

::component-code
---
prettier: true
hide:
  - class
  - icon
cast:
  icon: 'RocketIcon'
ignore:
  - title
  - description
  - icon
  - target
props:
  title: 'Онлайн-офис для всей команды'
  description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 позволяет командам работать эффективно и слаженно, где бы они ни были: дома, в офисе или в дороге.'
  icon: 'RocketIcon'
  to: 'https://www.bitrix24.com/tools/communications/'
  target: _blank
  class: 'w-96'
---
::

### Вариант {#variant}

Пропс `variant` меняет стиль карточки.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
  - description
  - icon
  - to
  - target
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Онлайн-офис для всей команды'
  description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 позволяет командам работать эффективно и слаженно, где бы они ни были: дома, в офисе или в дороге.'
  icon: 'RocketIcon'
  to: 'https://www.bitrix24.com/tools/communications/'
  target: _blank
  variant: outline-no-accent
  class: 'w-96'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию слота по умолчанию. По умолчанию `vertical`.

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
  title: 'Онлайн-офис для всей команды'
  description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 позволяет командам работать эффективно и слаженно, где бы они ни были: дома, в офисе или в дороге.'
  icon: 'RocketIcon'
  orientation: horizontal
slots:
  default: |

    <img src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover" />
---

:img{src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover"}
::

### Обратный порядок {#reverse}

Пропс `reverse` меняет порядок слота по умолчанию на обратный.

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
  title: 'Онлайн-офис для всей команды'
  description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 позволяет командам работать эффективно и слаженно, где бы они ни были: дома, в офисе или в дороге.'
  icon: 'RocketIcon'
  orientation: horizontal
  reverse: true
slots:
  default: |

    <img src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover" />
---

:img{src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover"}
::

### Выделение {#highlight}

Пропсы `highlight` и `highlight-color` показывают выделенную рамку вокруг карточки.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
  - description
  - orientation
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Онлайн-офис для всей команды'
  description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 позволяет командам работать эффективно и слаженно, где бы они ни были: дома, в офисе или в дороге.'
  icon: 'RocketIcon'
  orientation: horizontal
  highlight: true
  highlightColor: 'air-primary'
slots:
  default: |

    <img src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover" />
---

:img{src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover"}
::

## Примеры {#examples}

### Как отзыв {#as-a-testimonial}

Компонент [User](/docs/components/user/) в слоте `header` или `footer` делает карточку похожей на отзыв.

::component-example
---
name: 'page-card-testimonial-example'
---
::

::tip{to="/docs/components/page-columns/"}
Компонент `PageColumns` показывает несколько PageCard в многоколоночной раскладке.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
