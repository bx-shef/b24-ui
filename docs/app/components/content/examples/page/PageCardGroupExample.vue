<script setup lang="ts">
import TelephonyHandset1Icon from '@bitrix24/b24icons-vue/main/TelephonyHandset1Icon'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/main/FeedbackIcon'
import DocumentStreamIcon from '@bitrix24/b24icons-vue/main/DocumentStreamIcon'
import CartWithCursorIcon from '@bitrix24/b24icons-vue/main/CartWithCursorIcon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'
import PictureIcon from '@bitrix24/b24icons-vue/main/PictureIcon'

const items = [
  { value: 'callback', category: 'Customer communications', icon: TelephonyHandset1Icon, label: 'Обратный звонок', description: 'Записать номер телефона и начать обратный звонок' },
  { value: 'contacts', category: 'Customer communications', icon: MailIcon, label: 'Контактные данные', description: 'Собрать телефон, email и имя клиента' },
  { value: 'feedback', category: 'Customer communications', icon: FeedbackIcon, label: 'Обратная связь', description: 'Сбор отзывов клиентов' },
  { value: 'multi', category: 'Customer communications', icon: DocumentStreamIcon, label: 'Многостраничная форма', description: 'Разбивка длинной формы на несколько страниц' },
  { value: 'no-image', category: 'Sales', icon: CartWithCursorIcon, label: 'Товары без изображений', description: 'Заказ товара без изображения' },
  { value: 'pay', category: 'Sales', icon: CreditDebitCardIcon, label: 'Товары с оплатой', description: 'Оплата товара прямо из формы' },
  { value: 'small-img', category: 'Sales', icon: PictureIcon, label: 'Товары с маленьким фото', description: 'Заказ товара с небольшой миниатюрой' }
]

const value = ref('contacts')
</script>

<template>
  <B24PageCardGroup v-model="value" :items="items" />
</template>
