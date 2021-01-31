import React from "react";

const ProductItem = props => {
  const { product } = props;
  return (
    <div className=" column is-one-quarter-desktop is-4-tablet is-full-mobile">
      <div className="card">

          <div className="card-image">
            <figure className="image is-4by3">
              <img
                src={product.image}
                alt={product.name}
              />
            </figure>
          </div>

          <div className="card-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}<br/>
              <span className="tag is-family-secondary mt-2 mb-2">R$ {product.price}</span>
            </b>

            <br/>

            {product.stock > 0 ? (
              <small className="is-family-secondary">{product.stock + " em estoque"}</small>
            ) : (
              <small className="has-text-danger is-family-secondary">Produto indisponível</small>
            )}


            <div className="is-clearfix mt-2">
              <button
                className="button is-small is-outlined is-primary is-family-secondary is-fullwidth"
                onClick={() =>
                  props.addToCart({
                    id: product.id,
                    product,
                    amount: 1
                  })
                }
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProductItem;
