---
title: NavigationMenu
description: 'Список ссылок с горизонтальной или вертикальной ориентацией.'
category: navigation
keywords:
  - navbar
  - menubar
  - sidebar navigation
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/NavigationMenu.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/navigation-menu
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/navigation-menu
  - label: NavigationMenu
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/navigation-menu
---

## Использование {#usage}

Компонент NavigationMenu показывает список ссылок по горизонтали или по вертикали.

::component-code
---
collapse: true
hide:
  - class
ignore:
  - items
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  items:
    - label: Управление продажами
      type: trigger
      children:
        - label: Управление лидами
        - label: Управление сделками
        - label: 'Воронки'
        - label: 'Права доступа'
    - label: Совместная работа
      type: trigger
      children:
        - label: Онлайн-офис
          to: https://www.bitrix24.com/tools/communications/online-workspace.php
        - label: CoPilot в чате
          to: https://www.bitrix24.com/tools/copilot-ai-powered-tools-for-business.php#copilot-in-chat
        - label: useToast
          to: /docs/composables/use-toast
    - label: HR и автоматизация
      type: trigger
      badge: +5
      active: true
      children:
        - label: Управление сотрудниками
          to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
        - label: Культура и вовлечённость
          to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
        - label: Автоматизация
          to: https://www.bitrix24.com/tools/hr_automation/automation.php
          target: _blank
    - label: GitHub
      to: https://github.com/bitrix24/b24ui
      target: _blank
    - label: Справка
      disabled: true
  class: 'w-full justify-center'
---
::

### Элементы {#items}

