import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/helper";
import { message as messageAntd } from "antd";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../../actions/cartAction";
const RandomCard = ({ product }) => {
  const dispatch = useDispatch();
  const [pricePromotion, setPricePromotion] = useState();
  useEffect(() => {
    const calculatePricePromotion =
      product.price * (1 - product.promotion / 100);
    setPricePromotion(calculatePricePromotion);
  }, [product]);
  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, 1));
    messageAntd.success("Đã thêm sản phẩm vào giỏ");
  };
  return (
    <div className="single-product-item">
      <a className="item-img">
        {product && product.images && product.images[0] && (
          <img src={product.images[0].url} alt="" />
        )}
        <span className="new" />
      </a>
      <div className="item-info text-center">
        <h2>
          <Link to={`/product/${product._id}`}>
            <a className="item-title">{product.name}</a>
          </Link>
        </h2>
        <h3 className="item-price">
          {" "}
          {formatCurrency(`${pricePromotion}`) + " đ"}{" "}
          <span className="old-price">
            {formatCurrency(`${product.price}`) + " đ"}
          </span>{" "}
        </h3>
        <div className="actions">
          <a href="#" className="single-action" onClick={addToCartHandler}>
            Thêm vào giỏ hàng
          </a>
        </div>
        <div className="hover-content">
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
      </div>
    </div>
  );
};

export default RandomCard;
