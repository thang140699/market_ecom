import React, { useEffect } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../../actions/productAction";
import RandomCard from "./RandomCard";
const RandomList = () => {
  const sliderRef = React.useRef(null);
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

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
  return (
    <div>
      {" "}
      {/* random product section heading start */}
      <div className="row">
        <div className="col-md-12">
          <div className="section-heading mt-40">
            <div className="row">
              {/* section title start */}
              <div
                className="col-md-9"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2>
                  {" "}
                  <img src="img/icon/icon_categories.png" alt="" />
                  Sản phẩm ngẫu nhiên
                </h2>
                {/* <div style={{ marginTop: 20 }}>
                  <IoIosArrowBack onClick={previousSlide} />
                  <span style={{ marginTop: -5 }}>|</span>
                  <IoIosArrowForward onClick={nextSlide} />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* random product section heading end */}
      {/* random products start */}
      <div className="row">
        <div className="col-md-12">
          <div className="multiple-items product-details mt-30">
            <Slider {...settings} ref={sliderRef}>
              {/* single product item start */}
              {products &&
                products.map((product) => (
                  <RandomCard key={product._id} product={product} />
                ))}

              {/* single product item end */}
            </Slider>
          </div>
        </div>
      </div>
      {/* random products end */}
    </div>
  );
};

export default RandomList;
