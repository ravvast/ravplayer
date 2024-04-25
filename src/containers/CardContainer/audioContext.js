import React from 'react';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const context = React.createContext({ audioContext });

export default context;
