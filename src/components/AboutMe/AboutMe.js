import './AboutMe.css';
import foto from '../../images/foto.png';

export default function AboutMe() {
  return (
    <section className='aboutMe section' id="aboutMe">
      <h2 className='section-title'>Студент</h2>
      <div className='aboutMe__box'>
        <div className='aboutMe__box-info'>
          <h3 className='aboutMe__box-name'>Виталий</h3>
          <p className='aboutMe__info'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutMe__text'>
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
            слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.  
            С 2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
            После того, как прошёл курс по&nbsp; веб-&nbsp;разработке, начал заниматься
            фрилансзаказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <a
            className='aboutMe__linkGithub'
            href='https://github.com/Lizabettt'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img className='aboutMe__foto' src={foto} alt='Фото' />
      </div>
    </section>
  );
}
