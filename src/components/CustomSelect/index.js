import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { breakpoints } from 'styles';

const CustomSelect = ({ value, defaultValue, onChange, options, cx }) => (
  <Select
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
    options={options}
    css={[
      css`
        width: 300px;
        @media (max-width: ${breakpoints.mobile}) {
          width: 150px;
        }
      `,
      cx,
    ]}
  />
);

CustomSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  cx: PropTypes.any,
};

export default CustomSelect;
