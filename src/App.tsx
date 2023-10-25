import PlaygroundPage from './features/draw'
import { ThemeProvider } from './context/theme-provider'

function App () {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-full w-full h-full bg-gradient-to-r from-background/90 to-muted/50  dark:bg-hero-pattern bg-hero-pattern2">
        <PlaygroundPage />
      </div>
    </ThemeProvider>
  )
}

export default App
