import { useState, useEffect } from 'react'
import useEvent from 'react-use-event-hook'

export const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const onScroll = useEvent(() => {
    const position = window.pageYOffset
    setScrollPosition(position)
  })

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return scrollPosition
}
