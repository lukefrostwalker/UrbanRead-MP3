import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import Cart from './pages/Cart';
import SigninPage from './pages/SigninPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingInfo from './pages/ShippingInfo';
import SignupPage from './pages/SignupPage';
import Payment from './pages/Payment';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchPage from './pages/SearchPage';
import ProtectedRoutes from './components/ProtectedRoutes';
import AdminRoutes from './components/AdminRoutes';
import DashboardPageAdmin from './pages/DashboardPageAdmin';
import ProductListPage from './pages/ProductListPage';
import EditProductPage from './pages/EditProductPage';
import OrderListPage from './pages/OrderListPage';
import UserListPage from './pages/UserListPage';
import EditUserPage from './pages/EditUserPage';
import Footer from './components/Footer';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await axios.get(`/api/products/genres`);
        setGenres(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchGenres();
  }, []);

  return (
    <BrowserRouter>
      {/* <div> */}
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar className="navbar" bg="" variant="" expand="lg">
            <Container>
              <div>
                <Button
                  variant=""
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                  <i className="fas fa-bars fa-lg"></i>
                </Button>
                <LinkContainer to="/">
                  <Navbar.Brand>
                    <img
                      src="/urbanread_logo.png"
                      height="45"
                      width="auto"
                      alt="UrbanRead"
                    />
                  </Navbar.Brand>
                </LinkContainer>
              </div>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="d-flex justify-content-between align-items-center w-100">
                  <div></div>
                  <SearchBox />

                  <div className="socials d-flex align-items-center">
                    <a href="https://www.facebook.com/urbanURread">
                      <i className="fa-brands fa-facebook fa-xl"></i>
                    </a>
                    <a href="https://twitter.com/urban_read">
                      <i className="fa-brands fa-twitter fa-xl"></i>
                    </a>
                  </div>

                  <div className="d-flex nav-user align-items-center">
                    <Link to="/cart" className="nav-link">
                      <span className="fa-layers fa-fw px-2">
                        <i className="fa-solid fa-cart-shopping fa-xl"></i>
                        <span className="fa-layers-counter">
                          {' '}
                          {cart.cartItems.length > 0 &&
                            cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </span>
                      </span>
                    </Link>
                    {userInfo ? (
                      <div>
                        <NavDropdown
                          title={`Hello, ${userInfo.name}`}
                          id="basic-nav-dropdown"
                          className="px-2"
                        >
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
                            Sign out
                          </Link>
                        </NavDropdown>
                      </div>
                    ) : (
                      <Link className="nav-link" to="/signin">
                        Sign in
                      </Link>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown
                        title="Admin"
                        id="admin-nav-dropdown"
                        className="px-2"
                      >
                        <LinkContainer to="/admin/dashboard">
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/products">
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/orders">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/users">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )}
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong className="yellow">Genres</strong>
            </Nav.Item>
            {genres.map((genre) => (
              <Nav.Item key={genre}>
                <LinkContainer
                  to={{
                    pathname: `/search`,
                    search: `genre=${genre}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{genre}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        <main>
          <Container className="mt-4">
            <Routes>
              <Route path="/product/:url" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoutes>
                    <ProfilePage />
                  </ProtectedRoutes>
                }
              />
              <Route path="/shipping" element={<ShippingInfo />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoutes>
                    <OrderPage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoutes>
                    <OrderHistoryPage />
                  </ProtectedRoutes>
                }
              />
              {/************************** 
                      ADMIN ROUTES
              ***************************/}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoutes>
                    <DashboardPageAdmin />
                  </AdminRoutes>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminRoutes>
                    <OrderListPage />
                  </AdminRoutes>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoutes>
                    <UserListPage />
                  </AdminRoutes>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoutes>
                    <ProductListPage />
                  </AdminRoutes>
                }
              />
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoutes>
                    <EditProductPage />
                  </AdminRoutes>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoutes>
                    <EditUserPage />
                  </AdminRoutes>
                }
              ></Route>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
