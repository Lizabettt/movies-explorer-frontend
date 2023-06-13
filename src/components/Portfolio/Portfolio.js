import './Portfolio.css';
import link from '../../images/link.svg';
export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <div className='portfolio__box'>
        <ul className='portfolio__nameLinks'>
          <li className='portfolio__nameLink'>
            <p className='portfolio__nameLink-text'>Статичный сайт</p>
            <a
              className='portfolio__link'
              href='https://github.com/Lizabettt/how-to-learn'
              target='_blank'
            >
              <img classMame='portfolio__pic' src={link} alt='ссылка' />
            </a>
          </li>
          <li className='portfolio__nameLink'>
            <p className='portfolio__nameLink-text'>Адаптивный сайт</p>
            <a
              className='portfolio__link'
              href='https://lizabettt.github.io/russian-travel/'
              target='_blank'
            >
              <img classMame='portfolio__pic' src={link} alt='ссылка' />
            </a>
          </li>
          <li className='portfolio__nameLink'>
            <p className='portfolio__nameLink-text'>
              Одностраничное приложение
            </p>
            <a
              className='portfolio__link'
              href='https://github.com/Lizabettt/react-mesto-api-full-gha'
              target='_blank'
            >
              <img classMame='portfolio__pic' src={link} alt='ссылка' />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
