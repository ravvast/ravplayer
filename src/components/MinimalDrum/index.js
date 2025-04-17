import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import { DrumContext } from "containers/CardContainer";
import { Drum } from "../";

const MinimalDrum = ({ drumImage }) => {
  const { drum } = React.useContext(DrumContext);

  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <Drum drum={drum} src={drumImage} />
    </div>
  );
};

MinimalDrum.propTypes = {
  drumImage: PropTypes.string,
};

export default React.memo(MinimalDrum);
