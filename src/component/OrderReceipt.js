import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import * as types from "../constants/cart.constants";

const OrderReceipt = ({ cartList, totalPrice, coupons }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCoupon } = useSelector((state) => state.cart);

  const selectCoupon = (value) => {
    dispatch({type: types.SET_SELECTED_COUPON, payload: value})
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
        <select onChange={(e) => selectCoupon(e.target.value)}>
          {coupons && coupons.map((item) => item.valid && <option key={item.type} value={item.type}>{`${item.name} 쿠폰 - ${item.value}${item.unit === 'won' ? '원' : item.unit === 'percent' ? '%' : ''} 할인`}</option>)}
        </select>  
      }
      {selectedCoupon && 
          <div className="display-flex space-between">
            <div>쿠폰 할인 금액:</div>
            <div>{selectedCoupon === 'c1' ? '₩ 3000' : 
                          selectedCoupon === 'c2' ? `₩ ${currencyFormat(totalPrice*0.1)}` : 
                          selectedCoupon === 'c3' ? `₩ ${currencyFormat(totalPrice*0.15)}` : ''}
            </div>
          </div>
      }
      <div className="display-flex space-between receipt-title">
        <div>
          <strong>총 주문금액:</strong>
        </div>
        <div>
          {selectedCoupon && selectedCoupon === 'c1' ? <strong>₩ {currencyFormat(totalPrice-3000)}</strong> :
            selectedCoupon && selectedCoupon === 'c2' ? <strong>₩ {currencyFormat(totalPrice-totalPrice*0.1)}</strong>:
            selectedCoupon && selectedCoupon === 'c3' ? <strong>₩ {currencyFormat(totalPrice-totalPrice*0.15)}</strong>:
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
