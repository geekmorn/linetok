import { IProduct } from 'common/interfaces'

interface ProductProps extends IProduct {
  onClick?: () => void
}

export const Product: React.FC<ProductProps> = ({
  // IProduct
  id,
  name,
  price,
  isAvailable,
  // Props
  onClick
}) => (
  <div
    onClick={onClick}
    style={{
      border: '1px solid black',
      padding: '25px 55px',
      maxWidth: '300px',
      display: 'grid',
      placeItems: 'center',
      marginBottom: '5px'
    }}
  >
    <h1>Product</h1>
    <span>ID: {id}</span>
    <span>Name: {name}</span>
    <span>Price: {price}</span>
    <span>Is Available: {isAvailable ? 'Yes' : 'No'}</span>
  </div>
)
