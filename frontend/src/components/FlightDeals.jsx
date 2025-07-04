import React from "react";
import PhotoByName from "./PhotoByName";

const destinations = [
  {
    title: "Набережная Вайтань",
    city: "Шанхай",
    description: "Самое посещаемое место для путешественников",
    price: "49000 ₽",
    image: "bund",
  },
  {
    title: "Оперный театр",
    city: "Сидней",
    description: "Прогулка по знаменитой гавани",
    price: "81000 ₽",
    image: "opera",
  },
  {
    title: "Кодай-дзи",
    city: "Киото",
    description: "Путешествие во времени в район Гион",
    price: "52000 ₽",
    image: "temple",
  },
  {
    title: "Восточный Цаво",
    city: "Кения",
    description: "Национальный парк Восточный Цаво",
    price: "103000 ₽",
    image: "tsavo",
  },
];

export default function FlightDeals() {
  return (
    <div className="container deals-wrapper">
      <h2 className="text-xl font-semibold mb-4 mt-5">
        Найди свое новое приключение c{" "}
        <a href="#" className="text-blue-600 hover:underline">
          нашими специальными предложениями
        </a>
      </h2>

      <div className="deals">
        {destinations.slice(0, 3).map((dest, idx) => (
          <div key={idx} className="deals-card">
            <PhotoByName name={dest.image} className="w-100 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">
                {dest.title},{" "}
                <span className="text-blue-600 hover:underline">{dest.city}</span>
              </h3>
              <p className="text-sm text-gray-600">{dest.description}</p>
              <p className="text-right text-base font-medium">{dest.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="deals-card deals-card--large">
        <div className="rounded-xl shadow-md overflow-hidden">
          <PhotoByName
            name={destinations[3].image}
            className="w-100 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold">
              {destinations[3].title},{" "}
              <span className="text-blue-600 hover:underline">
                {destinations[3].city}
              </span>
            </h3>
            <p className="text-sm text-gray-600">
              {destinations[3].description}
            </p>
            <p className="text-right text-base font-medium">
              {destinations[3].price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}