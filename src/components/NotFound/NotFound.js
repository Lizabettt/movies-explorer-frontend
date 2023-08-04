import './NotFound.css';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className='notFound'>
      <div className='notFound__box'>
        <h1 className='notFound__title'>404</h1>
        <p className='notFound__text'>Страница не найдена</p>
        <button 
        className='notFound__btn' 
        type="button" 
        onClick={()=>navigate(-1)}>
          Назад
        </button>
      </div>
    </section>
  );
}
