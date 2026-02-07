import { type ChangeEvent, type ComponentType, type SVGProps } from 'react';

import cn from 'classnames';

import { CloseIcon, SearchIcon } from '@/assets/icons';

import './input.css';

interface IInput {
  value: string;
  placeholder: string;
  view: 'bordered' | 'underlined';
  size: 'medium' | 'small';
  onChange: (newValue: string) => void;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export const Input = ({
  value,
  placeholder,
  view = 'underlined',
  size = 'medium',
  onChange,
  icon: IconComponent,
}: IInput) => {
  const handleDeleteValue = () => {
    onChange('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn(`input__${view}`)}>
      {IconComponent && <SearchIcon className="input__icon-search" />}

      <input
        className={cn('inputComponent', `input__${size}`)}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {value && (
        <CloseIcon
          onClick={handleDeleteValue}
          className="input__icon-close"
        />
      )}
    </div>
  );
};
