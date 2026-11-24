<script setup lang="ts">
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import TagIcon from '@bitrix24/b24icons-vue/outline/TagIcon'
import StageIcon from '@bitrix24/b24icons-vue/outline/StageIcon'

const toast = useToast()

const groups = ref([
  {
    id: 'users',
    label: 'Пользователи',
    items: [
      {
        label: 'Имя ассистента',
        suffix: 'assistant',
        to: 'https://github.com/bitrix24',
        target: '_blank',
        avatar: {
          src: '/b24ui/avatar/assistant.png',
          loading: 'lazy' as const
        }
      },
      {
        label: 'Bitrix24',
        suffix: 'bitrix24',
        to: 'https://github.com/bitrix24',
        target: '_blank',
        avatar: {
          src: 'https://github.com/bitrix24.png',
          loading: 'lazy' as const
        }
      },
      {
        label: 'Имя сотрудника',
        suffix: 'employee',
        to: 'https://github.com/bitrix24',
        target: '_blank',
        avatar: {
          src: '/b24ui/avatar/employee.png',
          loading: 'lazy' as const
        }
      }
    ]
  },
  {
    id: 'actions',
    items: [
      {
        label: 'Добавить новый файл',
        suffix: 'Создать новый файл в текущей папке или рабочем пространстве.',
        icon: FileUploadIcon,
        kbds: [
          'meta',
          'I'
        ],
        onSelect() {
          toast.add({ title: 'Добавить новый файл' })
        }
      },
      {
        label: 'Добавить новую папку',
        suffix: 'Создать новую папку в текущей папке или рабочем пространстве.',
        icon: FolderPlusIcon,
        kbds: [
          'meta',
          'F'
        ],
        onSelect() {
          toast.add({ title: 'Добавить новую папку' })
        }
      },
      {
        label: 'Добавить хештег',
        suffix: 'Добавить хештег к текущему элементу.',
        icon: TagIcon,
        kbds: [
          'meta',
          'H'
        ],
        onSelect() {
          toast.add({ title: 'Добавить хештег' })
        }
      },
      {
        label: 'Добавить метку',
        suffix: 'Добавить метку к текущему элементу.',
        icon: StageIcon,
        kbds: [
          'meta',
          'L'
        ],
        onSelect() {
          toast.add({ title: 'Добавить метку' })
        }
      }
    ]
  }
])

function onSelect(item: any) {
  console.log(item)
}
</script>

<template>
  <B24CommandPalette
    :groups="groups"
    class="flex-1 h-80"
    @update:model-value="onSelect"
  />
</template>
