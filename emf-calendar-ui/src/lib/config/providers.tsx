import { Provider } from 'react-redux';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { falseReducer } from '../store';
import { responsiveFontSizes, ThemeOptions ,createTheme} from '@mui/material/styles';
import { BaseAppProviderProps } from '../common/types';
import { ThemeProviders } from '../common';
export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#163B3A',
      light:'#468782',
      dark:'#699f9b',

    },
    secondary: {
      main: '#BC535E',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: 'Space Grotesk',
      },
    },
  },
  typography: {
    fontFamily: 'Space Grotesk',
    h1: {
      fontFamily: 'Space Grotesk',
    },
    h2: {
      fontFamily: 'Space Grotesk',
    },
    subtitle1: {
      fontFamily: 'Montserrat',
    },
    h6: {
      fontFamily: 'Space Grotesk',
    },
    h5: {
      fontFamily: 'Space Grotesk',
    },
    h4: {
      fontFamily: 'Space Grotesk',
    },
    h3: {
      fontFamily: 'Space Grotesk',
    },
    subtitle2: {
      fontFamily: 'Montserrat',
    },
    body1: {
      fontFamily: 'Montserrat',
    },
    body2: {
      fontFamily: 'Montserrat',
    },
    button: {
      fontFamily: 'Space Grotesk',
      fontWeight: 700,
    },
    caption: {
      fontFamily: 'Montserrat',
    },
    overline: {
      fontFamily: 'Montserrat',
    },
  },
};
export const muiTheme = responsiveFontSizes(
  createTheme(themeOptions)
);

// redux config
const reducer = {
  falseEntity: falseReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {},
  enhancers: [],
});

export function CustomProviders(props: BaseAppProviderProps) {
  return (
    <ThemeProviders theme={muiTheme}>



      <Provider store={store}>{props.children}</Provider>
    </ThemeProviders>
  );
}
