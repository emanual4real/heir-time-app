import { createTheme } from '@mui/material/styles';
import { buttonArrowStyle } from './theme.styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'left-arrow': true;
    'right-arrow': true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2a9461'
    },
    secondary: {
      main: '#494c7d'
    }
  },
  components: {
    MuiButton: {
      variants: [
        { props: { variant: 'left-arrow' }, style: { ...buttonArrowStyle } },
        { props: { variant: 'right-arrow' }, style: { ...buttonArrowStyle } }
      ]
    }
  }
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2a9461'
    },
    secondary: {
      main: '#494c7d'
    }
  },
  components: {
    ...theme.components
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a83232'
    },
    secondary: {
      main: '#000000'
    }
  },
  components: {
    ...theme.components
  }
});
