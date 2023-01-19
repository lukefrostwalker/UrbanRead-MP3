import Carousel from 'react-bootstrap/Carousel';

export default function Banner() {
  return (
    <Carousel className="mb-4" indicatorLabels="">
      <Carousel.Item interval={5000}>
        <a href="http://urbanread.space/product/spare-1674115307784">
          <img
            className="d-block w-100"
            src="images/carSpare.png"
            alt="Spare"
          />
        </a>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="images/carPaydaySale.png"
          alt="Payday Sale"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="images/carFreeDel.png"
          alt="Free Delivery"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
