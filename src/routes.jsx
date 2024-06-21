import App from "./App"
import ErrorPage from "./ErrorPage"
import Home from "./HomePage"
import ShoppingCart from "./ShoppingCart"

const routes = [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "items",
            element: <App />
        },
        {
          path: "shopping-cart",
          element: <ShoppingCart />
        }
      ]
    }
  ]

export default routes