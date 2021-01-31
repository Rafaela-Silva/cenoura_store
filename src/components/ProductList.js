import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

const ProductList = props => {
  const { products } = props.context;

  return (
    <>
        <div className="container mt-6 mb-5">
              <h4 className="title title-products">Nossos Produtos</h4>
              <figure className="image image-separator mt-6 mb-3" style={{width: "30%"}}>
                  <img
                  src="separator.svg"
                  alt="Divisor gatinho"
                  />
              </figure>
        </div>
        <br />
      <br/>
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                Sem produtos disponíveis!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(ProductList);
