import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './screens/home';
import ProductScreen from './screens/product';
import NotFound from './screens/notFound';
import AddQuantityButtonDemo from './screens/demo/AddQuantityButtonDemo';
import CartPage from './pages/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/product/:productId',
    element: <ProductScreen />,
  },
  {
    path: '/demo/add-quantity-button',
    element: <AddQuantityButtonDemo />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App: React.FC = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};

export default App;
