import React from "react";

const Services = () => {
  return (
    <div className="modal fade" id="item-modal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            {/* close button start */}
            <div className="close-button" data-dismiss="modal">
              <i className="fa fa-times-circle" />
            </div>
            {/* product modal details start */}
            <div className="product-modal">
              {/* single product item start */}
              <div className="single-product-item floating">
                <a href="product-details.html" className="item-img">
                  <img src="img/products/1.jpg" alt="" />
                  <span className="sale" />
                </a>
                <div className="item-info">
                  <h2>
                    <span className="item-title large">
                      Special sales Cotton stretch Men T shirt men's o-neck
                      short-sleeve
                    </span>
                  </h2>
                  <div className="info">
                    <p>
                      Reference: <span>demo_33</span>
                    </p>
                    <p>
                      Condition: <span>New product</span>
                    </p>
                  </div>
                  <h3 className="item-price">
                    {" "}
                    280.908 <span className="old-price">300.510</span>{" "}
                  </h3>
                  <p className="product-descriptions">
                    {" "}
                    Long printed dress with thin adjustable straps. V-neckline
                    and wiring under the bust with ruffles at the bottom of the
                    dress.
                  </p>
                  <div className="cart-plus-minus">
                    <label>Số lượng: </label>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      name="qtybutton"
                      defaultValue={1}
                    />
                  </div>
                  <div className="actions">
                    <a href="#" className="single-action">
                      Thêm vào giỏ hàng
                    </a>
                    <a href="#" className="single-action">
                      {" "}
                      <i className="fa fa-envelope" />{" "}
                    </a>
                    <a href="#" className="single-action">
                      {" "}
                      <i className="fa fa-print" />{" "}
                    </a>
                    <a href="#" className="single-action">
                      {" "}
                      <i className="zmdi zmdi-favorite-outline" />{" "}
                    </a>
                  </div>
                  <div className="size">
                    size
                    <form action="#">
                      <select name="size" id="size">
                        <option value={1}>s</option>
                        <option value={2}>m</option>
                        <option value={3}>l</option>
                      </select>
                    </form>
                  </div>
                  <div className="stock">
                    <p>
                      {" "}
                      300 Sản phẩm <span>Còn hàng</span>
                    </p>
                  </div>
                  <div className="social-share">
                    <a href="#" target="_blank">
                      <i className="fa fa-twitter" /> twitter
                    </a>
                    <a href="#" target="_blank">
                      <i className="fa fa-facebook" /> share
                    </a>
                    <a href="#" target="_blank">
                      <i className="fa fa-google-plus" /> Google+
                    </a>
                    <a href="#" target="_blank">
                      <i className="fa fa-pinterest" /> pinterest
                    </a>
                  </div>
                </div>
              </div>
              {/* single product item end */}
            </div>
            {/* product modal details end */}
          </div>
          {/* close button end */}
        </div>
      </div>
    </div>
  );
};

export default Services;
