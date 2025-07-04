import React from "react";
import PhotoByName from "./PhotoByName";
import { useState } from "react";


const destinations = [
  {
    title: "Проживание среди атоллов на Мальдивах",
    description: "Начиная со II века н.э., острова были известны как «Денежные острова» из-за обилия раковин каури, использовавшихся как валюта в древности.",
    image: "maldives",
  },
  {
    title: "Откройте для себя долину Урика в Марокко",
    description: "Испано-мавританская архитектура Марокко объединяет влияние берберской культуры, Испании и современных художественных течений Ближнего Востока.",
    image: "morocco",
  },
  {
    title: "Живите по традициям Монголии",
    description: "Традиционные монгольские юрты состоят из наклонной решётчатой деревянной или бамбуковой конструкции для стен, ребер и центрального кольца.",
    image: "mongolia",
  },
  {
    title: "Бодензее – маленький немецкий рай",
    description: "Это большой внутренний водоем в пограничном стыке Германии, Австрии и Швейцарии.",
    image: "switzerland",
  },
  {
    title: "Сельяландсфосс - водопад, за который можно заглянуть",
    description: "Прекрасный водопад, который находится недалеко от основной дороги в южной части Исландии.",
    image: "iceland",
  },
  {
    title: "Уникальное здание Тайбэй 101",
    description: "Многофункциональный небоскрёб, расположенный в столице Тайваня — Тайбэе.",
    image: "taiwan",
  },
];

export default function PlacesToStay() {
    const [visibleCount, setVisibleCount] = useState(3);
  
    const showMore = () => {
      setVisibleCount((prev) => prev + 3);
    };
  
    return (
      <div className="container places-wrapper">
        <h2 className="text-xl font-semibold mb-4 mt-5">
          Исследуйте{" "}
          <a href="#" className="text-green-600 hover:underline">
            уникальные места для проживания
          </a>
        </h2>
  
        <div className="places">
          {destinations.slice(0, visibleCount).map((dest, idx) => (
            <div key={idx} className="places-card">
              <PhotoByName name={dest.image} className="w-100 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{dest.title}</h3>
                <p className="text-sm text-gray-600">{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
  
        {visibleCount < destinations.length && (
          <div className="text-center mt-4">
            <button
              onClick={showMore}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-700"
            >
              Показать еще варианты
            </button>
          </div>
        )}
      </div>
    );
  }