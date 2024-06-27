import React, { useState } from 'react';
import './App.css';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import getTheme from './theme';

function App() {
  const [mode,setMode] = useState<PaletteMode>('light')
  const theme = createTheme(getTheme(mode));
  return (
    <Provider store={store}>
      <ThemeProvider theme = {theme}>
        <div className="App">
          <AppRouter/>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
