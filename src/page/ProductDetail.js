import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";
import * as types from '../constants/cart.constants'

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
  const [ showModal, setShowModal ] = useState(false);

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
    console.log(value)
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

  useEffect(()=> {
    console.log('카트 추가 성공', addCartSuccess)
  },[addCartSuccess])

  //카트에러가 있으면 에러메세지 보여주기

  //에러가 있으면 에러메세지 보여주기

  useEffect(() => {
    //상품 디테일 정보 가져오기
    dispatch(productActions.getProductDetail(id));
  }, [id]);


  if (loading || !selectedProduct)
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
          <img
            src={selectedProduct.image}
            className="w-100"
            alt="image"
          />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{selectedProduct.name}</div>
          <div className="product-info">₩ {currencyFormat(selectedProduct.price)}</div>
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
                Object.keys(selectedProduct.stock).map((item) =>
                  selectedProduct.stock[item] > 0 ? (
                    <Dropdown.Item eventKey={item} key={item}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item eventKey={item} disabled={true} key={item}>
                      {item.toUpperCase()}
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
