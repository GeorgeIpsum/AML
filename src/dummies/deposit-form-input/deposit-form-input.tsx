import React from 'react';
import { X } from 'react-feather';
import './deposit-form-input.scss';

interface DepositFormInputProps {
  className: string;
  formInput: string;
  placeholder: string;
  onSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputClear: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function DepositFormInput(props: DepositFormInputProps) {
  const className = "Deposit-Form-Input " + (props.className ? props.className : "");
  const { formInput, placeholder, onSubmit, onInputChange, onInputClear } = props;

  return(
    <form onSubmit={onSubmit} className={className}>
      <input type="text" value={formInput} onChange={onInputChange} className="deposit-input" placeholder={placeholder} />
      <input type="submit" className="deposit-submit" value="Add" disabled={formInput === ''} />
      {formInput !== '' ?
        (<button type="button" className="deposit-clear" onClick={onInputClear}><X size={20} /></button>) : null
      }
    </form>
  );
}
