import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import withContext from "../withContext";
import CheckoutItem from "./CheckoutItem";

const Checkout = props => {
    const [items, setItems] = useState({});
    useEffect(() => {
       setItems(props.context.cart);
       props.context.clearCart();
   }, []);

   const cart = items;
   const cartKeys = Object.keys(cart || {});
  return (
    <div className="columns is-centered">
      <div className="column is-narrow has-text-centered">
            <h4 className="title title-products mt-6 mb-6">Obrigada pela compra!</h4>
            <figure className="image is-inline-block" style={{width: '315px'}}>
                <img
                src="cenosan.png"
                alt="Cenoura Checkout"
                />
            </figure>



            <h6 className="title mt-6 mb-4">Itens comprados:</h6>
            {cartKeys.length ? (

              <div className="column columns is-multiline">
              {cartKeys.map(key => (
                <CheckoutItem
                  cartKey={key}
                  key={key}
                  cartItem={cart[key]}
                />
              ))}
              </div>
            ) : (
              <div className="column">
                <div className="has-text-grey-light">Erro: nenhum item comprado.</div>
              </div>
            )}


            <button class="button is-primary mt-4">
              <span class="icon is-small">
                <i class="fas fa-long-arrow-alt-left"></i>
              </span>
              <Link to="/products" className="" style={{color: '#fff'}}>
              Voltar para Produtos
              </Link>
            </button>
      </div>
    </div>
  );
};

export default withContext(Checkout);
