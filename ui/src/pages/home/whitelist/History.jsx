import { LoadingOutlined } from "@ant-design/icons";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { clearErrors, myOrders } from "../../../actions/orderAction";
import { formatCurrency } from "../../../utils/helper";

const History = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  console.log(orders);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, message, error]);
  return (
    <Fragment>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <div className="panel panel-default">
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
                <i className="fa fa-list-ol" />
                Lịch sử mua hàng
              </a>
            </h4>
          </div>
          {orders.map((order, i) => (
            <div
              id="collapseOne"
              className="panel-collapse collapse in"
              role="tabpanel"
              aria-labelledby="headingOne"
            >
              <div className="panel-body">
                <div className="row d-flex flex-wrap">
                  <div className="col-sm-1 text-center">STT</div>
                  <div className="col-sm-5 text-center">Tên sản phẩm</div>
                  <div className="col-sm-2 text-center">Tổng tiền</div>
                  <div className="col-sm-2 text-center">Ngày mua</div>
                  <div className="col-sm-2 text-center">Tình trạng</div>
                </div>
                <div className="row d-flex flex-wrap panel-pro-item">
                  <div className="col-sm-1 text-center">{i}</div>
                  <div className="col-sm-5 text-center ">
                    {order.orderItems.map((item) => (
                      <span>{item.name}</span>
                    ))}
                  </div>
                  <div className="col-sm-2 text-center">
                    {formatCurrency(
                      `${order.itemsPrice + order.shippingPrice}`
                    ) + " đ"}
                  </div>
                  <div className="col-sm-2 text-center">{order.dateFind}</div>
                  <div className="col-sm-2 text-center">
                    {order.orderStatus}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default History;
