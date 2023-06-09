import './NavTab.css'; //добавь якоря

export default function NavTab() {
  return (
    <nav className='navTab'>
      <ul className='navTab__btns'>
        <li className='navTab__btn btn'>
          <a className='navTab__btn-link'>О проекте</a>
        </li>
        <li className='navTab__btn btn'>
          <a className='navTab__btn-link'>Технологии</a>
        </li>
        <li className='navTab__btn btn'>
          <a className='navTab__btn-link'>Студент</a>
        </li>
      </ul>
    </nav>
  );
}
