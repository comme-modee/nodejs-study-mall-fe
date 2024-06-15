import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../constants/order.constants";

const OrderReceipt = ({ cartList, totalPrice, coupons, reward }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCoupon, usedReward } = useSelector((state) => state.order);

  useEffect(()=>{
    if(!location.pathname.includes('/payment')) {
      dispatch({type: types.SET_SELECTED_COUPON, payload: null})
      dispatch({type: types.SET_USE_REWARD, payload: null})
    }
  },[])
    
  const selectCoupon = (value) => {
    dispatch({type: types.SET_SELECTED_COUPON, payload: value})
  }

  const selectUseReward = (value) => {
    dispatch({type: types.SET_USE_REWARD, payload: reward})
  }

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">주문 내역</h3>
      <ul className="receipt-list">
        <li>
            {cartList.length > 0 &&
              cartList.map((item) => (
                <div key={item._id} className="display-flex space-between">
                      <div>{item.productId.name}, {item.size.toUpperCase()}, {item.qty}개</div>
                      <div>₩ {currencyFormat(item.productId.price * item.qty)}</div>
                </div>
            ))}
        </li>
      </ul>
      {cartList.length > 0 && coupons && coupons.length > 0 &&
        <select className='coupon-select' onChange={(e) => selectCoupon(e.target.value)}>
          <option value=''>--- 쿠폰 선택 ---</option>
          {coupons && coupons.map((item) => <option key={item.type} value={item.type} disabled={!item.valid || item.minPurchase > totalPrice}>{`${item.name} 쿠폰 - ${item.value}${item.unit === 'won' ? '원' : item.unit === 'percent' ? '%' : ''} 할인`} {item.minPurchase !== 0 ? `(${currencyFormat(item.minPurchase)}원 이상 사용가능)` : ''}</option>)}
        </select>  
      }
      {cartList.length > 0 && reward && (
        <select className='coupon-select' onChange={(e) => selectUseReward(e.target.value)}>
          <option value=''>--- 추가 할인 선택 ---</option>
          <option value={reward}>적립금 {reward}원 사용</option>
        </select>  
      )}

      {selectedCoupon && (
        <div className="display-flex space-between">
          <div>쿠폰 할인 금액:</div>
          <div>{selectedCoupon === 'c1' ? `₩ ${currencyFormat(3000)}` : 
                selectedCoupon === 'c2' ? `₩ ${currencyFormat(totalPrice*0.1)}` : 
                selectedCoupon === 'c3' ? `₩ ${currencyFormat(totalPrice*0.15)}` : ''}
          </div> 
        </div>
      )}
      {usedReward && (
        <div className="display-flex space-between">
          <div>적립금 할인 금액:</div>
          <div>₩ {currencyFormat(usedReward)}</div> 
        </div>
      )}
      
      {selectedCoupon || usedReward ? 
        <div className="display-flex space-between color-gray">
          <div>
            <small>할인 전 금액:</small>
          </div>
          <div>
            <small className="line-tr">₩ {currencyFormat(totalPrice)}</small>
          </div>
        </div>
      : ''}
      
      <div className="display-flex space-between receipt-title color-blue">
        <div>
          <strong>총 주문금액:</strong>
        </div>
        <div>
          {selectedCoupon && selectedCoupon === 'c1' && usedReward ? <strong>₩ {currencyFormat((totalPrice-3000)-usedReward)}</strong> :
            selectedCoupon && selectedCoupon === 'c2' && usedReward ? <strong>₩ {currencyFormat((totalPrice-totalPrice*0.1)-usedReward)}</strong>:
            selectedCoupon && selectedCoupon === 'c3' && usedReward ? <strong>₩ {currencyFormat((totalPrice-totalPrice*0.15)-usedReward)}</strong>:
            selectedCoupon && selectedCoupon === 'c1' ? <strong>₩ {currencyFormat(totalPrice-3000)}</strong> :
            selectedCoupon && selectedCoupon === 'c2' ? <strong>₩ {currencyFormat(totalPrice-totalPrice*0.1)}</strong>:
            selectedCoupon && selectedCoupon === 'c3' ? <strong>₩ {currencyFormat(totalPrice-totalPrice*0.15)}</strong>:
            usedReward ? <strong>₩ {currencyFormat(totalPrice-usedReward)}</strong>:
            <strong>₩ {currencyFormat(totalPrice)}</strong>
          }
        </div>
      </div>
      {location.pathname.includes("/cart") && cartList.length > 0 && (
        <Button
          variant="dark"
          className="payment-button"
          onClick={() => navigate("/payment")}
        >
          결제 계속하기
        </Button>
      )}

      <div>
        가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및 배송료는
        확인되지 않습니다.
        <div>
          30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는 추가 배송 요금
          읽어보기 반품 및 환불
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
