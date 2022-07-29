import { useState } from 'react'
import { Button, Input } from 'components'
import { User } from 'modules'
import { useGetUserQuery } from 'modules/users/hooks'

export const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState('')
  const {
    data: userData,
    isLoading,
    refetch
  } = useGetUserQuery({
    id: searchInput
  })

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    refetch()
  }

  return (
    <div style={{ marginBottom: '100px' }}>
      <form
        onSubmit={submit}
        style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}
      >
        <Input
          type="numeric"
          placeholder="ID"
          value={searchInput ?? ''}
          onChange={handleSearchInputChange}
        />
        <Button type="submit" disabled={isLoading}>
          Search
        </Button>
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
