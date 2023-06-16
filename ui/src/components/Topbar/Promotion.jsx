import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
const Promotion = () => {
  const [open, setOpen] = useState(true);
  const onClick = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="top-banner-area top-banner-bg-1">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="description">
                  <div className="icon">
                    <img src="img/icon/icon_freeshipping.png" alt="" />
                  </div>
                  Miễn phí vận chuyển đơn hàng trên 200.000 và giảm 8.000 cho
                  mỗi đơn hàng dưới 200.000.
                </div>
              </div>
              <div className="col-sm-3 text-right">
                <div className="close-section-btn">
                  <i className="zmdi zmdi-close" onClick={onClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Promotion;
