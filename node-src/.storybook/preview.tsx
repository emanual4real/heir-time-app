import type { Preview } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { lightTheme, darkTheme } from '../src/theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const preview: Preview = {
  parameters: {
    actions: {},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },

  decorators: [
    // withThemeFromJSXProvider({
    //   GlobalStyles: CssBaseline,
    //   Provider: ThemeProvider,
    //   themes: {
    //     // Provide your custom themes here
    //     light: lightTheme,
    //     dark: darkTheme
    //   },
    //   defaultTheme: 'light'
    // })
  ]
};

export default preview;
