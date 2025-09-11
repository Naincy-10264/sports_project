// frontend/src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <h3>
        <Link to={`/product/${product._id}`}>{product.name}</Link>
      </h3>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductCard;