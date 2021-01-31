// ./src/components/Cart.js

import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";

const Cart = props => {
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  return (
    <>
    <div className="container mt-6 mb-5">
          <h4 className="title title-products">Carrinho</h4>
          <figure className="image image-separator img-cart mt-6 mb-3" style={{width: "30%", transform: [{ rotateY: '180deg'}]}}>
              <img
              src="separator.svg"
              alt="Divisor gatinho"
              />
          </figure>
    </div>

      <br />
      <div className="container">
        {cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-left">
                <button
                  onClick={props.context.clearCart}
                  className="button is-warning "
                >
                  Limpar carrinho
                </button>{" "}
              </div>
              <div className="is-pulled-right">
                  <button
                  className="button is-success"
                  onClick={props.context.checkout}
                  >
                  Checkout
                  </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">Nenhum item no carrinho!</div>
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(Cart);
