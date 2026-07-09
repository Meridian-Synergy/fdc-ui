import { reactive } from 'vue'

// File de toasts partagée (singleton au niveau module) : un seul host <FdcToast/>
// monté dans le layout de l'app lit cette même liste. Toute page appelle
// `useToast().show(...)` pour un feedback transient (patron snackbar mobile).

export type ToastTone = 'info' | 'success' | 'warn' | 'danger'

export interface ToastItem {
  id: number
  message: string
  tone: ToastTone
  actionLabel?: string
  onAction?: () => void
}

export interface ToastOptions {
  message: string
  tone?: ToastTone
  /** Durée avant auto-disparition, en ms. `0` = persistant (fermeture manuelle). */
  timeout?: number
  actionLabel?: string
  onAction?: () => void
}

const toasts = reactive<ToastItem[]>([])
const timers = new Map<number, ReturnType<typeof setTimeout>>()
let seq = 0

export function useToast() {
  function dismiss(id: number) {
    const i = toasts.findIndex((t) => t.id === id)
    if (i !== -1) toasts.splice(i, 1)
    const tm = timers.get(id)
    if (tm) {
      clearTimeout(tm)
      timers.delete(id)
    }
  }

  function show(opts: ToastOptions): number {
    const id = ++seq
    toasts.push({
      id,
      message: opts.message,
      tone: opts.tone ?? 'success',
      actionLabel: opts.actionLabel,
      onAction: opts.onAction,
    })
    const timeout = opts.timeout ?? 4000
    if (timeout > 0) timers.set(id, setTimeout(() => dismiss(id), timeout))
    return id
  }

  return { toasts, show, dismiss }
}
