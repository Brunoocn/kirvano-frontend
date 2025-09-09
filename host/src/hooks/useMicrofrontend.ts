import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { MICROFRONTEND_EVENTS } from '../constants/microfrontend'

interface MicrofrontendConfig {
  appId: string
  appLoader: (id: string) => void | Promise<void>
  onLogoutError?: () => void
  onTokenRenew?: (event: CustomEvent) => void
}

export function useMicrofrontend({
  appId,
  appLoader,
  onLogoutError,
  onTokenRenew,
}: MicrofrontendConfig) {
  const { logout } = useAuth()

  useEffect(() => {
    const handleLogoutError = () => {
      onLogoutError?.()
      logout()
    }

    const handleTokenRenew = (event: CustomEvent) => {
      onTokenRenew?.(event)
    }

    const addEventListeners = () => {
      window.addEventListener(MICROFRONTEND_EVENTS.LOGOUT_ERROR, handleLogoutError)
      window.addEventListener(MICROFRONTEND_EVENTS.RENEW_TOKEN, handleTokenRenew as EventListener)
    }

    const removeEventListeners = () => {
      window.removeEventListener(MICROFRONTEND_EVENTS.LOGOUT_ERROR, handleLogoutError)
      window.removeEventListener(MICROFRONTEND_EVENTS.RENEW_TOKEN, handleTokenRenew as EventListener)
    }

    const loadMicrofrontend = async () => {
      try {
        await appLoader(appId)
      } catch (error) {
        console.error(`Error loading ${appId}:`, error)
      }
    }

    addEventListeners()
    loadMicrofrontend()

    return removeEventListeners
  }, [appId, appLoader, logout, onLogoutError, onTokenRenew])
}