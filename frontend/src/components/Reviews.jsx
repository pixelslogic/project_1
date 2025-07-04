import React, { useState } from "react";
import PhotoByName from "./PhotoByName";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Ли Мэй",
    location: "Сеул, Южная Корея",
    date: "Апрель 2019",
    rating: 5,
    text: "Очень довольна сервисом! Смогла быстро забронировать билеты на поезд — без очередей и лишней суеты. Всё интуитивно понятно, билет сразу пришёл на почту. Обязательно воспользуюсь снова.",
    image: "user_one",
  },
  {
    name: "Малик Джонсон",
    location: "Атланта, США",
    date: "Февраль 2023",
    rating: 4,
    text: "Крутая платформа — интерфейс простой, нужный билет нашёл за пару минут. Всё чётко: оплата прошла, подтверждение пришло. Приятно, что всё работает стабильно. Буду пользоваться регулярно.",
    image: "user_two",
  },
  {
    name: "Камран Алиев",
    location: "Баку, Азербайджан",
    date: "Май 2025",
    rating: 5,
    text: "Забронировал автобус до Тбилиси — понравилось, что можно выбрать удобное время и быстро оплатить. Сайт работает стабильно, билет получил сразу. Хороший сервис, без лишних сложностей.",
    image: "user_three",
  },
  {
    name: "Джессика Уилсон",
    location: "Чикаго, США",
    date: "Июль 2022",
    rating: 4,
    text: "Понравилось, что можно сравнивать цены сразу у нескольких перевозчиков. Я нашла отличный билет на автобус и спокойно оплатила онлайн. Всё прошло гладко, без сюрпризов. Удобный и надёжный сервис!",
    image: "user_four",
  },
  {
    name: "Аяко Такахаси",
    location: "Осака, Япония",
    date: "Ноябрь 2020",
    rating: 5,
    text: "Сайт удивил простотой и скоростью. Нашла недорогой авиабилет за пару минут, без навязанных услуг. Всё сработало точно — пришло подтверждение и напоминание. Очень удобно!",
    image: "user_five",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex mb-2 text-indigo-600">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < Math.floor(count) ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function TestimonialsSlider() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="reviews-container container">
      <h2 className="reviews-title">
        Отзывы о нас
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, index) => {
          const isExpanded = expandedIndex === index;
          const shouldTruncate = t.text.length > 150 && !isExpanded;
          const displayText = shouldTruncate
            ? t.text.slice(0, 150) + "..."
            : t.text;

          return (
            <SwiperSlide key={index}>
              <div className="reviews-card">
                <div className="reviews-photo">
                  <PhotoByName name={t.image} className="rounded-full mr-3 object-cover" />
                </div>
                <div className="reviews-wrapper">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-sm">
                    {t.location} | {t.date}
                  </p>
                  <StarRating count={t.rating} />
                  <p className="text-gray-700 text-sm">
                  {displayText}{" "}
                  {shouldTruncate && (
                    <button
                      onClick={() => setExpandedIndex(index)}
                      className="reviews-button"
                    >
                      развернуть отзыв...
                    </button>
                  )}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
