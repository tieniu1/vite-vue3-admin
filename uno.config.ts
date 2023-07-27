// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  // 引入"presetUno"样式和vscode unocss才开始生效, presetAttributify 是可以以属性形式写样式
  presets: [presetUno(), presetAttributify()]
})
