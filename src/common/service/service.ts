import { httpClient } from 'common/clients'

export class Service<T extends { id: string }> {
  constructor(private endpoint: string) {}

  public async get(id: string) {
    try {
      const response = await httpClient.get<T>(`${this.endpoint}/${id}`)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  public async getAll() {
    try {
      const response = await httpClient.get<T[]>(this.endpoint)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  public async create(payload: T) {
    try {
      const response = await httpClient.post<T>(this.endpoint, payload)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  public async update(payload: T) {
    try {
      const response = await httpClient.put<T>(
        `${this.endpoint}/${payload.id}`,
        payload
      )
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  public async delete(id: string) {
    try {
      const response = await httpClient.delete<T>(`${this.endpoint}/${id}`)
      return response.data
    } catch (e) {
      console.error(e)
    }
  }
}
