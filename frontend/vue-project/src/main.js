import bootstrapMin from 'bootstrap/dist/js/bootstrap.min'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import './assets/main.css'

import bootstrap from './bootstrap'
const app = createApp(App)

// configurações do bootstrap
app.use(bootstrap)
app.use(bootstrapMin)
app.use(router)

app.mount('#app')
