import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

import Cart from './components/Cart';
import ProductList from './components/ProductList';

import Context from "./Context";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: {},
            products: []
        };
        this.routerRef = React.createRef();
    }

    // make sure to load an existing cart
    // make API request and set JSON response as state
    async componentDidMount() {
        let cart = localStorage.getItem("cart");

        const products = await axios.get('https://5d6da1df777f670014036125.mockapi.io/api/v1/product');
        cart = cart ? JSON.parse(cart) : {};

        this.setState({ products: products.data, cart });
    }

    // add to cart method
    // appends the item using the item id as a key for the cart object
    // using and object rather then array to unable easy data retrieval
    addToCart = cartItem => {
        let cart = this.state.cart;
        // check cart object to see if item already exists
        if (cart[cartItem.id]) {
            // if exists, only increase amount
            cart[cartItem.id].amount += cartItem.amount;
        } else {
            // if doesnt, only add to cart
            cart[cartItem.id] = cartItem;
        }
        // ensure user cant add more items than available
        if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
            cart[cartItem.id].amount = cart[cartItem.id].product.stock;
        }
        // save state to pass via context
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({ cart });
    };

    // remove an item from cart object
    removeFromCart = cartItemId => {
        let cart = this.state.cart;
        delete cart[cartItemId];
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({ cart });
    };

    // increase product amount
    increaseQuantity = cartItemId => {
        let cart = this.state.cart;
        // ensure user cant add more items than available
        if (cart[cartItemId].amount > cart[cartItemId].product.stock) {
            cart[cartItemId].amount = cart[cartItemId].product.stock;
        } else {
            cart[cartItemId].amount += 1;
        }
        // save state to pass via context
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({ cart });
    };

    // decrease product amount
    decreaseQuantity = cartItemId => {
        let cart = this.state.cart;
        // ensure user cant decrease to negative amounts
        if (cart[cartItemId].amount <= 1) {
            cart[cartItemId].amount = 1;
        } else {
            cart[cartItemId].amount -= 1;
        }
        // save state to pass via context
        localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({ cart });
    };

    // clear all items from cart
    clearCart = () => {
        let cart = {};
        localStorage.removeItem("cart");
        this.setState({ cart });
    };

    // checkout method (remove products from list and clear cart)
    checkout = () => {
        const cart = this.state.cart;

        const products = this.state.products.map(p => {
        if (cart[p.name]) {
          p.stock = p.stock - cart[p.name].amount;

          axios.put(
            `https://5d6da1df777f670014036125.mockapi.io/api/v1/product/${p.id}`,
            { ...p },
          )
        }
        return p;
        });

        this.setState({ products });
        this.clearCart();
    };

    // context with product data and cart events
    // navbar with options (route to each component view)
    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                    removeFromCart: this.removeFromCart,
                    increaseQuantity: this.increaseQuantity,
                    decreaseQuantity: this.decreaseQuantity,
                    addToCart: this.addToCart,
                    addProduct: this.addProduct,
                    clearCart: this.clearCart,
                    checkout: this.checkout
                }}
            >
                <Router ref={this.routerRef}>
                    <div className="App">
                        <nav
                            className="navbar"
                            role="navigation"
                            aria-label="main navigation"
                            >
                            <div className="navbar-brand">
                                <figure className="image is-64x64 mt-2 ml-5">
                                  <img
                                    src="cenoshine.png"
                                    alt="Logo Cenoura Store"
                                  />
                                </figure>

                                <b className="navbar-item is-size-3">Cenoura Store</b>
                                <label
                                role="button"
                                class="navbar-burger burger"
                                aria-label="menu"
                                aria-expanded="false"
                                data-target="navbarBasicExample"
                                onClick={e => {
                                    e.preventDefault();
                                    this.setState({ showMenu: !this.state.showMenu });
                                }}
                                >
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                </label>

                            </div>
                            <div className={`navbar-menu ${
                                this.state.showMenu ? "is-active" : ""
                            }`}>
                                <Link to="/products" className="navbar-item is-family-secondary">
                                Produtos
                                </Link>
                                <Link to="/cart" className="navbar-item is-family-secondary">
                                Carrinho
                                <span
                                className="tag is-primary is-family-secondary"
                                style={{ marginLeft: "5px" }}
                                >
                                { Object.keys(this.state.cart).length }
                                </span>
                                </Link>
                            </div>
                        </nav>


                        <Switch>
                            <Route exact path="/" component={ProductList} />
                            <Route exact path="/cart" component={Cart} />
                            <Route exact path="/products" component={ProductList} />
                        </Switch>

                    </div>
                    <footer class="footer mt-6" style={{backgroundColor: '#f0626f', color: '#fff6e3'}}>
                        <div class="content has-text-centered">
                            <p>
                            Feito com ♥ por Rafaela Souza.
                            </p>
                            <span class="icon is-medium">
                                <a href="https://github.com/Rafaela-Silva?tab=repositories"><i class="fab fa-github fa-2x" style={{color: '#fff6e3'}}></i></a>
                            </span>
                            <span class="icon is-medium ml-4">
                                <a href="https://www.linkedin.com/in/rafaela-souza-6a00b417a/"><i class="fab fa-linkedin fa-2x" style={{color: '#fff6e3'}}></i></a>
                            </span>
                        </div>
                    </footer>
                </Router>
        </Context.Provider>
        );
    }
}
