import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../../actions/cartAction";
import Menu from "../../../components/Header/Menu";
import Search from "../../../components/Header/Search";
import Scrolls from "../../../components/Scrolls";
import Promotion from "../../../components/Topbar/Promotion";
import Topbar from "../../../components/Topbar/Topbar";
import Footer from "../footer";
import { TbGardenCartOff } from "react-icons/tb";
import { formatCurrency } from "../../../utils/helper";
import CartItem from "./CartItem";
const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
 
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=checkout");
  };
  const [priceProducts, setPriceProducts] = useState("");

  const [shipping, setShipping] = useState(200000);
  const [checkQuantity, setCheckQuantity] = useState();
  const [checkStock, setCheckStock] = useState();
  useEffect(() => {
    setPriceProducts(
      cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  }, [cartItems]);
  const [lastPrice, setLastPrice] = useState(priceProducts);
  useEffect(() => {
    setLastPrice(priceProducts);
  }, [priceProducts]);
  useEffect(() => {
    if (lastPrice > 200000) {
      setShipping(0);
    } else {
      setShipping(200000);
    }
  }, [lastPrice]);

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
                  <a href="#">
                    <i className="fa fa-home" />
                  </a>
                </li>
                <li className="active">Giỏ hàng của bạn</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-area mt-40">
        <div className="container">
          <div className="row">
            {cartItems.length === 0 ? (
              <>
                <TbGardenCartOff />
                <div>Không có sản phẩm trong giỏ hàng</div>
              </>
            ) : (
              <div className="col-md-12">
                {/* cart table start */}
                <div className="table-responsive">
                  <table className="table-bordered table">
                    <thead>
                      <tr>
                        {/* product img title */}
                        <th className="item-img">Sản phẩm</th>
                        {/* product name title */}
                        <th className="product-name">Mô tả</th>
                        <th class="stock text-center">Tình trạng</th>
                        {/* unit price title */}
                        <th className="unit-price text-right"> Giá</th>
                        {/* quantity */}
                        <th className="quantity text-center">Số lượng</th>
                        {/* unit price title */}
                        <th className="total-price text-right"> Tổng tiền</th>
                        {/* remove button */}
                        <th className="remove-icon text-center">Xóa</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {cartItems &&
                        cartItems.map(
                          (item) => (
                            <CartItem
                              product={item}
                              setCheckQuantity={setCheckQuantity}
                              setCheckStock={setCheckStock}
                            />
                          )

                          // return (
                          //   <tr>
                          //     {/* product img end */}
                          //     <td className="item-img">
                          //       <a href="product-details.html">
                          //         <img src={item.image} alt="" />
                          //       </a>
                          //     </td>
                          //     {/* product img end */}
                          //     {/* product name start */}
                          //     <td className="cart-product-name text-left">
                          //       <a>{item.name}</a>
                          //       <p>{item.product}</p>
                          //     </td>
                          //     {/* product name end */}
                          //     <td class="stock">
                          //       <p>{item.stock}</p>
                          //     </td>
                          //     {/* stock status end */}
                          //     {/* price start */}
                          //     <td className="unit-price text-right">
                          //       <span>
                          //         {formatCurrency(`${item.price}`) + " đ"}
                          //       </span>
                          //     </td>
                          //     {/* price end */}
                          //     {/* quantity start */}
                          //     <td className="quantity">
                          //       <input
                          //         className
                          //         type="text"
                          //         name="qtybutton"
                          //         defaultValue={item.quantity}
                          //         value={qat}
                          //         onChange={(e) =>
                          //           // setQat(e.target.value)

                          //           addItems(e, item.product, item.stock)
                          //         }
                          //       />
                          //     </td>
                          //     {/* quantity end */}

                          //     {/* price start */}
                          //     <td className="unit-price text-right">
                          //       <span>
                          //         {formatCurrency(
                          //           `${item.price * item.quantity}`
                          //         ) + " đ"}
                          //       </span>
                          //     </td>
                          //     {/* price end */}
                          //     {/* remove icon start */}
                          //     <td className="remove-icon">
                          //       <button>
                          //         {" "}
                          //         <i
                          //           className="fa fa-trash"
                          //           onClick={() =>
                          //             deleteCartItems(item.product)
                          //           }
                          //         />{" "}
                          //       </button>
                          //     </td>
                          //     {/* remove icon end */}
                          //   </tr>
                          // );
                        )}
                    </tbody>
                    <tfoot className="text-right">
                      <tr>
                        <td colSpan={3} rowSpan={3} />
                        <td colSpan={3}>
                          {" "}
                          <strong> Tổng tiền sản phẩm</strong>
                        </td>
                        <td colSpan={1}>
                          {formatCurrency(`${priceProducts}`) + " đ"}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <strong>Phí ship</strong>
                        </td>
                        <td colSpan={1}>
                          {formatCurrency(`${shipping}`) + " đ"}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <strong>Thành tiền</strong>
                        </td>
                        <td colSpan={1}>
                          {" "}
                          {formatCurrency(`${priceProducts + shipping}`) + " đ"}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* cart table end */}
                <div className="buttons mt-20">
                  <a href="/products" className="stock">
                    {" "}
                    <span>
                      <i className="fa fa-angle-left" /> Tiếp tục mua hàng
                    </span>
                  </a>
                  <a href="/checkout" className="stock">
                    {" "}
                    <span>
                      {" "}
                      Thanh toán <i className="fa fa-angle-right" />
                    </span>
                  </a>
                  {checkQuantity < 1 || checkQuantity > checkStock ? (
                    <span
                      className="stock"
                      style={{ color: "red", marginLeft: 20 }}
                    >
                      Số lượng sản phẩm phải lớn hơn 1 và không vượt quá hàng
                      trong kho
                    </span>
                  ) : (
                    <a href="/checkout" className="stock">
                      {" "}
                      <span>
                        {" "}
                        Thanh toán <i className="fa fa-angle-right" />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
