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

    // make API request and set JSON response as state
    async componentDidMount() {
        const products = await axios.get('https://5d6da1df777f670014036125.mockapi.io/api/v1/product');
        this.setState({products: products.data});
    }

    // context with product data and cart events
    // navbar with options (route to each component view)
    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                    removeFromCart: this.removeFromCart,
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
                                <figure className="image is-64x64 mt-2 ml-6">
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
                </Router>
        </Context.Provider>
        );
    }
}
