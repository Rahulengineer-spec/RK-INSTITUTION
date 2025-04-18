import { useEffect, useCallback } from 'react'

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  action: () => void
}

export function useAccessibility(shortcuts: KeyboardShortcut[]) {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    shortcuts.forEach(({ key, ctrlKey, shiftKey, altKey, action }) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        !!event.ctrlKey === !!ctrlKey &&
        !!event.shiftKey === !!shiftKey &&
        !!event.altKey === !!altKey
      ) {
        event.preventDefault()
        action()
      }
    })
  }, [shortcuts])

  useEffect(() => {
    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyPress)

    // Add skip to main content link
    const skipLink = document.createElement('a')
    skipLink.href = '#main-content'
    skipLink.className = 'skip-link'
    skipLink.textContent = 'Skip to main content'
    document.body.insertBefore(skipLink, document.body.firstChild)

    // Add ARIA landmarks
    const main = document.querySelector('main')
    if (main) {
      main.setAttribute('role', 'main')
      main.id = 'main-content'
    }

    // Add focus styles
    const style = document.createElement('style')
    style.textContent = `
      .skip-link {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0.5rem;
        background: #000;
        color: white;
        text-decoration: none;
        z-index: 100;
        transform: translateY(50px);
        transition: transform 0.3s;
      }
      .skip-link:focus {
        transform: translateY(0);
      }
      *:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
      }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      skipLink.remove()
      style.remove()
    }
  }, [handleKeyPress])
} 