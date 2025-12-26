import { oiijPreset } from '@oiij/unocss-preset'
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetWebFonts, presetWind3, transformerAttributifyJsx, transformerCompileClass, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetAnimateCSS } from 'unocss-preset-animatecss'
import { presetAnimations } from 'unocss-preset-animations'
import { presetExtra } from 'unocss-preset-extra'
import { presetMagicss } from 'unocss-preset-magicss'
import { presetNaiveUi } from 'unocss-preset-naive-ui'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import presetTheme from 'unocss-preset-theme'

export default defineConfig({
  rules: [

  ],
  shortcuts: {

  },
  presets: [
    presetWind3 (),
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
    // presetDaisy(),
    presetExtra(),
    presetScrollbar(),
    oiijPreset(),
    presetTheme({
      theme: {

      },
    }),
    presetNaiveUi(),
    presetMagicss(),
    presetAnimations(),
    presetAnimateCSS(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributifyJsx(),
    transformerCompileClass(),
  ],
})
