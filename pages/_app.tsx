import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ExperienceProvider } from '@/hooks/useExperienceState'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ExperienceProvider>
      <Component {...pageProps} />
    </ExperienceProvider>
  )
}
