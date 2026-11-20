import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateQuantity, selectCartItems } from './CartSlice';
import './ProductList.css';

const FALLBACK_IMAGE =
  'https://www.karurrosenursery.com/images/contact/contact-hero-karur-rose-nursery.png';

// Sample prices — replace them with your real shop prices.
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        image:
          'https://kaynuna.co/cdn/shop/files/Snake_Plant_Sanseviera.jpg?v=1736869154&width=1206',
        description:
          'Hardy, low-maintenance and great for beginners. Cleans the air while you sleep.',
        cost: 15,
      },
      {
        name: 'Spider Plant',
        image:
          'https://www.easytogrowbulbs.com/cdn/shop/files/HangingSpiderPlant.jpg?v=1780080946&width=990',
        description:
          'A fast-growing hanging plant with arching striped leaves. Safe around pets.',
        cost: 12,
      },
      {
        name: 'Peace Lily',
        image:
          'https://i.pinimg.com/736x/d5/87/30/d58730321a894c316d4744faed21f3c1.jpg',
        description:
          'Elegant white blooms and deep green leaves. Purifies the air and loves shade.',
        cost: 18,
      },
    ],
  },
  {
    category: 'Aromatic & Easy-Care Plants',
    plants: [
      {
        name: 'Lavender',
        image:
          'https://leafyzen.com/media/images/A-healthy-lavender-plant-blooming-in-a-terracotta-_1777399036723242056.webp',
        description:
          'Fragrant purple blooms that calm the senses. Loves sunlight and dry soil.',
        cost: 20,
      },
      {
        name: 'Aloe Vera',
        image:
          'https://plantbox.ae/cdn/shop/files/Aloe_Vera.png?v=1781850373&width=1200',
        description:
          'A healing succulent for skin care. Needs very little water.',
        cost: 10,
      },
      {
        name: 'Monstera',
        image:
          'https://potandposy.com.au/wp-content/uploads/2018/04/Monstera-Deliciosa.jpg',
        description:
          'Bold split leaves that make a statement. The classic trendy houseplant.',
        cost: 25,
      },
    ],
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const getCartItem = (name) =>
    cartItems.find((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleIncrease = (name, quantity) => {
    dispatch(updateQuantity({ name, quantity: quantity + 1 }));
  };

  const handleDecrease = (name, quantity) => {
    // updateQuantity removes the item when the quantity reaches 0
    dispatch(updateQuantity({ name, quantity: quantity - 1 }));
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="product-list">
      <h1>Our Plants</h1>
      <p className="cart-count">Items in cart: {totalItems}</p>

      {plantsArray.map((group) => (
        <section key={group.category} className="plant-category">
          <h2>{group.category}</h2>
          <div className="plants-grid">
            {group.plants.map((plant) => {
              const cartItem = getCartItem(plant.name);
              return (
                <div key={plant.name} className="plant-card">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    onError={handleImageError}
                  />
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <p className="plant-cost">${plant.cost}</p>

                  {cartItem ? (
                    <>
                      <button className="added-to-cart" disabled>
                        Added to Cart
                      </button>
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            handleDecrease(plant.name, cartItem.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{cartItem.quantity}</span>
                        <button
                          onClick={() =>
                            handleIncrease(plant.name, cartItem.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      className="add-to-cart"
                      onClick={() => handleAddToCart(plant)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductList;
