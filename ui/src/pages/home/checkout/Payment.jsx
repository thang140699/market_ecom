import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { clearErrors, createOrder } from "../../../actions/orderAction";
import { Modal, message as messageAntd } from "antd";
import { useHistory } from "react-router-dom";
import {
  CalendarOutlined,
  CreditCardOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "../../../utils/helper";
const Payment = (props) => {
  const {
    isModalOpen,
    setIsModalOpen,
    subtotal,
    shippingCharges,
    totalPrice,
    priceVND,
    note,
  } = props;

  const history = useHistory();
  const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const payBtn = useRef(null);
  let today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const dateFindData = `${year}-${month}-${day}`;
  const paymentData = {
    amount: Math.round(totalPrice * 1000),
  };
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
    dateFind: dateFindData,
    note: note,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: shippingInfo.name,
            email: shippingInfo.email,
            address: {
              line1: shippingInfo.address,
              city: "Hanoi",
              state: "Hanoi",
              postal_code: 10000,
              country: "VN",
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        messageAntd.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          messageAntd.success("Đơn hàng của bạn đã được đặt thành công");
          history.push("/whitelist");
        } else {
          messageAntd.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      messageAntd.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (error) {
      messageAntd.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, messageAntd]);
  return (
    <Modal
      title="Visa, Master Card"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Fragment>
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <div>
              <CreditCardOutlined className="icon-payment" />
              <CardNumberElement className="paymentInput" />
            </div>
            <div>
              <CalendarOutlined className="icon-payment" />
              <CardExpiryElement className="paymentInput" />
            </div>
            <div>
              <KeyOutlined className="icon-payment" />
              <CardCvcElement className="paymentInput" />
            </div>

            <input
              type="submit"
              value={`Thanh toán - ${formatCurrency(`${priceVND}`)} đ`}
              ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </Fragment>
    </Modal>
  );
};

export default Payment;
