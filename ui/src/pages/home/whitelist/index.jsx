import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Promotion from "../../../components/Topbar/Promotion";
import Topbar from "../../../components/Topbar/Topbar";
import Search from "../../../components/Header/Search";
import Scrolls from "../../../components/Scrolls";
import Menu from "../../../components/Header/Menu";
import History from "./History";
import Info from "./Info";
const WhiteList = () => {
  const dispatch = useDispatch();
  // const { whiteListItems } = useSelector((state) => state.whitelist);
  return (
    <>
      {" "}
      <Promotion />
      <header>
        <Topbar />
        <Search />
        <Menu type="products" />
      </header>
      <Scrolls />
      <div className="account-area mt-40">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <div className="my-account-accordion">
                <div
                  className="panel-group"
                  id="accordion"
                  role="tablist"
                  aria-multiselectable="true"
                >
                  <History />
                  <Info />
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingFive">
                      <h4 className="panel-title">
                        <a
                          className="collapsed"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                        >
                          <i className="fa fa-heart" />
                          Danh sách yêu thích
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseFive"
                      className="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingFive"
                    >
                      <div className="panel-body">
                        {/* cart table start */}
                        <div className="table-responsive">
                          <table className="table-bordered table">
                            <thead>
                              <tr>
                                {/* product img title */}
                                <th className="item-img">Sản phẩm</th>
                                {/* product name title */}
                                <th className="product-name">Mô tả</th>
                                {/* stock status */}
                                <th className="stock text-center">
                                  Tình trạng
                                </th>
                                {/* unit price title */}
                                <th className="unit-price"> Giá</th>
                                {/* quantity */}
                                <th className="quantity text-center">
                                  Số lượng
                                </th>
                                {/* remove button */}
                                <th className="remove-icon text-center">Xóa</th>
                                {/* unit price title */}
                                <th className="total-price"> Mua hàng</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              <tr>
                                {/* product img end */}
                                <td className="item-img">
                                  <a href="product-details.html">
                                    <img src="img/products/12.jpg" alt="" />
                                  </a>
                                </td>
                                {/* product img end */}
                                {/* product name start */}
                                <td className="cart-product-name text-left">
                                  <a href="product-details.html">
                                    Skmei Luxury Brand Mens Sports Watches Dive
                                    50m Digital LED
                                  </a>
                                  <p>Kích cỡ : S</p>
                                </td>
                                {/* product name end */}
                                {/* stock status start */}
                                <td className="stock">
                                  <span>Còn hàng</span>
                                </td>
                                {/* stock status end */}
                                {/* price start */}
                                <td className="unit-price">
                                  <span>289.989</span>
                                </td>
                                {/* price end */}
                                {/* quantity start */}
                                <td className="quantity">
                                  <input
                                    className
                                    type="text"
                                    name="qtybutton"
                                    defaultValue={1}
                                  />
                                </td>
                                {/* quantity end */}
                                {/* remove icon start */}
                                <td className="remove-icon">
                                  <button>
                                    {" "}
                                    <i className="fa fa-trash" />{" "}
                                  </button>
                                </td>
                                {/* remove icon end */}
                                {/* price start */}
                                <td className="unit-price">
                                  <a href="#" className="single-action">
                                    Thêm vào giỏ hàng
                                  </a>
                                </td>
                                {/* price end */}
                              </tr>
                              <tr>
                                {/* product img end */}
                                <td className="item-img">
                                  <a href="product-details.html">
                                    <img src="img/products/1.jpg" alt="" />
                                  </a>
                                </td>
                                {/* product img end */}
                                {/* product name start */}
                                <td className="cart-product-name text-left">
                                  <a href="product-details.html">
                                    Special sales Cotton stretch Men T shirt
                                    men's o-neck short-sleeve
                                  </a>
                                  <p>Kích cỡ : S</p>
                                </td>
                                {/* product name end */}
                                {/* stock status start */}
                                <td className="stock">
                                  <span>Còn hàng</span>
                                </td>
                                {/* stock status end */}
                                {/* price start */}
                                <td className="unit-price">
                                  <span>270.000</span>
                                </td>
                                {/* price end */}
                                {/* quantity start */}
                                <td className="quantity">
                                  <input
                                    className
                                    type="text"
                                    name="qtybutton"
                                    defaultValue={1}
                                  />
                                </td>
                                {/* quantity end */}
                                {/* remove icon start */}
                                <td className="remove-icon">
                                  <button>
                                    {" "}
                                    <i className="fa fa-trash" />{" "}
                                  </button>
                                </td>
                                {/* remove icon end */}
                                {/* price start */}
                                <td className="unit-price">
                                  <a href="#" className="single-action">
                                    Thêm vào giỏ hàng
                                  </a>
                                </td>
                                {/* price end */}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/* cart table end */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhiteList;
