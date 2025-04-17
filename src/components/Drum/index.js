import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";

import { breakpoints } from "styles";

import { OverlayButtons } from "./components";

const Drum = ({ src, drum }) => (
  <div
    css={css`
      width: 312px;
      height: 312px;
      background-image: url(${src});
      background-size: cover;
      position: relative;
      @media (min-width: ${breakpoints.ipad}) and (max-width: ${breakpoints.mobile}) {
        width: 400px;
        height: 400px;
      }
    `}
  >
    <OverlayButtons drum={drum} />
  </div>
);

Drum.propTypes = {
  drum: PropTypes.shape({}),
  src: PropTypes.string,
};

export default Drum;
