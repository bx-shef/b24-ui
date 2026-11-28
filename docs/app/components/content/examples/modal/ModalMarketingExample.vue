<script setup lang="ts">
import type { NavigationMenuItem } from '@bxshefby/b24ui-nuxt'
import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/main/CircleCheckIcon'

const open = ref(false)

const benefits: NavigationMenuItem[] = [
  { label: 'Неограниченное число отслеживаемых линий', icon: CircleCheckIcon },
  { label: 'AI-поиск дефектов в потоках с камер', icon: CircleCheckIcon }
]
</script>

<template>
  <B24Modal
    v-model:open="open"
    title=""
    description=""
    :close="false"
    scrollable
    :b24ui="{
      content: 'sm:max-w-[788px] bg-[radial-gradient(110.42%_110.42%_at_-10.42%_31.25%,var(--ui-color-design-filled-boost-bg-gradient-1)_0%,var(--ui-color-design-filled-boost-bg-gradient-2)_58.65%,var(--ui-color-design-filled-boost-bg-gradient-3)_100%)]',
      body: 'relative p-6 md:p-8'
    }"
  >
    <B24Button label="Открыть маркетинговое окно" color="air-secondary-accent" />

    <template #body>
      <div class="flex flex-col md:flex-row gap-6 min-h-full">
        <div class="flex-1 flex flex-col gap-3 text-white">
          <h2 class="text-2xl font-semibold leading-snug">
            Не останавливайте производство — пробный период Pro закончится через 6 дней
          </h2>
          <p class="text-white/85">
            Pro открывает OEE в реальном времени по каждой линии, 90 дней исторической
            аналитики, AI-поиск дефектов в потоках с камер и предупреждения
            о предиктивном обслуживании. Команды на Pro выпускают на 12% больше единиц за смену
            в среднем.
          </p>
          <B24Link to="#" class="inline-flex text-white underline">
            Сравнить тарифы
          </B24Link>

          <div class="flex flex-wrap items-center gap-2 mt-auto pt-4">
            <B24Button
              label="Перейти на Pro"
              color="air-primary"
              size="lg"
              :trailing-icon="ArrowRightLIcon"
            />
            <B24ModalDialogClose>
              <B24Button label="Напомнить позже" color="air-tertiary-accent" />
            </B24ModalDialogClose>
          </div>
        </div>

        <div class="md:w-80 shrink-0">
          <B24Card
            variant="tinted-no-accent"
            :b24ui="{
              header: 'flex items-center justify-between gap-2',
              body: 'space-y-4'
            }"
          >
            <template #header>
              <span class="font-semibold whitespace-nowrap">Production Insights · Pro</span>
              <B24Badge label="Рекомендуется" color="air-primary" size="xs" class="shrink-0" />
            </template>

            <div>
              <div class="text-3xl font-semibold leading-none">
                +12%
              </div>
              <div class="text-sm text-description mt-1">
                средний рост производительности после перехода
              </div>
            </div>

            <div class="space-y-1">
              <B24Progress :model-value="24" :max="30" color="air-primary" size="sm" />
              <div class="text-xs text-description">
                Пробный период: использовано 24 из 30 дней
              </div>
            </div>

            <B24NavigationMenu
              orientation="vertical"
              :items="benefits"
              :b24ui="{ link: 'px-2 py-1.5', linkLeadingIcon: 'text-primary' }"
            />
          </B24Card>
        </div>
      </div>
    </template>
  </B24Modal>
</template>
