import type { Ref } from 'vue'
import type { GlobalThemeOverrides } from 'naive-ui'
import {
  darkTheme,
  dateEnUS,
  dateZhCN,
  enUS,
  zhCN,
} from 'naive-ui'
import { colord } from 'colord'

interface Color {
  primary: string
  info: string
  success: string
  warning: string
  error: string
}
function getStatusColor(color = '#ff461f') {
  return {
    color,
    hover: colord(color).lighten(0.1).toHex(),
    pressed: colord(color).darken(0.1).toHex(),
    suppl: colord(color).lighten(0.1).toHex(),
  }
}
const { language } = useLanguage()

const color = ref<Color>({
  primary: '#64748B',
  info: '#06b6d4',
  success: '#10b981',
  warning: '#fbbf24',
  error: '#f43f5e',
})
function setColor(v: Color) {
  color.value = v
}
const theme = computed(() => {
  return isDark.value ? darkTheme : undefined
})
const themeOverrides: Ref<GlobalThemeOverrides> = computed(() => {
  return {
    common: {
      bodyColor: isDark.value ? '#1f1f1f' : '#f5f5f5',
      primaryColor: color.value.primary,
      primaryColorHover: getStatusColor(color.value.primary).hover,
      primaryColorPressed: getStatusColor(color.value.primary).pressed,
      primaryColorSuppl: getStatusColor(color.value.primary).suppl,
      infoColor: color.value.info,
      infoColorHover: getStatusColor(color.value.info).hover,
      infoColorPressed: getStatusColor(color.value.info).pressed,
      infoColorSuppl: getStatusColor(color.value.info).suppl,
      successColor: color.value.success,
      successColorHover: getStatusColor(color.value.success).hover,
      successColorPressed: getStatusColor(color.value.success).pressed,
      successColorSuppl: getStatusColor(color.value.success).suppl,
      warningColor: color.value.warning,
      warningColorHover: getStatusColor(color.value.warning).hover,
      warningColorPressed: getStatusColor(color.value.warning).pressed,
      warningColorSuppl: getStatusColor(color.value.warning).suppl,
      errorColor: color.value.error,
      errorColorHover: getStatusColor(color.value.error).hover,
      errorColorPressed: getStatusColor(color.value.error).pressed,
      errorColorSuppl: getStatusColor(color.value.error).suppl,
    },
  }
})
const locale = computed(() => {
  switch (language.value as 'en' | 'cn') {
    case 'en':
      return enUS
    case 'cn':
      return zhCN
    default:
      return undefined
  }
})
const dateLocale = computed(() => {
  switch (language.value as 'en' | 'cn') {
    case 'en':
      return dateEnUS
    case 'cn':
      return dateZhCN
    default:
      return undefined
  }
})
export function useNaiveTheme() {
  return {
    theme,
    themeOverrides,
    locale,
    dateLocale,
    color,
    setColor,
  }
}
