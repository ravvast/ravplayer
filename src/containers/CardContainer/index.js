import React, { useState } from 'react';
import { css } from '@emotion/core';
import { parseQuery } from 'shared/libs/parseQuery/parseQuery';
import CardMobile from 'containers/CardMobile';
import Card from 'containers/Card';
import { Loader, MinimalDrum, DemoDrum, SimpleDrum, Error } from 'components';
import { useResizeEvent } from 'effects';
import { breakpoints, colors } from 'styles';
import { useDrumSounds } from 'shared/libs/hooks/useDrumSound/useDrumSound';

const checkSimpleView = asPath => parseQuery(asPath).simpleView === 'true';
const checkMinimalView = asPath => parseQuery(asPath).minimalView === 'true';
const checkDemoView = asPath => parseQuery(asPath).demoView === 'true';

const CardContainer = () => {
  const isSimpleView = checkSimpleView(document.location.href);
  const isMinimalView = checkMinimalView(document.location.href);
  const isDemoView = checkDemoView(document.location.href);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useDrumSounds(setIsLoading, setIsError);

  const renderDrumContent = content => {
    if (isMinimalView) return <MinimalDrum />;
    if (isDemoView) return <DemoDrum />;
    if (isSimpleView) return <SimpleDrum />;

    return (
      <div
        css={css`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          @media (min-width: ${breakpoints.mobile}) {
            min-height: auto;
            height: 536px;
            border: solid 1px ${colors.dark.border};
            width: 960px;
          }
        `}
      >
        {content}
      </div>
    );
  };

  const innerWidth = useResizeEvent();

  let content;

  if (innerWidth >= 960) {
    content = <Card />;
  } else {
    content = <CardMobile />;
  }

  if (isLoading) return <Loader />;

  if (isError) return <Error />;

  return renderDrumContent(content);
};

export default CardContainer;
