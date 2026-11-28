<script setup lang="ts">
import { ref } from 'vue'
import TrendUpIcon from '@bitrix24/b24icons-vue/outline/TrendUpIcon'
import TrendDownIcon from '@bitrix24/b24icons-vue/outline/TrendDownIcon'
import BusinesProcessStagesIcon from '@bitrix24/b24icons-vue/outline/BusinesProcessStagesIcon'

const openListItem = ref(false)

// Управляем состоянием загрузки
const handleAction = async () => {
  await new Promise(resolve => setTimeout(resolve, 2_000))
}
</script>

<template>
  <B24Slideover
    ref="currentSlideoverRef"
    title="Какой-то список"
    description="Какое-то описание"
    :use-light-content="false"
    :b24ui="{
      content: [
        'sm:max-w-[970px] sm:top-[275px] sm:max-h-[calc(100%-275px)]',
        'air-custom-bg',
        'edge-dark',
        'edge-dark:[--air-theme-bg-color:#7c235b]',
        'edge-dark:[--air-theme-bg-size:cover]',
        'edge-dark:[--air-theme-bg-repeat:no-repeat]',
        'edge-dark:[--air-theme-bg-position:0_0]',
        'edge-dark:[--air-theme-bg-attachment:local]',
        'edge-dark:[--air-theme-bg-image:url(/bg/edge-dark-v2.jpg)]',
        'dark:before:absolute',
        'dark:before:inset-0 dark:before:bg-black/50'
      ].join(' '),
      body: 'scrollbar-thin pt-0'
    }"
  >
    <B24Button label="Какой-то список" color="air-boost" />
    <template #body>
      <B24Card class="base-mode" :b24ui="{ body: '!px-0 !py-0' }">
        <B24TableWrapper
          row-hover
          class="overflow-x-auto w-full"
        >
          <table>
            <!-- шапка -->
            <thead>
              <tr>
                <th>#</th>
                <th>Компания</th>
                <th>Статус</th>
                <th>Сумма (USD)</th>
              </tr>
            </thead>
            <tbody>
              <!-- строка 1 -->
              <tr>
                <th>1</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Tech Innovators Inc.
                  </B24Link>
                </td>
                <td><B24Badge label="Предложение отправлено" use-link use-close /></td>
                <td>50,000</td>
              </tr>
              <!-- строка 2 -->
              <tr>
                <th>2</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Global Solutions Ltd.
                  </B24Link>
                </td>
                <td><B24Badge label="Переговоры" use-link inverted use-close /></td>
                <td>120,000</td>
              </tr>
              <!-- строка 3 -->
              <tr>
                <th>3</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Future Enterprises
                  </B24Link>
                </td>
                <td><B24Chip standalone color="air-primary-warning" text="Договор подписан" size="lg" :trailing-icon="TrendUpIcon" /></td>
                <td>200,000</td>
              </tr>
              <!-- строка 4 -->
              <tr>
                <th>4</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Bright Ideas Co.
                  </B24Link>
                </td>
                <td>
                  <B24Chip
                    standalone
                    text="Первичный контакт"
                    color="air-primary-alert"
                    size="lg"
                    inverted
                    :trailing-icon="TrendDownIcon"
                  />
                </td>
                <td>15,000</td>
              </tr>
              <!-- строка 5 -->
              <tr>
                <th>5</th>
                <td>
                  <B24Link @click="openListItem = true">
                    NextGen Technologies
                  </B24Link>
                </td>
                <td>
                  <B24Chip
                    standalone
                    text="Важно"
                    size="lg"
                    color="air-primary-alert"
                    :b24ui="{ base: 'style-filled-boost' }"
                  />
                </td>
                <td>300,000</td>
              </tr>
              <!-- строка 6 -->
              <tr>
                <th>6</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Apex Dynamics
                  </B24Link>
                </td>
                <td><B24Badge label="Первичный звонок" use-link use-close /></td>
                <td>35,000</td>
              </tr>
              <!-- строка 7 -->
              <tr>
                <th>7</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Vertex Systems
                  </B24Link>
                </td>
                <td><B24Badge label="Предложение отправлено" use-link inverted use-close /></td>
                <td>82,000</td>
              </tr>
              <!-- строка 8 -->
              <tr>
                <th>8</th>
                <td>
                  <B24Link @click="openListItem = true">
                    NovaSphere LLC
                  </B24Link>
                </td>
                <td><B24Chip standalone color="air-primary-success" text="Закрыто успешно" size="lg" :trailing-icon="TrendUpIcon" /></td>
                <td>450,000</td>
              </tr>
              <!-- строка 9 -->
              <tr>
                <th>9</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Stellar Innovations
                  </B24Link>
                </td>
                <td>
                  <B24Chip
                    standalone
                    text="Проверка договора"
                    color="air-primary-warning"
                    size="lg"
                    inverted
                    :trailing-icon="TrendUpIcon"
                  />
                </td>
                <td>175,000</td>
              </tr>
              <!-- строка 10 -->
              <tr>
                <th>10</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Crestline Partners
                  </B24Link>
                </td>
                <td><B24Badge label="Переговоры" use-link use-close /></td>
                <td>95,000</td>
              </tr>
              <!-- строка 11 -->
              <tr>
                <th>11</th>
                <td>
                  <B24Link @click="openListItem = true">
                    OmniCore Solutions
                  </B24Link>
                </td>
                <td>
                  <B24Chip
                    standalone
                    text="Срочно"
                    size="lg"
                    color="air-primary-alert"
                    :b24ui="{ base: 'style-filled-boost' }"
                  />
                </td>
                <td>60,000</td>
              </tr>
              <!-- строка 12 -->
              <tr>
                <th>12</th>
                <td>
                  <B24Link @click="openListItem = true">
                    BlueWave Technologies
                  </B24Link>
                </td>
                <td><B24Badge label="Предложение отправлено" use-link inverted use-close /></td>
                <td>110,000</td>
              </tr>
              <!-- строка 13 -->
              <tr>
                <th>13</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Aspire Group
                  </B24Link>
                </td>
                <td><B24Chip standalone color="air-primary-success" text="Закрыто успешно" size="lg" :trailing-icon="TrendUpIcon" /></td>
                <td>525,000</td>
              </tr>
              <!-- строка 14 -->
              <tr>
                <th>14</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Catalyst Partners
                  </B24Link>
                </td>
                <td>
                  <B24Chip
                    standalone
                    text="Первичный контакт"
                    color="air-primary-alert"
                    size="lg"
                    inverted
                    :trailing-icon="TrendDownIcon"
                  />
                </td>
                <td>28,000</td>
              </tr>
              <!-- строка 15 -->
              <tr>
                <th>15</th>
                <td>
                  <B24Link @click="openListItem = true">
                    Zenith Technologies
                  </B24Link>
                </td>
                <td><B24Badge label="Первичный звонок" use-link use-close /></td>
                <td>42,000</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" class="text-end">
                  Total:
                </th>
                <td>
                  2,387,000
                </td>
              </tr>
            </tfoot>
          </table>
        </B24TableWrapper>
      </B24Card>
    </template>

    <template #footer>
      <B24Button
        size="lg"
        color="air-primary"
        label="Перезагрузить"
        loading-auto
        @click="handleAction"
      />
      <B24ModalDialogClose>
        <B24Button
          size="sm"
          color="air-tertiary"
          label="Отмена"
          :normal-case="false"
        />
      </B24ModalDialogClose>
    </template>
  </B24Slideover>
  <B24Slideover
    v-model:open="openListItem"
    :close="{ label: 'Элемент' }"
    title="Элемент"
    description="Какое-то описание"
    :b24ui="{ content: 'sm:max-w-[965px] sm:top-[375px] sm:max-h-[calc(100%-375px)]' }"
  >
    <template #header>
      <B24Card class="base-mode" :b24ui="{ root: 'w-full', body: 'flex flex-row items-center justify-between gap-[20px]' }">
        <B24Avatar
          :icon="BusinesProcessStagesIcon"
          alt="Рабочие процессы"
          size="2xl"
          :b24ui="{
            root: 'bg-(--ui-color-primary)',
            icon: 'size-[48px] text-(--ui-color-palette-white-base)'
          }"
        />
        <div class="flex-1">
          <ProseH1 class="leading-[29px] font-(--ui-font-weight-light)">
            Рабочие процессы
          </ProseH1>
          <ProseP small accent="less">
            Автоматизируйте рабочие процессы, контролируйте каждый этап и управляйте процессами с телефона.
          </ProseP>
        </div>
      </B24Card>
    </template>
    <template #body>
      <Placeholder class="size-full" />
    </template>
    <template #footer>
      <B24ModalDialogClose>
        <B24Button size="lg" color="air-primary" label="Продолжить" />
      </B24ModalDialogClose>
      <B24ModalDialogClose>
        <B24Button size="sm" color="air-tertiary" label="Отмена" :normal-case="false" />
      </B24ModalDialogClose>
    </template>
  </B24Slideover>
</template>
