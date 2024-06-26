import React, { useEffect } from 'react'
import { Row, Col, Container, Table, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { orderActions } from '../action/orderAction';
import { currencyFormat } from '../utils/number';
import '../style/orderDetailPage.css';
import { ColorRing } from 'react-loader-spinner';
import { badgeBg } from "../constants/order.constants";

const OrderDetailInfo = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { orderDetailInfo, loading } = useSelector((state) => state.order);
    
    useEffect(()=>{
        console.log(id)
        dispatch(orderActions.getOrderDetailInfo(id));
    },[id])

    if (loading || !orderDetailInfo)
        return (
          <Row className="color-ring">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </Row>
    );

    return (
        <Container>
            <Row className="order-detail">
                <Col>
                    <div className='top'>
                        <div><strong>주문번호:</strong> {orderDetailInfo.orderNum}</div>
                        <div><strong>주문날짜:</strong> {orderDetailInfo.createdAt.split('T')[0]}</div>
                        <div><strong>주소:</strong> {`[${orderDetailInfo.shipTo.zip}] ${orderDetailInfo.shipTo.city} ${orderDetailInfo.shipTo.address}`}</div>
                        <div><strong>주문자명:</strong> {`${orderDetailInfo.contact.firstName} ${orderDetailInfo.contact.lastName}`}</div>
                        <div><strong>연락처:</strong> {orderDetailInfo.contact.contact}</div>
                        <div><strong>주문상태:</strong> <Badge bg={`${badgeBg[orderDetailInfo.status]}`}>{orderDetailInfo.status}</Badge></div>
                    </div>
                    <div className="overflow-x">
                        <Table className='order-detail-table'>
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
                                {orderDetailInfo.items.length > 0 &&
                                    orderDetailInfo.items.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td className='img-title'><img height={96} src={item.productId.image} alt={item.productId.name}/>{item.productId.name}</td>
                                        <td>₩ {currencyFormat(item.price)}</td>
                                        <td>{item.qty}</td>
                                        <td>₩ {currencyFormat(item.price * item.qty)}</td>
                                    </tr>
                                    ))}
                                <tr>
                                    <td colSpan={4} className='total-price'><strong>총계:</strong></td>
                                    <td>₩ {currencyFormat(orderDetailInfo.totalPrice)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderDetailInfo;