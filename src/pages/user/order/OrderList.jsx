// import { Skeleton } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import styled from 'styled-components';
// import { getShippingAddressById, getUserOrdersApi } from '../../../apis/Api'; // Ensure this API exists

// const PageContainer = styled.div`
//   background-color: #f0f2f5;
//   min-height: 100vh;
//   padding: 2rem;
// `;

// const OrderListContainer = styled.div`
//   max-width: 1000px;
//   margin: 0 auto;
// `;

// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
// `;

// const Header = styled.h2`
//   color: #1a237e;
//   font-size: 2rem;
//   margin: 0;
// `;

// const FilterSelect = styled.select`
//   padding: 0.5rem;
//   font-size: 1rem;
//   border-radius: 4px;
//   border: 1px solid #ddd;
// `;

// const OrderCard = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   margin-bottom: 2rem;
//   padding: 1.5rem;
// `;

// const OrderHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// const OrderId = styled.h3`
//   color: #1a237e;
//   font-size: 1.2rem;
//   margin: 0;
// `;

// const Status = styled.span`
//   background-color: ${(props) => {
//         switch (props.status) {
//             case 'dispatched':
//                 return '#4caf50';
//             case 'pending':
//                 return '#ff9800';
//             case 'cancelled':
//                 return '#f44336';
//             default:
//                 return '#2196f3';
//         }
//     }};
//   color: white;
//   padding: 0.5rem 1rem;
//   border-radius: 20px;
//   font-size: 0.9rem;
// `;

// const OrderInfo = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1rem;
//   margin-bottom: 1rem;
// `;

// const InfoItem = styled.p`
//   margin: 0;
//   color: #424242;
// `;

// const ItemsList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const Item = styled.li`
//   background-color: #f5f5f5;
//   border-radius: 4px;
//   padding: 1rem;
//   margin-bottom: 0.5rem;
//   display: flex;
//   align-items: center;
// `;

// const ProductImage = styled.img`
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
//   margin-right: 1rem;
//   border-radius: 4px;
// `;

// const AddressDetails = styled.div`
//   margin-top: 1rem;
//   padding: 1rem;
//   background-color: #f9f9f9;
//   border-radius: 4px;
// `;

// const OrderList = () => {
//     const [orders, setOrders] = useState([]);
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedStatus, setSelectedStatus] = useState('all');
//     const [addressDetails, setAddressDetails] = useState(null);
//     const [loadingAddress, setLoadingAddress] = useState(false);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const data = await getUserOrdersApi();
//                 console.log('Fetched Orders:', data); // Debugging
//                 setOrders(data.data.orders);
//                 setFilteredOrders(data.data.orders); // Initialize filteredOrders
//             } catch (err) {
//                 console.error('Error fetching orders:', err);
//                 toast.error('Failed to fetch orders');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     useEffect(() => {
//         // Filter orders based on selected status
//         if (selectedStatus === 'all') {
//             setFilteredOrders(orders);
//         } else {
//             setFilteredOrders(orders.filter(order => order.status === selectedStatus));
//         }
//     }, [selectedStatus, orders]);

//     useEffect(() => {
//         if (addressDetails) {
//             const fetchAddressDetails = async () => {
//                 setLoadingAddress(true);
//                 try {
//                     const response = await getShippingAddressById(addressDetails);
//                     setAddressDetails(response.data.address);
//                 } catch (error) {
//                     console.error('Error fetching shipping address:', error);
//                     toast.error('Failed to fetch shipping address');
//                 } finally {
//                     setLoadingAddress(false);
//                 }
//             };

//             fetchAddressDetails();
//         }
//     }, [addressDetails]);

//     const handleStatusChange = (e) => {
//         setSelectedStatus(e.target.value);
//     };

//     const handleViewAddress = (addressId) => {
//         setAddressDetails(addressId);
//     };

//     if (loading) {
//         return (
//             <PageContainer>
//                 <OrderListContainer>
//                     <HeaderContainer>
//                         <Header>Your Orders</Header>
//                         <FilterSelect value={selectedStatus} onChange={handleStatusChange}>
//                             <option value="all">All Statuses</option>
//                             <option value="pending">Pending</option>
//                             <option value="confirm">Confirm</option>
//                             <option value="shipping">Shipping</option>
//                             <option value="delivered">Delivered</option>
//                             <option value="cancel">Canceled</option>
//                         </FilterSelect>
//                     </HeaderContainer>
//                     {[...Array(3)].map((_, index) => (
//                         <Skeleton key={index} active avatar paragraph={{ rows: 4 }} />
//                     ))}
//                 </OrderListContainer>
//             </PageContainer>
//         );
//     }

//     if (!filteredOrders.length) {
//         return (
//             <PageContainer>
//                 <OrderListContainer>
//                     <HeaderContainer>
//                         <Header>Your Orders</Header>
//                         <FilterSelect value={selectedStatus} onChange={handleStatusChange}>
//                             <option value="all">All Statuses</option>
//                             <option value="pending">Pending</option>
//                             <option value="confirm">Confirm</option>
//                             <option value="shipping">Shipping</option>
//                             <option value="delivered">Delivered</option>
//                             <option value="cancel">Canceled</option>
//                         </FilterSelect>
//                     </HeaderContainer>
//                     <p>No orders found.</p>
//                 </OrderListContainer>
//             </PageContainer>
//         );
//     }

