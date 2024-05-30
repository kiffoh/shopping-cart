import App from "./App"
import ErrorPage from "./ErrorPage"
import ShoppingCart from "./ShoppingCart"

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "shopping-cart",
      element: <ShoppingCart />
    }
  ]

export default routes