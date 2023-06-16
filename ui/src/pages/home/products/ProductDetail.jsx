import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductByName,
  getProductDetails,
} from "../../../actions/productAction";
import Menu from "../../../components/Header/Menu";
import Search from "../../../components/Header/Search";
import RandomList from "../../../components/Products/Detail/RandomList";
import Scrolls from "../../../components/Scrolls";
import Promotion from "../../../components/Topbar/Promotion";
import Topbar from "../../../components/Topbar/Topbar";
import { NEW_REVIEW_RESET } from "../../../constants/productConstants";
import Footer from "../footer";
import CategoryProducts from "./../../../components/Products/Detail/CategoryProducts";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/helper";
import { message as messageAntd } from "antd";
import { addItemsToCart } from "../../../actions/cartAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { products } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    dispatch(
      addItemsToCart(id, quantity > product.Stock ? product.Stock : quantity)
    );

    messageAntd.success("Đã thêm sản phẩm vào giỏ");
  };
  console.log(product);
  const keyword = product.productLine;
  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      // alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      // alert.success("Đánh giá thành công");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
    dispatch(getProductByName(keyword));
  }, [id, error, reviewError, success, keyword]);
  const [pricePromotion, setPricePromotion] = useState();

  useEffect(() => {
    const calculatePricePromotion =
      product.price * (1 - product.promotion / 100);
    setPricePromotion(calculatePricePromotion);
  }, [product]);
  return (
    <>
      <Promotion />
      <header>
        <Topbar />
        <Search />
        <Menu type="products" />
      </header>
      <Scrolls />{" "}
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
                <li className="active">{product.name}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-modal">
                {/* single product item start */}
                <div className="single-product-item floating">
                  <a href="" className="item-img">
                    {product && product.images && product.images[0] && (
                      <img src={product?.images?.[0]?.url} alt="" />
                    )}

                    <span className="sale" />
                  </a>
                  <div className="item-info">
                    <h1>
                      <span className="item-title large">{product.name}</span>
                    </h1>
                    <div className="info">
                      <p>
                        Tình trạng:{" "}
                        <span>
                          {product.Stock < 1 ? "Hết hàng" : "Còn hàng"}
                        </span>
                      </p>
                    </div>
                    <h3 className="item-price">
                      {product.promotion > 0 ? (
                        <>
                          {formatCurrency(`${pricePromotion}`) + "đ"}
                          <span className="old-price">
                            {formatCurrency(`${product.price}`) + " đ"}
                          </span>
                        </>
                      ) : (
                        <>{formatCurrency(`${product.price}`) + " đ"}</>
                      )}
                      {/*  */}
                    </h3>
                    <p
                      className="product-descriptions"
                      dangerouslySetInnerHTML={{
                        __html: `${product.description}`,
                      }}
                    ></p>
                    <div className="cart-plus-minus">
                      <label>Số lượng: </label>
                      <input
                        className="cart-plus-minus-box"
                        type="text"
                        name="qtybutton"
                        defaultValue={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        value={
                          quantity < 1
                            ? 1
                            : quantity > product.Stock
                            ? product.Stock
                            : quantity
                        }
                      />
                    </div>
                    <div className="actions">
                      {product.Stock < 1 ? (
                        <a href="#" className="single-action">
                          Sản phẩm hiện tại đang hết hàng
                        </a>
                      ) : (
                        <a
                          href="#"
                          className="single-action"
                          onClick={addToCartHandler}
                        >
                          Thêm vào giỏ hàng
                        </a>
                      )}
                      <a href="my-account.html" className="single-action">
                        {" "}
                        <i className="zmdi zmdi-favorite-outline" />{" "}
                      </a>
                    </div>
                    <div className="stock">
                      <p>
                        {" "}
                        {product.Stock} sản phẩm{" "}
                        <span>
                          {" "}
                          {product.Stock < 1 ? (
                            <a href="#" className="single-action">
                              Sản phẩm hiện tại đang hết hàng
                            </a>
                          ) : (
                            "Còn hàng"
                          )}
                        </span>
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
            </div>
          </div>
          <RandomList />
          {/* <CategoryProducts /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
