import { SxProps, createTheme } from '@mui/material/styles';
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
