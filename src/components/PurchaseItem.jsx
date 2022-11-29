import React from "react";

const PurchaseItem = ({ purchase }) => {
  console.log(purchase);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(purchase.createdAt).toLocaleDateString(
    "en-us",
    options
  );
  return (
    <li>
      <h3>
        <b>Purchase Date: </b>
        {date}
      </h3>
      <ul>
        {purchase.cart.products.map((product) => (
          <li>
            <h3>
              <b>Product: </b>
              {product.title}
            </h3>
            <h3>
              <b>Price: </b>${product.price}
            </h3>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default PurchaseItem;
