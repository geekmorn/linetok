import { ChangeEvent } from 'react'
import useEvent from 'react-use-event-hook'
import { useRouter } from 'next/router'

type CurrentLanguage = string | undefined
type LanguageSetter = (e: ChangeEvent<HTMLSelectElement>) => void

export const useLanguage = (): [CurrentLanguage, LanguageSetter] => {
  const router = useRouter()

  const changeLanguage: LanguageSetter = useEvent((e) => {
    const locale = e.target.value
    router.push(router.route, router.asPath, { locale })
  })

  return [router.locale, changeLanguage]
}
