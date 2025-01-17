// import React from 'react';
// import ProductCard from "./OrderComponent.jsx";
//  // Import the child component
//
// // Sample API data
// const apiData = {
//     role: "CUSTOMER",
//     username: "Uday1234",
//     products: [
//         {
//             quantity: 1,
//             total_price: 999.99,
//             image_url: "https://kodnest-docs.b-cdn.net/salessavvy/COSTOMER%20IMAGES/shirt6.png",
//             product_id: 6,
//             name: "Shirt6",
//             description: "Stylish Shirt6",
//             price_per_unit: 999.99,
//             order_id: "order_Pk43IVYsmkTqTe",
//         },
//         {
//             quantity: 3,
//             total_price: 1799.97,
//             image_url: "https://kodnest-docs.b-cdn.net/salessavvy/COSTOMER%20IMAGES/shirt2.png",
//             product_id: 2,
//             name: "Shirt2",
//             description: "Stylish Shirt2",
//             price_per_unit: 599.99,
//             order_id: "order_Pk43IVYsmkTqTe",
//         },
//         {
//             quantity: 1,
//             total_price: 599.99,
//             image_url: "https://kodnest-docs.b-cdn.net/salessavvy/COSTOMER%20IMAGES/shirt2.png",
//             product_id: 2,
//             name: "Shirt2",
//             description: "Stylish Shirt2",
//             price_per_unit: 599.99,
//             order_id: "order_Pk48aKIfwDwglv",
//         },
//         {
//             quantity: 1,
//             total_price: 599.99,
//             image_url: "https://kodnest-docs.b-cdn.net/salessavvy/COSTOMER%20IMAGES/shirt2.png",
//             product_id: 2,
//             name: "Shirt2",
//             description: "Stylish Shirt2",
//             price_per_unit: 599.99,
//             order_id: "order_Pk4ACH2AMgC1V7",
//         },
//     ],
// };
//
// // Parent component - OrderDetails
//  function OrderDetails() {
//     return (
//         <div className="container mt-5">
//             <h2>Order Details</h2>
//             <div className="row">
//                 {apiData.products.map((product, index) => (
//                     <ProductCard
//                         key={index}
//                         name={product.name}
//                         description={product.description}
//                         image_url={product.image_url}
//                         price_per_unit={product.price_per_unit}
//                         quantity={product.quantity}
//                         total_price={product.total_price}
//                         order_id={product.order_id}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }
