// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { message } from "antd";
// import KhaltiCheckout from "khalti-checkout-web";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   createOrderApi,
//   getAddress,
//   getCartByUserIDApi,
//   removeFromCartApi,
//   updateCartApi,
// } from "../../../apis/Api";
// import AddressForm from "../../address/AddressForm";
// import "./Cart.css";

// const Cart = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [cart, setCart] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [shipping, setShipping] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [cartUpdated, setCartUpdated] = useState(false);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [addresses, setAddresses] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");

//   useEffect(() => {
//     if (user && user._id) {
//       getCartByUserIDApi(user._id)
//         .then((res) => {
//           if (res.data.cart) {
//             setCart(res.data.cart);
//           }
//         })
//         .catch((err) => {
//           toast.error("Server Error");
//           console.error(err.message);
//         });
//     }
//   }, [user]);

//   useEffect(() => {
//     calculateCartTotal();
//   }, [cart]);

//   useEffect(() => {
//     if (cartUpdated) {
//       const updatedProducts = cart.map((item) => ({
//         productID: item.productID._id,
//         quantity: item.quantity,
//       }));

//       updateCartApi(user._id, { products: updatedProducts })
//         .then((res) => {
//           console.log("Cart update response:", res.data);
//           setCartUpdated(false);
//         })
//         .catch((error) => {
//           console.error("Cart update error:", error.message);
//           setCartUpdated(false);
//         });
//     }
//   }, [cart, cartUpdated, user._id]);

//   const calculateCartTotal = () => {
//     let newSubtotal = 0;

//     cart.forEach((item) => {
//       newSubtotal += (item.quantity || 1) * item.productID.productPrice;
//     });

//     setSubtotal(newSubtotal);
//     setShipping(newSubtotal > 0 ? 150 : 0);
//     setTotal(newSubtotal + shipping);
//   };

//   const handleDelete = (id) => {
//     const confirmDialog = window.confirm(
//       "Are you sure you want to remove this item from the cart?"
//     );
//     if (confirmDialog) {
//       removeFromCartApi(id)
//         .then((res) => {
//           if (res.data.success) {
//             setCart(cart.filter((item) => item._id !== id));
//             toast.success(res.data.message);
//           } else {
//             toast.error(res.data.message);
//           }
//         })
//         .catch((error) => {
//           toast.error("Server Error");
//           console.error(error.message);
//         });
//     }
//   };

//   const handleQuantityChange = (itemId, newQuantity) => {
//     if (newQuantity < 1 || newQuantity > 5) return;

//     const updatedCart = cart.map((item) =>
//       item._id === itemId ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(updatedCart);
//     setCartUpdated(true);
//   };

//   const handleProceedToCheckout = () => {
//     setCartUpdated(true);
//     setShowPopup(true);
//   };

//   const handleConfirmOrder = () => {
//     if (paymentMethod === "Khalti") {
//       handleKhaltiPayment();
//     } else if (paymentMethod === "COD") {
//       const confirmDialog = window.confirm(
//         "Do you really want to place the order?"
//       );
//       if (confirmDialog) {
//         saveOrder("Cash on Delivery");
//       }
//     }
//   };

//   const handleKhaltiPayment = () => {
//     let config = {
//       publicKey: "test_public_key_0800545e039d45368cab4d1b2fb93d01",
//       productIdentity: "1234567890",
//       productName: "Cart Items",
//       productUrl: "https://example.com/cart",
//       eventHandler: {
//         onSuccess(payload) {
//           console.log("Khalti success payload:", payload);
//           toast.success("Payment Successful!");
//           saveOrder("Payment made via Khalti");
//         },
//         onError(error) {
//           console.log("Khalti error:", error);
//           toast.error("Payment Failed. Please try again.");
//         },
//         onClose() {
//           console.log("Khalti widget is closing");
//         },
//       },
//       paymentPreference: [
//         "KHALTI",
//         "EBANKING",
//         "MOBILE_BANKING",
//         "CONNECT_IPS",
//         "SCT",
//       ],
//     };

//     let checkout = new KhaltiCheckout(config);
//     checkout.show({ amount: total * 100 });
//   };

//   const saveOrder = (paymentMethod) => {
//     const cartIDs = cart.map((item) => item._id);
//     console.log("Cart IDs:", cartIDs);

