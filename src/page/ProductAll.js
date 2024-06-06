import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import { useSearchParams } from "react-router-dom";

const ProductAll = () => {
  const dispatch = useDispatch();
  const [ query, setQuery ] = useSearchParams();
  const [ searchQuery, setSearchQuery ] = useState({
    // page: query.get("page") || 1,
    name: query.get("name") || "",
  }); //검색 조건들을 저장하는 객체

  const { productList, totalPage } = useSelector((state) => state.product);
  const error = useSelector((state) => state.product.error);
    
  // 처음 로딩하면 상품리스트 불러오기
  useEffect(()=>{
    if(query !== '') {
      setSearchQuery({ ...searchQuery, name: query.get("name")})
      }
    dispatch(productActions.getProductList({ ...searchQuery }))
    console.log(searchQuery)
  },[query])


  return (
    <Container>
      <Row>
          {productList && productList.map((item) => (
            <Col md={3} sm={12}>
                <ProductCard title={item.name} image={item.image} price={item.price}/>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
