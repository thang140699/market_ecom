import React, { useEffect } from "react";
import Blog from "../Blog";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../actions/categoriesAction";
import Product from "./Product";

const Popular = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.allCategories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const sliderRef = React.useRef(null);
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="pt-40">
      <div className="container">
        {/* electronics section heading start */}
        {categories &&
          categories.map((category, i) => (
            <>
              <div className="row" id="electronics">
                <div className="col-md-12">
                  <div className="section-heading mt-40">
                    <div className="row">
                      <div className="col-md-4 col-lg-3 col-sm-5">
                        <h2 className="blue small-icon-size">
                          {" "}
                          <img
                            src="img/icon/icon_electronics.jpg"
                            alt=""
                          />{" "}
                          {category.name}
                        </h2>
                      </div>
                      <div className="col-md-8 col-lg-9 col-sm-7 col-xs-12">
                        <ul className="product-tab">
                          <li className="active">
                            <a data-toggle="tab" href="#tab-1">
                              {" "}
                              Bán chạy{" "}
                            </a>
                          </li>
                          <li>
                            <a data-toggle="tab" href="#tab-2">
                              {" "}
                              Mới{" "}
                            </a>
                          </li>
                          <li>
                            <a data-toggle="tab" href="#tab-3">
                              {" "}
                              Giảm giá{" "}
                            </a>
                          </li>
                        </ul>
                        <div className="category-item-menu">
                          <ul>
                            <li>
                              <a href="shop.html">laptops</a>
                              <a href="shop.html">camera</a>
                              <a href="shop.html">smart phone</a>
                              <a href="shop.html">Tivi</a>
                              <IoIosArrowBack onClick={previousSlide} />
                              <IoIosArrowForward onClick={nextSlide} />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="hidden-md hidden-sm hidden-xs col-lg-3">
                  <a href="#" className="banner-hover">
                    <img src={category.image} alt="" />
                  </a>
                </div>
                <div className="col-md-12 col-lg-9">
                  <div className="tab-content mt-30">
                    <div className="tab-pane active fade in" id="tab-1">
                      <div className="multiple-items">
                        {/* single product item start */}
                        <Product number={i} category={category} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}

        {/* electronics section heading end */}
        {/* electronics items start */}

        {/* electronics items end */}
        {/* banner start */}
        <div className="row mt-40">
          <div className="col-sm-6">
            <a href="#" className="banner-hover">
              <img src="img/banner/banner2.jpg" alt="" />
            </a>
          </div>
          <div className="col-sm-6 xs-mt-20">
            <a href="#" className="banner-hover">
              <img src="img/banner/banner3.jpg" alt="" />
            </a>
          </div>
        </div>
        {/* banner end */}
        {/* blog area start */}
        <Blog />
        {/* blog area end */}
      </div>
    </div>
  );
};

export default Popular;
