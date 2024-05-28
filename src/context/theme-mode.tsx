'use client'

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

export default function ThemeModeProvider({ children }: { children: ReactNode }) {
	return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  )
}