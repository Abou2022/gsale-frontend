import './tooltip.css';
import React from 'react';
import { renderIf } from '../../../lib/util.js';

let caretUp = require('./../assets/icons/caret-up.icon.svg');
const Tooltip = props => (
  <div className='tooltip'>
    {renderIf(props.message && props.show,
      <section>
        <img className='caret-up' alt="caret up" src={caretUp} />
        <p> {props.message} </p>
      </section>
    )}
  </div>
);

export default Tooltip;