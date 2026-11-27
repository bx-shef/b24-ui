<script setup lang="ts">
import type { FooterColumn } from '@bxshefby/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const columns: FooterColumn[] = [
  {
    label: 'Сообщество',
    children: [
      {
        label: 'Bitrix24 на GitHub',
        to: 'https://github.com/bitrix24',
        icon: GitHubIcon,
        target: '_blank'
      }
    ]
  },
  {
    label: 'Решения',
    children: [
      {
        label: 'Bitrix24 JsSdk',
        to: 'https://bitrix24.github.io/b24jssdk/',
        target: '_blank'
      },
      {
        label: 'Иконки Bitrix24',
        to: 'https://bitrix24.github.io/b24icons/',
        target: '_blank'
      },
      {
        label: 'Bitrix24 UI',
        to: 'https://bitrix24.github.io/b24ui/',
        target: '_blank'
      }
    ]
  }
]
</script>

<template>
  <B24FooterColumns :columns="columns">
    <template #right>
      <B24FormField name="email" label="Подписаться на нашу рассылку" size="lg">
        <B24Input type="email" class="w-full">
          <template #trailing>
            <B24Button type="submit" size="xs" label="Подписаться" />
          </template>
        </B24Input>
      </B24FormField>
    </template>
  </B24FooterColumns>
</template>
