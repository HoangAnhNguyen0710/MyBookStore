"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselCard, { CafeCardItem } from "./CarouselCard";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

interface CarouselProps {
  cafeList: CafeCardItem[];
}

export const Carousel = ({ cafeList }: CarouselProps) => {
  return (
    <div
      className="relative max-w-[364px] md:max-w[640px] lg:max-w-[1024px] mx-auto"
      suppressHydrationWarning={true}
    >
      <Swiper
        slidesPerView={1} // Mobile default
        spaceBetween={5} // Giữ space giữa các slide khi ở chế độ mobile
        breakpoints={{
          640: {
            // For screens >= 640px
            slidesPerView: 3,
            spaceBetween: 10, // Thay đổi cho màn hình lớn hơn
          },
          1024: {
            // For screens >= 1024px
            slidesPerView: 3,
            spaceBetween: 15, // Thêm khoảng cách giữa các slide trên màn hình rộng
          },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{ clickable: true }}
        className="!w-full !py-4 !px-7"
      >
        {cafeList.map((cafe) => (
          <SwiperSlide key={cafe.id} className="py-2">
            <CarouselCard cafe={cafe} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="custom-prev absolute top-1/2 left-2  z-10 -translate-y-1/2 bg-primary text-white rounded-full px-2 py-4 font-semibold text-2xl  hover:bg-secondary transition">
        ❮
      </button>
      <button className="custom-next absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-primary text-white rounded-full px-2 py-4 font-semibold text-2xl hover:bg-secondary transition">
        ❯
      </button>
    </div>
  );
};
