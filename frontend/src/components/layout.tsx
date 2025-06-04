import * as React from "react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  // Log para depuração
  console.log("Layout sendo renderizado");
  
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {children}
    </div>
  )
}
