import axios from "axios";

// Backend API configurations
const Api = axios.create({
  baseURL: "https://localhost:5500",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const Api2 = axios.create({
  baseURL: "https://localhost:5500",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get config with authorization token
const getConfig = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Authentication APIs
export const registerUserApi = (data) =>
  Api.post("https://localhost:5500/api/user/create", data);
export const loginUserApi = (data) => Api.post("/api/user/login", data);
export const forgotPasswordApi = (data) =>
  Api.post("https://localhost:5500/api/user/forgot_password", data);
export const verifyOtpApi = (data) =>
  Api.post("https://localhost:5500/api/user/verify_otp", data);

// User APIs
export const getUserData = (userId) =>
  Api.get(`https://localhost:5500/api/user/profile/${userId}`, getConfig());
export const getAllUserData = () =>
  Api.get("https://localhost:5500/api/user/all_user", getConfig());
export const getUserDataById = (userId) =>
  Api.get(`https://localhost:5500/api/user/user/${userId}`);
export const updateUserData = (userId, user) =>
  Api.put(
    `https://localhost:5500/api/user/update/${userId}`,
    user,
    getConfig()
  );
export const delUserById = (userId) =>
  Api.delete(
    `https://localhost:5500/api/user/delete_account/${userId}`,
    getConfig()
  );

// Category APIs
export const createCategoryApi = (data) =>
  Api.post("https://localhost:5500/api/category/create", data, getConfig());
export const getAllCategory = async () => {
  try {
    const response = await Api.get(
      "https://localhost:5500/api/category/get_all_category",
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const getcaterogyById = (id) =>
  Api.get(`https://localhost:5500/api/category/getcaterogybyid/${id}`);
export const deleteCategory = (id) =>
  Api.delete(
    `https://localhost:5500/api/category/delete_category/${id}`,
    getConfig()
  );

// Product APIs
export const createProductApi = (data) =>
  Api.post("https://localhost:5500/api/product/create", data, getConfig());
export const getAllProducts = () =>
  Api.get("https://localhost:5500/api/product/get_all_products", getConfig());
export const getProductsByCategory = (categoryId) =>
  axios.get(
    `https://localhost:5500/api/product/get_all_products?category=${categoryId}`
  );
export const getSingleProduct = (id) =>
  Api.get(
    `https://localhost:5500/api/product/get_single_product/${id}`,
    getConfig()
  );
export const updateProduct = (id, data) =>
  Api.put(
    `https://localhost:5500/api/product/update_product/${id}`,
    data,
    getConfig()
  );
export const deleteProduct = (id) =>
  Api.delete(
    `https://localhost:5500/api/product/delete_product/${id}`,
    getConfig()
  );

// Cart APIs
export const addToCartApi = (data) =>
  Api.post("https://localhost:5500/api/cart/addToCart", data, getConfig());
export const getCartByUserIDApi = (id) =>
  Api.get(`https://localhost:5500/api/cart/getCartByUserID/${id}`, getConfig());
export const updateCartApi = (id, formData) =>
  Api.put(
    `https://localhost:5500/api/cart/updateCart/${id}`,
    formData,
    getConfig()
  );
export const removeFromCartApi = (id) =>
  Api.delete(
    `https://localhost:5500/api/cart/removeFromCart/${id}`,
    getConfig()
  );
export const updateCartStatusApi = (data) =>
  Api.put(`https://localhost:5500/api/cart/status`, data, getConfig());

// Order APIs
export const getUserOrdersApi = () =>
  Api2.get("https://localhost:5500/api/order/user", getConfig());
export const getallOrdersApi = () =>
  Api2.get("https://localhost:5500/api/order/get", getConfig());
export const createOrderApi = (data) =>
  Api2.post("https://localhost:5500/api/order/create", data, getConfig());
export const updateOrderApi = (id, data) =>
  Api.put(`https://localhost:5500/api/order/update/${id}`, data, getConfig());
export const updateOrderStatusApi = (id, data) =>
  Api.put(`https://localhost:5500/api/order/update/${id}`, data, getConfig());

// Address APIs
export const createAddress = (data) =>
  Api.post(
    "https://localhost:5500/api/address/shipping-address",
    data,
    getConfig()
  );
export const editAddress = (addressId, data) =>
  Api.put(
    `https://localhost:5500/api/address/update-shipping-address/${addressId}`,
    data,
    getConfig()
  );
export const getAddress = (id) =>
  Api.get(`https://localhost:5500/api/address/getaddress/${id}`, getConfig());
export const getShippingAddressById = (addressId) =>
  Api.get(
    `https://localhost:5500/api/address/getaddressbyaddressId/${addressId}`,
    getConfig()
  );
export const deleteAddress = (addressId) =>
  Api.delete(
    `https://localhost:5500/api/address/deleteaddress/${addressId}`,
    getConfig()
  );

// Review and Rating APIs
export const createReviewApi = (data) =>
  Api.post("https://localhost:5500/api/review/addReview", data, getConfig());
export const updateReviewApi = (id) =>
  Api.get(`https://localhost:5500/api/review/updateReview/${id}`);
export const getReviewsByUserIDApi = (id) =>
  Api.get(
    `https://localhost:5500/api/review/getReviewsByUserID/${id}`,
    getConfig()
  );
export const getReviewsByProductID = (id) =>
  Api.get(`https://localhost:5500/api/review/getReviewsByProductID/${id}`);
