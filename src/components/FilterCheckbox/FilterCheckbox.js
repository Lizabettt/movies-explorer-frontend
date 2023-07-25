import './FilterCheckbox.css';

export default function FilterCheckbox({
  onToggleAndshowShortMovie,
  isShortMovie,
}) {
  return (
    <label className='filterСheckbox' id='checkbox'>
      <input
        className='filterCheckbox-input'
        type='checkbox'
        id='checkbox'
        checked={isShortMovie}
        onChange={() => onToggleAndshowShortMovie(isShortMovie)}
      ></input>
      <span className='filterCheckbox-text'>Короткометражки</span>
    </label>
  );
}
