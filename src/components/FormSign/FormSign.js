import './FormSign.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

export default function FormSign({
     name,
     title,
    // isOpen,
    // onClose,
     children,
     btnText,
    // onSubmit,
     nameColor,
     textAfterBtn,
     linkAfterBtn
}) {
  return (
  

    <div className={`formSign formSign_type-${name}`}     // onClick={onClose}
    >  
     <Logo />
      <h2 className={`formSign__title formSign__title_type-${nameColor}`}>
          {title}{' '}
        </h2>
         
        <form
          className={`formSign__form formSign__form_type-${name}`}
          action='formSign__form'
          name='formSign__name'
          method='post'
          noValidate
         // onSubmit={onSubmit}
            >
{children}
          <button
            className={`formSign__btn formSign__btn-create formSign__btn_type-${nameColor}`}
            type='submit'
          >
            {btnText}
          </button>
        </form>
        <p className={`formSign__text formSign__text_type-${nameColor}`}>{textAfterBtn}</p>
        <Link className={`formSign__link formSign__link_type-${nameColor}`}>{linkAfterBtn}</Link>
    </div>
   
  );
}