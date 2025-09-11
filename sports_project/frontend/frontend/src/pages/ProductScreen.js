// frontend/src/pages/ProductScreen.js (Modified)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../actions/cartActions'; // We'll create this next

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1); // Add quantity state
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty)); // Pass the product ID and quantity
  };

  return (
    <div>
      <Link to='/'>Go Back</Link>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h2>Price: ${product.price}</h2>
      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
      {product.countInStock > 0 && (
        <div>
          Qty
          <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
            {[...Array(product.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
      )}
      <button onClick={addToCartHandler} disabled={product.countInStock === 0}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductScreen;