import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { ReactComponent as FingerIcon } from 'assets/finger.svg';
import { ReactComponent as DrumSticksIcon } from 'assets/drumsticks.svg';

const ModeSwitch = ({ onChange, checked }) => (
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
      Play mode - {checked ? 'sticks' : 'fingers'}
    </p>
    <Switch
      onColor='#DEDEDE'
      offColor='#DEDEDE'
      height={35}
      width={70}
      onChange={onChange}
      checked={checked}
      checkedIcon={
        <FingerIcon
          css={css`
            margin-top: 6px;
            margin-left: 8px;
            width: 22px;
            height: 22px;
          `}
        />
      }
      uncheckedIcon={
        <DrumSticksIcon
          css={css`
            margin-top: 6px;
            margin-left: 6px;
            width: 22px;
            height: 22px;
            color: white;
          `}
        />
      }
    />
  </div>
);

ModeSwitch.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default ModeSwitch;
