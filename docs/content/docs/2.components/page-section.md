---
title: PageSection
description: 'Адаптивная секция страницы.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageSection.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-section
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-section
---

## Использование {#usage}

Компонент PageSection оборачивает содержимое в [Container](/docs/components/container/), сохраняя гибкость на всю ширину: фон, изображения и узоры добавляются легко. Он даёт гибкий способ показать содержимое с иллюстрацией в слоте по умолчанию.

::component-example
---
name: 'page-section-example'
class: 'p-8'
preview: true
source: false
---
::

### Заголовок {#title}

Пропс `title` задаёт заголовок секции.

::component-code
---
props:
  title: 'Bitrix24. Ваше рабочее пространство.'
---
::

::tip
Заголовок по умолчанию отрисовывается как `h2`. Чтобы изменить тег, передайте в пропс `as` объект, например `:as="{ title: 'h3' }"`{lang="ts-type"}. Корневой элемент задаётся так же: `:as="{ root: 'div', title: 'h3' }"`{lang="ts-type"}.
::

### Описание {#description}

Пропс `description` задаёт описание секции.

::component-code
---
prettier: true
ignore:
  - title
props:
  title: 'Bitrix24. Ваше рабочее пространство.'
  description: 'Единая бесплатная платформа для управления командой и продажами: Bitrix24 бесшовно встраивается во все ваши бизнес-процессы и помогает управлять ими с максимальной точностью и эффективностью.'
---
::

### Надзаголовок {#headline}

Пропс `headline` задаёт надзаголовок секции.

::component-code
---
prettier: true
ignore:
  - title
  - description
props:
  title: 'Bitrix24. Ваше рабочее пространство.'
  description: 'Единая бесплатная платформа для управления командой и продажами: Bitrix24 бесшовно встраивается во все ваши бизнес-процессы и помогает управлять ими с максимальной точностью и эффективностью.'
  headline: 'Возможности'
---
::

### Иконка {#icon}

Пропс `icon` задаёт иконку секции.

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
  title: 'Bitrix24. Ваше рабочее пространство.'
  description: 'Единая бесплатная платформа для управления командой и продажами: Bitrix24 бесшовно встраивается во все ваши бизнес-процессы и помогает управлять ими с максимальной точностью и эффективностью.'
  icon: 'RocketIcon'
---
::

### Возможности {#features}

Пропс `features` показывает под описанием список [PageFeature](/docs/components/page-feature/) в виде массива объектов со свойствами:

- `title?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `orientation?: 'horizontal' | 'vertical'`{lang="ts-type"}

Можно передать любое свойство компонента [Link](/docs/components/link/#props), например `to`, `target` и другие.

::component-example
---
name: 'page-section-example'
class: 'p-8'
---
::

### Ссылки {#links}

Пропс `links` показывает под описанием список кнопок [Button](/docs/components/button/).

::component-code
---
prettier: true
external:
  - links
externalTypes:
  - ButtonProps[]
ignore:
  - title
  - description
  - links
props:
  title: 'Bitrix24. Ваше рабочее пространство.'
  description: 'Единая бесплатная платформа для управления командой и продажами: Bitrix24 бесшовно встраивается во все ваши бизнес-процессы и помогает управлять ими с максимальной точностью и эффективностью.'
  links:
    - label: 'Начать'
      to: '/docs/getting-started/'
      color: 'air-secondary-accent-2'
    - label: 'Изучить'
      to: '/docs/components/'
      color: 'air-primary'
---
::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию слота по умолчанию. По умолчанию `vertical`.

::component-code
---
prettier: true
external:
  - features
  - links
externalTypes:
  - PageFeatureProps[]
  - ButtonProps[]
ignore:
  - title
  - description
  - icon
  - features
  - links
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Bitrix24. Ваше рабочее пространство.'
  description: 'Единая бесплатная платформа для управления командой и продажами: Bitrix24 бесшовно встраивается во все ваши бизнес-процессы и помогает управлять ими с максимальной точностью и эффективностью.'
  icon: 'RocketIcon'
  orientation: horizontal
  features:
    - title: 'Онлайн-офис для всей команды'
      description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 позволяет командам работать эффективно и слаженно, где бы они ни были: дома, в офисе или в дороге.'
      to: 'https://www.bitrix24.com/tools/communications/'
    - title: 'Бесплатная CRM для вашего бизнеса'
      description: 'Продавайте больше, лучше и быстрее: Bitrix24 — единая платформа, которая закрывает все ваши потребности.'
      to: 'https://www.bitrix24.com/tools/crm/'
    - title: 'Бесплатное управление задачами для вашего бизнеса'
      description: 'Ставьте задачи, следите за сроками, собирайте отчёты, отслеживайте KPI и ведите проекты откуда угодно.'
      to: 'https://www.bitrix24.com/tools/tasks_and_projects/'
  links:
    - label: 'Изучить'
      to: '/docs/components/'
      color: 'air-primary'
slots:
  default: |

    <img src="/b24ui/assets/demo/communications-main.png.webp" width="352" height="647" alt="Illustration" class="w-full rounded-lg" loading="lazy" />
---

:img{src="/b24ui/assets/demo/communications-main.png.webp" width="352" height="647" alt="Illustration" class="w-full rounded-lg" loading="lazy"}
::

### Обратный порядок {#reverse}

Пропс `reverse` меняет порядок слота по умолчанию на обратный.

::component-code
---
prettier: true
external:
  - features
  - links
externalTypes:
  - PageFeatureProps[]
  - ButtonProps[]
ignore:
  - title
  - description
  - icon
  - features
  - links
  - icon
cast:
  icon: 'RocketIcon'
props:
  reverse: true
  title: 'Bitrix24. Ваше рабочее пространство.'
  description: 'Единая бесплатная платформа для управления командой и продажами: Bitrix24 бесшовно встраивается во все ваши бизнес-процессы и помогает управлять ими с максимальной точностью и эффективностью.'
  icon: 'RocketIcon'
  orientation: horizontal
  features:
    - title: 'Онлайн-офис для всей команды'
      description: 'Благодаря широкому набору инструментов для общения и совместной работы Bitrix24 позволяет командам работать эффективно и слаженно, где бы они ни были: дома, в офисе или в дороге.'
      to: 'https://www.bitrix24.com/tools/communications/'
    - title: 'Бесплатная CRM для вашего бизнеса'
      description: 'Продавайте больше, лучше и быстрее: Bitrix24 — единая платформа, которая закрывает все ваши потребности.'
      to: 'https://www.bitrix24.com/tools/crm/'
    - title: 'Бесплатное управление задачами для вашего бизнеса'
      description: 'Ставьте задачи, следите за сроками, собирайте отчёты, отслеживайте KPI и ведите проекты откуда угодно.'
      to: 'https://www.bitrix24.com/tools/tasks_and_projects/'
  links:
    - label: 'Изучить'
      to: '/docs/components/'
      color: 'air-primary'
slots:
  default: |

    <img src="/b24ui/assets/demo/communications-main.png.webp" width="352" height="647" alt="Illustration" class="w-full rounded-lg" loading="lazy" />
---

:img{src="/b24ui/assets/demo/communications-main.png.webp" width="352" height="647" alt="Illustration" class="w-full rounded-lg" loading="lazy"}
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

## Тема {#theme}

:component-theme
