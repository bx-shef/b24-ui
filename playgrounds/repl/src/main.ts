import './main.css'

import { createApp } from 'vue'
import b24UiPlugin from '@bxshefby/b24ui-nuxt/vue-plugin'
import App from './App.vue'

const app = createApp(App)

app.use(b24UiPlugin)
app.mount('#app')
