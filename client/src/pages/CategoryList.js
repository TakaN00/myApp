import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../slices/categorySlice";
import AddCategory from "../components/AddCategory";
import UpdateCategory from "../components/UpdateCategory";

const CategoryList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoryList = useSelector((state) => state.category.categoryList);

  return (
    <div>
      <div className="orderList-container">
        <div className="card">
          <div className="row">
            <div className="col-md-12 orderList">
              <div className="title">
                <div className="row">
                  <div className="col ">
                    <h4>
                      <b>Category List:</b>
                    </h4>
                  </div>
                  <div className="col-md-4">
                    <AddCategory />
                  </div>
                </div>
              </div>
              {categoryList &&
                categoryList.map((category) => (
                  <div className="row border-top border-bottom" key={category._id}>
                    <div className="row main align-items-center">
                      <div className="col-2">
                        <img className="img-fluid" src={category.img} alt="category cover"/>
                      </div>
                      <div className="col priceCol">
                        <div className="row text-muted">Title: </div>
                        <div className="col titleRow">{category.title}</div>
                      </div>
                      <div className="col priceCol">
                        <div className="row text-muted">Featured:</div>
                        <div className="col">{`${category.featured}`}</div>
                      </div>
                      <div className="col quantityCol btnCol">
                        <UpdateCategory category={category} />
                        <Button
                          size="sm"
                          variant="light"
                          style={{ color: "red" }}
                          onClick={(e) => {
                            dispatch(deleteCategory(category._id));
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
