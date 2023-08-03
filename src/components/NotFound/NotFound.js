import './NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className='notFound'>
      <div className='notFound__box'>
        <h1 className='notFound__title'>404</h1>
        <p className='notFound__text'>Страница не найдена</p>
        <Link className='notFound__link' to='/'>
          Назад
        </Link>
      </div>
    </section>
  );
}
