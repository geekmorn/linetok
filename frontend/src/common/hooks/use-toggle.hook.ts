import { useState } from 'react'

export const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [value, set] = useState(initialValue)
  const toggle = () => set(!value)

  return [value, toggle]
}
