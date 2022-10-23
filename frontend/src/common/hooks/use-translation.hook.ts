import { localeCodes } from 'common/constants'
import { English, Belarusian } from 'common/i18n/languages'
import { useRouter } from 'next/router'

export const useTranslation = () => {
  const { locale } = useRouter()
  let t

  switch (locale) {
    case localeCodes.Belarusian:
      t = Belarusian
      break
    case localeCodes.English:
      t = English
      break
    default:
      t = English
      break
  }

  return { t }
}
