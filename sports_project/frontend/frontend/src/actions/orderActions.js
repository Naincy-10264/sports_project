import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';

// Action to create a new order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEMS });
    localStorage.removeItem('cartItems');
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: ORDER_CREATE_FAIL, payload: message });
  }
};

// Action to get details of a single order
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

// Action to get a logged-in user's orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: ORDER_LIST_MY_FAIL, payload: message });
  }
};

// Action for an admin to list all orders
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders`, config);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};

// Action for an admin to mark an order as delivered
export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/orders/${orderId}/deliver`, {}, config);
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};