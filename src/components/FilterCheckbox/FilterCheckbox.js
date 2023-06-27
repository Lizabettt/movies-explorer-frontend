import './FilterCheckbox.css';
// import { useState } from 'react';

const FilterCheckbox = () => {
  // const [turnOn, setTurnOn] = useState(false)

  // const onClick = () => {
  //   setTurnOn(!turnOn);
  // }

  return (
    <label className='filterСheckbox' id="checkbox">
      <input className='filterCheckbox__input' type="checkbox" id="checkbox">
        </input>
      <span className='filterCheckbox__text'>Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;