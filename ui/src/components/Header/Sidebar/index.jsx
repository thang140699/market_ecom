import React, { useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../../actions/categoriesAction";
const Sidebar = ({ type }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.allCategories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="col-md-3">
      {/* category menu start */}
      <div className="catagory-menu hidden-sm hidden-xs">
        <div className="catagory-heading">
          <h2>Tất cả</h2>
        </div>
        {type === "home" && (
          <div className="catagory-list-menu">
            <ul>
              {categories &&
                categories.map((category) => (
                  <li>
                    {" "}
                    <Link
                      to={{
                        pathname: "/products",
                        state: { cate: category.name },
                      }}
                    >
                      <a href="#">
                        {" "}
                        <img src="img/menu-icon/5.jpg" alt="" /> {category.name}
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {/* category menu end */}
    </div>
  );
};

export default Sidebar;
