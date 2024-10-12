import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";
import { productsGetAll } from "./api"; // Ensure you have the correct import

const telegram = window?.Telegram?.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    telegram.ready();

    // Fetch products when component mounts
    const fetchProducts = async () => {
      const fetchedProducts = await productsGetAll();
      if (fetchedProducts) {
        setProducts(fetchedProducts);
      }
    };

    fetchProducts();
  }, []);

  const onAddItem = (item) => {
    const existItem = cartItems.find((c) => c.id === item.id);

    if (existItem) {
      const newData = cartItems.map((c) =>
        c.id === item.id
          ? { ...existItem, quantity: existItem.quantity + 1 }
          : c
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  const onRemoveItem = (item) => {
    const existItem = cartItems.find((c) => c.id === item.id);

    if (existItem.quantity === 1) {
      const newData = cartItems.filter((c) => c.id !== existItem.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map((c) =>
        c.id === existItem.id
          ? { ...existItem, quantity: existItem.quantity - 1 }
          : c
      );
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)";
    telegram.MainButton.show();
  };

  return (
    <>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {products.length > 0 ? (
          products.map(
            (
              course // Fixed: products array used here
            ) => (
              <Card
                key={course._id}
                course={course}
                onAddItem={onAddItem}
                onRemoveItem={onRemoveItem}
              />
            )
          )
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  );
};

export default App;
