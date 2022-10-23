import { useState, useCallback, useLayoutEffect } from 'react'

const debounce = (limit: number, callback: () => void) => {
  let timeoutId: string | number | NodeJS.Timeout | undefined
  return (...args: unknown[]) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(callback, limit, args)
  }
}

const getDimensionObject = (node: HTMLElement) => {
  const rect = node.getBoundingClientRect()
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width,
    x: rect.x,
    y: rect.y
  }
}

export const useBoundingRect = (limit: number) => {
  const [dimensions, setDimensions] = useState({})
  const [node, setNode] = useState<HTMLElement | null>(null)

  const ref = useCallback((node: HTMLElement | null) => {
    setNode(node)
  }, [])

  useLayoutEffect(() => {
    if ('undefined' !== typeof window && node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node))
        )

      measure()

      const listener = debounce(limit ? limit : 100, measure)

      window.addEventListener('resize', listener)
      window.addEventListener('scroll', listener)
      return () => {
        window.removeEventListener('resize', listener)
        window.removeEventListener('scroll', listener)
      }
    }
  }, [node, limit])

  return [ref, dimensions, node]
}