//     const orderData = {
//       userId: user._id,
//       carts: cartIDs,
//       total,
//       address: selectedAddress,
//       paymentType: paymentMethod,
//     };
//     console.log("Order Data:", orderData);

//     createOrderApi(orderData)
//       .then((res) => {
//         console.log("Order creation response:", res.data);
//         if (res.data.success === false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success("Order placed successfully!");
//           setCart([]); // Clear the cart
//           setShowPopup(false);
//         }
//       })
//       .catch((err) => {
//         message.error("Server Error");
//         console.log("Order creation error:", err.message);
//       });
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       getAddress(user._id)
//         .then((res) => {
//           if (res.data && Array.isArray(res.data.addresses)) {
//             setAddresses(res.data.addresses);
//           }
//         })
//         .catch((err) => {
//           console.error(err.message);
//         });
//     }
//   }, [user]);

//   const handleAddressChange = (value) => {
//     if (value === "add-new") {
//       navigate("/address");
//     } else {
//       setSelectedAddress(value);
//     }
//   };

//   return (
//     <>
//       <div className="container mx-auto p-4">
//         <div className="cart-container">
//           {cart && cart.length > 0 ? (
//             <table className="w-full table-auto">
//               <thead>
//                 <tr className="text-left border-b">
//                   <th className="py-2">PRODUCT</th>
//                   <th className="py-2">NAME</th>
//                   <th className="py-2">PRICE</th>
//                   <th className="py-2">QTY</th>
//                   <th className="py-2">SUBTOTAL</th>
//                   <th className="py-2">ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cart.map((cart) => (
//                   <tr key={cart._id} className="border-b">
//                     <td className="flex items-center py-4">
//                       <img
//                         src={`https://localhost:5500/products/${cart.productID.productImage}`}
//                         alt={cart.productID.productName}
//                         className="w-20 h-20"
//                       />
//                     </td>
//                     <td>{cart.productID.productName}</td>
//                     <td>NPR. {cart.productID.productPrice}</td>
//                     <td className="flex items-center">
//                       <button
//                         className="qty-btn"
//                         onClick={() =>
//                           handleQuantityChange(cart._id, cart.quantity - 1)
//                         }
//                       >
//                         -
//                       </button>
//                       <span className="mx-2">{cart.quantity || 1}</span>
//                       <button
//                         className="qty-btn"
//                         onClick={() =>
//                           handleQuantityChange(cart._id, cart.quantity + 1)
//                         }
//                       >
//                         +
//                       </button>
//                     </td>
//                     <td>
//                       NPR. {(cart.quantity || 1) * cart.productID.productPrice}
//                     </td>
//                     <td className="flex justify-around">
//                       <button
//                         onClick={() => handleDelete(cart._id)}
//                         className="btn btn-danger"
//                       >
//                         <DeleteOutlineIcon />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>Your Cart is empty</p>
//           )}

