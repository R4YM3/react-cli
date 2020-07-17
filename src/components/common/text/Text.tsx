import React from 'react';
import cx from 'classnames';
import './Text.scss';

export const TEXT_TYPES = {
  ERROR: 'text--error',
  WARNING: 'text--warning',
  NOTIFICATION: 'text--notification',
  TEXT: 'text--text',
  ITALIC: 'text--italic',
  BOLD: 'text--bold',
  UNDERLINED: 'text--underlined',
};

interface IProps {
  children: React.ReactNode;
  type?: string;
  types?: string[] | undefined;
}

export default ({ children, type = TEXT_TYPES.TEXT, types = []}: IProps) => {
  const allTypes = [type, ...types];

  const classNames = cx('text', allTypes);

  return <span className={classNames}>{children}</span>;
};
