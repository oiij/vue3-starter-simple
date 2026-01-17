import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  formatters: true,
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: false,
    }],
    'ts/consistent-type-definitions': ['error', 'type'],
  },
  ignores: ['src/assets', 'public'],
})
