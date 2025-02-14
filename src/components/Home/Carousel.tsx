"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselCard, { BookCardItem } from "./CarouselCard";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

interface CarouselProps {
  bookList: BookCardItem[];
}

export const Carousel = ({ bookList }: CarouselProps) => {
  return (
    <div
      className="relative max-w-[364px] md:max-w[640px] lg:max-w-[1040px] mx-auto"
      suppressHydrationWarning={true}
    >
      <Swiper
        slidesPerView={1} // Mobile default
        spaceBetween={5} // Giữ space giữa các slide khi ở chế độ mobile
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
        className="!w-full "
      >
        {bookList.map((book) => (
          <SwiperSlide key={book.id} className="">
            <CarouselCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="custom-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-primary text-white rounded-full px-2 py-4 font-semibold text-2xl hover:bg-secondary transition">
        ❮
      </button>
      <button className="custom-next absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-primary text-white rounded-full px-2 py-4 font-semibold text-2xl hover:bg-secondary transition">
        ❯
      </button>
    </div>
  );
};
