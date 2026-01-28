import Logo from '../../../assets/images/logo.png';
import './header.css';

export const Header = () => {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={Logo}
        alt="Logo"
      />
      <div className="header__buttons"></div>
    </header>
  );
};
