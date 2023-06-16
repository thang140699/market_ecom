import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../../../actions/brandAction";
import { getCategories } from "../../../actions/categoriesAction";
import { Radio, Slider } from "antd";
const Abside = (props) => {
  const { setCategory, setBrand, setPrice } = props;
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.allCategories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const { brand } = useSelector((state) => state.allBrand);
  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);
  const onChange = (value) => {
    console.log("onChange: ", value);
  };
  const onAfterChange = (value) => {
    setPrice(value);
  };
  return (
    <div className="col-md-3 col-sm-8 col-sm-offset-2 col-md-offset-0">
      <div className="sidebar">
        <div className="sidebar-widget">
          <h3 className="sidebar-title">Danh mục</h3>
          <div className="input-box">
            <input
              type="radio"
              name="category"
              defaultValue=""
              id=""
              onClick={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="Tất cả">Tất cả</label>
          </div>
          {categories &&
            categories.map((category) => (
              <div className="input-box">
                <input
                  type="radio"
                  name="category"
                  defaultValue={category.name}
                  id={category.name}
                  onClick={(e) => setCategory(e.target.value)}
                />
                <label htmlFor={category.name}>{category.name}</label>
              </div>
            ))}
        </div>
        <div className="sidebar-widget">
          <h3 className="sidebar-title">Nhãn hiệu</h3>
          <div className="input-box">
            <input
              type="radio"
              name="category"
              defaultValue=""
              id=""
              onClick={(e) => setBrand(e.target.value)}
            />
            <label htmlFor="Tất cả">Tất cả</label>
          </div>
          {brand &&
            brand.map((brand) => (
              <div className="input-box">
                <input
                  type="radio"
                  name="FashionManufacturer"
                  defaultValue={brand.name}
                  id={brand.name}
                  onClick={(e) => setBrand(e.target.value)}
                />
                <label htmlFor={brand.name}>{brand.name}</label>
              </div>
            ))}
        </div>
        <div className="sidebar-widget">
          <h3 className="sidebar-title">Giá</h3>
          <div className="input-box">
            <Slider
              range
              step={100000}
              defaultValue={[0, 50000]}
              min={0}
              max={20000000}
              onChange={onChange}
              onAfterChange={onAfterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abside;
