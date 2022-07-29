import { Product } from 'modules'
import { useGetProductsQuery } from './hooks'

export const Products: React.FC = () => {
  const { data, isLoading } = useGetProductsQuery()

  const noProductsDataReceived = !data || data.length === 0

  const clickProduct = (id: string, name: string) => {
    alert(`Product with ${id} was named ${name} clicked`)
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      {isLoading ? (
        <div style={{ fontSize: '75px' }}>
          <h1>🫥</h1>
        </div>
      ) : noProductsDataReceived ? (
        <div>No products found. Please, come later! 🤩</div>
      ) : (
        data?.map((product) => (
          <Product
            onClick={() => clickProduct(product.id, product.name)}
            key={product.id}
            {...product}
          />
        ))
      )}
    </div>
  )
}
