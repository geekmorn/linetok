import { localeCodes } from 'common/constants'
import { useLanguage } from 'common/hooks'
import { English, Belarusian } from 'common/i18n/languages'

export const useTranslation = () => {
  const [currentLocaleCode] = useLanguage()
  let t: typeof English = English

  switch (currentLocaleCode) {
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

  return { currentLocaleCode, t }
}
