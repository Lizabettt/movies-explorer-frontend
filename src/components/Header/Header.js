import { useLocation } from 'react-router-dom';

import './Header.css';

import Navigation from '../Navigation/Navigation';
import Sign from '../Sign/Sign';
import Logo from '../Logo/Logo';

export default function Header() {
  const location = useLocation();

  return (
    <header className='header'>
      <Logo />
    {location.pathname === '/' ? ( <Sign /> ) : ( <Navigation /> )}
    </header>
  );
}
