import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { clearErrors, getProduct } from "../../../actions/productAction";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
const Product = (props) => {
  const { number, category } = props;
  const sliderRef = React.useRef(null);
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const keyword = "";
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, keyword, currentPage, error]);

  return (
    <div>
      <Slider {...settings} ref={sliderRef}>
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </Slider>
    </div>
  );
};

export default Product;
