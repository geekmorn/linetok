import { useEffect, useLayoutEffect } from 'react'

// Needed for SSR
export const useIsomorphicEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
