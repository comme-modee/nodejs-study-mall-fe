import React, { useState } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { ORDER_STATUS } from "../constants/order.constants";
import { orderActions } from "../action/orderAction";
import { currencyFormat } from "../utils/number";

const OrderDetailDialog = ({ open, handleClose, searchQuery }) => {
  const selectedOrder = useSelector((state) => state.order.selectedOrder);
  const [orderStatus, setOrderStatus] = useState(selectedOrder.status);
  const dispatch = useDispatch();

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };
  const submitStatus = () => {
    dispatch(orderActions.updateOrder(selectedOrder._id, orderStatus, searchQuery));
    handleClose();
  };

  if (!selectedOrder) {
    return <></>;
  }
  return (
    <Modal size="lg" show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>예약번호:</strong> {selectedOrder.orderNum}</p>
        <p><strong>주문날짜:</strong> {selectedOrder.createdAt.slice(0, 10)}</p>
        <p><strong>이메일:</strong> {selectedOrder.userId?.email}</p>
        <p>
          <strong>주소:</strong> {selectedOrder.shipTo.address + " " + selectedOrder.shipTo.city}
        </p>
        <p>
          <strong>연락처:</strong> {`${selectedOrder.contact.firstName + selectedOrder.contact.lastName}, ${selectedOrder.contact.contact}`}
        </p>
        <p><strong>주문내역</strong></p>
        <div className="overflow-x">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>상품명</th>
                <th>개별 금액</th>
                <th>수량</th>
                <th>총 금액</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.length > 0 &&
                selectedOrder.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.productId.name}</td>
                    <td>{currencyFormat(item.price)}</td>
                    <td>{item.qty}</td>
                    <td>{currencyFormat(item.price * item.qty)}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4}><strong>총계:</strong></td>
                <td>{currencyFormat(selectedOrder.totalPrice)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Form onSubmit={submitStatus}>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={orderStatus} onChange={handleStatusChange}>
              {ORDER_STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="order-button-area">
            <Button
              variant="light"
              onClick={handleClose}
              className="order-button"
            >
              닫기
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailDialog;
