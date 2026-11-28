<script setup lang="ts">
import CirclePlusIcon from '@bitrix24/b24icons-vue/outline/CirclePlusIcon'
import FileUploadIcon from '@bitrix24/b24icons-vue/main/FileUploadIcon'
import FolderPlusIcon from '@bitrix24/b24icons-vue/outline/FolderPlusIcon'
import AddProductIcon from '@bitrix24/b24icons-vue/outline/AddProductIcon'
import ShareIcon from '@bitrix24/b24icons-vue/button/ShareIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import MailSendIcon from '@bitrix24/b24icons-vue/outline/MailSendIcon'
import Share2Icon from '@bitrix24/b24icons-vue/main/Share2Icon'
import TwitterIcon from '@bitrix24/b24icons-vue/common-service/TwitterIcon'
import TelegramIcon from '@bitrix24/b24icons-vue/social/TelegramIcon'
import SettingsLIcon from '@bitrix24/b24icons-vue/outline/SettingsLIcon'
import Filter1Icon from '@bitrix24/b24icons-vue/main/Filter1Icon'
import PaletteIcon from '@bitrix24/b24icons-vue/outline/PaletteIcon'
import ShieldIcon from '@bitrix24/b24icons-vue/outline/ShieldIcon'

const toast = useToast()

const groups = [{
  id: 'actions',
  label: 'Действия',
  items: [
    {
      label: 'Создать',
      icon: CirclePlusIcon,
      children: [
        {
          label: 'Новый файл',
          icon: FileUploadIcon,
          suffix: 'Создать новый файл в текущей папке',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Новый файл создан!' })
          },
          kbds: ['meta', 'I']
        },
        {
          label: 'Новая папка',
          icon: FolderPlusIcon,
          suffix: 'Создать новую папку в текущей папке',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Новая папка создана!' })
          },
          kbds: ['meta', 'F']
        },
        {
          label: 'Новый проект',
          icon: AddProductIcon,
          suffix: 'Создать новый проект из шаблона',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Новый проект создан!' })
          },
          kbds: ['meta', 'P']
        }
      ]
    },
    {
      label: 'Поделиться',
      icon: ShareIcon,
      children: [
        {
          label: 'Копировать ссылку',
          icon: LinkIcon,
          suffix: 'Скопировать ссылку на текущий элемент',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Ссылка скопирована в буфер обмена!' })
          },
          kbds: ['meta', 'L']
        },
        {
          label: 'Поделиться по email',
          icon: MailSendIcon,
          suffix: 'Поделиться текущим элементом по email',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Диалог отправки по email открыт!' })
          }
        },
        {
          label: 'Поделиться в соцсетях',
          icon: Share2Icon,
          suffix: 'Поделиться текущим элементом в соцсетях',
          children: [
            {
              label: 'Twitter',
              icon: TwitterIcon,
              onSelect(e: Event) {
                e.preventDefault()
                toast.add({ title: 'Отправлено в Twitter!' })
              }
            },
            {
              label: 'Telegram',
              icon: TelegramIcon,
              onSelect(e: Event) {
                e.preventDefault()
                toast.add({ title: 'Отправлено в Telegram!' })
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Настройки',
      icon: SettingsLIcon,
      children: [
        {
          label: 'Общие',
          icon: Filter1Icon,
          suffix: 'Настроить общие параметры',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Общие настройки открыты!' })
          }
        },
        {
          label: 'Внешний вид',
          icon: PaletteIcon,
          suffix: 'Настроить внешний вид',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Настройки внешнего вида открыты!' })
          }
        },
        {
          label: 'Безопасность',
          icon: ShieldIcon,
          suffix: 'Управление настройками безопасности',
          onSelect(e: Event) {
            e.preventDefault()
            toast.add({ title: 'Настройки безопасности открыты!' })
          }
        }
      ]
    }
  ]
}]
</script>

<template>
  <B24CommandPalette :groups="groups" class="flex-1" />
</template>
