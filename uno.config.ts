import { oiijPreset } from '@oiij/unocss-preset'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerAttributifyJsx,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'
import { presetExtra } from 'unocss-preset-extra'
import { presetMagicss } from 'unocss-preset-magicss'
import { presetNaiveUi } from 'unocss-preset-naive-ui'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import { presetTailwindMotion } from 'unocss-preset-tailwindcss-motion'
import presetTheme from 'unocss-preset-theme'

export default defineConfig({
  rules: [

  ],
  shortcuts: {

  },
  presets: [
    presetUno(),
    presetAttributify({}),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetExtra(),
    presetScrollbar(),
    oiijPreset(),
    presetTheme({
      theme: {

      },
    }),
    presetNaiveUi(),
    presetTailwindMotion(),
    presetMagicss(),
    presetAnimations(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributifyJsx(),
    transformerCompileClass(),
  ],
})
