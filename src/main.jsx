import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  colors: {
    discord: ['#5865F2', '#5865F2', '#5865F2', '#5865F2', '#5865F2', '#5865F2', '#5865F2', '#5865F2', '#5865F2', '#5865F2'],
  }
});

createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
)
