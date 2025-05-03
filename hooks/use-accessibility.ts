/**
 * useAccessibility
 *
 * Adds global keyboard shortcuts, a skip link, ARIA landmarks, and focus styles for accessibility.
 * Only runs on the client. Prevents duplicate skip links/styles. Allows configurable skip link target and className.
 * Optionally announces shortcut activation via ARIA live region.
 *
 * @param shortcuts Array of keyboard shortcut configs
 * @param options Optional config: { skipTarget, skipClassName, announce }
 */
import { useEffect, useCallback } from 'react'

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  action: () => void
  announce?: string // Optional announcement for this shortcut
}

interface AccessibilityOptions {
  skipTarget?: string
  skipClassName?: string
  announce?: boolean
}

export function useAccessibility(
  shortcuts: KeyboardShortcut[],
  options: AccessibilityOptions = {}
) {
  const {
    skipTarget = '#main-content',
    skipClassName = 'skip-link',
    announce = false,
  } = options

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    shortcuts.forEach(({ key, ctrlKey, shiftKey, altKey, action, announce: announceMsg }) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        !!event.ctrlKey === !!ctrlKey &&
        !!event.shiftKey === !!shiftKey &&
        !!event.altKey === !!altKey
      ) {
        event.preventDefault()
        action()
        if (announce && announceMsg) {
          const region = document.getElementById('a11y-announcer')
          if (region) region.textContent = announceMsg
        }
      }
    })
  }, [shortcuts, announce])

  useEffect(() => {
    if (typeof window === 'undefined') return // SSR guard
    window.addEventListener('keydown', handleKeyPress)

    // Prevent duplicate skip link
    let skipLink = document.querySelector(`a.${skipClassName}`) as HTMLAnchorElement | null
    if (!skipLink) {
      skipLink = document.createElement('a')
      skipLink.href = skipTarget
      skipLink.className = skipClassName
      skipLink.textContent = 'Skip to main content'
      document.body.insertBefore(skipLink, document.body.firstChild)
    }

    // Prevent duplicate ARIA live region
    let liveRegion: HTMLDivElement | null = null
    if (announce) {
      liveRegion = document.getElementById('a11y-announcer') as HTMLDivElement | null
      if (!liveRegion) {
        liveRegion = document.createElement('div')
        liveRegion.id = 'a11y-announcer'
        liveRegion.setAttribute('aria-live', 'polite')
        liveRegion.setAttribute('role', 'status')
        liveRegion.style.position = 'absolute'
        liveRegion.style.left = '-9999px'
        document.body.appendChild(liveRegion)
      }
    }

    // Add ARIA landmarks
    try {
      const main = document.querySelector('main')
      if (main) {
        main.setAttribute('role', 'main')
        main.id = skipTarget.replace('#', '')
      }
    } catch (e) {
      // Fail gracefully
    }

    // Prevent duplicate style
    let style = document.getElementById('a11y-skip-style') as HTMLStyleElement | null
    if (!style) {
      style = document.createElement('style')
      style.id = 'a11y-skip-style'
      style.textContent = `
        .${skipClassName} {
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
        .${skipClassName}:focus {
          transform: translateY(0);
        }
        *:focus {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }
      `
      document.head.appendChild(style)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      // Only remove skip link/style if we created them
      if (skipLink && skipLink.parentElement === document.body) skipLink.remove()
      if (style && style.parentElement === document.head) style.remove()
      if (announce && liveRegion && liveRegion.parentElement === document.body) liveRegion.remove()
    }
  }, [handleKeyPress, skipTarget, skipClassName, announce])
} 