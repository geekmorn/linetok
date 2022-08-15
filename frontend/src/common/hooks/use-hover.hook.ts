import { RefObject, useState } from 'react'
// See: https://usehooks-ts.com/react-hook/use-event-listener
import { useEventListener } from './use-event-listener.hook'

export const useHover = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>
): boolean => {
  const [hovered, set] = useState(false)

  const onMouseEnter = () => set(true)
  const onMouseLeave = () => set(false)

  useEventListener('mouseenter', onMouseEnter, elementRef)
  useEventListener('mouseleave', onMouseLeave, elementRef)

  return hovered
}
