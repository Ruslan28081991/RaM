import Light from '@/assets/images/Light.png';
import Logo from '@/assets/images/logo.png';
import RuLanguage from '@/assets/images/Ru.png';

import './header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <img
          className="header__wrapper-logo"
          src={Logo}
          alt="Logo"
        />
      </div>
      <div className="header__buttons">
        <button className="header__buttons-light">
          <img
            src={Light}
            alt="Light"
          />
        </button>
        <button className="header__buttons-language">
          <img
            src={RuLanguage}
            alt="Language"
          />
        </button>
      </div>
    </header>
  );
};
