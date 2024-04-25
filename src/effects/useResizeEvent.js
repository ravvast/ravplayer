import React from 'react';

export default () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const setNewWidth = () => {
      if (width !== window.innerWidth) {
        setWidth(window.innerWidth);
      }
    };
    window.addEventListener('resize', setNewWidth);

    return () => {
      window.removeEventListener('resize', setNewWidth);
    };
  });

  return width;
};
