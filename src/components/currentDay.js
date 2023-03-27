import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import ".././styles.css";

// import required modules
import { FreeMode, Pagination } from "swiper";
const CurrentDay = (props) => {
  const { iconSrc, avgtemp, date, conditiontext, condition24 } = props;
  console.log(condition24);
  return (
    <div className="currentDay w-full  h-64  my-2">
      <div className="w-full h-[50%] p-4 flex justify-between ">
        <div className="flex">
          <img className="w-20 h-20" src={iconSrc} />
          <span className="pt-6 font-bold text-lg pl-4">{avgtemp}</span>
          <span className="pt-6 pl-2">&#8457;|℃</span>
        </div>

        <div className="p-4 text-right">
          <p className="text-3xl">Weather</p>
          <div className="day ">{date}</div>
          <span>{conditiontext}</span>
        </div>
      </div>

      <div className="h-[50%]  border  border-gray-100 ">
        {/* {condition24.map(() => (
          <div className="h-full w-[4.5%] border border-red-500 "></div>
        ))} */}
        <>
          <Swiper
            slidesPerView={6}
            spaceBetween={10}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {condition24
              ? condition24.map((item) => (
                  <SwiperSlide className="rounded-md">
                    <div className="w-full h-full flex flex-col items-center py-2">
                      <div className="time text-sm md:text-base">
                        {item.time.split(" ")[1]}
                      </div>
                      <img className="w-12 h-12" src={item.condition.icon} />
                      <span className="text-sm text-gray-400 mt-2">
                        {`${item.temp_f}`} &#8457;
                      </span>
                    </div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </>
      </div>
    </div>
  );
};

export default CurrentDay;
