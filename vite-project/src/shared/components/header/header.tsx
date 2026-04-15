import { LightImg, LogoImg, RuImg } from '@/assets/images';

import { Container } from '../container/container';

import './header.css';

export const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__inner">
          <img
            className="header__logo"
            src={LogoImg}
            alt="Logo"
          />
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
        </div>
      </Container>
    </header>
  );
};
