import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/shop.css";
import ShopNavbar from "../components/ShopNavbar";

const Shop = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [searching, setSearching] = useState("");
  const getSearch = (searching) => {
    setSearching(searching);
  };

  const {categoryState} = useSelector((state) => state.category);

  return (
    <div>
      <ShopNavbar getSearch={getSearch}/>
      <div className="shopBody">
        <div className="shopContainer">
          {productList
            .filter(
              (el) =>
                el.category
                  .includes(categoryState) 
                &&
                (el.title
                  .toLocaleLowerCase()
                  .includes(searching.toLocaleLowerCase()) 
                ||
                el.subcategory
                  .toLocaleLowerCase()
                  .includes(searching.toLocaleLowerCase()))
            )
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
