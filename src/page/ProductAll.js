import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const { productList, totalPage } = useSelector((state) => state.product);
  const [ query, setQuery ] = useSearchParams();
  const [ searchQuery, setSearchQuery ] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  }); //검색 조건들을 저장하는 객체
  const error = useSelector((state) => state.product.error);
    
  // 처음 로딩하면 상품리스트 불러오기
  useEffect(()=>{
    dispatch(productActions.getProductList({ ...searchQuery }))
  },[query])

  return (
    <Container>
      <Row>
        <Col md={3} sm={12}>
          {productList && productList.map((item) => {
              <ProductCard title={item.name} img={item.image} price={item.price}/>
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductAll;
