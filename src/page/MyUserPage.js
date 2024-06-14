import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../style/myUserPage.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const MyUserPage = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user);
    console.log(user)
    if(!user) {
        navigate('/login')
    }
    return (
        <Container>
        <Row>
            <Col>
                <div className='my-user-page'>
                    <div className='title mb-3'>마이페이지</div>
                    <div className='info'>
                        <div className='mb-2'>
                            <strong>{user.name}님 안녕하세요!</strong>
                        </div>
                        <div className='mb-1'>
                            <strong>이메일: </strong>
                            <span>{user.email}</span>
                        </div>
                        <div className='mb-1'>
                            <strong>권한: </strong>
                            <span>{user.level}</span>
                        </div>
                        <div className='mb-1'>
                            <strong>적립금: </strong>
                            <span>{user.reward}원 (주문시 주문금액의 1%씩 적립됨)</span>
                        </div>
                        <div>
                            <strong>보유쿠폰: </strong>
                            <div className='coupon-wrapper'>
                                {user.coupons.map((i) => 
                                    <div className='coupon'>
                                        <span className='value'>{i.value}{i.unit === 'won' ? '원' : i.unit === 'percent' ? '%' : ''}</span>
                                        <span className='type'>{i.name} 쿠폰</span>
                                        <div className='badges'>
                                            <span className='applicable'>{i.applicableTo === 'all' ? '모든 상품 적용 가능' : i.applicableTo === 'newProduct' ? '신상품에만 적용 가능' : ''}</span>
                                            <span className={`min-purchase ${!i.minPurchase && 'non'}`}>{i.minPurchase ? i.minPurchase + '원 이상 구매 시 사용 가능' : '금액 조건 없음'}</span>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        </Container>
    )
}

export default MyUserPage