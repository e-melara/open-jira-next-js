import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { darkTheme } from '../themes'

import { UIProvider } from '../context/UI'
import { EntriesProvider } from '../context/entries'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme} >
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider >
      </UIProvider>
    </EntriesProvider>
  )
  // return <Component {...pageProps} />
}

export default MyApp
