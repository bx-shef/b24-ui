<script setup lang="ts">
import ObserverIcon from '@bitrix24/b24icons-vue/outline/ObserverIcon'
import CrossedEyeIcon from '@bitrix24/b24icons-vue/outline/CrossedEyeIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import CircleCrossIcon from '@bitrix24/b24icons-vue/outline/CircleCrossIcon'

const show = ref(false)
const password = ref('')

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: 'Минимум 8 символов' },
    { regex: /\d/, text: 'Минимум 1 цифра' },
    { regex: /[a-z]/, text: 'Минимум 1 строчная буква' },
    { regex: /[A-Z]/, text: 'Минимум 1 заглавная буква' }
  ]

  return requirements.map(req => ({ met: req.regex.test(str), text: req.text }))
}

const strength = computed(() => checkStrength(password.value))
const score = computed(() => strength.value.filter(req => req.met).length)

const color = computed(() => {
  if (score.value === 0) return 'air-primary'
  if (score.value <= 1) return 'air-primary-alert'
  if (score.value <= 2) return 'air-primary-warning'
  if (score.value === 3) return 'air-primary-warning'
  return 'success'
})

const text = computed(() => {
  if (score.value === 0) return 'Введите пароль'
  if (score.value <= 2) return 'Слабый пароль'
  if (score.value === 3) return 'Средний пароль'
  return 'Надёжный пароль'
})
</script>

<template>
  <div class="space-y-2">
    <B24FormField label="Пароль">
      <B24Input
        v-model="password"
        placeholder="Пароль"
        :color="color"
        :type="show ? 'text' : 'password'"
        :aria-invalid="score < 4"
        aria-describedby="password-strength"
        :b24ui="{ trailing: 'pe-1' }"
        class="w-full"
      >
        <template #trailing>
          <B24Button
            size="sm"
            color="air-tertiary-no-accent"
            :icon="show ? CrossedEyeIcon : ObserverIcon"
            :aria-label="show ? 'Скрыть пароль' : 'Показать пароль'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </B24Input>
    </B24FormField>

    <B24Progress
      :color="color"
      :indicator="text"
      :model-value="score"
      :max="4"
      size="sm"
    />

    <p id="password-strength" class="text-(length:--ui-font-size-sm) font-(--ui-font-weight-medium)">
      {{ text }}. Must contain:
    </p>

    <ul class="space-y-1" aria-label="Требования к паролю">
      <li
        v-for="(req, index) in strength"
        :key="index"
        class="flex items-center gap-0.5"
        :class="req.met ? 'text-(--ui-color-accent-main-success)' : 'text-label'"
      >
        <CircleCheckIcon v-if="req.met" class="size-4 shrink-0" />
        <CircleCrossIcon v-else class="size-4 shrink-0" />

        <span class="text-(length:--ui-font-size-xs) font-(--ui-font-weight-light)">
          {{ req.text }}
          <span class="sr-only">
            {{ req.met ? ' — требование выполнено' : ' — требование не выполнено' }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>
