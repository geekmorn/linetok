const title = 'Интернет-магазин Linetok, г. Рогачев.'
const description = `Интернет-магазин Linetok.by в г. Рогачев -
онлайн площадка бытовой техники, электроники, товаров для дома и дачи.
Следите за нашими акциями и промокодами. С нами выгодно!`

export const API_URL = 'http://localhost:8000/api/' as const

export const API = {
  products: '/products',
  users: '/users',
  auth: '/auth/token'
} as const

export const SEO = {
  title,
  description
} as const
