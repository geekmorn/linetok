const title = 'Интернет-магазин Linetok, г. Рогачев.'
const description = `Интернет-магазин Linetok.by в г. Рогачев -
онлайн площадка бытовой техники, электроники, товаров для дома и дачи.
Следите за нашими акциями и промокодами. С нами выгодно!`

export const API_URL = 'https://62b8ca41f4cb8d63df62a100.mockapi.io/' as const

export const API = {
  products: '/products',
  users: '/users',
  auth: '/auth/token'
} as const

export const SEO = {
  title,
  description
} as const
