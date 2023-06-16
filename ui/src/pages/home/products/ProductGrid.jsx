import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../../actions/cartAction";
import { formatCurrency, splitText } from "../../../utils/helper";
const ProductGrid = ({ product }) => {
  const [read, setRead] = useState(false);
  const onPressMore = () => {
    setRead(!read);
  };
  const [pricePromotion, setPricePromotion] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setPricePromotion(
      product.price - (product.price * product.promotion) / 100
    );
  });
  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, 1));
    message.success("Đã thêm sản phẩm vào giỏ");
  };
  return (
    <div className="single-product-item floating">
      <a href={`/product/${product._id}`} className="item-img">
        <img src={product?.images?.[0]?.url} alt="" />
        <span className="sale" />
      </a>
      <div className="item-info">
        <h2>
          <a href={`/product/${product._id}`} className="item-title large">
            {product.name}
          </a>
        </h2>
        <h3 className="item-price">
          {" "}
          {formatCurrency(`${pricePromotion}`) + " đ"}{" "}
          <span className="old-price">
            {" "}
            {formatCurrency(`${product.price}`) + " đ"}
          </span>{" "}
        </h3>
        {read ? (
          <>
            <p
              className="product-descriptions"
              dangerouslySetInnerHTML={{
                __html: `${product.description}`,
              }}
            ></p>
            <p onClick={onPressMore}>Xem thêm</p>
          </>
        ) : (
          <>
            <p
              className="product-descriptions"
              dangerouslySetInnerHTML={{
                __html: splitText(product.description, 200),
              }}
            ></p>
            <p onClick={onPressMore}>Gọn lại</p>
          </>
        )}
        <div className="actions">
          <a href="#" className="single-action" onClick={addToCartHandler}>
            Thêm vào giỏ hàng
          </a>
          <a href="#" className="single-action">
            {" "}
            <i className="zmdi zmdi-favorite-outline" />{" "}
          </a>
          <a
            href="#"
            className="single-action"
            data-toggle="modal"
            data-target="#item-modal"
          >
            {" "}
            <i className="zmdi zmdi-search" />{" "}
          </a>
        </div>
        <div className="stock">
          <p>
            <span>{product.Stock > 0 ? "Còn hàng" : "Hết hàng"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
