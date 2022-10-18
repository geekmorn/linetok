import { ChangeEvent } from 'react'
import useEvent from 'react-use-event-hook'
import { useRouter } from 'next/router'

type CurrentLanguage = string | undefined
type LanguageSetter = (event: any) => void

export const useLanguage = (): [CurrentLanguage, LanguageSetter] => {
  const router = useRouter()

  const changeLanguage = useEvent((event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value
    router.push(router.route, router.asPath, { locale })
  })

  return [router.locale, changeLanguage]
}
