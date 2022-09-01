import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../slices/cartSlice";
import { getUserInfo } from "../slices/userSlice";
import FeaturedProducts from "../components/FeaturedProducts";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { getCategories, selectCategory } from "../slices/categorySlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getCart());
    dispatch(getCategories())
  }, []);

  const categoryList = useSelector((state) => state.category.categoryList);

  return (
    <div>
      <div className="carouselContainer">
      <Carousel variant="dark" bg="primary">
        <Carousel.Item>
          <img
            className="d-block w-50 carousel-image"
            src="https://res.cloudinary.com/takan0/image/upload/v1660937429/AnG/pub_dimensions_02_wrupar.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-50 carousel-image"
            src="https://res.cloudinary.com/takan0/image/upload/v1660937434/AnG/pub_dimensions_01_mwy22z.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://res.cloudinary.com/takan0/image/upload/v1660937772/AnG/header_one_piece_uirzom.jpg"
            alt="Third slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>

      <div className="categoryBlock">
        <h2 style={{ textAlign: "center", letterSpacing: "4px"}}>Categories</h2>
        <div className="categoryContainer">
            {categoryList.filter(category => category.featured === true).map((category) => (
          <div className="categoryBox" key={category._id}>
            <div className="categoryImgBox rounded-circle border">
              <img src={category.img} alt="category cover"/>
            </div>
            <Button variant="light" className="categoryBoxBtn border" onClick={()=>{dispatch(selectCategory(`${category.title}`)); nav('/shop')}}>
              <h3>{category.title}</h3>
            </Button>
          </div>
            ))}
        </div>
      </div>
      <FeaturedProducts />
    </div>
  );
};

export default Home;
