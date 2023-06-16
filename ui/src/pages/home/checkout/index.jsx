import React, { useState } from "react";
import Menu from "../../../components/Header/Menu";
import Search from "../../../components/Header/Search";
import Scrolls from "../../../components/Scrolls";
import Promotion from "../../../components/Topbar/Promotion";
import Topbar from "../../../components/Topbar/Topbar";
import Footer from "../footer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../../actions/cartAction";
import { formatCurrency } from "../../../utils/helper";
import { message } from "antd";
import Payment from "./Payment";

function decimalNumber(num, n) {
  //num : số cần xử lý
  //n: số chữ số sau dấu phẩy cần lấy
  let base = 10 ** n;
  let result = Math.round(num * base) / base;
  return result;
}
const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const couponInfo = JSON.parse(sessionStorage.getItem("dataCartCoupon"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [note, setNote] = useState("Không có");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    //  - couponInfo.coupon,
    0
  );
  const shippingCharges = subtotal > 200000 ? 0 : 200000;
  const totalPrice = decimalNumber((subtotal + shippingCharges) / 23000, 2);
  const priceVND = subtotal + shippingCharges;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (event) => {
    dispatch(saveShippingInfo({ name, email, address, phoneNo }));
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
      priceVND,
    };

    localStorage.setItem("orderInfo", JSON.stringify(data));
    setIsModalOpen(true);
    event.preventDefault();
  };

  return (
    <>
      <Promotion />
      <header>
        <Topbar />
        <Search />
        <Menu type="products" />
      </header>
      <Scrolls />
      <div className="breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li>
                  <a href="/">
                    <i className="fa fa-home" />
                  </a>
                </li>
                <li className="active">Thanh toán</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-area mt-40">
        <form className="container">
          <div className="row">
            <div className="col-md-6">
              {/* client address start */}
              <div className="client-address">
                {/* section title start */}
                <div className="section-small-title">
                  <h3>Thông tin thanh toán</h3>
                </div>
                {/* section title start */}
                {/* client address form */}
                <div className="client-address-form">
                  {/* input name */}
                  <input
                    type="text"
                    placeholder="Nhập tên.."
                    defaultValue={name}
                    required="required"
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/*input email address*/}
                  <input
                    type="email"
                    placeholder="Email của bạn..."
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required="required"
                  />
                  {/* input phone number */}
                  <input
                    type="tel"
                    placeholder="Số điện thoại của bạn..."
                    defaultValue={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required="required"
                  />
                  {/* input address */}
                  <input
                    type="text"
                    placeholder="Địa chỉ của bạn..."
                    defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required="required"
                  />
                  {/* input your details address */}
                  <textarea
                    cols={3}
                    rows={5}
                    placeholder="Ghi chú đơn hàng..."
                    onChange={(e) => setNote(e.target.value)}
                    defaultValue={""}
                  />
                </div>
              </div>
              {/* client address end */}
            </div>
            <div className="col-md-6 sm-mt-40 xs-mt-40">
              {/* total cart area start */}
              <div className="cart-total">
                <div className="section-small-title">
                  <h3>Đơn hàng của bạn</h3>
                </div>
                {/* total price */}
                <p>
                  Tổng số sản phẩm{" "}
                  <span className="pull-right">{cartItems.length}</span>{" "}
                </p>
                {/* shipping cost */}
                <p>
                  Shipping and Handing{" "}
                  <span className="pull-right">
                    {" "}
                    {formatCurrency(`${shippingCharges}`) + " đ"}
                  </span>{" "}
                </p>
                {/* grand total */}
                <p className="total-price">
                  Tổng tiền{" "}
                  <span className="pull-right">
                    {formatCurrency(`${priceVND}`) + " đ"}
                  </span>{" "}
                </p>
              </div>
              {/* total cart area end */}
              {/* payment method start */}
              <div className="checkout-form-wrap mt-50 section-small-title">
                <h3 className="checkout-title">Phương thức thanh toán</h3>
                <div className="checkout-form">
                  <div
                    className="panel-group"
                    id="accordion"
                    role="tablist"
                    aria-multiselectable="true"
                  >
                    {/* <div className="panel panel-default">
                      <div className="panel-heading" role="tab" id="headingOne">
                        <h4 className="panel-title">
                          <a
                            role="button"
                            data-toggle="collapse"
                            data-parent="#accordion"
                            href="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Trả trực tiếp khi nhận hàng
                          </a>
                        </h4>
                      </div>
                      <div
                        id="collapseOne"
                        className="panel-collapse collapse in"
                        role="tabpanel"
                        aria-labelledby="headingOne"
                      >
                        <div className="panel-body">
                          Keep away from people who try to belittle your
                          ambitions. Small people always do that. Keep away
                          forit astiil people who try to belittle your ami
                          tions. Small peol always do that.
                        </div>
                      </div>
                    </div> */}
                    <div className="panel panel-default">
                      <div className="panel-heading" role="tab" id="headingTwo">
                        <h4 className="panel-title">
                          <a
                            className="collapsed"
                            role="button"
                            data-toggle="collapse"
                            data-parent="#accordion"
                            href="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Thanh toán qua thẻ
                          </a>
                        </h4>
                      </div>
                      <div
                        id="collapseTwo"
                        className="panel-collapse collapse"
                        role="tabpanel"
                        aria-labelledby="headingTwo"
                      >
                        <div className="panel-body">
                          <ul
                            className="chk-bank chk-pay-method payment-form"
                            style={{}}
                          >
                            <li className="d-flex align-items-center">
                              <a href="#" title>
                                <img src="img/cart/cart/partner8.jpg" alt="" />
                              </a>
                              <div className="card-info">
                                <h2 className="card-own text-capitalize">
                                  Chủ tài khoản: <span>Nguyễn Văn A</span>
                                </h2>
                                <h3 className="card-number">
                                  Số tài khoản: <span>012 3446 4894</span>
                                </h3>
                                <h3>Ngân hàng: Techcombank - CN Hà Nội</h3>
                              </div>
                            </li>
                            <li className="d-flex align-items-center">
                              <a href="#" title>
                                <img src="img/cart/cart/partner9.jpg" alt="" />
                              </a>
                              <div className="card-info">
                                <h2 className="card-own text-capitalize">
                                  Chủ tài khoản: <span>Nguyễn Văn A</span>
                                </h2>
                                <h3 className="card-number">
                                  Số tài khoản: <span>012 3446 4894</span>
                                </h3>
                                <h3>Ngân hàng: Techcombank - CN Hà Nội</h3>
                              </div>
                            </li>
                            <li className="d-flex align-items-center">
                              <a href="#" title>
                                <img src="img/cart/cart/partner10.jpg" alt="" />
                              </a>
                              <div className="card-info">
                                <h2 className="card-own text-capitalize">
                                  Chủ tài khoản: <span>Nguyễn Văn A</span>
                                </h2>
                                <h3 className="card-number">
                                  Số tài khoản: <span>012 3446 4894</span>
                                </h3>
                                <h3>Ngân hàng: Techcombank - CN Hà Nội</h3>
                              </div>
                            </li>
                            <li className="d-flex align-items-center">
                              <a href="#" title>
                                <img src="img/cart/cart/partner11.jpg" alt="" />
                              </a>
                              <div className="card-info">
                                <h2 className="card-own text-capitalize">
                                  Chủ tài khoản: <span>Nguyễn Văn A</span>
                                </h2>
                                <h3 className="card-number">
                                  Số tài khoản: <span>012 3446 4894</span>
                                </h3>
                                <h3>Ngân hàng: Techcombank - CN Hà Nội</h3>
                              </div>
                            </li>
                            <li className="d-flex align-items-center">
                              <a href="#" title>
                                <img src="img/cart/cart/partner12.jpg" alt="" />
                              </a>
                              <div className="card-info">
                                <h2 className="card-own text-capitalize">
                                  Chủ tài khoản: <span>Nguyễn Văn A</span>
                                </h2>
                                <h3 className="card-number">
                                  Số tài khoản: <span>012 3446 4894</span>
                                </h3>
                                <h3>Ngân hàng: Techcombank - CN Hà Nội</h3>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* payment method start */}
              {/* shopping button start */}
              <div className="shopping-button">
                <button
                  type="submit"
                  className="text-capitalize order"
                  onClick={(e) => showModal(e)}
                >
                  Thanh toán
                </button>
              </div>
              {/* shopping button end */}
            </div>
          </div>
        </form>
      </div>
      <Footer />
      <Payment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        shippingCharges={shippingCharges}
        totalPrice={totalPrice}
        subtotal={subtotal}
        priceVND={priceVND}
        note={note}
      />
    </>
  );
};

export default Checkout;
