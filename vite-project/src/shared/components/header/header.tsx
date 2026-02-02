import { LightImg, LogoImg, RuImg } from '@/assets/images';

import './header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <img
          className="header__wrapper-logo"
          src={LogoImg}
          alt="Logo"
        />
      </div>
      <div className="header__buttons">
        <button className="header__buttons-light">
          <img
            src={LightImg}
            alt="Light theme icon"
          />
        </button>
        <button className="header__buttons-language">
          <img
            src={RuImg}
            alt="Russian language icon"
          />
        </button>
      </div>
    </header>
  );
};
