import { createApp } from 'vue'
import AppVue from './App.vue'
import EnumPlugin from './enums'

const app = createApp(AppVue)

app.use(EnumPlugin)

app.mount('#app')
