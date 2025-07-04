import bund1x from "../source/img/bund@1x.jpg?react";
import bund2x from "../source/img/bund@2x.jpg?react";
import opera1x from "../source/img/opera@1x.jpg?react";
import opera2x from "../source/img/opera@2x.jpg?react";
import temple1x from "../source/img/temple@1x.jpg?react";
import temple2x from "../source/img/temple@2x.jpg?react";
import tsavo1x from "../source/img/tsavo@1x.jpg?react";
import tsavo2x from "../source/img/tsavo@2x.jpg?react";
import maldives1x from "../source/img/maldives@1x.jpg?react";
import maldives2x from "../source/img/maldives@2x.jpg?react";
import morocco1x from "../source/img/morocco@1x.jpg?react";
import morocco2x from "../source/img/morocco@2x.jpg?react";
import mongolia1x from "../source/img/mongolia@1x.jpg?react";
import mongolia2x from "../source/img/mongolia@2x.jpg?react";
import switzerland1x from "../source/img/switzerland@1x.jpg?react";
import switzerland2x from "../source/img/switzerland@2x.jpg?react";
import iceland1x from "../source/img/iceland@1x.jpg?react";
import iceland2x from "../source/img/iceland@2x.jpg?react";
import taiwan1x from "../source/img/taiwan@1x.jpg?react";
import taiwan2x from "../source/img/taiwan@2x.jpg?react";
//users
import user_one1x from "../source/img/user_one@1x.png?react";
import user_one2x from "../source/img/user_one@2x.png?react";
import user_two1x from "../source/img/user_two@1x.png?react";
import user_two2x from "../source/img/user_two@2x.png?react";
import user_three1x from "../source/img/user_three@1x.png?react";
import user_three2x from "../source/img/user_three@2x.png?react";
import user_four1x from "../source/img/user_four@1x.png?react";
import user_four2x from "../source/img/user_four@2x.png?react";
import user_five1x from "../source/img/user_five@1x.png?react";
import user_five2x from "../source/img/user_five@2x.png?react";
//apps
import google_play1x from "../source/img/google_play@1x.png?react";
import google_play2x from "../source/img/google_play@2x.png?react";
import app_store1x from "../source/img/app_store@1x.png?react";
import app_store2x from "../source/img/app_store@2x.png?react";

const images = {
  bund: {
    src1x: bund1x,
    src2x: bund2x,
    alt: "Шанхайская набережная",
  },
  opera: {
    src1x: opera1x,
    src2x: opera2x,
    alt: "Оперный театр в Сиднее",
  },
  temple: {
    src1x: temple1x,
    src2x: temple2x,
    alt: "Буддийский храм школы Риндзай",
  },
  tsavo: {
    src1x: tsavo1x,
    src2x: tsavo2x,
    alt: "Национальный парк в Кении",
  },
  maldives: {
    src1x: maldives1x,
    src2x: maldives2x,
    alt: "Денежные острова II века нашей эры",
  },
  morocco: {
    src1x: morocco1x,
    src2x: morocco2x,
    alt: "Испано-мавританская архитектура Морокко",
  },
  mongolia: {
    src1x: mongolia1x,
    src2x: mongolia2x,
    alt: "Традиционная монгольская юрта",
  },
  switzerland: {
    src1x: switzerland1x,
    src2x: switzerland2x,
    alt: "Отдых на озере Бриенц",
  },
  iceland: {
    src1x: iceland1x,
    src2x: iceland2x,
    alt: "Сельяландсфосс - водопад, который можно обойти вокруг",
  },
  taiwan: {
    src1x: taiwan1x,
    src2x: taiwan2x,
    alt: "Уникальное здание Тайбэй 101",
  },
  user_one: {
    src1x: user_one1x,
    src2x: user_one2x,
    alt: "Пользователь 1",
  },
  user_two: {
    src1x: user_two1x,
    src2x: user_two2x,
    alt: "Пользователь 2",
  },
  user_three: {
    src1x: user_three1x,
    src2x: user_three2x,
    alt: "Пользователь 3",
  },
  user_four: {
    src1x: user_four1x,
    src2x: user_four2x,
    alt: "Пользователь 4",
  },
  user_five: {
    src1x: user_five1x,
    src2x: user_five2x,
    alt: "Пользователь 5",
  },
  google_play: {
    src1x: google_play1x,
    src2x: google_play2x,
    alt: "Гугл Плей",
  },
  app_store: {
    src1x: app_store1x,
    src2x: app_store2x,
    alt: "App Store",
  },
};

function PhotoByName({ name, className }) {
  const image = images[name];

  if (!image) return null;

  return (
    <img
      src={image.src1x}
      srcSet={`${image.src1x} 1x, ${image.src2x} 2x`}
      alt={image.alt}
      className={className}
      loading="lazy"
    />
  );
}

export default PhotoByName;
