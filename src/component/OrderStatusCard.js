import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
// import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";
import { useNavigate } from "react-router";

const OrderStatusCard = ({ order }) => {
  const navigate = useNavigate();
  const showDetailOrderInfo = (id) => {
    navigate(`/account/purchase/${id}`)
  }
  return (
    <div onClick={() => showDetailOrderInfo(order._id)}>
      <Row className="status-card">
        <Col xs={2}>
          <img
            src={order.items[0].productId.image}
            alt=""
            height={96}
          />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {order.orderNum}</strong>
          </div>

          <div className="text-12">{order.createdAt.split('T')[0]}</div>

          <div>
            {order.items.length === 1 ? `${order.items[0].productId.name}` :
            order.items.length > 1 ? `${order.items[0].productId.name} 외 ${order.items.length - 1}개` : ''}
          </div>

          <div>₩ {currencyFormat(order.totalPrice)}</div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg="warning">{order.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
