import React from 'react';
import { CartProvider } from './context/CartContext';
import { router } from './routes/routes';
import { RouterProvider } from 'react-router';



const App: React.FC = () => {
	return (
		<CartProvider>
			<RouterProvider router={router} />
		</CartProvider>
	);
};

export default App;
