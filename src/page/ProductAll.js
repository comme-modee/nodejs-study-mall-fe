import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import { useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/mainSlider.css";

// 슬라이더이미지
import banner1 from '../asset/banner-01.jpg'
import banner2 from '../asset/banner-02.jpg'
import banner3 from '../asset/banner-03.jpg'
import banner4 from '../asset/banner-04.jpg'
import banner5 from '../asset/banner-05.jpg'

const ProductAll = () => {
  const dispatch = useDispatch();
  const [ query, setQuery ] = useSearchParams();
  const { productList, totalPage } = useSelector((state) => state.product);
  const error = useSelector((state) => state.product.error);
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    draggable: true,
    autoplay: true
  };

  // 처음 로딩하면 상품리스트 불러오기
  useEffect(()=>{
    dispatch(productActions.getProductList({ name: query.get("name") }))
  },[query])


  return (
    <>
        <Slider {...settings} className='main-slider'>
          <div>
            <img src={banner1} className='slide-img' alt=''/>
          </div>
          <div>
            <img src={banner2} className='slide-img' alt=''/>
          </div>
          <div>
            <img src={banner3} className='slide-img' alt=''/>
          </div>
          <div>
            <img src={banner4} className='slide-img' alt=''/>
          </div>
          <div>
            <img src={banner5} className='slide-img' alt=''/>
          </div>
        </Slider>
        
        <Container>
          <Row>
              {productList && productList.map((item) => (
                <Col md={3} sm={12} key={item._id}>
                    <ProductCard item={item}/>
                </Col>
              ))}
          </Row>
        </Container>
    </>
  );
};

export default ProductAll;
