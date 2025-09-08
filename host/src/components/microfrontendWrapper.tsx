import { Suspense } from 'react'
import type { ReactNode } from 'react'

interface MicrofrontendWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function MicrofrontendWrapper({ 
  children, 
  fallback = (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Carregando microfrontend...</p>
      </div>
    </div>
  )
}: MicrofrontendWrapperProps) {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}