import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HomeScreen from "./Screeens/HomeScreen";
import ProductScreen from "./Screeens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {LinkContainer} from "react-router-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import { useContext } from "react";
import CartScreen from "./Screeens/CartScreen";
import { Store } from "./store";

function App() {
  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>amazona</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
        <Routes>
          <Route path="/products/:slug" element={<ProductScreen/>} />
          <Route path="/cart" element={<CartScreen></CartScreen>}></Route>
          <Route path="/" element={<HomeScreen/>} />
        </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">
          All rights reserved
        </div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
