import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../style/paymentPage.style.css";

const OrderCompletePage = () => {
  //만약 주문번호가 없는상태로 이페이지에 왔다면 다시 메인페이지로 돌아가기
  const navigate = useNavigate();
  const { orderNum } = useSelector((state) => state.order);
  console.log(orderNum)
  if(!orderNum) {
    return (
      <Container className="confirmation-page">
        <h2>주문페이지를 찾을 수 없습니다.</h2>
        <div>
          <div className="text-align-center">
            <Link to={"/"}>메인페이지로 돌아가기</Link>
          </div>
        </div>
      </Container>
    )
  }
  
  return (
    <Container className="confirmation-page">
      <img
        src="/image/greenCheck.png"
        width={100}
        className="check-image"
        alt="greenCheck.png"
      />
      <h2>예약이 완료됐습니다!</h2>
      <div>예약번호: {orderNum}</div>
      <div>
        예약 확인은 내 예약 메뉴에서 확인해주세요.
        <div className="text-align-center">
          <Link to={"/account/purchase"}>내 예약 바로가기</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletePage;
