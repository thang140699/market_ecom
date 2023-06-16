import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { clearErrors, getBanner } from "../../actions/bannerAction";
const Banner = () => {
  const dispatch = useDispatch();
  const { error, banner } = useSelector((state) => state.allBanner);
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBanner());
  }, [dispatch, message, error]);
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
  };

  return (
    <div className="slide-show ptb-30">
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-md-offset-3">
            {/* slider area start */}
            <Slider {...settings}>
              {banner &&
                banner.map((bn) => (
                  <div className="slider-area">
                    <div className="bend niceties preview-1">
                      {/* slider images start */}
                      <div id="nivoslider" className="slides">
                        <img
                          src={bn.imageBanner}
                          alt="slider_1"
                          title="#slider-direction-1"
                        />
                      </div>
                      {/* slider images end */}
                      {/* slider 1 direction */}
                      <div
                        id="slider-direction-1"
                        className="t-cn slider-direction show-content"
                      >
                        {/* slider caption start */}
                        <div className="slider-caption">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-9">
                                {/* layer 1 */}
                                <div className="layer-1-1">
                                  <h2 className="title-1">{bn.titleMain} </h2>
                                </div>
                                {/* layer 2 */}
                                <div className="layer-1-2">
                                  <h2 className="title-2"> {bn.titleDesc} </h2>
                                </div>
                                {/* layer 3 */}
                                <div className="layer-1-3">
                                  <p className="title-3"> {bn.promotion}</p>
                                </div>
                                <div className="layer-2-3">
                                  <p className="title-3">{bn.description}</p>
                                </div>
                                {/* layer 4 */}
                                <div className="layer-1-4">
                                  <a
                                    href="product-details.html"
                                    className="title-4"
                                  >
                                    Xem chi tiết
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* slider caption end */}
                      </div>
                      {/* slider 2 direction */}
                    </div>
                  </div>
                ))}
              {/* <div className="slider-area">
                <div className="bend niceties preview-1">
                  <div id="nivoslider" className="slides">
                    <img
                      src="img/slider/2.jpg"
                      alt="slider_2"
                      title="#slider-direction-2"
                    />
                  </div>
                  <div
                    id="slider-direction-2"
                    className="t-cn slider-direction show-content"
                  >
                    <div className="slider-caption">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-9">
                            <div className="layer-2-1">
                              <h2 className="title-1">Thiết kế mới</h2>
                            </div>
                            <div className="layer-2-2">
                              <h2 className="title-2"> Xe đạp thể thao. </h2>
                            </div>
                            <div className="layer-2-3">
                              <p className="title-3">
                                Giảm giá tất cả xe đạp trên 20%
                              </p>
                            </div>
                            <div className="layer-2-4">
                              <a
                                href="product-details.html"
                                className="title-4"
                              >
                                Xem chi tiết{" "}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </Slider>
            {/* slider area end */}
          </div>
        </div>

        {/* info area start */}
        <div className="row">
          <div className="col-sm-4">
            <div className="single-info">
              <div className="img">
                <img src="img/info/info1.png" alt="" />
                <img src="img/info/info1_hover.png" alt="" />
              </div>
              <div className="info-content">
                <h3>Miễn phí vận chuyển nhanh</h3>
                Miễn phí tất cả đơn hàng từ UK
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="single-info">
              <div className="img">
                <img src="img/info/info2.png" alt="" />
                <img src="img/info/info2_hover.png" alt="" />
              </div>
              <div className="info-content">
                <h3>Cam kết hoàn tiền</h3>
                Cam kết hoàn tiền trong 30 ngày
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="single-info">
              <div className="img">
                <img src="img/info/info3.png" alt="" />
                <img src="img/info/info3_hover.png" alt="" />
              </div>
              <div className="info-content">
                <h3>Hỗ trợ 24/7</h3>
                Hỗ trợ trực tuyến 24h/ngày
              </div>
            </div>
          </div>
        </div>
        {/* info area end */}
      </div>
    </div>
  );
};

export default Banner;
