import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Product(props) {
  const { product } = props;

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    toast.success(`${product.name} added to cart`, { autoClose: 500 });
  };

  const detailsPage = () => {
    navigate(`/product/${product.url}`);
  };

  return (
    <Card className="h-100 product-card">
      <Link to={`/product/${product.url}`}>
        <img
          src={product.image}
          className="card-img-top img-fluid product-card-img"
          alt={product.name}
        />
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Link to={`/product/${product.url}`} className="product-card-title">
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />

        <Card.Text className="mt-2">
          <strong className="product-card-price mt-2">₱{product.price}</strong>
        </Card.Text>

        <div className="d-flex justify-content-center">
          {product.countInStock === 0 ? (
            <button variant="light" disabled className="oosBtn">
              Out of Stock
            </button>
          ) : (
            <button
              className="addToCartBtn"
              onClick={() => addToCartHandler(product)}
            >
              <i className="fa-solid fa-plus"></i> Cart
            </button>
          )}
          <button onClick={detailsPage} className="detailsBtn">
            <i className="fa-solid fa-circle-info"></i> Details
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
