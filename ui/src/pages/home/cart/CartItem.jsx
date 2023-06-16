import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../../actions/cartAction";
import { formatCurrency } from "../../../utils/helper";

const CartItem = (props) => {
  const { product, setCheckQuantity, setCheckStock } = props;
  const dispatch = useDispatch();
  const [qat, setQat] = useState();
  const addItems = (e, id, stock) => {
    const newQuantity = e.target.value;
    setQat(newQuantity);
    setCheckStock(stock);
    setCheckQuantity(newQuantity);
    dispatch(addItemsToCart(id, newQuantity));
  };
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  return (
    <>
      <tr>
        {/* product img end */}
        <td className="item-img">
          <a href="product-details.html">
            <img src={product.image} alt="" />
          </a>
        </td>
        {/* product img end */}
        {/* product name start */}
        <td className="cart-product-name text-left">
          <a>{product.name}</a>
          <p>{product.product}</p>
        </td>
        {/* product name end */}
        <td class="stock">
          <p>{product.stock}</p>
        </td>
        {/* stock status end */}
        {/* price start */}
        <td className="unit-price text-right">
          <span>{formatCurrency(`${product.price}`) + " đ"}</span>
        </td>
        {/* price end */}
        {/* quantity start */}
        <td className="quantity">
          <input
            className
            type="text"
            name="qtybutton"
            defaultValue={product.quantity}
            value={qat}
            onChange={(e) =>
              // setQat(e.target.value)

              addItems(e, product.product, product.stock)
            }
          />
        </td>
        {/* quantity end */}

        {/* price start */}
        <td className="unit-price text-right">
          <span>
            {formatCurrency(`${product.price * product.quantity}`) + " đ"}
          </span>
        </td>
        {/* price end */}
        {/* remove icon start */}
        <td className="remove-icon">
          <button>
            {" "}
            <i
              className="fa fa-trash"
              onClick={() => deleteCartItems(product.product)}
            />{" "}
          </button>
        </td>
        {/* remove icon end */}
      </tr>
    </>
  );
};

export default CartItem;