//     return (
//         <PageContainer>
//             <OrderListContainer>
//                 <HeaderContainer>
//                     <Header>Your Orders</Header>
//                     <FilterSelect value={selectedStatus} onChange={handleStatusChange}>
//                         <option value="all">All Statuses</option>
//                         <option value="pending">Pending</option>
//                         <option value="confirm">Confirm</option>
//                         <option value="shipping">Shipping</option>
//                         <option value="delivered">Delivered</option>
//                         <option value="cancel">Canceled</option>
//                     </FilterSelect>
//                 </HeaderContainer>
//                 {filteredOrders.map((order) => (
//                     <OrderCard key={order._id}>
//                         <OrderHeader>
//                             <OrderId>Order ID: {order._id}</OrderId>
//                             <Status status={order.status}>{order.status}</Status>
//                         </OrderHeader>
//                         <OrderInfo>
//                             <InfoItem>
//                                 <strong>Total:</strong> Rs. {order.total}
//                             </InfoItem>
//                             <InfoItem>
//                                 <strong>Payment:</strong> {order.paymentType}
//                             </InfoItem>
//                             <InfoItem>
//                                 <strong>Address:</strong> {order.address}
//                             </InfoItem>
//                             <InfoItem>
//                                 <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
//                             </InfoItem>
//                         </OrderInfo>
//                         <h4>Items:({order.carts.length})</h4>
//                         <ItemsList>
//                             {order.carts.map((item) => (
//                                 <Item key={item._id}>
//                                     <ProductImage src={`https://localhost:5500/products/${item.productID.productImage}`} alt={item.productID.productName} />
//                                     <div>
//                                         <p>
//                                             <strong>Product:</strong> {item.productID.productName}
//                                         </p>
//                                         <p>
//                                             <strong>Quantity:</strong> {item.quantity}
//                                         </p>
//                                         <p>
//                                             <strong>Price:</strong> Rs. {item.productID.productPrice}
//                                         </p>
//                                         <p>
//                                             <strong>Total:</strong> Rs. {item.quantity * item.productID.productPrice}
//                                         </p>
//                                     </div>
//                                 </Item>
//                             ))}
//                         </ItemsList>
//                         <button onClick={() => handleViewAddress(order.shippingAddressId)}>View Shipping Address</button>

//                         {/* Display address details if available */}
//                         {addressDetails === order.shippingAddressId && (
//                             <AddressDetails>
//                                 {loadingAddress ? (
//                                     <Skeleton active paragraph={{ rows: 3 }} />
//                                 ) : (
//                                     <>
//                                         <p><strong>Address:</strong> {order.address}</p>
//                                         {/* You can display more detailed address information here if needed */}
//                                     </>
//                                 )}
//                             </AddressDetails>
//                         )}
//                     </OrderCard>
//                 ))}
//             </OrderListContainer>
//         </PageContainer>
//     );
// };

// export default OrderList;

import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getShippingAddressById, getUserOrdersApi } from "../../../apis/Api";

const PageContainer = styled.div`
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 2rem;
`;

const OrderListContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Header = styled.h2`
  color: #1a237e;
  font-size: 2rem;
  margin: 0;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const OrderCardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1.5rem;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Status = styled.span`
  background-color: ${(props) =>
    ({
      dispatched: "#4caf50",
      pending: "#ff9800",
      cancelled: "#f44336",
    }[props.status] || "#2196f3")};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const ItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AddressDetails = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const OrderCard = ({
  order,
  onViewAddress,
  addressDetails,
  loadingAddress,
}) => (
  <OrderCardContainer>
    <OrderHeader>
      <h3>Order ID: {order._id}</h3>
      <Status status={order.status}>{order.status}</Status>
    </OrderHeader>
    <p>
      <strong>Total:</strong> Rs. {order.total}
    </p>
    <h4>Items:</h4>
    <ItemsList>
      {order.carts.map((item) => (
        <li key={item._id}>
          {item.productID.productName} - Rs. {item.productID.productPrice} x{" "}
          {item.quantity}
        </li>
      ))}
    </ItemsList>
    <button onClick={() => onViewAddress(order.shippingAddressId)}>
      View Shipping Address
    </button>
    {addressDetails === order.shippingAddressId && (
      <AddressDetails>
        {loadingAddress ? (
          <Skeleton active paragraph={{ rows: 3 }} />
        ) : (
          <p>{order.address}</p>
        )}
      </AddressDetails>
    )}
  </OrderCardContainer>
);

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [addressDetails, setAddressDetails] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getUserOrdersApi();
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      } catch {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered =
      selectedStatus === "all"
        ? orders
        : orders.filter((order) => order.status === selectedStatus);
    setFilteredOrders(filtered);
  }, [selectedStatus, orders]);

  const handleViewAddress = async (addressId) => {
    setLoadingAddress(true);
    try {
      const { data } = await getShippingAddressById(addressId);
      setAddressDetails(data.address);
    } catch {
      toast.error("Failed to fetch shipping address");
    } finally {
      setLoadingAddress(false);
    }
  };

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <PageContainer>
      <OrderListContainer>
        <HeaderContainer>
          <Header>Your Orders</Header>
          <FilterSelect
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="dispatched">Dispatched</option>
            <option value="cancelled">Cancelled</option>
          </FilterSelect>
        </HeaderContainer>
        {filteredOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onViewAddress={handleViewAddress}
            addressDetails={addressDetails}
            loadingAddress={loadingAddress}
          />
        ))}
      </OrderListContainer>
    </PageContainer>
  );
};

export default OrderList;
