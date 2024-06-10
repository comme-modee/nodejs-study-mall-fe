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
  const { productList, totalPage } = useSelector((state) => state.product);
  const error = useSelector((state) => state.product.error);
    
  // 처음 로딩하면 상품리스트 불러오기
  useEffect(()=>{
    dispatch(productActions.getProductList({ name: query.get("name") }))
  },[query])


  return (
    <Container>
      <Row>
          {productList && productList.map((item) => (
            <Col md={3} sm={12}>
                <ProductCard item={item}/>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
