import { type ComponentType, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { ArrowDownIcon, ArrowDownSmallIcon, ArrowUpIcon, ArrowUpSmallIcon } from '@/assets/icons';

import './select.css';

export interface IOption<T> {
  label: string;
  value: T;
}

interface ISelectOptionComponent<T> {
  option: IOption<T>;
}

const DefaultOptionComponent = <T,>({ option }: ISelectOptionComponent<T>) => {
  return <>{option.label}</>;
};

interface ISelect<T> {
  options: IOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  OptionComponent?: ComponentType<ISelectOptionComponent<T>>;
  placeholder?: string;
  size?: 'medium' | 'small';
}

export const Select = <T,>({
  options,
  size = 'medium',
  value,
  placeholder,
  OptionComponent = DefaultOptionComponent,
  onChange,
}: ISelect<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.find((option) => option.value === value);

  const getArrowIcon = () => {
    if (size === 'small') {
      return isOpen ? <ArrowUpSmallIcon /> : <ArrowDownSmallIcon />;
    } else {
      return isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />;
    }
  };

  const hanldeOpenSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChangeValue = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      className="select"
      ref={selectRef}
    >
      <button
        className={cn('select__header', {
          select__header_medium: size === 'medium',
          select__header_small: size === 'small',
        })}
        onClick={hanldeOpenSelect}
      >
        {!selectedOptions ? (
          <span>{placeholder}</span>
        ) : (
          <div className="select__content">
            <OptionComponent option={selectedOptions} />
          </div>
        )}
        <span
          className={cn('select__arrow', {
            select__arrow_small: size === 'small',
          })}
          aria-label="Toggle select"
        >
          {getArrowIcon()}
        </span>
      </button>

      {isOpen && (
        <ul className="select__list">
          {options.map((option) => (
            <li
              key={option.label}
              className={cn('select__item', `select__item_${size}`)}
              onClick={() => handleChangeValue(option.value)}
            >
              <OptionComponent option={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
