import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCategories } from "../../../actions/categoriesAction";
import { clearErrors, getProduct } from "../../../actions/productAction";
import Menu from "../../../components/Header/Menu";
import Search from "../../../components/Header/Search";
import Abside from "../../../components/Products/Abside";
import Scrolls from "../../../components/Scrolls";
import Promotion from "../../../components/Topbar/Promotion";
import Topbar from "../../../components/Topbar/Topbar";
import Footer from "../footer";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";

const Products = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  useEffect(() => {
    if (location?.state?.cate) {
      setCategory(location?.state?.cate);
    }
  }, [dispatch, location?.state?.cate]);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000000]);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = location?.state?.name;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filteredProductsCount;
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, brand));
  }, [dispatch, keyword, currentPage, price, category, brand, error]);

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
                <li className="active">Cửa hàng</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-40">
        <div className="container">
          <div className="row">
            <Abside
              setCategory={setCategory}
              setBrand={setBrand}
              setPrice={setPrice}
            />
            <div className="col-md-9 col-sm-12 sm-mt-30 xs-mt-30">
              {/* category images start */}
              {/* <div className="category-img">
                <img src="img/banner/banner27.jpg" alt="" />
              </div> */}
              {/* category images end */}
              {/* category options start */}
              <div className="category-options mt-40">
                <div className="category-title">
                  <h2>
                    SẢN PHẨM{" "}
                    <span className="text-right">
                      {products && products?.length}
                    </span>
                  </h2>
                </div>
                <div className="category-bar">
                  {/* tab menu start */}
                  <ul className="list-gird-tab-menu">
                    <li className="active">
                      <a data-toggle="tab" href="#gird-items">
                        {" "}
                        <i className="fa fa-th" />{" "}
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#list-items">
                        {" "}
                        <i className="fa fa-list-ul" />{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* category options end */}
              {/* category items start */}
              <div className="category-items">
                <div className="tab-content mt-30">
                  <div className="tab-pane active fade in" id="gird-items">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="gird-items">
                          {products &&
                            products.map((product) => (
                              <ProductCard
                                key={product._id}
                                product={product}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="list-items">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="list-category-items">
                          {/* single product item start */}
                          {products &&
                            products.map((product) => (
                              <ProductGrid
                                key={product._id}
                                product={product}
                              />
                            ))}

                          {/* single product item end */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* category items end */}
              <div className="category-options mt-40">
                <div className="d-flex align-items-center flex-lg-row category-bar">
                  <p className="text-center w-25">
                    Hiển thị 1 - 9 trong 90 sản phẩm
                  </p>
                  <ul className="text-lg-right text-center pagi mt-5 w-75">
                    <li>
                      <a href="#" title>
                        Trước
                      </a>
                    </li>
                    <li className="active">
                      <a href="#" title>
                        1
                      </a>
                    </li>
                    <li>
                      <a href="#" title>
                        2
                      </a>
                    </li>
                    <li>
                      <a href="#" title>
                        ...
                      </a>
                    </li>
                    <li>
                      <a href="#" title>
                        Sau
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
