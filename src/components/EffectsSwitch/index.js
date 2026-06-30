import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const EffectsSwitch = ({ onChange, checked }) => (
  <div
    css={css`
      margin-top: 12px;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
    `}
  >
    <p
      css={css`
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.7);
      `}
    >
      Effects - {checked ? 'on' : 'off'}
    </p>
    <Switch
      offColor='#DEDEDE'
      checkedIcon={false}
      uncheckedIcon={false}
      height={35}
      width={70}
      onChange={onChange}
      checked={checked}
    />
  </div>
);

EffectsSwitch.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default EffectsSwitch;
