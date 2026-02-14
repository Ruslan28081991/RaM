import { type ChangeEvent, type ComponentType, type SVGProps } from 'react';

import cn from 'classnames';

import { CloseIcon } from '@/assets/icons';

import './input.css';

interface IInput {
  value: string;
  size: 'medium' | 'small';
  onChange: (newValue: string) => void;
  placeholder?: string;
  view?: 'bordered' | 'underlined';
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
    <div className={cn(`input_${view}`)}>
      {IconComponent && <IconComponent className="input__icon" />}

      <input
        className={cn('inputComponent', `input_${size}`)}
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
