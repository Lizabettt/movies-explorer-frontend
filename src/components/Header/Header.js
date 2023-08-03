import './Header.css';

import Navigation from '../Navigation/Navigation';
import Sign from '../Sign/Sign';
import Logo from '../Logo/Logo';

export default function Header({ isOpen, loggedIn }) {
  return (
    <header className='header'>
      <Logo />
      {loggedIn ? <Navigation isOpen={isOpen} /> : <Sign />}
    </header>
  );
}
