---
title: useSpeechRecognition
description: Композабл распознавания речи на основе Web Speech API.
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useSpeechRecognition.ts
  - label: Демо
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/textarea
---

## Использование {#usage}

Автоимпортируемый композабл `useSpeechRecognition` добавляет в браузер распознавание речи на основе [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

```vue
<script setup lang="ts">
const appLocale = useLocale()

const {
  state,
  isAvailable,
  isListening,
  start,
  stop,
  toggle,
  setLanguage
} = useSpeechRecognition(
  {
    lang: appLocale.locale.value.locale,
    continuous: true,
    interimResults: true
  },
  {
    onStart: () => console.log('Recognition started'),
    onEnd: () => console.log('Recognition ended'),
    onError: (error) => console.error('Error:', error),
    onResult: (result) => console.log('Result:', result.text)
  }
)
</script>
```

## API

### Параметры {#parameters}

`useSpeechRecognition(options?: SpeechRecognitionOptions, events?: SpeechRecognitionEvents)`{lang="ts-type"}

Создаёт экземпляр распознавания речи с заданными параметрами и обработчиками событий.

**options:**

::field-group

  ::field{name="lang" type="string"}
  Язык распознавания. По умолчанию `'en-US'`.
  ::
  
  ::field{name="continuous" type="boolean"}
  Непрерывное распознавание. Если `true`, распознавание продолжается, пока его явно не остановят. По умолчанию `true`.
  ::
  
  ::field{name="interimResults" type="boolean"}
  Показывать промежуточные результаты. По умолчанию `true`.
  ::
  
  ::field{name="maxAlternatives" type="number"}
  Максимальное число вариантов для каждого результата. По умолчанию `1`.
  ::

::

**events:**

::field-group

  ::field{name="onStart" type="() => void"}
  Вызывается при начале распознавания.
  ::
  
  ::field{name="onEnd" type="() => void"}
  Вызывается при завершении распознавания.
  ::
  
  ::field{name="onError" type="(error: string) => void"}
  Вызывается при ошибке распознавания.
  ::
  
  ::field{name="onResult" type="(result: SpeechRecognitionResult) => void"}
  Вызывается при получении результата распознавания.
  ::

::

`useSpeechRecognition` возвращает объект со следующими свойствами:

### state

`state: DeepReadonly<Ref<SpeechRecognitionState>>`{lang="ts-type"}

Текущее состояние распознавания речи.

::field-group

  ::field{name="isAvailable" type="boolean"}
  Доступно ли распознавание речи в текущем браузере.
  ::
  
  ::field{name="isListening" type="boolean"}
  Идёт ли распознавание сейчас.
  ::
  
  ::field{name="lastRecognizedText" type="string"}
  Последний распознанный текст (в непрерывном режиме накапливается).
  ::

::

### isAvailable

`isAvailable: ComputedRef<boolean>`{lang="ts-type"}

Вычисляемое свойство: доступно ли распознавание речи.

### isListening

`isListening: ComputedRef<boolean>`{lang="ts-type"}

Вычисляемое свойство: идёт ли распознавание.

### start()

`start(): Promise<boolean>`{lang="ts-type"}

Запускает распознавание речи.

**Возвращает:** `Promise<boolean>`: `true`, если распознавание запустилось, иначе `false`.

### stop()

`stop(): Promise<boolean>`{lang="ts-type"}

Останавливает распознавание речи.

**Возвращает:** `Promise<boolean>`: `true`, если распознавание остановилось, иначе `false`.

### toggle()

`toggle(): Promise<boolean>`{lang="ts-type"}

Переключает состояние распознавания (запуск или остановка).

**Возвращает:** `Promise<boolean>`: `true`, если операция выполнена, иначе `false`.

### setLanguage()

`setLanguage(lang: string): boolean`{lang="ts-type"}

Задаёт язык распознавания.

::field-group

  ::field{name="lang" type="string" required}
  Код языка в формате BCP 47 (например, `'ru-RU'`, `'en-US'`).
  ::

::

**Возвращает:** `boolean`: `true`, если язык установлен, иначе `false`.

### recognizer

`recognizer: SpeechRecognition | undefined`{lang="ts-type"}

Экземпляр распознавания Web Speech API для расширенного использования.

## Пример {#example}

Распознанный текст можно подставлять в компонент [Textarea](/docs/components/textarea/) или [Input](/docs/components/input/).

::component-example
---
collapse: true
name: 'use-speech-recognition-example'
---
::
