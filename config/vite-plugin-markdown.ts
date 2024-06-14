import type { PluginOption } from 'vite'

import Markdown from 'unplugin-vue-markdown/vite'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from '@shikijs/markdown-it'
import {
  transformerTwoslash,
} from '@shikijs/twoslash'
import { preWrapperPlugin } from '../plugin'

export function VitePluginMarkdown(): PluginOption[] {
  return [
    Markdown({
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true,
      async markdownItSetup(md) {
        // https://prismjs.com/
        md.use(await Shiki({
          defaultColor: false,
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
          transformers: [
            transformerTwoslash({
              explicitTrigger: true,
            }),
          ],
        }))
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
        md.use(preWrapperPlugin)
      },
    }), // https://github.com/antfu/vite-plugin-vue-markdown

  ]
}
