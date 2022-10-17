import { English, Belarusian } from 'common/i18n/languages'
import { useRouter } from 'next/router'

export const useTranslation = () => {
  const { locale } = useRouter()
  const t = locale === 'by-BY' ? Belarusian : English

  return { t }
}
