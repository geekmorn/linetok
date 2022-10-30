type Environment = {
  NODE_ENV: 'development' | 'production' | 'test'
  PUBLIC_URL: string
  API_URL: string
}

export const environment: Environment = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: String(process.env.NEXT_PUBLIC_API_URL),
  PUBLIC_URL: String(process.env.PUBLIC_URL)
}
