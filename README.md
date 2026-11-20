# ProductList.jsx

**Project:** Paradise Nursery — product listing page

The `ProductList.jsx` file for the Paradise Nursery plant shop. It
displays the product listing page, grouped by plant category, with
full add-to-cart functionality through Redux.

## Functionalities

- **Plants grouped by category** — Air Purifying Plants and Aromatic
  & Easy-Care Plants, each with its own heading.
- **Every plant card shows** an image, the plant name, a description
  and the price.
- **Add to Cart** — each card has an Add to Cart button that adds the
  plant to the Redux cart (`addItem` from `CartSlice.jsx`).
- **Added state** — once a plant is in the cart, its button changes
  to a disabled "Added to Cart" button, so the same plant cannot be
  added twice as a separate line.
- **Quantity controls** — plants already in the cart show − / +
  buttons that change the quantity (`updateQuantity` from
  `CartSlice.jsx`). Lowering the quantity to 0 removes the plant
  from the cart.
- **Cart count** — the page shows how many items are in the cart,
  read live from the Redux store with `useSelector`.
- **Image fallback** — if a plant photo fails to load, a nursery
  photo is shown instead.

## Prices

The prices in the file ($10–$25) are **sample prices** — replace them
with your real shop prices.

## Usage

Use it together with `CartSlice.jsx` and the Redux store:

```jsx
import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './ProductList';

function App() {
  return (
    <Provider store={store}>
      <ProductList />
    </Provider>
  );
}
```

`ProductList.jsx` imports `./CartSlice` and `./ProductList.css`,
so keep all three files in the same folder.
