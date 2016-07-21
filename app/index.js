import { webfonts } from './fontFamilies';
import React from 'react';
import ReactDOM from 'react-dom';
import ControlPanel from './components/control-panel/controlPanel.js';

const Root = () => (
  <div>
    <link rel="stylesheet" type="text/css" href={webfonts}/>
    <ControlPanel />
  </div>
);

let element = document.createElement('div');
element.id = 'app';
document.body.appendChild(element);

ReactDOM.render(<Root />, document.getElementById('app'));