//           <div className="summary-container mt-8">
//             <div className="summary">
//               <h4 className="summary-heading">Order Summary</h4>
//               <div className="flex justify-between py-2 font-bold">
//                 <span>Subtotal</span>
//                 <span>NPR. {subtotal}</span>
//               </div>
//               <div className="flex justify-between py-2 font-bold">
//                 <span>Shipping fee</span>
//                 <span>NPR. {shipping}</span>
//               </div>
//               <div className="total mt-4 pt-4 border-t flex justify-between text-lg font-semibold">
//                 <span>TOTAL</span>
//                 <span>NPR. {total}</span>
//               </div>
//               <div className="mt-4 text-center">
//                 <button
//                   className="continue-btn"
//                   onClick={handleProceedToCheckout}
//                 >
//                   Continue
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showPopup && (
//         <div className="popup-container">
//           <div className="popup-content">
//             <h2>Continue to Order</h2>
//             <div>
//               <label htmlFor="address-select">Select Address:</label>
//               <select
//                 id="address-select"
//                 value={selectedAddress}
//                 onChange={(e) => handleAddressChange(e.target.value)}
//               >
//                 <option value="">Select an address</option>
//                 {addresses.map((address, index) => (
//                   <option key={index} value={address.address}>
//                     {address.address}
//                   </option>
//                 ))}
//                 <option value="add-new">Add New Address</option>
//               </select>
//             </div>
//             <div className="payment-method">
//               <h3>Payment Method</h3>
//               <label>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="Khalti"
//                   checked={paymentMethod === "Khalti"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 />
//                 Khalti
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="COD"
//                   checked={paymentMethod === "COD"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 />
//                 Cash on Delivery
//               </label>
//             </div>
//             <div className="mt-4 text-center">
//               <button className="continue-btn" onClick={handleConfirmOrder}>
//                 Continue to Order
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showAddressForm && (
//         <AddressForm
//           onSubmit={(newAddress) => {
//             setAddresses([...addresses, newAddress]);
//             setSelectedAddress(newAddress._id);
//             setShowAddressForm(false);
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Cart;

// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { message } from "antd";
// import KhaltiCheckout from "khalti-checkout-web";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   createOrderApi,
//   getAddress,
//   getCartByUserIDApi,
//   removeFromCartApi,
//   updateCartApi,
// } from "../../../apis/Api";
// import AddressForm from "../../address/AddressForm";
// import "./Cart.css";

// const Cart = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [cart, setCart] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [shipping, setShipping] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [addresses, setAddresses] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [prevCartQuantities, setPrevCartQuantities] = useState([]);

//   // Fetch cart and address data once on component mount
//   useEffect(() => {
//     if (user && user._id) {
//       Promise.all([getCartByUserIDApi(user._id), getAddress(user._id)])
//         .then(([cartRes, addressRes]) => {
//           if (cartRes.data.cart) {
//             setCart(cartRes.data.cart);
//             setPrevCartQuantities(
//               cartRes.data.cart.map((item) => ({
//                 id: item._id,
//                 quantity: item.quantity,
//               }))
//             ); // Set initial quantities
//             calculateCartTotal(cartRes.data.cart); // Initial calculation
//           }
//           if (addressRes.data && Array.isArray(addressRes.data.addresses)) {
//             setAddresses(addressRes.data.addresses);
//           }
//         })
//         .catch((err) => {
//           toast.error("Error fetching data");
//           console.error(err.message);
//         });
//     }
//   }, []);

//   // Update cart data on quantity change
//   useEffect(() => {
//     const currentQuantities = cart.map((item) => ({
//       id: item._id,
//       quantity: item.quantity,
//     }));

//     const hasQuantityChanged = !prevCartQuantities.every((prevItem) => {
//       const currentItem = currentQuantities.find(
//         (item) => item.id === prevItem.id
//       );
//       return currentItem && currentItem.quantity === prevItem.quantity;
//     });

//     if (hasQuantityChanged) {
//       const updatedProducts = cart.map((item) => ({
//         productID: item.productID._id,
//         quantity: item.quantity,
//       }));

//       updateCartApi(user._id, { products: updatedProducts })
//         .then((res) => {
//           console.log("Cart update response:", res.data);
//         })
//         .catch((error) => {
//           console.error("Cart update error:", error.message);
//         });

//       setPrevCartQuantities(currentQuantities);
//     }
//   }, [cart, user._id, prevCartQuantities]);

//   const calculateCartTotal = (currentCart = cart) => {
//     let newSubtotal = 0;
//     currentCart.forEach((item) => {
//       newSubtotal += (item.quantity || 1) * item.productID.productPrice;
//     });

//     const newShipping = newSubtotal > 0 ? 150 : 0;
//     setSubtotal(newSubtotal);
//     setShipping(newShipping);
//     setTotal(newSubtotal + newShipping);
//   };

//   const handleDelete = (id) => {
//     const confirmDialog = window.confirm(
//       "Are you sure you want to remove this item from the cart?"
//     );
//     if (confirmDialog) {
//       removeFromCartApi(id)
//         .then((res) => {
//           if (res.data.success) {
//             setCart(cart.filter((item) => item._id !== id));
//             toast.success(res.data.message);
//           } else {
//             toast.error(res.data.message);
//           }
//         })
//         .catch((error) => {
//           toast.error("Server Error");
//           console.error(error.message);
//         });
//     }
//   };

//   const handleQuantityChange = (itemId, newQuantity) => {
//     // Check if the new quantity is within the valid range
//     if (newQuantity < 1 || newQuantity > 5) {
//       console.error("Quantity must be between 1 and 5.");
//       return;
//     }

//     // Update the cart with the new quantity for the specified item
//     const updatedCart = cart.map((item) =>
//       item._id === itemId ? { ...item, quantity: newQuantity } : item
//     );

//     // Update the cart state with the updated items
//     setCart(updatedCart);

//     // Recalculate the total for the cart with the updated cart data
//     calculateCartTotal(updatedCart);

//     // Optionally, you can also sync the updated cart with the backend (API)
//     // updateCartOnServer(updatedCart); // Uncomment if needed
//   };

//   const handleProceedToCheckout = () => {
//     setShowPopup(true);
//   };

//   const handleConfirmOrder = () => {
//     if (paymentMethod === "Khalti") {
//       handleKhaltiPayment();
//     } else if (paymentMethod === "COD") {
//       const confirmDialog = window.confirm(
//         "Do you really want to place the order?"
//       );
//       if (confirmDialog) {
//         saveOrder("Cash on Delivery");
//       }
//     }
//   };

//   const handleKhaltiPayment = () => {
//     let config = {
//       publicKey: "test_public_key_0800545e039d45368cab4d1b2fb93d01",
//       productIdentity: "1234567890",
//       productName: "Cart Items",
//       productUrl: "https://example.com/cart",
//       eventHandler: {
//         onSuccess(payload) {
//           console.log("Khalti success payload:", payload);
//           toast.success("Payment Successful!");
//           saveOrder("Payment made via Khalti");
//         },
//         onError(error) {
//           console.log("Khalti error:", error);
//           toast.error("Payment Failed. Please try again.");
//         },
//         onClose() {
//           console.log("Khalti widget is closing");
//         },
//       },
//       paymentPreference: [
//         "KHALTI",
//         "EBANKING",
//         "MOBILE_BANKING",
//         "CONNECT_IPS",
//         "SCT",
//       ],
//     };

//     let checkout = new KhaltiCheckout(config);
//     checkout.show({ amount: total * 100 });
//   };

//   const saveOrder = (paymentMethod) => {
//     const cartIDs = cart.map((item) => item._id);
//     const orderData = {
//       userId: user._id,
//       carts: cartIDs,
//       total,
//       address: selectedAddress,
//       paymentType: paymentMethod,
//     };

//     createOrderApi(orderData)
//       .then((res) => {
//         if (res.data.success) {
//           toast.success("Order placed successfully!");
//           setCart([]); // Clear the cart
//           setShowPopup(false);
//         } else {
//           toast.error(res.data.message);
//         }
//       })
//       .catch((err) => {
//         message.error("Server Error");
//         console.log("Order creation error:", err.message);
//       });
//   };

//   const handleAddressChange = (value) => {
//     if (value === "add-new") {
//       navigate("/address");
//     } else {
//       setSelectedAddress(value);
//     }
//   };

//   return (
//     <>
//       <div className="container mx-auto p-4">
//         <div className="cart-container">
//           {cart && cart.length > 0 ? (
//             <>
//               <table className="w-full table-auto">
//                 <thead>
//                   <tr className="text-left border-b">
//                     <th className="py-2">PRODUCT</th>
//                     <th className="py-2">NAME</th>
//                     <th className="py-2">PRICE</th>
//                     <th className="py-2">QTY</th>
//                     <th className="py-2">SUBTOTAL</th>
//                     <th className="py-2">ACTIONS</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cart.map((cart) => (
//                     <tr key={cart._id} className="border-b">
//                       <td className="flex items-center py-4">
//                         <img
//                           src={`https://localhost:5500/products/${cart.productID.productImage}`}
//                           alt={cart.productID.productName}
//                           className="w-20 h-20"
//                         />
//                       </td>
//                       <td>{cart.productID.productName}</td>
//                       <td>NPR. {cart.productID.productPrice}</td>
//                       <td className="flex items-center">
//                         <button
//                           className="qty-btn bg-white border-0 p-1 fs-4"
//                           onClick={() =>
//                             handleQuantityChange(cart._id, cart.quantity - 1)
//                           }
//                         >
//                           -
//                         </button>
//                         <span className="mx-2">{cart.quantity || 1}</span>
//                         <button
//                           className="qty-btn bg-white border-0 p-1 fs-4"
//                           onClick={() =>
//                             handleQuantityChange(cart._id, cart.quantity + 1)
//                           }
//                         >
//                           +
//                         </button>
//                       </td>
//                       <td>
//                         NPR.{" "}
//                         {(cart.quantity || 1) * cart.productID.productPrice}
//                       </td>
//                       <td className="flex justify-around">
//                         <button
//                           onClick={() => handleDelete(cart._id)}
//                           className="btn btn-danger"
//                         >
//                           <DeleteOutlineIcon />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="summary-container mt-8">
//                 <div className="summary">
//                   <h4 className="summary-heading">Order Summary</h4>
//                   <div className="flex justify-between py-2 font-bold">
//                     <span>Subtotal</span>
//                     <span>NPR. {subtotal}</span>
//                   </div>
//                   <div className="flex justify-between py-2 font-bold">
//                     <span>Shipping fee</span>
//                     <span>NPR. {shipping}</span>
//                   </div>
//                   <div className="total mt-4 pt-4 border-t flex justify-between text-lg font-semibold">
//                     <span>TOTAL</span>
//                     <span>NPR. {total}</span>
//                   </div>
//                   <div className="mt-4 text-center">
//                     <button
//                       className=" btn btn-outline-dark w-100"
//                       onClick={handleProceedToCheckout}
//                     >
//                       Continue
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <p>Your Cart is empty</p>
//           )}

//           {showPopup && (
//             <div className="popup-container">
//               <div className="popup-content">
//                 <h2>Continue to Order</h2>
//                 <div>
//                   <label htmlFor="address-select">Select Address:</label>
//                   <select
//                     id="address-select"
//                     value={selectedAddress}
//                     onChange={(e) => handleAddressChange(e.target.value)}
//                   >
//                     <option value="">Select an address</option>
//                     {addresses.map((address, index) => (
//                       <option key={index} value={address.address}>
//                         {address.address}
//                       </option>
//                     ))}
//                     <option value="add-new">Add New Address</option>
//                   </select>
//                 </div>
//                 <div className="payment-method">
//                   <h3>Payment Method</h3>
//                   <label>
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="Khalti"
//                       checked={paymentMethod === "Khalti"}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                     />
//                     Khalti
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="COD"
//                       checked={paymentMethod === "COD"}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                     />
//                     Cash on Delivery
//                   </label>
//                 </div>
//                 <div className="mt-4 text-center">
//                   <button
//                     className="btn btn-outline-dark w-100"
//                     onClick={handleConfirmOrder}
//                   >
//                     Continue to Order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//           {showAddressForm && (
//             <AddressForm
//               onSubmit={(newAddress) => {
//                 setAddresses([...addresses, newAddress]);
//                 setSelectedAddress(newAddress._id);
//                 setShowAddressForm(false);
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { message } from "antd";
import KhaltiCheckout from "khalti-checkout-web";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createOrderApi,
  getAddress,
  getCartByUserIDApi,
  removeFromCartApi,
  updateCartApi,
} from "../../../apis/Api";
import AddressForm from "../../address/AddressForm";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (user && user._id) {
      getCartByUserIDApi(user._id)
        .then((res) => {
          if (res.data.cart) {
            setCart(res.data.cart);
          }
        })
        .catch((err) => {
          toast.error("Server Error");
          console.error(err.message);
        });
    }
  }, [user]);

  useEffect(() => {
    calculateCartTotal();
  }, [cart]);

  useEffect(() => {
    if (cartUpdated) {
      const updatedProducts = cart.map((item) => ({
        productID: item.productID._id,
        quantity: item.quantity,
      }));

      updateCartApi(user._id, { products: updatedProducts })
        .then((res) => {
          console.log("Cart update response:", res.data);
          setCartUpdated(false);
        })
        .catch((error) => {
          console.error("Cart update error:", error.message);
          setCartUpdated(false);
        });
    }
  }, [cart, cartUpdated, user._id]);

  const calculateCartTotal = () => {
    let newSubtotal = 0;

    cart.forEach((item) => {
      newSubtotal += (item.quantity || 1) * item.productID.productPrice;
    });

    setSubtotal(newSubtotal);
    setShipping(newSubtotal > 0 ? 150 : 0);
    setTotal(newSubtotal + shipping);
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmDialog) {
      removeFromCartApi(id)
        .then((res) => {
          if (res.data.success) {
            setCart(cart.filter((item) => item._id !== id));
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          toast.error("Server Error");
          console.error(error.message);
        });
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 5) return;

    const updatedCart = cart.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    setCartUpdated(true);
  };

  const handleProceedToCheckout = () => {
    setCartUpdated(true);
    setShowPopup(true);
  };

  const handleConfirmOrder = () => {
    if (paymentMethod === "Khalti") {
      handleKhaltiPayment();
    } else if (paymentMethod === "COD") {
      const confirmDialog = window.confirm(
        "Do you really want to place the order?"
      );
      if (confirmDialog) {
        saveOrder("Cash on Delivery");
      }
    }
  };

  const handleKhaltiPayment = () => {
    let config = {
      publicKey: "test_public_key_0800545e039d45368cab4d1b2fb93d01",
      productIdentity: "1234567890",
      productName: "Cart Items",
      productUrl: "https://example.com/cart",
      eventHandler: {
        onSuccess(payload) {
          console.log("Khalti success payload:", payload);
          toast.success("Payment Successful!");
          saveOrder("Payment made via Khalti");
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

  const saveOrder = (paymentMethod) => {
    const cartIDs = cart.map((item) => item._id);
    console.log("Cart IDs:", cartIDs);

    const orderData = {
      userId: user._id,
      carts: cartIDs,
      total,
      address: selectedAddress,
      paymentType: paymentMethod,
    };
    console.log("Order Data:", orderData);

    createOrderApi(orderData)
      .then((res) => {
        console.log("Order creation response:", res.data);
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success("Order placed successfully!");
          setCart([]); // Clear the cart
          setShowPopup(false);
        }
      })
      .catch((err) => {
        message.error("Server Error");
        console.log("Order creation error:", err.message);
      });
  };

  useEffect(() => {
    if (user && user._id) {
      getAddress(user._id)
        .then((res) => {
          if (res.data && Array.isArray(res.data.addresses)) {
            setAddresses(res.data.addresses);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }, [user]);

  const handleAddressChange = (value) => {
    if (value === "add-new") {
      navigate("/address");
    } else {
      setSelectedAddress(value);
    }
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
                <button
                  className="continue-btn"
                  onClick={handleProceedToCheckout}
                >
                  Continue
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
                onChange={(e) => handleAddressChange(e.target.value)}
              >
                <option value="">Select an address</option>
                {addresses.map((address, index) => (
                  <option key={index} value={address.address}>
                    {address.address}
                  </option>
                ))}
                <option value="add-new">Add New Address</option>
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
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Khalti
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>
            <div className="mt-4 text-center">
              <button className="continue-btn" onClick={handleConfirmOrder}>
                Continue to Order
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddressForm && (
        <AddressForm
          onSubmit={(newAddress) => {
            setAddresses([...addresses, newAddress]);
            setSelectedAddress(newAddress._id);
            setShowAddressForm(false);
          }}
        />
      )}
    </>
  );
};

export default Cart;

// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { message } from "antd";
// import KhaltiCheckout from "khalti-checkout-web";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   createOrderApi,
//   getAddress,
//   getCartByUserIDApi,
//   removeFromCartApi,
//   updateCartApi,
// } from "../../../apis/Api";
// import AddressForm from "../../address/AddressForm";
// import "./Cart.css";

// const Cart = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [cart, setCart] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [shipping, setShipping] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [addresses, setAddresses] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [prevCartQuantities, setPrevCartQuantities] = useState([]);

//   // Fetch cart and address data once on component mount
//   useEffect(() => {
//     if (user && user._id) {
//       Promise.all([getCartByUserIDApi(user._id), getAddress(user._id)])
//         .then(([cartRes, addressRes]) => {
//           if (cartRes.data.cart) {
//             setCart(cartRes.data.cart);
//             setPrevCartQuantities(
//               cartRes.data.cart.map((item) => ({
//                 id: item._id,
//                 quantity: item.quantity,
//               }))
//             ); // Set initial quantities
//             calculateCartTotal(cartRes.data.cart); // Initial calculation
//           }
//           if (addressRes.data && Array.isArray(addressRes.data.addresses)) {
//             setAddresses(addressRes.data.addresses);
//           }
//         })
//         .catch((err) => {
//           toast.error("Error fetching data");
//           console.error(err.message);
//         });
//     }
//   }, []);

//   // Update cart data on quantity change
//   useEffect(() => {
//     const currentQuantities = cart.map((item) => ({
//       id: item._id,
//       quantity: item.quantity,
//     }));

//     const hasQuantityChanged = !prevCartQuantities.every((prevItem) => {
//       const currentItem = currentQuantities.find(
//         (item) => item.id === prevItem.id
//       );
//       return currentItem && currentItem.quantity === prevItem.quantity;
//     });

//     if (hasQuantityChanged) {
//       const updatedProducts = cart.map((item) => ({
//         productID: item.productID._id,
//         quantity: item.quantity,
//       }));

//       updateCartApi(user._id, { products: updatedProducts })
//         .then((res) => {
//           console.log("Cart update response:", res.data);
//         })
//         .catch((error) => {
//           console.error("Cart update error:", error.message);
//         });

//       setPrevCartQuantities(currentQuantities);
//     }
//   }, [cart, user._id, prevCartQuantities]);

//   const calculateCartTotal = (currentCart = cart) => {
//     let newSubtotal = 0;
//     currentCart.forEach((item) => {
//       newSubtotal += (item.quantity || 1) * item.productID.productPrice;
//     });

//     const newShipping = newSubtotal > 0 ? 150 : 0;
//     setSubtotal(newSubtotal);
//     setShipping(newShipping);
//     setTotal(newSubtotal + newShipping);
//   };

//   const handleDelete = (id) => {
//     const confirmDialog = window.confirm(
//       "Are you sure you want to remove this item from the cart?"
//     );
//     if (confirmDialog) {
//       removeFromCartApi(id)
//         .then((res) => {
//           if (res.data.success) {
//             setCart(cart.filter((item) => item._id !== id));
//             toast.success(res.data.message);
//           } else {
//             toast.error(res.data.message);
//           }
//         })
//         .catch((error) => {
//           toast.error("Server Error");
//           console.error(error.message);
//         });
//     }
//   };

//   const handleQuantityChange = (itemId, newQuantity) => {
//     if (newQuantity < 1 || newQuantity > 5) return;

//     const updatedCart = cart.map((item) =>
//       item._id === itemId ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(updatedCart);
//     calculateCartTotal(updatedCart); // Recalculate total locally
//   };

//   const handleProceedToCheckout = () => {
//     setShowPopup(true);
//   };

//   const handleConfirmOrder = () => {
//     if (paymentMethod === "Khalti") {
//       handleKhaltiPayment();
//     } else if (paymentMethod === "COD") {
//       const confirmDialog = window.confirm(
//         "Do you really want to place the order?"
//       );
//       if (confirmDialog) {
//         saveOrder("Cash on Delivery");
//       }
//     }
//   };

//   const handleKhaltiPayment = () => {
//     let config = {
//       publicKey: "test_public_key_0800545e039d45368cab4d1b2fb93d01",
//       productIdentity: "1234567890",
//       productName: "Cart Items",
//       productUrl: "http://example.com/cart",
//       eventHandler: {
//         onSuccess(payload) {
//           console.log("Khalti success payload:", payload);
//           toast.success("Payment Successful!");
//           saveOrder("Payment made via Khalti");
//         },
//         onError(error) {
//           console.log("Khalti error:", error);
//           toast.error("Payment Failed. Please try again.");
//         },
//         onClose() {
//           console.log("Khalti widget is closing");
//         },
//       },
//       paymentPreference: [
//         "KHALTI",
//         "EBANKING",
//         "MOBILE_BANKING",
//         "CONNECT_IPS",
//         "SCT",
//       ],
//     };

//     let checkout = new KhaltiCheckout(config);
//     checkout.show({ amount: total * 100 });
//   };

//   const saveOrder = (paymentMethod) => {
//     const cartIDs = cart.map((item) => item._id);
//     const orderData = {
//       userId: user._id,
//       carts: cartIDs,
//       total,
//       address: selectedAddress,
//       paymentType: paymentMethod,
//     };

//     createOrderApi(orderData)
//       .then((res) => {
//         if (res.data.success) {
//           toast.success("Order placed successfully!");
//           setCart([]); // Clear the cart
//           setShowPopup(false);
//         } else {
//           toast.error(res.data.message);
//         }
//       })
//       .catch((err) => {
//         message.error("Server Error");
//         console.log("Order creation error:", err.message);
//       });
//   };

//   const handleAddressChange = (value) => {
//     if (value === "add-new") {
//       navigate("/address");
//     } else {
//       setSelectedAddress(value);
//     }
//   };

//   return (
//     <>
//       <div className='container mx-auto p-4'>
//         <div className='cart-container'>
//           {cart && cart.length > 0 ? (
//             <>
//               <table className='w-full table-auto'>
//                 <thead>
//                   <tr className='text-left border-b'>
//                     <th className='py-2'>PRODUCT</th>
//                     <th className='py-2'>NAME</th>
//                     <th className='py-2'>PRICE</th>
//                     <th className='py-2'>QTY</th>
//                     <th className='py-2'>SUBTOTAL</th>
//                     <th className='py-2'>ACTIONS</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cart.map((cart) => (
//                     <tr key={cart._id} className='border-b'>
//                       <td className='flex items-center py-4'>
//                         <img
//                           src={`http://localhost:5500/products/${cart.productID.productImage}`}
//                           alt={cart.productID.productName}
//                           className='w-20 h-20'
//                         />
//                       </td>
//                       <td>{cart.productID.productName}</td>
//                       <td>NPR. {cart.productID.productPrice}</td>
//                       <td className='flex items-center'>
//                         <button
//                           className='qty-btn bg-white border-0 p-1 fs-4'
//                           onClick={() =>
//                             handleQuantityChange(cart._id, cart.quantity - 1)
//                           }
//                         >
//                           -
//                         </button>
//                         <span className='mx-2'>{cart.quantity || 1}</span>
//                         <button
//                           className='qty-btn bg-white border-0 p-1 fs-4'
//                           onClick={() =>
//                             handleQuantityChange(cart._id, cart.quantity + 1)
//                           }
//                         >
//                           +
//                         </button>
//                       </td>
//                       <td>
//                         NPR.{" "}
//                         {(cart.quantity || 1) * cart.productID.productPrice}
//                       </td>
//                       <td className='flex justify-around'>
//                         <button
//                           onClick={() => handleDelete(cart._id)}
//                           className='btn btn-danger'
//                         >
//                           <DeleteOutlineIcon />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className='summary-container mt-8'>
//                 <div className='summary'>
//                   <h4 className='summary-heading'>Order Summary</h4>
//                   <div className='flex justify-between py-2 font-bold'>
//                     <span>Subtotal</span>
//                     <span>NPR. {subtotal}</span>
//                   </div>
//                   <div className='flex justify-between py-2 font-bold'>
//                     <span>Shipping fee</span>
//                     <span>NPR. {shipping}</span>
//                   </div>
//                   <div className='total mt-4 pt-4 border-t flex justify-between text-lg font-semibold'>
//                     <span>TOTAL</span>
//                     <span>NPR. {total}</span>
//                   </div>
//                   <div className='mt-4 text-center'>
//                     <button
//                       className=' btn btn-outline-dark w-100'
//                       onClick={handleProceedToCheckout}
//                     >
//                       Continue
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <p>Your Cart is empty</p>
//           )}

//           {showPopup && (
//             <div className='popup-container'>
//               <div className='popup-content'>
//                 <h2>Continue to Order</h2>
//                 <div>
//                   <label htmlFor='address-select'>Select Address:</label>
//                   <select
//                     id='address-select'
//                     value={selectedAddress}
//                     onChange={(e) => handleAddressChange(e.target.value)}
//                   >
//                     <option value=''>Select an address</option>
//                     {addresses.map((address, index) => (
//                       <option key={index} value={address.address}>
//                         {address.address}
//                       </option>
//                     ))}
//                     <option value='add-new'>Add New Address</option>
//                   </select>
//                 </div>
//                 <div className='payment-method'>
//                   <h3>Payment Method</h3>
//                   <label>
//                     <input
//                       type='radio'
//                       name='paymentMethod'
//                       value='Khalti'
//                       checked={paymentMethod === "Khalti"}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                     />
//                     Khalti
//                   </label>
//                   <label>
//                     <input
//                       type='radio'
//                       name='paymentMethod'
//                       value='COD'
//                       checked={paymentMethod === "COD"}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                     />
//                     Cash on Delivery
//                   </label>
//                 </div>
//                 <div className='mt-4 text-center'>
//                   <button
//                     className='btn btn-outline-dark w-100'
//                     onClick={handleConfirmOrder}
//                   >
//                     Continue to Order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//           {showAddressForm && (
//             <AddressForm
//               onSubmit={(newAddress) => {
//                 setAddresses([...addresses, newAddress]);
//                 setSelectedAddress(newAddress._id);
//                 setShowAddressForm(false);
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;
