import React from 'react';
import cx from 'classnames';

import './IconButton.scss';

interface IIconButton {
  children: string;
  className?: string;
  onClick?: () => Event | void;
}

export default ({className, onClick, children}: IIconButton) => {
  const classNames = cx('button', 'button--icon', 'border-color', {
    className: !!className,
  });

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};
