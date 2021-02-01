import React from "react";

const CartItem = props => {
  const { cartItem, cartKey } = props;

  const { product, amount } = cartItem;
  return (
    <div className="column is-full">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <img
                src={product.image}
                alt={product.name}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <br/>
              <span className="tag is-secondary">R$ {product.price}</span>
              <br/>
            </b>
            <br/>

            <button className="button mr-3 is-danger btn-decrease" onClick={() => props.decreaseQuantity(cartKey)}>
              <span className="icon is-small">
                <i className="fas fa-minus"></i>
              </span>
            </button>
            <small className="is-align-self-center">{`${amount} unidade(s)`}</small>
            <button className="button ml-3 is-success btn-increase" onClick={() => props.increaseQuantity(cartKey)}>
              <span className="icon is-small">
                <i className="fas fa-plus"></i>
              </span>
            </button>

            </div>
            <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}
            >
                <span className="delete is-large"></span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
