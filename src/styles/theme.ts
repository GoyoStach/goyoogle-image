
import { extendTheme, theme as base ,type ThemeConfig } from '@chakra-ui/react'
import "@fontsource/silkscreen"
import "@fontsource/m-plus-1p"

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme(
  { 
  config,
  fonts: {
    heading: `Silkscreen, ${base.fonts.heading}`,
    body: `M PLUS 1p, ${base.fonts.body}`,
  },
},
)

export default theme