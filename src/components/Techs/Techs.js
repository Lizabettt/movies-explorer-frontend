import './Techs.css';

export default function Techs() {
  return (
    <section className='techs'>
      <h2 className='section-title'>Технологии</h2>
      <div className='techs__box'>
        <h3 className='techs__title-big'>7 технологий</h3>
        <p className='section__subtitle'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__items'>
          <li className='techs__item'>HTML</li>
          <li className='techs__item'>CSS</li>
          <li className='techs__item'>JS</li>
          <li className='techs__item'>React</li>
          <li className='techs__item'>Git</li>
          <li className='techs__item'>Express.js</li>
          <li className='techs__item'>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
