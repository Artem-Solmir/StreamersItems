import { useCallback, useRef } from 'react'
import { useInventoryUiStore } from '@/features/items/store/useInventoryUiStore'

const playCollectSound = (ctx: AudioContext) => {
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(880, ctx.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(
    1320,
    ctx.currentTime + 0.06,
  )

  gain.gain.setValueAtTime(0.0001, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)

  oscillator.connect(gain)
  gain.connect(ctx.destination)
  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + 0.12)
}

export const useUiClickSound = () => {
  const soundEnabled = useInventoryUiStore((state) => state.soundEnabled)
  const contextRef = useRef<AudioContext | null>(null)

  const playCollect = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') {
      return
    }

    try {
      if (!contextRef.current) {
        contextRef.current = new AudioContext()
      }
      const ctx = contextRef.current
      if (ctx.state === 'suspended') {
        void ctx.resume()
      }
      playCollectSound(ctx)
    } catch {
      // Autoplay policies or missing Web Audio — ignore silently.
    }
  }, [soundEnabled])

  return { playCollect }
}
