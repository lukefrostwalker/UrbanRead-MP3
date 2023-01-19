import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };

    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductPage() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const navigate = useNavigate();
  const { url } = useParams();

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/url/${url}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [url]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, product is out of stock.');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please rate and enter a review.', { autoClose: 3000 });
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully!', { autoClose: 500 });
      setComment('');
      setRating(0);
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="mt-5">
      <Row>
        <Col md={5}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>

        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
              <p>
                <strong>Author: </strong>
                <span className="yellow">{product.author}</span>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <strong className="yellow">₱{product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <em>Description:</em>
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col className="yellow">₱{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Out Of Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <button
                        onClick={addToCartHandler}
                        className="placeOrderBtn"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="my-3">
        <div className="mb-3 mt-5">
          <h2 className="h1-title py-1 px-3" ref={reviewsRef}>
            Reviews
          </h2>
        </div>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox>No reviews yet</MessageBox>
          )}
        </div>
        <ListGroup>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=" "></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="my-3">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <div className="mb-3 mt-5">
                <h3 className="h1-title py-1 px-3">Write a review</h3>
              </div>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label className="yellow">Rating</Form.Label>
                <Form.Select
                  aria-label="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1- Terrible</option>
                  <option value="2">2- Poor</option>
                  <option value="3">3- Fair</option>
                  <option value="4">4- Good</option>
                  <option value="5">5- Amazing</option>
                </Form.Select>
              </Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Share more thoughts on the book to help other buyers."
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Share more thoughts on the book to help other buyers."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="reviewTextArea"
                />
              </FloatingLabel>

              <div className="mb-3 d-flex justify-content-center">
                <button
                  disabled={loadingCreateReview}
                  type="submit"
                  className="reviewSubmitBtn"
                >
                  Submit
                </button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{' '}
              <Link to={`/signin?redirect=/product/${product.url}`}>
                Sign In
              </Link>{' '}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>
    </div>
  );
}
