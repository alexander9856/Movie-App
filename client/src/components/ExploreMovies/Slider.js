import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { ExploreMoviesItem } from './ExploreMoviesItem';
export const Slider = ({ movies }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
        >
            {movies?.map(x => (
                <SwiperSlide key={x?._id}>
                    <ExploreMoviesItem item={x}  />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}