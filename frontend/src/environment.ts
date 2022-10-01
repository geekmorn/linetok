type Environment = {
  PUBLIC_URL: string
  API_URL: string
}

export const environment: Environment = {
  API_URL: String(process.env.NEXT_PUBLIC_API_URL),
  PUBLIC_URL: String(process.env.PUBLIC_URL)
}
