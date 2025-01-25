import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KhaltiCheckout from "khalti-checkout-web";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createOrderApi,
  getCartByUserIDApi,
  removeFromCartApi,
  updateCartApi,
} from "../../../apis/Api";
import "./Cart.css";

const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(150);
  const [total, setTotal] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Fetch Cart Data
  useEffect(() => {
    if (user && user._id) {
      getCartByUserIDApi(user._id)
        .then((res) => {
          if (res.data.success) {
            setCart(res.data.cart);
          } else {
            toast.error("Failed to fetch cart data.");
          }
        })
        .catch((err) => {
          console.error("Error fetching cart:", err);
          toast.error("Error fetching cart.");
        });
    }
  }, [user]);

  // Mock Address Data
  useEffect(() => {
    setAddresses([
      { address: "123 Main Street, City, Country" },
      { address: "456 Another Road, City, Country" },
    ]);
  }, []);

  // Calculate Totals
  useEffect(() => {
    calculateTotals();
  }, [cart]);

  const calculateTotals = () => {
    let newSubtotal = 0;
    cart.forEach((item) => {
      newSubtotal += item.quantity * item.productID.productPrice;
    });
    setSubtotal(newSubtotal);
    setTotal(199);
  };

  // Handle Item Deletion
  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (!confirmDialog) return;

    removeFromCartApi(id)
      .then((res) => {
        if (res.data.success) {
          setCart(cart.filter((item) => item._id !== id));
          toast.success(res.data.message);
        } else {
          toast.error("Failed to remove item from cart.");
        }
      })
      .catch((err) => {
        console.error("Error removing item:", err);
        toast.error("Error removing item.");
      });
  };

  // Handle Quantity Change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 5) {
      toast.error("Quantity must be between 1 and 5.");
      return;
    }

    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);

    updateCartApi(id, { quantity: newQuantity })
      .then((res) => {
        if (res.data.success) {
          toast.success("Cart updated successfully.");
        } else {
          toast.error("Failed to update cart.");
        }
      })
      .catch((err) => {
        console.error("Error updating cart:", err);
        toast.error("Error updating cart.");
      });
  };

  // // Proceed to Checkout
  // const handleProceedToCheckout = () => {
  //   if (!selectedAddress) {
  //     toast.error("Please select an address.");
  //     return;
  //   }

  //   if (!paymentMethod) {
  //     toast.error("Please select a payment method.");
  //     return;
  //   }

  //   setShowPopup(true);
  // };

  // Confirm Order
  const handleConfirmOrder = () => {
    const orderData = {
      userId: user._id,
      carts: cart.map((item) => item._id),
      total,
      address: selectedAddress,
      paymentType: paymentMethod,
    };

    createOrderApi(orderData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Order placed successfully!");
          setCart([]);
          setShowPopup(false);
        } else {
          toast.error("Failed to place order.");
        }
      })
      .catch((err) => {
        console.error("Error placing order:", err);
        toast.error("Error placing order.");
      });
  };
  const handleKhaltiPayment = () => {
    let config = {
      publicKey: "test_public_key_0800545e039d45368cab4d1b2fb93d01",
      productIdentity: "1234567890",
      productName: "Cart Items",
      productUrl: "http://example.com/cart",
      eventHandler: {
        onSuccess(payload) {
          console.log("Khalti success payload:", payload);
          toast.success("Payment Successful!");
        },
        onError(error) {
          console.log("Khalti error:", error);
          toast.error("Payment Failed. Please try again.");
        },
        onClose() {
          console.log("Khalti widget is closing");
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    };

    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: total * 100 });
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="cart-container">
          {cart && cart.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">PRODUCT</th>
                  <th className="py-2">NAME</th>
                  <th className="py-2">PRICE</th>
                  <th className="py-2">QTY</th>
                  <th className="py-2">SUBTOTAL</th>
                  <th className="py-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cart) => (
                  <tr key={cart._id} className="border-b">
                    <td className="flex items-center py-4">
                      <img
                        src={`https://localhost:5500/products/${cart.productID.productImage}`}
                        alt={cart.productID.productName}
                        className="w-20 h-20"
                      />
                    </td>
                    <td>{cart.productID.productName}</td>
                    <td>NPR. {cart.productID.productPrice}</td>
                    <td className="flex items-center">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          handleQuantityChange(cart._id, cart.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="mx-2">{cart.quantity || 1}</span>
                      <button
                        className="qty-btn"
                        onClick={() =>
                          handleQuantityChange(cart._id, cart.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </td>
                    <td>
                      NPR. {(cart.quantity || 1) * cart.productID.productPrice}
                    </td>
                    <td className="flex justify-around">
                      <button
                        onClick={() => handleDelete(cart._id)}
                        className="btn btn-danger"
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Your Cart is empty</p>
          )}

          <div className="summary-container mt-8">
            <div className="summary">
              <h4 className="summary-heading">Order Summary</h4>
              <div className="flex justify-between py-2 font-bold">
                <span>Subtotal</span>
                <span>NPR. {subtotal}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Shipping fee</span>
                <span>NPR. {shipping}</span>
              </div>
              <div className="total mt-4 pt-4 border-t flex justify-between text-lg font-semibold">
                <span>TOTAL</span>
                <span>NPR. {total}</span>
              </div>
              <div className="mt-4 text-center">
                <button className="continue-btn" onClick={handleKhaltiPayment}>
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Continue to Order</h2>
            <div>
              <label htmlFor="address-select">Select Address:</label>
              <select
                id="address-select"
                value={selectedAddress}
                // onChange={(e) => setSelectedAddress(e.target.value)}
              >
                <option value="">Select an address</option>
                {addresses.map((address, index) => (
                  <option key={index} value={address.address}>
                    {address.address}
                  </option>
                ))}
              </select>
            </div>
            <div className="payment-method">
              <h3>Payment Method</h3>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Khalti"
                  checked={paymentMethod === "Khalti"}
                  // onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Khalti
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  // onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>
            <div className="mt-4 text-center">
              <button className="continue-btn" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
