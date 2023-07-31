import './FilterCheckbox.css';

export default function FilterCheckbox({
  checkboxChange, isChecked
}) {
  return (
    <label className='filterСheckbox'  htmlFor="switch">
      <input
        className='filterCheckbox-input'
        type='checkbox'
        id="switch"
        onChange={checkboxChange}
          checked={isChecked || ""}
      ></input>
      <span className='filterCheckbox-text'>Короткометражки</span>
    </label>
  );
}
