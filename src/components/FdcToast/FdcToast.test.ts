import { describe, it, expect, vi, afterEach } from 'vitest'
import { useToast } from '../../composables/useToast'

describe('useToast', () => {
  const { toasts, show, dismiss } = useToast()

  afterEach(() => {
    // La file est un singleton module : on nettoie entre les cas.
    ;[...toasts].forEach((t) => dismiss(t.id))
    vi.useRealTimers()
  })

  it('empile un toast avec ton success par défaut', () => {
    const id = show({ message: 'ok' })
    expect(toasts).toHaveLength(1)
    expect(toasts[0]).toMatchObject({ id, message: 'ok', tone: 'success' })
  })

  it('auto-disparaît après le timeout', () => {
    vi.useFakeTimers()
    show({ message: 'transient', timeout: 4000 })
    expect(toasts).toHaveLength(1)
    vi.advanceTimersByTime(4000)
    expect(toasts).toHaveLength(0)
  })

  it('timeout 0 = persistant (aucune disparition auto)', () => {
    vi.useFakeTimers()
    show({ message: 'sticky', timeout: 0 })
    vi.advanceTimersByTime(60000)
    expect(toasts).toHaveLength(1)
  })

  it('dismiss retire le toast ciblé', () => {
    const id = show({ message: 'a', timeout: 0 })
    show({ message: 'b', timeout: 0 })
    dismiss(id)
    expect(toasts).toHaveLength(1)
    expect(toasts[0].message).toBe('b')
  })
})
