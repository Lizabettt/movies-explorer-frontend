import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='aboutProject section'>
      <h2 className='section-title'>О проекте</h2>
      <div className='aboutProject__info'>
        <div className='aboutProject__info_box'>
          <h3 className='aboutProject__info-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='section__subtitle'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='aboutProject__info_box'>
          <h3 className='aboutProject__info-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='section__subtitle'>
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className='aboutProject__progressLine'>
        <div className='aboutProject__progressLine_week'>
          <p className='aboutProject__progressLine_week-text'>1 неделя</p>
        </div>
        <div className='aboutProject__progressLine_week aboutProject__progressLine_week-type-light'>
          <p className='aboutProject__progressLine_week-text'>4 недели</p>
        </div>
      </div>
      <div className='aboutProject__progressLine'>
        <div className='aboutProject__progressLine_boxText'>
          <p className='aboutProject__progressLine_boxText-text'>Back-end</p>
        </div>
        <div className='aboutProject__progressLine_boxText'>
          <p className='aboutProject__progressLine_boxText-text'>Front-end</p>
        </div>
      </div>
    </section>
  );
}
