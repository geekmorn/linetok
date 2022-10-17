import { UseToastOptions } from "@chakra-ui/react"


// Successes.

export const SUCCESSFULLY_AUTHORIZED: UseToastOptions = {
  description: 'Паспяхова аўтарызаваны з дапамогай біяметрыі.',
  status: 'success'
}

export const SUCCESSFULLY_CREATED_PRODUCT: UseToastOptions = {
  description: 'Мы толькі што стварылі прадукт для вас.',
  isClosable: true,
  status: 'success',
  title: 'Прадукт створаны'
}

export const SUCCESSFULLY_REMOVED_PRODUCT: UseToastOptions = {
  description: "We've just removed the product for you.",
  isClosable: true,
  status: 'success',
  title: 'Product removed'
}

// Warnings.

export const WARNING_SOMETHING_WENT_WRONG: UseToastOptions = {
  description: 'Нешта пайшло не так. Паспрабуй яшчэ.',
  status: 'warning'
}

// Errors.

export const ERROR_WHILE_CREATING_PRODUCT: UseToastOptions = {
  description: 'Нешта пайшло не так, калі мы спрабавалі стварыць прадукт.',
  isClosable: false,
  status: 'error',
  title: 'Стварэнне не атрымалася'
}


