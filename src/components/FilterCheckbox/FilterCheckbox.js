import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <label className='filterСheckbox' id='checkbox'>
      <input
        className='filterCheckbox-input'
        type='checkbox'
        id='checkbox'
      ></input>
      <span className='filterCheckbox-text'>Короткометражки</span>
    </label>
  );
}
