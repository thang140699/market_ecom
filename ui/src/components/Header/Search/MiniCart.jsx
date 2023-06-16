import React, { useEffect, useState } from "react";
import { TbGardenCartOff } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/helper";
import { removeItemsFromCart } from "../../../actions/cartAction";
import { CloseCircleOutlined } from "@ant-design/icons";

const MiniCart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  const [priceProducts, setPriceProducts] = useState("");
  const [shipping, setShipping] = useState(200000);
  useEffect(() => {
    setPriceProducts(
      cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  }, [cartItems]);
  useEffect(() => {
    if (priceProducts > 200000) {
      setShipping(0);
    } else {
      setShipping(200000);
    }
  }, [priceProducts]);
  return (
    <div className="cart-item">
      {cartItems.length === 0 ? (
        <>
          <TbGardenCartOff />
          <div>Không có sản phẩm trong giỏ hàng</div>
        </>
      ) : (
        <>
          {cartItems &&
            cartItems.map((item) => (
              <div className="single-item">
                <div className="item-img">
                  <a href="#">
                    <img src={item.image} alt="" className="img-responsive" />
                  </a>
                </div>
                <div className="item-info">
                  <a href="#" className="title">
                    {" "}
                    <span> {item.quantity} x </span> {item.name}
                  </a>
                  <span>
                    {" "}
                    {formatCurrency(`${item.price * item.quantity}`) + " đ"}
                  </span>
                </div>
                <CloseCircleOutlined
                  onClick={(e) => deleteCartItems(item.product)}
                />
              </div>
            ))}
          <div className="subtotal">
            <h3>
              {" "}
              Phí ship: <span>
                {" "}
                {formatCurrency(`${shipping}`) + " đ"}
              </span>{" "}
            </h3>
            <h3>
              {" "}
              Tổng tiền:{" "}
              <span>
                {" "}
                {formatCurrency(`${priceProducts + shipping}`) + " đ"}
              </span>{" "}
            </h3>
          </div>
          <div className="checkout">
            <a href="/checkout">
              {" "}
              Thanh toán <i className="fa fa-angle-right" />{" "}
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCart;
