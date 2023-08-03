import './NavTab.css';

export default function NavTab() {
  return (
    <nav className='navTab'>
      <ul className='navTab__btns'>
        <li className='navTab__btn btn'>
          <a className='navTab__btn-link' href="#aboutProject">О проекте</a>
        </li>
        <li className='navTab__btn btn'>
          <a className='navTab__btn-link' href="#techs">Технологии</a>
        </li>
        <li className='navTab__btn btn'>
          <a className='navTab__btn-link' href="#aboutMe">Студент</a>
        </li>
      </ul>
    </nav>
  );
}
