import React from "react";
import Slider from "react-slick";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Blog = () => {
  const sliderRef = React.useRef(null);
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
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };
  return (
    <div className="row mt-40">
      <div className="col-md-8 col-sm-6">
        <div
          className="section-heading"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h2>
            {" "}
            <img src="img/icon/icon_title_blog.png" alt="" /> Tin tức
          </h2>
          <div style={{ marginTop: 10 }}>
            <IoIosArrowBack onClick={previousSlide} />
            <span style={{ fontSize: 20 }}>|</span>
            <IoIosArrowForward onClick={nextSlide} />
          </div>
        </div>
        <div className="blog-posts-slider mt-30">
          <Slider {...settings} ref={sliderRef}>
            <div className="single-blog">
              <a href="blog-details.html" className="blog-img">
                <img src="img/blog/1.jpg" alt="blog image" />
              </a>
              <div className="blog-content">
                <div className="blog-info">
                  <div className="date">
                    28 <span>tháng 12</span>{" "}
                  </div>
                  <a href="blog-details.html">
                    What is Bootstrap? – The History and the Hype
                  </a>
                  <p className="view-count">
                    <i className="fa fa-eye" />
                    views(47)
                  </p>
                </div>
                <p className="blog-description">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum...
                </p>
              </div>
            </div>
            <div className="single-blog">
              <a href="blog-details.html" className="blog-img">
                <img src="img/blog/2.jpg" alt="blog image" />
              </a>
              <div className="blog-content">
                <div className="blog-info">
                  <div className="date">
                    28 <span>tháng 8</span>{" "}
                  </div>
                  <a href="blog-details.html">
                    What is Bootstrap? – The History and the Hype
                  </a>
                </div>
                <p className="blog-description">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum...
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 xs-mt-40">
        {/* section title start */}
        <div className="section-heading">
          <h2>
            {" "}
            <img src="img/icon/icon_title_logo.png" alt="" /> Thương hiệu đối
            tác
          </h2>
        </div>
        {/* section title start */}
        {/* clients logo start */}
        <div className="clients-logo mt-30" style={{ display: "flex" }}>
          <div className="logos">
            <a href="#">
              <img src="img/client-logo/1.jpg" alt="" />
            </a>
            <a href="#">
              <img src="img/client-logo/2.jpg" alt="" />
            </a>
            <a href="#">
              <img src="img/client-logo/3.jpg" alt="" />
            </a>
            <a href="#">
              <img src="img/client-logo/4.jpg" alt="" />
            </a>
          </div>
          <div className="logos">
            <a href="#">
              <img src="img/client-logo/5.jpg" alt="" />
            </a>
            <a href="#">
              <img src="img/client-logo/6.jpg" alt="" />
            </a>
            <a href="#">
              <img src="img/client-logo/7.jpg" alt="" />
            </a>
            <a href="#">
              <img src="img/client-logo/8.jpg" alt="" />
            </a>
          </div>
        </div>
        {/* clients logo end */}
      </div>
    </div>
  );
};

export default Blog;
