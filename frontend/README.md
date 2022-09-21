# Linetok **Frontend**

This project was bootstrapped with [Create Next App](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs linter. It checks for lint errors and lint warnings in your code.

### `npm run format`

Runs formatter. It formats your code according to the [ESLint](https://eslint.org/) rules.

### `npm run prepare`

Runs husky. It runs pre-commit hooks for git.\
Example: runs prettier, eslint before you pushed your changes to git.

## Project structure instructions

    - `src`: code base of the app.

    - src/
      - common: contains common functionality.
      - components: contains app's reusable components.
      - modules: contains app's modules.
      - pages: contains app's pages.

**common** - `/src/common/` is a place for common functionality, like translations, clients, types, formatters, validators.

**components** - `/src/components/` is a place for reusable React components.

**modules** - `/src/modules/` are modules, which we use to implement a part of Page, for example: WeatherWidget, Layout, Router, Cart. Modules can build Pages either by implementing modules's logic or or by visualizing UI of Page.

**pages** - `/src/pages/` is a place for Pages, which are built by modules. Example: HomePage, WeatherPage, CartPage.

## Storage / state

To handle data over the app we use Server Side State, and [React Query](https://react-query.tanstack.com/) helps us with it.

If you're looking for some data in the app, `/src/pages/` is an entry point for this, because the app uses Next SSG and static props.

## API queries

### `/src/common/utils/crud.ts`

We use CRUD to call API.

Example usage:

```ts
export const useCreateProductMutation = () =>
    useMutation(
        ['Create a product'],
        async (product: ProductType) =>
            // Here we are.
            await create<ProductType>(API.products)(product)
    )
```
