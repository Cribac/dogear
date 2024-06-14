import type { App } from 'vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default (app: App) => {
  app.use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
}
