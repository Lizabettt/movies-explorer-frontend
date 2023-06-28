import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <h3 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className='footer__box'>
        <p className='footer__text'>© {`${new Date().getFullYear()}`}</p>
        <ul className='footer__items'>
          <li className='footer__item'>
            <a
              className='footer__link'
              href='https://practicum.yandex.ru'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__item'>
            <a
              className='footer__link'
              href='https://github.com/Lizabettt'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
