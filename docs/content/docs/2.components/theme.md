---
title: Theme
description: 'Headless-компонент для оформления дочерних компонентов темой.'
category: layout
keywords:
  - тема оформления
  - стилизация дочерних компонентов
  - настройка внешнего вида
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Theme.vue
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/theme
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/theme
---

## Использование {#usage}

Theme переопределяет **классы слотов** и **пропсы** по умолчанию у всех дочерних компонентов, не меняя каждый по отдельности. Внутри он использует механизм Vue `provide` / `inject`, поэтому переопределения действуют на любой глубине.

::note
Theme не отрисовывает HTML-элементов: он только передаёт дочерним компонентам переопределения темы.
::

### Классы слотов {#slot-classes}

Пропс `b24ui` переопределяет классы слотов вложенных компонентов. Ключи — имена компонентов (camelCase), значения — переопределения классов их слотов.

Классы объединяются с классами компонента по умолчанию. Чтобы их **заменить**, задайте слот функцией: она получает уже вычисленные классы по умолчанию, и часть из них можно оставить:

```vue
<template>
  <B24Theme :b24ui="{ button: { label: () => 'text-base font-bold' } }">
    <B24Button label="Заменено" />
  </B24Theme>
</template>
```

::warning
Имена слотов указываются **прямо** под именем компонента — `{ button: { label: … } }`{lang="ts"}. Это не форма объекта темы из [глобальной конфигурации](/docs/getting-started/theme/components/#global-config), где они вложены в `slots`.

TypeScript отклоняет неверную форму (`TS2353: 'slots' does not exist in type …`), поэтому пропс нужно типизировать. Во время выполнения лишний ключ просто игнорируется: ни ошибки, ни предупреждения, остаются значения по умолчанию — так бывает, если объект попал в пропс без типа.
::

::note{to="/docs/getting-started/theme/components/#global-config"}
Theme применяется в той же точке, что и пропс `b24ui`, поэтому заменяющая функция здесь заменяет вычисленные классы вместе с вариантами. В глобальной конфигурации она заменяет только собственные классы слота, а варианты применяются поверх.
::

::component-example
---
name: 'theme-ui-example'
---
::

### Значения пропсов по умолчанию {#prop-defaults}

Пропс `props` переопределяет значение по умолчанию любого пропса у вложенных компонентов. Каждый ключ — часть пропсов этого компонента.

::component-example
---
name: 'theme-props-example'
---
::

::tip
Явно переданные пропсы компонента (например, `<B24Button color="air-primary" />`) всегда важнее `<B24Theme :props>`. Значения темы действуют, только когда пропс не передан явно.
::

## Примеры {#examples}

### Несколько компонентов {#multiple-components}

Разные ключи в `b24ui` или `props` оформляют сразу несколько типов компонентов.

::component-example
---
name: 'theme-multiple-example'
---
::

### Вложенные темы {#nested-themes}

Вложенные Theme складывают переопределения. Самая внутренняя тема приоритетнее, а ключи, которые она не переопределяет, наследуются от внешней.

::component-example
---
name: 'theme-nested-example'
---
::

### Явный приоритет {#explicit-priority}

Явно заданный пропс (включая `b24ui`) у отдельного компонента всегда приоритетнее компонента Theme.

::component-example
---
name: 'theme-priority-example'
---
::

### Глубокое распространение {#deep-propagation}

Переопределения доступны всем вложенным компонентам, как бы глубоко они ни находились.

::component-example
---
name: 'theme-deep-example'
---
::

::note
В этом примере `MyButton` — собственный компонент, который внутри отрисовывает `B24Button`. Переопределения темы всё равно действуют, потому что распространяются по всему дереву компонентов.
::

### Компоненты форм {#form-components}

Theme задаёт единое оформление для группы компонентов формы.

::component-example
---
name: 'theme-form-example'
collapse: true
---
::

::tip
`<B24FormField>`, `<B24FieldGroup>` и `<B24AvatarGroup>` сохраняют приоритет над `<B24Theme :props>` для `size`, `color` и `highlight`. Ошибки валидации тоже принудительно задают цвет `error` поверх любого значения темы.
::

### Prose-компоненты {#prose-components}

Пространство имён `prose` оформляет типографские компоненты. Ключи вложены в `prose` (например, `prose.p`, `prose.code`).

::component-example
---
name: 'theme-prose-example'
collapse: true
---
::

## API {#api}

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots
