---
title: ChatMessages
description: 'Список сообщений чата, рассчитанный на интеграцию с Vercel AI SDK.'
category: chat
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatMessages.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-messages
---

## Использование {#usage}

Компонент ChatMessages показывает список компонентов [ChatMessage](/docs/components/chat-message/): через слот по умолчанию или через пропс `messages`.

```vue {2,8}
<template>
  <B24ChatMessages>
    <B24ChatMessage
      v-for="(message, index) in messages"
      :key="index"
      v-bind="message"
    />
  </B24ChatMessages>
</template>
```

::callout{color="air-secondary"}
Компонент создан специально для чат-ботов с AI и умеет:

- прокручивать вниз при загрузке ([`shouldScrollToBottom`](#should-scroll-to-bottom));
- непрерывно прокручивать вниз по мере поступления сообщений ([`shouldAutoScroll`](#should-auto-scroll));
- показывать кнопку автопрокрутки, когда страницу прокрутили вверх, чтобы быстро вернуться к последним сообщениям ([`autoScroll`](#auto-scroll));
- показывать индикатор загрузки, пока ассистент обрабатывает запрос ([`status`](#status));
- прокручивать отправленное сообщение к верху области просмотра и подбирать высоту последнего сообщения пользователя.
::

### Сообщения {#messages}

Пропс `messages` показывает список сообщений чата.

::component-code
---
prettier: true
external:
  - messages
ignore:
  - messages
hide:
  - shouldScrollToBottom
collapse: true
class: 'overflow-y-auto'
props:
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Привет, как дела?'
    - id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8'
      role: assistant
      parts:
        - type: 'text'
          text: 'Всё хорошо, спасибо, что спросили! Чем могу помочь?'
    - id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a'
      role: user
      parts:
        - type: 'text'
          text: 'Какая сейчас погода в Токио?'
    - id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: "По последним данным, в Токио солнечно, температура около 24 °C. Прекрасный день с ясным небом."
  shouldScrollToBottom: false
---
::

### Статус {#status}

Пропс `status` показывает индикатор, пока ассистент обрабатывает запрос.

::component-code
---
prettier: true
external:
  - messages
ignore:
  - messages
  - status
hide:
  - shouldScrollToBottom
class: 'overflow-y-auto'
props:
  status: 'submitted'
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Привет, как дела?'
  shouldScrollToBottom: false
---
::

::note
Статусы класса Chat из AI SDK:

- `submitted` — сообщение отправлено в API, ждём начала потока ответа.
- `streaming` — ответ поступает из API потоком, приходят порции данных.
- `ready` — ответ получен и обработан целиком, можно отправлять новое сообщение.
- `error` — при запросе к API произошла ошибка, и он не завершился.
::

### Пользователь {#user}

Пропс `user` меняет пропсы [ChatMessage](/docs/components/chat-message/) у сообщений пользователя (`user`). По умолчанию:

- `side: 'right'`{lang="ts-type"}
- `variant: 'message'`{lang="ts-type"}

::component-code
---
prettier: true
external:
  - messages
ignore:
  - messages
  - avatar.src
  - avatar.loading
hide:
  - shouldScrollToBottom
collapse: true
items:
  user.variant:
    - message
    - event
    - system
  user.side:
    - left
    - right
class: 'overflow-y-auto'
props:
  user:
    side: left
    variant: message
    avatar:
      src: https://github.com/bitrix24.png
      loading: lazy
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Привет, как дела?'
    - id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8'
      role: assistant
      parts:
        - type: 'text'
          text: 'Всё хорошо, спасибо, что спросили! Чем могу помочь?'
    - id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a'
      role: user
      parts:
        - type: 'text'
          text: 'Какая сейчас погода в Токио?'
    - id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: "По последним данным, в Токио солнечно, температура около 24 °C. Прекрасный день с ясным небом."
  shouldScrollToBottom: false
---
::

### Ассистент {#assistant}

Пропс `assistant` меняет пропсы [ChatMessage](/docs/components/chat-message/) у сообщений ассистента (`assistant`). По умолчанию:

- `side: 'left'`{lang="ts-type"}
- `variant: 'message'`{lang="ts-type"}

::component-code
---
prettier: true
external:
  - messages
ignore:
  - messages
  - avatar.src
  - avatar.loading
  - assistant.actions
hide:
  - shouldScrollToBottom
collapse: true
items:
  assistant.variant:
    - message
    - event
    - system
  assistant.side:
    - left
    - right
class: 'overflow-y-auto'
props:
  assistant:
    side: left
    variant: message
    avatar:
      src: '/b24ui/avatar/employee.png'
    actions:
      - label: 'Копировать в буфер обмена'
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Привет, как дела?'
    - id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8'
      role: assistant
      parts:
        - type: 'text'
          text: 'Всё хорошо, спасибо, что спросили! Чем могу помочь?'
    - id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a'
      role: user
      parts:
        - type: 'text'
          text: 'Какая сейчас погода в Токио?'
    - id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: "По последним данным, в Токио солнечно, температура около 24 °C. Прекрасный день с ясным небом."
  shouldScrollToBottom: false
---
::

### Автопрокрутка {#auto-scroll}

Пропс `auto-scroll` настраивает кнопку автопрокрутки, которая появляется при прокрутке чата вверх, или скрывает её (значение `false`). По умолчанию:

- `color: 'air-secondary-no-accent'`{lang="ts-type"}

Для настройки передайте любое свойство компонента [Button](/docs/components/button/).

::component-code
---
prettier: true
collapse: true
external:
  - messages
ignore:
  - messages
  - autoScroll.color
  - shouldScrollToBottom
class: 'overflow-y-auto max-h-[341px] static'
props:
  autoScroll:
    color: air-secondary-no-accent
  shouldScrollToBottom: false
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Привет, как дела?'
    - id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8'
      role: assistant
      parts:
        - type: 'text'
          text: 'Всё хорошо, спасибо, что спросили! Чем могу помочь?'
    - id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a'
      role: user
      parts:
        - type: 'text'
          text: 'Какая сейчас погода в Токио?'
    - id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: "По последним данным, в Токио солнечно, температура около 24 °C. Прекрасный день с ясным небом. По прогнозу на остаток недели, в четверг возможен небольшой дождь, а к выходным температура постепенно поднимется до 28 °C. Влажность умеренная, около 65 %, ветер слабый — 8 км/ч, юго-восточный. Качество воздуха хорошее, индекс 42. Индекс УФ высокий — 7, поэтому на улице лучше пользоваться солнцезащитным кремом. Восход был в 5:24, закат будет в 18:48, так что световой день в Токио сегодня длится около 13 часов 24 минут. Луна сейчас в фазе растущей."
    - id: 'c3e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: user
      parts:
        - type: 'text'
          text: 'Можете посоветовать популярные туристические места в Киото?'
    - id: 'd4f5g8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: 'Киото известен красивыми храмами, традиционными чайными домами и садами. Среди популярных мест — Кинкаку-дзи (Золотой павильон), чья золочёная отделка отражается в зеркальном пруду; святилище Фусими Инари с тысячами киноварных ворот тории, уходящих вверх по склону горы; бамбуковая роща Арасияма, где высокие стебли создают неземную атмосферу; храм Киёмидзу-дэра на склоне холма с панорамным видом на город; и исторический квартал Гион, где можно заметить гейш, спешащих на вечерние встречи по узким мощёным улочкам среди традиционных деревянных домов матия.'
---
::

### Иконка автопрокрутки {#auto-scroll-icon}

Пропс `auto-scroll-icon` задаёт [иконку](https://bitrix24.github.io/b24icons/icons/) кнопки автопрокрутки.

::component-code
---
prettier: true
collapse: true
external:
  - messages
ignore:
  - messages
  - autoScroll.color
  - shouldScrollToBottom
  - autoScrollIcon
cast:
  autoScrollIcon: 'RocketIcon'
class: 'overflow-y-auto max-h-[341px] static'
props:
  autoScrollIcon: 'RocketIcon'
  shouldScrollToBottom: false
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Привет, как дела?'
    - id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8'
      role: assistant
      parts:
        - type: 'text'
          text: 'Всё хорошо, спасибо, что спросили! Чем могу помочь?'
    - id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a'
      role: user
      parts:
        - type: 'text'
          text: 'Какая сейчас погода в Токио?'
    - id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: "По последним данным, в Токио солнечно, температура около 24 °C. Прекрасный день с ясным небом. По прогнозу на остаток недели, в четверг возможен небольшой дождь, а к выходным температура постепенно поднимется до 28 °C. Влажность умеренная, около 65 %, ветер слабый — 8 км/ч, юго-восточный. Качество воздуха хорошее, индекс 42. Индекс УФ высокий — 7, поэтому на улице лучше пользоваться солнцезащитным кремом. Восход был в 5:24, закат будет в 18:48, так что световой день в Токио сегодня длится около 13 часов 24 минут. Луна сейчас в фазе растущей."
    - id: 'c3e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: user
      parts:
        - type: 'text'
          text: 'Можете посоветовать популярные туристические места в Киото?'
    - id: 'd4f5g8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: 'Киото известен красивыми храмами, традиционными чайными домами и садами. Среди популярных мест — Кинкаку-дзи (Золотой павильон), чья золочёная отделка отражается в зеркальном пруду; святилище Фусими Инари с тысячами киноварных ворот тории, уходящих вверх по склону горы; бамбуковая роща Арасияма, где высокие стебли создают неземную атмосферу; храм Киёмидзу-дэра на склоне холма с панорамным видом на город; и исторический квартал Гион, где можно заметить гейш, спешащих на вечерние встречи по узким мощёным улочкам среди традиционных деревянных домов матия.'
---
::

### Автопрокрутка при потоке {#should-auto-scroll}

Пропс `should-auto-scroll` включает и выключает непрерывную прокрутку вниз, пока сообщения приходят потоком. По умолчанию — `false`.

```vue
<template>
  <B24ChatMessages :messages="messages" should-auto-scroll />
</template>
```

### Прокрутка вниз при монтировании {#should-scroll-to-bottom}

Пропс `should-scroll-to-bottom` включает и выключает прокрутку вниз при монтировании компонента. По умолчанию — `true`.

```vue
<template>
  <B24ChatMessages :messages="messages" :should-scroll-to-bottom="false" />
</template>
```

## Примеры {#examples}

::tip{to="/docs/components/chat/"}
Установка, настройка сервера и примеры использования — на обзорной странице **Chat**.
::

### Со слотом indicator {#with-indicator-slot}

Слот `#indicator` настраивает индикатор загрузки, например эффектом [`ChatShimmer`](/docs/components/chat-shimmer/).

::component-example
---
name: 'chat-messages-indicator-slot-example'
class: 'overflow-y-auto'
collapse: true
---
::

### С закреплённым полем ввода {#with-sticky-prompt}

Слот `#footer` закрепляет [ChatPrompt](/docs/components/chat-prompt/) внизу списка. Высота поля измеряется, поэтому у последнего сообщения всегда хватает места, а кнопка автопрокрутки остаётся над полем, даже когда оно растёт.

```vue
<template>
  <B24ChatMessages :messages="messages" :status="status">
    <template #footer>
      <B24ChatPrompt v-model="input" :status="status" @submit="onSubmit">
        <B24ChatPromptSubmit :status="status" @stop="stop()" @reload="regenerate()" />
      </B24ChatPrompt>
    </template>
  </B24ChatMessages>
</template>
```

::note
Слот `#footer` заменяет устаревший пропс `spacing-offset`, которому для закреплённого поля приходилось задавать высоту вручную. Отрисовывайте `B24ChatMessages`, даже если сообщений ещё нет, — тогда поле ввода в подвале остаётся видимым.
::

::tip
Если поле ввода находится вне прокручиваемого контейнера, например в подвале [DashboardPanel](/docs/components/dashboard-panel/) или [Sidebar](/docs/components/sidebar/), закрепите кнопку автопрокрутки у нижнего края контейнера: `:b24ui="{ viewport: 'sticky top-auto bottom-4 h-0' }"`.
::

### С шагами агента {#with-agent-steps}

Слот `#part` отрисовывает каждый шаг агента: [ChatReasoning](/docs/components/chat-reasoning/) — рассуждения, [ChatTool](/docs/components/chat-tool/) — вызовы инструментов и источники, Markdown — ответ. У неудавшегося вызова инструмента задайте пропс `error`, а его вывод отрисуйте компонентами prose.

::component-example
---
name: 'chat-messages-agent-steps-example'
collapse: true
---
::

## API

### Пропсы {#props}

:component-props

### Слоты {#slots}

:component-slots

::tip
Внутри ChatMessages доступны все слоты компонента [`ChatMessage`](/docs/components/chat-message/#slots): они пробрасываются автоматически, поэтому при использовании пропса `messages` можно настроить каждое сообщение. Каждый слот получает также `message` и булево `streaming` — `true` только у последнего сообщения, пока чат в состоянии `submitted` или `streaming`.

```vue{7-9}
<script setup lang="ts">
import { isReasoningUIPart } from 'ai'
</script>

<template>
  <B24ChatMessages :messages="messages" :status="status">
    <template #part="{ part }">
      <B24ChatReasoning v-if="isReasoningUIPart(part)" :text="part.text" />
    </template>
  </B24ChatMessages>
</template>
```
::

### Доступ через ref {#expose}

При обращении к компоненту через ref в шаблоне доступно:

| Имя | Тип |
| ---- | ---- |
| `registerMessageRef(id: string, element: ComponentPublicInstance \| null)`{lang="ts-type"} | `void`{lang="ts-type"} |
| `scrollToBottom(smooth?: boolean)`{lang="ts-type"} | `void`{lang="ts-type"} |
| `scrollToMessage(id: string, smooth?: boolean)`{lang="ts-type"} | `void`{lang="ts-type"} |
| `isAtBottom`{lang="ts-type"} | `Readonly<Ref<boolean>>`{lang="ts-type"} |

## Тема {#theme}

:component-theme
