import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react'
import { ProductType } from 'common/types'

type Setter = Dispatch<SetStateAction<ProductType>>
type Props = PropsWithChildren & { context: ProductType }

const initialData: ProductType = {
  id: '',
  name: '',
  price: 0,
  amount: 0,
  description: '',
  images: []
}

const ProductContext = createContext<ProductType>(initialData)
const ProductSetter = createContext<Setter>(() => null)

export const ProductProvider: React.FC<Props> = ({ children, context }) => {
  const [product, setProduct] = useState(context ?? initialData)

  return (
    <ProductContext.Provider value={product}>
      <ProductSetter.Provider value={setProduct}>
        {children}
      </ProductSetter.Provider>
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)
export const useProductSetter = () => {
  const set: Setter = useContext(ProductSetter)
  const setProduct = useCallback(
    (payload: ProductType) =>
      set((previousValues: ProductType) => ({ ...previousValues, ...payload })),
    [set]
  )
  return setProduct
}
