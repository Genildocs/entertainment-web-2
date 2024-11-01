import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function TrendingDb() {
      try {
        // Aguarda a resposta da API
        const res = await fetch('api/trendings');
        if (!success) throw new Error('Erro ao buscar dados');

        const data = await res.json();
        const { results } = data;

        // Atualiza o estado após a promessa ser cumprida
        setTrending(results);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setError(error.message);
      }
    }

    TrendingDb();
  }, []);

  return (
    <div className="pl-5 mt-3 mb-10 sm:mx-5 relative ">
      {trending !== undefined && trending.length !== 0 ? (
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
      ) : (
        <p className="text-white">{error}</p>
      )}
    </div>
  );
}
