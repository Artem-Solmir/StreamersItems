import type { RefObject } from 'react'
import { useEffect } from 'react'

const MAX_TILT_DEG = 10

export const useTilt = <T extends HTMLElement>(ref: RefObject<T | null>) => {
  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reducedMotion) {
      return
    }

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const rotateY = ((x / rect.width) * 2 - 1) * MAX_TILT_DEG
      const rotateX = ((y / rect.height) * -2 + 1) * MAX_TILT_DEG

      element.style.transform = `perspective(50rem) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-0.25rem)`
    }

    const onLeave = () => {
      element.style.transform = ''
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)

    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
      element.style.transform = ''
    }
  }, [ref])
}
