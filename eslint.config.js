import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  formatters: true,
  vue: {
    componentNameCasing: 'PascalCase',
  },
  rules: {
    'ts/consistent-type-definitions': ['error', 'type'],
  },
  ignores: ['src/assets', 'public'],
})
