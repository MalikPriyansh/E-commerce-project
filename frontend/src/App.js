import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from "./Screeens/HomeScreen";
import ProductScreen from "./Screeens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from "react-router-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import { useContext } from "react";
import CartScreen from "./Screeens/CartScreen";
import { Store } from "./store";
import SigninScreen from "./Screeens/SignInScreen";
import SignupScreen from "./Screeens/SignupScreen";
import ShippingScreen from "./Screeens/ShippingScreen";
import PaymentMethodScreen from "./Screeens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screeens/PlaceOrderScreen";
import OrderScreen from "./Screeens/OrderScreen";

function App() {
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };
  return (
    <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <header>
      <ToastContainer position="bottom-center" limit={1} />
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
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
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
          <Route path="/signin" element={<SigninScreen></SigninScreen>}></Route>
          <Route path="/payment" element={<PaymentMethodScreen />}></Route>
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/shipping" element={<ShippingScreen></ShippingScreen>}></Route>
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/order/:id" element={<OrderScreen />}></Route>
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
