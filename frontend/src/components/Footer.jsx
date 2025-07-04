import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter, faInstagram, faFacebookF,} from '@fortawesome/free-brands-svg-icons';
import Nav from "react-bootstrap/Nav";
import NavLogo from "./Logo";
import { BOOKING_ROUTE } from "../utils/consts";
import PhotoByName from "./PhotoByName";

const Footer = () => {
    const sections = [
      {
        title: "О нас",
        links: [
          "Как это работает",
          "Партнёрство",
          "Карьера",
          "Инвесторы",
          "Пресса",
          "Блог",
          "Форум",
        ],
      },
      {
        title: "Стать партнёром",
        links: [
          "Партнёрская программа",
          "Промоакции",
          "Интеграции",
          "Сообщество",
          "Программа лояльности",
        ],
      },
      {
        title: "Поддержка",
        links: [
          "Центры поддержки",
          "Связаться с нами",
          "Политика конфиденциальности",
          "Условия обслуживания",
          "Политика возврата",
          "Политика безопасности",
        ],
      },
      {
        title: "Скачать приложение",
        links: ["Orbitra для Android", "Orbitra для iOS"],
      },
    ];


  
    return (
      <footer className="footer">
        <div className="footer-wrapper p-0 container">
            <Nav.Link to={BOOKING_ROUTE} className="nav-logo-link">
                <NavLogo />
            </Nav.Link>
  
            {sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="footer-title">{section.title}</h3>
                <ul className="footer-list">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="footer-link">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
  
              {section.title === "Скачать приложение" && (
                <div className="footer-apps flex gap-4">
                  <a
                    href="https://play.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PhotoByName name="google_play" className="h-10 object-cover" />
                  </a>
                  <a
                    href="https://apps.apple.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PhotoByName name="app_store" className="h-10 object-cover" />
                  </a>
              </div>
              )}
            </div>
          ))}
        </div>
  
        <div className="footer-media container">
            <div className="footer-social">
                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            </div>
            <div className="text-gray-600">
            © Все права защищены. Orbitra, 2025.
            </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  