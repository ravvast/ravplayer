/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { breakpoints } from 'styles';

import OverlayCircle from '../OverlayCircle';


class Button extends PureComponent {
  static propTypes = {
    playSound: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired,
    demoIsPlaying: PropTypes.bool.isRequired,
    isMoon: PropTypes.bool.isRequired,
  };

  state = {
    buttons: [],
  }

  buttonRef = React.createRef();

  componentDidMount() {
    if (this.buttonRef.current) {
      this.buttonRef.current.addEventListener('touchstart', (event) => {
        if (!this.props.demoIsPlaying) {
          this.updateButtons();
        }
        event.preventDefault();
      });
      this.buttonRef.current.addEventListener('click', (event) => {
        if (!this.props.demoIsPlaying) {
          this.updateButtons();
        }
        event.preventDefault();
      });
    }
  }

  componentWillUnmount() {
    if (this.buttonRef.current) {
      this.buttonRef.current.removeEventListener('touchstart', null);
      this.buttonRef.current.removeEventListener('click', null);
    }
  }

  updateButtons = () => {
    this.setState(({ buttons: currentButtons }) => ({
      buttons: [...currentButtons, currentButtons.length + 1],
    }));

    this.props.playSound();
  }

  animate = () => {
    this.setState(({ buttons: currentButtons }) => ({
      buttons: [...currentButtons, currentButtons.length + 1],
    }));
  }

  render() {
    const { color, children, width, top, left, isMoon } = this.props;
    const fontSize = isMoon ? '12px' : '16px';
    const mobileFontSize = isMoon ? '12px' : 'calc(12px + 1vw)';

    return (
      <>
        <div
          ref={this.buttonRef}
          css={css`
            width: ${width}px;
            height: ${width}px;
            border-radius: 1000px;
            position: absolute;
            z-index: 5;
            top:  ${top}px;
            left: ${left}px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            outline: none;
            border: none;
            background-color: transparent;
            padding: 0;
            margin: 0;
          `}
        >
          {this.state.buttons.map(object => (
            <OverlayCircle
              key={object}
              width={width}
              color={color}
            />
          ))}
          <div
            css={css`
              border-radius: 1000px;
              position: absolute;
              z-index: 10;
              font-size: ${fontSize};
              width: ${width};
              height: ${width};
              font-weight: 600;
              color: ${color};
              user-select: none;
              @media (max-width: ${breakpoints.mobile}) {
                font-size: ${mobileFontSize};
              }
            `}
          >
            {children}
          </div>
        </div>
      </>
    );
  }
}


export default React.memo(Button);
