import { ReactNode } from 'react'
import { UseToastOptions } from '@chakra-ui/react'

// Successes

export const SUCCESSFULLY_AUTHORIZED: UseToastOptions = {
  // description: t.auth.biometry.successfullyAuthorized as ReactNode,
  status: 'success'
}

export const SUCCESSFULLY_CREATED_PRODUCT: UseToastOptions = {
  // description: t.products.successfullyCreated as ReactNode,
  isClosable: true,
  status: 'success'
  // title: t.product.created as ReactNode
}

export const SUCCESSFULLY_REMOVED_PRODUCT: UseToastOptions = {
  // description: t.products.successfullyRemoved as ReactNode,
  isClosable: true,
  status: 'success'
  // title: t.product.removed as ReactNode
}

// Warnings

export const WARNING_BIOMETRY_UNSUPPORTED: UseToastOptions = {
  description: "Your browser doesn't support biometry.",
  status: 'warning'
}

export const WARNING_SOMETHING_WENT_WRONG: UseToastOptions = {
  // description: t.somethingWentWrong as ReactNode,
  status: 'warning'
}

// Errors

export const ERROR_WHILE_CREATING_PRODUCT: UseToastOptions = {
  // description: t.products.errorWhileCreating as ReactNode,
  isClosable: false,
  status: 'error'
  // title: t.product.notRemoved as ReactNode
}
