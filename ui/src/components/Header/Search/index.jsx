import React, { useState } from "react";
import MiniCart from "./MiniCart";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/helper";
import { useHistory } from "react-router-dom";
const Search = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    history.push({ pathname: `/products`, state: { name: keyword } });
  };

  return (
    <div className="main-header-area">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            {/* logo start */}
            <a href="/" className="logo">
              {" "}
              <img src="img/logo.jpg" alt="" />{" "}
            </a>
            {/* logo end */}
          </div>
          <div className="col-md-9 col-sm-12">
            <div className="row">
              <div className="col-md-9">
                {/* category bar start */}
                <div className="catagory-bar">
                  <div className="header-search">
                    <form action="#" onSubmit={searchSubmitHandler}>
                      <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                      <span>
                        <select name="select" id="select">
                          <option value>Tất cả</option>
                          <option value={12}>Thời trang</option>
                          <option value={22}>--Váy</option>
                          <option value={26}>---Áo len</option>
                          <option value={27}>---Đồ ban đêm</option>
                          <option value={28}>---Đồ ban ngày</option>
                          <option value={29}>---Đồ thể thao</option>
                          <option value={23}>--Túi xách</option>
                          <option value={30}>---Shoulder</option>
                          <option value={31}>---Satchels</option>
                          <option value={32}>---Đồ trẻ em</option>
                          <option value={33}>---Áo khoác</option>
                          <option value={24}>--Giày</option>
                          <option value={34}>---Ankle Boots</option>
                          <option value={35}>---Sandals</option>
                          <option value={36}>---Giày chạy</option>
                          <option value={37}>---Sách</option>
                          <option value={25}>--Quần áo</option>
                          <option value={38}>---Áo khoác</option>
                          <option value={39}>---Áo mưa</option>
                          <option value={40}>---Jackets</option>
                          <option value={41}>---Áo phông</option>
                          <option value={13}>Đồ điện</option>
                          <option value={42}>--Laptops</option>
                          <option value={46}>---Dell Laptops</option>
                          <option value={47}>---HP Laptops</option>
                          <option value={48}>---Lenovo Laptops</option>
                          <option value={49}>---Apple Laptops</option>
                          <option value={43}>--Camera</option>
                          <option value={50}>---Cameras kỹ thuật số</option>
                          <option value={51}>---Camcorders</option>
                          <option value={52}>---Thiết bị chụp ảnh</option>
                          <option value={53}>---Thẻ nhớ</option>
                          <option value={44}>--Smart Phone</option>
                          <option value={54}>---Apple Phones</option>
                          <option value={55}>---Samsung Phones</option>
                          <option value={56}>---Motorola Phones</option>
                          <option value={57}>---Lenovo Phones</option>
                          <option value={45}>--Tivi</option>
                          <option value={58}>---MÁy tính All-in-One</option>
                          <option value={59}>---Towers Only</option>
                          <option value={60}>---Màn hình Refurbished</option>
                          <option value={61}>---Màn hình game</option>
                          <option value={14}>Nội thất &amp; Trang trí</option>
                          <option value={62}>--Ghế</option>
                          <option value={65}>---Phòng ăn</option>
                          <option value={66}>---Phòng ngủ</option>
                          <option value={67}>
                            --- Nhà cửa &amp; Văn phòng
                          </option>
                          <option value={68}>---Phòng khách</option>
                          <option value={63}>--Đèn</option>
                          <option value={69}>---Đèn ...</option>
                          <option value={70}>---Đèn tường</option>
                          <option value={71}>---Đèn sân</option>
                          <option value={72}>---Đèn thông minh</option>
                          <option value={64}>--Sofa</option>
                          <option value={73}>---Fabric Sofas</option>
                          <option value={74}>---Sô-pha da</option>
                          <option value={75}>---Sô-pha góc</option>
                          <option value={76}>---Sô-pha giường</option>
                          <option value={15}>Trang sức &amp; Đồng hồ</option>
                          <option value={16}>Sức khỏe &amp; Làm đẹp</option>
                          <option value={17}>Sách &amp; Văn phòng</option>
                          <option value={18}>Thể thao &amp; Ngoài trời</option>
                          <option value={19}>Smart phone &amp; Tablets</option>
                          <option value={20}>Computer - Laptop</option>
                          <option value={21}>Phụ kiện</option>
                          <option value={77}>--Túi &amp; Thắt lưng</option>
                          <option value={78}>
                            --Kính râm &amp; Máy đọc sách
                          </option>
                          <option value={79}>--Tất &amp; Cà-vạt</option>
                          <option value={80}>--Khăn &amp; Găng tay</option>
                        </select>
                      </span>
                      <button type="submit">
                        <i className="zmdi zmdi-search" />
                      </button>
                    </form>
                  </div>
                </div>
                {/* category bar end */}
              </div>
              <div className="col-md-3">
                {/* total cart start */}
                <div className="total-cart">
                  <div className="cart-button">
                    <a href="/cart">
                      {" "}
                      <i className="zmdi zmdi-shopping-cart" />{" "}
                      <strong> Giỏ hàng </strong>{" "}
                      <span className="price" data-content={cartItems.length} />
                      Giá:{" "}
                      {formatCurrency(
                        `${cartItems.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )}`
                      )}{" "}
                      đ
                    </a>
                  </div>
                  <MiniCart />
                </div>
                {/* total cart end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
