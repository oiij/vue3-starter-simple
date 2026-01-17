// https://github.com/jevon617/unplugin-svg-component
import { resolve } from 'node:path'
import UnpluginSvgComponent from 'unplugin-svg-component/vite'

export default UnpluginSvgComponent({
  iconDir: resolve(__dirname, '../src/assets/icons'),
  preserveColor: resolve(__dirname, '../src/assets/icons'),
  dts: true,
  prefix: 'icon',
  domInsertionStrategy: 'dynamic',
  symbolIdFormatter: (svgName: string, prefix: string): string => {
    const nameArr = svgName.split('/')
    if (prefix)
      nameArr.unshift(prefix)
    return nameArr.join('-').replace(/\.svg$/, '')
  },
})
