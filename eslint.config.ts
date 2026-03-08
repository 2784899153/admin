import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  }, // 校验范围

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']), // 全局忽略

  ...pluginVue.configs['flat/essential'], // 基础校验
  vueTsConfigs.recommended,

  // --- 在这里添加你的自定义规则 --- 0 1 2
  {
    name: 'app/custom-rules',
    rules: {
      'vue/multi-word-component-names': 'off', // 如果你不喜欢强制要求组件名必须是多单词
    },
  },

  skipFormatting, // 解决代码格式化冲突
)
