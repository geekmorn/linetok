import { useState } from 'react'
import { User } from 'modules'
import { useGetUserQuery } from 'modules/users/hooks'

export const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState<number>(1)
  const { data: userData, isLoading, refetch } = useGetUserQuery(searchInput)

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value as unknown as number)
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    refetch()
  }

  return (
    <div style={{ marginBottom: '100px' }}>
      <form onSubmit={submit}>
        <input
          type="numeric"
          placeholder="ID"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading ? (
        <div>LOADING USER.......</div>
      ) : userData ? (
        <User {...userData} />
      ) : (
        <div>No user found.</div>
      )}
    </div>
  )
}
