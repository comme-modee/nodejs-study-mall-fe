import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/mainSlider.css";

// 슬라이더이미지
import banner1 from '../asset/banner-01.jpg'
import banner2 from '../asset/banner-02.jpg'
import banner3 from '../asset/banner-03.jpg'
import banner4 from '../asset/banner-04.jpg'
import banner5 from '../asset/banner-05.jpg'

const MainSlider = () => {
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        draggable: true,
        autoplay: true
    };

    return (
        <Slider {...settings} className='main-slider'>
          <div>
            <img src={banner1} className='slide-img' alt=''/>
          </div>
          <div>
            <img src={banner2} className='slide-img' alt=''/>
          </div>
          <div>
            <img src={banner3} className='slide-img' alt=''/>
          </div>
          <div>
            <img src={banner4} className='slide-img' alt=''/>
          </div>
          <div>
            <img src={banner5} className='slide-img' alt=''/>
          </div>
        </Slider>
    )
}

export default MainSlider