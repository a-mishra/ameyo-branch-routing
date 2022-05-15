import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {colors} from './utils/constants'

const outerTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.highlight1
    }
  },
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={outerTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
