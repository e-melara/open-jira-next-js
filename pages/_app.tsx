import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'


import { ligthTheme, darkTheme } from '../themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ligthTheme} >
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider >
  )
  // return <Component {...pageProps} />
}

export default MyApp
