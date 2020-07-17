import React from 'react';
import './Prompt.css';
import {IUser} from '../../../context/user';

export interface Props {
  user: IUser;
}

export default ({user}: Props) => {
const {countryCode, query, platformName, browserName} = user!;
  return (
    <section className="prompt">
      <header className="hide">
        <h6>Context</h6>
      </header>
      <span className="prompt--value prompt--country inline">
        {countryCode} {query}
      </span>
      <span className="prompt--value prompt--platform">{platformName}</span>
      <span className="prompt--value prompt--browser after-arrow-right-background-color">
        {browserName}
      </span>
    </section>
  );
};
