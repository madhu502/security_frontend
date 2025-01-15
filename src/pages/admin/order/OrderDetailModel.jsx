// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Table from 'react-bootstrap/Table';

// const OrderDetailsModal = ({ show, onHide, order, productsCache }) => {
//     if (!order) return null;

//     // Calculate the subtotal dynamically
//     const subtotal = order.carts.reduce((acc, item) => {
//         const product = productsCache[item.productID];
//         const price = product ? product.productPrice : 0; // Fallback to 0 if product price isn't available
//         return acc + item.quantity * price;
//     }, 0);

//     return (
//         <Modal show={show} onHide={onHide} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Order Details</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div style={{ marginBottom: '20px' }}>
//                     <p><strong>Order ID:</strong> {order._id}</p>
//                     <p><strong>User Name:</strong> {order.userId.firstname} {order.userId.lastname}</p>
//                     <p><strong>Phone Number:</strong> {order.userId.phone}</p>
//                     <p><strong>Address:</strong> {order.address}</p>
//                     <p><strong>Payment Method:</strong> {order.paymentType}</p>
//                     <p><strong>Status:</strong> {order.status}</p>
//                 </div>
//                 <hr />
//                 <h5>Products:</h5>
//                 <Table striped bordered hover size="sm">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Product Name</th>
//                             <th>Quantity</th>
//                             <th>Price</th>
//                             <th>Total</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {order.carts && Array.isArray(order.carts) && order.carts.length > 0 ? (
//                             order.carts.map((item, index) => {
//                                 const product = productsCache[item.productID];
//                                 const price = product ? product.productPrice : 0; // Fallback to 0 if product price isn't available
//                                 return (
//                                     <tr key={item._id}>
//                                         <td>{index + 1}</td>
//                                         <td>{product ? product.productName : 'Unknown'}</td>
//                                         <td>{item.quantity}</td>
//                                         <td>{price}</td>
//                                         <td>{item.quantity * price}</td>
//                                     </tr>
//                                 );
//                             })
//                         ) : (
//                             <tr>
//                                 <td colSpan="5" className="text-center">No products</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>
//                 <hr />
//                 <div style={{ textAlign: 'right' }}>
//                     <p><strong>Subtotal:</strong> {subtotal}</p>
//                     <p><strong>Shipping:</strong> {order.total - subtotal}</p>
//                     <p><strong>Total:</strong> {order.total}</p>
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onHide}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default OrderDetailsModal;

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const OrderDetailsModal = ({ show, onHide, order, productsCache }) => {
    const [address, setAddress] = useState(null);

    // useEffect(() => {
    //     if (order && order.address) {
    //         // Fetch the address using the API
    //         axios.get(`/api/getShippingAddressById/${order.address}`)
    //             .then(response => {
    //                 setAddress(response.data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching address:', error);
    //                 setAddress('Error fetching address');
    //             });
    //     }
    // }, [order]);

    if (!order) return null;

    // Calculate the subtotal dynamically
    const subtotal = order.carts.reduce((acc, item) => {
        const product = productsCache[item.productID];
        const price = product ? product.productPrice : 0; // Fallback to 0 if product price isn't available
        return acc + item.quantity * price;
    }, 0);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ marginBottom: '20px' }}>
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>User Name:</strong> {order.userId.firstname} {order.userId.lastname}</p>
                    <p><strong>Phone Number:</strong> {order.userId.phone}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Payment Method:</strong> {order.paymentType}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                </div>
                <hr />
                <h5>Products:</h5>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.carts && Array.isArray(order.carts) && order.carts.length > 0 ? (
                            order.carts.map((item, index) => {
                                const product = productsCache[item.productID];
                                const price = product ? product.productPrice : 0; // Fallback to 0 if product price isn't available
                                return (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{product ? product.productName : 'Unknown'}</td>
                                        <td>{item.quantity}</td>
                                        <td>{price}</td>
                                        <td>{item.quantity * price}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No products</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <hr />
                <div style={{ textAlign: 'right' }}>
                    <p><strong>Subtotal:</strong> {subtotal}</p>
                    <p><strong>Shipping:</strong> {order.total - subtotal}</p>
                    <p><strong>Total:</strong> {order.total}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderDetailsModal;