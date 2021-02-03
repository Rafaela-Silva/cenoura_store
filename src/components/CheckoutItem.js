import React from "react";
import CartItem from "./CartItem";

const CheckoutItem = props => {
  const { cartItem, cartKey } = props;

  const { product, amount } = cartItem;
  return (
    <div className="column is-full">
        <div className="checkout-name">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-secondary">R$ {product.price * amount}</span>
              <br/>
            </b>
        </div>

        <div className="checkout-amount">
            <small>{`${amount} unidade(s)`}</small>
        </div>
    </div>
  );
};

export default CheckoutItem;
