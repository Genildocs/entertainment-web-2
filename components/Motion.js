'use client';
import * as React from 'react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const images = [
  'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
  'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
  'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
];
export default function Motion() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[470px] h-[450px] bg-white   box-border">
        <Swiper
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation, Pagination, Scrollbar]}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}>
          {images.map((value, index) => (
            <SwiperSlide key={index}>
              <img
                src={value}
                alt="z"
                className=" object-contain w-full h-[250px] "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
