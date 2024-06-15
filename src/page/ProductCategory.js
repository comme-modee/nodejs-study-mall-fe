import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import { useParams, useSearchParams } from "react-router-dom";
import MainSlider from "../component/MainSlider";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const [ query, setQuery ] = useSearchParams();
  const { productList, totalPage } = useSelector((state) => state.product);
  const { id } = useParams();
  const error = useSelector((state) => state.product.error);
  const [ filteredList, setFilteredList ] = useState([]);

  // 처음 로딩하면 상품리스트 불러오기
  useEffect(()=>{
    dispatch(productActions.getProductList({ name: query.get("name") }))
  },[query])

  const filteredByCategory = (productList, id) => {
    const temp = productList.filter((item) => item.category.includes(id));
    return setFilteredList(temp);
  }

  useEffect(()=>{
    filteredByCategory(productList, id)
  },[productList, id])

  return (
    <>
        <MainSlider/>
        
        <Container>
          <Row>
              {filteredList.length > 0 ? filteredList.map((item) => (
                <Col md={3} sm={12} key={item._id}>
                    <ProductCard item={item}/>
                </Col>
              ))
              : <Container className="confirmation-page">
                  <h5>상품을 준비중입니다.</h5>
                </Container>
              }
          </Row>
        </Container>
    </>
  );
};

export default ProductCategory;
