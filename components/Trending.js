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
  console.log(trending);
  useEffect(() => {
    async function TrendingDb() {
      const res = await fetch('api/trendings');
      const data = await res.json();
      const { results } = data;
      setTrending(results);

      // Após a promessa ser cumprida, aguarda 45 segundos antes de chamar a função novamente
      setTimeout(TrendingDb, 45000);
    }

    // Inicia a chamada com um atraso inicial de 45 segundos
    const timeoutId = setTimeout(TrendingDb, 45000);

    // Limpa o timeout se o componente for desmontado
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="pl-5 mt-3 mb-10 sm:mx-5 relative ">
      {trending.length !== 0 && (
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
