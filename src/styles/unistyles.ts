import { UnistylesRegistry } from 'react-native-unistyles'
import { theme } from './theme'

type AppThemes = {
  theme: typeof theme,
}

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes { }
}

UnistylesRegistry
  .addThemes({
    theme: theme,
  })
  .addConfig({
    adaptiveThemes: true
  })