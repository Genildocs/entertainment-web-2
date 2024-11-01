'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import Loading from './Loading';
export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  useEffect(() => {
    async function TrendingDb() {
      try {
        setIsLoading(true);
        const res = await fetch('api/trendings');
        const data = await res.json();
        const { results } = data;
        setTrending(results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    TrendingDb();
  }, []);

  return (
    <div className="pl-5 mt-3 mb-10 sm:mx-5 relative ">
      {trending.length === 0 ? (
        <Loading />
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          loop={true}
          spaceBetween={10}
          slidesPerView={2}
          pagination={{ clickable: true }}>
          {trending.map((el) => (
            <SwiperSlide key={el.id}>
              <div>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                  alt={`${el.title}`}
                  width={220}
                  height={140}
                  priority
                  className=" h-[350px] object-cover borderImages"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
