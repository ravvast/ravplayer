/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { ReactComponent as CloseIcon } from 'assets/close.svg';
import { DrumContext } from 'containers/CardContainer';
import { SmallButton, Loader, Body } from 'components';
import drums from 'content/drums';
import { breakpoints } from 'styles';

import { DrumRow } from './components';


const OverlayMenu = ({ children, onMenuClose }) => {
  const [animationIsActive, setAnimationStatus] = React.useState(false);
  const [menuIsOpen, changeMenuState] = React.useState(false);

  const [scrollTop, setScrollTop] = React.useState(0);

  // eslint-disable-next-line arrow-body-style
  const checkScrollBar = () => {
    return document.body.scrollHeight > document.body.clientHeight;
  };

  const getScrollBarSize = () => {
    const outer = document.createElement('div');

    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar';

    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;

    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  };

  const blockScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';

    const localScrollTop = window.pageYOffset;
    setScrollTop(localScrollTop);

    document.body.style.position = 'fixed';

    const hasScrollbar = checkScrollBar();

    if (hasScrollbar) {
      const scrollBarSize = getScrollBarSize();
      document.body.style.width = `calc(100% - ${scrollBarSize}px)`;
    } else {
      document.body.style.width = '100%';
    }
    document.body.style.top = `${-localScrollTop}px`;
  };

  const unblockScroll = () => {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scroll(0, scrollTop);

    setScrollTop(0);
  };

  const openMenu = () => {
    blockScroll();
    changeMenuState(true);
    setAnimationStatus(true);
  };

  const closeMenu = () => {
    unblockScroll();
    if (onMenuClose) {
      onMenuClose();
    }
    setAnimationStatus(false);
    setTimeout(() => changeMenuState(false), 300);
  };

  const opacity = animationIsActive ? 1 : 0;

  const { selectDrum } = React.useContext(DrumContext);

  return (
    <>
      {menuIsOpen && (
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 100;
            overflow-x: hidden;
            overflow-y: scroll;
            opacity: ${opacity};
            transition: 0.45s opacity ease;
            background-color: transparent;
            background-color: rgba(255, 255, 255, 0.99);;
            -webkit-overflow-scrolling: touch;
            height: 536px;
            width: 960px;
            @media (max-width: ${breakpoints.mobile}) {
              height: 100%;
              width: 100%;
              position: fixed;
            }
            @keyframes fadein {
              from {
                opacity:0;
              }
              to {
                opacity:1;
              }
            }
            animation: fadein 0.45s;
        `}
        >
          <div
            css={css`
              height: 72px;
              width: 100vw;
              position: sticky;
              top: 0;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              background-image: linear-gradient(to top, rgba(238, 238, 238, 0), #ffffff);
              @media (min-width: ${960}px) {
                display: none;
              }
            `}
          >
            <SmallButton
              onClick={closeMenu}
              close
              cx={css`
                margin-right: 12px;
              `}
            />
          </div>
          {drums.map((object, index) => (
            <DrumRow
              key={object.key}
              title={object.title}
              caption={object.notesString}
              isPan={object.type === '11' || object.type === '9P'}
              isMoon={object.type === '14' || object.type === '15'}
              cx={css`
                margin-top: ${index === 0 ? '128px' : '0'};
                margin-bottom: ${index === drums.length - 1 ? '64px' : '24px'};
                @media (max-width: ${breakpoints.mobile}) {
                  margin-bottom: ${index === drums.length - 1 ? '24px' : '8px'};
                }
              `}
              onClick={() => {
                selectDrum(drums[index]);
                closeMenu();
              }}
            />
          ))}
          <button
            type="button"
            css={css`
              width: 56px;
              height: 56px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: fixed;
              top: calc(50vh - 268px + 36px);
              right: calc(50vw - 480px + 16px);
              outline: none;
              border: none;
              margin: 0;
              padding: 0;
              background-color: transparent;
              &:active {
                opacity: .8;
              }
              @media (max-width: ${breakpoints.mobile}) {
                display: none;
              }
            `}
            onClick={closeMenu}
            onKeyPress={null}
          >
            <CloseIcon
              css={css`
                width: 32px;
                height: 32px;
              `}
            />
          </button>
        </div>
      )}

      {children({ openMenu })}
    </>
  );
};

OverlayMenu.propTypes = {
  children: PropTypes.any.isRequired,
  onMenuClose: PropTypes.func,
};

export default React.memo(OverlayMenu);
