type Environment = {
  NODE_ENV: 'development' | 'production' | 'test'
  PUBLIC_URL: string
  API_URL: string
}

export const environment: Environment = {
  API_URL: String(process.env.NEXT_PUBLIC_API_URL),
  NODE_ENV: process.env.NODE_ENV,
  PUBLIC_URL: String(process.env.PUBLIC_URL)
}
