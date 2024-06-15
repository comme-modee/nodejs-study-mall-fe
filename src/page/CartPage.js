import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";
import { useNavigate } from "react-router";
import { ColorRing } from "react-loader-spinner";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice, loading, cartItemQty } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate("/");
    }
  },[user])

  
  useEffect(() => {
    dispatch(cartActions.getCartList())
  }, []);

  if (loading && cartItemQty !== 0)
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
      <Row>
        <Col xs={12} md={7}>
          {cartList.length > 0 ?
            cartList.map((item) => <CartProductCard item={item} key={item._id}/>)
            :
            <div className="text-align-center empty-bag">
              <h2>카트가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>
          }
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} coupons={user?.coupons} reward={user?.reward}/>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
