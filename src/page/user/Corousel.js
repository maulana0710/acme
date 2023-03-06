import Carousel from "react-bootstrap/Carousel";
import "holderjs";
import Advertise from '../../img/advertise acme.png';

function CarouselFadeProduct({ item }) {
  return (
    <>
      <Carousel fade controls={false}>
        <Carousel.Item className="w-100">
          <img
            className="d-block w-100"
            style={{ height: "100%" }}
            src={Advertise}
            // src={item[0]?.product_imageUrl1}
            alt="First slide"
          />
        </Carousel.Item>
        {/* <Carousel.Item className="w-100">
          <img
            className="d-block w-100"
            style={{ height: "100%" }}
            src={item[1]?.product_imageUrl2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className="w-100">
          <img
            className="d-block w-100"
            style={{ height: "100%" }}
            src={item[2]?.product_imageUrl3}
            alt="Third slide"
          />
        </Carousel.Item> */}
      </Carousel>
    </>
  );
}

export default CarouselFadeProduct;
