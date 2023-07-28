// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  // 引入"presetUno"样式和vscode unocss才开始生效, presetAttributify 是可以以属性形式写样式
  presets: [presetUno(), presetAttributify()],
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#3490dc',
      secondary: '#ffed4a',
      danger: '#e3342f',
      skyBlue: '#8db9f5',
    }),
  },
  // 静态规则
  rules: [
    ['border-b-1', { 'border-bottom': '1px solid rgba(156, 163, 175,0.5 )' }],

    [
      'flex-column',
      {
        display: 'flex',
        'flex-direction': 'column',
      },
    ],
    [
      'flex-between',
      {
        display: 'flex',
        'justify-content': 'space-between',
      },
    ],
    [
      'flex-column-between',
      {
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'space-between',
      },
    ],
    [
      'flex-column-center',
      {
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
      },
    ],
    [
      'flex-center-between',
      {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
      },
    ],
    [
      'flex-center-center',
      {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
      },
    ],
    [
      'flex-items-center',
      {
        display: 'flex',
        'align-items': 'center',
      },
    ],
  ],
});
