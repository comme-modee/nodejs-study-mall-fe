import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../component/Spinner";

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderList, loading } = useSelector((state) => state.order)
  const [ sortList, setSortList ] = useState([]);
  const { user } = useSelector((state) => state.user)

  if(!user) {
    navigate('/login')
  }

  //오더리스트 들고오기
  useEffect(()=>{
    dispatch(orderActions.getOrder());
  },[dispatch])

  const sortData = (data) => {
    const sortedData = data.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setSortList(sortedData);
  };

  useEffect(()=>{
    sortData(orderList)
  },[orderList])
  
  // 로딩중이라면 스피너 보여주기
  if (loading)
    return (
      <Spinner/>
  );

  //오더리스트가 없다면 '주문한 상품이 없습니다' 보여주기
  if(orderList.length === 0) {
    return (
      <Container className="confirmation-page">
        <h2>주문한 상품이 없습니다.</h2>
        <div>
          <div className="text-align-center">
            <Link to={"/"}>상품 보러 메인페이지 가기</Link>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="status-card-container">
      {sortList && sortList.map((order) => <OrderStatusCard key={order._id} order={order}/>)}
    </Container>
  );
};

export default MyPage;
