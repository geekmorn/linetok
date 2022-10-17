import { EditableProduct, ProductCard } from './components'
import { useDestroyProductMutation, useReadProductsQuery } from './hooks'
import useEvent from 'react-use-event-hook'
import { useTranslation } from 'common/hooks'
import { SUCCESSFULLY_REMOVED_PRODUCT } from 'common/i18n'
import { ProductType } from 'common/types'
import { ProductsProps } from 'pages/admin/products'
import {
  Center,
  Text,
  Wrap,
  WrapItem,
  useToast,
  Highlight,
  Stack,
  Box
} from '@chakra-ui/react'

export const Products: React.FC<ProductsProps> = ({ initialData: data }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const { refetch } = useReadProductsQuery()

  const { mutateAsync, isLoading: isDestroyLoading } =
    useDestroyProductMutation()

  const noDataReceived = !data || data.length === 0

  const onRemove = useEvent((id: string) => async () => {
    await mutateAsync(id, {
      onSuccess: () => {
        refetch()
        toast(SUCCESSFULLY_REMOVED_PRODUCT)
      }
    })
  })

  // if (noDataReceived) {
  //   return (
  //     <Center>
  //       <Text>
  //         <Highlight
  //           query={['прыходзьце пазней', 'come later']}
  //           styles={{ bg: 'orange.100', px: '1', py: '1' }}
  //         >
  //           {t.products.notFound}
  //         </Highlight>
  //       </Text>
  //     </Center>
  //   )
  // }

  return (
    <Center
      sx={{
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      {data?.map((product: ProductType) => (
        <EditableProduct
          key={`${product.id} <Product />`}
          onRemove={() => onRemove(product.id)}
          loading={isDestroyLoading}
          {...product}
        />
      ))}
      {mockProducts.map((mockProduct) => (
        <ProductCard key={`${mockProduct.id} <Product />`} {...mockProduct} />
      ))}
    </Center>
  )
}

const mockProducts = [
  {
    amount: 1,
    description:
      'The MacBook Pro is a line of Macintosh notebook computers by Apple Inc. Introduced in January 2006, it is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air. It is currently sold with 13-inch, 14-inch, and 16-inch screens, all using variants of the Apple-designed M1 and M2 system on a chip.',
    id: 'uniqueProduct',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-mbp14-space-m1-2021_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1638575218000',
      'https://f00.esfr.pl/foto/3/93774426737/db362956efe0a1fb4dcdc2766d53b7fd/apple-laptop-mbp-16-m1-pro-512ssd-grey-2021,93774426737_8.jpg'
    ],
    name: 'Apple Macbook Pro 13"',
    price: 999
  },
  {
    amount: 1,
    description:
      'The MacBook Pro is a line of Macintosh notebook computers by Apple Inc. Introduced in January 2006, it is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air. It is currently sold with 13-inch, 14-inch, and 16-inch screens, all using variants of the Apple-designed M1 and M2 system on a chip.',
    id: 'uniqueProduct',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-mbp14-space-m1-2021_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1638575218000',
      'https://f00.esfr.pl/foto/3/93774426737/db362956efe0a1fb4dcdc2766d53b7fd/apple-laptop-mbp-16-m1-pro-512ssd-grey-2021,93774426737_8.jpg'
    ],
    name: 'Apple Macbook Pro 13"',
    price: 999
  },
  {
    amount: 1,
    description:
      'The MacBook Pro is a line of Macintosh notebook computers by Apple Inc. Introduced in January 2006, it is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air. It is currently sold with 13-inch, 14-inch, and 16-inch screens, all using variants of the Apple-designed M1 and M2 system on a chip.',
    id: 'uniqueProduct',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-mbp14-space-m1-2021_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1638575218000',
      'https://f00.esfr.pl/foto/3/93774426737/db362956efe0a1fb4dcdc2766d53b7fd/apple-laptop-mbp-16-m1-pro-512ssd-grey-2021,93774426737_8.jpg'
    ],
    name: 'Apple Macbook Pro 13"',
    price: 999
  },
  {
    amount: 1,
    description:
      'The MacBook Pro is a line of Macintosh notebook computers by Apple Inc. Introduced in January 2006, it is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air. It is currently sold with 13-inch, 14-inch, and 16-inch screens, all using variants of the Apple-designed M1 and M2 system on a chip.',
    id: 'uniqueProduct',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-mbp14-space-m1-2021_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1638575218000',
      'https://f00.esfr.pl/foto/3/93774426737/db362956efe0a1fb4dcdc2766d53b7fd/apple-laptop-mbp-16-m1-pro-512ssd-grey-2021,93774426737_8.jpg'
    ],
    name: 'Apple Macbook Pro 13"',
    price: 999
  },
  {
    amount: 1,
    description:
      'The MacBook Pro is a line of Macintosh notebook computers by Apple Inc. Introduced in January 2006, it is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air. It is currently sold with 13-inch, 14-inch, and 16-inch screens, all using variants of the Apple-designed M1 and M2 system on a chip.',
    id: 'uniqueProduct',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-mbp14-space-m1-2021_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1638575218000',
      'https://f00.esfr.pl/foto/3/93774426737/db362956efe0a1fb4dcdc2766d53b7fd/apple-laptop-mbp-16-m1-pro-512ssd-grey-2021,93774426737_8.jpg'
    ],
    name: 'Apple Macbook Pro 13"',
    price: 999
  },
  {
    amount: 1,
    description:
      'The MacBook Pro is a line of Macintosh notebook computers by Apple Inc. Introduced in January 2006, it is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air. It is currently sold with 13-inch, 14-inch, and 16-inch screens, all using variants of the Apple-designed M1 and M2 system on a chip.',
    id: 'uniqueProduct',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-mbp14-space-m1-2021_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1638575218000',
      'https://f00.esfr.pl/foto/3/93774426737/db362956efe0a1fb4dcdc2766d53b7fd/apple-laptop-mbp-16-m1-pro-512ssd-grey-2021,93774426737_8.jpg'
    ],
    name: 'Apple Macbook Pro 13"',
    price: 999
  },
  {
    amount: 1,
    description:
      'The MacBook Pro is a line of Macintosh notebook computers by Apple Inc. Introduced in January 2006, it is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air. It is currently sold with 13-inch, 14-inch, and 16-inch screens, all using variants of the Apple-designed M1 and M2 system on a chip.',
    id: 'uniqueProduct',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-mbp14-space-m1-2021_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1638575218000',
      'https://f00.esfr.pl/foto/3/93774426737/db362956efe0a1fb4dcdc2766d53b7fd/apple-laptop-mbp-16-m1-pro-512ssd-grey-2021,93774426737_8.jpg'
    ],
    name: 'Apple Macbook Pro 13"',
    price: 999
  },
  {
    amount: 1,
    description:
      'The MacBook Pro is a line of Macintosh notebook computers by Apple Inc. Introduced in January 2006, it is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air. It is currently sold with 13-inch, 14-inch, and 16-inch screens, all using variants of the Apple-designed M1 and M2 system on a chip.',
    id: 'uniqueProduct',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-mbp14-space-m1-2021_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1638575218000',
      'https://f00.esfr.pl/foto/3/93774426737/db362956efe0a1fb4dcdc2766d53b7fd/apple-laptop-mbp-16-m1-pro-512ssd-grey-2021,93774426737_8.jpg'
    ],
    name: 'Apple Macbook Pro 13"',
    price: 999
  }
]
