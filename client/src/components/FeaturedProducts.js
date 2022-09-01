import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import ProductCard from './ProductCard';

import '../CSS/featuredProducts.css'


const FeaturedProducts = (props) => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div>
      <h2 style={{textAlign: 'center' , letterSpacing: "4px"}}>Featured Products</h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
          320: {
            width: 320,
            slidesPerView: 1,
          },
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {productList.filter(product => product.featured || product.category === props.category).map((product)=>(
        <SwiperSlide style={{transform: 'translateX(4%)'}} key={product._id}>
          <ProductCard  product={product} scale={0.8}/>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default FeaturedProducts