Пропс `items` — массив объектов со свойствами:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `badge?: string | number | BadgeProps`{lang="ts-type"}
- [`chip?: boolean | ChipProps`{lang="ts-type"}](#with-chip-in-items)
- `hint?: string`{lang="ts-type"}
- [`tooltip?: TooltipProps`{lang="ts-type"}](#with-tooltip-in-items)
- [`popover?: PopoverProps`{lang="ts-type"}](#with-popover-in-items)
- `trailingIcon?: IconComponent`{lang="ts-type"}
- `type?: 'label' | 'trigger' | 'link'`{lang="ts-type"}
- `defaultOpen?: boolean`{lang="ts-type"}
- `open?: boolean`{lang="ts-type"}
- `value?: string`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- [`viewportRtl?: boolean`{lang="ts-type"}](#orientation)
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- `children?: NavigationMenuChildItem[]`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { linkLeadingAvatarSize?: ClassNameValue, linkLeadingAvatar?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLeadingChipSize?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkTrailing?: ClassNameValue, linkLeadingHint?: ClassNameValue, linkLeadingBadgeSize?: ClassNameValue, linkLeadingBadge?: ClassNameValue, linkTrailingIcon?: ClassNameValue, label?: ClassNameValue, link?: ClassNameValue, content?: ClassNameValue, childList?: ClassNameValue, childLabel?: ClassNameValue, childItem?: ClassNameValue, childLink?: ClassNameValue, childLinkIcon?: ClassNameValue, childLinkHint?: ClassNameValue, childLinkBadgeSize?: ClassNameValue, childLinkBadge?: ClassNameValue, childLinkWrapper?: ClassNameValue, childLinkLabel?: ClassNameValue, childLinkLabelExternalIcon?: ClassNameValue, popoverWrapper?: ClassNameValue }`{lang="ts-type"}

Можно передать любое свойство компонента [Link](/docs/components/link/#props), например `to`, `target` и другие.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  items:
    - label: Управление продажами
      type: trigger
      hint: note
      children:
        - label: Управление лидами
        - label: Управление сделками
        - label: Воронки
          hint: note
        - label: Права доступа
    - label: Совместная работа
      type: trigger
      children:
        - label: Онлайн-офис
          to: https://www.bitrix24.com/tools/communications/online-workspace.php
        - label: CoPilot в чате
          to: https://www.bitrix24.com/tools/copilot-ai-powered-tools-for-business.php#copilot-in-chat
        - label: useToast
          to: /docs/composables/use-toast
    - label: HR и автоматизация
      type: trigger
      badge: +5
      active: true
      children:
        - label: Управление сотрудниками
          to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
        - label: Культура и вовлечённость
          to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
        - label: Автоматизация
          to: https://www.bitrix24.com/tools/hr_automation/automation.php
          target: _blank
    - label: GitHub
      to: https://github.com/bitrix24/b24ui
      target: _blank
    - label: Справка
      disabled: true
  class: 'w-full justify-center'
---
::

::note
В пропс `items` можно передать и массив массивов, чтобы показать группы элементов.
::

::tip
Подменю задаются плоским массивом объектов `children`:

- `label: string`
- `icon?: IconComponent`
- `onSelect?(e: Event): void`
- `class?: any`

Группировка заканчивается на верхнем уровне. В отличие от `items`, `children` принимает только **плоский** массив: вложенный массив разворачивается и отрисовывается без разделителя, а в режиме разработки в консоль пишется предупреждение.

::

### Ориентация {#orientation}

Пропс `orientation` меняет ориентацию NavigationMenu.

::note
При вертикальной ориентации каждая группа отображается компонентом [Accordion](/docs/components/accordion/). Состоянием открытия каждого элемента управляют свойства `open` и `defaultOpen`, а поведением — пропсы [`collapsible`](/docs/components/accordion/#collapsible) и [`type`](/docs/components/accordion/#multiple).
::

::note
При вертикальной ориентации и несвёрнутом меню (`collapsed` не задан) дочерние элементы отрисовываются рекурсивно как обычные элементы, поэтому их стилизует `b24ui.link`. `b24ui.childLink` применяется только к `content` в `horizontal`-ориентации и к [popover](#with-popover-in-items) при `collapsed`.
::

::warning
У последнего элемента меню верхнего уровня нужно задать `viewportRtl`, чтобы выпадающее меню позиционировалось правильно.
::

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[][]
props:
  orientation: 'vertical'
  items:
    - - label: Ссылки
        type: 'label'
      - label: Управление продажами
        type: trigger
        hint: note
        defaultOpen: true 
        children:
          - label: Управление лидами
          - label: Управление сделками
          - label: Воронки
            hint: note
          - label: Права доступа
    - - label: GitHub
        to: https://github.com/bitrix24/b24ui
        target: _blank
      - label: Справка
        disabled: true
      - label: HR и автоматизация
        type: trigger
        viewportRtl: true 
        badge: +5
        active: true
        children:
          - label: Управление сотрудниками
            to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
          - label: Культура и вовлечённость
            to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
          - label: Автоматизация
            to: https://www.bitrix24.com/tools/hr_automation/automation.php
            target: _blank
  class: 'data-[orientation=vertical]:w-[430px]'
---
::

::note
Группы разделяются отступами при горизонтальной ориентации и разделителями при вертикальной.
::

### Свёрнутое меню {#collapsed}

При `vertical`-ориентации пропс `collapsed` сворачивает NavigationMenu. Это удобно, например, в боковом меню.

::note
Пропсы [`tooltip`](#with-tooltip-in-items) и [`popover`](#with-popover-in-items) показывают дополнительную информацию о свёрнутых элементах.
::

::component-example
---
collapse: true
name: 'navigation-menu-collapsed-example'
---
::

### Иконка справа {#trailing-icon}

Пропс `trailing-icon` меняет [иконку](https://bitrix24.github.io/b24icons/icons/) справа у каждого элемента. Иконка показывается, только если у элемента есть дочерние.

::tip
Иконку отдельного элемента можно задать и свойством `trailingIcon` в объекте элемента.
::

::component-code
---
collapse: true
ignore:
  - items
  - class
  - trailingIcon
cast:
  trailingIcon: 'RocketIcon'
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  trailingIcon: 'RocketIcon'
  items:
    - label: Управление продажами
      type: trigger
      children:
        - label: Управление лидами
        - label: Управление сделками
        - label: 'Воронки'
        - label: 'Права доступа'
    - label: Совместная работа
      type: trigger
      children:
        - label: Онлайн-офис
          to: https://www.bitrix24.com/tools/communications/online-workspace.php
        - label: CoPilot в чате
          to: https://www.bitrix24.com/tools/copilot-ai-powered-tools-for-business.php#copilot-in-chat
        - label: useToast
          to: /docs/composables/use-toast
    - label: HR и автоматизация
      type: trigger
      badge: +5
      active: true
      children:
        - label: Управление сотрудниками
          to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
        - label: Культура и вовлечённость
          to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
        - label: Автоматизация
          to: https://www.bitrix24.com/tools/hr_automation/automation.php
          target: _blank
  class: 'w-full justify-center'
---
::

### Область просмотра :badge{label="2.15+" class="align-text-top"} {#viewport}

Пропс `viewport` управляет отрисовкой области просмотра NavigationMenu, например её `align`.

::warning
Пропс работает только при `orientation` равном `horizontal`.
::

::component-code
---
collapse: true
prettier: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[]
items:
  viewport.align:
    - start
    - center
    - end
props:
  viewport:
    align: start
  items:
    - label: Управление продажами
      type: trigger
      children:
        - label: Управление лидами
        - label: Управление сделками
        - label: 'Воронки'
        - label: 'Права доступа'
    - label: Совместная работа
      type: trigger
      children:
        - label: Онлайн-офис
          to: https://www.bitrix24.com/tools/communications/online-workspace.php
        - label: CoPilot в чате
          to: https://www.bitrix24.com/tools/copilot-ai-powered-tools-for-business.php#copilot-in-chat
        - label: useToast
          to: /docs/composables/use-toast
    - label: HR и автоматизация
      type: trigger
      badge: +5
      active: true
      children:
        - label: Управление сотрудниками
          to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
        - label: Культура и вовлечённость
          to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
        - label: Автоматизация
          to: https://www.bitrix24.com/tools/hr_automation/automation.php
          target: _blank
  class: 'w-full justify-center'
---
::

### Выгрузка содержимого {#unmount}

Пропс `unmount-on-hide` управляет выгрузкой содержимого. По умолчанию `true`.

::component-code
---
collapse: true
ignore:
  - items
  - arrow
  - class
external:
  - items
externalTypes:
  - NavigationMenuItem[]
props:
  unmountOnHide: false
  items:
    - label: Управление продажами
      type: trigger
      children:
        - label: Управление лидами
        - label: Управление сделками
        - label: 'Воронки'
        - label: 'Права доступа'
    - label: Совместная работа
      type: trigger
      children:
        - label: Онлайн-офис
          to: https://www.bitrix24.com/tools/communications/online-workspace.php
        - label: CoPilot в чате
          to: https://www.bitrix24.com/tools/copilot-ai-powered-tools-for-business.php#copilot-in-chat
        - label: useToast
          to: /docs/composables/use-toast
    - label: HR и автоматизация
      type: trigger
      badge: +5
      active: true
      children:
        - label: Управление сотрудниками
          to: https://www.bitrix24.com/tools/hr_automation/employee-management.php
        - label: Культура и вовлечённость
          to: https://www.bitrix24.com/tools/hr_automation/culture-and-engagement.php
        - label: Автоматизация
          to: https://www.bitrix24.com/tools/hr_automation/automation.php
          target: _blank
  class: 'w-full justify-center'
---
::

::note
В DOM видно, что содержимое каждого элемента отрисовано.
::

## Примеры {#examples}

### Управление активным элементом {#control-active-item}

Активным элементом (элементами) управляют пропс `default-value` или директива `v-model` со значением `value` элемента. Если `value` не задан, по умолчанию используется `item-${index}` для элементов верхнего уровня и `item-${level}-${index}` для вложенных.

::component-example
---
collapse: true
name: 'navigation-menu-model-value-example'
---
::

::tip
Пропс `value-key` меняет ключ, по которому сопоставляются элементы при `v-model` или `default-value`.
::

::note
В этом примере с помощью [`defineShortcuts`](/docs/composables/define-shortcuts/) активный элемент переключается нажатием :kbd{value="1"}, :kbd{value="2"} или :kbd{value="3"}.
::

### С подсказкой в элементах {#with-tooltip-in-items}

При `vertical`-ориентации и свёрнутом меню (`collapsed`) пропс `tooltip` со значением `true` показывает [Tooltip](/docs/components/tooltip/) с подписью элемента. Свойство `tooltip` у отдельного элемента переопределяет подсказку по умолчанию. При `horizontal`-ориентации Tooltip для элементов задаётся свойством `tooltip` у элемента.

::note
Свойство `tooltip` у элемента всегда показывает подсказку независимо от общего пропса `tooltip`.
::

Любое свойство компонента [Tooltip](/docs/components/tooltip/) можно передать глобально или для каждого элемента.

::component-example
---
collapse: true
name: 'navigation-menu-collapsed-tooltip-example'
---
::

### С popover в элементах {#with-popover-in-items}

При `vertical`-ориентации и свёрнутом меню (`collapsed`) пропс `popover` со значением `true` показывает [Popover](/docs/components/popover/) с дочерними элементами. Свойство `popover` у отдельного элемента переопределяет popover по умолчанию.

::note
Свойство `popover` у элемента всегда показывает popover независимо от общего пропса `popover`.
::

Любое свойство компонента [Popover](/docs/components/popover/) можно передать глобально или для каждого элемента.

::component-example
---
collapse: true
name: 'navigation-menu-collapsed-popover-example'
---
::

::tip{to="#with-content-slot"}
Слот `#content` настраивает содержимое popover при `vertical`-ориентации.
::

### С чипом в элементах {#with-chip-in-items}

Свойство `chip` показывает [Chip](/docs/components/chip/) вокруг иконки элемента; можно передать любые его пропсы.

::component-example
---
collapse: true
name: 'navigation-menu-chip-items-example'
---
::

### С нижней панелью вкладок {#with-bottom-tab-bar}

Пропс `b24ui` превращает NavigationMenu в мобильную нижнюю панель вкладок с иконками и мелкими подписями.

::component-example
---
collapse: true
name: 'navigation-menu-bottom-tab-bar-example'
---
::

### Со свёрнутыми подписями {#with-collapsed-labels}

Пропс `b24ui` показывает под каждой иконкой подпись в свёрнутом состоянии.

::component-example
---
collapse: true
name: 'navigation-menu-collapsed-label-example'
---
::

### С собственным слотом {#with-custom-slot}

Свойство `slot` настраивает отдельный элемент.

Вам будут доступны слоты:

- `#{{ item.slot }}`{lang="ts-type"}
- `#{{ item.slot }}-leading`{lang="ts-type"}
- `#{{ item.slot }}-label`{lang="ts-type"}
- `#{{ item.slot }}-trailing`{lang="ts-type"}
- `#{{ item.slot }}-content`{lang="ts-type"}

::component-example
---
collapse: true
name: 'navigation-menu-custom-slot-example'
---
::

::tip{to="#slots"}
Слоты `#item`, `#item-leading`, `#item-label`, `#item-trailing` и `#item-content` настраивают все элементы сразу.
::

### Со слотом trailing {#with-trailing-slot}

Слот `#item-trailing` или свойство `slot` (`#{{ item.slot }}-trailing`) добавляет [DropdownMenu](/docs/components/dropdown-menu/), который появляется при наведении, как в Notion или Linear.

::component-example
---
collapse: true
name: 'navigation-menu-trailing-slot-example'
---
::

### Со слотом content {#with-content-slot}

Слот `#item-content` или свойство `slot` (`#{{ item.slot }}-content`) настраивает содержимое отдельного элемента.

::component-example
---
collapse: true
name: 'navigation-menu-content-slot-example'
---
::

::note
В этом примере класс `sm:w-(--reka-navigation-menu-viewport-width)` добавлен к `viewport`, чтобы ширина была динамической. Для этого у первого дочернего элемента содержимого должна быть задана ширина.
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

### События {#emits}

:component-emits

## Тема {#theme}

:component-theme
