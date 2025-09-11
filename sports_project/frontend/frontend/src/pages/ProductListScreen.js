// frontend/src/pages/ProductListScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct } from '../actions/productActions'; // Create these actions

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <h1>Products</h1>
      {/* Display a table of products with Edit and Delete buttons */}
      {products.map((product) => (
        <div key={product._id}>
          <span>{product.name}</span>
          <button>Edit</button>
          <button onClick={() => deleteHandler(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductListScreen;