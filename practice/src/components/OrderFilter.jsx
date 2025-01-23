import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Filter.css";

const Cart = ({ cartItems, updateCart }) => {
  const handleRemove = (id) => {
    updateCart(id, -1);
  };

  const incrementQuantity = (id) => {
    updateCart(id, 1);
  };

  const decrementQuantity = (id) => {
    updateCart(id, -1);
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No products in the cart</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};






const FilterableProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOption, setFilterOption] = useState("default");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    },
    [products]
  );

  const filteredCount = useMemo(() => filteredProducts.length, [filteredProducts]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = useCallback(
    (e) => {
      const value = e.target.value;
      setFilterOption(value);

      let sortedProducts = [...products];
      if (value === "alphabetical") {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (value === "price-low-to-high") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (value === "price-high-to-low") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else {
        sortedProducts = products;
      }

      setFilteredProducts(sortedProducts);
    },
    [products]
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCart = (id, change) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0);
      return updatedCart;
    });
  };

  return (
    <div className="container">
      <h1>FILTERED PRODUCTS TASK - DAY 10</h1>

      <div className="SearchBox">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter Product Name"
        />
        <button onClick={clearSearch}>CLEAR</button>
      </div>

      <div className="One">
        <div className="flex justify-between items-center">
          <p>
            <strong>Filtered Count:</strong> {filteredCount}
          </p>
        </div>
        <div className="filter-dropdown">
          <label htmlFor="filter">Filter by:</label>
          <select id="filter" value={filterOption} onChange={handleFilterChange}>
            <option value="default">Default</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setFilteredProducts(products)} className="full-width">
          Reset Products
        </button>
      </div>

      <Cart cartItems={cart} updateCart={updateCart} />
    </div>
  );
};

export default FilterableProductList;
