import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";
import * as types from '../constants/cart.constants'
import Spinner from "../component/Spinner";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const { addCartSuccess } = useSelector((state) => state.cart);
  const [ size, setSize ] = useState("");
  const { id } = useParams();
  const [ sizeError, setSizeError ] = useState(false);

  const navigate = useNavigate();

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    if(size === '') {
      setSizeError(true);
      return;
    } 
    // 아직 로그인을 안한유저라면 로그인페이지로
    if(!user) navigate('/login');
    // 카트에 아이템 추가하기
    dispatch(cartActions.addToCart({ id, size }))
  };
  const selectSize = (value) => {
    // 사이즈 추가하기
    if(sizeError) setSizeError(false);
    setSize(value);
  };

  const handleBtn = (value) => {
    const direction = value;
    dispatch({type: types.SET_ADD_SUCCESS_MODAL, payload: false})
    if(direction === 'cart') {
      navigate('/cart');
    } else if (direction === 'main') {
      navigate('/')
    }
  }

  if(error) {
    dispatch(commonUiActions.showToastMessage(error, "error"));
  }

  useEffect(() => {
    //상품 디테일 정보 가져오기
    dispatch(productActions.getProductDetail(id));
  }, [id]);

  if (loading || !selectedProduct)
    return (
      <Spinner/>
    );

  return (
    <Container className="product-detail-card">
      <Modal size="xs" show={addCartSuccess} onHide={!addCartSuccess} animation={false}>
        <Modal.Header closeButton>
          {/* <Modal.Title>아이템 삭제</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-center">카트에 상품을 담았습니다.</Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={() => handleBtn('main')}>
            다른 상품 더 보기
          </Button>
          <Button variant="primary" onClick={() => handleBtn('cart')}>
            카트 확인하기
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col sm={6}>
          <img src={selectedProduct.image} className="w-100" alt="image" />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-title">{selectedProduct.name}</div>
          <div className="product-price">₩ {currencyFormat(selectedProduct.price)}</div>
          <div className="product-info">{selectedProduct.description}</div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
            >
              {size === "" ? "사이즈 선택" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {Object.keys(selectedProduct.stock).length > 0 &&
                Object.keys(selectedProduct.stock).map((size) =>
                  selectedProduct.stock[size] > 0 ? (
                    <Dropdown.Item eventKey={size} key={size}>
                      <div className="display-space-between">
                        <div>{size.toUpperCase()}</div>
                        <div className={`${selectedProduct.stock[size] > 10 ? 'color-blue' : 'color-red'}`}>재고: {selectedProduct.stock[size]}</div>
                      </div>
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item eventKey={size} disabled={true} key={size}>
                      <div className="display-space-between">
                        <div>{size.toUpperCase()}</div>
                        <div>품절</div>
                      </div>
                    </Dropdown.Item>
                  )
                )}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "사이즈를 선택해주세요."}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
